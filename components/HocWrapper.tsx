import React from 'react'

type HocWrapperProps = {
  children: React.ReactNode
}

const HocWrapper = ({ children }: HocWrapperProps) => <>{children}</>

export default HocWrapper
