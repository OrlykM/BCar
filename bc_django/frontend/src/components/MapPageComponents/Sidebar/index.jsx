import CarCard from "../CarCard";

import "./Sidebar.css";

const Sidebar = ({isOpen, setIsOpen}) => {
    return (
        <div
            className="mySidebar"
            style={{
                display: isOpen ? "block" : "none"
            }}
        >
            <div className="mySidebar__btns">
                <button>Standard</button>
                <button>Premium</button>
                <button>Commercial</button>
            </div>
            <div className="mySidebar__select">
                <label htmlFor="">Filter by:</label>

                <select>
                    <option value="">Sort option</option>
                    <option value="">Sort option</option>
                    <option value="">Sort option</option>
                    <option value="">Sort option</option>
                    <option value="">Sort option</option>
                    <option value="">Sort option</option>
                    <option value="">Sort option</option>
                </select>
            </div>
            <div className="mySidebar__cars">
                {[1, 2, 3, 4, 5].map((car) => (
                    <CarCard
                        key={car}
                        title="Chevrolet Cruise"
                        variant="Стандарт"
                        price="5 грн/хв"
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;