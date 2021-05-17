import './App.css';
// import Axios from 'axios';
// import WithMongoDB from "./components/withmongoDB";
// import WithMySql from "./components/withmysql";
// import SessionWithMySql from "./components/frontEndWithLocal";
// import PhoneAuth from './components/phoneAuth';
// import firebaseStorage from './components/firebaseStorage';
import SessionWithMySql from "./components/SessionAuth";
function App() {

return(
<div>
  <SessionWithMySql/>
</div>
  )
}

export default App;
