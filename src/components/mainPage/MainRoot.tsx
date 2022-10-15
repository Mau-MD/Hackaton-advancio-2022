import { Card } from '@mantine/core';
import React from 'react';
import { useState } from 'react';
import Demo from './Card';

const MainRoot = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
        <h1>Próximo evento</h1>
        <Demo />
        </>
    )
}

export default MainRoot;