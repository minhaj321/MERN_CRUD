import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WithMongoDB = () => {
const [foodName,setFoodName]=useState('');
const [days,setDays]=useState('');
const [Data,setData]=useState(null);
const [update,setUpdate]=useState('');


useEffect(()=>{
    const fetch=async()=>{
    const {data}=await axios.get('http://localhost:3001/');
        setData(data);
}
fetch();
},[])

const deleteIt= async(vid)=>{
    await axios.delete(`http://localhost:3001/${vid}`)
}

const updateIt= async(vid)=>{
    const data={
        id:vid,
        name:update
    }
    await axios.put(`http://localhost:3001/`,data
        )
}

const dataHandle= async ()=>{
    let data={
        foodName:foodName,
        days:days
    };
    await axios.post('http://localhost:3001/',data)

}
    return ( 
    <div>
        <p>Enter Food</p> 
        <input  type="text"
        onChange={e=>setFoodName(e.target.value)}
        />
        <p>Enter Days</p> 
        <input  type="number"
        onChange={e=>setDays(e.target.value)}
        />
        <button onClick={()=>dataHandle()}>Add Data</button>

        {Data &&
        Data.map((v,i)=>{
            return(<div key={v._id}>
                <h1>{v.foodName}</h1>
                <h4>{v.days}</h4>
                <button onClick={()=>deleteIt(v._id)}>Delete</button>
                <input type='text' onChange={(e)=>setUpdate(e.target.value)}/>
                <button onClick={()=>updateIt(v._id)}>Update</button>
                </div>
        )
        })}
    </div> );
}
 
export default WithMongoDB;