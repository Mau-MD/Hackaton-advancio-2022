import { Group, Textarea, TextInput, useMantineTheme, Text, Stack } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconClock, IconPhoto, IconUpload, IconX } from '@tabler/icons';
import React, { useState } from 'react';

const FormView = (props: Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    return (
        <Stack>
        {/* Nombre de la ventana */}
        <Group position='center'>
            <h2>Crea un nuevo evento!</h2>
        </Group>
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
        {/* Lugar */}
            <TextInput
            placeholder="e.g. CETYS Universidad Campus Ensenada"
            label="Lugar"
            withAsterisk
            />
        {/* Date and time */}
            <Group>
                <DatePicker placeholder="Selecciona tu fecha" label="Fecha" withAsterisk />
                <TimeInput
                label="Pick time"
                placeholder="Pick time"
                icon={<IconClock size={16} />}
                defaultValue={new Date()}
                />
            </Group>
        {/* Subir imagen */}
            <Text weight={600} size="sm" mt={5} mb={1}>Agrega imagenes del evento</Text>
            <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...props}
            >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                    <IconUpload
                        size={50}
                        stroke={1.5}
                    />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                    </div>
                </Group>
            </Dropzone>
        </Stack>
    )
    
}

export default FormView;