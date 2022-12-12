import "./CarCard.css";

const CarCard = ({
                     image = "https://www.volvocars.com/images/v/-/media/project/contentplatform/data/media/my23/car-images/c40-bev-my23.jpg?iar=0",
                     title,
                     variant,
                     price
                 }) => {
    return (
        <div className="carCard">
            <div className="carCard__img">
                <img src={image} alt=""/>
            </div>
            <div className="carCard__desc">
                <div className="carCard__info">
                    <h2>{title}</h2>
                    <p>
                        {variant} <span>{price}</span>
                    </p>
                </div>
                <button>
                    Орендувати
                </button>
            </div>
        </div>
    );
};

export default CarCard;