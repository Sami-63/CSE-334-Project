import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";

import NavigationBar from "./conponents/NavigationBar";
import Footer from "./conponents/Footer";

import Home from "./page/Home";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import RoomList from "./page/RoomList";
import Room from "./page/Room";
import AdminDashboad from "./page/AdminDashboad";
import UserDashboard from "./page/UserDashboard";
import FacilityPage from "./page/FacilityPage";
import FacilityList from "./page/FacilityList";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route
                path='/facilitylist/:category'
                element={<FacilityList />}
              />
              <Route path='/facility/:id' element={<FacilityPage />} />
              <Route path='/room/:id' element={<Room />} />
              <Route path='/roomlist' element={<RoomList />} />
              <Route path='/admin-dashboard' element={<AdminDashboad />} />
              <Route path='/dashboard' element={<UserDashboard />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route exact path='/' element={<Home />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
