import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { FC, useState } from 'react'

interface SearchProps {
    onChange: (value: string) => void
    placeholder?: string
}

export const Search: FC<SearchProps> = ({ onChange, placeholder = 'Поиск' }) => {
    const [inputValue, setInputValue] = useState('')

    const handleClear = () => {
        setInputValue('')
        onChange('')
    }

    const changeInputHandler = (value: string) => {
        setInputValue(value)
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
