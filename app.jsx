import React, { useRef, useEffect, useState } from 'react';
import { X, Terminal, ExternalLink } from 'lucide-react';

// --- DATA SOURCE ---
const dataStreams = {
  experience: {
    color: '#00ff41', // Matrix Green
    content: [
      {
        title: "PROGRAM MANAGER - ENTERPRISE SERVICES DATA",
        org: "Raytheon Technologies (RTX)",
        date: "June 2025 - Present",
        loc: "New York, NY",
        log: ">> Executing projects to create an enterprise-wide common data model and applying advanced analytics to core processes.",
        log2: ">> Leading development of data products to increase yield for the AMRAAM missile and driving data standardization initiatives within Xeta Cloud.",
        status: "ACTIVE"
      },
      {
        title: "R&D ENGINEER (INTERN) - BATTERY MODULES",
        org: "General Motors",
        date: "April 2024 - August 2024",
        loc: "Warren, MI",
        log: ">> Developed, designed, and organized experiments to study material capabilities for the next generation of electric vehicle production.",
        log2: ">> Saved $50,000 in battery module production costs by determining optimized module treatment methods through Python surface regression fitting.",
        status: "COMPLETE"
      },
      {
        title: "ANALYTICS ENGINEER (INTERN) - ADVANCED ANALYTICS",
        org: "Seeq Corporation",
        date: "June 2023 - August 2023",
        loc: "Seattle, WA",
        log: ">> Interface directly with clients to customize Seeq systems. Created $450,000 in revenue by constructing an ETL pipeline for Owens Corning.",
        log2: ">> Discovered $4M in potential gains by designing analytics software with a Vuetify UI to monitor batches and process 2 TB of data.",
        status: "COMPLETE"
      },
      {
        title: "MANUFACTURING ENGINEER (CO-OP) - POWER SYSTEMS",
        org: "Raytheon Technologies - Collins Aerospace",
        date: "May 2022 - December 2022",
        loc: "Rockford, IL",
        log: ">> Optimized human-technology interfaces to decrease costs and streamline production of aerospace generators.",
        log2: ">> Reduced Boeing generator cleaning cycle time by 50% (27 minutes) by analyzing oil residue data and implementing new cleaning procedures.",
        status: "COMPLETE"
      }
    ]
  },
  projects: {
    color: '#00b8ff', // Cyber Blue
    content: [
      {
        title: "SOFTWARE ENGINEERING COMPETITIONS",
        log: ">> Won 1st place ($600) at HackAttack for e-learning platform (React). Won 2nd place ($1200) at BC Hacks for responsive dorm placement site.",
        log2: ">> Placed 2nd against 200 students at Okanagan SWE with a Python bomb-sweeping simulation. Stack: Python, Java, HTML, CSS.",
        status: "AWARDED"
      },
      {
        title: "BOTANICAL AUTOMATION HEALTH SYSTEM",
        log: ">> Designed greenhouse-health user interface by unifying local microcontroller data collection with online IoT platform.",
        log2: ">> Leveraged ESP32 wireless connectivity for live data feedback. Stack: C++, ThinkSpeak, IoT, Arduino IDE.",
        status: "IOT"
      },
      {
        title: "CANCER CELL DATA TRANSFORMATION",
        log: ">> Discovered 7 key cell features to identify malignant cancer growths by applying machine learning and dimensionality reduction.",
        log2: ">> Results verified on 10,000 samples from John Hopkins. Stack: PyTorch, Numpy, Pandas, Matplotlib, Seaborn.",
        status: "ML/AI"
      },
      {
        title: "CSA HIGH ALTITUDE BALLOON CHALLENGE",
        log: ">> Launched high-altitude balloon with Canadian Space Agency. Designed apparatus to test silicon semiconductor efficiency.",
        log2: ">> Mitigated single-event upsets through rigorous circuit design and technical writing proposals.",
        status: "AEROSPACE"
      },
      {
        title: "UBCO CONCRETE TOBOGGAN TEAM",
        log: ">> Poured 15 batches of experimental concrete and conducted hydraulic press testing for Great Northern Concrete Toboggan Race.",
        log2: ">> Recorded and analyzed material data to ensure fit within strict competition specification parameters.",
        status: "CIVIL"
      }
    ]
  },
  education: {
    color: '#ffb800', // Industrial Amber
    content: [
      {
        title: "MASTERS IN COMPUTER SCIENCE",
        org: "University of Illinois Urbana-Champaign",
        date: "Expected August 2025",
        log: ">> Specialized in Data Curation and Engineering."
      },
      {
        title: "BACHELOR OF APPLIED SCIENCE IN ENGINEERING",
        org: "The University of British Columbia",
        date: "2020 - 2025",
        log: ">> Focused on Industrial Automation, hardware-software integration, and project management."
      },
      {
        title: "SPECIALIZATION IN ML & DATA ANALYTICS",
        org: "DTU - Technical University of Denmark",
        date: "December 2022 - May 2023",
        log: ">> Exchange program focused on Machine Learning algorithms and large-scale data analytics."
      }
    ]
  },
  personal: {
    color: '#ff0055', // Neon Red
    content: [
      {
        title: "LIFESTYLE & PACIFIC NORTHWEST",
        log: ">> Avid Pickleball player and explorer of the Pacific Northwest. Fueled by Earl Grey tea and peanut butter & banana sandwiches.",
        log2: ">> Constant listener of Brandon Sanderson audiobooks. Enthusiast of personal finance strategies and optimization.",
        status: "HOBBY"
      },
      {
        title: "WORK PHILOSOPHY & COMMUNICATION",
        log: ">> Strong advocate for company handbooks as the single source of truth and asynchronous communication workflows.",
        log2: ">> Proponent of AI-driven search tools and establishing good international communication practices.",
        status: "ETHOS"
      },
      {
        title: "CO-FOUNDER: SPACE MENs",
        log: ">> Leading an engineering team to develop technical visualizations and research fluid dynamics in microgravity.",
        log2: ">> Managing cross-platform social media presence to communicate our mission of addressing menstrual health in space exploration.",
        status: "PASSION"
      }
    ]
  }
};

