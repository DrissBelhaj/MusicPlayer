import React from 'react';

const Player = () => {
  return (
    <div className="row d-flex Player p-0">
      <div className="col-1 text-end p-0 pt-4">00:00</div>
      <div className="col-10 text-center p-0 pt-4">
        <input type="range" className="mpRangeM" />
      </div>
      <div className="col-1 text-start p-0 pt-4" style={{direction: "rtl"}}>02:00</div>
      <img src="https://cdn.saleminteractivemedia.com/shared/images/default-cover-art.png" alt="Album cover"/>
      <div className="col-3 col-sm-4 infos">
        <div>Title Name</div>
        <div>Artist</div>
      </div>
      <div className="col controls">
        <i className="fa-solid fa-backward-step" style={{fontSize: "1.5em"}}></i>
        <i className="fa-solid fa-circle-play" style={{fontSize: "3em"}}></i>
        <i className="fa-solid fa-forward-step" style={{fontSize: "1.5em"}}></i>
      </div>
      <div className="col-1 options">
        <i className="fa-solid fa-volume-off"></i>
      </div>
    </div>
  );
};

export default Player;
