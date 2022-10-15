import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

interface Props {
  id: string;
  title: string;
  image: string;
}

function SecondaryEvent({ id, title, image }: Props) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          }
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Group>
        <Text weight={500}>
          <h4>{title}</h4>
        </Text>
      </Group>
    </Card>
  );
}

export default SecondaryEvent;
