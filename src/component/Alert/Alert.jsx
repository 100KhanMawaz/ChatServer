import React from 'react'
import '../Alert/Alert.css'
const callAlert=(msg)=>{
window.alert=function(message,timeout=null){
    const PrivateAlert=document.createElement('div');
    const PrivateAlertButton=document.createElement('button');
    PrivateAlert.innerText=message;
    PrivateAlertButton.innerText='CLOSE';
    PrivateAlert.appendChild(PrivateAlertButton);
    PrivateAlert.classList.add('alertStyle');
    document.body.appendChild(PrivateAlert);
    PrivateAlertButton.addEventListener('click',(e)=>{PrivateAlert.remove()});
};
    alert(msg);
}
const Alert = () => {
  return (
    <div>
        <h1>Alert</h1>
        <button onClick={callAlert("Hello this is an Alert")}>Show</button>
    </div>
  )
}

export default Alert