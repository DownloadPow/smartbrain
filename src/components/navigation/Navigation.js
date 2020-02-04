import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './navigation.css'


const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn) {
            return(
                <nav className="bg-light" style={{display: 'flex', justifyContent: 'flex-end',}}>
                    <p className="" onClick={() => onRouteChange('signout')}>Sign Out</p>
                </nav>
            )
        } else {
            return (
                <nav className="bg-light" style={{display: 'flex', justifyContent: 'flex-end',}}>
                    <p className="" onClick={() => onRouteChange('signin')}>Sign In</p>
                    <p className="" onClick={() => onRouteChange('register')}>Register</p>
                </nav>
            )
        }
}

export default Navigation