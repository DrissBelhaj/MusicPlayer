import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Song } from '../Utils';
import { Link } from 'react-router-dom';

type cardsPropType = {
  type:string
}
type Cards = {
  name: string;
  songs: Song[];
}
const Cards = (cardsProp:cardsPropType)=> {
  const [cards, setCards] = useState<Array<Cards>>([]);
  useEffect(() => {
    fetch("/song/"+cardsProp.type+"/GetAll")
        .then(response => { return response.json() })
        .then(responseJson => {
          setCards(responseJson)
        })
}, [cardsProp]);
  return (
    <div className="col-sm context overflow-auto">
      <div className="row pt-2 row-cols-4 row-cols-md-4 g-4 text-center " id={cardsProp.type}>
      {cards.map((card) => (
              <Link to={{ pathname: "/", state: { id: card.name } }}>
               <Card title={card.name} imgSrc={"/Images/"+card.songs[0].imgSrc} type={cardsProp.type} />
             </Link>
      ))}    
      </div>
    </div>
  );
};

export default Cards;