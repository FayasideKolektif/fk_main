'use client';

import React from 'react';
import Link from 'next/link';
import EventCard from '@/components/EventCard';

const Events = () => {
  // Dummy data for events
  const events = [
    { id: 1, title: 'Event 1', description: 'Description for Event 1' },
    { id: 2, title: 'Event 2', description: 'Description for Event 2' },
  ];

  // Loading state skeleton
  if (!events.length) {
    return (
      <div className="events_container">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="event-skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="events" hidden>
      <h3 style={{ letterSpacing: '12px', fontSize: '2.5rem' }}>Events</h3>
      <div className="events_container">
        {events.map((event) => (
          <EventCard key={event.id} title={event.title} description={event.description} />
        ))}
      </div>
      <Link href="/events">
        <button id="readmore" style={{ borderColor: 'silver', padding: '1em 2em' }}>All Events</button>
      </Link>
      <style jsx>{`
        .event-skeleton {
          border: 1px solid #ddd;
          padding: 20px;
          margin-bottom: 10px;
          border-radius: 4px;
        }
        .skeleton-title, .skeleton-description {
          background-color: #eee;
          border-radius: 4px;
        }
        .skeleton-title {
          height: 20px;
          width: 60%;
          margin-bottom: 10px;
        }
        .skeleton-description {
          height: 15px;
          width: 80%;
        }
      `}</style>
    </section>
  );
};

export default Events;
