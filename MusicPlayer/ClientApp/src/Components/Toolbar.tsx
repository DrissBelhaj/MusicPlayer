import React from 'react';

const Toolbar = () => {
  return (
    <div className="col-sm-auto toolbar col-12">
    <div className="navBtn">
      <a href="#" className="py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-music"></i>
      </a>
    </div>
    <div className="navBtn">
      <a href="#" className="py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-record-vinyl"></i>
      </a>
    </div>
    <div className="navBtn">
      <a href="#" className="py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-user"></i>
      </a>
    </div>
    <div className="navBtn">
      <a href="#" className="py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Add">
        <i className="fa-solid fa-plus"></i>
      </a>
    </div>

  </div>
  );
};

export default Toolbar;