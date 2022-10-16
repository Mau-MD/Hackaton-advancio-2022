import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { IconFile } from "@tabler/icons";
import { type } from "os";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import _ from "lodash";
import { useRouter } from "next/router";

interface Props {
  id: string;
  title: string;
  badges: string[];
  description: string;
  image?: string;
  date: Date;
  admin?: boolean;
}

const defaultImage =
  "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80";

const EventSearchCard = ({
  id,
  title,
  badges,
  description,
  date,
  image = defaultImage,
  admin = false,
}: Props) => {
  const router = useRouter();

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Stack>
        <div>
          <div style={{ margin: "1em 0 " }}>
            <Text weight={500}>{title}</Text>
            <Text color="dimmed">
              {_.capitalize(format(date, "PPPP", { locale: es }))}
            </Text>
          </div>

          <Group style={{ height: "20px", overflowY: "hidden" }} mb={20}>
            {badges.map((badge) => (
              <Badge color="pink" variant="light" key={badge}>
                {badge}
              </Badge>
            ))}
          </Group>

          <div style={{ height: "50px" }}>
            <Text size="sm" color="dimmed" lineClamp={2}>
              {description}
            </Text>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() =>
              router.push(admin ? `/admin/form?id=${id}` : `/event/${id}`)
            }
          >
            {admin ? "Editar" : "Registrarse"}
          </Button>
        </div>
      </Stack>
    </Card>
  );
};

export default EventSearchCard;
