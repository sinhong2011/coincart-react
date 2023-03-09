import { Select } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { useAppConfig } from 'store/hooks'
import { getFilterCoincartList } from 'utils/xCm'

const DistrictFilter = () => {
  const { appState, setAvailableCoincarts } = useAppConfig()
  const [selectedDistricts, setSelectedDistricts] = useState('')
  const { t } = useTranslation()

  const updateCoincartDisplayList = () => {
    if (!selectedDistricts) {
      setAvailableCoincarts(
        getFilterCoincartList(appState.coincartScheduleList!)
      )
    } else {
      const filteredList = getFilterCoincartList(
        appState.coincartScheduleList || []
      )?.filter(coincart => coincart.district === selectedDistricts)

      setAvailableCoincarts(filteredList)

      const [firstCoincart] = filteredList
      if (firstCoincart)
        window?.map.setView([firstCoincart.latitude, firstCoincart.longitude])
    }
  }

  useEffect(() => {
    updateCoincartDisplayList()
  }, [selectedDistricts])

  const onSelectedDistrictsChange:
    | ChangeEventHandler<HTMLSelectElement>
    | undefined = ({ target }) => {
    const value = target.value as string
    setSelectedDistricts(value)
  }

  return (
    <Select
      value={selectedDistricts}
      onChange={onSelectedDistrictsChange}
      placeholder={t('common.filterByDistrict')}
      style={{
        position: 'fixed',
        zIndex: 1000,
        top: 'calc(env(safe-area-inset-top) + 12px)',
        right: 10,
        width: '80%'
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
