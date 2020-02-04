import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';

const Logo = () => {
    return(
        <div>
            <Tilt className="Tilt mx-auto" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"><img src="https://img.icons8.com/plasticine/100/000000/brain.png" alt="logo" /></div>
            </Tilt>
        </div>
    )
}

export default Logo;