import React, { useState, useEffect } from "react";
import { Button, Card, Flex, Modal, Text, Select } from "@mantine/core";
import ReactMarkdown from 'react-markdown';
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

interface IAudioFile {
  name: string;
  urlAudio: string;
  file: File; // Adicionado para referenciar o arquivo original
}

interface IGrupo {
  id: string;
  name: string;
}

export default function GravacoesDashboard() {
  const [audioFiles, setAudioFiles] = useState<IAudioFile[]>([]);
  const [resumos, setResumos] = useState<string[]>([]); // Para armazenar os resumos gerados
  const [feedbackText, setFeedbackText] = useState('Estamos gerando o resumo da reunião...');
  const [opened, { open, close }] = useDisclosure(false);
  const [grupos, setGrupos] = useState<IGrupo[]>([]); // Armazena grupos
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null); // Grupo selecionado
  const [modalGroupOpened, { open: openGroupModal, close: closeGroupModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Função para buscar grupos
  const fetchGroups = async () => {
    try {
      const response = await axios.get('https://app.echomeets.online/groupsonly/', {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      // console.log(response.data)
      setGrupos(response.data);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };

  useEffect(() => {
    fetchGroups(); // Chama a função ao montar o componente
  }, []);

  // Função para processar o upload de arquivos
  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          setAudioFiles((prev) => [...prev, { name: file.name, urlAudio: base64Audio, file }]);
        };
      });
    }
  };

  // Função para enviar o áudio e gerar o resumo
  const aoGerarResumo = () => {
    openGroupModal(); // Abre o modal de seleção de grupo
  };

  const handleGenerateSummary = async (audioFile: IAudioFile) => {
    if (!selectedGroup) {
      setFeedbackText("Por favor, selecione um grupo.");
      open(); // Abre o modal para mostrar o feedback
      return;
    }

    open(); // Abre o modal de feedback
    const formData = new FormData();
    formData.append("audio_file", audioFile.file); // Usando a chave 'audio_file'
    
    try {
      const response = await axios.post(`https://app.echomeets.online/transcricao-resumo/${selectedGroup}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      console.log(response.data);
      if(response.status === 200) {
        const group = grupos.find(grupo => grupo.name === selectedGroup);
        setFeedbackText("Sua reunião foi transcrita com sucesso! Confira os detalhes no grupo selecionado");
        setResumos((prev) => [...prev, response.data.transcription]);
        setTimeout(() => {
          navigate('/grupos/' + group?.id);
        }, 1000);
      } else {
        setFeedbackText('Erro ao transcrever o áudio, tente novamente!');
      }
    } catch (error) {
      console.error("Erro ao transcrever o áudio:", error);
      setFeedbackText('Erro ao transcrever o áudio, tente novamente!');
    } finally {
      closeGroupModal();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
       <Flex py={'md'}>
    <Button variant="light" onClick={() => navigate(-1)}>Voltar</Button>
    </Flex>
      <Modal
        opened={opened} 
        onClose={close} 
        title="Resumo de reunião"
      >
        <Text>{feedbackText}</Text>
      </Modal>

      <Modal
        opened={modalGroupOpened}
        onClose={closeGroupModal}
        title="Selecionar Grupo"
      >
        <Select
          label="Escolha um grupo"
          placeholder="Selecione um grupo"
          data={grupos.map((grupo) => ({ value: grupo.name, label: grupo.name }))}
          onChange={setSelectedGroup}
        />
        <Button 
          onClick={() => {
            if (selectedGroup) {
              closeGroupModal();
              handleGenerateSummary(audioFiles[audioFiles.length - 1]); // Passa o último arquivo de áudio
            }
          }}
          mt="md"
        >
          Gerar Resumo
        </Button>
      </Modal>

      <h1>Uploader de Áudios MP3</h1>
      
      <input
        type="file"
        accept="audio/mp3"
        multiple
        onChange={handleAudioUpload}
        style={{ marginBottom: "20px" }}
      />
      
      {audioFiles.length === 0 ? (
        <p>Nenhum áudio enviado.</p>
      ) : (
        <ul>
          {audioFiles.map((audio, index) => (
           <Card
             shadow="sm" 
             padding="lg" 
             style={{ border: '1px solid #55506E', backgroundColor: '#161324' }} 
             radius="md" 
             key={index}
           >
             <Text size="xl" fw={500} c="white">{audio.name}</Text>
             <Flex gap={'md'} justify="flex-end" mt="md">
               <audio controls>
                 <source src={audio.urlAudio} type="audio/mp3" />
                 Seu navegador não suporta o elemento de áudio.
               </audio>
               <Button 
                 variant="outline" 
                 color="#5A3FE5" 
                 onClick={() => aoGerarResumo()} // Passando o arquivo de áudio
               >
                 Gerar Resumo
               </Button>
             </Flex>
           </Card>
          ))}
        </ul>
      )}

      {resumos.length > 0 && (
        <div style={{ marginTop: "20px", color: "white" }}>
          <h2>Resumos Gerados:</h2>
          <ul>
            {resumos.map((resumo, index) => (
              <li key={index}>
                <ReactMarkdown>{resumo}</ReactMarkdown> {/* Renderiza o resumo em Markdown */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
