import CountUp from 'react-countup'
import { Skeleton, Box } from '@chakra-ui/react'
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
}) => (
  <motion.div initial={initial} animate={animate}>
    <Box style={style}>
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
    </Box>
  </motion.div>
)

export default AnimatedCard
