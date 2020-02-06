const form = document.querySelector("form");
const cityName = document.querySelector("#cityInput");
const DOA = document.querySelector("#DOAInput");
const DOD = document.querySelector("#DODInput");
const hostelsList = document.querySelector("#hostels-list");
var errorMsg = '';

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

function checkAvailability(inputData){
  if(inputData === undefined || inputData.length===0){
    errorMsg = 'Sorry! no hostels are available, try a different date or a different hostel.';
    return false;
  }else if(inputData[0]=='Invalid year'){
    errorMsg = 'Enter the current year.';
    return false;
  }else if(inputData[0]=='Invalid month'){
    errorMsg = 'Invalid month, enter current month';
    return false;
  }else if(inputData[0]=='Invalid day'){
    errorMsg = 'Invalid date, enter arrival date lower than departure date';
    return false;
  }
  return true
}


function displayData(inputData) {
  while (hostelsList.firstChild) {
    hostelsList.removeChild(hostelsList.firstChild);
  }
  var availabilityFlag = checkAvailability(inputData)
  //if the hostel not available or the dates are invalid
  if(!availabilityFlag == true){
    noDataLi = document.createElement("div");
    noDataLi.className = "wrapper hostel-listing hostel-name";
    noDataLi.textContent = errorMsg;
    hostelsList.appendChild(noDataLi);
    return;
  }
  //if the inputs are correct
  inputData.forEach(hostel => {
    var newLi = document.createElement("li");
    var newHeader = document.createElement("h2");
    var newButton = document.createElement("button")
    newButton.textContent = "Reserve";
    newHeader.textContent = hostel.name;
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