import React,{useEffect, useState} from 'react'
import {user} from '../Join/Join' //{user} is tarah is liye import kiye qki jis tarah exmpoort kjarte hai usi tarah importt karnege
import  socketIo  from 'socket.io-client';
import '../Chat/Chat.css'
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../Alert/Alert.css';

const callAlert=(msg)=>{
window.alert=function(message){
    const PrivateAlert=document.createElement('div');
    const PrivateAlertButton=document.createElement('button');
    PrivateAlert.innerText=message;
    PrivateAlertButton.innerText='OK';
    PrivateAlert.appendChild(PrivateAlertButton);
    PrivateAlert.classList.add('alertStyle');
    document.body.appendChild(PrivateAlert);
    PrivateAlertButton.addEventListener('click',(e)=>{PrivateAlert.remove()});
};
    alert(msg);
}
let socket;

const ENDPOINT='https://gupshup-3a2t.onrender.com';//endpoint bole to socket kaha se recive krna hai banana kaha se hai
const Chat = () => {
  const [id, setid] = useState("")
  const [messages, setmessages] = useState([]);
  //sending messsage when submut button is clicked.
  const send=()=>{
    //fetching message entered by the user
    const message=document.getElementById('chatInput').value
    //passing the message to the backend
    socket.emit('message',{message,id}); //the rationale behind sending id in backend is to tell backend ki is id ke aadmi ne ye message kiya to us id ke corresponding backend se hmlg name fetch kr lenge
    document.getElementById('chatInput').value="";//message bhejne k baad input khaali kr do
  }
 // console.log(messages)
  //jo bhi cheez useEffect ke andar hai wo jab app reload hoga tab hi render hoga or ek hi baar hoga yakeen nai hora to 1st line ko useeffect k bahar karke dekho har baar newConnection likhayega or jo bhi hoga wo baar baar lihayega
  useEffect(() => {
  socket=socketIo(ENDPOINT,{transports:['websocket']});
  socket.on('connect',()=>{
    callAlert("Connected! It's a real-time MultiChat room where unlimited users can join simoustaneously ");
    setid(socket.id);
  })
//emit ka mtlb hai yaha se data bhej rahe hai backend mein or uske 2 parameters hai pehla us particular emit ka naam kya hai and dusra ye emit data kya bhj raha hai
// console.log(socket); 
socket.emit('joined',{user:user})// hmlg khali {user} bhi likh kr bhej sakte hai qki 1 hi value hai iske andar or ye whi user hai jo login kiya hai

//jo join hua hai uska swagat karo
socket.on('welcome',(data)=>{
  setmessages([...messages,data]);//here data is an object, we know javascript ka array single element type ka nai hota usme kch bhi bhej sakte sab saath mein number, string ,object,boolean sb ek hi array mein bhej sakte hai
    console.log(`${data.user}:${data.message}`);// welcome messsage backedn se bhejne ka fayeda ye hai ki mera admin name and mera message koi change nai kar sakta inspect mein jaakr jo bheja gaya wahi rahega
  });
  
  socket.on('userJoined',(data)=>{
    setmessages([...messages,data]);//here data is an object, we know javascript ka array single element type ka nai hota usme kch bhi bhej sakte sab saath mein number, string ,object,boolean sb ek hi array mein bhej sakte hai
  console.log(`${data.user}:${data.message}`);// welcome messsage backedn se bhejne ka fayeda ye hai ki mera admin name and mera message koi change nai kar sakta inspect mein jaakr jo bheja gaya wahi rahega
});

socket.on('leave',(data)=>{
  setmessages([...messages,data]);//here data is an object, we know javascript ka array single element type ka nai hota usme kch bhi bhej sakte sab saath mein number, string ,object,boolean sb ek hi array mein bhej sakte hai
  console.log(`${data.user}:${data.message}`);// welcome messsage backedn se bhejne ka fayeda ye hai ki mera admin name and mera message koi change nai kar sakta inspect mein jaakr jo bheja gaya wahi rahega
})
return () => {
    socket.disconnect();
    socket.off();
  }
}, [])

useEffect(() => {
  socket.on('sendMessage',(data)=>{
    setmessages([...messages,data]);//here data is an object, we know javascript ka array single element type ka nai hota usme kch bhi bhej sakte sab saath mein number, string ,object,boolean sb ek hi array mein bhej sakte hai
    console.log(data.user,data.message,data.id)
  })

  return () => {
    socket.off();
  }
}, [messages])

  return (
    <div className='chatPage'>
        <div className="chatContainer">
            <div className="header">
              <h2>GupShup</h2>
              <a href="/">X</a>
            </div>
            <h4>Your chats are end to end Encrypted!</h4>
                <ScrollToBottom  className="chatBox">
                  {messages.map((data,i)=> <Message key={i} user={data.id===id?'you':data.user} message={data.message} position={data.id===id?'right':'left'}/>)} 
                     {/*above we are iterating over messages array in which variable is the element of array and i is index of array */}
                 </ScrollToBottom>
                    <div className="inputBox">
                        <input onKeyPress={(event)=>event.key==='Enter'?send():null} type="text" id="chatInput" placeholder='Enter your text here..'/>
                        <button className="sendBtn" onClick={send}><i className="fa-solid fa-share"></i></button>

                    </div>
        </div>
    </div>
  )
}
export default Chat