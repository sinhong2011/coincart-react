import { MenuItem, Select, Theme, useTheme } from '@mui/material'
import { useHomePageService } from 'api/service/home'
import { styled } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const StyledInputBase = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.primary,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    background: theme.palette.background.default,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const DistrictFilter = () => {
  const theme = useTheme()
  const { districtOptions, selectedDistrics, setSelectedDistrics } =
    useHomePageService()

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
        top: 'calc(env(safe-area-inset-top) + 12px)',
        left: 60,
        width: '80%',
      }}>
      <StyledInputBase
        displayEmpty
        value={selectedDistrics}
        onChange={e => {
          setSelectedDistrics(e.target.value as string)
        }}
        renderValue={selected => {
          if (!selected) {
            return <em>Filter by district</em>
          }
          return <>{selected}</>
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        input={<OutlinedInput />}
        style={{
          maxWidth: '100%',
          width: '100%',
        }}
        theme={theme}>
        {(districtOptions || []).map(district => (
          <MenuItem
            key={district}
            value={district}
            style={getStyles(district, districtOptions!, theme)}>
            {district}
          </MenuItem>
        ))}
      </StyledInputBase>
    </div>
  )
}

export default DistrictFilter
