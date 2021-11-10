import { MenuItem, Select, Theme, useTheme } from '@mui/material'
import { useHomePageService } from 'api/service/home'
import { styled, alpha } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useRouter } from 'next/router'

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const StyledInputBase = styled(Select)(({ theme }) => ({
  color: 'inherit',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
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
  const {
    getCoinCartSchedule,
    districtOptions,
    selectedDistrics,
    setSelectedDistrics,
  } = useHomePageService()
  const router = useRouter()
  return router.pathname === '/' ? (
    <Search>
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
        }}>
        {(districtOptions || []).map(district => (
          <MenuItem
            key={district}
            value={district}
            style={getStyles(district, districtOptions!, theme)}>
            {district}
          </MenuItem>
        ))}
      </StyledInputBase>
    </Search>
  ) : null
}

export default DistrictFilter
