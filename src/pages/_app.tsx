// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/styles";
import { AppShell, Container, Text } from "@mantine/core";
import { useState } from "react";
import { HeaderSearchProps, Navbar } from "../components/core/Navbar";
import { NotificationsProvider } from "@mantine/notifications";

interface NavLink {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
}

const links: NavLink[] = [{ label: "Home", link: "/" }];

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider withCSSVariables withNormalizeCSS>
      <NotificationsProvider>
        <SessionProvider session={session}>
          <AppShell padding={"md"} header={<Navbar links={links} />}>
            <Container>
              <Component {...pageProps} />
            </Container>
          </AppShell>
        </SessionProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
