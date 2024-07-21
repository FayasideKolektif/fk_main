// src/pages/index.js
'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/home.css'
export default function Home() {
  useEffect(() => {
    const text = document.querySelector('.text p');
    if (text) {
      text.innerHTML = text.innerText
        .split('')
        .map((char, i) => `<span style="transform:rotate(${i * 13.3}deg)">${char}</span>`)
        .join('');
    }

    let preloader = document.getElementById('preloader');
    setTimeout(() => {
      if (preloader) {
        preloader.style.transition = '1s ease-in-out';
        preloader.style.display = 'none';
      }
    }, 2500);

    const timeline = new ScrollTimeline({ source: document.documentElement });

    document.querySelectorAll('.column-reverse').forEach(($column) => {
      $column.style.flexDirection = 'column-reverse';
      $column.animate(
        {
          transform: [
            'translateY(calc(-100% + 100vh))',
            'translateY(calc(100% - 100vh))',
          ],
        },
        {
          fill: 'both',
          timeline,
        }
      );
    });

    let serviceItem = document.querySelectorAll('.tagline');
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.style.animation = 'pop 1.2s ease-in-out';
        } else {
          entry.target.style.animation = 'none';
        }
      });
    });

    serviceItem.forEach((block) => {
      observer.observe(block);
    });

    const mouseAlerts = document.querySelectorAll('.mouse_alerts');
    const circle = document.querySelector('.circle');
    mouseAlerts.forEach((mouseAlert) => {
      mouseAlert.addEventListener('mouseover', () => {
        const message = mouseAlert.getAttribute('data-message');
        if (circle) {
          circle.style.height = '100px';
          circle.style.width = '100px';
          circle.style.backgroundColor = 'black';
          circle.innerText = message ? 'LEARN MORE' : 'SCROLL →';
        }
      });

      mouseAlert.addEventListener('mouseout', () => {
        if (circle) {
          circle.style.height = '15px';
          circle.style.width = '15px';
          circle.style.borderRadius = '50%';
          circle.innerText = '';
          circle.style.backgroundColor = '#f82c14';
        }
      });
    });
  }, []);

  return (
    <>
      <div id="preloader">
        <div className="logo" style={{width:120,height:100}}>
          <Image src="/images/logo_c-t.png" alt="Your Logo" fill />
        </div>
      </div>

      <div className="introduction">
        <div className="intro-left">
          <p>Welcome to the</p>
          <h1>FAYASITE KOLEKTIF</h1>
        </div>
        <div className="intro-right">
          <div className="circle" onClick={() => window.location.href = '#values'} id="rotatetext">
            <div className="text">
              <p>scroll. down. scroll. down</p>
            </div>
            <a href="#values">
              <Image src="https://img.icons8.com/ios-filled/35/null/chevron-down.png" alt="icon-arrow down" width={35} height={35} />
            </a>
          </div>
        </div>
      </div>

      <section className="about" style={{ backgroundImage: 'url(/images/maskpattern.jpg)',height:'65vh',backgroundSize:'cover',backgroundPosition:'center'  }}>
        <div>
          <p className="tagline">
            A dynamic and radical space for decolonial exploration, critical dialogue, artistic expression, and community engagement.
          </p>
        </div>
      </section>

      <div className="columns" id="values">
        <div className="column">
          <div className="mouse_alerts" data-message="LEARN MORE">
            <h5>Imagining Decolonial Futures</h5>
            <p>
              The Fayasite Kolektif is both an artist collective and a dynamic space that serves as a hub for intersectional exploration, fostering critical dialogue, community empowerment, and the creative envisioning of decolonial futures.
            </p>
          </div>
          <div className="column-image" style={{ backgroundImage: 'url(/images/logo_c-t.png)'}}></div>
        </div>
        <div className="column column-reverse">
          <div className="mouse_alerts" data-message="LEARN MORE">
            <h5>Exhibitions</h5>
            <p>
              Discover our current exhibition, "even in retreat," where art explores resilience, activism, self-care, and social justice. Delve into the paradoxical strength of this phrase as it signifies both facing adversity and seeking restoration. These artworks reflect unwavering commitment, highlighting the beauty of persisting through setbacks. "even in retreat" embodies compassion, reminding us to heal amidst struggles. Engage with these intricate pieces, inviting personal connection and offering moments of wonder and reflection.
            </p>
          </div>
          <div className="column-image" style={{ backgroundImage: 'url(/images/Untitled design (4).png)' }}></div>
        </div>
      </div>

      <hr />

      <section className="articles">
        <h3>Articles</h3>
        <div className="articles-container mouse_alerts">
          {/* Replace with dynamic content */}
        </div>
        <Link href="/blog?category=article">
          <button id="readmore" style={{ borderColor: 'silver', padding: '1em 2em' }}>All Articles</button>
        </Link>
      </section>

      <section className="events">
        <h3 style={{ letterSpacing: '12px', fontSize: '2.5rem' }}>Events</h3>
        <div className="events_container">
          {/* Replace with dynamic content */}
        </div>
        <Link href="/events">
          <button id="readmore" style={{ borderColor: 'silver', padding: '1em 2em' }}>All Events</button>
        </Link>
      </section>

      <section className="podcast">
        <div className="podcast-container">
          <div className="podcast-info">
            <h3 style={{ letterSpacing: '12px', fontSize: '2.5rem' }}>The Podcast</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda rerum recusandae inventore voluptatem natus quaerat, suscipit aut explicabo nulla ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sed sequi esse magnam temporibus excepturi adipisci atque quas in doloribus?</p>
            <Link href="/podcast">
              <button id="readmore" className="readmore-podcast">Visit Podcast →</button>
            </Link>
            <ul className="podcasthost">
              <li><a href="#"><Image src="/icons/spotify.png" alt="spotify-logo" width={50} height={50} /></a></li>
              <li><a href="#"><Image src="/icons/applepodcast.png" alt="applepodcast-logo" width={50} height={50} /></a></li>
              <li><a href="#"><Image src="/icons/youtube.png" alt="youtube-logo" width={50} height={50} /></a></li>
            </ul>
          </div>
          <div className="podcast-image">
            <Image src="/images/podcast.png" alt="podcast image" width={300} height={300} />
          </div>
        </div>
      </section>

      <style jsx>{`
        .text {
          width: 100%;
          height: 100%;
          position: absolute;
          animation: rotate 10s linear infinite;
          font-size: medium;
        }
        .text span {
          position: absolute;
          left: 50%;
          transform-origin: 0 75px;
        }
        .circle {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: smaller;
          cursor: pointer;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
