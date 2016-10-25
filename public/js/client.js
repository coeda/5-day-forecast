let getWeatherData = document.querySelector('#weather');
let container = document.querySelector('#container');

getWeatherData.addEventListener('click', function(event) {

      let weather = [];
      this.container = document.getElementById('container');
      let oReq = new XMLHttpRequest();
        oReq.addEventListener('progress', function(){
        });
        oReq.addEventListener('error', function(){
          console.log('ERROR :<');
        });
        oReq.addEventListener('load', function(){
          let parsedWeatherData = JSON.parse(this.responseText);
          weather = parsedWeatherData.list;
          console.log(parsedWeatherData.city.name);
          const view = document.createElement('div');
          const items = weather.map(newWeather => {
            let item = document.createElement('div');
            let title = document.createTextNode(newWeather.city);
            item.appendChild(title);
            return item;
          });
          console.log(weather);
          items.forEach(view.appendChild.bind(view));
          updateContainer(weather.city, container);
        });
      function updateContainer(data, container){
        container.innerHTML = '';
        container.innerHTML = data;
      }
      console.log(key.apiKey);
      oReq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=Honolulu,US&appid=' + key.apiKey);
      oReq.setRequestHeader('Accept', 'application/json');
      oReq.send();

  });
