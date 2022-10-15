import { Card, Grid, SimpleGrid, Space, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import MainEvent from "./MainEvent";
import SecondaryEvent from "./SecondaryEvents";

const MainRoot = () => {
  const [opened, setOpened] = useState(false);

  const { data: events, isLoading } = trpc.events.getEvents.useQuery({});

  return (
    <>
      <h1>Próximo evento</h1>
      <MainEvent />
      <Space h="md"></Space>
      <TextInput
        placeholder="e.g. UABC Halloween Party"
        label="Buscar evento"
      />
      <Space h="md"></Space>
      <SimpleGrid cols={3}>
        {events?.map((event) => (
          <SecondaryEvent
            key={event.id}
            title={event.title}
            id={event.id}
            image={event.image}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MainRoot;
