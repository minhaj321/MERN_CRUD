import './../App.css';
import Axios from 'axios';
import { useState ,useEffect } from "react";

const WithMySql = () => {
    let [name,setName]=useState('');
    let [Msg,setMsg]=useState('');
    let [getData,setGetData]=useState([]);
    let [UpdateMsg,setUpdateMsg]=useState('');
    
    useEffect(()=>{
      Axios.get('http://localhost:5000/api/get').then(res=>{
        setGetData(res.data)
        console.log(res.data)
      })
    
    },[])
    
    const clickHandle=()=>{
      Axios.post('http://localhost:5000/api/insert',{
        name:name,
        Msg:Msg
      }).then(()=>{
        alert('success iNsert');
      }).catch(err=>{
        console.log(err.message)
      })
    }
    
    const DeleteHandle=(val)=>{
      Axios.delete(`http://localhost:5000/api/delete/${val}`);
    }
    
    const UpdateHandle=(UpName)=>{
      Axios.put('http://localhost:5000/api/update',{
        name:UpName,
        Msg:UpdateMsg
      }).then(()=>{
        alert('success iNsert');
      }).catch(err=>{
        console.log(err.message)
      })
    }
    
      return (
        <div className="App">
    <input placeholder='enter NAME here'
    onChange={(e)=>setName(e.target.value)}
    />
    <input placeholder='enter text here'
    onChange={(e)=>setMsg(e.target.value)}
    />
    <button onClick={clickHandle}>
      My Click
    </button>
    
    {
      getData && getData.map((v,i)=>{
        return(
          <div key={i}>
        <h3>Name : {v.Name} Msg : {v.Message}</h3>
        <input onChange={(e)=>setUpdateMsg(e.target.value)}/>
        <button onClick={()=>UpdateHandle(v.Name)}>Update</button>
        <button onClick={()=>DeleteHandle(v.Message)}>Delete</button>
          </div>
        )
      })
    }
    
    
    
    </div>
      );
}
 
export default WithMySql;