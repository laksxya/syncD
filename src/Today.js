import React, { useState, useEffect } from "react";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollegeEvents from "./CollegeEvents.json";

function TodayCard(props) {
  const [eventData, setEventData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find event data by eventName
    const event = CollegeEvents.find(event => event.eventName === props.EventName);
    setEventData(event);
    
    // Check if there's a stored value for this event's favorite status
    const likedStatus = localStorage.getItem(`event_${props.EventName}_liked`);
    setIsLiked(likedStatus === "true");
  }, [props.EventName]);

  const handleLike = () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    // Store the new liked status in localStorage
    localStorage.setItem(`event_${props.EventName}_liked`, newLikedStatus.toString());
  };

  if (!eventData) {
    return (
      <div className="TodayCard" style={{ background: "#f8f8f8" }}>
        <img
          src="https://ih1.redbubble.net/image.2415273964.3364/st,small,507x507-pad,600x600,f8f8f8.jpg"
          width={80}
          height={80}
          style={{ borderRadius: "10px", marginLeft: "40%", marginTop: "5%" }}
          alt="ghost"
        />
        <h2 style={{ margin: 0, color: "#4d4d4d", textAlign: "center" }}>There are no such events for today.</h2>
      </div>
    );
  } else {
    return (
      <div className="TodayCard" style={{ background: props.linearGradient }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0 }}>{props.EventName}</h1>
          <button className={`heartButton ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} size="2xl" />
          </button>
        </div>
        <p style={{ marginTop: 0, marginBottom: '1em', fontSize: '14px', textTransform: "uppercase" }}>{props.EventFrom} to {props.EventTo}</p>
        <p style={{ margin: '0.3em', fontSize: '14px' }}>{props.EventDesc}</p>
        <p style={{ marginTop: '0.3em', marginLeft: '0.3em', marginBottom: '1em', fontSize: '14px' }}>Criteria: {props.StudentCrit}</p>
        {props.RegStatus > 86400000 ? (
          <button className="regButton">
            <a href={props.RegLink} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              Register Now!
            </a>
          </button>
        ) : props.RegStatus > 0 ? (
          <button className="regButton">
            <a href={props.RegLink} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              Closing Soon..
            </a>
          </button>
        ) : (
          <button className="regButton" disabled>
            Closed :/
          </button>
        )}
      </div>
    );
  }
}

export default TodayCard;
