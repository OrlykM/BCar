import React, {useState} from 'react';
import MapPageHeader from "../components/MapPageComponents/header";
import Map from "../components/MapPageComponents/Map";
import Sidebar from "../components/MapPageComponents/Sidebar";

const MapPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <MapPageHeader onClose={() => setIsOpen(prev => !prev)}/>
            <Sidebar isOpen={isOpen}/>
            <Map/>
        </div>
    );
};

export default MapPage;