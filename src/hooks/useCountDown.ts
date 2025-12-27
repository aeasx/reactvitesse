import { useEffect, useRef, useState } from "react";

export function useCountDown(initialSeconds = 60) {
  const [time, setTime] = useState<number>(initialSeconds);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current !== null) return;
    timer.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          if (timer.current !== null) {
            clearInterval(timer.current);
            timer.current = null;
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);

  return { time };
}
