
import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment, TextField} from '@mui/material'


type SearchProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}



function Search({ value, onChange }: SearchProps) {

    

  return (
    <div>


      <TextField
          fullWidth
          placeholder="Search ..."
          value={value}
          onChange={onChange}
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
