import React from 'react';
import './Register.css';

class Register extends React.Component{
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if (user) {
                this.props.loadUser(user);
                console.log('user loaded');
                this.props.onRouteChange('signin');
                console.log('route to signin');
            }
        })
    }

    render() {
        return(
            <div className="card row">
                <h2 className="text-center">Register</h2>
                <form className="col-6 offset-3">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        aria-describedby="nameHelp" 
                        placeholder="Enter name"
                        onChange={this.onNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        onChange={this.onEmailChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"
                        onChange={this.onPasswordChange} />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto mb-3" onClick={this.onSubmitRegister}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;