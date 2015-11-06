import React from 'react';
import ReactDOM from 'react-dom';

import SearchLocation from './components/SearchLocation';
import WeatherSummary from './components/WeatherSummary';
import Footer from './components/Footer';

class WeatherApp extends React.Component {
    componentDidMount() {
        GLoc.init();
        WeatherInfo.init();
    }

    changeLocation(data) {
        this.refs.summary.loadWeatherData(data);
    }

    render() {
        return (
            <div>
                <SearchLocation onData={this.changeLocation.bind(this)} />

                <WeatherSummary ref="summary" />

                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById("react-output"));