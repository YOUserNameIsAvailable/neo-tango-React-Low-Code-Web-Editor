import * as React from 'react';
import { createElement } from 'react';
import './index.scss';
// @ts-ignore
import ReactWeather, { useWeatherBit } from 'react-open-weather';

export interface WeatherProps {
  /**
   * Latitude
   */
  lat: string;
  /**
   * Longitude
   */
  lon: string;
  /**
   * Language
   */
  lang: 'en' | 'de' | 'es';
  /**
   * Unit
   */
  unit: 'M' | 'S' | 'I';
  /**
   * Location label
   */
  locationLabel: string;
  /**
   * Temp unit
   */
  temperature: 'C' | 'F';
  /**
   * Wind speed unit
   */
  windSpeed: string;
  /**
   * Forecast
   */
  showForecast: boolean;
  /**
   * API key
   */
  apiKey: string;
}

const Weather: React.FC<WeatherProps> = function Weather(props, ref) {
  const {
    lat,
    lon,
    lang,
    unit,
    temperature,
    windSpeed,
    showForecast,
    locationLabel,
    apiKey,
    ...otherProps
  } = props;

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: apiKey || '5da2c96c4391498fa16879bca03dc11a',
    lat: lat || '48.137154',
    lon: lon || '11.576124',
    lang: lang,
    unit: unit,
  });

  return (
    <ReactWeather
      ref={ref}
      className="ReactWeather"
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang={lang}
      locationLabel={locationLabel}
      unitsLabels={{ temperature: temperature, windSpeed: windSpeed }}
      showForecast={showForecast}
      {...otherProps}
    />
  );
};

Weather.displayName = 'Weather';
Weather.defaultProps = {
  locationLabel: 'Munich',
  lat: '48.137154',
  lon: '11.576124',
  lang: 'en',
  unit: 'M',
  temperature: 'C',
  windSpeed: 'Km/h',
  showForecast: true,
  apiKey: '5da2c96c4391498fa16879bca03dc11a',
};

export default Weather;
