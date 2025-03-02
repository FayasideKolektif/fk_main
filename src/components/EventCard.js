'use client';

import React from 'react';

const EventCard = ({ title, description }) => {
  return (
    <div className="event-card">
      <h4>{title}</h4>
      <p>{description}</p>
      <style jsx>{`
        .event-card {
          border: 1px solid #ddd;
          padding: 20px;
          margin-bottom: 10px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default EventCard;
