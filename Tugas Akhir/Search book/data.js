const keyUnFinish = "Rak Unfinish Book"
const keyFinish = "Rak Finish Book"
const keyWord = "Keyword Regex"
// const keyKeywordString = "keyword String"
function cekStorage(){
    if(typeof Storage!='undefined'){
        let inisial = []
        if(localStorage.getItem(keyUnFinish)==null){
            localStorage.setItem(keyUnFinish,JSON.stringify(inisial))
            console.log("success")
        }

        if(localStorage.getItem(keyFinish)==null){
            localStorage.setItem(keyFinish,JSON.stringify(inisial))
            console.log("success")
        }
        if(localStorage.getItem(keyWord)==null){
            localStorage.setItem(keyWord,'')
        }
        // localStorage.setItem(keyKeywordString,'')
    }else{
        alert("Browser tidak mendukung tipe storage yang digunakan")
    }
}

//Fungsi untuk menyimpan data buku yang belum dibaca
function unFinish(data){
    let unFinishBook = JSON.parse(localStorage.getItem(keyUnFinish))
    unFinishBook.unshift(data)
    localStorage.setItem(keyUnFinish,JSON.stringify(unFinishBook))
    console.log("Data buku masuk yang unfinish: ",JSON.parse(localStorage.getItem(keyUnFinish)))
}

