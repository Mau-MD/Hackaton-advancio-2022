import React, { useState } from 'react';
import FormView from '../../../pages/admin/form';

const FormRoot = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <FormView />
        </>
    )
};

export default FormRoot;