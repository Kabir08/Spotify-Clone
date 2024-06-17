// console.log("let's write js")

async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }

    }
    // console.log(songs)
    return songs

}

// getSongs()
let currentsong = new Audio();

const playMusic = (track)=>{
    // let audio  = new Audio("/songs/" + track)
    currentsong.src = "/songs/" + track
    currentsong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {


    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
        
        <li>
                                <img class="invert" src="music.svg" alt="">
                                <div class="songinfo">
                                    <div>${song.replaceAll("%20", " ")}</div> 
                                    <!-- <div>Artist</div>  -->
                                </div>
                                
                                <img  class="invert" src="play.svg" alt="">
                            
        
        
        
        
        
        
         </li>`;
    }
    
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", ()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src= "pause.svg"
        }
        else{
            currentsong.pause()
            play.src = "play.svg"
        }
    })

    var audio = new Audio(songs[1]);
    audio.play();

    audio.addEventListener("ontimeupdate", () => {
        // let duration = audio.duration
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    });
}

main()