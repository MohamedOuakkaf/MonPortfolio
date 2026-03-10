import './About.css';
import photo from './photo.png';

function About() {
  return (
    <section id="about" className="section-container min-h-screen flex items-center pt-20">
      <div className="container max-w-[1200px] mx-auto px-6 w-full">

        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-wider inline-block relative pb-4">
            ABOUT
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-400"></span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT: IMAGE */}
          <div className="about-image-wrapper flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-[2rem] blur-[60px] opacity-20 transform translate-y-4"></div>
              {/* The user can place their photo here. Using a generic avatar placeholder in the meantime */}
              <img
                src={photo}
                alt="Mohamed Ouakkaf"
              />
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="about-content flex-1 text-left">
            <h3 className="text-3xl lg:text-4xl font-bold mb-3">
              Hi There! I'm <span className="text-cyan text-glow">Mohamed Ouakkaf</span>
            </h3>

            <h4 className="text-xl font-semibold mb-6">
              Network & Cloud Engineer & Fullstack Developer
            </h4>

            <p className="text-gray-300 leading-relaxed mb-8 text-[1.05rem]">
              I am <span className="text-cyan font-medium">Mohamed Ouakkaf</span>, a passionate <span className="text-cyan font-medium">Full-Stack Developer</span> with a strong background in <span className="text-cyan font-medium">network infrastructure</span> and <span className="text-cyan font-medium">cloud computing</span>. I enjoy building modern web applications and designing efficient digital solutions that integrate <span className="text-cyan font-medium">development, networking, and cloud technologies</span>. Currently, I study at the Institute of Training in Offshoring Professions of ICT and Audiovisual (OFPPT). My specialization covers <span className="text-cyan font-medium">Digital Infrastructure, Cloud Computing, and Web Development</span>. Through my studies and projects, I have gained solid skills in <span className="text-cyan font-medium">web technologies, system administration, and network engineering</span>. I am particularly interested in <span className="text-cyan font-medium">full-stack development, virtualization, cloud platforms, and network security</span>. I enjoy solving complex technical problems and creating scalable, secure, and optimized systems for modern businesses.
            </p>

            <div className="about-details flex flex-col gap-4 mb-8">
              <p><strong className="text-white w-24 inline-block">Phone :</strong> 0693347945</p>
              <p><strong className="text-white w-24 inline-block">Email :</strong> okfmohammed9@gmail.com</p>
              <p><strong className="text-white w-24 inline-block">From :</strong> Morocco, Fez</p>
              <p><strong className="text-white w-24 inline-block">Language :</strong> Arabic, English, French</p>
            </div>

            <a href="/cv.pdf" target="_blank" className="btn-primary-custom" download>
              Download CV
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;