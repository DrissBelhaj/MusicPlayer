import React, { useContext } from "react";
import { StateContext } from "../StateContext";

type CardProps = {
    title:string
    imgSrc:string
    type:string
}
const Card = ({ title, imgSrc,type }:CardProps) => {

  const [listMusicURL, setListMusicURL] = useContext(StateContext);

  const handleUrlChange = (condition:string) =>{
    setListMusicURL("/song/"+type+"/"+condition)
  }
  return (
    <div className="col cardContainer">
      <div className="card" onClick={()=>{handleUrlChange(title)}}>
        <img src={imgSrc} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
        </div>
      </div>
    </div>
  );
};

export default Card;