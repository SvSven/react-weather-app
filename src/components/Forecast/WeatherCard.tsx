import { getImageURL } from '../../utilities/image-utils'
import type { Forecast } from '../../types/forecast-types'
import type { GeocodeResult } from '../../utilities/Geocode'
import iconLegend from '../../utilities/icon-legend'

const getIconDescription = (icon: string) =>
  iconLegend.filter(({ symbol }) => symbol === icon.substring(0, icon.indexOf('_'))).map(({ english }) => english)[0]

export const WeatherCard = ({ forecast, location }: { forecast: Forecast; location: GeocodeResult }) => {
  const symbolCode = forecast.properties.timeseries[0].data.next_1_hours.summary.symbol_code
  const description = getIconDescription(symbolCode)

  return (
    <div className="mt-6 max-w-sm overflow-hidden rounded bg-gradient-to-r from-sky-700 via-cyan-700 to-sky-800">
      <div className="p-6 text-white">
        <h3 className="text-base font-light">{location.formatted}</h3>
        <div className="flex pt-4">
          <div className="flex flex-grow items-center gap-2">
            <img src={getImageURL(symbolCode)} alt={description} className="w-full max-w-12 object-cover" />
            <p className="text-lg font-semibold">{description}</p>
          </div>
          <div>
            <p className="text-right text-5xl font-semibold">
              {forecast.properties.timeseries[0].data.instant.details.air_temperature}
              <span className="ml-1 align-top text-2xl">°C</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
