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
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './Header.module.css';
  
  export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  
    return (
      <Box pb={10}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <p>Logo</p>
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Inicio
              </a>
              <a href="#" className={classes.link}>
                Relatórios
              </a>
              <a href="#" className={classes.link}>
                Grupos
              </a>
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