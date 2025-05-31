import {
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { FC } from 'react'
import { useTypedSelector } from 'shared/store'

interface IssueFiltersProps {
    filters: {
        status: string;
        board: string;
    },
    onFiltersChange: (filters: {
        status: string;
        board: string;
    }) => void;
}

export const IssueFilters: FC<IssueFiltersProps> = ({ filters, onFiltersChange }) => {
    const { boards } = useTypedSelector(state => state.board)
    const statusOptions = ['Backlog', 'InProgress', 'Done']

    const handleChange = (
        key: keyof typeof filters,
        value: string
    ) => {
        const updatedFilters = { ...filters, [key]: value };
        onFiltersChange(updatedFilters);
    };

    return (
        <Box>
            <Grid container spacing={2} direction="row" sx={{ justifyContent: "flex-end" }}>
                {/* Фильтр по статусу */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size='small'>
                        <InputLabel>Статус</InputLabel>
                        <Select
                            value={filters.status}
                            label='Статус'
                            onChange={(e: SelectChangeEvent) => handleChange('status', e.target.value)}
                        >
                            <MenuItem value=''>Все</MenuItem>
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Фильтр по доске */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size='small'>
                        <InputLabel>Доска</InputLabel>
                        <Select
                            value={filters.board}
                            label='Доска'
                            onChange={(e: SelectChangeEvent) => handleChange('board', e.target.value)}
                        >
                            <MenuItem value="">Все</MenuItem>
                            {boards.map((board) => (
                                <MenuItem key={board.name} value={board.name}>
                                    {board.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box >
    );
}