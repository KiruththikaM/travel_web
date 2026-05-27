import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'

type SearchProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  size?: 'small' | 'medium'
}

function Search({ value, onChange, onKeyDown, placeholder = 'Search ...', size = 'medium' }: SearchProps) {
  return (
    <div>
      <TextField
        fullWidth
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default Search
