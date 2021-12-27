import { Select } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { useAppConfig } from 'store/hooks'
import { getFilterCoincartList } from 'utils/xCm'

const DistrictFilter = () => {
  const { appState, setAvailableCoincarts } = useAppConfig()
  const [selectedDistrics, setSelectedDistrics] = useState('')
  const { t } = useTranslation()

  const updateCoincartDisplayList = () => {
    if (!selectedDistrics) {
      setAvailableCoincarts(
        getFilterCoincartList(appState.coincartScheduleList!)
      )
    } else {
      const filteredList = getFilterCoincartList(
        appState.coincartScheduleList || []
      )?.filter(coincart => coincart.district === selectedDistrics)

      setAvailableCoincarts(filteredList)

      const [firstCoincart] = filteredList
      if (firstCoincart)
        window?.map.setView([firstCoincart.latitude, firstCoincart.longitude])
    }
  }

  useEffect(() => {
    updateCoincartDisplayList()
  }, [selectedDistrics])

  const onSelectedDistricsChange:
    | ChangeEventHandler<HTMLSelectElement>
    | undefined = ({ target }) => {
    const value = target.value as string
    setSelectedDistrics(value)
  }

  return (
    <Select
      value={selectedDistrics}
      onChange={onSelectedDistricsChange}
      placeholder={t('common.filterByDistrict')}
      style={{
        position: 'fixed',
        zIndex: 1000,
        top: 'calc(env(safe-area-inset-top) + 12px)',
        right: 10,
        width: '80%',
      }}
      bg="white"
      borderColor="white">
      {(appState.districtOptions || []).map(district => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </Select>
  )
}

export default DistrictFilter
