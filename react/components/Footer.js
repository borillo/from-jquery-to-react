import React from 'react';

export default class Footer extends React.Component
{
    render() {
        const styles = {
            footer: {
                position: 'absolute',
                bottom: 0,
                width: '100%'
            }
        };

        return (
            <footer className="site-footer" style={styles.footer}>
                <div className="attribution site-footer-section">
                    Powered by <a href="http://openweathermap.org/">OpenWeatherMap</a>, Icons from
                    <button id="noun-project" className="noun-project">Noun Project</button>
                </div>
                <p className="author site-footer-section">
                    Made by <a href="http://htovey.com">Heather Tovey</a> for
                    <a href="http://www.freecodecamp.com/">Free Code Camp</a>
                </p>
            </footer>
        );
    }
}