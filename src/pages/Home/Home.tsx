import { Button, Flex, SimpleGrid, Title } from "@mantine/core";
import IconAdd from '../../assets/icons/icon-add.svg'
import IconIA from '../../assets/icons/icon-IA.svg'
import IconFolder from '../../assets/icons/icon-folder.svg'
import IconMic from '../../assets/icons/icon-mic.svg'
import classes from './Home.module.css';
import { CardSummary } from "../../components/CardSummary/CardSummary";
    
export function Home() {
    return (
        <>
            <SimpleGrid spacing={"xs"} cols={4}>
            <Flex direction={'column'} gap={'xs'}>
                <Button className={classes.btnPrimary} leftSection={<img src={IconAdd}/>} variant="default">
                    Criar novo grupo
                </Button>
                <Button className={classes.btnPrimary} leftSection={<img src={IconIA}/>} variant="default">
                    Gerar Resumo de Reunião 
                </Button>
            </Flex>
            <Flex direction={'column'} gap={'xs'}>
                <Button className={classes.btnPrimary} leftSection={<img src={IconMic}/>} variant="default">
                    Gravar Reunião
                </Button>
                <Button className={classes.btnPrimary} leftSection={<img src={IconFolder}/>} variant="default">
                    Arquivo externo
                </Button>
            </Flex>
            </SimpleGrid>

            <Flex mt={'lg'} direction={'column'}>
            <Title size={'h4'}>Resumos recentes</Title>
            <Flex mt={'sm'} gap={'sm'} direction={'column'}>
                <CardSummary />
                <CardSummary />
                <CardSummary />
                <CardSummary />
            </Flex>
            </Flex>
            </>
    )
}
