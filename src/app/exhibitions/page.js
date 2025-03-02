'use client'
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import "@/styles/home.css"

// Dummy data to replace Django template context
const exhibitions = [
  {
    id: 1,
    title: "Resilience in Motion",
    description: "This artwork explores the tension between movement and stillness, representing the dynamic nature of resilience even in moments of retreat.",
    author: "Maya Johnson",
    material: "Mixed media on canvas",
    image: "/exhibitions/aeroplane.jpeg",
    files: "/files/exhibition1.pdf"
  },
  {
    id: 2,
    title: "Spaces Between",
    description: "An exploration of the liminal spaces where rest and action coexist, challenging our perception of productivity and self-care.",
    author: "James Rivera",
    material: "Digital photography",
    image: "/exhibitions/eye-service.jpeg",
    files: "/files/exhibition2.pdf"
  },
  {
    id: 3,
    title: "Collective Memory",
    description: "This piece examines how shared experiences shape our collective understanding of justice and community support systems.",
    author: "Aisha Kweli",
    material: "Oil on canvas",
    image: "/exhibitions/houseONfire.jpeg",
    files: "/files/exhibition3.pdf"
  },
  {
    id: 4,
    title: "Voices in Retreat",
    description: "A meditation on the power of silence and reflection as forms of resistance against oppressive systems.",
    author: "Carlos Mendez",
    material: "Sound installation and sculpture",
    image: "/exhibitions/organ-donor.jpeg",
    files: "/files/exhibition4.pdf"
  },
  {
    id: 5,
    title: "Ancestral Healing",
    description: "This work connects intergenerational trauma with healing practices, acknowledging the role of family and community in care.",
    author: "Nadia Okafor",
    material: "Textiles and found objects",
    image: "/exhibitions/red-gesture.jpeg",
    files: "/files/exhibition5.pdf"
  },
  {
    id: 6,
    title: "Systemic Echoes",
    description: "An artistic commentary on how systems of oppression resonate through time, affecting our ability to truly rest and recover.",
    author: "Theo Chang",
    material: "Interactive installation",
    image: "/exhibitions/milkblood.jpeg",
    files: "/files/exhibition6.pdf"
  },
  {
    id: 7,
    title: "Care as Resistance",
    description: "This piece reimagines care work as a radical act of resistance against capitalist notions of productivity and worth.",
    author: "Elena Vasquez",
    material: "Video installation",
    image: "/exhibitions/limited-edition.jpeg",
    files: "/files/exhibition7.pdf"
  },
  {
    id: 8,
    title: "The Space Between Breaths",
    description: "A visual meditation on the importance of pause and breath in activism and social justice work.",
    author: "Omar Khalid",
    material: "Charcoal and pastel on paper",
    image: "/exhibitions/devillies.jpeg",
    files: "/files/exhibition8.pdf"
  }
];

