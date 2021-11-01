import { Paper, Skeleton, Theme, useTheme } from '@mui/material'
import CountUp from 'react-countup'
import { styled } from '@mui/material/styles'
import {
  motion,
  AnimationControls,
  Target,
  VariantLabels,
  TargetAndTransition,
} from 'framer-motion'
interface AnimatedCardProps {
  title: string
  countUp?: number
  duration?: number
  style?: React.CSSProperties
  children?: React.ReactNode
  countupPrefix?: string
  isLoading?: boolean
  contentStyle?: React.CSSProperties
  initial?: boolean | Target | VariantLabels
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean
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

const SkeletonItem = () => (
  <>
    <Skeleton animation="wave"></Skeleton>
    <Skeleton animation="wave"></Skeleton>
  </>
)

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  countUp = 0,
  duration = 1,
  style = {},
  children,
  countupPrefix = '',
  isLoading,
  contentStyle = {},
  animate,
  initial,
}) => {
  const theme = useTheme()
  return (
    <motion.div initial={initial} animate={animate}>
      <Item theme={theme} style={style}>
        {isLoading ? (
          <SkeletonItem />
        ) : (
          <>
            <div className="animatedcard-title">{title}</div>
            <div className="animatedcard-content" style={contentStyle}>
              {countUp ? (
                <CountUp
                  end={countUp}
                  duration={duration}
                  prefix={countupPrefix}></CountUp>
              ) : (
                children
              )}
            </div>
          </>
        )}
      </Item>
    </motion.div>
  )
}

export default AnimatedCard
