// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/styles";
import { AppShell, Container, Text } from "@mantine/core";
import { useState } from "react";
import { HeaderSearchProps, Navbar } from "../components/core/Navbar";
import { useRouter } from "next/router";
import Sidebar from "../components/core/Sidebar";

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

  const router = useRouter();

  return (
    <MantineProvider withCSSVariables withNormalizeCSS>
      <SessionProvider session={session}>
        <AppShell
          padding={"md"}
          header={<Navbar links={links} />}
          navbar={router.pathname.startsWith("/admin") ? <Sidebar /> : <></>}
        >
          <Container>
            <Component {...pageProps} />
          </Container>
        </AppShell>
      </SessionProvider>
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
