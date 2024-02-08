// import AddEmployee from './pages/AddEmployee';
// import EmployeeDetails from './pages/EmployeeDetails';
// import EmployeeList from './pages/EmployeesList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage'
import RoomList from './pages/RoomListPage';
import Room from './pages/Room'
import socket from './socket'; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom';


function App() {
  const PrivateRoute = ({children}) => {
    return localStorage.getItem("valid") ? children : <Navigate to="/" />
  }
  
  return (
    <BrowserRouter>
    <div className="App">
     
      <div id="page-body">
        <Routes>
          <Route path='/' element={<PrivateRoute><LoginPage/></PrivateRoute>}/>
          <Route path='/signup' element={<PrivateRoute><SignupPage/></PrivateRoute>}/>
          <Route path='/roomList' element={<RoomList/>}/>
          <Route path='/room' element={<PrivateRoute><Room/></PrivateRoute>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
