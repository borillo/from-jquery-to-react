import React from 'react';

export default class WellcomeMessage extends React.Component
{
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
        let styles = {
            wellcome: {
                display: (this.state.loaded) ? 'none' : 'block'
            },
            info: {
                display: (this.state.loaded) ? 'block' : 'none'
            }
        };

        return (
            <div>
                <div className="front-page-description middle" style={styles.wellcome}>
                    <h1>Blank Canvas Weather</h1>
                    <h2>An Obligatory Weather App</h2>
                </div>

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
                                    Wind: <span id="wind-direction">{this.state.windDirection}</span>  <span id="wind">{this.state.windSpeed}</span> <span id="speed-unit">{this.state.speedUnit}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}