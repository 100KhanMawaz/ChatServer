const http=require('http');
const express=require('express');
const cors=require('cors');
const socketIO=require('socket.io');

const app=express();
const port=4500||process.env.PORT;

const users=[{}];

app.use(cors());

app.get("/",(req,res)=>{
    //whoever will call http://localhost:port then use ye cheez jo likhi hai res.send mein wo milegi
    res.send("Allah is MerciFul")
})

const server=http.createServer(app); //here app in the bracket means we are calling express i.e we are making server using express

const io=socketIO(server); 

//io ek connection hai jiske andar jitne socket hai wo sb alag alag users hai
io.on("connection",(socket)=>{//ye bracket mein jo socket hai wo frontEnd se aara hai
    console.log("New Connection");

    //on matlab data receive kr rhe hai jo aaya or whi name likhna hai 1st parameter mein jo frontend se bheje hai
    socket.on('joined',({user})=>{
        //({user}) idhar aisa likha ya fir ek or optin tha ki bracket mein data likhte i.e (data) or uske andar to user hai apne ko pata hai to jab user ko acess karna rehta to data.user likhte har baar. to is liye we used this method ({user}) called destructuring
    
        console.log(`${user} has Joined`)
        users[socket.id]=user;//jitna bhi socket banega usko id milega har socket ka id unique hoga to har user ko uniquely identify krne k liye ek array jo hmlg banaye hai upar users naam se usmein jo socket.id ke sath user ka naam associate kr denge or jab bhi socket ya user jaaye to humlg uska id se uska naam pata kr le or chat.jsx jo frontend hai usme useEffect ke andar ek console.log rakhe hai usme dekhlo socket mein id rehta
        socket.emit('welcome',{user:"Mawaz Boss",message:`  Welcome to the chat ${users[socket.id]}`});// welcome messsage backedn se bhejne ka fayeda ye hai ki mera user name and mera message koi change nai kar sakta inspect mein jaakr jo bheja gaya wahi rahega
        socket.broadcast.emit('userJoined',{user:"Mawaz Boss",message:`${users[socket.id]} has Joined`});//broadcast bole to ki jo join karra usko chor ke baaki sbko dikhega message or emit to jaaante hi ho ki idhar se data bhej rhe to emit use kreenge
        
    })
    socket.on('message',({message,id})=>{
        //fetch the name of the user sending the message and resending the id so that frontEnd can match the sender and reciever id
        io.emit('sendMessage',{user:users[id],message:message,id})//socket.emit krte to sirf usko jaata jo bhej rha and socket.broadcast.emit karte to jo bhj rha usko chor kar baaki sbko chal jaata is io.emit krre io.emit se pure circuit mein sbke pass pahuch jayega
    })
   
socket.on('disconnect',()=>{
    socket.broadcast.emit('leave',{user:"Mawaz Boss",message:`${users[socket.id]} has left`})
    console.log("User Left");
})
});

//server create kiye upar server naam se ab wo server konse port pe view hoga or kya kya karega wo define karenge
server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)
})
