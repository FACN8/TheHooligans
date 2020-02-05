const form = document.querySelector("form");
const cityName = document.querySelector("#cityInput");
const DOA = document.querySelector("#DOAInput");
const DOD = document.querySelector("#DODInput");
function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb(null, xhr.responseText);
    } else {
      cb("error", xhr.responseType);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    var inputData = JSON.parse(data);
    console.log(inputData);
    inputData.forEach(hostel => {
      const hostelsList = document.querySelector("#hostels-list");
      var newLi = document.createElement("li");
      var newHeader = document.createElement("h2");
      var newDescription = document.createElement("span");
      newHeader.innerText = hostel.name;
      newDescription.innerText = hostel.description;
      newHeader.className = "hostel-name";
      newDescription.className = "hostel-description";
      newLi.className = "wrapper hostel-listing";
      newLi.appendChild(newHeader);
      newLi.appendChild(newDescription);
      hostelsList.appendChild(newLi);
    });
  }
}

document.addEventListener("submit", e => {
  const url =
    "/search?city=" +
    cityName.value +
    "&arrival=" +
    DOA.value +
    "&departure=" +
    DOD.value;
  e.preventDefault();
  request(url, updateDom);
});
