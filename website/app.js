/* Global Variables */
const baseURL =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&appid=ab8ff7363f9a2e940996223459739a5f";

// Create a new date instance dynamically with JS
let d = new Date();

document.getElementById("generate").addEventListener("click", performAction);

async function performAction(e) {
  const newZip = document.getElementById("zip").value;
  let weatherData;
  let entry;
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

  weatherData = await getWeatherByZip(baseURL, newZip, apiKey);
  entry = {
    temp: weatherData.main.temp,
    date: newDate,
    response: document.getElementById("feelings").value,
  };

  let entryID = await postEntry("/entry", entry);
  let allEntries = await getEntries("/entry");
  let lastEntry = allEntries[entryID.entry_id];
  updateUI(lastEntry);
}

async function getWeatherByZip(baseURL, zip, key) {
  const res = await fetch(baseURL + zip + key);

  try {
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("error", err);
  }
}

async function getEntries(url) {
  const res = await fetch(url);

  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
}

async function postEntry(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const entryID = await response.json();
    return entryID;
  } catch (error) {
    console.log("error", error);
  }
}

function updateUI(data) {
  document.getElementById("temp").innerHTML = data.temp;
  document.getElementById("date").innerHTML = data.date;
  document.getElementById("content").innerHTML = data.response;
}
