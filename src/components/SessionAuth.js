import Axios from 'axios';
import React, { useState, useEffect } from 'react';
const SessionWithMySql = () => {
  const [name,setName]=useState('');
  Axios.defaults.withCredentials=true;
const [password,setPassword]=useState('');
const [loginname,setLoginName]=useState('');
const [logedin,setLogedIn]=useState(localStorage.getItem('name'));

const [loginpassword,setLoginPassword]=useState('');
useEffect(()=>{
  Axios.get('http://localhost:5000/api/login').then(res=>{
    console.log(res)
  })
    // Axios.get('http://localhost:5000/api/get').then(res=>{
  //     setGetData(res.data)
  //     console.log(res.data)
  //   })  
  },[])

  // setInterval(()=>{
  //   setLogedIn(localStorage.getItem('name'));
  //   console.log('succes');
  // },10000)


  const clickHandle=()=>{
    console.log('google')
    Axios.post('http://localhost:5000/api/insert',{
      name:name,
      password:password
    }).then(()=>{
      alert('success iNsert');
    }).catch(err=>{
      console.log(err.message)
    })
  }

  const loginHandle=()=>{
    console.log('login')
    Axios.post('http://localhost:5000/api/login',{
      name:loginname,
      password:loginpassword
    }).then(res=>{
      console.log(res.data[0].Name);
      localStorage.setItem('name',res.data[0].Name);
      setLogedIn(localStorage.getItem('name')) 
       })

  }

  const logedOutHandle=()=>{
    localStorage.removeItem('name');
    setLogedIn(localStorage.getItem('name'));
  }

return( 
<div>
<h1>
  Registration Form
</h1>
<input type='text' placeholder='enter name here' 
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<input type='password' placeholder='enter password here' 
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<button
onClick={()=>clickHandle()}
>Submit
</button>

<h1>
  Login Form
</h1>
<input type='text' placeholder='enter name here' 
value={loginname}
onChange={(e)=>setLoginName(e.target.value)}
/>
<input type='password' placeholder='enter password here' 
value={loginpassword}
onChange={(e)=>setLoginPassword(e.target.value)}
/>
<button
onClick={()=>loginHandle()}
>Submit
</button>

{
  logedin && 
  <h1>{logedin}</h1>
}

<button
onClick={()=>logedOutHandle()}
>Logged Out</button>
    </div> );
}
 
export default SessionWithMySql;