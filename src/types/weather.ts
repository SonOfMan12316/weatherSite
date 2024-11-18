export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherInterface {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  temp_kf?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
  pod?: string;
}

export interface ListItem {
  dt: number;
  main: Main;
  weather: WeatherInterface[];
  clouds: Clouds;
  wind: Wind;
  visibility?: number;
  pop?: number;
  sys?: Sys;
  dt_txt?: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone?: number;
  sunrise?: number;
  sunset?: number;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: Main;
  weather: WeatherInterface[];
}

export interface HourlyForecastInterface {
  list: ForecastItem[];
}
