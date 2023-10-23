'use client'

import moment from "moment";
import React, { useEffect, useState } from "react";



export default function Countdown({ unixEndDate } : { unixEndDate: number }) { {
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [countdownInfoMessage, setCountdownInfoMessage] = useState("");

  useEffect(() => {
    let timer: number = 0;

    if (unixEndDate) {
      timer = window.setInterval(() => playTimer(unixEndDate), 1000);
    }

    return () => {
      clearInterval(timer);
      timer = 0;
    };
  }, [unixEndDate]);

  const playTimer = (currentUnixEndDate: number) => {
    const distance = currentUnixEndDate - moment().unix();

    if (distance > 0) {
      setCountdownTimer({
        days: parseInt(distance / (60 * 60 * 24), 10),
        hours: parseInt((distance % (60 * 60 * 24)) / (60 * 60), 10),
        mins: parseInt((distance % (60 * 60)) / 60, 10),
        secs: parseInt(distance % 60, 10),
      });
      setCountdownInfoMessage("");
    } else {
      setCountdownInfoMessage(
        "Countdown ended. Click the Settings button to start a new countdown.",
      );
      setCountdownTimer(null);
    }
  }

  return (
    <div className="countdown">
      <div className="card">
        <div className="countdown-value">{countdownTimer.days}</div>
        <div className="countdown-unit">Days</div>
      </div>
      <div className="card">
        <div className="countdown-value">{countdownTimer.hours}</div>
        <div className="countdown-unit">Hours</div>
      </div>
      <div className="card">
        <div className="countdown-value">{countdownTimer.mins}</div>
        <div className="countdown-unit">Mins</div>
      </div>
      <div className="card">
        <div className="countdown-value">{countdownTimer.secs}</div>
        <div className="countdown-unit">Secs</div>
      </div>
      <p>
        Counting down to {eventName} on{" "}
        {moment.unix(unixEndDate).format("dddd, MMMM Do, YYYY | h:mm A")}
      </p>
    </div>
  );
}


  