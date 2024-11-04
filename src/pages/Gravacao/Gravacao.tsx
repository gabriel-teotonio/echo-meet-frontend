import React, { useState, useEffect, useRef } from 'react';
import { Button, Flex, Text, List, Card, Modal, Select, ActionIcon } from '@mantine/core';
import { openDB } from 'idb';
import { IconDownload, IconMicrophone, IconPlayerPlay, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import gifRobot from '../../assets/robot.gif';

const DB_NAME = 'AudioDB';
const STORE_NAME = 'Recordings';

// Função para inicializar o banco de dados
async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    },
  });
  return db;
}
async function requestMicrophonePermission() {
  try {
    // Verifica o status da permissão de microfone
    const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });    // Checa se a permissão já foi concedida
    if (permissionStatus.state === 'granted') {
      return true;
    } else if (permissionStatus.state === 'prompt') {
      // Caso ainda não tenha solicitado a permissão, solicita agora
      return await getMicrophoneAccess();
    } else {
      // Caso a permissão tenha sido negada
      alert("Permissão para o microfone foi negada. Habilite-a nas configurações do navegador.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar a permissão do microfone:", error);
    return false;
  }
}

async function getMicrophoneAccess() {
  try {
    // Solicita o uso do microfone ao usuário
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop()); // Para imediatamente o uso do microfone
    return true;
  } catch (error) {
    console.error("Erro ao acessar o microfone:", error);
    alert("Não foi possível acessar o microfone. Verifique as permissões.");
    return false;
  }
}


// Função para salvar áudio no IndexedDB
async function saveAudio(blob: Blob) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add({ audio: blob, date: new Date() });
  await tx.done;
}

// Função para obter todos os áudios salvos
async function getSavedAudios() {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const recordings = await store.getAll();
  return recordings;
}

// Componente principal de gravação de áudio
const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState<{ id: number; audio: Blob; date: Date }[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [grupos, setGrupos] = useState<{ id: string; name: string }[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [modalGroupOpened, setModalGroupOpened] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const {user} = useAuth();

  useEffect(() => {
    // Carrega as gravações salvas ao carregar o componente
    const loadSavedAudios = async () => {
      const audios = await getSavedAudios();
      setSavedAudios(audios);
    };
    loadSavedAudios();
    fetchGroups();
  }, []);

  // Função para buscar grupos
  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://45.169.29.120:8000/groups', {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      setGrupos(response.data);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };

  // Inicia o timer de gravação
  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  // Para o timer de gravação
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setRecordingTime(0);
    }
  };

  // Inicia a gravação
  const startRecording = async () => {
    const permissionGranted = await requestMicrophonePermission();
    if (!permissionGranted) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
  
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
  
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        audioChunksRef.current = [];
        await saveAudio(audioBlob);
        const audios = await getSavedAudios();
        setSavedAudios(audios);
      };
  
      mediaRecorder.start();
      setIsRecording(true);
      startTimer();
    } catch (error) {
      console.error("Erro ao acessar o microfone:", error);
      alert("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  // Para a gravação
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    stopTimer();
  };

  // Reproduz um áudio salvo
  const playAudio = (audioBlob: Blob) => {
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    audio.play();
  };

  // Faz download do áudio como arquivo
  const downloadAudio = (audioBlob: Blob, filename: string) => {
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  async function deleteAudio(id: number) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
    await tx.done;
  }

  // Função para abrir modal de seleção de grupo
  const openGroupModal = () => setModalGroupOpened(true);

  // Função para gerar resumo
  const generateSummary = async (audioBlob: Blob) => {
    if (!selectedGroup) {
      setFeedbackText("Por favor, selecione um grupo.");
      return;
    }
    setModalGroupOpened(false);
    setFeedbackText("Estamos gerando o resumo...");
    const formData = new FormData();
    formData.append("audio_file", audioBlob);

    try {
      const response = await axios.post(`http://45.169.29.120:8000/transcricao-resumo/${selectedGroup}`, formData);
      if (response.status === 200) {
        setFeedbackText("Resumo gerado com sucesso!");
      } else {
        setFeedbackText("Erro ao gerar o resumo.");
      }
    } catch (error) {
      setFeedbackText("Erro ao gerar o resumo. Tente novamente.");
      console.error(error);
    }
  };

  const handleDeleteAudio = async (id: number) => {
    const confirmDelete = confirm("Excluir gravação?");
    if(!confirmDelete) return;

    await deleteAudio(id);
    const audios = await getSavedAudios();
    setSavedAudios(audios);
  };

  return (
    <Flex direction="column" maw={'600px'} gap="sm">
      <Text size="xl">Gravador de Áudio</Text>
      <Button leftSection={<IconMicrophone/>} onClick={isRecording ? stopRecording : startRecording} color={isRecording ? 'red' : 'blue'}>
        {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
      </Button>

      {isRecording && <Text>Tempo de gravação: {recordingTime}s</Text>}

      <Text size="lg" mt="md">Áudios Salvos</Text>
      {savedAudios.length > 0 ? (
        <List>
          {savedAudios.map((recording, index) => (
            <Card
            mt={'md'}
              key={recording.id}
              shadow="sm" 
              padding="lg" 
              style={{ border: '1px solid #55506E', backgroundColor: '#161324' }} 
              radius="md"
            >
              <Text size="xl" fw={500} c="white">Gravação {index + 1}</Text>
              <Text c="dimmed" size="sm">{recording.date.toLocaleString()}</Text>
              
              <Flex gap={'sm'} justify="flex-end" mt="md">
                <Button color="teal" onClick={() => playAudio(recording.audio)}>
                  <IconPlayerPlay style={{ marginRight: '5px' }} />Play
                </Button>
                <Button variant="outline" color="teal" onClick={() => downloadAudio(recording.audio, `Gravacao_${recording.date.toISOString()}.mp3`)}>
                  <IconDownload style={{ marginRight: '5px' }} />Download
                </Button>
                <Button variant="outline" color="violet" onClick={() => openGroupModal()}>
                  Gerar Resumo
                </Button>
              </Flex>
                <ActionIcon pos={'absolute'} right={'10px'} top={'10px'} color="red" onClick={() => handleDeleteAudio(recording.id)}>
                  <IconTrash/>
                </ActionIcon>
            </Card>
          ))}
        </List>
      ) : (
        <Text c="dimmed">Nenhum áudio salvo.</Text>
      )}

      {/* Modal para seleção de grupo */}
      <Modal
        opened={modalGroupOpened}
        onClose={() => setModalGroupOpened(false)}
        title="Selecionar Grupo"
      >
        <Select
          label="Escolha um grupo"
          placeholder="Selecione um grupo"
          data={grupos.map(grupo => ({ value: grupo.name, label: grupo.name }))}
          onChange={setSelectedGroup}
        />
        <Button
          onClick={() => {
            const lastRecording = savedAudios[savedAudios.length - 1];
            if (lastRecording) generateSummary(lastRecording.audio);
          }}
          mt="md"
        >
          Gerar Resumo
        </Button>
      </Modal>

      {/* Feedback */}
      {feedbackText &&
      <>
        <img width={140} src={gifRobot} alt="Feedback Icon" />
        <Text c="dimmed" mt="md">{feedbackText}</Text>
      </> 
      }
    </Flex>
  );
};

export default AudioRecorder;
