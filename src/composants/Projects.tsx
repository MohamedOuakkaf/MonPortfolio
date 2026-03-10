import './Projects.css';
import { FaExternalLinkAlt, FaGithub, FaServer, FaWindows, FaShieldAlt } from 'react-icons/fa';

function Projects() {
  const projects = [
    {
      title: "VPN Linux Sécurisé",
      description: "Mise en place et configuration d'un serveur VPN sous Linux (OpenVPN/WireGuard) pour un accès distant sécurisé aux ressources internes.",
      icon: <FaServer className="project-icon" />,
      tags: ["Linux", "OpenVPN", "Sécurité", "Réseau"],
      color: "var(--accent-primary)"
    },
    {
      title: "Infrastructure AD DS + DNS",
      description: "Déploiement complet d’une infrastructure Windows Server avec Active Directory, gestion des GPO, et résolution DNS centralisée.",
      icon: <FaWindows className="project-icon" />,
      tags: ["Windows Server", "AD DS", "DNS", "GPO"],
      color: "var(--accent-secondary)"
    },
    {
      title: "Simulation Attaques DHCP",
      description: "Laboratoire de test de sécurité réseau. Simulation d'attaques DHCP Snooping et Man-in-the-Middle avec implémentation de contre-mesures.",
      icon: <FaShieldAlt className="project-icon" />,
      tags: ["Cybersécurité", "Cisco", "DHCP", "MitM"],
      color: "var(--accent-tertiary)"
    }
  ];

  return (
    <section id="projects" className="section-container relative bg-secondary-subtle">
      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="section-title">
            Mes <span className="text-gradient">Projets Récents</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Aperçu de mes réalisations techniques en infrastructure, virtualisation et sécurité.
          </p>
        </div>

        <div className="grid-projects">
          {projects.map((project, index) => (
            <div key={index} className="glass-panel project-card">
              <div className="project-icon-wrapper" style={{ color: project.color }}>
                {project.icon}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-overlay">
                <button className="btn-icon" aria-label="Voir le code">
                  <FaGithub size={20} />
                </button>
                <button className="btn-icon" aria-label="Voir le projet">
                  <FaExternalLinkAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="blob blob-4"></div>
    </section>
  );
}

export default Projects;