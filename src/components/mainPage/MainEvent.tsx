import {
  Card,
  Image,
  Badge,
  Button,
  Group,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import _ from "lodash";
import { useRouter } from "next/router";

interface Props {
  id: string;
  title: string;
  image?: string;
  date: Date;
}
function MainEvent({ id, title, image, date }: Props) {
  const router = useRouter();
  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      onClick={() => router.push(`/event/${id}`)}
    >
      <Card.Section>
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          }
          height={300}
          alt="Norway"
        />
      </Card.Section>

      <div style={{ marginTop: "1rem" }}>
        <Title order={2}>{title}</Title>
        <Text color="dimmed">
          {_.capitalize(format(date, "PPPP", { locale: es }))}
        </Text>
      </div>
    </Card>
  );
}

export default MainEvent;
