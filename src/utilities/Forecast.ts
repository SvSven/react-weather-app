import type { GeocodeResult } from './Geocode'
import type { Forecast } from '../types/forecast-types'
import iconLegend from './icon-legend'

export const getForecast = async (location: GeocodeResult): Promise<Forecast | false> => {
  const results = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/api/forecast?lat=${location.lat}&lng=${location.lng}`,
  )
  if (results) {
    const data = await results.json()
    return data.forecast
  }

  return false
}

export const getIconDescription = (icon: string): string => {
  const lang = 'english' // todo: add language switch
  const parsedIcon = icon.includes('_') ? icon.substring(0, icon.indexOf('_')) : icon
  const description = iconLegend.filter(({ symbol }) => symbol === parsedIcon)

  return description[0][lang] || ''
}
