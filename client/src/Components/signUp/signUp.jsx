import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { useUserAuth } from "../../context/Auth"; 
import GoogleSignIn from "./GoogleSignIn";
import EmailSignIn from "./EmailSignIn";
import PhoneSignUp from "./PhoneSignUp";
import './SignUp.scss'
import { FaTimes } from "react-icons/fa";

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <line x1="11" y1="18.5" x2="13" y2="18.5" />
  </svg>
);
const SignIn = ({setIsSignUpOpen,signUp}) => { 
  const [IsPhone,setIsPhone]=useState(false) 
  const [isSignUp,setissignUp]=useState(signUp)
  const { user } = useUserAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.uid){ 
      navigate('/dashboard')
    }
  },[user,navigate]) 
  return (
    <div style={{maxWidth:'100vw'}}>
    <div className="blackOverlay"></div>
    <div onClick={()=>setIsSignUpOpen(false)} className="centerFlex">
      <div onClick={(e)=>e.stopPropagation()} className="signCont">
        <div onClick={()=>setIsSignUpOpen(false)} className="closeIconSign">
        <FaTimes />
        </div>
        <div className="subSignCont">
       {!IsPhone&& <div className="everythingElse">
          <div className="flexRow">
      <p className="signInTitle">
        {!isSignUp ? 'Log in' : 'Sign up'}
        </p>
      <button className="switchSign" onClick={()=>setissignUp(!isSignUp)}>
        {!isSignUp ?'Sign up' :'Log in'}
      </button>
      </div>
        <EmailSignIn isSignUp={isSignUp} />
       
        
        <GoogleSignIn />
        </div>}
       {!IsPhone&& <button type="button" onClick={()=>setIsPhone(true)} className="signInbutton phoneNumberButton">
       <PhoneIcon />
       <span className="phoneButtonLabel">
       Continue with phone number
       </span>
        </button>}
        { IsPhone&&
        <PhoneSignUp setIsPhone={setIsPhone} />
        }
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;    
