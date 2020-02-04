import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return(
        <div>
            <p className="text-center text-white">{'This Magic Brain will detect faces in your pictures'}</p>
            <div className="mx-auto w-75">
                <input 
                    className="form-control w-100" 
                    type='text' 
                    onChange={onInputChange} />
                <button 
                    className="btn btn-primary d-block mx-auto" 
                    onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;