import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { UseAuth } from '../firebase/contexts/context/Auth';
import './Home.css';

function Home() {
    const { userIsLoggedIn } = UseAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!isSignedIn) {
            setIsSignedIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage(error.message);
                setIsSignedIn(false);
            }
        }
    };

    const onGoogleSignIn = async (event) => {
        event.preventDefault();
        if (!isSignedIn) {
            setIsSignedIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage(error.message);
                setIsSignedIn(false);
            }
        }
    };

    return (
        <>
        {/* {userIsLoggedIn&& (<Navigate to={'/Welcome'} replace={true}/>)} */}
        <div className='form'>
        Register Now
            <form className='signInForm' onSubmit={onSubmit}>
            
                <input
                    type="text"
                    placeholder='Enter your full Name...'
                />
              
                <input
                    type="email"
                    placeholder='Enter email Address...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
           
                <input
                    type="password"
                    placeholder='Enter Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              
                <input
                    type="password"
                    placeholder='Confirm Password here...'
                />

                <button
                    type='submit'
                    disabled={isSignedIn}
                >
                    {isSignedIn ? 'Signing in...' : 'Submit'}
                </button>
            </form>
    
            <p>Don't have an account? <Link to="/register">Log In</Link></p>
            <button
                disabled={isSignedIn}
                onClick={onGoogleSignIn}
            >
                Sign in with Google
            </button>

            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        </>
    );

}

export default Home;
