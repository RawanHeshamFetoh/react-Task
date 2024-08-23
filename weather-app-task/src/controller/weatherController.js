import { PureComponent } from "react";
import WeatherModel from "../model/WeatherModel";
import axios from "axios";
// WeatherModel

export default class WeatherController extends PureComponent{
    static async featchWeather(city){
        try{
            const fetchData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=979e237b0f5e09e3c71616ac4781af58&units=metric`)
            // console.log(fetchData.data)
            // console.log( fetchData.data.id);
            // console.log( fetchData.data.weather[0].main);
            // console.log( Math.round(fetchData.data.main.temp));
            // console.log(fetchData.data.name);
            // console.log( Math.round(fetchData.data.wind.speed));
            // console.log( new Date(fetchData.data.timezone));
            const zoneHour = fetchData.data.timezone / 3600;
            const now = new Date()
            const localTime =new Date(now.getTime() + (zoneHour * 3600 * 1000));
            return new WeatherModel( fetchData.data.id , fetchData.data.weather[0].main,Math.round(fetchData.data.main.temp),fetchData.data.name , Math.round(fetchData.data.wind.speed), localTime )
            // return fetchData.data.map(el => new WeatherModel(el.id,el.weather[0].main))
        }catch(error){
            throw `error ${error}`
        }
    }

}