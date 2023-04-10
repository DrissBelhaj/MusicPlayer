import { useEffect, useState } from "react";

const App = () => {

    const [song, setSong] = useState([])

    useEffect(() => {
    fetch("/song/")
        .then(response => { return response.json() })
        .then(responseJson => {
            setSong(responseJson)
        })
},[])
return (<div className="container">
    <div className="row">
        <div className="col-sm-12">
            <table className="table table-striped">
                <thead>
                    <tr><th>Id</th><th>Title</th><th>Author</th><th>SongId</th></tr>
                </thead>
                <tbody>
                    {
                        song.map((item) => (
                            <tr key="{item.Id}">
                               
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.songId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
</div>)
}

export default App;