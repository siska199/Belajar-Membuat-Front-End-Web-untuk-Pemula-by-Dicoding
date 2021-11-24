const formTodo = document.getElementById('formTodo');

//Template Icon
const cekIcon = `<i class="far fa-check-circle" data-type="undone" onclick="cekTodo()"></i>`;
const undoIcon = `<i class="fas fa-undo me-2" data-type="done" onclick="backTodo()"></i>`
const delIcon = `<i class="far fa-trash-alt" data-type="undone" onclick="deleteTodo()"></i>`


//Data pada formTodo
let nameTodo = document.getElementById('newTodo');
let dateTodo = document.getElementById('dateTodo');

//Fungsi untuk memebuat elemen job yang belum dilakukan dan yang sudah dilakukan
function elemen(du, Icon1,Icon2){
    return(
        `<div class="todoLi row mx-auto pt-4 pb-3 mb-3 px-3 shadow">
            <div class="col-lg-10 col-md-10 col-sm-10">
                <h5>${du.name}</h5>
                <p>${du.date}</p>
            </div>
            <div data-key=${du.id} class="col-lg-2 col-md-2 col-sm-2 d-flex align-items-center justify-content-end">
                ${Icon1}
                ${Icon2}
            </div>
        </div>`
    )
}

//Fungsi untuk merender data
function renderData(dataRender,type){
    if(type=="done"){
        console.log("Data done yang akan ditampilkan",dataRender)
        let dataElement = ''
        for(du of dataRender){
            dataElement += elemen(du, undoIcon, delIcon)
        }    
        document.getElementById("doneTodo").innerHTML = dataElement
    }else{
        console.log("Data Undone yang akan ditampilkan",dataRender)
        let dataElement = ''
        for(du of dataRender){
            dataElement += elemen(du, cekIcon, delIcon)
        }    
        document.getElementById("undoneTodo").innerHTML = dataElement
    }

}

function deleteTodo(){
    console.log("masuk delete")

    const key = event.target.parentElement.dataset.key
    const type = event.target.parentElement.childNodes[1].dataset.type
    console.log("Type: ", type)
    let keyStorage = keyUnDone

    if(type=="done"){
        console.log("masuk done")
        keyStorage = keyDone       
    }
    data = JSON.parse(localStorage.getItem(keyStorage))
    const filterData = data.filter(d=>d.id!=key)
    localStorage.setItem(keyStorage,JSON.stringify(filterData))

    renderData(filterData,type)
}

function cekTodo(){
    const key = event.target.parentElement.dataset.key
    let dataDone = JSON.parse(localStorage.getItem(keyDone))
    let dataUndone = JSON.parse(localStorage.getItem(keyUnDone))

//---------------------------------------------------------------------------
    //Cari data yang akan dikembalikan
    const finish = dataUndone.filter(d=>d.id==key)[0]
    dataDone.unshift(finish)
    localStorage.setItem(keyDone,JSON.stringify(dataDone))
   
    //Memperbarui data Done
    dataUndone = dataUndone.filter(d=>d.id!=key)
    localStorage.setItem(keyUnDone,JSON.stringify(dataUndone))
//----------------------------------------------------------------------------
    //RenderData
    renderData(dataDone,"done")
    renderData(dataUndone,"undone")
}


function backTodo(){
    const key = event.target.parentElement.dataset.key
    let dataDone = JSON.parse(localStorage.getItem(keyDone))
    let dataUndone = JSON.parse(localStorage.getItem(keyUnDone))

//---------------------------------------------------------------------------
    //Cari data yang akan dikembalikan
    const unFinish = dataDone.filter(d=>d.id==key)[0]
    dataUndone.unshift(unFinish)
    localStorage.setItem(keyUnDone,JSON.stringify(dataUndone))
   
    //Memperbarui data Done
    dataDone = dataDone.filter(d=>d.id!=key)
    localStorage.setItem(keyDone,JSON.stringify(dataDone))
//----------------------------------------------------------------------------
    //RenderData
    renderData(dataDone,"done")
    renderData(dataUndone,"undone")
}