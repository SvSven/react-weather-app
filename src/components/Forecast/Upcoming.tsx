import { format, parseISO } from 'date-fns'
import { TimeseriesEntry } from '../../types/forecast-types'
import { getIconDescription } from '../../utilities/Forecast'
import { getImageURL } from '../../utilities/image-utils'

export const Upcoming = ({ timeseries }: { timeseries: TimeseriesEntry[] }) => {
  return (
    <div className="grid grid-cols-2 gap-8 bg-gradient-to-r from-sky-900 via-cyan-800 to-sky-950 p-6 md:grid-cols-4">
      {timeseries.map((entry: TimeseriesEntry) => {
        const symbolCode = entry.data.next_1_hours.summary.symbol_code
        const description = getIconDescription(symbolCode)

        return (
          <div className="flex flex-col items-center p-1" key={entry.time}>
            <p className="pb-4 text-sm font-thin">{format(parseISO(entry.time).toString(), 'k:mm')}</p>

            <p className="mb-2 flex items-center text-left text-lg font-semibold">
              {entry.data.instant.details.air_temperature}
              <span className="ml-1 align-middle text-xs">°C</span>
            </p>

            <img src={getImageURL(symbolCode)} alt={description} className="mb-2 w-full max-w-12 object-cover" />
            <p className="text-center text-sm font-semibold">{description}</p>
          </div>
        )
      })}
    </div>
  )
}
