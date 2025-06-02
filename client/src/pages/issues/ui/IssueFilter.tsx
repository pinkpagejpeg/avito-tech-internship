import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { FC } from 'react'

interface IssueFilterProps {
    label: string                     // название фильтра (лейбл)
    value: string                     // текущее выбранное значение
    options: string[]                 // список возможных значений
    onChange: (value: string) => void // обработчик изменения значения фильтра
    fullWidth?: boolean               // Опционально: указатель растяжения фильтра на всю ширину
}

// Компонент фильтра
export const SelectFilter: FC<IssueFilterProps> = ({
    label,
    value,
    options,
    onChange,
    fullWidth = true, // По умолчанию фильтр занимает всю ширину
}) => {
    // Обработчик изменения значения выпадающего списка
    const handleChange = (e: SelectChangeEvent) => {
        onChange(e.target.value)
    }

    return (
        <FormControl fullWidth={fullWidth} size="small">
            <InputLabel>{label}</InputLabel>

            {/* Выпадающий список с опциями */}
            <Select value={value} label={label} onChange={handleChange}>
                <MenuItem value="">Все</MenuItem> {/* Общая опция "Все" */}
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
