// pages/about.js
'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  Megaphone, 
  UserCheck, 
  Users2, 
  Clock, 
  BookOpen, 
  Globe, 
  Calendar, 
  MessageSquare, 
  Heart,
  Mail,
  X
} from 'lucide-react';

// Sample data for the support section
const supportItems = [
  {
    icon: <Users size={24} />,
    title: "Financial Contributions:",
    description: "Donations provide vital resources for our initiatives, enabling us to create and maintain our physical and online spaces, organize events, curate exhibitions, and develop educational programs."
  },
  {
    icon: <Megaphone size={24} />,
    title: "Spread the Word:",
    description: "Sharing information about the Fayasite Kolektif through social media, word of mouth, or other communication channels helps raise awareness about our work and attracts potential supporters."
  },
  {
    icon: <UserCheck size={24} />,
    title: "Participate:",
    description: "Engage with our events, workshops, discussions, and exhibitions. Your active participation enriches the conversation and contributes to our vibrant community."
  },
  {
    icon: <Users2 size={24} />,
    title: "Collaborate:",
    description: "If you have expertise, resources or ideas that align with our mission, consider collaborating on projects, events or initiatives that amplify our impact."
  },
  {
    icon: <Clock size={24} />,
    title: "Volunteer:",
    description: "Contributing your time and skills to assist with organizing events, maintaining our spaces, or supporting various activities can make a meaningful difference."
  },
  {
    icon: <BookOpen size={24} />,
    title: "Donate Materials:",
    description: "If you have books, art supplies, or resources that align with our goals, consider donating them to enrich our library or artistic endeavors."
  },
  {
    icon: <Globe size={24} />,
    title: "Online engagement:",
    description: "Interact with our online content, share our posts, and engage in conversations to help us build a vibrant online community."
  },
  {
    icon: <Calendar size={24} />,
    title: "Attend Events:",
    description: "Participate in our talks, discussions, exhibitions, and performances to support the intellectual and artistic vibrancy of our space."
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Provide Feedback:",
    description: "Your insights and feedback can help us improve and refine our initiatives to better serve our community's needs."
  },
  {
    icon: <Heart size={24} />,
    title: "Advocate:",
    description: "Advocate for decolonial education, critical dialogue, and community empowerment in your circles, helping to spread the values we stand for."
  }
];

// Project gallery images
const galleryImages = [
  "/images/FR4-1.png",
  "/images/FR1-1.png",
  "/images/FR2-1.png"
];

// Component for support items
const SupportItem = ({ icon, title, description }) => (
  <li>
    <strong className="support-title">
      {icon} {title}
    </strong>
    {description}
  </li>
);

