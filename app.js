
const getCurrentLocationData = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=dd5a40ca2be4d0506df65b6565145f5e`;
      getData(url);
    });
  }
  else {
    displayError("Please turn on your location service")
  }
}

const displayError = message => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = `${message}`;
}

getCurrentLocationData();



const getSearchLocationData = () => {
  document.getElementById("error-message").innerText = '';
  const searchInput = document.getElementById("search-input");
  const inputText = searchInput.value;
  searchInput.value = "";
  if (inputText === "") {
    displayError("Please type something")
  }
  else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&units=metric&appid=dd5a40ca2be4d0506df65b6565145f5e`;
    getData(url);
  }
}

const getData = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(error => displayError("Invalid input"));
}

const displayData = data => {

  //update city name
  document.getElementById('city').innerText=`${data.name}`
  //update icon
  const iconDiv=document.getElementById('icon');
  const imgSrc = data.weather[0].icon;
  console.dir(imgSrc);
  iconDiv.innerHTML=`<img class="mx-auto"src="http://openweathermap.org/img/w/${data.weather[0].icon}.png
 " alt="">`

  // update condition
  document.getElementById("weather-condition").innerText=data.weather[0].description;

  // update temparature
  document.getElementById('temparature').innerText=parseInt(data.main.temp);

  document.getElementById('feels-like').innerText=`feels like | ${parseInt(data.main.feels_like)} `;

  //update wind speed and humidity

document.getElementById('wind-speed').innerText = `${data.wind.speed} km/h`
document.getElementById('humidity').innerText = `${data.main.humidity} %`


}

const SetCurrentDate = () => {
  const date = new Date();

  // update MONTH
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  document.getElementById("month").innerHTML = months[date.getMonth()];

  // update day
  const dateValue = date.getDate();
  document.getElementById("day").innerHTML = `${dateValue} `
}

SetCurrentDate();