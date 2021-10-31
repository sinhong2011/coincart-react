import { Paper, Theme, useTheme } from '@mui/material'
import CountUp from 'react-countup'
import { styled } from '@mui/material/styles'

interface AnimatedCardProps {
  title: string
  content?: number
  duration?: number
}

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  content = 0,
  duration = 1,
}) => {
  const theme = useTheme()
  return (
    <Item theme={theme}>
      <div>{title}</div>
      <CountUp end={content} duration={duration} />
    </Item>
  )
}

export default AnimatedCard
