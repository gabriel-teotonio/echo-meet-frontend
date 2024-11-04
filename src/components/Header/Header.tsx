import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    Text,
    Flex,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
  
  export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const navigate = useNavigate()
    const { logout } = useAuth()
  
    const handleSignOut = () => {
      navigate('/login')
      logout()
    }

    return (
      <Box pb={10}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Text style={{cursor: 'pointer'}} onClick={() => navigate('/')} size='1.5rem' fw='bold'>Echo Meet</Text>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to='/' className={classes.link}>Home</Link>
              <Link to='/users' className={classes.link}>Usuários</Link>
              <Link to='/grupos' className={classes.link}>Grupos</Link>
              <Link to='/gravacoes' className={classes.link}>Upload de arquivos</Link>
              {/* <Link to='/gravacao' className={classes.link}>Upload de arquivos</Link> */}
              {/* <Link to='/dashboard' className={classes.link}>Dashboards</Link> */}
            </Group>
  
            <Group visibleFrom="sm">
              <Button onClick={handleSignOut}>Sair da conta</Button>
            </Group>
  
            <Burger color='violet.7' opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea bg={'dark.8'} h={`calc(100vh - ${rem(80)})`} mx="-md">
  
            <Flex mt={'lg'} direction={'column'} h="100%" gap={'lg'}>
              <Link to='/' className={classes.link}>Home</Link>
              <Link to='/users' className={classes.link}>Usuários</Link>
              <Link to='/grupos' className={classes.link}>Grupos</Link>
              <Link to='/gravacoes' className={classes.link}>Upload de arquivos</Link>
              {/* <Link to='/gravacao' className={classes.link}>Upload de arquivos</Link> */}
              {/* <Link to='/dashboard' className={classes.link}>Dashboards</Link> */}
            </Flex>
  
            <Divider my="sm" />
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }