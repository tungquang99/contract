import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({data, input, name, onChange, idx}) => {
    return (
        <TextField
            id="filled-basic"
            label={data?.name + "( " + data?.type  +" )"}
            variant="filled"
            type={data?.type}
            name={data.name === '' ? name : data.name}
            sx={{width: '100%'}}
            value={input[data.name === '' ? name : data.name]}
            onChange={(e) => onChange(e, data.type, idx)}
        />
    );
};

export default Input;