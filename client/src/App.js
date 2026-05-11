import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Peer from "simple-peer";
import AliceCarousel from 'react-alice-carousel';
import { countryList } from './countryList'
import { countries, zones } from 'moment-timezone/data/meta/latest.json'
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from "react-router-dom";
import ChooseGame from "./Components/ChooseGame/ChooseGame";
import MyChessBoard from './Components/Games/MyChessBoard'
import {
  FaUserFriends,
  FaPhotoVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhone,
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaLaptop,
  FaCrosshairs,
  FaMale,
  FaFemale,
  FaUser
} from "react-icons/fa";
import Navigation from "./Components/Navigation/Navigation";
import Chat from "./Components/Chat/Chat";
import Spinner from "./Components/Spinner/Spinner";
import Footer from "./Components/Footer/Footer";
import DarkMode from "./Components/DarkMode/DarkMode";
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useUserAuth } from './context/Auth';
import { db, auth } from "./firebase";
import { useId } from "react";
import TicTak from "./Components/Games/TicTak";
function App() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate()
  const [userCountry, setUserCountry] = useState('anycountry')
  const [isAceptedFriends, setisAceptedFriends] = useState(undefined)
  const [isSendRequst, setisSendRequst] = useState(false)
  const [isReciveRequst, setisReciveRequst] = useState(false)
  const [friendRequestStatus, setfriendRequestStatus] = useState('pending....')
  const [userCountryPrefrence, setUserCountryPrefrence] = useState('')
  const [isStarted, setisStarted] = useState(false)
  const [isDarkMode, setisDarkMode] = useState(true)
  const [isStarted1Mobile, setisStarted1Mobile] = useState(false)
  const [userGender, setUserGender] = useState('anygender')
  const [userAuthPrefernce, setUserAuthPrefrence] = useState('allUsers')
  const [introMessage, setintroMessage] = useState('')
  const [isGenderContopen, setisGenderContopen] = useState(false)
  const [stream, setStream] = useState();
  const [CurrentRoomId, setCurrentRoomId] = useState('')
  const [filterStream, setFilterStream] = useState()
  const [isShowDesktopChatBox, setisShowDesktopChatBox] = useState(true)
  const [currentVideoStream, setCurrentVideoStream] = useState()
  const [ShowFilterOptions, setShowFilterOptions] = useState(false)
  const [onlyChat, setOnlyChat] = useState(true);
  const [partner, setPartner] = useState("");
  const [searchingPartner, setSearchingPartner] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [countryListState, setcountryListState] = useState([])
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isFullScreen, setFullscreen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [slide, setSlide] = useState(0)
  const [messages, setMessages] = useState([{ text: 'hello', type: 'you' }, { text: 'hello', type: 'you' }, { text: 'hello', type: 'you' }
    , { text: 'hello', type: 'you' }, { text: 'hello', type: 'you' }, { text: 'hello', type: 'you' }, { text: 'hello', type: 'you' }, { text: 'hello', type: 'you' }]);
  const [userLangue, setuserLangue] = useState('')
  const [PartnerData, setPartnerData] = useState({})
  const [status, setStatus] = useState("connected!");
  const [prevUserID, setprevUserID] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [isScreenSharing, setScreenSharing] = useState(false)
  const [isVideoEnabled, setisVideoEnabled] = useState(false)
  const [filter, setFilter] = useState("none")
  const [passedXIndex, setPassedXIndex] = useState(null)
  const [partnerFilter, setPartnerFilter] = useState('none')
  const [changed, setChanged] = useState(false)
  const [IsFetchedUser, setIsFetchedUser] = useState(false)
  const [isEmojiPickerCont, setisEmojiPickerCont] = useState(false)
  const [isMobile, setIsmobile] = useState(false)
  const [IsopenChat, setIsopenChat] = useState(false)
  const [indicater, setindicater] = useState(false)
  const [isFoundPartner, setisFoundPartner] = useState(false)
  const [isDashboard, setisDashboard] = useState(false)
  const [isSwaped, setIsSwaped] = useState(false)
  const [isfakeFeed, setisfakeFeed] = useState(false)
  const [dotsIntreval, setdotsIntreval] = useState()
  const [isAbleToBeFriends, setisAbleToBeFriends] = useState(false)
  const [numberOfUnreadMessages, setnumberOfUnreadMessages] = useState(-1)
  const [friends, setfriends] = useState([])
  const [userGame, setUserGame] = useState('no-game')
  const [isEndCallTriggredOrEndCallTriggred, setIsEndCallTriggredOrEndCallTriggred] = useState(false)
  const [AuthType, setAuthType] = useState('noLogin')
  const [GameData, setGameData] = useState({})
  const [numberOfUnreadMessagesDesktop, setnumberOfUnreadMessagesDesktop] = useState(0)
  const [isOpenGameMobile, setisOpenGameMobile] = useState(false)
  const [isWhite, setisWhite] = useState(null)
  const [passedMove, setpassedMove] = useState(null)
  const userVideo = useRef();
  const partnerVideo = useRef();
  const filterValue = useRef()
  const socket = useRef();
  const myPeer = useRef();
  const pcRef = useRef()
  const pclocalStream = useRef()
  const userGenderSelector = useRef()
  const userGenderSelector1 = useRef()
  const userGenderPrefrenceSelector = useRef()
  const userCountryPrefrenceSlector = useRef()




  const { user } = useUserAuth();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (userGame != 'no-game') {
      setisShowDesktopChatBox(false)
    } else {
      setisShowDesktopChatBox(true)
    }
  }, [userGame])

  useEffect(() => {
    console.log(PartnerData)
  }, [PartnerData])
  useEffect(() => {
    if (user?.uid && user?.phoneNumber) {
      setAuthType('phoneNumberLogin')
    } else if (user?.uid) {
      setAuthType('anyLogin')
    } else {
      setAuthType('noLogin')
    }
  }, [user])
  useEffect(() => {

    async function storeUser() {
      try {
        const docRef = await setDoc(doc(db, "users", user?.uid),
          {
            userGame: userGame,
            userAuthPrefernce: userAuthPrefernce,
            isDarkMode: isDarkMode
          }
          , { merge: true });
      } catch (e) {
        alert('error in saving changes')

        console.error("Error adding document: ", e);
      }
    }
    if (user?.uid && IsFetchedUser) {
      storeUser()
    }
  }, [userGame, userAuthPrefernce, user, isDarkMode])
  useEffect(() => {
    window.localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode])
  useEffect(() => {
    setisDarkMode(window.localStorage.getItem('isDarkMode'))
  }, [])

  useEffect(() => {

    if (dotsIntreval) {
      clearInterval(dotsIntreval)
    }
    if (!isOnline && searchingPartner) {
      window.dotsGoingUp = true;
      var dots = setInterval(function () {
        var wait = document.getElementById("wait");
        var wait2 = document.getElementById("waitMobile");
        if (window.dotsGoingUp) {
          wait.innerHTML += ".";
          if (wait2) {
            wait2.innerHTML += ".";
          }
        }
        else {
          wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
          if (wait2) {
            wait2.innerHTML = wait.innerHTML.substring(1, wait2.innerHTML.length);
          }
          if (wait.innerHTML === "")
            window.dotsGoingUp = true;
        }
        if (wait.innerHTML.length > 4)
          window.dotsGoingUp = false;



      }, 300);
      setdotsIntreval(dots)
    }
  }, [isOnline, searchingPartner])
  useEffect(() => {
    if (user?.uid) {
      async function run() {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data()
          if (userData?.userAuthPrefernce) {
            setUserAuthPrefrence(userData?.userAuthPrefernce)
          }
          if (userData?.userGame) {
            setUserGame(userData?.userGame)
          }
          setintroMessage(userData?.introMessage)
          setisDarkMode(userData?.isDarkMode)
          setIsFetchedUser(true)
        }
      }
      setTimeout(() => {
        run()
      }, 2)
    }
  }, [user])
  useEffect(() => {
  }, [PartnerData])
  useEffect(() => {
    let dots = ''
    setInterval(() => {
      if (document.getElementById('loadingFilters')) {
        dots += '.'
        document.getElementById('loadingFilters').textContent = `loading${dots}`
        if (dots == '.....') {
          dots = ''
          document.getElementById('loadingFilters').textContent = `loading${dots}`
        }
      }
    }, 500)
  }, [])
  useEffect(() => {
    var canreach = false;

    document.addEventListener('DOMContentLoaded', function () {
      //check in firefox if enhanced tracking protection is enabled 
      try {
        var img = new Image();
        img.src = "//apps.facebook.com/favicon.ico";
        img.style.display = "none";
        img.onload = function () {
          canreach = true;
        };
        img.onerror = imageDidntLoad()
        document.body.appendChild(img);
      } catch {
      }
      function imageDidntLoad() {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
          document.getElementById('firefoxDialog').showModal()
          document.getElementById('firefoxDialog').style.visibility = 'visible'
          document.getElementById('okfirefoxDialog').addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('firefoxDialog').style.visibility = 'hidden'
            document.getElementById('firefoxDialog').close();
          })
        }
      }
    });

  }, [])
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth)
      if (window.innerWidth > 860) {
        setIsmobile(false)
      } else {
        setIsmobile(true)
        if (isDashboard) {
          navigate('/dashboard')
        }
      }
    };
    window.addEventListener('resize', handleResize);
    if (window.innerWidth > 860) {
      setIsmobile(false)
    } else {
      setIsmobile(true)
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [isDashboard]);


  useEffect(() => {

    initVideo()
    socket.current = io('https://chatandplay.onrender.com', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });




    window.onbeforeunload = (event) => {

      if (myPeer.current) {

        myPeer.current.destroy();
        socket.current.emit("disconnect");
        if (isOnline) {
        }
      }

    };

    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("recivedFriendRequst", (data) => {
      setisReciveRequst(true)
    })
    socket.current.on("reciveIsAceptedFriend", (data) => {

      if (data.message) {
        setfriendRequestStatus('accepted')

      } else {
        setfriendRequestStatus('rejected')
      }
    })
    socket.current.on("isInverted", (data) => {
      if (data.message == 'inverted') {
        if (document.getElementById('partnerVideo')) {
          document.getElementById('partnerVideo').style.transform = `rotateY(${180}deg)`
        }
      } else {
        if (document.getElementById('partnerVideo')) {
          document.getElementById('partnerVideo').style.transform = `rotateY(${0}deg)`
        }
      }
    });
    socket.current.on("isCallEnded", (data) => {
      if (pcRef.current) {

      }

      myPeer.current.destroy();
      resetAppState();
      setTimeout(() => {
        if (!isOnline) {
          next()
        }
      }, 1000)
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });
    socket.current.on("receiveBoard", (data) => {
      console.log(data)
      console.log(GameData?.isX)
      setPassedXIndex(data.message)
    });
    socket.current.on("receiveChessMove", (data) => {
      console.log(data)
      setpassedMove(data.message)
    });
    socket.current.on("messageSent", (data) => {
      setMessages((m) => [...m, { type: "you", text: data.message }]);
    });

    socket.current.on("receiveMessage", (data) => {
      setMessages((m) => [...m, { type: "partner", text: data.message }]);
      if (!IsopenChat) {
        setindicater((previndicater) => !previndicater)
      }
    });
    socket.current.on("peer", (data) => {
      setisFoundPartner(true)
      setGameData({ isX: data.initiator, passedXIndex: Array(9).fill(null) })
      setisWhite(data.initiator)

      socket.current.off("signal");
      if (!onlyChat) {
        pcRef.current = new RTCPeerConnection({
          iceServers: [
            {
              urls: ['stun:stun1.l.google.com:19302'],
            },
          ],
          iceCandidatePoolSize: 10,
        })
        // let localStream = null;
        // let remoteStream = null;



        //   async function runn ()  { 
        //     if(userVideo.current.srcObject){
        //   setStream(userVideo.current.srcObject)
        //   remoteStream = new MediaStream();

        //   // Push tracks from local stream to peer connection
        //   userVideo.current.srcObject.getTracks().forEach((track) => {
        //     pclocalStream.current= pcRef.current.addTrack(track, userVideo.current.srcObject);
        //   });
        //     }
        //   // Pull tracks from remote stream, add to video stream
        //   pcRef.current.ontrack = (event) => {
        //     if(event.streams[0]){
        //     event.streams[0].getTracks().forEach((track) => { 
        //       remoteStream.addTrack(track);
        //       const startTime = new Date().getTime(); 
        //       track.addEventListener('onstatetransition', event => {
        //         if (event.target.readyState === 'live') {
        //           const endTime = new Date().getTime();
        //           const delay = endTime - startTime; 
        //         }
        //       });
        //     });
        //     }
        //   };
        //     userVideo.current.srcObject=userVideo.current.srcObject;
        //     if(remoteStream){
        //     partnerVideo.current.srcObject=remoteStream 
        //     }
        // };
        //       async function answerAndOffer(){
        //       await runn()     

        //       if(data.initiator){

        // // Get candidates for caller, emit to server
        // if(pcRef.current){
        // pcRef.current.onicecandidate = (event) => {
        //   if (event.candidate) {
        //     socket.current.emit('candidate', event.candidate.toJSON());
        //   }
        // };
        // }
        // async function createOfer(){
        //   if(pcRef.current){
        //     try{
        // const offerDescription = await pcRef.current.createOffer();
        // await pcRef.current.setLocalDescription(offerDescription); 
        // const offer = {
        //   sdp: offerDescription.sdp,
        //   type: 'offer', 
        //   id:data.peerId
        // };
        // socket.current.emit('offer', offer, data.peerId);
        //   }
        //   catch(e){ 
        //   }
        //   }


        // // Listen for remote answer
        // socket.current.on('answer', (answer) => {
        //   if(pcRef.current){
        //     try{
        //   const answerDescription = new RTCSessionDescription(answer);
        //   pcRef.current.setRemoteDescription(answerDescription);  
        //   }
        //   catch(e){ 
        //   }
        //   }
        // });

        // // When answered, add candidate to peer connection
        // socket.current.on('candidate', (candidate) => {
        //   if(pcRef.current){
        //     try{
        //   const iceCandidate = new RTCIceCandidate(candidate);
        //   pcRef.current.addIceCandidate(iceCandidate); 
        //   }catch{

        //   }
        //   }
        // });
        // }
        // createOfer()
        //       }else{
        //      // Get candidates for caller, emit to server
        // pcRef.current.onicecandidate = (event) => {
        //   if (event.candidate) {
        //     socket.current.emit('candidate', event.candidate.toJSON());
        //   }
        // }; 

        // // Listen for remote offer
        // socket.current.on('offer', async (offer) => {
        //   if(pcRef.current){
        //   try{
        //   setLoading(true);
        //   setStatus("Connected!"); 
        //   const offerDescription = new RTCSessionDescription(offer);
        //   await pcRef.current.setRemoteDescription(offerDescription);

        //   // Create answer, emit to server
        //   const answerDescription = await pcRef.current.createAnswer();
        //   await pcRef.current.setLocalDescription(answerDescription);

        //   const answer = {
        //     sdp: answerDescription.sdp,
        //     type: 'answer',
        //     id:data.peerId
        //   };  

        // socket.current.emit('answer', answer, peerId); }
        // catch(e){ 
        // }
        //   }

        // });

        // // When answered, add candidate to peer connection
        // socket.current.on('candidate', (candidate) => {
        //   if(pcRef.current){
        //     try{
        //   const iceCandidate = new RTCIceCandidate(candidate);
        //   pcRef.current.addIceCandidate(iceCandidate); 
        //     }catch(e){
        //       console.log(e)
        //     }
        //   }
        // });

        // // Listen for remote answer
        // socket.current.on('answer', (answer) => {
        //   if( pcRef.current){
        //     try{
        //   const answerDescription = new RTCSessionDescription(answer);
        //   pcRef.current.setRemoteDescription(answerDescription); 
        //   setLoading(true);
        //   setStatus("Connected!");  
        //   }catch(e){ 
        //       console.log(e)
        //   }
        //   }
        // });

        //       }


        //     }
        //     answerAndOffer()
      } else {
        setLoading(true);
        setStatus("Connected!");
        setisFoundPartner(true)
        setIsOnline(true);
        setSearchingPartner(false);
        setLoading(false);
        setChanged(!changed)
      }
      setPartner(data.peerId);

      let peerId = data.peerId;

      setPartnerData(data)
      setTimeout(() => {
        if (introMessage && introMessage.trim() !== '') {
          socket.current.emit("sendMessage", {
            message: introMessage,
            peerId: peerId,
          });
        }
      }, 2000)
      let srcObject;
      if (userVideo.current && userVideo.current.srcObject) {
        srcObject = userVideo.current.srcObject;
      } else {
        srcObject = null;
      }
      let peer = new Peer({
        initiator: data.initiator,
        trickle: true,
        config: {
          iceServers: [
            {
              urls: "stun:numb.viagenie.ca",
              username: "chrisk1994@fajne.to",
              credential: "123456789",
            },
            {
              urls: "turn:numb.viagenie.ca",
              username: "chrisk1994@fajne.to",
              credential: "123456789",
            },
          ],
        },
        stream: srcObject,
      });
      peer.on('stream', (remoteStream) => {
        // You can access the srcObject of the remote stream like this
        let remoteSrcObject = remoteStream;
        partnerVideo.current.srcObject = remoteSrcObject;
        // Now you can use remoteSrcObject for your purposes
        console.log('Received remote stream with srcObject:', remoteSrcObject);
      });
      myPeer.current = peer;
      peer._debug = console.log;

      socket.current.on("signal", (data) => {
        if (!peer.destroyed && data.peerId === peerId) {
          peer.signal(data.signal);
        }
      });

      peer.on("signal", (data) => {
        socket.current.emit("signal", {
          signal: data,
          peerId: peerId,
        });
      });

      peer.on("error", (e) => {
        console.log("Error sending connection to peer %s:", peerId, e);
      });

      peer.on("connect", () => {
        setIsOnline(true);
        setSearchingPartner(false);
        setLoading(false);
        setChanged(!changed)
        peer.send("hey peer");


      });

      peer.on("data", (data) => {
        console.log(data, 'dejdpijdenoidenoidnoine')
      });
      peer.on('negotiationneeded', () => {

      })

      peer.on("close", () => {
        resetAppState();
      });
    });
  }, []);
  useEffect(() => {
    if (IsopenChat) {
      setnumberOfUnreadMessages(0)
    }
  }, [IsopenChat])
  function getSilence() {
    let ctx = new AudioContext(),
      oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  }

  function getBlack() {
    let width = 580;
    let height = 400;
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = window.localStorage.getItem('isDarkMode') ? '#111B2B' : '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let stream = canvas.captureStream(30);
    return Object.assign(stream.getVideoTracks()[0]);
  }
  function initVideo() {
    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        frameRate: { ideal: 30 }
      },
      audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints).then(
      (newStream) => {
        setOnlyChat(false)
        // setStream(newStream); 
        setStream(newStream);
        if (userVideo.current) {
          userVideo.current.srcObject = newStream;
        }

        // Push tracks from local stream to peer connection 

        let remoteStream = new MediaStream();
        userVideo.current.srcObject = newStream;
        partnerVideo.current.srcObject = remoteStream;

      },
      () => {

        navigator.mediaDevices.getUserMedia({ video: true }).then(

          (newStream) => {

            setOnlyChat(false);
            let silenceStream = new MediaStream([
              getSilence(),
              ...newStream.getVideoTracks(),
            ]);
            var canvas = document.getElementById("jeeFaceFilterCanvas");
            var mystream = canvas.captureStream(10);
            let filterStreamm = new MediaStream([
              getSilence(),
              ...mystream.getVideoTracks(),
            ]);
            setStream(silenceStream);
            if (userVideo.current) {
              userVideo.current.srcObject = silenceStream;
            }
            setCurrentVideoStream(filterStreamm)
            setFilterStream(filterStreamm)
          },
          () => {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(
              (newStream) => {
                setOnlyChat(false);
                let blackStream = new MediaStream([
                  getBlack(),
                  ...newStream.getAudioTracks(),
                ]);
                setStream(blackStream);
                if (userVideo.current) {
                  userVideo.current.srcObject = blackStream;
                }
              },
              () => {
                let dummyStream = new MediaStream([getSilence(), getBlack()]);
                setStream(dummyStream);
                if (userVideo.current) {
                  userVideo.current.srcObject = dummyStream;
                }
              }
            );
          }
        );
      }
    );
  }
  useEffect(() => {
    if (!isMobile) {
      setIsSwaped(false)
    }
  }, [isMobile])
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(
      () => {
        //do nothing
      },
      () => {
        let width = 580;
        let height = 400;
        let canvas = Object.assign(document.createElement("canvas"), {
          width,
          height,
        });
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = isDarkMode ? '#111B2B' : '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let stream = canvas.captureStream(30);
        let blackCanvas = Object.assign(stream.getVideoTracks()[0]);
        let dummyStream = new MediaStream([getSilence(), blackCanvas]);
        setStream(dummyStream);
        if (userVideo.current) {
          userVideo.current.srcObject = dummyStream;
        }
      }
    )
  }, [isDarkMode])
  useEffect(() => {
    document.getElementById('isFoundPartner').value = isFoundPartner
  }, [isFoundPartner])
  useEffect(() => {
    document.getElementById('searchingPartner').value = searchingPartner
  }, [searchingPartner])
  function next() {
    setSearchingPartner(true);
    setisStarted(true)

    setcountryListState(countryList)
    const randomId = uuidv4();

    setCurrentRoomId(randomId)
    socket.current.emit("findPartner", {
      from: yourID,
      uid: user?.uid,
      onlyChat: onlyChat,
      userGame: userGame,
      roomId: randomId,
      AuthType: AuthType,
      userAuthPrefernce: userAuthPrefernce,

    });
  }
  useEffect(() => {
    if (messages && messages[0]) {
      if (messages[messages.length - 1].type == 'partner' && !isShowDesktopChatBox) {
        setnumberOfUnreadMessagesDesktop(numberOfUnreadMessagesDesktop + 1)
      }
    }
  }, [messages])
  useEffect(() => {
    if (isShowDesktopChatBox) {
      setnumberOfUnreadMessagesDesktop(0)
    }
  }, [isShowDesktopChatBox])
  function resetAppState() {
    setpassedMove(null)
    setisWhite(null)
    setisOpenGameMobile(false)
    setCurrentRoomId('')
    setnumberOfUnreadMessagesDesktop(0)
    setnumberOfUnreadMessages(0)
    setGameData({})
    setPassedXIndex(null)
    setisAceptedFriends(undefined)
    setfriendRequestStatus('pending...')
    setisReciveRequst(false)
    setisSendRequst(false)
    setPartnerData({})
    setScreenSharing(false);
    setIsOnline(false);
    setMessages([]);
    setSearchingPartner(false);
    setLoading(false);
    setPartnerFilter('none')
    if (partnerVideo) {
      partnerVideo.current.srcObject = null
    }
    try {
    } catch (e) {
      setTimeout(() => {
        try {
        } catch {
        }
      }, 100)
    }

  }
  function createNewChatRoom(roomId, friendsId) {
    async function run() {
      const datafirebase = {
        id: roomId,
        messages: []
      }
      try {
        const docRef = await setDoc(doc(db, "chatRooms", roomId), datafirebase);
      } catch (e) {
      }
    }
    run()

  }
  function sendIsAceptedFriend(isAcepted) {
    console.log(PartnerData)

    if (user?.uid && PartnerData?.uid && isOnline) {
      if (isAcepted) {
        setCurrentRoomId(PartnerData?.roomId)
        createNewChatRoom(PartnerData?.roomId, [[user?.uid, PartnerData?.uid]])
        if (friends.length != 0) {
          setfriends([...friends, { id: PartnerData?.uid, roomId: PartnerData?.roomId }])
        } else {
          setfriends([{ id: PartnerData?.uid, roomId: PartnerData?.roomId }])
        }
        setisAceptedFriends(true)
      } else {
        setisAceptedFriends(false)
      }
      socket.current.emit('sendIsAceptedFriend', {
        peerId: partner,
        message: isAcepted
      })
    }
  }
  function sendFriendRequst() {
    if (user?.uid && PartnerData?.uid && isOnline) {

      setisSendRequst(true)
      socket.current.emit('sendFriendRequst', {
        peerId: partner,
        message: ''
      })
    }
  }
  function addEmoji(emojiData) {
    setInputText((prevInput) => `${prevInput}${emojiData}`);
  }

  function sendMoveSocket(move) {

    if (socket.current) {
      socket.current.emit("sendChessMove", {
        message: move,
        peerId: partner,
      });
    }
  }
  function sendBoardSocket(board) {
    if (socket.current) {
      setPassedXIndex(passedXIndex)
      console.log(board)
      socket.current.emit("sendBoard", {
        message: board,
        peerId: partner,
      });
    }
  }
  function sendMessage(e) {

    e.preventDefault();
    if (inputText !== "" && isOnline) {
      socket.current.emit("sendMessage", {
        message: inputText,
        peerId: partner,
      });
    }
    setInputText("");
  }
  useEffect(() => {
    if (!isOnline) {
      setIsopenChat(false)
    }
  }, [isOnline])
  function cancel() {
    setSearchingPartner(false);
    if (!isfakeFeed) {
      socket.current.emit("leaveQueue");
    }
    if (isfakeFeed) {
      setIsOnline(false)
      setisfakeFeed(false)
      partnerVideo.current.src = null

    }
    resetAppState()
  }
  function stop(e) {
    e.preventDefault()
    if (isfakeFeed) {
      cancel()
    }
    if (searchingPartner) {
      cancel()
    } else if (isOnline) {
      endCall()
    } else {
    }
    e.preventDefault()
  }
  function handleFullScreenSwap(isPartner) {
    if (!isFullScreen) return ''
    if (isPartner) {
      if (isSwaped) {
        return 'userVideoFull'
      } else {
        return 'partnerVideoFull'
      }
    } else {
      if (isSwaped) {
        return 'partnerVideoFull'
      } else {
        return 'userVideoFull'
      }
    }
  }
  function handleSwapVideos() {
    if (isMobile && isStarted) {

      setIsSwaped(!isSwaped)
    }
  }
  function endCall() {
    socket.current.emit("endCall", {
      message: true,
      peerId: partner,
    });
    if (!isfakeFeed && myPeer.current) {
      myPeer.current.destroy();
    }
    setIsEndCallTriggredOrEndCallTriggred(!isEndCallTriggredOrEndCallTriggred)
    resetAppState();
  }
  function nextUser() {
    setisFoundPartner(false)

    if (isOnline && !isfakeFeed) {
      endCall()
      setTimeout(() => {
        next()
      }, 100)
    } else {
      cancel()
      setTimeout(() => {
        next()
      }, 100)
    }
  }
  useEffect(() => {
    partnerVideo.current.addEventListener('ended', function () {
      partnerVideo.current.src = null
      cancel()
      next()
    });
  }, [])
  useEffect(() => {
    if (!IsopenChat) {
      setnumberOfUnreadMessages((prevnumberOfUnreadMessages) => prevnumberOfUnreadMessages + 1)
    }
  }, [indicater])
  function adjustWidth() {
  }
  function checkIfAllowed(e) {
    e.preventDefault()
    if (AuthType === 'phoneNumberLogin') {
      setUserAuthPrefrence(e.target.value)
      adjustWidth()
      return
    }
    if (AuthType === 'anyLogin' && e.target.value !== 'phoneNumberLogin') {
      setUserAuthPrefrence(e.target.value)
      adjustWidth()
      return
    } else {
      if (e.target.value == 'loginUsers') {
        alert('you have to be logged in to activate this feature')
        return
      }
    }
    if (AuthType === 'noLogin' && AuthType === 'allUsers') {
      setUserAuthPrefrence(e.target.value)
      adjustWidth()
      return
    } else {
      alert('you have to be logged in using your phone number to activate this feature')
    }
  }
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(
      (screenStream) => {
        myPeer.current.replaceTrack(
          stream.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          stream
        );
        userVideo.current.srcObject = screenStream;
        setScreenSharing(true);
        screenStream.getTracks()[0].onended = () => {
          setScreenSharing(false);
          if (onlyChat) {
            myPeer.current.replaceTrack(
              screenStream.getVideoTracks()[0],
              getBlack(),
              stream
            );
          } else {
            myPeer.current.replaceTrack(
              screenStream.getVideoTracks()[0],
              stream.getVideoTracks()[0],
              stream
            );
          }
          userVideo.current.srcObject = stream;
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function toggleMuteAudio() {
    if (stream) {
      setAudioMuted(!audioMuted);
      if (stream.getAudioTracks()[0]) {
        stream.getAudioTracks()[0].enabled = audioMuted;
        if (filterStream && filterStream.getAudioTracks()[0]) {
          filterStream.getAudioTracks()[0].enabled = audioMuted;
        }

      }
    }
  }

  function toggleMuteVideo() {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
      if (filterStream && filterStream.getVideoTracks()[0]) {
        filterStream.getVideoTracks()[0].enabled = videoMuted;
      }
    }
  }

  function isMobileDevice() {
    let check = false;
    (function (a) {
      if (
        // eslint-disable-next-line
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        // eslint-disable-next-line
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  let UserVideo;
  useEffect(() => {
    if (isStarted && isMobile) {
      setisStarted1Mobile(true)
    } else if (isStarted && !isMobile) {
      setisStarted1Mobile(false)
    }
  }, [isStarted, isMobile])
  useEffect(() => {
    document.getElementById('filterValue').value = filter
    if (userVideo.current && stream) {

      if (filter == 'none' || filter == 'inverted') {
        userVideo.current.srcObject = stream;
        setCurrentVideoStream(stream)
        setisVideoEnabled(true)
        socket.current.emit("sendIsInverted", {
          message: filter,
          peerId: partner,
        });
        if (myPeer.current && isOnline) {
          try {
            myPeer.current.replaceTrack(
              stream.getVideoTracks()[0],
              stream.getVideoTracks()[0],
              stream
            )
          }
          catch {
            console.log('error in replacing tracks')
          }
        }
      }
      else {
        if (document.getElementById("jeeFaceFilterCanvas")) {
          socket.current.emit("sendIsInverted", {
            message: filter,
            peerId: partner,
          });
          setisVideoEnabled(true)
          var canvas = document.getElementById("jeeFaceFilterCanvas");
          var mystream = canvas.captureStream(10);
          let filterStreamm = new MediaStream([
            ...stream.getAudioTracks(),
            ...mystream.getVideoTracks(),
          ]);
          socket.current.emit("sendIsInverted", {
            message: filter,
            peerId: partner,
          });
          userVideo.current.srcObject = filterStreamm;
          if (myPeer.current && isOnline) {
            try {
              myPeer.current.replaceTrack(
                stream.getVideoTracks()[0],
                filterStreamm.getVideoTracks()[0],
                stream
              )
            }
            catch (e) {
              console.log('error in replacing tracks', e)

              alert('error in sended filtered stream to partner ')
            }
          }
          setCurrentVideoStream(filterStreamm)
          setFilterStream(filterStreamm)
        } else {
          userVideo.current.srcObject = stream;
          setCurrentVideoStream(stream)

        }
      }
    }
  }, [filter, stream])
  if (stream) {
    UserVideo = (
      <video
        id='videoOfUser'
        className="video userVideo"

        playsInline
        onClick={() => handleSwapVideos()}
        muted
        ref={userVideo}
        autoPlay
        delay
      />
    );

  }

  let PartnerVideo;
  if (isFullScreen) {
    PartnerVideo = (
      <video
        onClick={() => handleSwapVideos()}
        id='partnerVideo'
        className="video partnerVideo partnerFullScreen"
        playsInline
        ref={partnerVideo}
        autoPlay
      />
    );
  } else if (!isFullScreen) {
    PartnerVideo = (
      <video
        id='partnerVideo'
        onClick={() => handleSwapVideos()}
        className="video partnerVideo"
        playsInline
        ref={partnerVideo}
        autoPlay
      />
    );
  }
  let audioControl;
  let videoControl;
  let fullscreenButton;
  let screenShare;
  let hangUp;
  if (audioMuted) {
    audioControl = (
      <span className={`iconContainer 
       `} onClick={() => toggleMuteAudio()}>

        <svg style={{ paddingTop: '3px', transform: 'scale(1.13)' }} className="iconAlternative"
          alt="Unmute audio" xmlns="http://www.w3.org/2000/svg" width="51" height="44" viewBox="0 0 33 36" fill="none">
          <g filter="url(#filter0_d_559_31)">
            <path d="M16.5 23.8333C20.8279 23.8333 24.3333 20.85 24.3333 17.1666V7.99998C24.3333 4.31665 20.8279 1.33331 16.5 1.33331C12.172 1.33331 8.66663 4.31665 8.66663 7.99998V17.1666C8.66663 20.85 12.172 23.8333 16.5 23.8333Z" fill="#FF0000" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.5188 14.0833V16.9166C1.5188 23.95 8.23588 29.6666 16.5 29.6666C24.7642 29.6666 31.4813 23.95 31.4813 16.9166V14.0833M13.778 8.71664C15.5405 8.16664 17.4596 8.16664 19.2221 8.71664M14.9334 12.25C15.9713 12.0166 17.0484 12.0166 18.0863 12.25M16.5 29.6666V34.6666" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <line x1="3.242" y1="6.57148" x2="30.6324" y2="31.4665" stroke="black" stroke-width="1.3" />
          <defs>
            <filter id="filter0_d_559_31" x="0.768799" y="0.583344" width="39.4624" height="42.8333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_559_31" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_559_31" result="shape" />
            </filter>
          </defs>
        </svg>
      </span>
    );
  } else {
    audioControl = (
      <span className={`iconContainer 
       `} onClick={() => toggleMuteAudio()}>
        <svg style={{ paddingTop: '3px', transform: 'scale(1.2)' }} className="iconBasic" alt="Stop audio" xmlns="http://www.w3.org/2000/svg"
          width="51" height="44" viewBox="0 0 41 38" fill="none">
          <g filter="url(#filter0_d_559_31)">
            <path d="M20.5001 23.8333C24.828 23.8333 28.3334 20.85 28.3334 17.1667V8.00001C28.3334 4.31668 24.828 1.33334 20.5001 1.33334C16.1722 1.33334 12.6667 4.31668 12.6667 8.00001V17.1667C12.6667 20.85 16.1722 23.8333 20.5001 23.8333Z" fill="#00cc00" stroke="#005691" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.5188 14.0833V16.9167C5.5188 23.95 12.2359 29.6667 20.5 29.6667C28.7642 29.6667 35.4813 23.95 35.4813 16.9167V14.0833M17.778 8.71667C19.5405 8.16667 21.4596 8.16667 23.2221 8.71667M18.9334 12.25C19.9713 12.0167 21.0484 12.0167 22.0863 12.25M20.5 29.6667V34.6667" stroke="#005691" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <filter id="filter0_d_559_31" x="0.768799" y="0.583344" width="39.4624" height="42.8333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_559_31" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_559_31" result="shape" />
            </filter>
          </defs>
        </svg>

      </span>
    );
  }

  if (videoMuted) {
    videoControl = (
      <span className={`iconContainer 
     `} onClick={() => toggleMuteVideo()}>
        <svg style={{ paddingTop: '5px', transform: 'scale(1.55)' }} className="iconAlternative" alt="Resume video" xmlns="http://www.w3.org/2000/svg" width="37" height="30" viewBox="0 0 49 46" fill="none">
          <g filter="url(#filter0_d_563_43)">
            <g clip-path="url(#clip0_563_43)">
              <path d="M25.4054 32.3317H14.6087C9.21038 32.3317 7.41663 29.0067 7.41663 25.6658V12.3342C7.41663 7.33083 9.21038 5.66833 14.6087 5.66833H25.4054C30.8037 5.66833 32.5975 7.33083 32.5975 12.3342V25.6658C32.5975 30.6692 30.7866 32.3317 25.4054 32.3317V32.3317Z" fill="#FF0000" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M37.3467 27.075L32.5975 23.9875V13.9967L37.3467 10.9092C39.67 9.40503 41.5834 10.3234 41.5834 12.9675V25.0325C41.5834 27.6767 39.67 28.595 37.3467 27.075V27.075ZM23.6459 17.4167C24.3255 17.4167 24.9773 17.1665 25.4578 16.7211C25.9384 16.2757 26.2084 15.6716 26.2084 15.0417C26.2084 14.4118 25.9384 13.8077 25.4578 13.3623C24.9773 12.9169 24.3255 12.6667 23.6459 12.6667C22.9663 12.6667 22.3145 12.9169 21.8339 13.3623C21.3534 13.8077 21.0834 14.4118 21.0834 15.0417C21.0834 15.6716 21.3534 16.2757 21.8339 16.7211C22.3145 17.1665 22.9663 17.4167 23.6459 17.4167Z" fill="#FF0000" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="7.5088" y1="33.5743" x2="33.5088" y2="3.57429" stroke="black" stroke-width="1.3" />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_563_43" x="0" y="0" width="49" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_563_43" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_563_43" result="shape" />
            </filter>
            <clipPath id="clip0_563_43">
              <rect width="41" height="38" fill="white" transform="translate(4)" />
            </clipPath>
          </defs>
        </svg>
      </span>
    );
  } else {
    videoControl = (
      <span className={`iconContainer 
       `} onClick={() => toggleMuteVideo()}>
        <svg style={{ paddingTop: '3px' }}
          className="iconBasic" alt="Stop video" xmlns="http://www.w3.org/2000/svg" width="37" height="30" viewBox="0 0 37 30" fill="none">

          <path d="M19.4055 28.3317H8.60883C3.2105 28.3317 1.41675 25.0067 1.41675 21.6658V8.33417C1.41675 3.33083 3.2105 1.66833 8.60883 1.66833H19.4055C24.8038 1.66833 26.5976 3.33083 26.5976 8.33417V21.6658C26.5976 26.6692 24.7867 28.3317 19.4055 28.3317Z" fill="#00cc00" stroke="#005691" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M31.3466 23.075L26.5974 19.9875V9.99666L31.3466 6.90916C33.6699 5.40499 35.5833 6.32333 35.5833 8.96749V21.0325C35.5833 23.6767 33.6699 24.595 31.3466 23.075V23.075ZM17.6458 13.4167C18.3254 13.4167 18.9772 13.1664 19.4577 12.721C19.9383 12.2756 20.2083 11.6716 20.2083 11.0417C20.2083 10.4118 19.9383 9.80768 19.4577 9.36228C18.9772 8.91688 18.3254 8.66666 17.6458 8.66666C16.9661 8.66666 16.3144 8.91688 15.8338 9.36228C15.3532 9.80768 15.0833 10.4118 15.0833 11.0417C15.0833 11.6716 15.3532 12.2756 15.8338 12.721C16.3144 13.1664 16.9661 13.4167 17.6458 13.4167Z" fill="#00cc00" stroke="#005691" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />

        </svg>
      </span>
    );
  }

  screenShare = (
    <span className={`iconContainer 
     `} onClick={() => shareScreen()}>
      <FaLaptop className="iconBasic" alt="Share screen" />
    </span>
  );
  if (isMobileDevice() || isScreenSharing) {
    screenShare = <></>;
  }
  if (isOnline) {
    hangUp = (
      <span className={`iconContainer 
      `} onClick={() => nextUser()}>
        <FaPhone className="iconAlternative" alt="End call" />
      </span>
    );
  }
  if (isFullScreen) {
    fullscreenButton = (
      <span
        className={`iconContainer 
         `}
        onClick={() => {
          setFullscreen(false);
        }}
      >
        <FaCompressArrowsAlt className="iconAlternative" alt="fullscreen" />
      </span>
    );
  } else {
    fullscreenButton = (
      <span
        className={`iconContainer 
         `}
        onClick={() => {
          setFullscreen(true);
        }}
      >   <svg className="iconBasic" alt="fullscreen" xmlns="http://www.w3.org/2000/svg" width="42" height="38" viewBox="0 0 42 38" fill="none">
          <path d="M29.4821 0.521231C29.3433 0.523552 29.2302 0.526001 29.1444 0.528519C29.2034 0.589291 29.2719 0.658444 29.3491 0.735081C29.6523 1.03583 30.0736 1.4353 30.5387 1.86021C30.5389 1.86034 30.539 1.86047 30.5392 1.8606L32.2449 3.41106L32.6384 3.76879L32.2571 4.13953L31.8485 4.53683C31.848 4.53727 31.8476 4.53771 31.8471 4.53816C31.6601 4.72209 30.5486 5.74122 29.1511 7.02249C28.7121 7.42498 28.2449 7.85335 27.7693 8.28983L27.7674 8.29157C26.7633 9.20347 25.8442 10.0553 25.1731 10.6912C24.8372 11.0096 24.5655 11.2719 24.3769 11.4599C24.3329 11.5038 24.2942 11.5429 24.2607 11.5771C24.2836 11.5991 24.3091 11.6235 24.3373 11.6503C24.476 11.782 24.6718 11.9649 24.9113 12.1861C25.3899 12.628 26.0386 13.2189 26.7429 13.8504L26.7429 13.8504L26.7443 13.8516C27.8435 14.8449 28.4823 15.4123 28.8795 15.7322C29.0795 15.8931 29.1985 15.9751 29.272 16.0162C29.2741 16.0173 29.2761 16.0185 29.2781 16.0195C29.2878 16.0138 29.2992 16.0069 29.3123 15.9985C29.4257 15.926 29.6076 15.7871 29.9131 15.5275C30.5192 15.0128 31.5407 14.0852 33.3397 12.4361C33.3397 12.4361 33.3398 12.436 33.3398 12.436L37.4167 8.69538L37.7501 8.38947L38.0877 8.69077L39.8153 10.2328L39.8175 10.2348C40.2868 10.6588 40.7307 11.041 41.0667 11.3154C41.2048 11.4283 41.3216 11.5204 41.4127 11.5888C41.4271 11.5009 41.4422 11.3367 41.4532 11.0245C41.4791 10.2852 41.4792 8.87495 41.4792 6.08436C41.4792 3.69788 41.4739 2.27467 41.4531 1.42796C41.4427 1.00728 41.4287 0.742519 41.4115 0.577127C41.2966 0.565347 41.1144 0.554103 40.8233 0.544941C40.0001 0.519039 38.4323 0.511848 35.3729 0.502348C33.6411 0.497705 32.0493 0.500126 30.8804 0.507278C30.2957 0.510857 29.8181 0.515612 29.4821 0.521231ZM24.1374 11.4555C24.1351 11.4529 24.1338 11.4515 24.1337 11.4514C24.1336 11.4513 24.1347 11.4526 24.1374 11.4555ZM41.3871 0.419088C41.387 0.419041 41.3874 0.420782 41.3886 0.424021C41.3877 0.420698 41.3871 0.41913 41.3871 0.419088Z" fill="#00cc00" stroke="#005691" />
          <path d="M8.67744 12.4711L8.67829 12.4719C9.78839 13.4749 10.8162 14.3917 11.5789 15.0607C11.9606 15.3955 12.2741 15.6667 12.4976 15.8551C12.6021 15.9432 12.6843 16.0109 12.7433 16.0579C12.7736 16.034 12.8101 16.0046 12.853 15.9694C12.999 15.8497 13.2037 15.6762 13.4533 15.4606C13.9518 15.0303 14.6206 14.44 15.3404 13.7943C16.4608 12.7869 17.099 12.2027 17.458 11.8404C17.5924 11.7046 17.6765 11.611 17.7286 11.5461C17.6448 11.4451 17.4967 11.2894 17.2402 11.0428C16.672 10.4965 15.6455 9.57351 13.8149 7.94337C13.8149 7.94332 13.8148 7.94327 13.8148 7.94322L9.67489 4.25993L9.25956 3.8904L9.67089 3.51642L11.3869 1.95624C11.3871 1.9561 11.3872 1.95596 11.3874 1.95581C11.8519 1.53148 12.2724 1.13029 12.5749 0.826771C12.6491 0.752324 12.7151 0.684835 12.7722 0.625112C12.6575 0.612935 12.4758 0.601747 12.1824 0.593335C11.3608 0.569786 9.79635 0.569725 6.70978 0.569725H6.70974C4.06956 0.56953 2.49255 0.574201 1.55328 0.593052C1.08196 0.602512 0.782619 0.615375 0.593816 0.63169C0.581061 0.632792 0.569023 0.633895 0.557674 0.63499C0.54724 0.735239 0.536955 0.889972 0.52874 1.12879C0.502761 1.88404 0.5 3.32874 0.5 6.16103C0.5 8.99331 0.502761 10.438 0.52874 11.1933C0.5363 11.413 0.545613 11.5616 0.555181 11.662C0.638215 11.5978 0.740134 11.5162 0.858188 11.4191C1.18704 11.1487 1.62369 10.773 2.08858 10.3578C2.55475 9.93657 2.99286 9.55268 3.32258 9.27287C3.48704 9.1333 3.62748 9.01712 3.73218 8.93445C3.78367 8.89379 3.83193 8.85694 3.87248 8.82849C3.89178 8.81495 3.91757 8.79746 3.94545 8.78139C3.95886 8.77366 3.982 8.76086 4.01092 8.74856C4.01133 8.74839 4.01181 8.74818 4.01236 8.74794C4.02891 8.74084 4.10845 8.70668 4.21376 8.70668C4.30098 8.70668 4.36624 8.72994 4.3854 8.73689C4.41323 8.74697 4.43462 8.7575 4.44624 8.76349C4.46982 8.77566 4.48812 8.7874 4.49675 8.79304C4.51574 8.80547 4.53286 8.81816 4.54416 8.82671C4.56867 8.84524 4.59801 8.86878 4.62915 8.89432C4.6928 8.94652 4.78107 9.02112 4.88958 9.11415C5.10741 9.30092 5.41573 9.56966 5.79097 9.89978C6.54185 10.5604 7.56507 11.4707 8.67744 12.4711ZM17.7978 11.6396C17.7985 11.641 17.7989 11.6417 17.7989 11.6417C17.799 11.6417 17.7986 11.641 17.7978 11.6396ZM0.398366 0.657857C0.398437 0.657888 0.399971 0.657506 0.402751 0.656614C0.399684 0.657379 0.398294 0.657825 0.398366 0.657857Z" fill="#00cc00" stroke="#005691" />
          <path d="M4.61577 29.326L4.28136 29.6328L3.94369 29.3296L2.2161 27.7783L2.21606 27.7782C1.35303 27.0031 0.896434 26.6151 0.628004 26.4488C0.609508 26.5939 0.593954 26.8328 0.582434 27.2339C0.559009 28.0495 0.553711 29.4641 0.553711 31.9559C0.553711 34.3327 0.558994 35.7512 0.579862 36.5956C0.59021 37.0143 0.604142 37.2783 0.621299 37.4434C0.738119 37.455 0.923746 37.4658 1.22123 37.4741C2.06031 37.4976 3.66258 37.5 6.79564 37.5C9.92869 37.5 11.531 37.4976 12.37 37.4741C12.5807 37.4682 12.7353 37.4611 12.849 37.4533C12.7998 37.4032 12.7448 37.3481 12.6845 37.2885C12.3815 36.9891 11.9605 36.5921 11.4958 36.1722L11.4958 36.1722L11.4935 36.1702L9.7972 34.6185L9.41286 34.2669L9.77985 33.8973L10.4211 33.2514C10.4213 33.2512 10.4216 33.2509 10.4218 33.2507C10.7838 32.8839 12.6509 31.1689 14.5609 29.4431L14.5616 29.4425C16.0815 28.074 16.9438 27.2875 17.4267 26.8127C17.6383 26.6046 17.7632 26.4697 17.8357 26.3803C17.7841 26.3159 17.7005 26.2226 17.5664 26.0868C17.2072 25.7232 16.5662 25.1343 15.4352 24.1124C14.3209 23.1055 13.6687 22.5284 13.2634 22.2025C13.0594 22.0385 12.9367 21.9536 12.8607 21.9106C12.8594 21.9098 12.8581 21.9091 12.8568 21.9084C12.8472 21.9141 12.8361 21.9209 12.8234 21.929C12.708 22.0032 12.5232 22.1447 12.2137 22.4078C11.5997 22.9298 10.565 23.8694 8.7451 25.5376C8.74505 25.5376 8.74499 25.5377 8.74494 25.5377L4.61577 29.326ZM0.645841 37.6022C0.645881 37.6021 0.645422 37.6004 0.644344 37.5973C0.645262 37.6007 0.645801 37.6023 0.645841 37.6022Z" fill="#00cc00" stroke="#005691" />
          <path d="M24.1271 26.2826C24.1271 26.2826 24.1274 26.2834 24.1283 26.285C24.1276 26.2834 24.1271 26.2826 24.1271 26.2826ZM24.4734 26.0838C24.3389 26.2203 24.2537 26.3154 24.2003 26.3818C24.2866 26.4856 24.4386 26.645 24.7005 26.8966C25.2781 27.4513 26.3179 28.3863 28.1643 30.0307C28.1643 30.0308 28.1644 30.0308 28.1644 30.0309L32.357 33.7618L32.771 34.1302L32.3621 34.5043L30.6555 36.0652L30.6555 36.0652L30.6532 36.0673C30.2057 36.4717 29.8676 36.7826 29.6173 37.0268C29.4628 37.1775 29.3498 37.2953 29.2685 37.3877C29.4386 37.4035 29.7009 37.4163 30.1124 37.426C31.0177 37.4472 32.5856 37.452 35.3427 37.452C37.8505 37.452 39.4259 37.4448 40.392 37.4258C40.8763 37.4163 41.1991 37.404 41.4068 37.3889C41.4198 37.388 41.4321 37.387 41.4439 37.3861C41.4547 37.2742 41.4648 37.1058 41.4729 36.852C41.4975 36.0732 41.5002 34.6203 41.5002 31.8599C41.5002 29.1192 41.4948 27.6659 41.4689 26.8827C41.4614 26.6586 41.4525 26.4991 41.4429 26.3854C41.3654 26.4462 41.2735 26.5204 41.1693 26.6065C40.8379 26.8804 40.3986 27.2609 39.9341 27.6807L39.9317 27.6829L38.2144 29.2152L37.8887 29.5058L37.5568 29.2223L36.2091 28.0711C36.209 28.0711 36.209 28.0711 36.209 28.0711C35.4652 27.4377 33.5751 25.7581 32.0053 24.3397L32.0045 24.339C30.7685 23.2175 30.0578 22.5828 29.6225 22.2276C29.4032 22.0487 29.2734 21.9572 29.1934 21.9111C29.1879 21.9079 29.1829 21.9051 29.1783 21.9026C29.1751 21.9043 29.1718 21.9062 29.1682 21.9082C29.095 21.9491 28.9754 22.0316 28.7726 22.1953C28.3698 22.5203 27.7178 23.0999 26.5869 24.1217C25.4723 25.1288 24.8337 25.718 24.4734 26.0838ZM29.108 37.6033C29.1081 37.6033 29.109 37.6015 29.1102 37.5981C29.1085 37.6017 29.1079 37.6034 29.108 37.6033ZM29.0485 37.342C29.046 37.3395 29.0444 37.3383 29.0443 37.3383C29.0442 37.3383 29.0454 37.3395 29.0485 37.342ZM41.6413 37.3619C41.6411 37.3618 41.6378 37.3625 41.6321 37.3642C41.6386 37.3628 41.6415 37.362 41.6413 37.3619Z" fill="#00cc00" stroke="#005691" />
        </svg>
      </span>
    );
  }

  const handleDragStart = (e) => e.preventDefault()
  const filterOptions = [
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('none')
    }} id='bgInvertedImages'
      className={`filter-image  ${filter == 'none' && 'opacity'}`} height={55} width={55} src='/assets/noSign.png' />
    ,

    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('inverted')
    }}
      className={`filter-image  ${filter == 'inverted' && 'opacity'}`} height={55} width={55} src='/assets/inveted-icon.png' />
    ,

    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('laCasaMask')
    }}
      className={`filter-image  ${filter == 'laCasaMask' && 'opacity'}`} height={55} width={55} src='/assets/laCasaMask.jpg' />
    ,

    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('AnoymnMask')
    }}
      className={`filter-image  ${filter == 'AnoymnMask' && 'opacity'}`} height={55} width={55} src='/assets/anomny.png' />
    ,


    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('covidMask')
    }}
      className={`filter-image  ${filter == 'covidMask' && 'opacity'}`} height={55} width={55} src='/assets/covidMask.png' />
    ,

    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('driftMask')
    }}
      className={`filter-image  ${filter == 'driftMask' && 'opacity'}`} height={55}
      width={55} src='/assets/driftMaksIcon.png' />
    , <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('scaryMask')
    }}
      className={`filter-image  ${filter == 'scaryMask' && 'opacity'}`}
      height={55} width={55} src='/assets/scaryIconMask.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('heartEmoji')
    }}
      className={`filter-image  ${filter == 'heartEmoji' && 'opacity'}`}
      height={55} width={55} src='/assets/hearteyesIcon.jfif' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('bandana_mask')
    }}
      className={`filter-image  ${filter == 'bandana_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/bandanaIcon.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('welding_mask')
    }}
      className={`filter-image  ${filter == 'welding_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/welding_maskIcon.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('masquerade_cat_mask_3')
    }}
      className={`filter-image  ${filter == 'masquerade_cat_mask_3' && 'opacity'}`}
      height={55} width={55} src='/assets/masquerade_cat_mask_3icon.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('forest_mask')
    }}
      className={`filter-image  ${filter == 'forest_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/forestmaskIcon.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('clown_2_mask')
    }}
      className={`filter-image  ${filter == 'clown_2_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/clownIconMask.png' />,

    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('magicHat')
    }}
      className={`filter-image  ${filter == 'magicHat' && 'opacity'}`}
      height={55} width={55} src='/assets/noenglassesIcon.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('joker_mask')
    }}
      className={`filter-image  ${filter == 'joker_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/jokerMaskIcon.png' />,

    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('batman_mask')
    }}
      className={`filter-image  ${filter == 'batman_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/batmanMaskIcon.png' />,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('egypt_cat_mask')
    }}
      className={`filter-image  ${filter == 'egypt_cat_maskIcon' && 'opacity'}`}
      height={55} width={55} src='/assets/egypt_cat_maskIcon.png' />
    ,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('samurai_mask')
    }}
      className={`filter-image  ${filter == 'samurai_mask' && 'opacity'}`}
      height={55} width={55} src='/assets/samuraMaskIcon.png' />
    ,
    <img onDragStart={handleDragStart} role="presentation" onClick={(e) => {
      e.preventDefault()
      setFilter('bunnyEars')
    }}
      className={`filter-image  ${filter == 'bunnyEars' && 'opacity'}`}
      height={55} width={55} src='/assets/bunnyEars.png' />



  ]
  function getWidthBasedOnAuth() {
    if (userAuthPrefernce === 'phoneNumberLogin') {
      return 26
    } else if (userAuthPrefernce === 'loginUsers') {
      return userAuthPrefernce.length + 4
    } else {
      return userAuthPrefernce.length + 1
    }
  }
  let landingHTML = (
    <>
      <Navigation setisDashboard={setisDashboard} isDashboard={isDashboard} online={users.length} />
      <main>
        <div className="mainContainer">
          {!isShowDesktopChatBox &&
            <>
              {isOnline && <p className="alertText" style={{ marginTop: '2rem' }}>Connected!</p>}
              {isOnline && userGame == 'ticTak' ?
                <TicTak isX={GameData?.isX} sendBoardSocket={sendBoardSocket}
                  passedXIndex={passedXIndex} setPassedXIndex={setPassedXIndex} /> : null}
            </>
          }
          {searchingPartner && !isOnline ? <p className="alertText">finding a stranger<span id='wait'></span>
          </p> : null}
          {isSendRequst && !isMobile ?
            <div id='addFriendCont'>
              <p className="friendStatusText alertText">
                friends request has been sent ({friendRequestStatus})
              </p>
            </div> : null
          }
          {isReciveRequst && isAceptedFriends === undefined && !isMobile ?
            <>
              <div id='addFriendCont' >
                <div className="reciveRequest" style={{ zIndex: 100000000, position: 'absolute' }} >
                  <p>wanna be friends?</p>
                  <div className='handleFriendsRequestButtonsCont'>
                    <button className='handleFriendsRequestButtons noButton' onClick={() => sendIsAceptedFriend(false)}>no</button>
                    <button className='handleFriendsRequestButtons' onClick={() => sendIsAceptedFriend(true)}>yes</button>
                  </div>
                </div>
              </div>
            </> : null
          }
          {(
            <div>
              {!isStarted && <div>
                <p className='enjoyInstant'>Click Connect Chat Play </p>
                <div className="flexCenterMobile">
                  <ChooseGame userGame={userGame} setUserGame={setUserGame} />
                </div>

                <div className="startAndSelectGenderCont">

                  {!isMobile && <button onClick={() => nextUser()} className="StartButton">Start</button>}

                  {isMobile && !isStarted1Mobile && <button onClick={() => {
                    setisStarted1Mobile(true)
                  }} className="StartButton">Start</button>}

                </div>

              </div>
              }

              {isStarted &&
                <>
                  {isOnline && userGame != 'no-game' ?
                    <>
                      {!isShowDesktopChatBox ?
                        <>
                          <svg className='chatOpener chatOpenerDesktop scaler' onClick={() => setisShowDesktopChatBox(!isShowDesktopChatBox)}
                            style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10000000000000', cursor: 'pointer' }}
                            xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="red">
                            <path d="M14.875 33.25H14C7 33.25 3.5 31.5 3.5 22.75V14C3.5 7 7 3.5 14 3.5H28C35 3.5 38.5 7 38.5 14V22.75C38.5 29.75 35 33.25 28 33.25H27.125C26.5825 33.25 26.0575 33.5125 25.725 33.95L23.1 37.45C21.945 38.99 20.055 38.99 18.9 37.45L16.275 33.95C15.995 33.565 15.3475 33.25 14.875 33.25Z" fill="#005691" stroke="#005691" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M27.993 19.25H28.0105M20.9912 19.25H21.0087M13.9912 19.25H14.0052" stroke="#EEEEEE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />

                            <line x1="-2" y1="-2" x2="40" y2="40" stroke="red" stroke-width="3" />
                          </svg>
                          {isOnline && !isFullScreen && numberOfUnreadMessagesDesktop > 0 ? <span className='numberOfMessages'>{numberOfUnreadMessagesDesktop}</span> : null}
                        </>
                        :
                        <svg className='chatOpener chatOpenerDesktop scaler' onClick={() => setisShowDesktopChatBox(!isShowDesktopChatBox)}
                          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10000000000000', cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                          <path d="M14.875 33.25H14C7 33.25 3.5 31.5 3.5 22.75V14C3.5 7 7 3.5 14 3.5H28C35 3.5 38.5 7 38.5 14V22.75C38.5 29.75 35 33.25 28 33.25H27.125C26.5825 33.25 26.0575 33.5125 25.725 33.95L23.1 37.45C21.945 38.99 20.055 38.99 18.9 37.45L16.275 33.95C15.995 33.565 15.3475 33.25 14.875 33.25Z" fill="#005691" stroke="#005691" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M27.993 19.25H28.0105M20.9912 19.25H21.0087M13.9912 19.25H14.0052" stroke="#EEEEEE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      }
                    </>
                    : null}

                  {isOnline && userGame == 'chess' && !isMobile && !isShowDesktopChatBox
                    ? <MyChessBoard isWhite={isWhite} passedMove={passedMove} sendMoveSocket={sendMoveSocket} /> : null}
                  {!isMobile && isShowDesktopChatBox ? <Chat isOnline={isOnline} messages={messages} /> : null}
                  <div className="inputContainer">
                    <form style={{ background: 'white' }} onSubmit={(e) => sendMessage(e)}>
                      <div className='whitebgInput'></div>
                      <input
                        className="chatInput"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Write something..."
                      />

                      <div className='EmojiPickerCont' style={{
                        position: 'absolute', zIndex: '1000', top: '1rem', display: `${isEmojiPickerCont ? 'block' : 'none'}`
                      }}>

                      </div>
                      <button className="chatButton" type="submit">
                        <svg style={{
                          position: 'absolute',
                          top: '0.8rem',
                          right: '0.5rem'
                        }} xmlns="http://www.w3.org/2000/svg" width="44" height="38" viewBox="0 0 54 46" fill="none">
                          <path d="M53.8379 1.30494C53.8055 1.25536 53.7838 1.20564 53.7515 1.16864C53.449 0.746882 52.9522 0.61045 52.5201 0.809064L0.695531 23.4542C0.241927 23.6524 -0.0389188 24.1612 0.00438498 24.7188C0.0368342 25.2647 0.393205 25.7233 0.868403 25.8228L15.0397 28.9851L18.075 44.2267L18.0857 44.3137C18.1073 44.4126 18.1289 44.4996 18.1721 44.5862C18.1937 44.6359 18.2261 44.6979 18.2585 44.7476C18.3016 44.822 18.3557 44.8842 18.3989 44.9459C18.5393 45.0948 18.7121 45.2063 18.8957 45.2438C18.9174 45.256 18.9497 45.2683 18.9714 45.2683C19.0255 45.2683 19.0903 45.2808 19.1442 45.2808C19.2198 45.2808 19.2846 45.2683 19.3601 45.256C19.3926 45.2438 19.4249 45.2438 19.4681 45.219C19.479 45.219 19.4897 45.219 19.5006 45.2064C19.5653 45.1816 19.6194 45.1571 19.6734 45.1197H19.6843C19.7058 45.0949 19.7383 45.0824 19.7598 45.0576L34.6224 33.0655L43.0258 34.8884C43.0906 34.9009 43.1663 34.9009 43.2311 34.9009C43.6847 34.9009 44.0951 34.5784 44.2464 34.0824L53.9352 2.39627C53.9567 2.33448 53.9676 2.27243 53.9783 2.21038C53.9999 2.12367 53.9999 2.02449 53.9999 1.93752C53.9999 1.71424 53.946 1.49083 53.8379 1.30494ZM25.6034 29.0969C25.5386 29.1587 25.4738 29.2455 25.4413 29.3325C25.4198 29.345 25.4089 29.3573 25.3982 29.3821L19.587 40.717L17.1676 28.5262L44.0196 9.66366L25.6034 29.0969Z" fill="#4CB1F7" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </>
              }
            </div>

          )}
        </div>
        <Footer />
      </main>
    </>
  );
  return (
    <>

      <dialog style={{ border: 'none', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', background: 'none' }} id='firefoxDialog'>
        <div style={{ marginInline: '4px', width: '400px', maxWidth: '400px', background: 'white', padding: '1rem' }}>
          <p>To ensure that you could login/sign-up on our website,
            we kindly request that you disable enhanced tracking protection in Firefox.</p>
          <form>
            <center>
              <button id='okfirefoxDialog'>OK</button>
            </center>
          </form>
        </div>
      </dialog>
      {isMobile ? <Chat isOnline={false} messages={messages} /> : null}




      {isMobile && isOnline && !IsopenChat && !isOpenGameMobile ? <svg style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10000000000000', cursor: 'pointer' }} className='chatOpener scaler' onClick={() => setIsopenChat(!IsopenChat)} xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
        <path d="M14.875 33.25H14C7 33.25 3.5 31.5 3.5 22.75V14C3.5 7 7 3.5 14 3.5H28C35 3.5 38.5 7 38.5 14V22.75C38.5 29.75 35 33.25 28 33.25H27.125C26.5825 33.25 26.0575 33.5125 25.725 33.95L23.1 37.45C21.945 38.99 20.055 38.99 18.9 37.45L16.275 33.95C15.995 33.565 15.3475 33.25 14.875 33.25Z" fill="#005691" stroke="#005691" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M27.993 19.25H28.0105M20.9912 19.25H21.0087M13.9912 19.25H14.0052" stroke="#EEEEEE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg> : null}
      {isMobile && isOnline && IsopenChat ? <svg className='chatOpener scaler'
        onClick={() => setIsopenChat(false)} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10000000000000', cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="29" height="34" viewBox="0 0 29 34" fill="none">
        <path d="M0.931818 18.2727V15.3636L28.75 0.022728V4.47727L5.93182 16.7955L6.15909 16.3864V17.25L5.93182 16.8409L28.75 29.1591V33.6136L0.931818 18.2727Z" fill="#005691" />
      </svg>
        : null}
      {isMobile && isOnline && !isOpenGameMobile && userGame != 'no-game' ?
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setisOpenGameMobile(true)} fill="#005691" style={{ fill: '#005691', position: 'absolute', top: '-16px', left: '59px', zIndex: '10000000000000', cursor: 'pointer' }}
          width="50" height="82.382" viewBox="0 8.808 100 82.382"><path d="M92.165 46.646c-2.394-2.395-5.184-4.274-8.291-5.59-3.223-1.362-6.64-2.053-10.161-2.053H26.095c-3.52 0-6.938.69-10.159 2.053-3.108 1.315-5.898 3.195-8.292 5.59-2.395 2.394-4.274 5.184-5.59 8.292C.692 58.159 0 61.578 0 65.096c0 3.522.69 6.938 2.054 10.159 1.315 3.108 3.195 5.896 5.59 8.293 2.394 2.394 5.184 4.273 8.292 5.588 3.222 1.361 6.639 2.055 10.159 2.055 4.114 0 8.214-.983 11.858-2.847 2.447-1.25 4.7-2.9 6.645-4.854h10.61c1.946 1.954 4.2 3.604 6.646 4.854 3.645 1.863 7.745 2.847 11.857 2.847 3.521 0 6.938-.692 10.16-2.055 3.107-1.314 5.896-3.194 8.29-5.588 2.395-2.396 4.276-5.185 5.59-8.293 1.362-3.221 2.053-6.638 2.053-10.159 0-3.52-.689-6.937-2.053-10.158-1.311-3.107-3.191-5.897-5.586-8.292zM73.713 84.348c-6.296 0-11.888-3.025-15.4-7.701H41.495c-3.512 4.676-9.103 7.701-15.4 7.701-10.631 0-19.249-8.617-19.249-19.25 0-10.631 8.619-19.25 19.249-19.25h47.618c10.633 0 19.252 8.619 19.252 19.25-.002 10.632-8.619 19.25-19.252 19.25z" />
          <circle cx="73.713" cy="72.797" r="3.849" />
          <circle cx="81.414" cy="65.097" r="3.85" /><circle cx="66.015" cy="65.097" r="3.85" /><circle cx="73.713" cy="57.398" r="3.849" /><path d="M35.72 61.247h-5.775v-5.773c0-1.062-.862-1.925-1.924-1.925h-3.85c-1.063 0-1.925.862-1.925 1.925v5.773h-5.774c-1.063 0-1.924.862-1.924 1.926v3.85c0 1.063.862 1.926 1.924 1.926h5.774v5.773c0 1.064.862 1.925 1.925 1.925h3.85c1.063 0 1.924-.86 1.924-1.925v-5.773h5.775c1.063 0 1.925-.862 1.925-1.926v-3.85c0-1.064-.863-1.926-1.925-1.926zm28.332-34.87h18.379c9.687 0 17.569-7.881 17.569-17.569h-6.845c0 5.914-4.812 10.725-10.725 10.725H64.052c-9.688 0-17.569 7.881-17.569 17.569h6.844c-.001-5.913 4.812-10.725 10.725-10.725z" /></svg>
        : null
      }
      {isMobile && isOnline && isOpenGameMobile ? <svg className='chatOpener scaler'
        onClick={() => setisOpenGameMobile(false)} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10000000000000', cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="29" height="34" viewBox="0 0 29 34" fill="none">
        <path d="M0.931818 18.2727V15.3636L28.75 0.022728V4.47727L5.93182 16.7955L6.15909 16.3864V17.25L5.93182 16.8409L28.75 29.1591V33.6136L0.931818 18.2727Z" fill="#005691" />
      </svg>
        : null}



      {isMobile && isOnline && !isFullScreen && numberOfUnreadMessages > 0 ? <span className='numberOfMessages'>{numberOfUnreadMessages}</span> : null}
      {!isStarted &&
        <div className="onlineText">
          {" "}
          <FaUser className="onlineIcon" alt="users" />
          {users.length} {" "}
          online
        </div>}
      {isStarted &&
        <div className="buttonsCont">
          <button id='stopButton' onClick={(e) => stop(e)} className="button">stop</button>
          <button onClick={() => nextUser()} className="button">next</button>
        </div>
      }
      <input style={{ display: 'none' }} id='filterValue' type="text" value={filter} ref={filterValue} />

      <span className="callContainer">
        <div
          className={
            `videoContainer ${isSwaped ? 'userVideoContainer' : 'partnerVideoContainer'} 
          ${handleFullScreenSwap(true)}
          `

          }
        >

          {PartnerVideo}
          {isAbleToBeFriends && !isSendRequst && !isReciveRequst ? <div id='addFriendCont ' className="addFriendmainCont">
            <img src='/assets/addFriend-removebg.png' onClick={() => sendFriendRequst()} title='add friend' className='addFriendImg' height='35' width='35'
              alt='add friend Icon' />
          </div> : null
          }


        </div>
        {isReciveRequst && isAceptedFriends === undefined && isMobile ?
          <>
            <div id='addFriendCont' >
              <div className="reciveRequest" style={{ zIndex: 100000000, position: 'absolute' }} >
                <p>wanna be friends?</p>
                <div className='handleFriendsRequestButtonsCont'>
                  <button className='handleFriendsRequestButtons noButton' onClick={() => sendIsAceptedFriend(false)}>no</button>
                  <button className='handleFriendsRequestButtons' onClick={() => sendIsAceptedFriend(true)}>yes</button>
                </div>
              </div>
            </div>
          </> : null
        }
        <div
          className={
            `videoContainer ${isSwaped ? 'partnerVideoContainer' : 'userVideoContainer'}
            ${handleFullScreenSwap(false)}`
          }
        >
          {UserVideo}
          <h2 id='loadingFilters'>loading filters </h2>
        </div>
        <div className='startSearchingCont'>
          {isMobile && <p className='startSearching' style={{ fontSize: '1.5rem' }} >start searching for a stranger </p>}
          {isMobile && !isStarted && isStarted1Mobile && <button className='StartButton' onClick={() => nextUser()} style={{ display: 'block', padding: '1rem 2rem', fontSize: '1.5rem', width: '20rem', alignText: 'center' }} >Start searching</button>}
        </div>

        {!IsopenChat && !isOpenGameMobile ? <div
          className={
            "controlsContainer flex " + (isFullScreen ? "controlsFull" : "")
          }
        >
          {!ShowFilterOptions &&
            <>
              {audioControl}
              {videoControl}
              {/* {screenShare} */}
              {fullscreenButton}
            </>}

        </div> : null}
      </span>

      <div className={`${isFullScreen && 'gender-contFullSize'}`}>
        {isMobile && <> {searchingPartner && !isOnline ? <p className='alertText'>Finding a stranger
          <span id='waitMobile'></span>

        </p> : null}
          {isOnline && <p className="alertText">Connected!</p>
          }
          {isSendRequst &&
            <div id=''>
              <p style={{ fontSize: '18px', top: '80px' }} className=" alertText">
                friends request has been sent ({friendRequestStatus})
              </p>
            </div>
          }
        </>
        }
        <div id='gender-cont' className={`gender-cont ${isFullScreen && 'gender-contFullSize'}`}>
          <div className="chatFiltersCont">
            <h3 className='quickSettings'>quick settings</h3>
            {isMobile && isDashboard && <button onClick={() => setisGenderContopen(false)} className='closechatFiltersCont'>X</button>}
            {!innerWidth || innerWidth < 860 && !isDashboard && <div id='SettingsGoogleTranslate'
              style={{ position: 'static', fontSize: '1.5rem' }} className='mainGoogleTranslate'>
              <ChooseGame userGame={userGame} setUserGame={setUserGame} />
            </div>}

            <span style={{ zIndex: '300000', cursor: 'pointer' }} className='desktopDarkModeControls' onClick={() => setisDarkMode(!isDarkMode)}>
              {isDarkMode ?
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.0002 38.5417C28.5916 38.5417 32.036 37.115 34.5756 34.5754C37.1151 32.0359 38.5418 28.5915 38.5418 25C38.5418 21.4086 37.1151 17.9642 34.5756 15.4246C32.036 12.8851 28.5916 11.4584 25.0002 11.4584C21.4087 11.4584 17.9643 12.8851 15.4248 15.4246C12.8852 17.9642 11.4585 21.4086 11.4585 25C11.4585 28.5915 12.8852 32.0359 15.4248 34.5754C17.9643 37.115 21.4087 38.5417 25.0002 38.5417Z" fill="#F9B42E" stroke="#F9B42E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M39.8748 39.875L39.604 39.6041M39.604 10.3958L39.8748 10.125L39.604 10.3958ZM10.1248 39.875L10.3957 39.6041L10.1248 39.875ZM24.9998 4.33329V4.16663V4.33329ZM24.9998 45.8333V45.6666V45.8333ZM4.33317 25H4.1665H4.33317ZM45.8332 25H45.6665H45.8332ZM10.3957 10.3958L10.1248 10.125L10.3957 10.3958Z" stroke="#F9B42E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="47" viewBox="0 0 50 47" fill="none">
                  <g filter="url(#filter0_dd_496_121)">
                    <path d="M4.22919 22.875C4.97919 33.6042 14.0834 42.3334 24.9792 42.8125C32.6667 43.1459 39.5417 39.5625 43.6667 33.9167C45.375 31.6042 44.4584 30.0625 41.6042 30.5834C40.2084 30.8334 38.7709 30.9375 37.2709 30.875C27.0834 30.4584 18.75 21.9375 18.7084 11.875C18.6875 9.16671 19.25 6.60421 20.2709 4.27087C21.3959 1.68754 20.0417 0.458375 17.4375 1.56254C9.18752 5.04171 3.54169 13.3542 4.22919 22.875Z" fill="#BBDDDD" />
                    <path d="M4.22919 22.875C4.97919 33.6042 14.0834 42.3334 24.9792 42.8125C32.6667 43.1459 39.5417 39.5625 43.6667 33.9167C45.375 31.6042 44.4584 30.0625 41.6042 30.5834C40.2084 30.8334 38.7709 30.9375 37.2709 30.875C27.0834 30.4584 18.75 21.9375 18.7084 11.875C18.6875 9.16671 19.25 6.60421 20.2709 4.27087C21.3959 1.68754 20.0417 0.458375 17.4375 1.56254C9.18752 5.04171 3.54169 13.3542 4.22919 22.875Z" stroke="#27415D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_dd_496_121" x="-0.577393" y="0.406616" width="49.853" height="51.1774" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_496_121" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="effect1_dropShadow_496_121" result="effect2_dropShadow_496_121" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_496_121" result="shape" />
                    </filter>
                  </defs>
                </svg>}
            </span>
            <div id='genderPrefrenceCont'>
              <div>
                <p style={{ color: '#005691', display: 'block', margin: '0' }}>chat filters:</p>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path d="M17.5 17.5C19.4339 17.5 21.2885 16.7317 22.656 15.3643C24.0234 13.9968 24.7917 12.1422 24.7917 10.2083C24.7917 8.27442 24.0234 6.41976 22.656 5.05231C21.2885 3.68485 19.4339 2.91663 17.5 2.91663C15.5661 2.91663 13.7114 3.68485 12.344 5.05231C10.9765 6.41976 10.2083 8.27442 10.2083 10.2083C10.2083 12.1422 10.9765 13.9968 12.344 15.3643C13.7114 16.7317 15.5661 17.5 17.5 17.5ZM4.9729 32.0833C4.9729 26.4395 10.5875 21.875 17.5 21.875L4.9729 32.0833ZM26.5417 31.2083C27.7793 31.2083 28.9663 30.7166 29.8415 29.8415C30.7167 28.9663 31.2083 27.7793 31.2083 26.5416C31.2083 25.304 30.7167 24.117 29.8415 23.2418C28.9663 22.3666 27.7793 21.875 26.5417 21.875C25.304 21.875 24.117 22.3666 23.2418 23.2418C22.3666 24.117 21.875 25.304 21.875 26.5416C21.875 27.7793 22.3666 28.9663 23.2418 29.8415C24.117 30.7166 25.304 31.2083 26.5417 31.2083ZM32.0833 32.0833L30.625 30.625L32.0833 32.0833Z" fill={isDarkMode ? '#E4EDDC' : '#005691'} />
                    <path d="M4.9729 32.0833C4.9729 26.4395 10.5875 21.875 17.5 21.875M32.0833 32.0833L30.625 30.625M17.5 17.5C19.4339 17.5 21.2885 16.7317 22.656 15.3643C24.0234 13.9968 24.7917 12.1422 24.7917 10.2083C24.7917 8.27442 24.0234 6.41976 22.656 5.05231C21.2885 3.68485 19.4339 2.91663 17.5 2.91663C15.5661 2.91663 13.7114 3.68485 12.344 5.05231C10.9765 6.41976 10.2083 8.27442 10.2083 10.2083C10.2083 12.1422 10.9765 13.9968 12.344 15.3643C13.7114 16.7317 15.5661 17.5 17.5 17.5ZM26.5417 31.2083C27.7793 31.2083 28.9663 30.7166 29.8415 29.8415C30.7167 28.9663 31.2083 27.7793 31.2083 26.5416C31.2083 25.304 30.7167 24.117 29.8415 23.2418C28.9663 22.3666 27.7793 21.875 26.5417 21.875C25.304 21.875 24.117 22.3666 23.2418 23.2418C22.3666 24.117 21.875 25.304 21.875 26.5416C21.875 27.7793 22.3666 28.9663 23.2418 29.8415C24.117 30.7166 25.304 31.2083 26.5417 31.2083Z" stroke={isDarkMode ? '#E4EDDC' : '#005691'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="26.5" cy="26.5" r="5.5" fill={isDarkMode ? '#E4EDDC' : '#00cc00'} />
                  </svg>
                  <select value={userAuthPrefernce} style={{
                    visibility: 'hidden', position: 'absolute', fontSize: '1.5rem'
                    , width: `${userAuthPrefernce.length}ch !important`
                  }} id="width_tmp_select">
                    <option id="width_tmp_option"></option>
                  </select>
                  <select id='selectGenderPrefrence' style={{ width: `${getWidthBasedOnAuth()}ch` }} value={userAuthPrefernce} onChange={(e) => e.preventDefault()} onInput={(e) => {
                    e.preventDefault()
                    checkIfAllowed(e)
                  }}
                  >
                    <option className='genderOptions' selected value='allUsers'>all users</option>
                    <option className='genderOptions' value='loginUsers'>logged in users</option>
                    <option className='genderOptions' value='phoneNumberLogin'>phone number logged in users</option>
                  </select>
                </div>
                <input type="hidden" id='searchingPartner' />
                <div className="mobileDarkModeContrals">
                  <button className='radioDarkMode' onClick={() => setisDarkMode(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="47" viewBox="0 0 50 47" fill="none">
                      <g filter="url(#filter0_dd_496_121)">
                        <path d="M4.22919 22.875C4.97919 33.6042 14.0834 42.3334 24.9792 42.8125C32.6667 43.1459 39.5417 39.5625 43.6667 33.9167C45.375 31.6042 44.4584 30.0625 41.6042 30.5834C40.2084 30.8334 38.7709 30.9375 37.2709 30.875C27.0834 30.4584 18.75 21.9375 18.7084 11.875C18.6875 9.16671 19.25 6.60421 20.2709 4.27087C21.3959 1.68754 20.0417 0.458375 17.4375 1.56254C9.18752 5.04171 3.54169 13.3542 4.22919 22.875Z" fill="#BBDDDD" />
                        <path d="M4.22919 22.875C4.97919 33.6042 14.0834 42.3334 24.9792 42.8125C32.6667 43.1459 39.5417 39.5625 43.6667 33.9167C45.375 31.6042 44.4584 30.0625 41.6042 30.5834C40.2084 30.8334 38.7709 30.9375 37.2709 30.875C27.0834 30.4584 18.75 21.9375 18.7084 11.875C18.6875 9.16671 19.25 6.60421 20.2709 4.27087C21.3959 1.68754 20.0417 0.458375 17.4375 1.56254C9.18752 5.04171 3.54169 13.3542 4.22919 22.875Z" stroke="#27415D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <filter id="filter0_dd_496_121" x="-0.577393" y="0.406616" width="49.853" height="51.1774" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_496_121" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                          <feBlend mode="normal" in2="effect1_dropShadow_496_121" result="effect2_dropShadow_496_121" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_496_121" result="shape" />
                        </filter>
                      </defs>
                    </svg>
                  </button>
                  <button className='radioDarkMode' onClick={() => setisDarkMode(false)}>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.0002 38.5417C28.5916 38.5417 32.036 37.115 34.5756 34.5754C37.1151 32.0359 38.5418 28.5915 38.5418 25C38.5418 21.4086 37.1151 17.9642 34.5756 15.4246C32.036 12.8851 28.5916 11.4584 25.0002 11.4584C21.4087 11.4584 17.9643 12.8851 15.4248 15.4246C12.8852 17.9642 11.4585 21.4086 11.4585 25C11.4585 28.5915 12.8852 32.0359 15.4248 34.5754C17.9643 37.115 21.4087 38.5417 25.0002 38.5417Z" fill="#F9B42E" stroke="#F9B42E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M39.8748 39.875L39.604 39.6041M39.604 10.3958L39.8748 10.125L39.604 10.3958ZM10.1248 39.875L10.3957 39.6041L10.1248 39.875ZM24.9998 4.33329V4.16663V4.33329ZM24.9998 45.8333V45.6666V45.8333ZM4.33317 25H4.1665H4.33317ZM45.8332 25H45.6665H45.8332ZM10.3957 10.3958L10.1248 10.125L10.3957 10.3958Z" stroke="#F9B42E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isDashboard && <button className="openerForCont scaler" onClick={() => setisGenderContopen(!isGenderContopen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <g clip-path="url(#clip0_507_143)">
              <g filter="url(#filter0_dd_507_143)">
                <path d="M3.33333 21.4667V18.5333C3.33333 16.8 4.75 15.3667 6.5 15.3667C9.51667 15.3667 10.75 13.2333 9.23333 10.6167C8.36667 9.11666 8.88333 7.16666 10.4 6.3L13.2833 4.65C14.6 3.86666 16.3 4.33333 17.0833 5.65L17.2667 5.96666C18.7667 8.58333 21.2333 8.58333 22.75 5.96666L22.9333 5.65C23.7167 4.33333 25.4167 3.86666 26.7333 4.65L29.6167 6.3C31.1333 7.16666 31.65 9.11666 30.7833 10.6167C29.2667 13.2333 30.5 15.3667 33.5167 15.3667C35.25 15.3667 36.6833 16.7833 36.6833 18.5333V21.4667C36.6833 23.2 35.2667 24.6333 33.5167 24.6333C30.5 24.6333 29.2667 26.7667 30.7833 29.3833C31.65 30.9 31.1333 32.8333 29.6167 33.7L26.7333 35.35C25.4167 36.1333 23.7167 35.6667 22.9333 34.35L22.75 34.0333C21.25 31.4167 18.7833 31.4167 17.2667 34.0333L17.0833 34.35C16.3 35.6667 14.6 36.1333 13.2833 35.35L10.4 33.7C9.6735 33.2817 9.14263 32.5922 8.92391 31.7829C8.70518 30.9737 8.81646 30.1107 9.23333 29.3833C10.75 26.7667 9.51667 24.6333 6.5 24.6333C4.75 24.6333 3.33333 23.2 3.33333 21.4667Z" fill="#005691" />
                <path d="M3.33333 21.4667V18.5333C3.33333 16.8 4.75 15.3667 6.5 15.3667C9.51667 15.3667 10.75 13.2333 9.23333 10.6167C8.36667 9.11666 8.88333 7.16666 10.4 6.3L13.2833 4.65C14.6 3.86666 16.3 4.33333 17.0833 5.65L17.2667 5.96666C18.7667 8.58333 21.2333 8.58333 22.75 5.96666L22.9333 5.65C23.7167 4.33333 25.4167 3.86666 26.7333 4.65L29.6167 6.3C31.1333 7.16666 31.65 9.11666 30.7833 10.6167C29.2667 13.2333 30.5 15.3667 33.5167 15.3667C35.25 15.3667 36.6833 16.7833 36.6833 18.5333V21.4667C36.6833 23.2 35.2667 24.6333 33.5167 24.6333C30.5 24.6333 29.2667 26.7667 30.7833 29.3833C31.65 30.9 31.1333 32.8333 29.6167 33.7L26.7333 35.35C25.4167 36.1333 23.7167 35.6667 22.9333 34.35L22.75 34.0333C21.25 31.4167 18.7833 31.4167 17.2667 34.0333L17.0833 34.35C16.3 35.6667 14.6 36.1333 13.2833 35.35L10.4 33.7C9.6735 33.2817 9.14263 32.5922 8.92391 31.7829C8.70518 30.9737 8.81646 30.1107 9.23333 29.3833C10.75 26.7667 9.51667 24.6333 6.5 24.6333C4.75 24.6333 3.33333 23.2 3.33333 21.4667Z" stroke="#005691" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <path d="M20 25C21.3261 25 22.5979 24.4732 23.5355 23.5355C24.4732 22.5979 25 21.3261 25 20C25 18.6739 24.4732 17.4021 23.5355 16.4645C22.5979 15.5268 21.3261 15 20 15C18.6739 15 17.4021 15.5268 16.4645 16.4645C15.5268 17.4021 15 18.6739 15 20C15 21.3261 15.5268 22.5979 16.4645 23.5355C17.4021 24.4732 18.6739 25 20 25Z" fill="white" />
            </g>
            <defs>
              <filter id="filter0_dd_507_143" x="-1.41667" y="3.51782" width="42.85" height="40.9644" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_507_143" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="effect1_dropShadow_507_143" result="effect2_dropShadow_507_143" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_507_143" result="shape" />
              </filter>
              <clipPath id="clip0_507_143">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg> </button>}
      </div>
      {!isFullScreen && <span>{landingHTML}</span>}
      {isDarkMode && <DarkMode />}
      <>
        {isMobile && IsopenChat && <form onSubmit={(e) => sendMessage(e)}>
          <div className='whitebgInputMobile'></div>

          <input
            style={{ position: 'absolute', zIndex: '10000000', bottom: '1rem' }}
            className="chatInput"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write something..."
          />

          <div className='EmojiPickerCont' style={{
            position: 'absolute', zIndex: '100000', bottom: '80px', display: `${isEmojiPickerCont ? 'block' : 'none'}`
          }}>

          </div>
          <button
            style={{ position: 'absolute', zIndex: '10000000', bottom: '1rem' }} className="chatButton" type="submit">
            <svg style={{
              position: 'absolute',
              top: '0.8rem',
              right: '0.5rem'
            }} xmlns="http://www.w3.org/2000/svg" width="44" height="38" viewBox="0 0 54 46" fill="none">
              <path d="M53.8379 1.30494C53.8055 1.25536 53.7838 1.20564 53.7515 1.16864C53.449 0.746882 52.9522 0.61045 52.5201 0.809064L0.695531 23.4542C0.241927 23.6524 -0.0389188 24.1612 0.00438498 24.7188C0.0368342 25.2647 0.393205 25.7233 0.868403 25.8228L15.0397 28.9851L18.075 44.2267L18.0857 44.3137C18.1073 44.4126 18.1289 44.4996 18.1721 44.5862C18.1937 44.6359 18.2261 44.6979 18.2585 44.7476C18.3016 44.822 18.3557 44.8842 18.3989 44.9459C18.5393 45.0948 18.7121 45.2063 18.8957 45.2438C18.9174 45.256 18.9497 45.2683 18.9714 45.2683C19.0255 45.2683 19.0903 45.2808 19.1442 45.2808C19.2198 45.2808 19.2846 45.2683 19.3601 45.256C19.3926 45.2438 19.4249 45.2438 19.4681 45.219C19.479 45.219 19.4897 45.219 19.5006 45.2064C19.5653 45.1816 19.6194 45.1571 19.6734 45.1197H19.6843C19.7058 45.0949 19.7383 45.0824 19.7598 45.0576L34.6224 33.0655L43.0258 34.8884C43.0906 34.9009 43.1663 34.9009 43.2311 34.9009C43.6847 34.9009 44.0951 34.5784 44.2464 34.0824L53.9352 2.39627C53.9567 2.33448 53.9676 2.27243 53.9783 2.21038C53.9999 2.12367 53.9999 2.02449 53.9999 1.93752C53.9999 1.71424 53.946 1.49083 53.8379 1.30494ZM25.6034 29.0969C25.5386 29.1587 25.4738 29.2455 25.4413 29.3325C25.4198 29.345 25.4089 29.3573 25.3982 29.3821L19.587 40.717L17.1676 28.5262L44.0196 9.66366L25.6034 29.0969Z" fill="#4CB1F7" />
            </svg>
          </button>
        </form>}
        {isMobile && isOnline && userGame == 'ticTak' &&
          <div style={{ visibility: isOpenGameMobile ? 'visible' : 'hidden', zIndex: isOpenGameMobile ? 1000 : -1 }} className="fixedGameCont">
            <TicTak isX={GameData?.isX} sendBoardSocket={sendBoardSocket}
              passedXIndex={passedXIndex} setPassedXIndex={setPassedXIndex} />
          </div>
        }
        {isMobile && isOnline && userGame == 'chess' && <div style={{ visibility: isOpenGameMobile ? 'visible' : 'hidden', zIndex: isOpenGameMobile ? 1000 : -1 }} className="fixedGameCont fixedGameContChess">
          <MyChessBoard isWhite={isWhite} passedMove={passedMove} sendMoveSocket={sendMoveSocket} />
        </div>}
        <br />
        <input type="hidden" value={isFoundPartner} id='isFoundPartner' />
        <style jsx>{`
        *{
          max-width:100% !important;  
        }
        html,body{
          max-width:100vw !important;
          overflow:hidden !important
        }
        .navgation{
          left:0
        }
      .goog-logo-link{
      display:none
    }
                .mainGoogleTranslate{
                  max-height:40px;
                  display:flex;
                  align-items:center;
                  padding:3px !important;
                  margin:0 !important
                }
                @media screen and (max-width: 860px) { 
                  @media screen and (max-width: 500px) {

                    }
      .mainGoogleTranslate,.mainGoogleTranslate style{
      display:none
      }
                }
                .skiptranslate{
                  font-size:0rem !important;
                }
                .goog-te-combo{  
                  font-size:2rem;
                  padding:0 !important;
                  direction:ltr !important;
                  
                  background:white;
                  color:#005691;
                  display:block;
                }
                #google_translate_element{   
                }
        .buttonsCont{
          display:${isFullScreen && 'none'}
        }
        .mainContainer{
          background-color: rbg(0,0,0 0.5)
        }
        .cross-icon{
          z-index:300;
          right:${isFullScreen && '0'} ;
          bottom:${isFullScreen && '4rem'} ;
        }
      .filter-coursel-cont {
    max-width: ${isFullScreen ? '90vw' : '35vw'};
    min-height:4rem;
    }
        #filter-button-icon{ 
    } 
#selectGender{ 
    }
#selectGenderPrefrence::-ms-expand{
    color:#00cc00;
    float:left
}
#selectGenderPrefrence{
  
  border:none;
  outline:none;
}
#selectGenderPrefrence:hover{
  color:${userAuthPrefernce == 'anygender' && '#F89C12'};
 color:${userAuthPrefernce == 'male' && '#16b4DC'};
 color:${userAuthPrefernce == 'female' && 'red'};
}
.gender-cont{
  display:block;
    background:none;
 
}
.openerForCont{ 
  display:none
} 
.filter-coursel-cont{
  max-width:33vw;
  width:425px;
  position: absolute;   
top: 0;
  margin-left: 10px;
}
.filter-pagination-button{
        background: black;
    width: 2rem;
    height: 7rem;
    font-size: 2rem;
    color: beige;
    text-align: center;
    bottom: 0.5rem;
    position: absolute;
      }
      .EmojiPickerCont{
        left:1.3rem;
      }
      .EmojiPickerCont .epr-preview{
        display:none !important
      }
@media screen and (max-width: 860px) { 
  .goog-te-combo{
    font-size:1.5rem !important
  }
 .AgreeTextOnTerms{
  font-size:14px
 }
.openerForCont{ 
  display:block
} 
  #gender-cont{ 
    height:25rem;
    top:50vh;
    z-index:1000000000000;  
    position: absolute;   
  transform: translate(-50%, -50%);
    width:90vw;
    border:2px solid black;
    border-radius:35px;
    position:absolute;
    background:${isDarkMode ? '#111B2B' : 'white'}; 
    left:${isGenderContopen ? '50%' : '-1000%'}; 
  } 
  #gender-cont div{
    display:block !important;
  }
  #gender-cont .mobileDarkModeContrals{
    display:flex !important;
  }
  #gender-cont{
     back
  }
  #partner-filter-options{
    background-color: white;
    -webkit-backdrop-filter:blur(24px);
  }
}
.quickSettings{
  display:none
}
.mobileDarkModeContrals{
  display:none
}
.skiptranslate > span{
  display:none
}

.enjoyInstant{
    line-height:100%;
  }
  
@media screen and (max-height: 500px) {
.AgreeTextOnTerms{
  font-size:14px
}
.checkBox{
width:1.5rem;
}
.enjoyInstant{
  font-size:2rem;
  margin-bottom:15px
}
.goog-te-combo{
  font-size:1.5rem
}
#selectGender{
  font-size:1.5rem
}
.StartButton{
  font-size:1.5rem; 
  margin-top:0
}
}
@media screen and (max-width: 250px) {
#selectCountry{
  width:170px;
  font-size:0.8rem;
}
}
#compare-sign-rootater{
  padding:0 0 0 0;
  margin: 0 0 0 0;
  transition: all 0.7s ease;
    margin-top: ${isGenderContopen ? '1px' : '0'}; 
    transform: rotate(${isGenderContopen ? '270deg' : '90deg'}); 
    display:inline-block; 
    color:#474559;
    transition:all 0.1s ease; 
}
    @media screen and (max-width: 860px) {
    @media screen and (max-height: 600px) {
      .startSearchingCont{
        top:75% !important
      }
    }
  .checkBox{
    width:2.5rem;
    margin-left:5px
  }
.mobileDarkModeContrals{
  display:flex !important;
  justify-content: space-evenly;
  width:100%; 
}
      .startSearching{ 
      color:black  
      }
      .chatFiltersCont{
        position:relative;

      }
      .quickSettings{
        display:block;
      }
      .desktopDarkModeControls{
        display:none
      }
      .videoContainer{
        display:none
      }
      .userVideoContainer{
        display: ${isStarted1Mobile && !IsopenChat && 'block'} ;
        
        min-width: ${!isStarted ? '70vw' : '150px'} ;
        min-height: ${!isStarted ? '40vh' : '150px'} ;
        top: ${!isStarted ? '35%' : '55px'} ;
        right:${isStarted && '5px'};
        left: ${!isStarted && '50%'} ;
        position: ${!isStarted ? 'absolute' : 'absolute'} ;
         transform: ${!isStarted && 'translate(-50%, -50%)'};
      }   
      .partnerVideoContainer{
        display:${isStarted && 'block'};
        min-width:100%;
        max-width:100%;
        min-height:calc(100% - 53px);
        background:#E8F1F5;
        z-index:1;
        border-radius:0;
        max-height:calc(100% - 53px);
        top:53px; 
        
        position:absolute;  
        left:-10px;
      }
      
  .userVideoContainer{
    top:${isFullScreen && '5px'};  
  }
  .partnerVideoContainer{
    top:${isFullScreen && '0'}; 
    
    min-height:${isFullScreen && '100vh'};
        max-height:${isFullScreen && '100vh'}; 
  }
  .navgation{
    display:${isFullScreen && 'none'}
  }
      .startSearchingCont{
        top: ${!isStarted ? '65%' : '55px'} ;
        right:${isStarted && '5px'};
        left: ${!isStarted && '50%'} ;
        position: ${!isStarted ? 'absolute' : 'absolute'} ;
        transform: ${!isStarted && 'translate(-50%, -50%)'};

      }
      .mainContainer{
        display: ${isStarted1Mobile && 'none'};
      }
      .mainGoogleTranslate{
      display:none
      }
      .logoText{
        padding:${isOnline && 'unset'};
        padding-top:${isOnline && '1.3rem'};
        display:${isOnline && 'flex'};
        justify-content:${isOnline && 'center'};
      }
      .controlsContainer{
        display:${!isStarted1Mobile
          && 'none'};
        min-width:${!isStarted ? '80vw' : '100%'};
        max-width:${!isStarted ? '80vw' : '100%'} !important;
        top:${!isStarted ? '50%' : 'initial'}; 
        bottom:${isStarted && '0'};
        
        position:absolute; 
        transform: ${!isStarted && 'translate(-50%, -50%)'};
        left:${!isStarted && '50%'};
      }
      .alertText{
        font-size: 1.5rem; 
    position: absolute;
    top: 43px;
    z-index: 1;
    color: black;
      }
      .buttonsCont{
        display:flex;
        top:unset;
        justify-content:center;
        left:unset;
        width:100%;
        bottom:${!ShowFilterOptions ? '70px' : '100px'};
        flex-direction:row;    
      }
      .filter-pagination-button{
        background: black;
    width: 2rem;
    height: 7rem;
    font-size: 2rem;
    color: beige;
    text-align: center;
    bottom: 0.5rem;
    position: absolute;
      }
      #stopButton{
        margin-right:1.25rem
      }
      .button{
        margin-right:0
      }
      .filter-coursel-cont{ 
        all:${ShowFilterOptions ? 'unset' : null};
        min-width:${!isStarted && ShowFilterOptions ? '70vw' : '96vw'} !important;
        max-width:${!isStarted && ShowFilterOptions ? '70vw' : '96vw'} !important ; 
        left:unset !important; 
        right:${ShowFilterOptions ? '1rem' : '-1000%'};
        top:-10px
      }
      .cross-icon{
        right:${!isStarted ? '2.75rem' : '3.5rem'};
        bottom:${!isStarted ? '4.5rem' : '4.5rem'};
        left:unset
      }
      .onlineText{
        display:none;
      }
      #SettingsGoogleTranslate{
        position:absolute;
        left:1rem;
        max-height:40px;
                  display:flex;
                  align-items:center;
                  padding:3px !important;
                  margin:0 !important
        display:flex;
      }
      #selectGender{  
      }
      .descriptionCont h2,.descriptionCont h3{
    font-size:2rem
  }
  .descriptionCont p{
    font-size:1.2rem
  }
  .chatBox{
    left:${IsopenChat ? '0' : '-1000%'}
  }  
  .buttonsCont{
    display:${IsopenChat || isFullScreen ? 'none' : 'flex'} 
  } 
  .chatOpener{
    display:${isFullScreen ? 'none' : 'block'}   
  }
  @media screen and (max-width: 460px) {  
    .filter-coursel-cont{
    max-width:${ShowFilterOptions && '100% !important'}; 
    min-width: ${ShowFilterOptions && '100% !important'}; 
    right:${ShowFilterOptions && '0 !important'};
    margin:${ShowFilterOptions && '0 !important'} ;
   }
    .scaledIcon{ 
    }
    .userVideoContainer{ 
      margin-left:0;
    max-width: ${!isStarted && '100%'}; 
    min-width: ${!isStarted && '100%'}; 
    min-height:${isStarted && '100px'} ;
    min-width:${isStarted && '100px'}
  }
  .alertText{
  font-size:1rem
  }
  }
        `}</style>
        {!isStarted && isStarted1Mobile && isFullScreen ? <style jsx>{` 
  @media screen and (max-width: 860px) { 

    .userVideoContainer{
      min-width:100%;
      min-height:100vh;
      left:0;
      transform:unset;
      max-width:100%;
      max-height:100vh;
      margin-left:0; 
        border-radius:0;
      top:0
    }
    .navgation{
      display:none;
    }
    .controlsContainer{ 
        min-width:100vw;
        max-width:100vw; 
        top:initial;
        bottom:0;
        position:absolute;  
    }

  }
          `}</style> : null}
      </>
    </>
  );
}

export default App;
