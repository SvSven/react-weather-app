import { useEffect, useState } from 'react'
import './App.css'
import { SearchBox, Loader } from './components'
import { ForwardGeocode } from './utilities/Geocode'
import type { GeocodeResult } from './utilities/Geocode'
import { getForecast } from './utilities/Forecast'

function App() {
  const [location, setLocation] = useState<GeocodeResult | false>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [location])

  return (
    <div className="pk-4 container mx-auto">
      <SearchBox
        handleSubmit={async (location: string) => {
          setLoading(true)
          const geocoded = await ForwardGeocode(location)
          if (geocoded) {
            const forecast = await getForecast(geocoded)
            console.log(forecast)
          }
          setLocation(geocoded)
        }}
      />

      {loading && <Loader />}
    </div>
  )
}

export default App
