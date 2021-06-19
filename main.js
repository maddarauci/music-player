// selects all the elemenets in the html page 
// and assigns them to a variable 
// we are omnission but have never observed this.

//querSelector = querySelector()

let now_playing = document.querySelector('now-playing');
let track_art = document.querySelector('track-art');
let track_name = document.querySelector('track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let volume_slider = document.querySelector('.next-track');
let prev_btn = document.querySelector('prev-track');

let seek_slider = document.querySelector('.seek_slider');
//let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

// global variables 
let track_index = 0;
let isPlaying = false;
let updateTimer; 

// create the audio element for the player 
let curr_track = document.createElement('audio');

// list of tracks that have to played
// Mp3 Download https://myfreemp3.vip
let track_list = [
    {
	name: "Higher",
	artist: "Eminem",
	image: "https://consequence.net/wp-content/uploads/2021/01/eminem-higher-video-new-ufc.png",
	//path: "../music/Higher.mp3",
	path: "C:/Users/user/Desktop/DDK/webDev/musicPlayer/music/Higher.mp3"
    },
    {
	name: "Night Owl",
	artist: "Broke For Free",
	image: "Image URL",
	path: "Night_Owl.mp3",
    },
/*
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "Image URL",
    path: "Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "Image URL",
    path: "Shipping_Lanes.mp3",
  },
*/
];

/*
loading a new track from the track-list, 
this function handles
- reset all the values of the previous track
- loading the track
- updating the track art to be shown
- updating the track details to be shown
- adding event listeners to the track
- setting random colored background
*/

function loadTrack(track_index) 
{
    // clear the previous seek timer 
    clearInterval(updateTimer);
    resetValues();

    // load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // update details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    // set an interval of 1000 milliseconds
    // for updating the seel slider 

    updateTimer = setInterval(seekUpdate, 1000);

    /*
     move to the next track if the current finishes playing
     using the 'ended' event
    */
    curr_track.addEventListener("ended", nextTrack);
    // applies random bg color 
    random_bg_color();
}

function random_bg_color() {
    // get random number between 64--256
    // for getting light colors 
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // contructs a color within the given values.
    let bgColor = 'rgb(" + red + ", " + green ", " + blue ")';

    // sets the background color to new color 
    document.body.style.background = bgColor;
}

// function to reset all values to default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;

}

/*
handling the player btns 
*/
function playpauseTrack() {
    // switch between playing and pausing 
    // depending on the current state 
    if (!isPlaying) playTrack();
    else pauseTrack();

}

function playTrack() {
    // plays the loaded track 
    curr_track.play();
    isPlaying = true;
    
    // replace icon width the pause icon
    playpause_btn.innerHTML = "<i class='fa fa-pause-circle fa-5x'></i>";
}

function pauseTrack() {
    // pause the loaded track
    curr_track.pause();
    isPlaying = false;

    // replace the icon with the play icon
    playpause_btn.innerHTML = "<i class='fa fa-play-circle fa-5x'></i>";
}

function nextTrack() {
    /*
	go back to the first track if the current one is the last in the track list
    */
    // checking is the current playing song is the last one in list
    if (track_index < track_list.length -1) {
	track_index += 1;
    } else {
	track_index = 0;
    }

    // load and play the new track 
    loadTrack(track_index);
    playTrack();

}

function prevTrack() {
    /*
	goes back to the last track if the current one i the first in the track list
    */
    if (track_index > 0)
	track_index -= 1;
    else track_index = track_list.length;

    // loads and plays the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // calculate the seek position by the percentage of the seek slider
    // and get relative duration to the track.

    seekto = curr_track.duration * (seek_slider.value / 100);

    // set the current track position to the calculated seek position 
    curr_track.currentTime = seekto;

}

function setVolume() {
    // set volume according to the percentage of the volume slider set 

    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // check if the current track duration is a legible number 
    if (!isNan(curr_track.duration)) {
	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
	seek_slider.value = seekPosition;

	// calculate the time left and the total duration 
	let currentMinutes = Math.floor(curr_track .currentTime / 60 );
	let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
	let durationMinutes = Math.floor(curr_track.duration / 60);
	let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

	// add a zero the single digit tiem values 
	if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
	if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
	if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
	if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

	// display the updated duration 
	curr_time.textContent = currentMinutes + ":" + currentSeconds;
	total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// loading the first track in the tracklist
loadTrack(track_index);



console.log("fuck ye");














