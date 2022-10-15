import {
  Button,
  Card,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import MainEvent from "./MainEvent";
import SecondaryEvent from "./SecondaryEvents";

interface FormValues {
  query: string;
}
const MainRoot = () => {
  const [opened, setOpened] = useState(false);

  const { data: events, isLoading } = trpc.events.getEvents.useQuery({});
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      query: "",
    },
  });

  const firstEvent = events?.[0];

  const handleSearch = (values: FormValues) => {
    router.push(`/search?query=${encodeURIComponent(values.query)}`);
  };

  return (
    <>
      <h1>Próximo evento</h1>
      {firstEvent && (
        <MainEvent
          id={firstEvent.id}
          date={firstEvent.date}
          title={firstEvent.title}
          image={firstEvent.image}
        />
      )}
      <Space h="md"></Space>
      <form onSubmit={form.onSubmit(handleSearch)}>
        <Stack>
          <TextInput
            placeholder="e.g. UABC Halloween Party"
            label="Buscar evento"
            {...form.getInputProps("query")}
          />
          <Button type="submit"> Buscar</Button>
        </Stack>
      </form>
      <Space h="md"></Space>
      <SimpleGrid cols={3}>
        {events?.map((event) => (
          <SecondaryEvent
            key={event.id}
            title={event.title}
            date={event.date}
            id={event.id}
            image={event.image}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MainRoot;
