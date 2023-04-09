import React,{useState} from 'react'
import './Join.css';
import logo from '../../images/chat.jpg'
import {Link} from 'react-router-dom';

let user;

const Join = () => {
const sendUser=()=>{
  user=document.getElementById('JoinInput').value; //user ka naam le lenge and usko user variable mein store kar lenge and last mein user variable ko khali kar denge
  document.getElementById('JoinInput').value="";//or input wale dabbe ko khali kar denge qki value to store ho hi gyi hai user variable mein
}
const [UserName, setUserName] = useState("")
  return (
    <div className='JoinPage'>
        <div className="JoinContainer">
          <img src={logo} alt="" />
            <h1>GupShup</h1>
            <input onChange={(e)=>setUserName(e.target.value)} type="text" id='JoinInput' placeholder='Enter your name'/>
           <Link onClick={(e)=>!UserName?e.preventDefault():null} to='/chat' ><button className='Joinbtn' onClick={sendUser} type='submit'>LogIn</button></Link> 
            {/* The onClick function used above is that agar UserName null hai i.e !UserName then e.preventDefault() matlab link ka jo default kaam hai wo mat karo to link ka default kaam kya hai ki /chat pe jaana to wo nai jayega agar !Username hai to and agar aisa nai hai mtlb username hai then null kardo mtlb kch nai jaisa chalra hai chalne do */}
        </div>
    </div>
  )
}

export default Join;
export {user};