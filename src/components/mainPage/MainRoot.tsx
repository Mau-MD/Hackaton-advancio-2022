import { Card, Grid, Space, TextInput } from '@mantine/core';
import React from 'react';
import { useState } from 'react';
import MainEvent from './MainEvent';
import SecondaryEvent from './SecondaryEvents';

const MainRoot = () => {
    const [opened, setOpened] = useState(false);
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
        <Grid>
            <Grid.Col span={4}>
                <SecondaryEvent />
            </Grid.Col>
            <Grid.Col span={4}>
                <SecondaryEvent />
            </Grid.Col>
            <Grid.Col span={4}>
                <SecondaryEvent />
            </Grid.Col>
            <Grid.Col span={4}>
                <SecondaryEvent />
            </Grid.Col>
            <Grid.Col span={4}>
                <SecondaryEvent />
            </Grid.Col>
            <Grid.Col span={4}>
                <SecondaryEvent />
            </Grid.Col>
        </Grid>
        </>
    )
}

export default MainRoot;