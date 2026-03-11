import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaCheckCircle, FaArrowRight, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import './Contact.css';

function Contact() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form data submitted:", formData);
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const progress = (step / 5) * 100;

  return (
    <section id="contact" className={`contact-section section-container step-${step}`}>
      <div className="container relative z-10 form-wrapper">
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="section-title">
            Démarrons un <span className="text-gradient">Projet Ensemble</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Que ce soit pour une infrastructure complète ou une consultation sécuritaire, je suis à votre écoute.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="glass-panel multi-step-form mx-auto animate-fade-in-up delay-1"
          >
            {/* Barre de progression */}
            <div className="form-header">
              <span className="step-indicator">ÉTAPE {step} / 5</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="step-percent">{Math.round(progress)}%</span>
            </div>

            {/* Champs */}
            <div className="form-body">
              {step === 1 && (
                <div className="input-group slide-in">
                  <label htmlFor="name">Comment vous appelez-vous ?</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              )}
              {step === 2 && (
                <div className="input-group slide-in">
                  <label htmlFor="project">Quel est votre projet ?</label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    placeholder="Ex: Déploiement serveur, Migration Cloud..."
                    value={formData.project}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              )}
              {step === 3 && (
                <div className="input-group slide-in">
                  <label htmlFor="email">Votre adresse email :</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="nom@entreprise.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              )}
              {step === 4 && (
                <div className="input-group slide-in">
                  <label htmlFor="phone">Votre numéro de téléphone :</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+33 6 XX XX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              )}
              {step === 5 && (
                <div className="input-group slide-in">
                  <label htmlFor="message">Détails supplémentaires :</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Décrivez vos besoins spécifiques..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input textarea"
                    required
                  ></textarea>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="form-footer">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="btn-prev"
                >
                  <FaArrowLeft /> Précédent
                </button>
              ) : <div></div>} {/* Spacer */}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-next btn-primary-custom"
                >
                  Suivant <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-submit btn-primary-custom"
                >
                  <FaPaperPlane /> Envoyer
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="glass-panel success-message mx-auto text-center slide-in">
            <FaCheckCircle className="success-icon mb-4 mx-auto" />
            <h3 className="success-title">Demande envoyée !</h3>
            <p className="success-text">
              Merci pour votre message. Je vous recontacterai dans les plus brefs délais pour discuter de votre projet.
            </p>
            <button 
              className="btn-outline-custom mt-6"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({name: "", project: "", email: "", phone: "", message: ""});
              }}
            >
              Nouveau message
            </button>
          </div>
        )}
      </div>
      
      <div className="blob blob-5"></div>
    </section>
  );
}

export default Contact;