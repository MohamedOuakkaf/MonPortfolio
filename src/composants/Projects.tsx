import { useState } from "react";

/* ─── COULEURS ET CONFIGS PAR DOMAINE ─── */
const DOMAINS: Record<string, { label: string; accent: string; bg: string; pattern: string }> = {
  network: {
    label: "Réseaux & Sécurité",
    accent: "#00d4ff",
    bg: "linear-gradient(145deg,#020e1a 0%,#051824 50%,#020a12 100%)",
    pattern: `
      <line x1="0" y1="0" x2="300" y2="300" stroke="#00d4ff" stroke-width="0.3" opacity="0.12"/>
      <line x1="100" y1="0" x2="300" y2="200" stroke="#00d4ff" stroke-width="0.3" opacity="0.1"/>
      <line x1="200" y1="0" x2="300" y2="100" stroke="#00d4ff" stroke-width="0.3" opacity="0.08"/>
      <circle cx="240" cy="40" r="1.5" fill="#00d4ff" opacity="0.5"/>
      <circle cx="260" cy="60" r="1" fill="#00d4ff" opacity="0.4"/>
      <circle cx="220" cy="55" r="1" fill="#00d4ff" opacity="0.35"/>
      <line x1="220" y1="55" x2="240" y2="40" stroke="#00d4ff" stroke-width="0.6" opacity="0.3"/>
      <line x1="240" y1="40" x2="260" y2="60" stroke="#00d4ff" stroke-width="0.6" opacity="0.3"/>
      <circle cx="40" cy="240" r="28" fill="none" stroke="#00d4ff" stroke-width="0.5" opacity="0.12"/>
      <circle cx="40" cy="240" r="18" fill="none" stroke="#00d4ff" stroke-width="0.5" opacity="0.1"/>
      <circle cx="40" cy="240" r="8" fill="none" stroke="#00d4ff" stroke-width="0.5" opacity="0.15"/>
      <circle cx="40" cy="240" r="2" fill="#00d4ff" opacity="0.4"/>
      <rect x="220" y="230" width="60" height="12" rx="2" fill="none" stroke="#00d4ff" stroke-width="0.5" opacity="0.18"/>
      <rect x="220" y="247" width="45" height="12" rx="2" fill="none" stroke="#00d4ff" stroke-width="0.5" opacity="0.12"/>
    `,
  },
  systems: {
    label: "Systèmes",
    accent: "#a78bfa",
    bg: "linear-gradient(145deg,#0a0714 0%,#120e20 50%,#07040f 100%)",
    pattern: `
      <rect x="200" y="20" width="80" height="18" rx="2" fill="none" stroke="#a78bfa" stroke-width="0.6" opacity="0.2"/>
      <rect x="200" y="44" width="80" height="18" rx="2" fill="none" stroke="#a78bfa" stroke-width="0.6" opacity="0.16"/>
      <rect x="200" y="68" width="80" height="18" rx="2" fill="none" stroke="#a78bfa" stroke-width="0.6" opacity="0.13"/>
      <rect x="200" y="92" width="80" height="18" rx="2" fill="none" stroke="#a78bfa" stroke-width="0.6" opacity="0.1"/>
      <circle cx="273" cy="29" r="2.5" fill="#a78bfa" opacity="0.45"/>
      <circle cx="273" cy="53" r="2.5" fill="#a78bfa" opacity="0.3"/>
      <circle cx="273" cy="77" r="2.5" fill="#a78bfa" opacity="0.2"/>
      <line x1="0" y1="280" x2="300" y2="280" stroke="#a78bfa" stroke-width="0.4" opacity="0.1"/>
      <line x1="20" y1="140" x2="20" y2="290" stroke="#a78bfa" stroke-width="0.4" opacity="0.08"/>
      <line x1="60" y1="160" x2="60" y2="290" stroke="#a78bfa" stroke-width="0.4" opacity="0.07"/>
      <line x1="100" y1="175" x2="100" y2="290" stroke="#a78bfa" stroke-width="0.4" opacity="0.06"/>
      <circle cx="30" cy="220" r="1.2" fill="#a78bfa" opacity="0.35"/>
      <circle cx="55" cy="210" r="1.2" fill="#a78bfa" opacity="0.3"/>
      <circle cx="80" cy="225" r="1.2" fill="#a78bfa" opacity="0.25"/>
    `,
  },
  cloud: {
    label: "Cloud & DevOps",
    accent: "#34d399",
    bg: "linear-gradient(145deg,#01120a 0%,#021a0e 50%,#011008 100%)",
    pattern: `
      <ellipse cx="240" cy="50" rx="45" ry="18" fill="none" stroke="#34d399" stroke-width="0.6" opacity="0.15"/>
      <ellipse cx="220" cy="58" rx="30" ry="12" fill="none" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
      <ellipse cx="260" cy="55" rx="25" ry="10" fill="none" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
      <polygon points="14,0 28,8 28,24 14,32 0,24 0,8" transform="translate(20,20)" fill="none" stroke="#34d399" stroke-width="0.6" opacity="0.2"/>
      <polygon points="14,0 28,8 28,24 14,32 0,24 0,8" transform="translate(54,40)" fill="none" stroke="#34d399" stroke-width="0.5" opacity="0.14"/>
      <polygon points="14,0 28,8 28,24 14,32 0,24 0,8" transform="translate(36,72)" fill="none" stroke="#34d399" stroke-width="0.4" opacity="0.1"/>
      <line x1="34" y1="52" x2="68" y2="56" stroke="#34d399" stroke-width="0.5" opacity="0.15"/>
      <line x1="50" y1="72" x2="68" y2="56" stroke="#34d399" stroke-width="0.5" opacity="0.12"/>
      <circle cx="150" cy="240" r="1.5" fill="#34d399" opacity="0.3"/>
      <circle cx="175" cy="230" r="1.5" fill="#34d399" opacity="0.25"/>
      <circle cx="200" cy="245" r="1.5" fill="#34d399" opacity="0.2"/>
    `,
  },
  ai: {
    label: "IA & SOC",
    accent: "#f87171",
    bg: "linear-gradient(145deg,#140505 0%,#1e0808 50%,#0f0303 100%)",
    pattern: `
      <circle cx="240" cy="40" r="3" fill="#f87171" opacity="0.35"/>
      <circle cx="265" cy="70" r="3" fill="#f87171" opacity="0.3"/>
      <circle cx="240" cy="100" r="3" fill="#f87171" opacity="0.28"/>
      <circle cx="280" cy="55" r="2" fill="#f87171" opacity="0.22"/>
      <circle cx="285" cy="85" r="2" fill="#f87171" opacity="0.2"/>
      <line x1="240" y1="40" x2="265" y2="70" stroke="#f87171" stroke-width="0.7" opacity="0.22" stroke-dasharray="2 3"/>
      <line x1="240" y1="40" x2="280" y2="55" stroke="#f87171" stroke-width="0.7" opacity="0.18" stroke-dasharray="2 3"/>
      <line x1="265" y1="70" x2="240" y2="100" stroke="#f87171" stroke-width="0.7" opacity="0.22" stroke-dasharray="2 3"/>
      <line x1="265" y1="70" x2="285" y2="85" stroke="#f87171" stroke-width="0.7" opacity="0.18" stroke-dasharray="2 3"/>
      <line x1="280" y1="55" x2="285" y2="85" stroke="#f87171" stroke-width="0.7" opacity="0.15" stroke-dasharray="2 3"/>
      <line x1="240" y1="100" x2="285" y2="85" stroke="#f87171" stroke-width="0.7" opacity="0.18" stroke-dasharray="2 3"/>
      <rect x="10" y="240" width="50" height="6" rx="3" fill="#f87171" opacity="0.12"/>
      <rect x="10" y="252" width="35" height="6" rx="3" fill="#f87171" opacity="0.09"/>
      <rect x="10" y="264" width="45" height="6" rx="3" fill="#f87171" opacity="0.07"/>
    `,
  },
  dev: {
    label: "Développement",
    accent: "#fbbf24",
    bg: "linear-gradient(145deg,#100a00 0%,#1a1200 50%,#0d0800 100%)",
    pattern: `
      <text x="170" y="30" font-family="monospace" font-size="9" fill="#fbbf24" opacity="0.12">{"}</text>
      <text x="250" y="270" font-family="monospace" font-size="9" fill="#fbbf24" opacity="0.1">{'}</text>
      <rect x="10" y="30" width="55" height="5" rx="2.5" fill="#fbbf24" opacity="0.12"/>
      <rect x="20" y="42" width="75" height="5" rx="2.5" fill="#fbbf24" opacity="0.09"/>
      <rect x="10" y="54" width="45" height="5" rx="2.5" fill="#fbbf24" opacity="0.07"/>
      <rect x="24" y="66" width="65" height="5" rx="2.5" fill="#fbbf24" opacity="0.1"/>
      <rect x="10" y="78" width="50" height="5" rx="2.5" fill="#fbbf24" opacity="0.07"/>
      <rect x="20" y="90" width="80" height="5" rx="2.5" fill="#fbbf24" opacity="0.06"/>
      <rect x="10" y="102" width="38" height="5" rx="2.5" fill="#fbbf24" opacity="0.09"/>
      <circle cx="270" cy="240" r="1.5" fill="#fbbf24" opacity="0.3"/>
      <circle cx="260" cy="258" r="1.5" fill="#fbbf24" opacity="0.25"/>
      <circle cx="280" cy="255" r="1.5" fill="#fbbf24" opacity="0.2"/>
    `,
  },
};

