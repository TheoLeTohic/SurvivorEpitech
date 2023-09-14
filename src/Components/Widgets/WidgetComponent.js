import React, {Component} from 'react';
import {CalendarBig, CalendarSmall, MeteoBig, MeteoSmall} from '../../Components/index';
import {WeatherApi} from '../../data/WeatherApi';

export default class WidgetComponent extends Component {
    getWeather = async (city) => {
        return await WeatherApi.fetchWeatherData(city);
    }

    render() {
        const { type, name, ...restProps } = this.props;

        if (type === "big") {
            switch (name) {
                case "Calendar":
                    return <CalendarBig {...restProps} />;
                case "Meteo":
                    return <MeteoBig {...restProps} />;
                default:
                    return null;
            }
        } else if (type === "small") {
            switch (name) {
                case "Calendar":
                    return <CalendarSmall {...restProps} />;
                case "Meteo":
                    return <MeteoSmall {...restProps} />;
                default:
                    return null;
            }
        }
        return null;
    }
}
