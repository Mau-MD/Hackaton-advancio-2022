import {
  Box,
  Title,
  Text,
  Group,
  Stack,
  BackgroundImage,
  Badge,
} from "@mantine/core";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { trpc } from "../../utils/trpc";
import ImageBanner from "./ImageBanner";
import RegistrationForm from "./RegistrationForm";
import _ from "lodash";

interface Props {
  id: string;
}

const DetailsRoot = ({ id }: Props) => {
  const { data: event, isLoading } = trpc.events.getEventFromId.useQuery(id);
  const { data: attendees, isLoading: isLoadingAttendees } =
    trpc.registration.getAttendeesCount.useQuery(id);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Stack>
      <Group>
        <Title>{event.title}</Title>
        <Badge>{attendees} Registrados</Badge>
      </Group>
      <Group>
        <Text transform="uppercase" color={"gray"}>
          {_.capitalize(format(event.date, "PPPP", { locale: es }))}
        </Text>
        <Text transform="uppercase" color={"gray"}>
          {event.location}
        </Text>
      </Group>
      <ImageBanner />
      <Stack>
        <Text size={"xl"} weight={700} color={"blue"}>
          Descripcion
        </Text>
        <Text align={"justify"}>{event.description}</Text>
      </Stack>
      <RegistrationForm id={id} />
    </Stack>
  );
};

export default DetailsRoot;
