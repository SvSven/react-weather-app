interface Units {
  air_pressure_at_sea_level: string
  air_temperature: string
  cloud_area_fraction: string
  precipitation_amount: string
  relative_humidity: string
  wind_from_direction: string
  wind_speed: string
}

interface Details {
  air_pressure_at_sea_level: number
  air_temperature: number
  cloud_area_fraction: number
  relative_humidity: number
  wind_from_direction: number
  wind_speed: number
}

interface Upcoming {
  details: {
    percipitation_amount?: number
  }
  summary: {
    symbol_code: string
  }
}

interface TimeseriesEntry {
  data: {
    instant: {
      details: Details
    }
    next_12_hours: Upcoming
    next_1_hours: Upcoming
    next_6_hours: Upcoming
    time: string
  }
}

export interface Forecast {
  expires: string
  last_modified: string
  geometry: {
    coordinates: number[]
    type: string
  }
  properties: {
    meta: {
      units: Units
      updated_at: string
    }
  }
  timeseries: TimeseriesEntry[]
}
