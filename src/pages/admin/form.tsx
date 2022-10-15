import { Textarea, TextInput } from '@mantine/core';
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
        
        </>
    )
    
}

export default FormView;