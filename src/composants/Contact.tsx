function Contact() {
  return (
    <section id="contact" className="container py-5">
      <h2 className="text-center mb-4">Contact</h2>

      <form>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Votre Nom" />
        </div>

        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Votre Email" />
        </div>

        <div className="mb-3">
          <textarea className="form-control" rows="4" placeholder="Votre Message"></textarea>
        </div>

        <button className="btn btn-primary w-100">
          Envoyer
        </button>
      </form>
    </section>
  );
}

export default Contact;