export default function Exhibition() {
  const [popupActive, setPopupActive] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState(null);

  const openPopup = (exhibition) => {
    setSelectedExhibition(exhibition);
    setPopupActive(true);
  };

  const closePopup = () => {
    setPopupActive(false);
  };

  return (
    <div>
      <Head>
        <title>Even in Retreat | Exhibition</title>
        <meta name="description" content="Exhibition series exploring resilience, activism, and self-care" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Storytelling Container Section */}
        <section className="storytelling-container mouse_alerts" data-message="Click Image">
          <div className="container">
            <div className="scope">
              <div className="scope_center">
                <Image src="/exhibitions/logo_t.png" alt="Exhibition Logo" width={300} height={300} layout="responsive" />
              </div>
              
              {exhibitions.slice(0, 8).map((exhibition, index) => (
                <div key={exhibition.id} className="scope_item" style={{"--i": index + 1}}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                   // openPopup(exhibition);
                  }}>
                    <Image 
                      src={exhibition.image} 
                      alt={exhibition.title} 
                  
                      fill
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exhibition Overview Section */}
        <div>
          <div className="details-container">
            <div style={{maxWidth: "1100px", margin: "auto", marginBottom: "2rem"}}>
              <h1 className='section-title'>Exhibition Overview: &quot;even in retreat&quot;</h1>

              <p>Welcome to the current exhibition series titled &quot;even in retreat.&quot; This collection of art pieces delves deep into the complex interplay between resilience, activism, self-care, and the pursuit of social justice. Through this series, we explore the multifaceted meanings behind the phrase &quot;even in retreat,&quot; uncovering its paradoxical nature that simultaneously signifies strength in adversity and the need for restoration. &quot;even in retreat&quot; serves as both a rallying call and a contemplative expression. At its core, this phrase embodies the unwavering commitment we hold to each other and our shared mission for social justice. It is a testament to the fact that true strength and character are not only demonstrated in times of triumph, but are equally evident when navigating setbacks and challenges. It encapsulates the idea of persisting, even when circumstances may demand a temporary withdrawal or a reevaluation of our course. Yet, this phrase extends beyond these surface implications. It speaks to the necessity of acknowledging the importance of retreat, of stepping back and taking respite from the ongoing battle. Amid our shared struggles, we must recognize that compassion entails both enduring hardship together and granting ourselves space to heal and rejuvenate. The pieces in this collection are not meant to be rigidly deciphered or explicitly interpreted. They exist as intricate compositions that evoke a range of emotions and reactions but beyond that, they also serve as an aesthetic space for rest and wonder. While some might resonate with melodies of music, or text, they are first and foremost designed to provide aesthetic spaces for retreat. There is no predetermined narrative to uncover; these artworks are, first and foremost, aesthetic investments that invite viewers to engage on a personal and emotional level.</p>

              <h3 className='section-title'>From Retreat to Revelation</h3>
              <p>This series germinated from a period of retreat, a deliberate step back from the public sphere. Driven by exhaustion and a realisation of overexertion, I came to understand that the relentless pursuit of change can often lead to burnout or worst, turn one into a rat running in a wheel. It was during this retreat that I confronted my own limitations and the collective impact of our best efforts. I realised that the world&quot;s challenges weren&apos;t solely a result of our (in)actions; they were deeply rooted in systems that span generations, perpetuating historical exploitation and injustice. This collection stands as an exploration of resistance, care, family, self-representation, and rest. It emerges from a place of questioning the nature of our interventions within these systems and the role of self-care when it is often treated as secondary.</p>
              
              <p>The resonance of the series extends further through partnerships with friends and artists who have joined this creative conversation. Together, we orchestrate a symphony of diverse mediums and genres. Wan Shey, a collaborator on this journey, is contributing to a music album that amplifies the series&apos; themes. Meanwhile, hn. lyonga&apos;s poetic prowess breathes life into the core issues at hand. These collaborations foster a multi-dimensional experience, where each artist&apos;s perspective blends seamlessly into the tapestry of the series. &quot;even in retreat&quot; maintains its vibrant spectrum of mediums and genres, weaving together an intricate tapestry of ideas, textures, lives, and worlds. Visual art and music harmonise to convey emotions that words alone cannot encapsulate. These forms of expression serve as vessels for exploring the intricacies of resistance, self-care, familial bonds, the potency of speech, identity representation, and the indispensable need for retreat. Through this diverse collaboration, the series gains depth, layers, and an amplified resonance. The collective effort reveals that the concept of &quot;even in retreat&quot; transcends individual interpretations and becomes a shared conversation about navigating the complex terrain of social justice, resilience, and rejuvenation. By uniting narratives and viewpoints, &quot;even in retreat&quot; evolves into more than just an art series; it becomes a platform for dialogue and exchange. It transforms into a space where artists converse across mediums, breathing life into themes that touch the core of our existence.</p>
              
              <p>The collaborations within the &quot;even in retreat&quot; series venture into an entirely new dimension of care, inviting critical contemplation of established notions of therapy and the inherent pathologization that often accompanies them. This creative alliance, while questioning established norms, reframes friendships and families as potent sources of caregiving, carving a path toward a more holistic understanding of support. Within this collaborative exploration, fundamental questions emerge about the prevailing definitions of therapy and rest. The series prompts us to consider whether our perceptions of rejuvenation are entangled with the idea of restoring our capacity to function within a system that exploits us. A system that not only overlooks our need for rest but also insists that we must become efficient and productive components of it. These collaborations urge us to examine how deeply we have internalised these systemic expectations. It&apos;s the very same system that not only compels us to be productive but also demands that we love and find satisfaction in the very jobs that estrange and exploit us. This system&apos;s influence extends to the point of pathologizing our natural need for rest, pushing us into a relentless cycle of &quot;efficiency&quot; that masks the systemic inequities at play.</p>
              
              <p>By fostering these collaborations, the &quot;even in retreat&quot; series challenges us to reconsider our roles within this system. It prods us to question whether rest should merely be a means to reinforce our ability to engage with a system that often perpetuates our oppression. Through these collaborative endeavours, we reposition friendships and families as caregivers. This shift reconceptualizes care as a communal effort, emphasising the importance of solidarity, understanding, and collective healing. The series encourages us to find refuge within the networks we create, rather than relying solely on impersonal and potentially alienating systems. &quot;even in retreat&quot; calls us to reevaluate our relationship with the systems that govern us, as well as our relationships with each other. It underscores the necessity of creating spaces for authentic rest and rejuvenation, unburdened by the pressures of a society that values productivity over humanity.</p>
            </div>
          </div>
        </div>

        {/* Popup */}
        {popupActive && selectedExhibition && (
          <div className="popup active" id="popup">
            <div className="popup-content">
              <div style={{display: "flex", justifyContent: "right", padding: "1rem 2rem"}}>
                <button className="close-btn" onClick={closePopup}>
                  <Image src="/icons/x.png" alt="Close" width={40} height={40} />
                </button>
              </div>
              <div className="popup-flex">
                <div className="popup-image">
                  <Image 
                    src={selectedExhibition.image} 
                    alt={selectedExhibition.title} 
                    width={500} 
                    height={400} 
                    layout="responsive"
                  />
                </div>

                <div className="popup-description">
                  <div className="details-container">
                    <p className="details">Artist: <span>{selectedExhibition.author}</span></p>
                    <p className="details">Material: <span>{selectedExhibition.material}</span></p>
                  </div>
                  <div className="popup-title">{selectedExhibition.title}</div>
                  <div className="popup-description">{selectedExhibition.description}</div>
                  
                  {selectedExhibition.files && (
                    <a href={selectedExhibition.files} className="downloadfiles" target="_blank" rel="noreferrer">
                      <div className="filename">
                        {selectedExhibition.title} - Full PDF file
                      </div>
                      <span>
                        <Image src="/icons/pdf.png" width={35} height={35} alt="pdf-icon" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        body {
          text-align: justify;
        }
        h1 {
          font-size: 3rem;
          font-family: 'Times New Roman', Times, serif;
          letter-spacing: 3px;
          margin-block: 1rem 2rem;
          text-transform: capitalize;
          text-align: center;
        }
        h3 {
          margin-block: 2rem 1rem;
          font-family: 'Times New Roman', Times, serif;
        }
        .popup {
          display: none;
        }
        .active {
          display: block;
          width: 100%;
          min-height: 100vh;
          background-color: whitesmoke;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 4;
          overflow-y: auto;
        }
        .popup-flex {
          display: flex;
          gap: 2rem;
          padding: 1rem;
          width: 100%;
          max-width: 900px;
          margin: auto;
        }
        .popup-image {
          min-width: 300px;
          border: 4px solid black;
          padding: 7px;
        }
        .popup-description p, p {
          font-size: large;
          line-height: 2rem;
          margin-bottom: 1rem;
        }
        .popup-title {
          font-family: 'Times New Roman', Times, serif;
          font-size: 2.1rem;
          margin-block: 2rem;
        }
        button {
          background-color: white;
          border: none;
          cursor: pointer;
        }
        #mousecircle {
          z-index: 3;
        }
        .details {
          font-weight: bold;
          font-family: 'Times New Roman', Times, serif;
        }
        .details span {
          font-weight: normal;
        }
        .details-container {
          margin-top: 2rem;
        }
        a.downloadfiles {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: white;
          gap: 1rem;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          text-decoration: none;
          color: black;
          margin-top: 2rem;
        }
        
        @media screen and (max-width: 768px) {
          .popup-flex {
            flex-direction: column;
            overflow-y: scroll;
            min-height: 100vh;
          }

          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}