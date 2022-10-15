import {
  Grid,
  Group,
  MultiSelect,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import DashboardCard from "./DashboardCard";

const DashboardRoot = () => {
  return (
    <Stack>
      <Title order={5}>Tus eventos: CETYS Universidad</Title>
      <TextInput label="Nombre del evento" placeholder="Buscar evento" />
      <Group grow>
        <MultiSelect label="Ciudad" data={[]} />
        <MultiSelect label="Escuela" data={[]} />
        <DateRangePicker label="Fechas" />
      </Group>
      <Title order={5} mt={15}>
        Resultados
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        <DashboardCard
          id={""}
          title={"Hack Ensenada"}
          badges={["Advancio", "CETYS Universidad"]}
          description="Unete a este hackaton"
        />
        <DashboardCard
          id={""}
          title={"Evento deportivo"}
          badges={["UABC", "Deporte", "Ensenada", "Tijuana"]}
          description="Participa en este deporte de quemados"
        />
        <DashboardCard
          id={""}
          title={"Hack Ensenada"}
          badges={["Advancio"]}
          description="Unete a este hackaton"
        />
      </SimpleGrid>
    </Stack>
  );
};

export default DashboardRoot;
