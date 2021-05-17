import { useState} from "react";
import firebase from "./firebase";
const StorageFB = () => {

    const [imgPath,setImgPath]=useState([]);

    const handleSave=()=>{
    let bucket='images';
    let file=imgPath[0];
    let storageRef=firebase.storage().ref(`${bucket}/${file.name}`)
    let uploadTask=storageRef.put(file)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        let dowmloadURL=uploadTask.snapshot.downloadURL
      })
    }
    
    
    const showImage=()=>{
      let storageRef=firebase.storage().ref();
      let spaceRef=storageRef.child('images/'+imgPath[0].name).getDownloadURL().then((url)=>{
        document.getElementById('img_div').src=url;
      })
    }
    

    return ( 
     <div>   
<input type='file' onChange={(e)=>setImgPath(e.target.files)}/>

<button onClick={handleSave}>Save It</button>
<button onClick={showImage}>Show It</button>
<img id='img_div'/>
</div>
     );
}
 
export default StorageFB;