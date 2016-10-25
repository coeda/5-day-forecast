'use strict';
var city;
class WeatherPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      city: null

    };

    this.onWeatherData = this.onWeatherData.bind(this);
    this.onWeatherError = this.onWeatherError.bind(this);
    this.loadDataFromOpenWeather = this.loadDataFromOpenWeather.bind(this);
  }

  onWeatherData(data) {
    const parsedWeatherData = JSON.parse(data.currentTarget.response).list;
    console.log(parsedWeatherData);
    this.setState({data: parsedWeatherData});
  }

  onWeatherError(error) {
    console.error(error);
  }

  loadDataFromOpenWeather() {
    this.state.city = document.getElementById('city').value;
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onWeatherData);
    oReq.addEventListener('error', this.onWeatherError);
    oReq.open('GET', this.props.weatherUrl +  this.state.city + ',US&appid='+ key.apiKey);
    oReq.send();
  }

  // componentWillMount() {
  //   this.loadDataFromOpenWeather();
  // }

  render() {
    return (
      <div>
        <h1>Weather Page</h1>
        <input id='city' type='text' placeholder='City' />
        <button type='buttton' onClick={this.loadDataFromOpenWeather}>Search</button>
        <WeatherList data={this.state.data} />
      </div>
    )
  }
}

WeatherPage.defaultProps = {
  data: React.PropTypes.array
}

WeatherPage.defaultProps = {
  data: []
}

class WeatherList extends React.Component {
  render() {
    const weatherListNode = this.props.data.map((dataItem) => {
      return (
        <WeatherItem weather={dataItem.weather[0].description} time={dataItem.dt_txt} key={dataItem.dt}/>
      )
    })
    return (
      <div className="weatherList">
        <h2>Weather List</h2>
        {weatherListNode}
      </div>
    )
  }
}

class WeatherItem extends React.Component {
  render() {
    return(
      <div className="weatherItem">
        <h4>Weather: {this.props.weather}</h4>
        <p>Time: {this.props.time}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <WeatherPage weatherUrl={'http://api.openweathermap.org/data/2.5/forecast?q='}/>,
    document.getElementById('container')
  )
