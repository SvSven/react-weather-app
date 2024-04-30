import { useEffect, useState } from 'react'
import './App.css'
import { SearchBox, Loader } from './components'
import { ForwardGeocode } from './utilities/Geocode'
import type { GeocodeResult } from './utilities/Geocode'
import type { Forecast } from './types/forecast-types'
import { getForecast } from './utilities/Forecast'

function App() {
  const [location, setLocation] = useState<GeocodeResult | false>(false)
  const [forecast, setForecast] = useState<Forecast | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [forecast])

  const handleSearchSubmit = async (location: string) => {
    setLoading(true)

    const geocoded = await ForwardGeocode(location)
    if (!geocoded) return false

    const forecast = await getForecast(geocoded)
    if (!forecast) return false

    setLocation(geocoded)
    setForecast(forecast)
  }

  return (
    <div className="pk-4 container mx-auto">
      <SearchBox handleSubmit={handleSearchSubmit} />

      {loading && <Loader />}

      {!loading && location && forecast && (
        <div className="mt-6 max-w-sm overflow-hidden rounded border-2 border-teal-500">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">{location.formatted}</div>
            <p className="text-base text-gray-700">
              {forecast.properties.timeseries[0].data.instant.details.air_temperature}{' '}
              {forecast.properties.meta.units.air_temperature}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
