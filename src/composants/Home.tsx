import './Home.css';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function Home() {
  return (
    <section id="home" className="hero-section section-container flex items-center min-h-screen pt-20">
      <div className="container max-w-[1200px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT CONTENT */}
        <div className="hero-content flex-1 text-left animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-cyan">Hello</span> <span className="wave-emoji">👋</span>
          </h2>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            I am <span className="text-cyan text-glow">Mohamed Ouakkaf</span>
          </h1>
          
          <h3 className="text-2xl font-semibold text-cyan mb-6">
            I'm Freelancer
          </h3>

          <div className="social-links flex gap-4 mb-8">
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaWhatsapp /></a>
            <a href="#" className="social-icon"><FaEnvelope /></a>
          </div>
          
          <h4 className="text-2xl font-semibold text-cyan mb-4">
            Spécialiste Cloud
          </h4>
          
          <p className="hero-subtitle text-gray-400 max-w-[600px] mb-8 leading-relaxed">
            Passionné par les technologies modernes et l'innovation digitale, je développe des
            solutions performantes combinant développement web, cloud computing et
            infrastructures réseau. Mon objectif est de concevoir des systèmes sécurisés,
            évolutifs et optimisés capables de répondre aux besoins des entreprises modernes
            et d'accompagner leur transformation digitale.
          </p>
          
          <div className="hero-actions flex gap-4">
            <a href="#contact" className="btn-primary-custom">
              Contact Me
            </a>
            <a href="#projects" className="btn-outline-custom">
              View Projects
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="hero-visual flex-1 flex justify-center lg:justify-end animate-float">
          <div className="image-glow-wrapper relative">
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-[80px] opacity-40"></div>
            {/* The user can place their bot image here. We use a placeholder path that implies their image from the screenshot */}
            <img 
              src="/bot.png" 
              alt="Bot Illustration" 
              className="relative z-10 w-[300px] lg:w-[450px] object-contain"
              onError={(e) => {
                // simple fallback if they don't have bot.png in public yet
                (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/4712/4712139.png"; 
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;