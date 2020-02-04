import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Clarifai from '../node_modules/clarifai/dist/index';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignInForm from './components/SignInForm/SignInForm';
import Register from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.css';

const app = new Clarifai.App({
  apiKey: '6c928ff634d64fa8b92bd4e65e2e0bfb'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: { 
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    }
  } 

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response)) )
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App bg-secondary container-fluid">
        <div className="container">
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          { this.state.route === 'home' 
            ? <div>
                <Particles className="particles"/>
                <Logo />
                <Rank />
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onSubmit={this.onSubmit} />
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </div>
            : (
              this.state.route === 'signin'
              ? <SignInForm loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
          }
        </div>
      </div>
    );
  }
}


export default App;
