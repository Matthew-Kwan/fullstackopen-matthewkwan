import React, {useState,useEffect} from 'react' 
import axios from 'axios'

const Info = ({country}) => {

    const [weather, setWeather] = useState({})

    // [START API CALL] Weatherstack
    const hook= () => {
        const api_key = process.env.REACT_APP_WEATHER_API_KEY
        console.log('API_KEY: ', api_key)

        // Set up axios call 
        const params = {
            access_key: api_key,
            query: country.name
          }

        axios
            .get('http://api.weatherstack.com/current', {params})
            .then( response => {
                console.log(response)
                setWeather(response.data.current)
                
            }).catch(error => {
                console.log(error)
            })
    } 
    useEffect(hook,[])
    // [END API CALL] Weatherstack

    
    return (
        <div>
            <p> Name: {country.name} </p>
            <p> Capital: {country.capital} </p>
            <p> Population: {country.population} </p>
            <p> Languages: {country.languages.map(x => x.name + ' ')} </p>
            <img src={country.flag} alt='flag'/> <br></br>
            <h1> Current Weather </h1>
            <p> Temperature: {weather.temperature} </p>
            <img src={weather.weather_icons} alt='current_weather'/>
            <p> wind: {weather.wind_speed} mph {weather.wind_dir} </p>
        </div>
    ) 
}




export default Info 