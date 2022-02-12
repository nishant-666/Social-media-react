import React, { useEffect } from "react"
import './styles.css';
import GoogleButton from 'react-google-button'
import { Divider } from 'antd';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate();
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const handleSignUp = () => {
        signInWithPopup(auth, googleProvider)
        .then((response) => {
            localStorage.setItem('userName', response.user.displayName)
            localStorage.setItem('userEmail', response.user.email)
            sessionStorage.setItem('Token', response.user.accessToken)
            // console.log(response.user)
            navigate('/home')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        let token = sessionStorage.getItem('Token');
        if(token){  
            navigate('/home')
        }
    }, [])
    return (
        <div className="register-main">
            <div className="registration-card">
                <p>Register to Get Started..</p>
                <Divider plain></Divider>
                <div className="button-container">
                    <GoogleButton
                        onClick={handleSignUp}
                    />
                </div>
            </div>
        </div>
    )
}