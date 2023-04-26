import React, { useContext, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { Song, timeConverterToString } from '../Utils';
import { StateContext } from '../StateContext';

const Player = () => {

  const [musicToPlaySrc, setMusicToPlaySrc] = useContext(StateContext);
  //const [musicList, setMusicList] = useContext(StateContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef<Howl>();
  const [song, setSong] = useState<Array<Song>>([]);
  
  
  useEffect(() => {
    if (isPlaying && soundRef.current) {
      const timerId = setInterval(() => {
        setCurrentTime(soundRef.current!.seek());
      }, 1000 / 60);
      return () => clearInterval(timerId);
    }
  }, [isPlaying]);
  useEffect(() => {
    if(isLoaded){
      setIsLoaded(false);
      setCurrentTime(0);
      soundRef.current!.seek(0);
      setIsPlaying(true);
    }
    //console.log("TIME : "+ currentTime);
  },[currentTime]);

  useEffect(() => {
    if(musicToPlaySrc?.title!=undefined){
      console.log("PLAYER USEFEECT HANDLE PLAYED SONG : "+ musicToPlaySrc.title);
      musicfetch();
      //handlePlay();
      setIsLoaded(true);
      fetch("/song/")
      .then(response => { return response.json() })
      .then(responseJson => {
          setSong(responseJson);
      });
    }
  }, [musicToPlaySrc]);

  const handlePlay = () => {
    if (!soundRef.current) {
      musicfetch();
    }
    setIsPlaying(true);
    soundRef?.current?.seek(currentTime);
    soundRef?.current?.play();
  };

  const musicfetch = ()=>{
    soundRef.current?.stop();
    soundRef.current?.unload();
    soundRef.current = new Howl({
      src: ["/Sounds/"+musicToPlaySrc.songSrc],
      html5: true,
      onend: () => {
        setIsPlaying(false);
      },
      onpause: () => {
        setIsPlaying(false);
      },
    });
    setCurrentTime(0);
    soundRef?.current?.seek();
    handlePlay();
  }

  const handlePause = () => {
    setIsPlaying(false);
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);
    if (soundRef.current) {
      soundRef.current.seek(newTime);
    }
  };
  
  const handleNextMusic = () =>{
    let test =0;
    for (let i = 0; i < song.length; i++) {
      if(song[i].id===musicToPlaySrc.id){
        console.log("i="+i);
        test =i;
      }
    }
    test++;
    if(test<song.length){
     setMusicToPlaySrc(song[test]);
    }else{
      setMusicToPlaySrc(song[0]);
    }
  }
  
  const handleBackMusic = () =>{
    let test =0;
    for (let i = 0; i < song.length; i++) {
      if(song[i].id===musicToPlaySrc.id){
        console.log("i="+i);
        test =i;
      }
    }
    test--;
    if(test>=0){
     setMusicToPlaySrc(song[test]);
    }else{
      setMusicToPlaySrc(song[song.length-1]);
    }
  }

  return (
    <div className="row d-flex Player p-0">
      <div className="col-1 text-end p-0 pt-4">{timeConverterToString(currentTime)}</div>
      <div className="col-10 text-center p-0 pt-4">
        <input type="range" className="mpRangeM" 
        min={0}
        max={parseInt(soundRef.current?.duration().toString()!)??0}
        value={parseInt(currentTime.toString())??0} onChange={handleSliderChange} />
      </div>
      <div className="col-1 text-start p-0 pt-4" style={{direction: "rtl"}}>{timeConverterToString(soundRef.current?.duration())}</div>
      <img src={"/Images/"+(musicToPlaySrc?.imgSrc?? "default.png")} alt="Album cover"/>
      <div className="col-3 col-sm-4 infos">
        <div>{musicToPlaySrc?.title}</div>
        <div>{musicToPlaySrc?.artist}</div>
      </div>
      <div className="col controls">
        <i className="fa-solid fa-backward-step" onClick={handleBackMusic} style={{fontSize: "1.5em"}}></i>
        {isPlaying ? (
            <span onClick={handlePause}><i className="fa-solid fa-circle-pause" style={{fontSize: "3em"}}></i></span>
        ) : (
            <span onClick={handlePlay}><i className="fa-solid fa-circle-play" style={{fontSize: "3em"}}></i></span>
        )}
        <i className="fa-solid fa-forward-step" onClick={handleNextMusic} style={{fontSize: "1.5em"}}></i>
      </div>
      <div className="col-1 options">
        <i className="fa-solid fa-volume-off"></i>
      </div>
    </div>
  );
};

export default Player;
