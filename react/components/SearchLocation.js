import React from 'react';

const API_TOKEN = "0596fe0573fa9daa94c2912e5e383ed3";

export default class SearchLocation extends React.Component {
    selectLocation(event) {
        if (event.keyCode !== 13) return;
        this.showWeather();
    }

    selectCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.showWeatherByLatitude(position.coords.longitude, position.coords.latitude);
        })
    }

    showWeatherByLatitude(longitude, latitude) {
        let url= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_TOKEN}`;

        $.getJSON(url, (data) => {
            this.props.onData(data);
        });
    }

    showWeather() {
        let location = this.refs["search-location-input"].value;
        let url= `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_TOKEN}`;

        $.getJSON(url, (data) => {
            this.props.onData(data);
        });
    }

    render() {
        return (
            <header className="search-bar">
                <p className="search-text">
                    <span className="search-location-text">
                        What's the weather like in
                        <input className="search-location-input" placeholder="City"
                               ref="search-location-input"
                               onKeyDown={this.selectLocation.bind(this)} /> ?
                    </span>
                </p>

                <div className="search-location-button-group">
                    <button onClick={this.showWeather.bind(this)}
                            className="fa fa-search search-location-button search-button"></button>
                    <button onClick={this.selectCurrentLocation.bind(this)} className="geo-button fa fa-location-arrow search-button"></button>
                </div>
            </header>
        );
    }
}
