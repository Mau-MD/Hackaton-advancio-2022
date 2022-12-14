import { Group, Text, Stack, Box } from "@mantine/core";
import { Navbar, NavLink } from "@mantine/core";
import { IconCalendarEvent, IconChevronRight, IconEdit } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState(1);
  const route = useRouter();

  const handleSelect = (section: number) => {
    setActive(section);
    route.push("/admin/form");
  };

  return (
    <Navbar width={{ base: 300 }}>
      <Stack>
        <Text align="center" size={"xl"} weight={600} mt={20}>
          Administracion
        </Text>
        <Box>
          <NavLink
            label={"Editar eventos"}
            icon={<IconEdit />}
            active={active === 1}
            rightSection={<IconChevronRight />}
            onClick={() => {
              handleSelect(1);
              route.push("/admin/dashboard");
            }}
          />
          <NavLink
            label={"Crear nuevo Evento"}
            icon={<IconCalendarEvent />}
            active={active === 0}
            rightSection={<IconChevronRight />}
            onClick={() => {
              handleSelect(0);

              route.push("/admin/form");
            }}
          />
        </Box>
      </Stack>
    </Navbar>
  );
};

export default Sidebar;
