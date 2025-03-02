'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/home.css';
import { ChevronDown } from 'lucide-react';
import Events from '@/components/Event';
import Articles from '@/components/Articles';

export default function Home() {
  const textRef = useRef(null);
  const preloaderRef = useRef(null);
  const circleRef = useRef(null);
  const columnsRef = useRef([]);

// Handle the circular text rotation
useEffect(() => {
  if (textRef.current) {
    const text = textRef.current;
    const textContent = "scroll. down. scroll. down"; 
    const numberOfLetters = textContent.length;
    
    // Calculate the angle between each letter
    const angleStep = 360 / numberOfLetters;
    
    // Generate the HTML for each letter
    text.innerHTML = textContent
      .split('')
      .map((char, i) => {
        // Calculate the angle for this specific letter
        const angle = i * angleStep;
        // Return the letter with the appropriate rotation transform
        return `<span style="position: absolute; left: 50%; top: 0; transform-origin: 0 75px; transform: rotate(${angle}deg)">${char}</span>`;
      })
      .join('');
  }
}, []);


// Handle preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      if (preloaderRef.current) {
        preloaderRef.current.style.transition = '1s ease-in-out';
        preloaderRef.current.style.display = 'none';
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'pop 1.2s ease-in-out';
        } else {
          entry.target.style.animation = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tagline').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="preloader" ref={preloaderRef}>
      <div className="logo" style={{ position: 'relative', width: 180, height: 100 }}>
        <Image 
          src="/images/logo_c-t.png" 
          alt="Logo" 
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
</div>

      <div className="introduction">
        <div className="intro-left">
          <p>Welcome to the</p>
          <h1>FAYASITE KOLEKTIF</h1>
        </div>
        <div className="intro-right">
          <div
            className="circle"
            ref={circleRef}
            onClick={() => {
              document.getElementById('values').scrollIntoView({ behavior: 'smooth' });
            }}
            id="rotatetext"
          >
            <div className="text">
              <p ref={textRef}>scroll. down. scroll. down</p>
            </div>
            <a href="#values">
              <ChevronDown size={35} />
            </a>
          </div>
        </div>
      </div>

      <section
        className="about"
        style={{
          backgroundImage: 'url(/images/maskpattern.jpg)',
          height: '65vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <p className="tagline">
            A dynamic and radical space for decolonial exploration, critical dialogue, artistic expression, and community engagement.
          </p>
        </div>
      </section>

      <div className="columns" id="values">
        <div className="column">
          <div className="mouse_alerts" data-message="LEARN MORE">
            <h5 className="section-title" style={{marginBottom:0 }}>Imagining Decolonial Futures</h5>
            <p>
              The Fayasite Kolektif is both an artist collective and a dynamic space that serves as a hub for intersectional exploration, fostering critical dialogue, community empowerment, and the creative envisioning of decolonial futures.
            </p>
          </div>
          <div className="column-image mobile-hide" style={{ backgroundImage: 'url(/images/logo_c-t.png)' }}></div>
        </div>
        <div
          className="column column-reverse"
          ref={el => columnsRef.current[0] = el}
        >
          <div className="mouse_alerts" data-message="LEARN MORE">
            <h5 className='section-title' style={{marginBottom:0 }} >Exhibitions</h5>
            <p>
              Discover our current exhibition, &quot;even in retreat&quot;, where art explores resilience, activism, self-care, and social justice. Delve into the paradoxical strength of this phrase as it signifies both facing adversity and seeking restoration. These artworks reflect unwavering commitment, highlighting the beauty of persisting through setbacks. &quot;even in retreat&quot; embodies compassion, reminding us to heal amidst struggles. Engage with these intricate pieces, inviting personal connection and offering moments of wonder and reflection.
            </p>
          </div>
          <div className="column-image" style={{ backgroundImage: 'url(/images/retreat.png)' }}></div>
        </div>
      </div>


      <Articles />
      <Events />

      <section className="podcast">
        <div className="podcast-container">
          <div className="podcast-info">
            <h3 className='section-title'>The Podcast</h3>
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
