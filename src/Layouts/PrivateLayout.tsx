import { Container, Loader, Stack } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { useAuth } from "../contexts/AuthContext";

export const PrivateLayout = () => {
    const { user: isLogged, isLoading } = useAuth()

    // mostra loading enquanto verifica se user esta logado
    if (isLoading) return <Stack h="100%" w="100%" justify='center' align='center'><Loader /></Stack> 
    
    return (
        <Container m={0} p='0' fluid bg='#0B0915' c='white' h='auto' mih='100vh'>       
        {
            isLogged ? (
                <>
            <Header />
            <Container mih={'100vh'} h={'auto'} pt={'sm'} pb={'sm'} fluid>
                {/* outlet são todos os compoentes filhos */}
                <Outlet /> 
            </Container>
            </>
            ) : <Navigate to={'/login'}/>
        }
        </Container>
    )
}