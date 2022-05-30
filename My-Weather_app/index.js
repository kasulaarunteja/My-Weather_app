

let input = document.getElementById("cityname");
input.addEventListener("keyup", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

let showdata = document.getElementById("showdata");
let map = document.getElementById("map");

async function getWetherReport() {
  try {
    let city = document.getElementById("cityname").value;

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91dd9acfc6da1b22dec07cea91f20cc0&units=metric`
    );

    showMap(city);

    let data = await response.json();

    console.log(data);

    showWetherData(data);
  } catch (err) {
    console.log("error;", err);
  }
}

function showMap(city) {
  map.innerHTML = "";

  showdata.style.backgroundColor = "chocolate";
  let name = document.createElement("div");

  name.innerHTML = `<iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAU_WGFMPPzhmbCqWgSJP3VSjG2VTzFfmI
    &q=${city}">
</iframe>`;

  map.append(name);
}

function showWetherData(wether) {
  showdata.innerHTML = "";
  let x;

  let min_temp = document.createElement("p");
  min_temp.innerText = `Minimum Temparature : ${wether.main.temp_min}°C`;

  let max_temp = document.createElement("p");
  max_temp.innerText = `Maximum Temparature : ${wether.main.temp_max}°C`;

  x = document.createElement("p").innerText = `Wind : ${wether.wind.speed}`;
  let wind = document.createElement("p");
  wind.innerHTML = `${x}    <i class="fas fa-wind"></i>`;

  x = document.createElement("p").innerText = `Clouds : ${wether.clouds.all}`;
  let cloud = document.createElement("p");
  cloud.innerHTML = `${x}    <i class="fas fa-cloud-sun"></i>`;

  x = document.createElement(
    "p"
  ).innerText = `Sun Rise : ${wether.sys.sunrise}`;
  let sunrise = document.createElement("p");
  sunrise.innerHTML = `${x}    <i class="fas fa-sun"></i>`;

  x = document.createElement(
    "p"
  ).innerText = `Sun Set : ${wether.sys.sunset}`;
  let sunset = document.createElement("p");
  sunset.innerHTML = `${x}    <i class="fas fa-circle"></i>`;

  showdata.append(min_temp, max_temp, wind, cloud, sunrise, sunset);

  getResult()


}

async function getResult() {
  let city = document.getElementById("cityname").value;

  let x = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=bda5476c991f8afff5a737585bdd9399&units=metric`
  );

  let data = await x.json();

  show(data.list);
}

let results = document.getElementById("showresults");

function show(data) {
  results.innerHTML = "";
  data.map(function (elem, index) {

    let div = document.createElement("div");

    let x = document.createElement("img");

    x.src = `https://openweathermap.org/img/wn/${data[index].weather[0].icon}@2x.png`;

    let date = document.createElement("div");
    date.innerText = data[index].dt_txt;

    let min = document.createElement('span');
    min.innerText = data[index].main.temp_min + "°C";

    let max = document.createElement('span');
    max.innerText = data[index].main.temp_max + "°C";

    div.append(date, x, max, min);
    results.append(div);
  });
}


