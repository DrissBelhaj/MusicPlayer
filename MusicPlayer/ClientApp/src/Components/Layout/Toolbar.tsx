import { useContext, useState } from 'react';
import MusicInfoFormModal from '../MusicInfoFormModal';
import {Link} from 'react-router-dom';
import { StateContext } from '../StateContext';

const Toolbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [listMusicURL, setListMusicURL] = useContext(StateContext);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="col-sm-auto toolbar col-12">
    <div className="navBtn">
      <Link to="/" onClick={()=>{setListMusicURL("/song/")}} className="py-3 px-2" title="Home" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add" >
        <i className="fa-solid fa-music"></i>
      </Link>
    </div>
    <div className="navBtn">
      <Link to="/Albums" className="py-3 px-2" title="Album" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-record-vinyl"></i>
      </Link>
    </div>
    <div className="navBtn">
      
      <Link to="/Artists" className="py-3 px-2" title="Artist" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-user"></i>
      </Link>
    </div>
    <div className="navBtn" onClick={handleOpenModal} >
      <a className="py-3 px-2" title="Add" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-plus"></i>
      </a>
    </div>
    <MusicInfoFormModal showModal={showModal} setShowModal={setShowModal}/>
  </div>
  );
};

export default Toolbar;