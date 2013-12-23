window.onload = function() 
{
	$("audioButton").onclick = toggleMusic;
}

function toggleMusic()
{
	var audioPlayer = $("audioPlayer");
	if (audioPlayer.paused)
	{
		// then play
		audioPlayer.play();
		$("audioButton").src = "../images/pause.png";
		$("audioText").innerHTML = "Pause Music";
	}
	else
	{
		// then pause
		audioPlayer.pause();
		$("audioButton").src = "../images/play.png";
		$("audioText").innerHTML = "Play Music";
	}
}