const App = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeLane, setActiveLane] = useState(null);
  const [lockedLane, setLockedLane] = useState(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  // --- PARTICLE SYSTEM ---
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  // Initialize Particles
  useEffect(() => {
    const initParticles = () => {
      const p = [];
      const laneCount = 4;
      const particlesPerLane = 60; 
      const streamKeys = Object.keys(dataStreams);

      for (let i = 0; i < laneCount; i++) {
        const laneKey = streamKeys[i];
        for (let j = 0; j < particlesPerLane; j++) {
          p.push({
            x: Math.random() * window.innerWidth, 
            y: 0,
            offsetX: 0, 
            offsetY: 0,
            lane: i,
            laneKey: laneKey,
            speed: Math.random() * 2 + 1,
            char: Math.random() > 0.5 ? '1' : '0',
            size: Math.random() * 10 + 10,
            opacity: Math.random() * 0.5 + 0.1,
            isWord: Math.random() > 0.95, 
            word: laneKey === 'personal' ? 'BEYO' : laneKey.toUpperCase().substring(0, 4)
          });
        }
      }
      particles.current = p;
    };

    initParticles();
    
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ w: clientWidth, h: clientHeight });
        if (canvasRef.current) {
          canvasRef.current.width = clientWidth;
          canvasRef.current.height = clientHeight;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Animation Loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.w === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const laneHeight = dimensions.h / 4;
    
    const render = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
      ctx.fillRect(0, 0, dimensions.w, dimensions.h);

      const streamKeys = Object.keys(dataStreams);

      // Draw Lines & Labels
      streamKeys.forEach((key, index) => {
        const yPos = index * laneHeight;
        const color = dataStreams[key].color;
        const isHovered = activeLane === index;
        const isLocked = lockedLane === key;

        // Draw Lane Line
        ctx.beginPath();
        ctx.moveTo(0, yPos + laneHeight / 2);
        ctx.lineTo(dimensions.w, yPos + laneHeight / 2);
        ctx.strokeStyle = isLocked ? color : (isHovered ? color : '#222');
        ctx.lineWidth = isLocked ? 2 : 1;
        ctx.stroke();

        // Draw Label
        ctx.font = '12px "Courier New", monospace';
        ctx.fillStyle = isLocked || isHovered ? color : '#444';
        const label = `${key.toUpperCase()}_STREAM_0${index+1}`;
        ctx.fillText(label, 20, yPos + laneHeight / 2 - 10);
      });

      // Update and Draw Particles
      particles.current.forEach(p => {
        const laneY = (p.lane * laneHeight) + (laneHeight / 2);
        const color = dataStreams[p.laneKey].color;
        
        const isHovered = activeLane === p.lane;
        const isLocked = lockedLane === p.laneKey;
        
        let speedMultiplier = 1;
        
        if (isLocked) {
          speedMultiplier = 0.1; 
        } else if (isHovered) {
           speedMultiplier = 0.5;
        }

        // --- PHYSICS ---
        const currentX = p.x + p.offsetX;
        const currentY = laneY + p.offsetY;
        
        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        
        const dx = currentX - mx;
        const dy = currentY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;

        if (dist < repulsionRadius) {
          const force = (repulsionRadius - dist) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          p.offsetX += Math.cos(angle) * force * 15;
          p.offsetY += Math.sin(angle) * force * 15;
        }

        // Return to lane spring
        p.offsetX *= 0.92;
        p.offsetY *= 0.92;

        // Move
        p.x += p.speed * speedMultiplier;
        
        // Loop
        if (p.x > dimensions.w + 50) p.x = -50;

        // Draw
        ctx.fillStyle = color;
        ctx.globalAlpha = isLocked ? 1 : (isHovered ? 0.8 : p.opacity);
        ctx.font = `${p.size}px "Courier New", monospace`;
        
        const renderX = p.x + p.offsetX;
        const renderY = laneY + p.offsetY;

        if (p.isWord) {
            ctx.fillText(p.word, renderX, renderY + 5);
        } else {
            ctx.fillText(p.char, renderX, renderY + 5);
        }
        
        ctx.globalAlpha = 1;

        // Divert Line
        if (isLocked && renderX > dimensions.w / 2 - 150 && renderX < dimensions.w / 2 + 150) {
           if (Math.random() > 0.92) { 
             ctx.beginPath();
             ctx.moveTo(renderX, renderY + 10);
             ctx.lineTo(renderX, renderY + 40 + Math.random() * 20); 
             ctx.strokeStyle = color;
             ctx.lineWidth = 0.5;
             ctx.stroke();
           }
        }
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [dimensions, activeLane, lockedLane]);

  // Handle Mouse Move
  const handleMouseMove = (e) => {
    if (!canvasRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    };

    if (!lockedLane) {
      const laneHeight = dimensions.h / 4;
      const laneIndex = Math.floor(mousePos.current.y / laneHeight);
      if (laneIndex >= 0 && laneIndex < 4) setActiveLane(laneIndex);
      else setActiveLane(null);
    }
  };

  const handleClick = () => {
    if (activeLane !== null) {
      const keys = Object.keys(dataStreams);
      if (lockedLane === keys[activeLane]) setLockedLane(null);
      else setLockedLane(keys[activeLane]);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-screen bg-[#050505] overflow-hidden relative font-mono select-none"
    >
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--stream-color);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fff;
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className="absolute top-0 left-0 cursor-crosshair z-10"
      />

       {/* HEADER - Single Line Top Left */}
       <div className="absolute top-2 left-2 z-30 font-mono text-xs pointer-events-auto">
        <div className="flex items-center gap-4 bg-[#050505]/80 p-2 rounded border border-gray-900/50 backdrop-blur-sm shadow-sm shadow-black">
          <div className="flex items-center gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-white font-bold tracking-wide">HEANAN BIRD</span>
            <span className="text-gray-600">::</span>
            <span className="text-gray-400">PROGRAM MANAGER</span>
          </div>
          <div className="h-3 w-px bg-gray-800 mx-2"></div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/heanan-brody-bird-pmp-7ab559220" 
               target="_blank" 
               rel="noreferrer" 
               className="text-gray-500 hover:text-blue-400 transition-colors">
              [ LINKEDIN_UPLINK ]
            </a>
            <a href="https://github.com/Birdbh" 
               target="_blank" 
               rel="noreferrer" 
               className="text-gray-500 hover:text-green-400 transition-colors">
              [ GITHUB_REPO ]
            </a>
          </div>
        </div>
      </div>

      {/* DETAIL OVERLAY */}
      {lockedLane && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-xl bg-[#0a0a0a]/95 border border-[color:var(--stream-color)] p-5 pointer-events-auto backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300 mt-0"
               style={{ '--stream-color': dataStreams[lockedLane].color, boxShadow: `0 0 40px ${dataStreams[lockedLane].color}15` }}>
            
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: dataStreams[lockedLane].color }}>
                 {`${lockedLane.toUpperCase()}_STREAM_DATA`}
              </h2>
              <button 
                onClick={() => setLockedLane(null)}
                className="text-[10px] md:text-xs font-bold text-gray-500 hover:text-white transition-colors border border-gray-800 hover:border-gray-500 px-3 py-1 rounded bg-black"
              >
                [ CLOSE_TERMINAL ]
              </button>
            </div>

            <div className="space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
              {dataStreams[lockedLane].content.map((item, idx) => (
                <div key={idx} className="group relative pl-3 border-l-2 border-gray-800 hover:border-[color:var(--stream-color)] transition-colors py-1">
                  
                  <div className="flex flex-col mb-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm md:text-base font-bold text-gray-200 group-hover:text-white transition-colors">
                        {item.title}
                        </h3>
                         {item.status && (
                            <span className="text-[9px] text-gray-600 border border-gray-800 px-1 rounded ml-2 hidden sm:inline-block whitespace-nowrap">
                                {item.status}
                            </span>
                        )}
                    </div>
                    {(item.date || item.loc) && (
                        <div className="text-[10px] text-gray-500 font-mono mt-1">
                            {item.date} {item.loc ? `// ${item.loc}` : ''}
                        </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {item.org && <div className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">{item.org}</div>}
                    {item.log && <div className="text-gray-300 text-xs font-mono leading-relaxed">{item.log}</div>}
                    {item.log2 && <div className="text-gray-300 text-xs font-mono leading-relaxed">{item.log2}</div>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-2 border-t border-gray-800 flex justify-between items-center text-[9px] text-gray-600 font-mono uppercase">
               <div>Status: ONLINE</div>
               <div className="flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[color:var(--stream-color)]"></span>
                 Reading Stream...
               </div>
            </div>
          </div>
        </div>
      )}

      {!lockedLane && !activeLane && (
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center text-gray-800 text-xs animate-pulse pointer-events-none tracking-widest uppercase">
          [ INTERCEPT DATA STREAMS TO VIEW ]
        </div>
      )}

       {/* FOOTER STATS */}
       <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#080808] border-t border-gray-900 px-4 py-2 font-mono text-[10px] text-gray-500 flex justify-between md:justify-center md:gap-12 overflow-x-auto whitespace-nowrap select-none">
        <span className="hover:text-gray-300 transition-colors">
            CREDIT_HOURS_LOGGED: <span className="text-green-500">162</span>
        </span>
        <span className="hover:text-gray-300 transition-colors">
            LECTURE_HOURS_ATTENDED: <span className="text-blue-500">5,400</span>
        </span>
        <span className="hover:text-gray-300 transition-colors">
            DATA_INTEGRITY_VIOLATIONS: <span className="text-red-500">ERR_OVERFLOW</span>
        </span>
        <span className="hover:text-gray-300 transition-colors">
            PICKLEBALL_PTS_LOST: <span className="text-yellow-500">404</span>
        </span>
        <span className="hover:text-gray-300 transition-colors">
            PB&B_SANDWICHES_EATEN: <span className="text-purple-500">1,024</span>
        </span>
      </div>
    </div>
  );
};

export default App;