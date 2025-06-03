import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import { FC } from 'react'
import { useTypedSelector } from 'shared/store'
import { SelectFilter } from './IssueFilter'
import { Status } from '@shared/model'

interface IssueFiltersProps {
    filters: {
        status: string; // фильтр по статусу
        board: string;  // фильтр по проекту (доске)
    },
    onFiltersChange: (filters: { // Обработчик изменения значения фильтра
        status: string;
        board: string;
    }) => void;
}

// Компонент фильтров по статусу и проекту (доске) для задач
export const IssueFilters: FC<IssueFiltersProps> = ({ filters, onFiltersChange }) => {
    // Получение списка проектов (досок) из стора для фильтрации
    const { boards } = useTypedSelector(state => state.board)

    // Получение списка названий проектов (досок) для фильтрации
    const boardOptions = boards.map((b) => b.name)

    // Список статусов для фильтрации
    const statusOptions = Object.values(Status)

    // Обработчик изменения значения фильтра
    const handleChange = (
        key: keyof typeof filters,
        value: string
    ) => {
        const updatedFilters = { ...filters, [key]: value };
        onFiltersChange(updatedFilters);
    };

    return (
        <Box>
            <Grid container spacing={2} direction='row' sx={{ justifyContent: 'flex-end' }}>
                {/* Фильтр по статусу */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SelectFilter
                        label="Статус"
                        value={filters.status}
                        options={statusOptions}
                        onChange={(value) => handleChange('status', value)}
                    />
                </Grid>

                {/* Фильтр по доске */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SelectFilter
                        label="Доска"
                        value={filters.board}
                        options={boardOptions}
                        onChange={(value) => handleChange('board', value)}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}