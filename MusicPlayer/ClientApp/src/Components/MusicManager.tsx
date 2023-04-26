  import { Howl } from 'howler';
import { useEffect, useRef, useState } from "react";
import { Song, timeConverterToString } from './Utils';

export const MusicManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef<Howl>();
  const [songToPlay, setSongToPlay] = useState<Song>();
  console.log("MusicManager");
  useEffect(() => {
    console.log("Effect");
    if (isPlaying && soundRef.current) {
      const timerId = setInterval(() => {
        setCurrentTime(soundRef.current!.seek());
      }, 1000 / 60);
      return () => clearInterval(timerId);
    }
  }, [isPlaying]);
  useEffect(() => {handlePlay()},[songToPlay]);
  const handlePlay = () => {
    console.log("handlePlay");
    if (!soundRef.current && songToPlay!=null ) {
      soundRef.current = new Howl({
        src: ["Sounds/"+songToPlay.songSrc],
        html5: true,
        onend: () => {
          setIsPlaying(false);
        },
        onpause: () => {
          setIsPlaying(false);
        },
      });
    }
      soundRef?.current?.seek(currentTime);
      soundRef?.current?.play();
  };
useEffect(()=>{
console.log("song to play has been changed!");
},[songToPlay]);

  const handlePause = () => {
    console.log("handlePause");
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

  const returnTimeInMinSec = timeConverterToString(soundRef.current?.duration());
  const returnTimeInSec = parseInt(soundRef.current?.duration().toString()!);

  return { songToPlay,isPlaying, currentTime, handlePlay, handlePause, handleSliderChange, returnTimeInMinSec,returnTimeInSec,setSongToPlay};
};