const PROJECTS = [
  /* ─── Réseaux & Sécurité ─── */
  {
    cat: "network",
    icon: "🛡",
    title: "Attaque DHCP Starvation & Spoofing",
    desc: "Simulation d'attaques DHCP Starvation et Spoofing en laboratoire avec Kali Linux. Mise en place de DHCP Snooping pour contrer les serveurs DHCP malveillants.",
    tags: ["Kali Linux", "Wireshark", "GNS3", "Cisco IOS", "DHCP Snooping"],
  },
  {
    cat: "network",
    icon: "🔍",
    title: "IDS/IPS FortiGate & Sophos",
    desc: "Déploiement d'une architecture IDS/IPS bi-couche combinant FortiGate NGFW et Sophos Intercept X pour la détection de menaces en temps réel.",
    tags: ["FortiGate", "Sophos", "NGFW", "SIEM", "SSL Inspection"],
  },
  {
    cat: "network",
    icon: "📊",
    title: "Supervision Réseau Nagios",
    desc: "Mise en place d'une solution de supervision complète avec Nagios Core pour surveiller serveurs et équipements réseau sur une infrastructure multi-sites.",
    tags: ["Nagios Core", "NRPE", "SNMP", "CentOS", "Bash"],
  },
  {
    cat: "network",
    icon: "🔥",
    title: "Pare-feu d'Entreprise pfSense",
    desc: "Configuration d'un périmètre réseau sécurisé avec pfSense en tant que routeur/firewall principal, incluant segmentation VLAN et intégration Snort IPS.",
    tags: ["pfSense", "Snort", "VLAN", "HAProxy", "802.1Q"],
  },
  {
    cat: "network",
    icon: "🔐",
    title: "VPN Sécurisé OpenVPN",
    desc: "Infrastructure d'accès distant sécurisé avec OpenVPN, authentification mutuelle par certificats et intégration Active Directory via LDAP.",
    tags: ["OpenVPN", "PKI", "EasyRSA", "LDAP", "TLS"],
  },
  /* ─── Systèmes ─── */
  {
    cat: "systems",
    icon: "🗄",
    title: "Serveur NAS TrueNAS SCALE",
    desc: "Déploiement d'un NAS haute disponibilité avec TrueNAS SCALE pour le stockage centralisé, les sauvegardes automatisées et la réplication des données.",
    tags: ["TrueNAS SCALE", "ZFS", "SMB/NFS", "iSCSI", "RAID-Z2"],
  },
  {
    cat: "systems",
    icon: "🖥",
    title: "Gestion de Parc GLPI",
    desc: "Déploiement de GLPI en tant que plateforme ITSM pour l'inventaire des actifs, la gestion des tickets helpdesk et le suivi des licences logicielles.",
    tags: ["GLPI", "OCSInventory", "LAMP", "LDAP", "Active Directory"],
  },
  {
    cat: "systems",
    icon: "📧",
    title: "Serveur de Messagerie Postfix",
    desc: "Infrastructure mail complète avec Postfix/Dovecot, filtrage anti-spam SpamAssassin et authentification DKIM/SPF/DMARC pour zéro faux positif.",
    tags: ["Postfix", "Dovecot", "SpamAssassin", "DKIM", "Debian"],
  },
  {
    cat: "systems",
    icon: "⚡",
    title: "Déploiement Automatisé WDS/MDT",
    desc: "Pipeline de déploiement Windows zéro-touch avec WDS et MDT. Provisioning réduit de 4h à 25 minutes avec injection de drivers automatisée.",
    tags: ["WDS", "MDT", "PXE", "Windows Server", "Automation"],
  },
  {
    cat: "systems",
    icon: "⚙️",
    title: "Virtualisation Proxmox VE",
    desc: "Infrastructure hyperconvergée de production avec Proxmox VE pour la gestion des VMs et conteneurs LXC, clustering HA et stockage Ceph distribué.",
    tags: ["Proxmox VE", "KVM", "LXC", "Ceph", "Corosync"],
  },
  /* ─── IA & SOC ─── */
  {
    cat: "ai",
    icon: "🤖",
    title: "Détection d'Anomalies IA dans les Logs",
    desc: "Pipeline SOC intelligent utilisant le machine learning pour détecter des patterns anormaux dans les logs système et réseau, réduisant les fausses alertes.",
    tags: ["Python", "scikit-learn", "ELK Stack", "Kibana", "Logstash"],
  },
  /* ─── Cloud ─── */
  {
    cat: "cloud",
    icon: "☁️",
    title: "Cloud Privé OpenStack",
    desc: "Déploiement complet d'un cloud privé OpenStack couvrant le compute, le réseau et le stockage pour le provisioning d'infrastructure en self-service.",
    tags: ["OpenStack", "Kolla-Ansible", "Nova", "Neutron", "Keystone"],
  },
  {
    cat: "cloud",
    icon: "🏗",
    title: "Architecture Cloud Haute Disponibilité",
    desc: "Architecture multi-zones sur AWS atteignant 99,99% de disponibilité avec auto-scaling, bases de données gérées et basculement automatique.",
    tags: ["AWS", "Terraform", "EC2", "RDS Multi-AZ", "CloudWatch"],
  },
  {
    cat: "cloud",
    icon: "🔄",
    title: "Solution Disaster Recovery Cloud",
    desc: "Solution DR avec RTO < 15 min et RPO < 1h combinant AWS DRS et Veeam Backup & Replication pour un basculement hybride cloud fiable.",
    tags: ["AWS DRS", "Veeam", "S3", "Lambda", "Hybrid Cloud"],
  },
  {
    cat: "cloud",
    icon: "🚀",
    title: "Pipeline DevOps CI/CD GitLab",
    desc: "Pipeline DevOps complet réduisant le cycle de déploiement de plusieurs jours à moins de 12 minutes avec tests automatisés et conteneurisation.",
    tags: ["GitLab CI", "Docker", "Kubernetes", "Helm", "Prometheus"],
  },
  /* ─── Développement ─── */
  {
    cat: "dev",
    icon: "🛒",
    title: "Plateforme E-Commerce React/Node.js",
    desc: "Plateforme e-commerce production-ready avec catalogue produits, panier, paiement sécurisé Stripe et tableau de bord administrateur complet.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
  },
  {
    cat: "dev",
    icon: "🚗",
    title: "Application Location de Véhicules",
    desc: "Plateforme de location de voitures avec disponibilité temps réel, calendrier de réservation, portail client et gestion de flotte pour administrateurs.",
    tags: ["Laravel", "Vue.js", "MySQL", "Stripe", "Google Maps"],
  },
  {
    cat: "dev",
    icon: "🎓",
    title: "Système de Gestion des Étudiants",
    desc: "Application web de gestion académique pour inscriptions, notes, présences et rapports, avec accès basé sur les rôles (admin, enseignant, étudiant).",
    tags: ["Python", "Flask", "MongoDB", "JWT", "ReportLab"],
  },
  {
    cat: "dev",
    icon: "🍽",
    title: "Site Restaurant & Réservation",
    desc: "Site web de restaurant moderne avec système de réservation intégré, gestion de menu, avis clients et disponibilité des tables en temps réel.",
    tags: ["Django", "React", "PostgreSQL", "Twilio", "Cloudinary"],
  },
  {
    cat: "dev",
    icon: "🎓",
    title: "Plateforme E-Learning Intelligente",
    desc: "Plateforme d'apprentissage en ligne complète avec gestion des évaluations, suivi intelligent des performances, recommandations adaptatives et système d'abonnement premium.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Redis"],
  },
];

