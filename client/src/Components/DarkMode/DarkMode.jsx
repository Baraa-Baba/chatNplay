import React from 'react' 
export default function DarkMode() {
  return (
    <div> 
        <style jsx>{`
        .chatFiltersCont .filtersRow{
            background:#333
        }
        .game-info {
          margin-left: 20px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #E4EDDC;
        }
        .chatInput{
          background:#0B1422 !important;
          color:#fff !important;
          border-color:rgba(255,255,255,0.08) !important;
        }
        .chatInput::placeholder{
          color:rgba(255,255,255,0.45) !important;
        }
        .dashboardLabel{
            color:white
          }
        .fixedGameCont{
          background-color: #27415D; 
        }
        .game-board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-gap: 0px;
          background-color: #555;
          border: 2px solid #333;
          border-radius: 5px;
        }
        .square1,.square4,.square7{
          border-top:10px solid #E4EDDC;
          border-bottom:10px solid #E4EDDC
        }
        .square3,.square4,.square5{
          border-right:10px solid #E4EDDC;
          border-left:10px solid #E4EDDC
        }
        
            .labelDashboardInput{
              color:white;
            }
            .frndsCont{
              color:white
            }
            body{
                background-color:#27415D;
            }
            .videoContainer{
              background-color:#111B2B;
              box-shadow:unset !important

            }
            .goog-te-gadget .goog-te-combo{
              background:rgb(80,80,80);
              color:white !important
            }
            .closeIconSign{
              color:white !important
            }
            .friendCont p{
              color:white

            }
            .friendContMesseages,#message-input{
              background:rgb(80,80,80) !important;
              
            }
            .closeIconSign svg{
              color:white
            }
            .currentFriend p{
              color:white !important
            }
            .currentFriend{
              background:rgb(80,80,80);
            }
            .friendCont{
              background:rgb(80,80,80);
              color:white

            }
            .friendNameMesseages{
              color:white
            }
            .dashBoardInput{
              background:rgb(80,80,80);
              color:white
            }
            .dashBoardInput::placeholder{
              color:rgb(180,180,180)
            }
            .dashboardCont{
              background-color:#111B2B;
            }
            .mainContainer{
              background-color:#111B2B;
              box-shadow:unset
            }
            .alertText{
              color:white
            }
            .partnerVideoContainer{
              background-color:#111B2B !important; 
            }
            .yourMessage{
              background-color:#D6D7D9;
              color:#333333;
              box-shadow:unset;
            }
            #selectCountry{
            color:#E4EDDC
            }
            #selectCountry::placeholder{
            color:#E4EDDC
            }
            .partnerMessage{
              background-color:#27415D;
              color:#EEEEEE;
              box-shadow:unset;
            }   
            .chatFiltersCont *{
              color:#E4EDDC !important;
            }          
            .chatFiltersCont option,.chatFiltersCont .selectGender,.chatFiltersCont .selectGender option,.chatFiltersCont .goog-te-combo,.chatFiltersCont .goog-te-combo option{
              color:#005691 !important;
            }
            .alertText{
            color:white !important
            }
            .radioDarkMode{
              border-color:#E4EDDC !important;
            }
            .chatBox{
              background-color:#111B2B !important
            }
            .descriptionCont p{
              font-size:2rem;
              color:#ffffff
            } 
            .chatInput:focus{
              background:#0B1422 !important;
              color:#fff !important;
              border-color:#4CB1F7 !important;
            }
            .whitebgInput,.whitebgInputMobile{
              background:#111B2B !important
            }
            .onlineText{
              color:#E4EDDC
            } 
            .enjoyInstant{
              color:#eeeeee;
            }
            .AgreeTextOnTerms{
              color:#fff;
            }
            .logIn{
              color:#eee
            }
            .onlineIcon {
              color: #E4EDDC; 
            }
            .everythingElse p{
            color:white !important
            }
            .signInTitle{
            color:white !important
            }
                        .video {
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
            box-shadow: unset;
            border-radius: 15px;
              
            }
            .signCont{ 
                background-color:#27415D;
            }
@media screen and (max-width: 860px) {
.alertText{
  color:white !important
}
.startSearching{
  color:white !important
}
}
.userVideoContainer{
  box-shadow: unset;

}

.partnerVideoContainer{
  box-shadow: unset;

}

/* ─── Dark-mode hover overrides ─────────────────────────────── */
.toast{
  background:#1F2A3D !important;
  color:#fff !important;
  border-color:rgba(255,255,255,0.10) !important;
  box-shadow:0 10px 30px rgba(0,0,0,0.45) !important;
}
.toast__close{
  color:rgba(255,255,255,0.55) !important;
}
.toast__close:hover{
  background:rgba(255,255,255,0.08) !important;
  color:#fff !important;
}
.navgation,.headerContainer{
  background:#1F2A3D !important;
  border-bottom-color:rgba(255,255,255,0.08) !important;
}
.logoText{
  color:#E2E8F0 !important;
}
.logIn{
  color:#E2E8F0 !important;
}
.openerForCont:hover{
  background:rgba(255,255,255,0.06) !important;
}
.openerForCont svg [fill="#005691"]{ fill:#9CA3AF !important; }
.openerForCont svg [stroke="#005691"]{ stroke:#9CA3AF !important; }
.filtersRow{
  background:#1F2A3D !important;
  border-color:rgba(255,255,255,0.08) !important;
  box-shadow:none !important;
}
.filtersDivider{
  background:rgba(255,255,255,0.10) !important;
}
.filtersRow .filtersDropdownInner:hover{
  background:rgba(255,255,255,0.06) !important;
}
.filtersRow .desktopDarkModeControls:hover{
  background:rgba(255,255,255,0.06) !important;
}
.iconContainer:hover{
  background:rgba(255,255,255,0.06) !important;
}
.radioDarkMode{
  background:rgba(255,255,255,0.04) !important;
  border-color:rgba(255,255,255,0.10) !important;
}
.radioDarkMode:hover{
  background:rgba(255,255,255,0.08) !important;
  border-color:#4CB1F7 !important;
}
.logInSubCont:hover{
  background:rgba(255,255,255,0.06) !important;
  border-color:rgba(255,255,255,0.10) !important;
}
.nav-icon-btn:hover{
  background:rgba(255,255,255,0.06) !important;
}
.searchingGameSwitch{
  background:rgba(255,255,255,0.04) !important;
  border-color:rgba(255,255,255,0.10) !important;
}
.searchingGameSelect{
  color:#E4EDDC !important;
}
.searchingGameSwitchLabel{
  color:#9CA3AF !important;
}
.handleFriendsRequestButtons.noButton{
  background:transparent !important;
  color:#E4EDDC !important;
  border-color:rgba(255,255,255,0.14) !important;
}
.handleFriendsRequestButtons.noButton:hover{
  background:rgba(255,255,255,0.06) !important;
}
.switchSign{
  background:transparent !important;
  border-color:rgba(255,255,255,0.14) !important;
  color:#4CB1F7 !important;
}
.switchSign:hover{
  background:rgba(76,177,247,0.10) !important;
  border-color:#4CB1F7 !important;
  color:#4CB1F7 !important;
}
.signCont{
  background:#1F2A3D !important;
  box-shadow:0 8px 32px rgba(0,0,0,0.4) !important;
}
.signInTitle{
  color:#fff !important;
}
.signInput,.PhoneInputInput{
  background:rgba(255,255,255,0.05) !important;
  border-color:rgba(255,255,255,0.10) !important;
  color:#fff !important;
}
.signInput::placeholder,.PhoneInputInput::placeholder{
  color:#9CA3AF !important;
}
.signInput:focus,.PhoneInputInput:focus{
  border-color:#4CB1F7 !important;
  background:rgba(255,255,255,0.07) !important;
}
.phoneNumberButton{
  background:transparent !important;
  color:#E4EDDC !important;
  border-color:rgba(255,255,255,0.14) !important;
}
.phoneNumberButton:hover{
  background:rgba(255,255,255,0.06) !important;
  border-color:rgba(255,255,255,0.22) !important;
}
.GoogleButton{
  background:rgba(255,255,255,0.05) !important;
  color:#fff !important;
  border-color:rgba(255,255,255,0.10) !important;
}
.GoogleButton:hover{
  background:rgba(255,255,255,0.08) !important;
  border-color:rgba(255,255,255,0.18) !important;
}
.selectGender,.goog-te-combo{
  background:#0B1422 !important;
  color:#fff !important;
  border-color:rgba(255,255,255,0.12) !important;
}
.selectGender option,.goog-te-combo option{
  background:#0B1422 !important;
  color:#fff !important;
}
.selectGender:hover,.goog-te-combo:hover{
  background:#11192B !important;
  border-color:rgba(255,255,255,0.22) !important;
}
.selectGender:focus,.goog-te-combo:focus{
  background:#0B1422 !important;
  border-color:#4CB1F7 !important;
}
            `}</style>
    </div>
  )
}
