let inputElement = document.querySelector('[data-input]');
const list = document.getElementById('cities');
const errorMsg = document.getElementById('error-msg');


function GetWeather(){
  let inputVal = inputElement.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&APPID=692aecf0eca12b1e8b1b72c5e62db76f&units=metric`)
  .then(response => response.json())
  .then(data => {
    const icon = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
    const listItems = list.querySelectorAll(".bottom .city");
    const listItemsArray = Array.from(listItems);
  
    if(listItemsArray.length > 0){
      const arrayFilter = listItemsArray.filter(el => {
        let content = "";
  
        if(inputVal.includes(",")){
          if(inputVal.split(",")[1].length > 2){
            inputVal = inputVal.split(",")[0];
            content = el.querySelector(".city-name span").textContent.toLowerCase();
          }else{
            content = el.querySelector(".city-name").textContent.toLowerCase();
          }
        }
        else{
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        }
        return content == inputVal.toLowerCase();
      });
  
      if(arrayFilter.length > 0){
        errorMsg.innerHTML = `You already know the weather for ${arrayFilter[0].querySelector(".city-name span").textContent}. Try searching for another city or provide a country code.`;
        inputElement.value = "";
        return;
      }
    }

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
    list.appendChild(li);
  })
  .catch(() => {
    errorMsg.innerHTML = "Enter a valid city.";
  });
}

const formBtn = document.getElementById('weather-formBtn');
formBtn.addEventListener('click', e => {
  e.preventDefault();  
  GetWeather();
  errorMsg.innerHTML = "";
  inputElement.value = "";
});
