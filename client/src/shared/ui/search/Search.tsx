import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { FC } from 'react'

interface SearchProps {
    onChange: (value: string) => void
    inputValue:  string
    placeholder?: string
}

export const Search: FC<SearchProps> = ({ inputValue, onChange, placeholder = 'Поиск' }) => {
    const handleClear = () => {
        onChange('')
    }

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
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon color='action' />
                        </InputAdornment>
                    ),
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
