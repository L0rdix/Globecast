let inputElement = document.querySelector('[data-input]');

function GetWeather(){
  let inputVal = inputElement.value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&APPID=692aecf0eca12b1e8b1b72c5e62db76f&units=metric`)
  .then(response => response.json())
  .then(data => {
    console.log(data.weather);

    const icon = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;

    console.log(icon);

    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
    <h2 class="city-name" data-name="${data.name},${data.sys.country}">
    <span>${data.name}</span>
    <sup>${data.sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(data.main.temp)}<sup>°C</sup>
    </div>
    <figure>
    <img class="city-icon" src=${icon} alt=${data.weather[0]["main"]}>
    <figcaption>${data.weather[0]["description"]}</figcaption>
    </figure>
    `;

    li.innerHTML = markup;
    document.getElementById('cities').appendChild(li);
  })
  .catch(() => {
      document.getElementsByClassName('error-msg').textContent = "Enter a valid city.";
  });
}


const formBtn = document.getElementById('weather-formBtn');
formBtn.addEventListener('click', e => {
  e.preventDefault();  
  GetWeather();
  document.getElementsByClassName('error-msg').textContent = "";
  inputElement.value = "";
});


// inputElement.addEventListener('keydown', e => {
//   if (e.keyCode === 13) {
//     GetWeather();
//   }
// });

function CheckForDuplicates(){
  
}