/* ─── FILTER LABELS ─── */
const FILTERS = [
  { id: "all",     label: "Tous" },
  { id: "network", label: "Réseaux & Sécurité" },
  { id: "systems", label: "Systèmes" },
  { id: "cloud",   label: "Cloud & DevOps" },
  { id: "ai",      label: "IA & SOC" },
  { id: "dev",     label: "Développement" },
];

export default function Projects() {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px) scale(.98); }
          to   { opacity:1; transform:none; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        /* ── PAGE ── */
        .pj {
          background: #080a0f;
          min-height: 100vh;
          padding: 4.5rem 0 6rem;
          font-family: 'Geist', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle noise texture */
        .pj::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }

        .pj-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative; z-index: 1;
        }

        /* ── HEADER ── */
        .pj-hd {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both;
        }

        .pj-overline {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 500;
          letter-spacing: .25em; text-transform: uppercase;
          color: rgba(255,255,255,.28);
          margin-bottom: .7rem;
          display: flex; align-items: center; justify-content: center; gap: .5rem;
        }
        .pj-overline::before, .pj-overline::after {
          content: ''; display: block;
          width: 2rem; height: 1px;
          background: rgba(255,255,255,.15);
        }

        .pj-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -.04em;
          line-height: 1;
          color: #f8fafc;
          margin-bottom: .7rem;
        }
        .pj-title-grad {
          background: linear-gradient(90deg, #00d4ff 0%, #a78bfa 40%, #34d399 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .pj-subtitle {
          font-size: .9rem; font-weight: 300;
          color: rgba(255,255,255,.32);
          line-height: 1.6;
        }

        /* ── FILTERS ── */
        .pj-filters {
          display: flex; gap: .4rem; flex-wrap: wrap; justify-content: center;
          margin-bottom: 2.5rem;
          animation: fadeUp .6s cubic-bezier(.16,1,.3,1) .1s both;
        }

        .pj-filter {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 500;
          letter-spacing: .08em; text-transform: uppercase;
          padding: .42rem 1rem; border-radius: .35rem;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.02);
          color: rgba(255,255,255,.35);
          cursor: pointer;
          transition: all .18s cubic-bezier(.16,1,.3,1);
        }
        .pj-filter:hover {
          color: rgba(255,255,255,.7);
          border-color: rgba(255,255,255,.16);
          background: rgba(255,255,255,.04);
        }
        .pj-filter.on {
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.2);
          color: #f8fafc;
        }

        /* ── GRID ── */
        .pj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.1rem;
        }

        /* ── CARD ── */
        .pj-card {
          /* Fixed equal height */
          height: 300px;
          border-radius: .85rem;
          border: 1px solid rgba(255,255,255,.07);
          position: relative;
          overflow: hidden;
          cursor: default;
          display: flex;
          flex-direction: column;
          transition: transform .28s cubic-bezier(.16,1,.3,1),
                      box-shadow .28s cubic-bezier(.16,1,.3,1),
                      border-color .28s;
          animation: fadeUp .45s cubic-bezier(.16,1,.3,1) both;
        }

        .pj-card:hover {
          transform: translateY(-5px) scale(1.012);
          border-color: var(--ac);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--ac) 20%, transparent),
            0 20px 60px -10px color-mix(in srgb, var(--ac) 25%, transparent),
            0 4px 20px rgba(0,0,0,.5);
        }

        /* category background */
        .pj-card-bg {
          position: absolute; inset: 0;
          background: var(--bg-grad);
          z-index: 0;
        }

        /* SVG pattern layer */
        .pj-card-svg {
          position: absolute; inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .pj-card-svg svg {
          width: 100%; height: 100%;
        }

        /* vignette at bottom so text pops */
        .pj-card::after {
          content: '';
          position: absolute; left:0; right:0; bottom:0;
          height: 65%;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.75) 60%, rgba(0,0,0,.92) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* content above vignette */
        .pj-card-content {
          position: relative; z-index: 3;
          display: flex; flex-direction: column;
          height: 100%;
          padding: 1.3rem 1.4rem 1.3rem;
        }

        /* top: icon + category badge */
        .pj-card-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: auto;
        }

        .pj-card-icon {
          width: 40px; height: 40px; border-radius: .5rem;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem;
          backdrop-filter: blur(8px);
        }

        .pj-card-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: .48rem; font-weight: 500;
          letter-spacing: .12em; text-transform: uppercase;
          padding: .2rem .6rem; border-radius: .25rem;
          background: color-mix(in srgb, var(--ac) 12%, rgba(0,0,0,.4));
          border: 1px solid color-mix(in srgb, var(--ac) 28%, transparent);
          color: var(--ac);
          backdrop-filter: blur(8px);
        }

        /* bottom text */
        .pj-card-body {
          /* pushed to bottom by margin-bottom auto on head */
        }

        .pj-card-title {
          font-size: .98rem; font-weight: 700;
          color: rgba(248,250,252,.95);
          letter-spacing: -.02em; line-height: 1.28;
          margin-bottom: .45rem;
        }

        .pj-card-desc {
          font-size: .75rem; font-weight: 300;
          color: rgba(255,255,255,.48);
          line-height: 1.6;
          margin-bottom: .8rem;
          /* clamp to 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* tags */
        .pj-card-tags {
          display: flex; flex-wrap: wrap; gap: .3rem;
        }

        .pj-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: .52rem; font-weight: 400;
          padding: .18rem .55rem; border-radius: .22rem;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.07);
          color: rgba(255,255,255,.45);
          letter-spacing: .03em;
          transition: all .15s;
        }
        .pj-card:hover .pj-tag {
          border-color: color-mix(in srgb, var(--ac) 22%, transparent);
          color: rgba(255,255,255,.65);
          background: color-mix(in srgb, var(--ac) 6%, rgba(0,0,0,.3));
        }

        /* hover top glow line */
        .pj-card-glow {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--ac), transparent);
          z-index: 4;
          opacity: 0;
          transition: opacity .28s;
        }
        .pj-card:hover .pj-card-glow { opacity: 1; }

        /* ── COUNT ── */
        .pj-count {
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; color: rgba(255,255,255,.2);
          letter-spacing: .1em; margin-bottom: 1.5rem;
        }
        .pj-count strong { color: rgba(255,255,255,.5); }
      `}</style>

      <section className="pj">
        <div className="pj-inner">

          {/* HEADER */}
          <div className="pj-hd">
            <p className="pj-overline">Portfolio</p>
            <h2 className="pj-title">
              Projets <span className="pj-title-grad">Informatiques</span>
            </h2>
            <p className="pj-subtitle">
              Une sélection de réalisations techniques en infrastructure, sécurité, cloud et développement.
            </p>
          </div>

          {/* FILTERS */}
          <div className="pj-filters">
            {FILTERS.map(f => (
              <button
                key={f.id}
                className={`pj-filter${active === f.id ? " on" : ""}`}
                style={active === f.id && f.id !== "all"
                  ? { borderColor: `${DOMAINS[f.id]?.accent}55`, color: DOMAINS[f.id]?.accent, background: `${DOMAINS[f.id]?.accent}0e` }
                  : {}
                }
                onClick={() => setActive(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* COUNT */}
          <p className="pj-count">
            <strong>{shown.length}</strong> projet{shown.length !== 1 ? "s" : ""}
            {active !== "all" ? ` · ${FILTERS.find(f => f.id === active)?.label}` : ""}
          </p>

          {/* GRID */}
          <div className="pj-grid">
            {shown.map((p, i) => {
              const d = DOMAINS[p.cat];
              return (
                <div
                  key={`${active}-${i}`}
                  className="pj-card"
                  style={{
                    "--ac": d.accent,
                    "--bg-grad": d.bg,
                    animationDelay: `${i * 0.05}s`,
                  } as React.CSSProperties}
                >
                  {/* background layers */}
                  <div className="pj-card-bg"/>
                  <div className="pj-card-svg">
                    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid slice"
                      dangerouslySetInnerHTML={{ __html: d.pattern }}
                    />
                  </div>

                  {/* glow top line */}
                  <div className="pj-card-glow"/>

                  {/* content */}
                  <div className="pj-card-content">
                    <div className="pj-card-head">
                      <div className="pj-card-icon">{p.icon}</div>
                      <span className="pj-card-badge">{d.label}</span>
                    </div>

                    <div className="pj-card-body">
                      <h3 className="pj-card-title">{p.title}</h3>
                      <p className="pj-card-desc">{p.desc}</p>
                      <div className="pj-card-tags">
                        {p.tags.map(t => (
                          <span key={t} className="pj-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
