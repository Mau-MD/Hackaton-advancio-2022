import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Title,
  Affix,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme
} from "@mantine/core";
import { useDisclosure, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import { useRouter } from "next/router";
import LightAndDarkModeButton from "./LightDarkButton";


const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export interface HeaderSearchProps {
  links: {
    link?: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export const Navbar = ({ links }: HeaderSearchProps) => {
  
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const router = useRouter();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={() => router.push(item.link)}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Center className={classes.link}>
              <span className={classes.linkLabel}>{link.label}</span>
              <IconChevronDown size={12} stroke={1.5} />
            </Center>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <span
        key={link.label}
        className={classes.link}
        style={{ cursor: "pointer" }}
        onClick={() => router.push(link?.link || "")}
      >
        {link.label}
      </span>
    );
  });
// MantineProvider
  return (
    <Header height={56} mb={120}>
      <Container>
      <Affix position={{ top: 15, left: 20 }}>
        <ColorSchemeProvider colorScheme ={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{colorScheme}}>
            <LightAndDarkModeButton />
          </MantineProvider>
        </ColorSchemeProvider>
      </Affix>
        <div className={classes.inner}>
          <Title
            order={4}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            paDondeFuga
          </Title>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </Header>
  );
};
