window.onload = function() 
{
	$("audioButton").onclick = toggleMusic;
	$("audioPlayer").onended = resetPlayer;
}

function toggleMusic()
{
	var audioPlayer = $("audioPlayer");
	if (audioPlayer.paused || audioPlayer.ended)
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

function resetPlayer(e)
{
	$("audioButton").src = "../images/play.png";
	$("audioText").innerHTML = "Play Music";
}