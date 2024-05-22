import { getImageURL } from '../../utilities/image-utils'
import { getIconDescription, filterTimeseries } from '@utils/Forecast'
import { Upcoming } from './Upcoming'
import { WindDetails } from './WindDetails'
import type { Forecast } from '../../types/forecast-types'
import type { GeocodeResult } from '../../utilities/Geocode'

export const WeatherCard = ({ forecast, location }: { forecast: Forecast; location: GeocodeResult }) => {
  const timeseries = filterTimeseries(forecast.properties.timeseries)
  const currentForecast = timeseries[0]

  const symbolCode = currentForecast.data.next_1_hours.summary.symbol_code
  const description = getIconDescription(symbolCode)

  return (
    <div className="mt-6 max-w-lg overflow-hidden rounded bg-gradient-to-r from-sky-700 via-cyan-700 to-sky-800 text-white">
      <div className="p-6">
        <h3 className="text-base font-light">{location.formatted}</h3>
        <div className="flex gap-4 pt-4">
          <p className="text-left text-5xl font-semibold">
            {currentForecast.data.instant.details.air_temperature}
            <span className="ml-1 align-top text-2xl">°C</span>
          </p>
          <div className="flex flex-grow items-center gap-2">
            <img src={getImageURL(symbolCode)} alt={description} className="w-full max-w-12 object-cover" />
            <p className="text-lg font-semibold">{description}</p>
          </div>
        </div>
        <div>
          <p className="mb-2 mt-2 text-base">Humidity: {currentForecast.data.instant.details.relative_humidity}%</p>

          <WindDetails
            speed={currentForecast.data.instant.details.wind_speed}
            direction={currentForecast.data.instant.details.wind_from_direction}
          />
        </div>
      </div>
      <Upcoming timeseries={timeseries.slice(1, 5)} />
    </div>
  )
}
