import { useContext, useEffect, useState } from "react";
import { Song, timeConverterToString } from "../Utils";
import { StateContext } from "../StateContext";
type musicListType = {
  url:string
}
const MusicList = (url:musicListType) => {

    const [song, setSong] = useState<Array<Song>>([]);
    const [musicToPlaySrc, setMusicToPlaySrc] = useContext(StateContext);
    const [listMusicURL, setListMusicURL] = useContext(StateContext);
    
    useEffect(() => {
      if(listMusicURL==undefined){
        setListMusicURL("/song/");
        return;
      }
      console.log(listMusicURL);
      fetch(listMusicURL)
          .then(response => { return response.json() })
          .then(responseJson => {
              setSong(responseJson)
          });
    }, [listMusicURL]);



    const handlePlay =(song: Song)=>{
      setMusicToPlaySrc(song);
      console.log(" MUSIC LIST HANDLE PLAY SONG"+ song.title)
    }


    return (
      <div className="col-sm p-1 context table-responsive">
                
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Artist</th>
            <th scope="col" className="d-none d-md-table-cell">Album</th>
            <th scope="col" className="d-none d-md-table-cell">Year</th>
            <th scope="col" className="d-none d-md-table-cell">Genre</th>
            <th scope="col">Duration</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {song.map((item) => (
            <tr key={item.id} onClick={() => handlePlay(item)}>
              <td>{item.id}</td>
              <td>{item.title}</td>            
              <td>{item.artist}</td>
              <td className="d-none d-md-table-cell">{item.album}</td>
              <td className="d-none d-md-table-cell">{item.releaseYear}</td>
              <td className="d-none d-md-table-cell">{item.genre}</td>
              <td>{timeConverterToString(item.duration)}</td>
              <td><i className="fa-solid fa-circle-play"></i></td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
    );
};

export default MusicList
