/* Global Variables */
const APIURL = "https://api.openweathermap.org/data/2.5/weather";
const APIkey = "716dca38f2ffd344dfde22c51ccd128a";
// get city element
const zip = document.getElementById("zip");
//get content element
const content = document.getElementById("feelings");
//get element date
const date = document.getElementById("date");
//get element temp
const temp = document.getElementById("temp");
//get element content
const contentFeelings = document.getElementById("content");
//get element parrent
const entryHolder = document.getElementById("entryHolder");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//get API data func by GET method
const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// console.log(getWeather(APIURL, "94040", APIkey));

// POST API method

const postDataWeather = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const projectData = async (data) => {
  try {
    if (data.cod != 200) {
      return data;
    }
    const info = {
      cod: data.cod,
      date: newDate,
      temp: convertCelsius(data.main.temp),
      content: content.value,
    };
    return info;
  } catch (error) {
    console.log(error);
  }
};

//
const retrieveData = async (url) => {
  const response = await fetch(url);
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Event listener
/* get generate btn */
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", generateHandle);

function generateHandle(event) {
  //request URL
  const requestURL = `${APIURL}?zip=${zip.value}&appid=${APIkey}`;

  if (zip.value !== "") {
    getWeather(requestURL)
      .then((data) => {
        projectData(data).then((info) => {
          console.log(info);
          showInfo(info);
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
}

const showInfo = async (data) => {
  if (data.cod === 200) {
    if (
      data.date !== undefined &&
      data.temp !== undefined &&
      data.content !== undefined
    ) {
      date.innerHTML = data.date;
      temp.innerHTML = data.temp + " degree C";
      contentFeelings.innerHTML = data.content;
    }
  } else {
    entryHolder.innerHTML = data.message;
  }
};

//Convert Kevin to Celsius
const convertCelsius = (temp) => {
  if (temp < 0) {
    return "below zero (0 K)";
  } else {
    return (temp - 273.15).toFixed(2);
  }
};
