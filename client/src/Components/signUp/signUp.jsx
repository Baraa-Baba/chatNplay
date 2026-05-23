import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/Auth";
import GoogleSignIn from "./GoogleSignIn";
import EmailSignIn from "./EmailSignIn";
import './SignUp.scss'
import { FaTimes } from "react-icons/fa";

const SignIn = ({setIsSignUpOpen,signUp}) => {
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
        <div className="everythingElse">
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
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
