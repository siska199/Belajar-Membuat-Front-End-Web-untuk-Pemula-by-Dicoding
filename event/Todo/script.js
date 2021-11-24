//Global constanta
const formTodo = document.getElementById('formTodo');
const mustTodo = document.getElementById('mustTodo');
const finishTodo = document.getElementById('finishTodo');
//Template Icon
const cekIcon = `<i class="far fa-check-circle" onclick="cekTodo()"></i>`;
const undoIcon = `<i class="fas fa-undo me-2" onclick="backTodo()"></i>`
const delIcon = `<i class="far fa-trash-alt" onclick="deleteTodoFix()"></i>`
//Input Elemen:
const nameTodo = document.getElementById('newTodo');
const dateTodo = document.getElementById('dateTodo');
//Penampung Input
const dataTodo = []
const dataTodoFinish = [];

//---------------------------------------New Session---------------------------------------------------------------
//Membuat fungsi yang mengembalikan elemen:
function elemen(id, nameTodo,dateTodo,Icon1,Icon2){
    return(
        `<div class="todoLi row mx-auto pt-4 pb-3 mb-3 px-3 shadow">
            <div class="col-lg-10 col-md-10 col-sm-10">
                <h5>${nameTodo}</h5>
                <p>${dateTodo}</p>
                <div hidden>${id}</div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 d-flex align-items-center justify-content-end">
                ${Icon1}
                ${Icon2}
            </div>
        </div>`
    )
}

//Mengembalikan nilai todo dan date todo ketika menklik icon:
function klikIcon(){
    const cekIcon = event.target.parentElement;//Main Elemen ---> todoLi
    const childMainParentLeft = cekIcon.parentElement.childNodes[1];
    console.log(childMainParentLeft)
    //Ekstrak Nilai elemen h5 dan p dari childMainParentLeft
    console.log(childMainParentLeft.childNodes)
    const elH5 = childMainParentLeft.childNodes[1].innerText.toString()
    const elP = childMainParentLeft.childNodes[3].innerHTML.toString()
    const elId = childMainParentLeft.childNodes[5].innerHTML.toString()
    const ret = [elId, elH5, elP] //Disimpan dielemen list agar mudah di return
    return(ret)
}
//Mendelete Todo
function deleteTodo(delId,mainArray){
    index = mainArray.findIndex(arr=>arr.id==delId)
    console.log("index :", index)

    mainArray.splice(index,1)
    
    const klikCekIc = event.target.parentElement;//Main Elemen ---> todoLi
    klikCekIc.parentElement.remove()
}

//Render Elemen:
function render(dataRender,ic1, ic2){
    let elementsTodo = ''
    for(el of dataRender){
        const addElementMust = elemen(el.id,el.name,el.date,ic1,ic2);
        elementsTodo += addElementMust  
    }
    return(elementsTodo)
}

/*-------------------------------------New Session----------------------------------------------*/

//Membuat fungsi mengambil input
function submitTodo(){
    event.preventDefault()
    dataTodo.unshift({id:Date.now(),name:nameTodo.value,date:dateTodo.value})
    mustTodo.innerHTML = render(dataTodo,cekIcon,'')
    newTodo.value = '';
    dateTodo.value = '';

}
formTodo.addEventListener('submit', submitTodo)

//cekTodo function
function cekTodo(){
    const val = klikIcon();
    console.log("val", val)
    dataTodoFinish.unshift({id:val[0],name:val[1],date:val[2]})
    finishTodo.innerHTML = render(dataTodoFinish,undoIcon, delIcon);
    deleteTodo(val[0],dataTodo)
}

//backTodo function
function backTodo(){
    const val = klikIcon();
    dataTodo.unshift({id:val[0],name:val[1],date:val[2]})
    mustTodo.innerHTML = render(dataTodo,cekIcon,'')
    deleteTodo(val[0],dataTodoFinish)
}

//delete function
function deleteTodoFix(){
    const val = klikIcon();
    deleteTodo(val[0],dataTodoFinish)
}
