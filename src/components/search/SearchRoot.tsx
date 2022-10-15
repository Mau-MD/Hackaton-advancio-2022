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
import EventSearchCard from "./EventSearchCard";

const SearchRoot = () => {
  return (
    <Stack>
      <Title order={5}>Busqueda de Eventos</Title>
      <TextInput label="Nombre del evento" />
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
        <EventSearchCard
          id={""}
          title={"Hack Ensenada"}
          badges={["Advancio", "CETYS Universidad"]}
          description="Unete a este hackaton"
        />
        <EventSearchCard
          id={""}
          title={"Evento deportivo"}
          badges={["UABC", "Deporte", "Ensenada", "Tijuana"]}
          description="Participa en este deporte de quemados"
        />
        <EventSearchCard
          id={""}
          title={"Hack Ensenada"}
          badges={["Advancio"]}
          description="Unete a este hackaton"
        />
      </SimpleGrid>
    </Stack>
  );
};

export default SearchRoot;
