import type { GeocodeResult } from './Geocode'
import type { Forecast, TimeseriesEntry } from '../types/forecast-types'
import iconLegend from './icon-legend'
import { closestTo, isAfter } from 'date-fns'

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

export const filterTimeseries = (timeseries: TimeseriesEntry[]) => {
  // todo: account for different timezones

  const now = new Date().toISOString().slice(0, -5) + 'Z'
  const times = timeseries.map(({ time }) => time)

  const closestTime = closestTo(now, times)?.toISOString().slice(0, -5) + 'Z'
  if (!closestTime) return timeseries

  return timeseries.filter(({ time }) => time === closestTime || isAfter(time, closestTime))
}
