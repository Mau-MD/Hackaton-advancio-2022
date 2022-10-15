import { Group, Textarea, TextInput, useMantineTheme, Text, Stack, Button, Affix, Image, SimpleGrid } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconClock, IconPhoto, IconUpload, IconX } from '@tabler/icons';
import React, { useState } from 'react';

const FormView = (props: Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    const now = new Date();

    const setFile = (files: any) => {
        (files: any) => form.setFieldValue("image", files);
    };

    
    interface FormTypes {
        name: string;
        description: string;
        place: string;
        date: Date;
        time: Date;
        image: FileWithPath[];
    }

    const form = useForm<FormTypes>({
        initialValues: {
            image: [],
            name: '',
            description: '',
            place: '',
            date: now,
            time: now,
        },
    
        validate: {
            name: (value) =>
            value.length > 0 ? null : "El nombre es requerido",
            description: (value) =>
            value.length > 0 ? null : "La descripción es requerida",
            place: (value) =>
            value.length > 0 ? null : "la ubicación es requerida",
            time: (value) =>
            value != null ? null : "La hora es requerida",
        },
    });

    const previews = form.values.image.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
            key={index}
            src={imageUrl}
            imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
        });
    

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
            {...form.getInputProps("name")}
            />
        {/* Ubicación */}
            <Textarea
            placeholder="Describe actividades, ponentes, expositores, concursos, etc."
            label="Descripción"
            withAsterisk
            {...form.getInputProps("description")}
            />
        {/* Lugar */}
            <TextInput
            placeholder="e.g. CETYS Universidad Campus Ensenada"
            label="Lugar"
            withAsterisk
            {...form.getInputProps("place")}
            />
        {/* Date and time */}
            <Group>
                <DatePicker placeholder="Selecciona tu fecha" label="Fecha" withAsterisk {...form.getInputProps("date")} />
                <TimeInput
                label="Pick time"
                placeholder="Pick time"
                icon={<IconClock size={16} />}
                defaultValue={new Date()}
                withAsterisk
                {...form.getInputProps("time")}
                />
            </Group>
        {/* Subir imagen */}
            <Text weight={600} size="sm" mt={5} mb={1}>Agrega imagenes del evento</Text>
            <div>
                <Dropzone accept={IMAGE_MIME_TYPE} onDrop={(file) => form.setFieldValue("image", file)}>
                    <Text align="center">Drop images here</Text>
                </Dropzone>

                <SimpleGrid
                    cols={4}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    mt={previews.length > 0 ? 'xl' : 0}
                >
                    {previews}
                </SimpleGrid>
            </div>
            <Group position='center'>
                <Button style={{ width: 150, height: 40 }}>
                    Create event
                </Button>
            </Group>
        </Stack>
    )
}

export default FormView;