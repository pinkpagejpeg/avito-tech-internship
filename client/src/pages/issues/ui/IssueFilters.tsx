import {
    Box,
    MenuItem,
    Select,
    TextField,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { FC, useState } from 'react'

interface IssueFiltersProps {
    onFiltersChange: (filters: {
        status: string;
        board: string;
        title: string;
        assignee: string;
    }) => void;
    boards?: string[];
    assignees?: string[];
}

export const IssueFilters: FC<IssueFiltersProps> = ({ onFiltersChange, boards = [], assignees = [] }) => {
    const [filters, setFilters] = useState({
        status: '',
        board: '',
        title: '',
        assignee: ''
    });

    const handleChange = (
        key: keyof typeof filters,
        value: string
    ) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);
        onFiltersChange(updatedFilters);
    };

    return (
        <Box>
            <Grid container spacing={2}>
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
                            <MenuItem value='Backlog'>Backlog</MenuItem>
                            <MenuItem value='InProgress'>In Progress</MenuItem>
                            <MenuItem value='Done'>Done</MenuItem>
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
                                <MenuItem key={board} value={board}>
                                    {board}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Фильтр по исполнителю */}
                {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size='small'>
                        <InputLabel>Исполнитель</InputLabel>
                        <Select
                            value={filters.board}
                            label='Исполнитель'
                            onChange={(e: SelectChangeEvent) => handleChange('assignee', e.target.value)}
                        >
                            <MenuItem value="">Все</MenuItem>
                            {assignees.map((assignee) => (
                                <MenuItem key={assignee} value={assignee}>
                                    {assignee}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> */}
            </Grid>
        </Box >
    );
}