const key = "keyValue";
const countEl = document.getElementById('count')

if(Storage){
    if(sessionStorage.getItem(key)==null){
        sessionStorage.setItem(key,0)
    }
//---------------------------------------------------------------------------------
    function increment(){
        const count = Number(sessionStorage.getItem(key))+1;
        sessionStorage.setItem(key,count)
        countEl.innerText = sessionStorage.getItem(key)
    }
    document.getElementById('incrementButton').addEventListener('click',increment)
//---------------------------------------------------------------------------------
    function deletes(){
        sessionStorage.removeItem(key)
        sessionStorage.setItem(key,0)
        countEl.innerText = sessionStorage.getItem(key)
    }
    document.getElementById('clear').addEventListener('click',deletes)
    
    countEl.innerText = sessionStorage.getItem(key)
}else{
    alert("Tidak ada tempat penyimpanan yang mendukung")
}

