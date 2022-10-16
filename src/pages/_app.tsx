// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/styles";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { HeaderSearchProps, Navbar } from "../components/core/Navbar";
import { useRouter } from "next/router";
import Sidebar from "../components/core/Sidebar";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

interface NavLink {
  link?: string;
  label: string;
  links?: { link: string; label: string }[];
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [opened, setOpened] = useState(false);

  const { data: cities, isLoading: isLoadingCities } =
    trpc.city.getCitiesForLink.useQuery();
  const { data: schools, isLoading: isLoadingSchools } =
    trpc.school.getSchoolsForLink.useQuery();

  const links: NavLink[] = [
    { label: "Inicio", link: "/" },
    { label: "Busqueda", link: "/search" },
    { label: "Ciudades", links: cities || [] },
    { label: "Escuelas", links: schools || [] },
  ];

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const router = useRouter();
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <SessionProvider session={session}>
            <AppShell
              padding={"md"}
              header={<Navbar links={links} />}
              navbar={
                router.pathname.startsWith("/admin") ? <Sidebar /> : <></>
              }
            >
              <Container>
                <Component {...pageProps} />
              </Container>
            </AppShell>
          </SessionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
