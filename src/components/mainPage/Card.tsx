import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={300}
          alt="Norway"
        />
      </Card.Section>

      <Group mt="s" mb="s">
        <Text weight={500}><h2>Main Event</h2></Text>
      </Group>
    </Card>
  );
}

export default Demo;