import { useEffect, useState } from "react";

export const useTimer = ({ start = null }) => {
    const [time, setTime] = useState({
        seconds: start?.seconds ?? 0,
        minutes: start?.minutes ?? 0,
        hours: start?.hours ?? 0,
        days: start?.days ?? 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (time.seconds === 59) {
                setTime((prev) => ({ ...prev, seconds: -1 }));
                setTime((prev) => ({ ...prev, minutes: prev.minutes + 1 }));
                if (time.minutes === 59) {
                    setTime((prev) => ({ ...prev, minutes: 0 }));
                    setTime((prev) => ({ ...prev, hours: prev.hours + 1 }));
                    if (time.hours === 23) {
                        setTime((prev) => ({ ...prev, hours: 0 }));
                        setTime((prev) => ({ ...prev, days: prev.days + 1 }));
                    }
                }
            }
            setTime((prev) => ({ ...prev, seconds: prev.seconds + 1 }));
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return time;
};