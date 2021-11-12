import { useHomePageService } from 'api/service/home'

import { Select } from '@chakra-ui/react'

const DistrictFilter = () => {
  const { districtOptions, selectedDistrics, setSelectedDistrics } =
    useHomePageService()

  return (
    <Select
      value={selectedDistrics}
      onChange={e => {
        setSelectedDistrics(e.target.value as string)
      }}
      placeholder={'Filter by district'}
      style={{
        position: 'fixed',
        zIndex: 1000,
        top: 'calc(env(safe-area-inset-top) + 12px)',
        right: 10,
        width: '80%',
      }}
      bg="white"
      borderColor="white">
      {(districtOptions || []).map(district => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </Select>
  )
}

export default DistrictFilter