export default function About() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setMessages([{ type: 'success', text: 'Successfully joined our community!' }]);
    setShowContactForm(false);
  };

  return (
    <main>
      {messages.length > 0 && (
        <ul className="messages">
          {messages.map((message, index) => (
            <li key={index} className={message.type}>
              {message.text}
            </li>
          ))}
        </ul>
      )}
      
      <div className="hero-image">
        <Image src="/images/logo_t.png" alt="Fayasite Kollektif Logo" width={1200} height={400} layout="responsive" />
      </div>

      <div className="about-text">
        <h1 hidden>About the Fayasite Kollektif</h1>
        <p>
          The &quot;Fayasite Kollectif&quot;, derived from the term &quot;Fireside&quot;, embodies an artistic collective, a community hub, and a library all converging to earnestly envision decolonized futures. Rooted in the conviction that we are not merely inheritors of the Earth from our ancestors but temporary stewards entrusted by our children, we see ourselves as igniters capable of kindling fresh flames from age-old sparks. Central to our ethos is the concept of the fireside—a communal arena where growth, learning, knowledge transmission, narratives, shared nourishment, and collective aspirations for a world emancipated from colonisation, enslavement, capitalism, patriarchy, and other oppressive forces converge. The Fayasite Kollectif serves as an audacious and experimental domain for world-building, where actions and expressions manifest as gestures towards decolonial worlding.
        </p>
        <p>
          We are animated not solely by our discerning evaluation/experience of the violence, estrangement, and subjugation ingrained within the colonial, capitalist, and patriarchal global framework, along with their intricate intersections. Ours is a realm that actively partakes in an uncompromising critique of these frameworks. Yet, our radical stance transcends mere critique; it encompasses a profound sense of concern. The fayasite, emblematic of our unified vigour, practices, and aspirations, is more than a tool for dismantling Western-imposed concepts and oppressive structures in the pursuit of decolonization. It also encapsulates our radical devotion to care. We look at or to the fayasite as the culmination of our collective energies and desires, a haven of warmth and illumination—a space where we collectively seek solace and enlightenment.
        </p>
        <p>
          Our unwavering dedication to decolonial worlding, world-making, and decolonial futurities is at the very core of our identity, evident from our name itself—Fayasite, derived from the pidgin term for &quot;fireside&quot;. The fireside, both in its physical and conceptual form, has been a locus of knowledge-sharing within our communities, a space where familial histories, political trajectories, and cultural nourishment intersect over shared meals, political discussions, aesthetic expressions, and corporeal connections. Our mission revolves around the reclamation and revitalization of indigenous cultures, languages, traditions, and knowledge systems. However, we view these not only as alternative epistemologies to Western thought, but as spaces where new narratives, possibilities, and worlds can be articulated and nurtured. This is underscored by our preference for pidgin English, a creole language that mirrors our vision of cultural intersection and synthesis.
        </p>
        <p>
          Although our physical presence will manifest in Yaoundé, Cameroon, our spirit embraces Transnational Solidarity—a unity that extends beyond geographical borders. Leveraging our online platform and exhibitions, we strive to foster networks of collaboration and solidarity across borders, rallying against colonial legacies collectively, even as national boundaries persist. At the heart of our pursuits stands the envisioned library—a haven destined to house radical anti-colonial and anti-capitalist literature, both in written and experiential forms. This library is envisaged as a spark of fire, a source of ignition that fuels our innate capacity to conceive uncharted realms and futures. Through engagement with these texts and embodied expressions, we foster the nourishment required to envision alternatives and dismantle the constraints of the present.
        </p>
        <p>
          The architectural design for the Fayasite space is an embodiment of our collective vision, reflecting our commitment to fostering a multifunctional haven for creativity, reflection, education, and community engagement. This versatile space has been thoughtfully conceptualised to facilitate a range of activities that align with our principles of decolonial world-making and radical criticism. Once built, it will host a library that can also serve as a performance area, auditorium, community gathering space, exhibition space. The space will also host an art studio and music recording studio, these dedicated studios embody the power of creativity in driving change.
        </p>
        <p>
          Your support is essential in bringing this visionary space to life. Your contribution not only fuels the physical construction but also nourishes the ideas and ideals that will flourish within its walls. As a collective driven by care, critique, and radical transformation, we invite you to be part of our journey. Together, we can cultivate a space that transcends the limitations of the past and cultivates futures grounded in justice, equity, and self-determination.
        </p>
      </div>

      <div>
        <div className="flex">
          {galleryImages.map((image, index) => (
            <div key={index}>
              <div className="img-description">
                <Image src={image} alt="project image" width={400} height={300} layout="responsive" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="support">
        <h3 className='section-title'>How to Support Us</h3>
        <p style={{ textAlign: 'center' }}>
          Supporting the Fayasite Kolektif can take several forms, and your contribution is deeply valued in advancing our mission of decolonial exploration, critical dialogue, and community empowerment. Here are ways you can support us:
        </p>
        <ul>
          {supportItems.map((item, index) => (
            <SupportItem 
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      </section>

      <h3 style={{ textAlign: 'center', marginBlock: '3rem', fontSize: '1.9rem', fontWeight: 'normal', lineHeight: '2rem' }}>
        Your Support contributes to the transformational work we&quot;re undertaking. Whether through financial contributions, active engagement, collaboration, or advocacy, your involvement helps shape a future rooted in justice, equity and self-determination
      </h3>
      
      <div style={{ display: 'flex' }}>
        <button id="readmore" className="about-buttons" onClick={toggleContactForm}>
          Join Our Community
        </button>
        <button 
          id="readmore" 
          className="about-buttons" 
          onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=E58WHJJ76W992', '_blank')}
        >
          Donate
        </button>
      </div>
      
      <div>
        <Link href="mailto:mail@defayasitekolektif.org">
          <button id="readmore" className="about-buttons">
            @ Contact Us →
          </button>
        </Link>
      </div>

      {/* Contact Form Modal */}
      <div className="contactsection" id="contactsection" style={{ display: showContactForm ? 'block' : 'none' }}>
        <div className="contact-wrap">
          <div style={{ textAlign: 'right' }}> 
            <span 
              style={{ fontSize: '36px', color: 'black', cursor: 'pointer', fontWeight: 'bolder' }}
              onClick={toggleContactForm}
            >
              <X size={36} /> 
            </span>
          </div>
          <div className="contact-top"> 
            <div id="locationinfo"> 
              <p className="contact-heading">Tel: +123456789</p>
              <p className="contact-info">
                Yaoundé, Cameroon
              </p>
            </div>
            <div>
              <p className="contact-heading">CONTACT INFO</p>
              <p>mail@defayasitekolektif.org</p>
            </div>
          </div>
          <div className="contact-form">
            <p className="contact-heading">MESSAGE US</p>
            <form id="my-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email..." required />
              <input 
                type="submit" 
                value="Join" 
                id="my-form-button" 
                style={{ backgroundColor: 'black', color: 'white' }} 
              />
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        main {
          margin: auto;
          max-width: 1200px;
          font-size: large;
          line-height: 2rem;    
        }
        .about-text p {
          text-align: justify;
          margin-block: 2rem;
        }
        h1 {
          font-family: 'Times New Roman', Times, serif;
        }
        header {
          color: #f1f1f1;
          position: sticky;
          background-color: white;
          height: 70px;
          top: 0;
          left: 0;
          width: 100%;
          margin-bottom: 1rem;
          display: none;
        }
        header ul {
          display: flex;
          overflow-x: scroll;
        }
        header li {
          min-width: 100px;
          font-size: 1.7rem;
          padding: 1rem;
          letter-spacing: 3px;
        }
        header li:hover {
          border-bottom: 2px solid black;
        }
        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-block: 2rem;
        }
        .img-description {
          min-width: 300px;
          position: relative;
        }
        .img-description img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        h3 {
          font-family: 'Times New Roman', Times, serif;
          font-size: 4rem;
        }
        .mission_vision h3 {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .mission_vision {
          margin-block: 1rem;
        }
        .mission_vision p {
          padding-block: 1rem 2rem;
        }
        .hero-image {
          width: 100%;
          margin-bottom: 2rem;
        }
        .hero-image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .support li {
          margin-block: 1rem;
          padding: 2rem;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        }
        .support li:hover {
          background-color: whitesmoke;
        }
        .support ul {
          margin-bottom: 4rem;
        }
        .support strong {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        li strong img {
          width: 40px;
        }
        .support-title {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .contactsection {
          background-color: #fcfbfb;
          color: #1e453e;
          position: fixed;
          top: 0;
          left: 0;
          min-height: 100vh;
          padding: 5%;
          z-index: 10;
          width: 100%;
          margin: auto;
          font-size: medium;
          overflow-y: scroll;
        }
        .contact-heading {
          font-size: x-large;
          color: white;
          margin-bottom: 10px;
        }
        .contact-wrap {
          width: 100%;
        }
        .contactsection form {
          text-align: center;
          width: 100%;
        }
        .contactsection input, .contactsection textarea {
          width: 100%;
          margin: auto;
          margin-block: 10px;
          padding: 10px;
          font-size: calc(14px + 1.2vw);
          border: none;
          border-bottom: 2px solid #617c77;
          color: #1e453e;
          -webkit-appearance: none;
          -webkit-border-radius: 0px;
        }
        section.support {
          min-height: 100vh;
          padding-top: 4rem;
          border-top: 1px solid whitesmoke;
        }
        section h3 {
          margin-bottom: 3rem;
          text-align: center;
        }
        .about-buttons {
          padding: 2rem !important; 
          border-color: grey !important;
          font-size: 1.5rem !important;
        }
        .messages li {
          padding: 1rem;
          text-align: center;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        }
        li.success {
          background-color: #dff0d8;
        }
        li.error {
          background-color: #f2dede;
        }
        @media screen and (max-width: 768px) {
          main {
            padding: 1rem;
          }
          .flex {
            display: block;
          }
          .flex > div {
            margin-bottom: 1rem;
          }
          h3 {
            font-size: 3rem;
            line-height: 3rem;
          }
        }
      `}</style>
    </main>
  );
}