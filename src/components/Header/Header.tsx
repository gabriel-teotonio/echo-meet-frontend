import {
    Group,
    Button,
    UnstyledButton,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    Text,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './Header.module.css';
import { Link } from 'react-router-dom';
  
  export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  
    return (
      <Box pb={10}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Text size='1.5rem' fw='bold'>Echo Meet</Text>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to='/login' className={classes.link}>Login</Link>
              <Link to='/reunioes' className={classes.link}>Reuniões</Link>
              <Link to='/users' className={classes.link}>Usuários</Link>
              <Link to='/grupos' className={classes.link}>Grupos</Link>
  
            </Group>
  
            <Group visibleFrom="sm">
              <Button>Perfil</Button>
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
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
  
            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}></Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
  
            <Divider my="sm" />
  
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }