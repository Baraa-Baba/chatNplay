import React, { useEffect, useState } from 'react';

import { ref, getDownloadURL , uploadBytesResumable } from "firebase/storage"; 
import { storage } from '../../firebase.js';  
const ImageInputDisplay = ({ user,userId }) => {
  const [currentimageSrc,setcurrentimageSrc]=useState(user?.photoURL)   
  useEffect(()=>{
    if(user?.photoURL){
    setcurrentimageSrc(user?.photoURL) 
    }
  },[user])

  function handleImageUpload(){
  
  var image = document.getElementById("upload").files[0];
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        setcurrentimageSrc(e.target.result); 
      }
  
      reader.readAsDataURL(image);

      const sotrageRef = ref(storage, `${userId}`);
      const uploadTask = uploadBytesResumable(sotrageRef, document.getElementById("upload").files[0]); 
       uploadTask.on(
         "state_changed",
         () => {
           
         },
         (error) => console.log(error),
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             console.log("File available at", downloadURL);
             setcurrentimageSrc(downloadURL) 
           }); 
         }
       );
  }  
  return (
    <div className='profileImageCont'>
      <label htmlFor="upload">
      <img id="display-image"  title='upload your profile'
      alt='profile' style={{cursor:'pointer'}}
       src={currentimageSrc?currentimageSrc:'/assets/defualtProfile.jpg'} />  
      </label>
      <input id="upload" style={{visibility:'hidden',position:'absolute'}} type="file" onChange={()=>handleImageUpload()} />
    </div>
  );
};

export default ImageInputDisplay;
