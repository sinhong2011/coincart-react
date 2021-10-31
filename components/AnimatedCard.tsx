import { Paper, Theme, useTheme } from '@mui/material'
import CountUp from 'react-countup'
import { styled } from '@mui/material/styles'

interface AnimatedCardProps {
  title: string
  content?: number
  duration?: number
  style?: React.CSSProperties
}

const Item = styled(Paper)(
  ({ theme, style }: { theme: Theme; style: React.CSSProperties }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 200,
    borderRadius: 15,
    ...style,
  })
)

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  content = 0,
  duration = 1,
  style = {},
}) => {
  const theme = useTheme()
  return (
    <Item theme={theme} style={style}>
      <div>{title}</div>
      <CountUp end={content} duration={duration} />
    </Item>
  )
}

export default AnimatedCard
