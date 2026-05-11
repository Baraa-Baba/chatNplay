import React, { useEffect,useState,useRef } from 'react';
import { useUserAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom'; 
import { db,auth } from "../../firebase";
import { setDoc,doc,getDoc,onSnapshot} from "firebase/firestore";  
import {  updateProfile } from "firebase/auth"; 
import GoogleTranslate from '../ChooseGame/ChooseGame';  
import {countryList} from '../../countryList' 
import Message from '../Chat/Message/Message';
import "../Chat/Chat.scss";
import { 
  FaTimes
} from "react-icons/fa";
import './Dashboard.scss'
import '../signUp/SignUp.scss' 
import ImageInputDisplay from './ImageInputDisplay';
import DarkMode from '../DarkMode/DarkMode'; 
import ChooseGame from '../ChooseGame/ChooseGame';
const Dashboard = ({setisDashboard,isDashboard}) => { 
    const divRref = useRef(null);


    useEffect(()=>{
      function doNothing(x){

      }
      setisDashboard=setisDashboard||doNothing()
      let IsITPage=!setisDashboard?true:false
       setIsPage(IsITPage)
      isDashboard=isDashboard||true
    },[])

  
  const { logOut, user } = useUserAuth(); 
  useEffect(()=>{
    console.log(user)
  },[user])
  const [isDisplayChatRooms,setisDisplayChatRooms]=useState(false) 
  const [userName,setUserName]=useState('') 
  const [lastName,setLastName]=useState('') 
  const [firstName,setFirstName]=useState('') 
  const [isPage,setIsPage]=useState(false)
  const [isDarkMode,setIsDarkMode]=useState(false)
  const [userAuthPrefernce,setUserAuthPrefrence]=useState('noLogin')
  const [userGenderPrefrence,setUserGenderPrefrence]=useState('')
  const [emailPhone,setemailPhone]=useState('')
  const [UserCountryPrefrence,setUserCountryPrefrence]=useState('')
  const [userGender,setUserGender] =useState('anygender')
  const [introMessage,setintroMessage]=useState('')
  const [userLangue,setuserLangue]=useState('')
  const [isEmail,setIsEmail]=useState(null)  
  const [CurrentRoomId,setCurrentRoomId]=useState('')
  const [messeages,setMessges] =useState([])
  const [InputValue,setInputValue]=useState('')
  const [DisplayedMesseages,setDisplayedMesseages]=useState([])
  const [userGame,setUserGame]=useState('')
  const [count,setCount]=useState(0)   
  const navigate =useNavigate()  
  useEffect(()=>{
    console.log(count)
  },[count])
    useEffect(()=>{
      if(isDisplayChatRooms){
        var chatbox = document.getElementById("chatBox");
        if(chatbox){
            chatbox.scrollTop = chatbox.scrollHeight;
        }
        setTimeout(()=>{
          var chatbox = document.getElementById("chatBox");
          if(chatbox){
              chatbox.scrollTop = chatbox.scrollHeight;
          }
        },1)
      }
    },[isDisplayChatRooms])
    useEffect(()=>{
      if(window.innerWidth > 860){
        navigate('/')
      }
      window.addEventListener('resize',()=>{
        if(window.innerWidth > 860){
          navigate('/')
        }
      })
    },[navigate])
  useEffect(()=>{
    if(document.getElementById('chatBox')){   
      if(window.innerWidth<860){
      let isNotFocusedOnMesseageRoomMobile = isPage&&CurrentRoomId===''
    if(isNotFocusedOnMesseageRoomMobile){ 
      document.getElementById('chatBox').style.display='none'
      document.getElementById('messegingContainer').style.display='none'   
      document.getElementById('ChatRoomsCont').style.display='none'
      document.getElementById('ChatRoomsCont').style.display='none'
      document.getElementById('MesseagingMobileNav').style.display='none'
    }else{
      document.getElementById('messegingContainer').style.display='block'
      document.getElementById('chatBox').style.display='block' 
      document.getElementById('ChatRoomsCont').style.display='block'
      document.getElementById('MesseagingMobileNav').style.display='block'
    }
  }
  }
  },[CurrentRoomId,isPage,isDisplayChatRooms])
  useEffect(()=>{
    var chatbox = document.getElementById("chatBox");
    if(chatbox){
        chatbox.scrollTop = chatbox.scrollHeight;
    }
    setTimeout(()=>{
      var chatbox = document.getElementById("chatBox");
      if(chatbox){
          chatbox.scrollTop = chatbox.scrollHeight;
      }
    },100)
  },[])   
  useEffect(()=>{
    if(CurrentRoomId){
      setMessges([])
      async function run(){ 
          onSnapshot(doc(db, "chatRooms",CurrentRoomId ), (doc) => {
          console.log("Current data: ", doc.data()); 
          console.log('roomchbbdbiehod',doc?.data())
          let recivedData=doc?.data()
          if(recivedData?.messeages){
            console.log(recivedData?.messeages)
          if(Array.isArray(recivedData?.messeages)){
            setMessges(recivedData?.messeages) 
          }else{
            setMessges([])
          }
          setDisplayedMesseages([])
          let displayMessegaesTmp=[]
            recivedData?.messeages.forEach((message)=>{
              message.type=message.sender===user?.uid ? 'you'  : 'partner'
              displayMessegaesTmp.push(message)
            })
            setDisplayedMesseages(displayMessegaesTmp)
            console.log(displayMessegaesTmp)
          }
      }) 
        } 
      run() 
    }
  },[CurrentRoomId,user?.uid])
  useEffect(()=>{
    console.log('messeages')
    console.log(messeages)
  },[messeages])
  useEffect(()=>{
    var chatbox = document.getElementById("chatBox");
    if(chatbox){
        chatbox.scrollTop = chatbox.scrollHeight;
    }
  setTimeout(()=>{
    var chatbox = document.getElementById("chatBox");
    if(chatbox){
        chatbox.scrollTop = chatbox.scrollHeight;
    }
  },1000)
},[DisplayedMesseages])
  useEffect(()=>{
    console.log(user?.uid)
    console.log(user?.photoURL)
    if(user?.photoURL){ 
    }
  },[user])
  
  useEffect(()=>{
    if(user?.uid){
      setUserName(user.displayName)
      if(user?.email){
        setIsEmail(true)
      }else{
        setIsEmail(false)
      }
      setemailPhone(user.email||user.phoneNumber)
    async function getUserData(){
       const docRef= doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const userData=docSnap.data()
        console.log(userData,'userData') 
        setFirstName(userData?.firstName)
        setLastName(userData?.lastName)
        setUserGender(userData?.gender)
        setUserGenderPrefrence(userData?.userGenderPrefrence)
        setUserCountryPrefrence(userData?.UserCountryPrefrence) 
        setintroMessage(userData?.introMessage)  
        setUserGame(userData?.userGame)
        setUserAuthPrefrence(userData?.userAuthPrefernce)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
         console.log(docRef)
  }
  setTimeout(()=>{ 
    getUserData()
  },200)
}
  },[user])  
  const handleSignOut = async () => { 
    try {
      await logOut();
      navigate('/');
      setisDashboard(false)
      
    } catch (error) {
      console.log(error);
    }
  }; 
  function handleSaveChanges(){
    async function storeUser(){
      try {   
          await setDoc(doc(db, "users",user?.uid), {  
          id:user?.uid,
          firstName:firstName?firstName:'',
          lastName:lastName?lastName:'',
          displayName: userName?userName:''  ,
          photoURL:document.getElementById('display-image').src?document.getElementById('display-image').src:user?.photoURL,
          introMessage:introMessage?introMessage:'', 
          userGame:userGame,
          userAuthPrefernce:userAuthPrefernce
          
        },{merge:true});   
        alert('changes were successfully saved')
        navigate('/')
      } catch (e) { 
        alert('error',e)
        console.error("Error adding document: ", e); 
      }
    }
    storeUser()
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL:document.getElementById('display-image').src?document.getElementById('display-image').src:user?.photoURL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }  
  return (
    <>
   {!isPage&& <div className="blackOverlay"></div>}
    <div className="centerFlex" onClick={()=>setisDashboard(false)}>
    <div className='dashboardCont' onClick={(e)=>e.stopPropagation()}>
    { !isPage &&           
    <div onClick={()=>setisDashboard(false)} style={{color:isDarkMode?'white':'black',padding:'1rem',top:'0'}} className="closeIconSign  ">
        <FaTimes />
        </div>} 
        <> 
      <div className="flexRowWebColumnMobile"><div className="Section">
        <div  className='flexRow w88Mobile'>
          <h1 className='dashboard'>Dashboard</h1>
          <ImageInputDisplay user={user} userId={user?.uid} />
        </div>

      <div className="fullNameCont">
      <div> 
          <label htmlFor="FirstNameInput" className='labelDashboardInput'>first name</label>
        <input id='FirstNameInput' className='dashBoardInput' type='text' placeholder='first name' value={firstName} onInput={(e)=>setFirstName(e.target.value)} />
      </div>
      <div> 
          <label htmlFor="LastNameInput" className='labelDashboardInput'>last name</label>
        <input id='LastNameInput' className='dashBoardInput' type='text' placeholder='last name' value={lastName}
         onInput={(e)=>setLastName(e.target.value)} />
      </div>
      </div>
      <div> 
          <label htmlFor="userNameInput" className='labelDashboardInput'>user name</label>
        <input id='userNameInput' className='dashBoardInput' type='text' placeholder='username' value={userName} onInput={(e)=>setUserName(e.target.value)} />
      </div>
      <label htmlFor="emailPhoneInput" className='labelDashboardInput'>{isEmail===false&&'phone'}
      {isEmail===true&&'email'}
      </label>
      <input value={emailPhone} id='emailPhoneInput' disabled className=' dashBoardInput' /> 
          <label htmlFor="introMessage" className='labelDashboardInput'>intro message</label>
         <input id='introMessage' value={introMessage} className='dashBoardInput' placeholder='enter intro message'
          onInput={(e)=>setintroMessage(e.target.value)} />
    
         
      </div>
      <div className="Section">
      <div className='googleTranslateCont'>
          <label htmlFor="" className='labelDashboardInput'>choose your game </label>
          <ChooseGame setUserGame={setUserGame} isDashboard={isDashboard} userGame={userGame} />
        </div> 
      <label className='labelDashboardInput' htmlFor="">chat filters:</label>
      <div className='chatFiltersContDashBoard w88Mobile'>  
        <select style={{visibility:'hidden',position:'absolute',fontSize:'1.5rem'}} id="width_tmp_select">
  <option id="width_tmp_option"></option>
</select>
        <select onClick={(e)=>e.preventDefault} className='dashBoardInput' value={userAuthPrefernce}  onInput={(e)=>
        {e.preventDefault()
          setUserAuthPrefrence(e.target.value)}}
         > 
        <option className='' selected value='allUsers'>all users</option>
          <option className='' value='loginUsers'>login users</option>
          <option className='' value='phoneNumberLogin'>phone number login users</option>
        </select>   
        </div>  
      <div className="startbuttonsCont">
      <button className='saveChanges'  onClick={()=>handleSaveChanges()}>save changes</button>
      <button className='logOut' onClick={handleSignOut} >
        Logout
      </button>
      </div>
      </div>
      </div> 
      </>
    </div>
    </div> 
    {isDarkMode && <DarkMode /> }
    {isPage &&
    <style jsx>{` 
    .centerFlex{
      position:static
    }
    `}
    </style>
    }
  {isPage || isDashboard ? <style jsx>{`
           .goog-te-combo{ 
            max-width: 100% !important;
            height: 46px;
            width: 100%;
            font-size: 18px !important; 
            border: 1px solid gray;
            outline: none;
            margin-bottom: 20px;
        }
        @media screen and (max-width: 860px) { 
          .goog-te-combo{
              width: 80%;
          }
      }
      `}</style>:null}
    </>
  );
};

export default Dashboard;