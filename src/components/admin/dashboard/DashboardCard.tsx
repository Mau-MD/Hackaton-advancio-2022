import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { IconFile } from "@tabler/icons";
import { type } from "os";

interface Props {
  id: string;
  title: string;
  badges: string[];
  description: string;
  image?: string;
}

const defaultImage =
  "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80";

const DashboardCard = ({
  id,
  title,
  badges,
  description,
  image = defaultImage,
}: Props) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} height={160} alt="Norway" />
      </Card.Section>
      <Stack>
        <div>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{title}</Text>
          </Group>

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
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Editar
          </Button>
        </div>
      </Stack>
    </Card>
  );
};

export default DashboardCard;
