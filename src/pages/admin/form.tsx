import { Group, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';

const FormView = () => {
    return (
        <>
        {/* Nombre del evento */}
            <TextInput
            placeholder="e.g. CETYS Expoingeniería"
            label="Nombre del evento"
            withAsterisk
            />
        {/* Ubicación */}
            <Textarea
            placeholder="Describe actividades, ponentes, expositores, concursos, etc."
            label="Descripción"
            withAsterisk
            />
        {/* Date and time */}
            <Group>
            <DatePicker placeholder="Selecciona tu fecha" label="Fecha" withAsterisk />
            </Group>
        </>
    )
    
}

export default FormView;