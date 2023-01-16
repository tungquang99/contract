import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { copyClipboard } from '../../utils/copyClipboard';
import { PROTOCOL } from '../../contracts/abi';

const Code = () => {
    return (
        <Box sx={{boxShadow: '0 0 10px 0px rgba(0,0,0,0.2)', p: 5}}>
            <Button sx={{marginBottom: '12px'}} variant="contained" onClick={() => copyClipboard(JSON.stringify(PROTOCOL))} >Copy</Button>
            <Box sx={{p: 1, wordBreak: 'break-word', height: '500px', overflow: 'auto'}} >
                {JSON.stringify(PROTOCOL)}
            </Box>
        </Box>
    );
};

export default Code;