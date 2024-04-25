import opencage from 'opencage-api-client'

type GeocodeResult = {
  formatted: string
  timezone: string
  lat: number
  lng: number
}

export const ForwardGeocode = async (address: string): Promise<GeocodeResult | false> => {
  const data = await opencage.geocode({ q: address, key: import.meta.env.VITE_GEOCODE_KEY })

  // todo: add error handling
  if (data) {
    if (data.status.code === 200 && data.results.length > 0) {
      const place = data.results[0]
      return {
        formatted: place.formatted,
        timezone: place.annotations.timezone.name,
        ...place.geometry,
      }
    }
  }

  return false
}
