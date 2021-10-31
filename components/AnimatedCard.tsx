import { Paper, Theme, useTheme } from '@mui/material'
import CountUp from 'react-countup'
import { styled } from '@mui/material/styles'

interface AnimatedCardProps {
  title: string
  countUp?: number
  duration?: number
  style?: React.CSSProperties
  children?: React.ReactNode
  countupPrefix?: string
}

const Item = styled(Paper)(
  ({ theme, style }: { theme: Theme; style: React.CSSProperties }) => ({
    ...theme.typography.body2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 100,
    borderRadius: 15,
    ...style,
  })
)

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  countUp = 0,
  duration = 1,
  style = {},
  children,
  countupPrefix = '',
}) => {
  const theme = useTheme()
  return (
    <Item theme={theme} style={style}>
      <div className="animatedcard-title">{title}</div>
      <div className="animatedcard-content">
        {countUp ? (
          <CountUp
            end={countUp}
            duration={duration}
            prefix={countupPrefix}></CountUp>
        ) : (
          children
        )}
      </div>
    </Item>
  )
}

export default AnimatedCard
