const form = document.querySelector('form');
const cityName = document.querySelector('#cityInput')
const DOA = document.querySelector('#DOAInput')
const DOD = document.querySelector('#DODInput')

function request(url,cb){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            cb(null,xhr.responseText)
        }else{
            cb('error',xhr.responseType)
        }
    };
    xhr.open('GET',url,true);
    xhr.send();
}

function updateDom(err,data){
    if(err){
        console.log(err);
    }else{
        var inputData = JSON.parse(data);
    }
}

const url = '/search?city='+cityName.value+'&arrival='+DOA.value+'&departure='+DOD.value;

document.addEventListener('submit',(e)=>{
    e.preventDefault()
    request(url, updateDom);
})

