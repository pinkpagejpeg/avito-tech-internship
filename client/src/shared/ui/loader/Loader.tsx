import { CircularProgress, Box } from '@mui/material'
import { FC } from 'react'

// Компонент индикатора загрузки (спиннер)
export const Loader: FC = () => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='150px'>
            <CircularProgress color='primary' size={50} thickness={4} />
        </Box>
    );
};
