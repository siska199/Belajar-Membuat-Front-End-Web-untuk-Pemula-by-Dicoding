const key = "keyValue";
const countEl = document.getElementById('count')

if(Storage){
    if(localStorage.getItem(key)==null){
        localStorage.setItem(key,0)
    }
//---------------------------------------------------------------------------------
    function increment(){
        const count = Number(localStorage.getItem(key))+1;
        localStorage.setItem(key,count)
        countEl.innerText = localStorage.getItem(key)
    }
    document.getElementById('incrementButton').addEventListener('click',increment)
//---------------------------------------------------------------------------------
    function deletes(){
        localStorage.removeItem(key)
        localStorage.setItem(key,0)
        countEl.innerText = localStorage.getItem(key)
    }
    document.getElementById('clear').addEventListener('click',deletes)
    
    countEl.innerText = localStorage.getItem(key)
}else{
    alert("Tidak ada tempat penyimpanan yang mendukung")
}

