import "./Timer.css";

const Timer = ({ time }) => {
    const { days, hours, minutes, seconds } = time;

    return (
        <div className="timer">
            <div className="timer__inner">
                <div className="timer__section">
                    <p>Days</p>
                    <span>{days < 10 ? `0${days}` : days}</span>
                </div>
                <div className="timer__section">
                    <p>Hours</p>
                    <span>{hours < 10 ? `0${hours}` : hours}</span>
                </div>
                <div className="timer__section">
                    <p>Minutes</p>
                    <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
                </div>
                <div className="timer__section">
                    <p>Seconds</p>
                    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>
            </div>
        </div>
    );
};

export default Timer;