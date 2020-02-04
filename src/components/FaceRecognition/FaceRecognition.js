import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className="imageBox mx-auto">
            <img src={imageUrl} alt="Test" id="inputimage" width="300" height="auto" className="d-block mx-auto"/>
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    )
}

export default FaceRecognition;