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
import CarAddNewPage from "./pages/carAddNewPage";
import OwnerGetInfoCars from "./pages/ownerGetInfoCars";



function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/UploadDrivingLicense" element={<UploadDrivingLicense />} />
        <Route path="/mapPage" element={<MapPage />}/>
        <Route path="/reset" element={<RestorePassword />}/>
        <Route path="/reset/newPassword" element={<NewPasswordPage/>}/>
        <Route path="/car/:id/rent" element={<CarRentPage/>}/>
        <Route path="/car/add/:userId" element={<CarAddNewPage/>}/>
        <Route path="user/owner/get_info/:userId" element={<OwnerGetInfoCars/>}/> // change the name of url
        <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;

//     <Route path="car/add/:userId" element={<CarAddNew/>}/>
