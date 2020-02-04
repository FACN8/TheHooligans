const form = document.querySelector('form');

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
document.onload = function(){
    console.log("inside on load");
}

document.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log("inside event listener");
    request('/getHostels', updateDom);
})

