import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { FC } from 'react'

interface SearchProps {
    onChange: (value: string) => void
    inputValue:  string
    placeholder?: string
}

// Компонент поиска
export const Search: FC<SearchProps> = ({ inputValue, onChange, placeholder = 'Поиск' }) => {
    // Обработчик нажатия на кнопку для очистки поля ввода
    const handleClear = () => {
        onChange('')
    }

    // Обработчик изменения значения в поле ввода
    const changeInputHandler = (value: string) => {
        onChange(value)
    }

    return (
        <TextField
            fullWidth
            variant='outlined'
            size='small'
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => changeInputHandler(e.target.value)}
            slotProps={{
                input: {
                    // Иконка поиска
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon color='action' />
                        </InputAdornment>
                    ),
                    // Иконка очистки
                    endAdornment: inputValue && (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleClear} size='small'>
                                <ClearIcon fontSize='small' />
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            }}
        />
    );
}
