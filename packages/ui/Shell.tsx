import React from "react";
import { AppShell, Box, Button, Header, Title, useMantineTheme } from "@mantine/core";
import { useAppShell } from "./useAppShell"

export const Shell: React.FunctionComponent<{
  title: string,
  children: JSX.Element
}> = ({ title, children }) => {
  const { user, score, setUser } = useAppShell();
  const theme = useMantineTheme()

  return (
    <AppShell
      padding="md"
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        },
      }}
      header={
        <Header
          height={60}
          p="xs"
          display="flex"
          style={{ background: theme.colors.blue[8] }}
        >
          {title}
          <Box sx={{ flexGrow: 1 }}></Box>
          {!user && (
            <Button variant="light" onClick={() => setUser("lucas")}>
              Login
            </Button>
          )}
          {user && (
            <Box>
              <Title>{user} - {score}</Title>
              <Button variant="light" onClick={() => setUser(null)}>Logout</Button>
            </Box>
          )}
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}