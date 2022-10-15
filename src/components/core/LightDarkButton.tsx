import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';

const LightAndDarkModeButton = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    return (
        <div>
            <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                >
                {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
        </div>
    )
};

export default LightAndDarkModeButton;