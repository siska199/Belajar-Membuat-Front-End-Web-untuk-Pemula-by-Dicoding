const keyUnDone = "Undone Job"
const keyDone = "Done Job"

function cekStorage(){
    if(typeof Storage!='undefined'){
        let inisial = []
        if(localStorage.getItem(keyUnDone)==null){
            localStorage.setItem(keyUnDone,JSON.stringify(inisial))
            console.log("success")
        }

        if(localStorage.getItem(keyDone)==null){
            localStorage.setItem(keyDone,JSON.stringify(inisial))
            console.log("success")
        }
    }else{
        alert("Browser tidak mendukung tipe storage yang digunakan")
    }
}

//Fungsi untuk menyimpan data pekerjaaan yang belum dilakukan
function unDone(data){
    console.log(data)
    let unDoneData = JSON.parse(localStorage.getItem(keyUnDone))
    unDoneData.unshift(data)
    localStorage.setItem(keyUnDone,JSON.stringify(unDoneData))
}

