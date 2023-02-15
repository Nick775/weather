import Layout from "components/Layout";
import Banner from 'components/Banner'
import Header from "components/Header";
import SearchBar from "components/SearchBar";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "components/Loader";
import { weatherState } from "types";
import { useDebounce } from '../utils';
import WeatherCard from "components/WeatherCard";
import Alert from "components/Alert";
import GetStarted from "components/GetStarted";
import Footer from "components/Footer";

export default function Home() {
  const [query,setQuery] = useState('')
  const [weather, setWeather] = useState<weatherState>();
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    async function fetchWeather() {
      setLoader(true);
      setWeather(undefined);

      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${debouncedQuery?.trim()}&appid=${
        process.env.NEXT_PUBLIC_OPEN_WEATHER_APP_ID
      }`
      ).then((res) => res.json())
      .then((data) => {
        if(data?.code !== 200) {
          setError(data?.message || 'Error');
          setWeather(undefined);
        } else {
          setWeather({
            temperature: data.main?.temp,
            description: data.weather[0]?.desription,
            humidity: data.main?.humidity,
            windSpeed: data.wind?.speed,
            icon: data.weather[0]?.icon
          })
          setError(null)
        }
      }).catch((e: any) => {
        setError(e);
      })
      setLoader(false);
    }

    if(debouncedQuery) {
      fetchWeather()
    }
  }, [debouncedQuery])

  const onQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((e.target as HTMLInputElement).value)
    setWeather(undefined);
    setError(null);
  }

  const onQueryClear = () => {
    setQuery('')
  }

  const onDismiss = () => {
    setError(null)
  }

  return (
    <>
      <Layout>
        <div className="isolate bg-white">
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
              <div>
                <h1 className="mb-5 text-4xl font-bold tracking-light sm:text-center sm:text-6xl">
                  Type town for weather
                </h1>

                <SearchBar query={query} onQuery={onQuery} onQueryClear={onQueryClear}/>

                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Loader status={loader}/>
                  {query && weather && !loader && (
                    <WeatherCard {...weather}/>
                  )}

                  {query && !loader && error && (
                    <Alert error={error} onDismiss={onDismiss} />
                  )}
                </div>
              </div>  
            </div>       
          </div>
        </main>
        </div>
      </Layout>
    </>
  )
}
