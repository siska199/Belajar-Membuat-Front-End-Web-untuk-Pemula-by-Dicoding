const storageKey = "STORAGE_KEY";
const submitAction = document.getElementById("form-data-user");

//Inisialisasi nilai awal storage

//Cek storage ketika pertama kali di loud
window.addEventListener('load', function(){
    if (typeof(Storage) !== 'undefined'){

        if(localStorage.getItem(storageKey)!=null){
            displayData()
            //Akan mengambil data di local storage untuk di display ditabel User List
        }else{
            let initialData = []
            localStorage.setItem(storageKey, JSON.stringify(initialData))

        }
    }else{
        alert("Browser yang anda gunakan tidak mendukung web storage")
    }
})

//Fungsi untuk menyimpan data:
function saveData(data){
    let userData = JSON.parse(localStorage.getItem(storageKey))
    userData.unshift(data)
    localStorage.setItem(storageKey, JSON.stringify(userData))
    console.log("haha",userData.length)
    if(userData.length>5){
        userData.pop()
        console.log("hihihi",userData.length)
        localStorage.setItem(storageKey, JSON.stringify(userData))
    }

}

//Fungsi untuk menambahkan data ke localStorage ketika user mengimputkan data
submitAction.addEventListener('submit',function(){
    event.preventDefault()
    //Ambil data:
    const name = document.getElementById('nama').value
    const umur = document.getElementById('umur').value
    const domisili = document.getElementById('domisili').value
    //Setelah data diambil kita simpan datanya di local storage
    saveData({name,umur,domisili})
    displayData()
})

//Display Data:
function displayData(){
    data = JSON.parse(localStorage.getItem(storageKey))
    let tbosy = ''
    for(d of data){
        tbosy += `<tr>
                    <th>${d.name}</th>
                    <th>${d.umur}</th>
                    <th>${d.domisili}</th>
                </tr>`
    }
    document.getElementById('user-list-detail').innerHTML=tbosy
}