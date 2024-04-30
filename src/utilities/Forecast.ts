import type { GeocodeResult } from './Geocode'
import type { Forecast } from '../types/forecast-types'

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
