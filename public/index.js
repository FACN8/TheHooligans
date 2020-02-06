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


function autocomplete(inp, arr) {
  inp.addEventListener("input", function(e) {
    var divElement, divItem, searchValue = this.value;
    closeAllLists();
    if (!searchValue) {
      return false;
    }
    divElement = document.createElement("DIV");
    divElement.setAttribute("id", this.id + "autocomplete-list");
    divElement.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(divElement);
    var counter = 0;
    /*for each item in the array...*/
    for (var i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, searchValue.length).toUpperCase() == searchValue.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        if(counter <5){
        counter++;
        divItem = document.createElement("DIV");
        /*make the matching letters bold:*/
       var strong = document.createElement("STRONG")
        var textNode1 = document.createTextNode(searchValue)
        strong.appendChild(textNode1)
        divItem.appendChild(strong)

        var textNode2 = document.createTextNode(arr[i].substr(searchValue.length))
        divItem.appendChild(textNode2)
    
        divElement.appendChild(divItem);
        console.log( document.getElementsByClassName('wrapper')[0]);
        document.getElementById('autocompletedList').appendChild(divElement)
      }
    }
    }
  });

  function closeAllLists() {
    var selectList = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < selectList.length; i++) {
      selectList[i].parentNode.removeChild(selectList[i]);
    }
  }
}

var cities = ["Haifa","Akko","Nazareth","Tel-Aviv","Majdal-Shams","Um-el-Fahim","Hertsiliya","Ceserea","Kfar-Saba","Petah-Tikva"]

autocomplete(document.getElementById("cityInput"), cities);