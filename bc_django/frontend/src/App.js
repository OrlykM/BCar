import NotFoundPage from "./pages/notFoundPage";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import MapPage from "./pages/map";
import RestorePassword from "./pages/restorepasswordpage";
import NewPasswordPage from "./pages/newPasswordPage";
import UploadDrivingLicense from "./pages/UploadDrivingLicense";
import CarRentPage from "./pages/carRentPage";
import ShareCar from "./pages/shareCar";
import Confirmation from "./pages/confirmation";
import Order from "./pages/order";
import CarsUser from "./pages/CarsUser";
import CardBalance from "./pages/cardBalance";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/UploadDrivingLicense" element={<UploadDrivingLicense />} />
        <Route path="/map" element={<MapPage />}/>
        <Route path="/reset" element={<RestorePassword />}/>
        <Route path="/reset/newPassword" element={<NewPasswordPage/>}/>
        <Route path="/car/:carId/rent" element={<CarRentPage/>}/>
        <Route path="/share/car" element={<ShareCar/>}/>
        <Route path="/register/confirmation/:key" element={<Confirmation />}/>
        <Route path="/order" element={<Order />}/>
        <Route path="/user/cars" element={<CarsUser/>}/>
        <Route path="/balance" element={<CardBalance/>}/>
        <Route path="*" element={<NotFoundPage />}/>

    </Routes>
  );
}

export default App;
