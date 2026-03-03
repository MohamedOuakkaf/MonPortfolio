function Projects() {
  return (
    <section id="projects" className="bg-secondary py-5">
      <div className="container">
        <h2 className="text-center mb-4">Mes Projets</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title">VPN Linux</h5>
                <p className="card-text">
                  Mise en place d’un serveur VPN sécurisé.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title">AD DS + DNS</h5>
                <p className="card-text">
                  Déploiement d’une infrastructure Windows Server.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title">Simulation Attaques DHCP</h5>
                <p className="card-text">
                  Test de sécurité réseau et contre-mesures.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;