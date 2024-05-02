import { useEffect, useState } from 'react'
import './App.css'
import { SearchBox, Loader } from './components'
import { ForwardGeocode } from './utilities/Geocode'
import type { GeocodeResult } from './utilities/Geocode'
import type { Forecast } from './types/forecast-types'
import { getForecast } from './utilities/Forecast'
import { WeatherCard } from './components/Forecast/WeatherCard'

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

      {!loading && location && forecast && <WeatherCard location={location} forecast={forecast} />}
    </div>
  )
}

export default App
