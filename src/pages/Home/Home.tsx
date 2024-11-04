import { Button, Flex, SimpleGrid } from "@mantine/core";
import IconAdd from '../../assets/icons/icon-add.svg'
import IconIA from '../../assets/icons/icon-IA.svg'
import IconFolder from '../../assets/icons/icon-folder.svg'
import IconMic from '../../assets/icons/icon-mic.svg'
import classes from './Home.module.css';
import { useNavigate } from "react-router-dom";
    
export function Home() {
    const navigate = useNavigate()

    return (
        <>
            <SimpleGrid spacing={"xs"} cols={4}>
            <Flex direction={'column'} gap={'xs'}>
                <Button onClick={() => navigate('/grupos')} className={classes.btnPrimary} leftSection={<img src={IconAdd}/>} variant="default">
                    Criar novo grupo
                </Button>
                <Button onClick={() => navigate('/gravacoes')} className={classes.btnPrimary} leftSection={<img src={IconIA}/>} variant="default">
                    Gerar Resumo de Reunião 
                </Button>
            </Flex>
            <Flex direction={'column'} gap={'xs'}>
                <Button onClick={() => navigate('/gravacao')} className={classes.btnPrimary} leftSection={<img src={IconMic}/>} variant="default">
                    Gravar Reunião
                </Button>
                <Button 
                onClick={() => navigate('/gravacoes')}
                className={classes.btnPrimary} leftSection={<img src={IconFolder}/>} variant="default">
                    Arquivo externo
                </Button>
            </Flex>
            </SimpleGrid>

            </>
    )
}
