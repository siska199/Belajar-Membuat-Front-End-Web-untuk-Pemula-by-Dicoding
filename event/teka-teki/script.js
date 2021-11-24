//inisialiasi variabel untuk menampung elemen dokumen
const localTotalVictoryField = document.getElementById("local-total-victory-field");
const localMaximumAttempField = document.getElementById("local-maximum-attemp-field");
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById("session-user-answer-field");
const sessionUserWrongAnswerField = document.getElementById("session-user-wrong-answer-field");
const sessionTrueAnswerField = document.getElementById("session-true-answer-field");
const sessionUserAttempsField = document.getElementById("session-user-attemps-amount-field");

//inisialisasi fungsi untuk menghasilkan jawaban permainan
function getAnswer() {
    let answer = "123".split("");
    for(let i = 0; i < answer.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = answer[i];
        answer[i] = answer[j];
        answer[j] = tmp;
    }
    return answer.join("");
}

//inisialiasi key untuk session storage
const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttempsKey = "SESSION_USER_ATTEMPS";
const sessionUserIsPlayingKey = "SESSION_USER_IS_PLAYING";

//inisialisasi key untuk local storage
const localKeyVictory = "LOCAL_KEY_VICTORY_PLAYED";
const localMaximumAttempsKey = "LOCAL_MAXIMUM_ATTEMPTS";


//-------------------------------Function Session--------------------------------------//
const buttons = [answerButton1, answerButton2, answerButton3]
const wrong = document.querySelector('.wrongContainer')

// let jumlah_session = 0 
let jawaban = ''


if(Storage){

    //Inisialisai answear key
    if (sessionStorage.getItem(sessionAnswerKey) === null){
        sessionStorage.setItem(sessionAnswerKey, '');
    }

    //Inisialisasi session answear
    if(sessionStorage.getItem(sessionUserAttempsKey)==null){
        sessionStorage.setItem(sessionUserAttempsKey,0)
    }
    sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey)

    //Inisialisasi user playing game------------------------------------
    if(sessionStorage.getItem(sessionUserIsPlayingKey)==null){
        sessionStorage.setItem(sessionUserIsPlayingKey,false)
    }
    
    //Inisialisasi Local Stats
    if(localStorage.getItem(localKeyVictory)==null){
        localStorage.setItem(localKeyVictory,0)
    }
    localTotalVictoryField.innerText = localStorage.getItem(localKeyVictory)

    console.log(localStorage.getItem(localKeyVictory))

    if(localStorage.getItem(localMaximumAttempsKey)==null){
        localStorage.setItem(localMaximumAttempsKey ,0)
    }
    localMaximumAttempField.innerText = localStorage.getItem(localMaximumAttempsKey)

    //-------------------------------------------------------------------

    //Play game------------------------------------------
    playButton.addEventListener('click',function(){
        //Prevent event yang berasal dari parent
        event.stopPropagation(); 
        duringGameDisplay.removeAttribute('hidden')
        beforeGameDisplay.setAttribute('hidden',true)
        sessionStorage.setItem(sessionAnswerKey,getAnswer())
        sessionStorage.setItem(sessionUserIsPlayingKey,true)
        console.log("Key Answear: ",sessionStorage.getItem(sessionAnswerKey))
        // sessionStorage.setItem(sessionUserAttempsKey,0)

    })

    //Destroy Button-----------------------------------------------------
    destroyDataButton.addEventListener('click',function(){
        localStorage.setItem(localKeyVictory,0)
        localStorage.setItem(localMaximumAttempsKey,0)
        localTotalVictoryField.innerText = localStorage.getItem(localKeyVictory)
        localMaximumAttempField.innerText = localStorage.getItem(localMaximumAttempsKey)

        console.log("siska")
    })
    //Cek answear function ----------------------------------
    function cekAnswear(j){
        const ans = sessionStorage.getItem(sessionAnswerKey)
        const conditional = j==ans
        console.log(conditional)
        if(conditional){
            duringGameDisplay.setAttribute('hidden',true)
            afterGameDisplay.removeAttribute('hidden')
            sessionTrueAnswerField.innerText = ans
            sessionStorage.setItem(sessionUserIsPlayingKey,false)

            //Kalah
            let looseTot = Number(localStorage.getItem(localMaximumAttempsKey))+Number(sessionStorage.getItem(sessionUserAttempsKey))
            localStorage.setItem(localMaximumAttempsKey,looseTot)
            localMaximumAttempField.innerText = localStorage.getItem(localMaximumAttempsKey)
            // sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey)

            //Menang
            let winTot = Number(localStorage.getItem(localKeyVictory))+1
            localStorage.setItem(localKeyVictory,winTot)
            localTotalVictoryField.innerText = localStorage.getItem(localKeyVictory)
            sessionUserWrongAnswerField.innerText = sessionStorage.getItem(sessionUserAttempsKey)
            
        }else{
            //Main kalah berapa kali
            let jSate = Number(sessionStorage.getItem(sessionUserAttempsKey))+1
            sessionStorage.setItem(sessionUserAttempsKey,jSate)
            sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey)
            wrong.removeAttribute('hidden')
            sessionUserWrongAnswerField.innerText = j
        }
        return(jawaban='')
    }
    //------------------------------------------------------------

    //Click number function------------------------------------------
    function clickNumber(butt){
        butt.addEventListener('click',function(){
            event.stopPropagation(); 
            sessionUserAnswerField.innerText += event.target.innerText
            //----------------------------------------
            if(!wrong.getAttribute('hidden') || !afterGameDisplay.getAttribute('hidden') ){
                wrong.setAttribute('hidden',true)
                afterGameDisplay.setAttribute('hidden',true)
            }
    
            if(jawaban.length<3){
                jawaban += String(event.target.innerText)
                if(jawaban.length==3){
                    cekAnswear(jawaban)
                    sessionUserAnswerField.innerText =''

                }
            }  
            //----------------------------------------------
        })
    }
    
    buttons.forEach( b=>clickNumber(b))

    //----------------------------------------------------------------------
    window.addEventListener('click',function(){
        duringGameDisplay.setAttribute('hidden',true)
        afterGameDisplay.setAttribute('hidden',true)
        beforeGameDisplay.removeAttribute('hidden')
        sessionStorage.setItem(sessionUserAttempsKey,0)
        sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey)
    })

    document.getElementById('gameboard').addEventListener('click',function(){
        event.stopPropagation(); 
        wrong.setAttribute('hidden',true)
        if(!afterGameDisplay.getAttribute('hidden')){
            sessionStorage.setItem(sessionUserAttempsKey,0)
            sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey)
            afterGameDisplay.setAttribute('hidden',true)
            beforeGameDisplay.removeAttribute('hidden')

        }

        // if(afterGameDisplay.getAttribute('hidden') && !beforeGameDisplay.getAttribute('hidden')){
        //     beforeGameDisplay.removeAttribute('hidden')
        // }
        // if(!duringGameDisplay.getAttribute('hidden')){
        //     beforeGameDisplay.setAttribute('hidden',true)
        // }

        // if(!duringGameDisplay.getAttribute('hidden')){
        //     beforeGameDisplay.setAttribute('hidden',true)
            
        //     // if(beforeGameDisplay.getAttribute('hidden') ){
        //     //     sessionStorage.setItem(sessionUserAttempsKey,0)
        //     //     sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey)
        //     // }

        // }
        // if(!afterGameDisplay.getAttribute('hidden') ){
        //     afterGameDisplay.setAttribute('hidden',true)
        //     beforeGameDisplay.removeAttribute('hidden')
        // }

    })

}


