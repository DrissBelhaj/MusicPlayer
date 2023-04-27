  import React, { useContext, useRef } from 'react';
  import { useState } from 'react';
  import * as id3 from 'id3js';
  import { useHistory } from "react-router-dom";
  import { StateContext } from './StateContext';
  type MusicInfo ={
    title: string
    artist: string
    album: string
    releaseYear: number
    imgSrc: any
    songSrc:string
    genre:string
    duration:number
  }
  type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  const MusicInfoFormModal = ({ showModal, setShowModal }: Props) => {
    const [listMusicURL, setListMusicURL] = useContext(StateContext);
    const [refreshKey, setRefreshKey] = useState(0);
    const [musicInfo, setMusicInfo] = useState<MusicInfo>({
      title: 'empty',
      artist: 'unknown',
      album: 'unknown',
      releaseYear: 2023,
      imgSrc: 'default.png',
      songSrc:'default.mp3',
      genre:'unknown',
      duration:0
    });

    function getBase64FromBlobUrl(blobUrl:string) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          const reader = new FileReader();
          reader.onloadend = function() {
            resolve(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = function() {
          reject(new Error('Failed to load image'));
        };
        xhr.open('GET', blobUrl);
        xhr.responseType = 'blob';
        xhr.send();
      });
    }
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log(file);
        handleSaveMusic(file);
        const tags:any = await id3.fromFile(file);
        let blob ='default.png';
        if(tags?.images[0]?.mime.toString().toLowerCase().startsWith('image')){
          blob = URL.createObjectURL(new Blob([tags.images[0].data]));
        }
      
        getBase64FromBlobUrl(blob)
          .then(base64String => {
            const image = {
              name: tags?.title.toString().replaceAll("\u0000","").trim(),
              type: tags?.images[0]?.mime.toString().split("/")[1],
              baseString: base64String
            };
            const requestOptions:any = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(image)
            };
            setMusicInfo((prevState) => ({
              ...prevState,imgSrc:image.name&&image.type?image.name+"."+image.type:"default.png"}));
            fetch('song/SaveBlobToImage/', requestOptions)
            .then(response => response.json())
            .then(data => {blob=data.name&&data.type?data.name+"."+data.type:"default.png"
            setRefreshKey(prevKey => prevKey + 1);
          } )
            .catch(error => {console.error(error)
              setMusicInfo((prevState) => ({
                ...prevState,imgSrc:"default.png"}));
            });
          })
          .catch(error => {
            blob="default.png"
            console.error(error);
          }); 
          setMusicInfo((prevState) => ({...prevState,
          title:  tags?.title?.toString().replaceAll("\u0000","")  || prevState.title,
          artist: tags?.artist?.toString().replaceAll("\u0000","") || prevState.artist,
          album:  tags?.album?.toString().replaceAll("\u0000","")  || prevState.album,
          year:   tags?.year                                      || prevState.releaseYear,
          genre:  tags?.genre?.toString().replaceAll("\u0000","")  || prevState.genre,
          duration:tags?.duration                                 || prevState.duration,
          imgSrc: blob}));
          setRefreshKey(prevKey => prevKey + 1);
      }
    };
    const handleSaveMusic= async (e:any) =>{
      console.log(e);
      try {
        const formData = new FormData();
        formData.append("file", e);
      
        const response = await fetch("/song/SaveSound", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setRefreshKey(prevKey => prevKey + 1);
        setMusicInfo((prevState) => ({...prevState,songSrc:data}));
      } catch (error) {
        console.error(error);
      }

    }
  


    const handleSubmit = async (e:any) => {
      e.preventDefault();

      handleSaveSong(e);
      //handleSaveMusic(e);

    };
    const history = useHistory();
    const handleSaveSong= async (e:any) =>{
      try {
        const response = await fetch("/song", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(musicInfo),
        });
        const data = await response.json();
        console.log(musicInfo.imgSrc);
        //window.location.href = '/';
        handleCloseModal();
        history.push('/');
        setListMusicURL(listMusicURL=="/song/"?'/song':'/song/');
        //Clear Form
        setMusicInfo({
          title: '',
          artist: '',
          album: '',
          releaseYear: 2023,
          imgSrc: 'default.png',
          songSrc:'default.mp3',
          genre:'unknown',
          duration:0
        });
        
          formRef?.current?.reset();

      } catch (error) {
        console.error(error);
      }
    }


    const handleDateChange =(event: any) => {
      event.target.value = event.target.value.substring(0, 4);
      const { name, value } = event.target;
      
      setMusicInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    }
    const handleDateBlur =(event:any) =>{
      event.target.value = event.target.value<event.target.max?event.target.value>event.target.min?event.target.value:event.target.min:event.target.max;

      const { name, value } = event.target;

      setMusicInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      setMusicInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    const formRef = useRef<HTMLFormElement>(null);

    return (
      <>
      <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="musicInfoModalLabel">Add New Music</h5>
              </div>
              <form ref={formRef} target="/" onSubmit={handleSubmit} >
                <div className="modal-body">
                  <div className="mb-3 custom-file-upload">
                <img src={`/Images/`+musicInfo.imgSrc+`?${refreshKey}`} alt="Album cover" />
                    <input type="file" className="form-control custom-file-input" id="mp3" accept=".mp3" name="mp3" onChange={handleFileUpload}/> {/* onChange={handleFileUpload} */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"  value={musicInfo.title}
                    onChange={handleInputChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="artist" className="form-label">Artist</label>
                    <input type="text" className="form-control" id="artist" name="artist"  value={musicInfo.artist}
                    onChange={handleInputChange}/>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="genre" className="form-label">Genre</label>
                  <input type="text" className="form-control" id="genre" name="genre"  value={musicInfo.genre}
                    onChange={handleInputChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="album" className="form-label">Album</label>
                    <input type="text" className="form-control" id="album" name="album"  value={musicInfo.album}
                    onChange={handleInputChange}/>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input type="number" className="form-control" id="year" name="yearRelease" placeholder="YYYY" min="1980" max="2024" value={musicInfo.releaseYear} 
                  onChange={handleDateChange} onBlur={handleDateBlur}/>
                  </div>
                  <input type="number" hidden className="form-control" id="duration" name="duration"  value={musicInfo.duration} onChange={handleInputChange}/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-dark" onClick={handleCloseModal}>Close</button>
                  <button type="submit" className="btn btn-secondary" >Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
    );
  };

  export default MusicInfoFormModal;
