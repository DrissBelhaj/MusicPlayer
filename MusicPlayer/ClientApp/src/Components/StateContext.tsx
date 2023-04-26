import React, { createContext, useState } from 'react';
import { Song } from './Utils';

export const StateContext = createContext<any>([]);

export const StateProvider = ({ children }:any) => {
  const [musicToPlaySrc, setMusicToPlaySrc] = useState<Song>(); // Initialize your state
  const [listMusicURL, setListMusicURL] = useState("/song/");
  //const [musicList, setMusicList] = useState<Array<Song>>([]);
  return (
    <StateContext.Provider value={[musicToPlaySrc, setMusicToPlaySrc,listMusicURL,setListMusicURL]}>
      {children}
    </StateContext.Provider>
  );
};