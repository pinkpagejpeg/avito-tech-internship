import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material'
import { FC } from 'react'

interface SelectInputProps<T = string | number> {
    label: string                     // название селекта
    value: T                          // текущее выбранное значение
    options: T[]                      // список возможных значений (может быть string или number)
    onChange: React.Dispatch<React.SetStateAction<T>> // обработчик изменения значения
    disabled?: boolean                // Опционально: указатель доступности поля
    required?: boolean                // Опционально: указатель обязательности поля
    fullWidth?: boolean               // Опционально: указатель растяжения фильтра на всю ширину
    getOptionLabel?: (val: T) => string // Опционально: как отображать опцию
}

// Компонент селекта
export const SelectInput: FC<SelectInputProps> = ({
    label,
    value,
    options,
    onChange,
    disabled = false, // По умолчанию доступен
    required = false, // По умолчанию обязателен к заполнению
    fullWidth = true, // По умолчанию занимает всю ширину
    getOptionLabel = (val) => String(val),
}) => {
    // Обработчик изменения значения выпадающего списка
    const handleChange = (e: SelectChangeEvent<unknown>) => {
        const val = e.target.value as typeof value
        onChange(val)
    }

    return (
        <FormControl fullWidth={fullWidth} disabled={disabled} required={required} size="small">
            <InputLabel id='select-label'>{label}</InputLabel>
            <Select
                labelId='select-label'
                value={value ?? ''}
                label={label}
                onChange={handleChange}
                displayEmpty
            >
                {
                    options.map((option) => (
                        <MenuItem key={String(option)} value={option}>
                            {getOptionLabel(option)}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl >
    );
}
