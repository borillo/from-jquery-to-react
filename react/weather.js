var g,
GLoc = {

    settings: {
        geoButton: $('#geo-button'),
        geoErrorMessage: $('#geo-error-message'),
        startPos: '',
        searchQuery: '',
        closeButton: $('#close-error')
    },

    init: function() {
        g = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {
        g.geoButton.on('click', function() {
            GLoc.getGeoLocation();
        });

        g.closeButton.on('click', function() {
            GLoc.hideGeoErrorMessageBanner();
        });

    },

    getGeoLocation: function(numToGet) {
        navigator.geolocation.getCurrentPosition(GLoc.geoSuccess, GLoc.geoError);
    },

    showGeoErrorMessageBanner: function() {
        g.geoErrorMessage.toggleClass('hide');
    },

    hideGeoErrorMessageBanner: function() {
        g.geoErrorMessage.addClass('hide');
    },

    geoSuccess: function(position) {
        // We have the location. Don't display the banner.
        GLoc.hideGeoErrorMessageBanner();

        // Do magic with the location
        g.startPos = position;
        g.searchQuery = 'http://api.openweathermap.org/data/2.5/weather?lat=' + g.startPos.coords.latitude + '&lon=' + g.startPos.coords.longitude + '&appid=0596fe0573fa9daa94c2912e5e383ed3' +'';

        $.getJSON(g.searchQuery, function(data) {
            WeatherInfo.setWeatherData(data);
        });
    },

    geoError: function (error) {
        var geoErrorMessageTimeoutId = setTimeout(GLoc.showGeoErrorMessageBanner, 5000);
        switch (error.code) {
        case error.TIMEOUT:
            GLoc.showGeoErrorMessageBanner();
            break;
        }
    },
};

var w,
WeatherInfo = {

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

    init: function() {
        w = this.settings;
        this.bindUIActions();
        w.searchLocationInput.keypress (function(e) {
          if(e.keyCode === 13) {
            w.searchLocationButton.click();
          }
        });
    },

    bindUIActions: function() {
        w.searchLocationButton.on('click', function() {
            WeatherInfo.getWeatherData();
        });

        w.celsiusButton.on('click', function() {
            WeatherInfo.changeTempUnit('celsius');
        });

        w.fahrenheitButton.on('click', function() {
            WeatherInfo.changeTempUnit('fahrenheit');
        });

        w.closeAttribution.on('click', function() {
            WeatherInfo.closeAttributionModal();
        });

        w.openAttribution.on('click', function() {
            WeatherInfo.openAttributionModal();
        });
    },

    closeAttributionModal: function() {
        w.attributionModal.addClass('hide');
    },

    
    openAttributionModal: function() {
        w.attributionModal.removeClass('hide');
    },

    getWeatherData: function(searchQuery) {
        if (w.searchLocationInput.val() !== '') {
            w.searchQuery = 'http://api.openweathermap.org/data/2.5/weather?q=' + w.searchLocationInput.val() + '&appid=0596fe0573fa9daa94c2912e5e383ed3' + '';
            $.getJSON(w.searchQuery, function(data) {
                WeatherInfo.setWeatherData(data);
            });
        }
    },

    setWeatherData: function(data) {
        GLoc.hideGeoErrorMessageBanner();
        $('#front-page-description').addClass('hide');
        w.weather.removeClass('hide');
        w.location.text(data.name + ', ' + data.sys.country);
        w.humidity.text(data.main.humidity);
        w.weatherDescription.text(data.weather[0].description);
        w.tempNumber = data.main.temp;
        w.windSpeed = data.wind.speed;
        w.windDegree = data.wind.deg;
        WeatherInfo.getWeatherDirection();
        WeatherInfo.changeTempUnit('celsius');
        var time = Date.now() / 1000;
        WeatherInfo.getDayOrNight(time, data.sys.sunrise, data.sys.sunset);

    },

    getWeatherDirection: function() {
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

    isValid: function(weatherDataPiece) {
        if (typeof weatherDataPiece !== undefined) {
            return weatherDataPiece + ' ';
        } else {
            return '';
        }
    }, 

    changeTempUnit: function(unit) {
        var newTemp = w.tempNumber - 273.15;
        if (unit === 'celsius') {
            w.celsius.addClass('checked');
            w.fahrenheit.removeClass('checked');
            w.temperature.addClass('celsius-degree');
            w.temperature.removeClass('fahrenheit-degree');
            w.temperature.html(Math.round(newTemp));
            WeatherInfo.changeSpeedUnit('km');
        } else if (unit === 'fahrenheit') {
            w.temperature.html(Math.round(9/5 * newTemp + 32));
            w.celsius.removeClass('checked');
            w.fahrenheit.addClass('checked');
            w.temperature.removeClass('celsius-degree');
            w.temperature.addClass('fahrenheit-degree');
            WeatherInfo.changeSpeedUnit('m');
        }
    },

    changeSpeedUnit: function(unit) {
        if (unit === 'km') {
            w.wind.text('' + Math.round(w.windSpeed * 3.6));
            w.speedUnit.text('km/h');
        } else if (unit === 'm') {
            w.wind.text('' + Math.round(w.windSpeed * 2.23694185194));
            w.speedUnit.text('mph');
        }
    },

    getDayOrNight: function(time, sunrise, sunset) {

        if (time >= sunrise && time < sunset) {
            w.dayOrNight = 'daytime';
        } else if (time < sunrise) {
            if (time < sunset - 86400) {
                w.dayOrNight = 'daytime';
            } else {
                w.dayOrNight = 'nighttime';
            }
        } else if (time > sunset) {
            if (time < sunrise + 86400) {
                w.dayOrNight = 'nighttime';
            } else {
                w.dayOrNight = 'daytime';
            }
        }
    }
};