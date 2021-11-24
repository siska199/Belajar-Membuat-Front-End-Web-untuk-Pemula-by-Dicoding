
const formBook = document.getElementById('formBook');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput')

// //Template Icon
const buttonFinish = `<button onclick="finishBook()" data-type="unfinish"  class="btn btn-success me-2">Selesai Dibaca</button>`
const buttonUnfinish = `<button onclick="unfinishBook()" data-type="finish" class="btn btn-success me-2">Belum Selesai Dibaca</button>`
const buttonDelete = `<button onclick="deleteBook()" class="btn btn-danger">Hapus Data</button>`


//Data pada formTodo
let judulBuku = document.getElementById('judul');
let penulisBuku = document.getElementById('penulis');
let tahunBuku = document.getElementById('tahun')

//Fungsi untuk memebuat elemen job yang belum dilakukan dan yang sudah dilakukan
function elemen(du, btn1,btn2){
    return(
        `<div class="col-lg-12 p-4 mb-4 rounded border bg-dark text-light">
            <h3>${du.judul}</h3>
            <div class="fs-5 mb-3">
                <div>${du.penulis}</div>
                <div>${du.tahun}</div>
            </div>
            <div data-key=${du.id} >
                ${btn1}
                ${btn2}
            </div>
        </div>`
    )
}

//Fungsi untuk merender data
function renderData(dataRender,type){
    console.log("Data yang mau dirender",dataRender)
    if(type=="finish"){
        let dataElement = ''
        for(du of dataRender){
            dataElement += elemen(du, buttonUnfinish, buttonDelete)
        }    
        document.getElementById("containerFinish").innerHTML = dataElement
    }else{
        let dataElement = ''
        for(du of dataRender){
            dataElement += elemen(du, buttonFinish, buttonDelete)
        }    
        document.getElementById("containerUnfinish").innerHTML = dataElement
    }
}

//Fungsi untuk mendelete data
function deleteBook(){
    const keyword = new RegExp(localStorage.getItem(keyWord), 'i')

    const key = event.target.parentElement.dataset.key
    const type = event.target.parentElement.childNodes[1].dataset.type

    let keyStorage = keyUnFinish
    if(type=="finish"){
        keyStorage = keyFinish       
    }

    data = JSON.parse(localStorage.getItem(keyStorage))
    const filterData = data.filter(d=>d.id!=key && d.judul.match(keyword))
    localStorage.setItem(keyStorage,JSON.stringify(filterData))

    renderData(filterData,type)
}

function finishBook(){
    const keyword = new RegExp(localStorage.getItem(keyWord), 'i')
    const key = event.target.parentElement.dataset.key

    let dataFinish = JSON.parse(localStorage.getItem(keyFinish))
    let dataUnFinish = JSON.parse(localStorage.getItem(keyUnFinish))


    //Cari data yang akan dikembalikan
    const finish = dataUnFinish.filter(d=>d.id==key)[0]
    dataFinish.unshift(finish)
    localStorage.setItem(keyFinish,JSON.stringify(dataFinish))

    dataFinish = dataFinish.filter(d=>d.judul.match(keyword))

    //Memperbarui data Done
    dataUnFinish = dataUnFinish.filter(d=>d.id!=key)
    localStorage.setItem(keyUnFinish,JSON.stringify(dataUnFinish))
    dataUnFinish = dataUnFinish.filter(d=> d.judul.match(keyword))


    renderData(dataFinish,"finish")
    renderData(dataUnFinish,"unfinish")

}


function unfinishBook(){
    const keyword = new RegExp(localStorage.getItem(keyWord), 'i')

    const key = event.target.parentElement.dataset.key
    let dataFinish = JSON.parse(localStorage.getItem(keyFinish))
    let dataUnFinish = JSON.parse(localStorage.getItem(keyUnFinish))

    //Cari data yang akan dikembalikan
    const unFinish = dataFinish.filter(d=>d.id==key)[0]
    dataUnFinish.unshift(unFinish)
    localStorage.setItem(keyUnFinish,JSON.stringify(dataUnFinish))

    dataUnFinish = dataUnFinish.filter(d=>d.judul.match(keyword))


    //Memperbarui data Done
    dataFinish = dataFinish.filter(d=>d.id!=key)
    localStorage.setItem(keyFinish,JSON.stringify(dataFinish))
    dataFinish = dataFinish.filter(d=>d.judul.match(keyword))

    renderData(dataUnFinish,"unfinish")
    renderData(dataFinish,"finish")

}


