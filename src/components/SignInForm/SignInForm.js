import React from 'react';
import './SignInForm.css';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } 
        })
    }

    render() { 
        const { onRouteChange } = this.props;
        return(   
            <div className="card row">
                <h2 className="text-center">Sign In</h2>
                <form className="col-6 offset-3">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                        onChange={this.onEmailChange} 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                        onChange={this.onPasswordChange} 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto mb-3" onClick={this.onSubmitSignIn}>Submit</button>
                    <p onClick={() => onRouteChange('register')}>Register</p>
                </form>
            </div>
        );
    }
}

export default SignInForm;