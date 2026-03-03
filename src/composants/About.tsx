function About() {
  return (
    <section id="about" className="container py-5">
      <h2 className="text-center mb-4">À propos</h2>
      <p className="text-center">
        Technicien spécialisé en Réseaux, Cloud Computing et Développement Web.
      </p>

      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Réseau</h5>
          <p>VLAN, OSPF, DHCP, DNS, VPN</p>
        </div>
        <div className="col-md-4">
          <h5>Cloud</h5>
          <p>Azure, AWS, OpenStack</p>
        </div>
        <div className="col-md-4">
          <h5>Virtualisation</h5>
          <p>VMware, Linux Server</p>
        </div>
      </div>
    </section>
  );
}

export default About;