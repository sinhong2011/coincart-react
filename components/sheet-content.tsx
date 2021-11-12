import { BoxProps, Flex } from '@chakra-ui/react'
import React, { forwardRef } from 'react'

type Props = {
  stack?: boolean
  children: React.ReactNode
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'children'> &
  BoxProps

export const SheetContent = forwardRef<HTMLDivElement, Props>(
  ({ stack, className, ...props }: Props, ref) => (
    <Flex
      className={className}
      flexDirection={stack ? 'column' : 'row'}
      alignItems="stretch"
      width="100%"
      maxWidth="24rem"
      mx="auto"
      {...props}
      ref={ref}
    />
  )
)

SheetContent.displayName = 'SheetContent'
