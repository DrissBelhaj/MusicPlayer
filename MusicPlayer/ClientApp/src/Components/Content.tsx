import React from 'react';
import { useEffect, useState } from "react";

const List = () => {
    const [song, setSong] = useState<Array<Song>>([]);
    useEffect(() => {
        fetch("/song/")
            .then(response => { return response.json() })
            .then(responseJson => {
                setSong(responseJson)
            })
    }, [])
    return (
      <div className="col-sm p-1 list table-responsive">
                
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Album</th>
            <th scope="col">Author</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {song.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>            
              <td>{item.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
    );
};



export default List;