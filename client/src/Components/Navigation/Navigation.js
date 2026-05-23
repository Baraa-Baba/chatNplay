import React, { useState } from "react";
import "../Navigation/Navigation.scss";
import SignIn from "../signUp/signUp";
import { useUserAuth } from "../../context/Auth";
import { FaUser, FaUserCircle } from 'react-icons/fa';
import Dashboard from "../Dashboard/Dashboard";
import { all } from "axios";

const Navigation = ({ setisDashboard, isDashboard, online,isStarted }) => {
  const { user } = useUserAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignUpOpenL, setIsSignUpOpenL] = useState(false);
  const [isSignUpOpenM, setIsSignUpOpenM] = useState(false);

  return (
    <div className="navgation">
        <a href="/" style={{textDecoration: "none"}}>
      <div className="logoText">
            ChatNPlay
        </div>
        </a>


      {!user?.uid && (
        <>
          <button onClick={() => setIsSignUpOpen(!isSignUpOpen)} className="signUp">
            Sign up
          </button>
          {isSignUpOpen && <SignIn signUp={true} setIsSignUpOpen={setIsSignUpOpen} />}
          {isSignUpOpenM && <SignIn signUp={true} setIsSignUpOpen={setIsSignUpOpenM} />}

          <button
            className="nav-icon-btn sigininpop"
            onClick={() => setIsSignUpOpenM(!isSignUpOpenM)}
            title="Sign in"
            style={{ position: 'absolute', top: 10, right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <FaUser size={22} color="#6B7280" />
          </button>

          <div onClick={() => setIsSignUpOpenL(!isSignUpOpenL)} className="logInCont">
            <div className="logInSubCont">
              <FaUserCircle className="logInIcon" size={20} color="#6B7280" />
              <span className="logIn">Log in</span>
              {isSignUpOpenL && (
                <SignIn signUp={false} setIsSignUpOpen={setIsSignUpOpenL} />
              )}
            </div>
          </div>
        </>
      )}

      {isDashboard && (
        <Dashboard setisDashboard={setisDashboard} isDashboard={isDashboard} />
      )}

      {user?.uid && !isDashboard && (
        <a href="/dashboard">
          <button className="nav-icon-btn sigininpop mobileOnly" title="My account"
            style={{ position: 'absolute', top: 10, right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaUser size={22} color="#6B7280" />
          </button>
        </a>
      )}

      {user?.uid && (
        <div
          onClick={e => { setisDashboard(true); e.stopPropagation(); }}
          className="logInCont"
          style={{ right: 0 }}
        >
          <div className="logInSubCont myAccountlogInSubCont">
            <FaUserCircle className="logInIcon" size={20} color="#6B7280" />
            <span className="logIn myAccountextt">My account</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
