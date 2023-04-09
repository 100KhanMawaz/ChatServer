import React from 'react'
import './Message.css'
import sound from '../../Audio/iPhone msg Tone.mp3'
const audio=new Audio(sound)

const Message = ({user,message,position}) => {
 if(position==='left'){
 audio.play();
 }
  return (
    <div className={`messageBox ${position}`}>
        {`${user}:${message}`}
        {/* above we used curly braces to insert javascript in our html react code */}
    </div>
  )
}

export default Message