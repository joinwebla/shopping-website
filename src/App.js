import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {Login,Signup, ProductFeed, CheckOut} from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthCheck = (props) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if(token) return props.children;

  return <Navigate to="/login" />
}



function App() {
  const token = localStorage.getItem("AUTH_TOKEN");

  return (
    <div className="App">
      <ToastContainer
        position='bottom-right'
        theme='colored'
      />
      <Routes>
        {/* Public route */}
        <Route path="/login" index element={token ? <Navigate to="/feed" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/feed" /> : <Signup />} />


        {/* Protected route */}
        <Route path='/feed' element={
            <AuthCheck>
              <ProductFeed />
            </AuthCheck>
        } />

        {/* Protected route */}
          <Route path='/checkout' element={
            <AuthCheck>
              <CheckOut />
            </AuthCheck>
        } />

      </Routes>
    </div>
  );
}

export default App;
