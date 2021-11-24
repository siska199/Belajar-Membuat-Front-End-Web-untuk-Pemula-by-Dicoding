window.addEventListener('load', function(){
    cekStorage()
    const keyword = new RegExp(localStorage.getItem(keyWord), 'i')
    console.log("key: ", keyword)
    renderData(JSON.parse(localStorage.getItem(keyUnFinish)).filter(d=>d.judul.match(keyword)),"unfinish")
    renderData(JSON.parse(localStorage.getItem(keyFinish)).filter(d=>d.judul.match(keyword)),"finish")

})

formBook.addEventListener('submit', function(){
    event.preventDefault()
    unFinish({id:Date.now(),judul: judulBuku.value, penulis: penulisBuku.value, tahun: tahunBuku.value})
    judulBuku.value = ''
    penulisBuku.value = ''
    tahunBuku.value = ''

})

searchButton.addEventListener('click', function(){

    localStorage.setItem(keyWord,searchInput.value)
    const keyword = new RegExp(localStorage.getItem(keyWord), 'i')

    const dataUnFinish = JSON.parse(localStorage.getItem(keyUnFinish))
                        .filter(d=>d.judul.match(keyword))
    console.log("Filter Unfinish data: ", dataUnFinish)
    const dataFinish = JSON.parse(localStorage.getItem(keyFinish))
                        .filter(d=>d.judul.match(keyword))
    console.log("Filter Finish data: ", dataFinish)

    renderData(dataUnFinish,"unfinish")
    renderData(dataFinish,"finish")

})