const form = document.querySelector("form");
const cityName = document.querySelector("#cityInput");
const DOA = document.querySelector("#DOAInput");
const DOD = document.querySelector("#DODInput");
let currHostelsID = [];

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
    displayData(inputData);
  }
}

function displayData(inputData) {
  const hostelsList = document.querySelector("#hostels-list");
  while (hostelsList.firstChild) {
    hostelsList.removeChild(hostelsList.firstChild);
  }
  var noDataLi = document.createElement("li");
  noDataLi.className = "wrapper hostel-listing";
  var noDataHeader = document.createElement("h2");
  noDataHeader.className = "hostel-name";
  if(inputData === '' || inputData === undefined || inputData.length===0){
    noDataHeader.textContent = 'Sorry! no hostels are available, try a different date';
    noDataLi.appendChild(noDataHeader);
    hostelsList.appendChild(noDataLi);
  }else if(inputData[0]=='Invalid year'){
    noDataHeader.textContent = 'Enter the current year.';
    noDataLi.appendChild(noDataHeader);
    hostelsList.appendChild(noDataLi);
  }else if(inputData[0]=='Invalid month, enter current month'){
    noDataHeader.textContent = 'Invalid month, enter current month';
    noDataLi.appendChild(noDataHeader);
    hostelsList.appendChild(noDataLi);
  }
  else if(inputData[0]=='Departure day must be after arrival day!'){
    noDataHeader.textContent = 'Departure day must be after arrival day!';
    noDataLi.appendChild(noDataHeader);
    hostelsList.appendChild(noDataLi);
  }
  else
  {
  inputData.forEach(hostel => {
    var newLi = document.createElement("li");
    var newHeader = document.createElement("h2");
    var newButton = document.createElement("button")
    newButton.textContent = "Reserve";
    newHeader.innerText = hostel.name;
    currHostelsID.push(hostel.id)
    newHeader.className = "hostel-name";
    newButton.className = "reserveButton ";
    newButton.id = hostel.id;
    newButton.addEventListener("click",(e)=>{
      toggleButton(e)
    })
    newLi.className = "wrapper hostel-listing";
    newLi.appendChild(newHeader);
    newLi.appendChild(newButton)
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

function toggleButton(e){
  axios.post('/reserverHostel', {
    hostelID: e.target.id,
    dayOfArrival: DOA.value,
    dayOfDeparture: DOD.value    
  })
  .then(function (response) {
    window.location.href = "/public/res.html"
  })
  .catch(function (error) {
    console.log(error);
  });
}