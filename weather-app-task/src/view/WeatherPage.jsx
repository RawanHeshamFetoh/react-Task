import { PureComponent , useState } from "react"
import WeatherController from "../controller/weatherController"
import WeatherItem from "./WeatherItem"
export default class WeatherPage extends PureComponent {
    constructor(props){
       super(props)
       this.state = {
            weatherData : [],
            loading: true ,
            error: null,
            searchQuery: 'cairo'
       }
    }
    
    featchweather = async(city)=>{
        try{
          const weatherData = await WeatherController.featchWeather(city)
          this.setState({weatherData,loading:false})
          // console.log(weatherData)
        }catch(e){
          this.setState({error:e,loading:false})
          console.log(e)
        }
       }
       componentDidMount(){
        this.featchweather(this.state.searchQuery)
       }
        changeCity = (e)=>{
          const value = e.target.value
          if(value.trim().length === 0){
            this.setState({searchQuery:""})
          }else{
            this.setState({searchQuery:value})
            this.featchweather(value)
          }
      }
      enterEvent =(e)=>{
        if(e.key === "Enter"){
          this.changeCity(e)
          e.target.blur()  // remove focus from input field after pressing enter key.
        }
      }
      render(){
        const {weatherData,loading , error} = this.state
        // console.log(searchQuery);
        
        if(loading){
            return <h1>Loading...</h1>
        }
        if(error){
            return <h1>Error: {error}</h1>
        }
        return(
          <div className="container">
            <div className="glass mainGlass glass1"></div>
            <div className="glass mainGlass glass2"></div>
            <div className="glass mainGlass glass3"></div>
            <div className="weather-page">
              <h1>dark weather</h1>
              <h2> Seeing the weather of the whole world with <span>Dark Weather!</span> </h2>
              <div className="weather-content">
              
              <input type="text" placeholder="search here" onBlur={this.changeCity} onKeyDown={this.enterEvent}  className="search-city"/>
              <div className="glass"></div>
              
              <WeatherItem weather={weatherData}/>
              
              </div>
            </div>
          </div>
        )
       }
}
