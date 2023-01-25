// useAppShell.ts
import create from "zustand";
import { persist } from "zustand/middleware";
var useAppShell = create()(
  persist(
    (set) => ({
      user: null,
      score: 0,
      setUser: (user) => set(() => ({ user })),
      addToScore: (amount) => set((state) => ({ score: state.score + amount }))
    }),
    {
      name: "app-shell"
    }
  )
);

// Shell.tsx
import { AppShell, Box, Button, Header, Title, useMantineTheme } from "@mantine/core";
import { jsx, jsxs } from "react/jsx-runtime";
var Shell = ({ title, children }) => {
  const { user, score, setUser } = useAppShell();
  const theme = useMantineTheme();
  return /* @__PURE__ */ jsx(
    AppShell,
    {
      padding: "md",
      styles: {
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      },
      header: /* @__PURE__ */ jsxs(
        Header,
        {
          height: 60,
          p: "xs",
          display: "flex",
          style: { background: theme.colors.blue[8] },
          children: [
            /* @__PURE__ */ jsx(Title, { style: { color: theme.colors.gray[0] }, children: title }),
            /* @__PURE__ */ jsx(Box, { sx: { flexGrow: 1 } }),
            !user && /* @__PURE__ */ jsx(Button, { variant: "light", onClick: () => setUser("lucas"), children: "Login" }),
            user && /* @__PURE__ */ jsxs(Box, { sx: { display: "flex" }, children: [
              /* @__PURE__ */ jsxs(Title, { mr: "md", children: [
                user,
                " - ",
                score
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "light", onClick: () => setUser(null), children: "Logout" })
            ] })
          ]
        }
      ),
      children
    }
  );
};
export {
  Shell,
  useAppShell
};
