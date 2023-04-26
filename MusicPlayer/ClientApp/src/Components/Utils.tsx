import { useState } from "react";

export type Song = {
    id: number;
    title: string;
    artist: string;
    album:string;
    genre:string;
    imgSrc:string;
    songSrc:string;
    releaseYear:number;
    duration:number;
}

export const timeConverterToString=(s?:number) =>{
    let res ="";
    if(s == undefined){
      return "00:00";
    }
    let min =s/60;
    let sec = s%60;
    if(min<10 && min>0){
    res+="0"+ parseInt(min.toString());
    }else
    if(min<=0){
      res="00";
    }else{
      res=parseInt(min.toString()).toString();
    }
    res+=":"
    if(sec>10){
      res+=parseInt(sec.toString()).toString();
    }else if (sec>0) {
      res+="0"+parseInt(sec.toString());
    }else{
      res+="00";
    }
    return res;
  }

