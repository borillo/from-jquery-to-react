import React from 'react';
import ReactDOM from 'react-dom';
import styles from './weather.css';
    
const API_TOKEN = "0596fe0573fa9daa94c2912e5e383ed3";
    
class SearchBar extends React.Component {
    selectLocation(event) {
        if (event.keyCode !== 13) return;
        this.showWeather();
    }
    
    selectCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.showWeatherByLatitude(position.coords.longitude, position.coords.latitude);
        });
    }
    
    showWeather() {
        let location = this.refs["search-location-input"].value;
        let url= `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_TOKEN}`;
    
        $.getJSON(url, (data) => {
            this.props.onData(data);
        });
    }
    
    showWeatherByLatitude(longitude, latitude) {
        let url= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_TOKEN}`;
    
        $.getJSON(url, (data) => {
            this.props.onData(data);
        });
    }
    
    render() {
        return (
             <header className="search-bar">
               <p className="search-text">
                 <span className="search-location-text">What's the weather like in
                   <input id="search-location-input"
                          ref="search-location-input"
                          className="search-location-input" type="text"
                          placeholder="City"
                          onKeyDown={this.selectLocation.bind(this)} /> ?
                 </span>
               </p>
    
               <div className="search-location-button-group">
                 <button id="search-location-button"
                         className="fa fa-search search-location-button search-button"
                         onClick={this.showWeather.bind(this)}></button>
                 <button id="geo-button"
                         className="geo-button fa fa-location-arrow search-button"
                         onClick={this.selectCurrentLocation.bind(this)}></button>
               </div>
             </header>
        );
    }
}
 
class Wellcome extends React.Component {
    render() {
        return (
            <div id="front-page-description" className="front-page-description middle">
              <h1>Blank Canvas Weather</h1>
              <h2>An Obligatory Weather App</h2>
            </div>
        );
    }
}

class Info extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loaded: false,
            location: '',
            humidity: '',
            description: '',
            temperature: '',
            windSpeed: 0,
            windDegree: '',
            windDirection: ''
        };
    }
    
    loadWeatherData(data) {
        this.setState({
            loaded: true,
            location: data.name + ', ' + data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            windDirection: this.getWindDirection(data.wind.deg),
            temperature: Math.round(data.main.temp - 273.15),
            windSpeed: Math.round(data.wind.speed * 3.6)
        });
    }
    
    getWindDirection(degree) {
        if (degree > 337.5 || degree <= 22.5) {
            return 'N';
        } else if (22.5 < degree <= 67.5) {
            return 'NE';
        } else if (67.5 < degree <= 112.5) {
            return 'E';
        } else if (112.5 < degree <= 157.5) {
            return 'SE';
        } else if (157.5 < degree <= 202.5) {
            return 'S';
        } else if (202.5 < degree <= 247.5) {
            return 'SW';
        } else if (247.5 < degree <= 292.5) {
            return 'W';
        } else if (292.5 < degree <= 337.5) {
            return 'NW';
        }
    }
    
    render() {
        return (
            <div id="weather" className="weather middle" style={styles.info}>
              <div className="location" id="location">{this.state.location}</div>
    
              <div className="weather-container">
                <div id="temperature-info" className="temperature-info">
                  <div className="temperature" id="temperature">{this.state.temperature}</div>
                  <div className="weather-description" id="weather-description">{this.state.description}</div>
                </div>
                <div className="weather-box">
                  <ul className="weather-info" id="weather-info">
                    <li className="weather-item humidity">Humidity: <span id="humidity">{this.state.humidity}</span>%</li>
                    <li className="weather-item wind">
                      Wind: <span id="wind-direction">{this.state.windDirection}</span> <span id="wind">{this.state.windSpeed}</span> <span id="speed-unit">{this.state.speedUnit}</span>
                    </li>
                  </ul>
                </div>
              </div>
             </div>
        );
    }
}
    
class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ready : false };
    }
    
    showWeatherData(data) {
        this.setState({ ready : true });
        this.refs["info"].loadWeatherData(data);
    }
    
    render() {
        return (
            <div>
              <SearchBar onData={this.showWeatherData.bind(this)} />
              { (this.state.ready) ? <Info ref="info" /> : <Wellcome /> }
            </div>
        );
    }
}
 
ReactDOM.render(<WeatherApp />, document.getElementById("react-output"));
