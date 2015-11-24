import React from 'react';
import ReactDOM from 'react-dom';
import styles from './weather.css';
    
class SearchBar extends React.Component {
    render() {
        return (
            <header className="search-bar">
              <p className="search-text">
                <span className="search-location-text">What's the weather like in
                <input id="search-location-input" 
                       className="search-location-input" 
                       type="text" placeholder="City"/> ?</span>
              </p>
    
              <div className="search-location-button-group">
                <button id="search-location-button"
                        className="fa fa-search search-location-button search-button"></button>
                <button id="geo-button" 
                        className="geo-button fa fa-location-arrow search-button"></button>
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
    render() {
        return (
          <div id="weather" className="weather middle hide">
            <div className="location" id="location"></div>
            <div className="weather-container">
              <div id="temperature-info" className="temperature-info">
                <div className="temperature" id="temperature"></div>
                <div className="weather-description" id="weather-description"></div>
              </div>
              <div className="weather-box">
                <ul className="weather-info" id="weather-info">
                  <li className="weather-item humidity">Humidity: <span id="humidity"></span>%</li>
                  <li className="weather-item wind">
                    Wind: <span id="wind-direction"></span>
                    <span id="wind"></span>
                    <span id="speed-unit"></span></li>
                </ul>
              </div>
            </div>
          </div>
      );
    }
}
    
class WeatherApp extends React.Component {
   render() {
       return (
           <div>
             <SearchBar />
             <Wellcome />
             <Info />
           </div>
       );
    }
}
 
ReactDOM.render(<WeatherApp />, document.getElementById("react-output"));

var g, GLoc = {
   settings: {
      geoButton: $('#geo-button'),
      startPos: '',
      searchQuery: ''
   },

   init: function () {
      g = this.settings;
      this.bindUIActions();
   },

   bindUIActions: function () {
      g.geoButton.on('click', function () {
         GLoc.getGeoLocation();
      });
   },

   getGeoLocation: function (numToGet) {
      navigator.geolocation.getCurrentPosition(GLoc.geoSuccess);
   },

   geoSuccess: function (position) {
      // Do magic with the location
      g.startPos = position;
      g.searchQuery = 'http://api.openweathermap.org/data/2.5/weather?lat=' + g.startPos.coords.latitude + '&lon=' + g.startPos.coords.longitude + '&appid=0596fe0573fa9daa94c2912e5e383ed3' + '';

      $.getJSON(g.searchQuery, function (data) {
         WeatherInfo.setWeatherData(data);
      });
   }
};

var w, WeatherInfo = {
   settings: {
      tempIcon: $('#temp-icon'),
      weather: $('#weather'),
      weatherInfo: $('#weather-info'),
      location: $('#location'),
      weatherDescription: $('#weather-description'),
      temperature: $('#temperature'),
      tempNumber: '',
      fahrenheit: $('#fahrenheit'),
      celsius: $('#celsius'),
      wind: $('#wind'),
      searchLocationInput: $('#search-location-input'),
      searchLocationButton: $('#search-location-button'),
      celsiusButton: $('#celsius'),
      fahrenheitButton: $('#fahrenheit'),
      humidity: $('#humidity'),
      speedUnit: $('#speed-unit'),
      windSpeed: '',
      windDirection: $('#wind-direction'),
      windDegree: '',
      dayOrNight: '',
      closeAttribution: $('#close-attribution'),
      openAttribution: $('#noun-project'),
      attributionModal: $('#attribution-links')
   },

   init: function () {
      w = this.settings;
      this.bindUIActions();
      w.searchLocationInput.keypress(function (e) {
         if (e.keyCode === 13) {
            w.searchLocationButton.click();
         }
      });
   },

   bindUIActions: function () {
      w.searchLocationButton.on('click', function () {
         WeatherInfo.getWeatherData();
      });

      w.closeAttribution.on('click', function () {
         WeatherInfo.closeAttributionModal();
      });

      w.openAttribution.on('click', function () {
         WeatherInfo.openAttributionModal();
      });
   },

   closeAttributionModal: function () {
      w.attributionModal.addClass('hide');
   },


   openAttributionModal: function () {
      w.attributionModal.removeClass('hide');
   },

   getWeatherData: function (searchQuery) {
      if (w.searchLocationInput.val() !== '') {
         w.searchQuery = 'http://api.openweathermap.org/data/2.5/weather?q=' + w.searchLocationInput.val() + '&appid=0596fe0573fa9daa94c2912e5e383ed3' + '';
         $.getJSON(w.searchQuery, function (data) {
            WeatherInfo.setWeatherData(data);
         });
      }
   },

   setWeatherData: function (data) {
      if (!data.sys) {
         alert('Country error!!');
         return;
      }

      $('#front-page-description').addClass('hide');
      w.weather.removeClass('hide');
      w.location.text(data.name + ', ' + data.sys.country);
      w.humidity.text(data.main.humidity);
      w.weatherDescription.text(data.weather[0].description);
      w.tempNumber = data.main.temp;
      w.windSpeed = data.wind.speed;
      w.windDegree = data.wind.deg;
      WeatherInfo.getWeatherDirection();
      WeatherInfo.changeTempUnit();
   },

   getWeatherDirection: function () {
      if (w.windDegree > 337.5 || w.windDegree <= 22.5) {
         w.windDirection.text('N');
      } else if (22.5 < w.windDegree <= 67.5) {
         w.windDirection.text('NE');
      } else if (67.5 < w.windDegree <= 112.5) {
         w.windDirection.text('E');
      } else if (112.5 < w.windDegree <= 157.5) {
         w.windDirection.text('SE');
      } else if (157.5 < w.windDegree <= 202.5) {
         w.windDirection.text('S');
      } else if (202.5 < w.windDegree <= 247.5) {
         w.windDirection.text('SW');
      } else if (247.5 < w.windDegree <= 292.5) {
         w.windDirection.text('W');
      } else if (292.5 < w.windDegree <= 337.5) {
         w.windDirection.text('NW');
      }

   },

   isValid: function (weatherDataPiece) {
      if (typeof weatherDataPiece !== undefined) {
         return weatherDataPiece + ' ';
      } else {
         return '';
      }
   },

   changeTempUnit: function (unit) {
      var newTemp = w.tempNumber - 273.15;

      w.celsius.addClass('checked');
      w.fahrenheit.removeClass('checked');
      w.temperature.addClass('celsius-degree');
      w.temperature.removeClass('fahrenheit-degree');
      w.temperature.html(Math.round(newTemp));
      WeatherInfo.changeSpeedUnit('km');
   },

   changeSpeedUnit: function () {
      w.wind.text('' + Math.round(w.windSpeed * 3.6));
      w.speedUnit.text('km/h');
   }
};

$(function () {
   GLoc.init();
   WeatherInfo.init();
});
