
window.addEventListener('load', function(){
    cekStorage()
    renderData(JSON.parse(localStorage.getItem(keyUnDone)),"undone")
    renderData(JSON.parse(localStorage.getItem(keyDone)),"done")

})

formTodo.addEventListener('submit', function(){
    event.preventDefault()

    //Memasukkan data kedalam list yang harus dilakukan
    unDone({id:Date.now(),name: nameTodo.value, date: dateTodo.value})
    nameTodo.value = ''
    dateTodo.value = ''

    //Merender data yang belum dilakukan:
    const dataUndone = JSON.parse(localStorage.getItem(keyUnDone))
    renderData(dataUndone,"undone")
})

