import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════
   ALL SVG LOGOS
═══════════════════════════════════════════════════ */
const L = {
  /* ── Languages ── */
  HTML5:           <svg viewBox="0 0 32 32"><path d="M4 2l2.4 26L16 30l9.6-2L28 2z" fill="#E44D26"/><path d="M16 27.4l7.8-2.2 2-22.2H16z" fill="#F16529"/><path d="M16 13H9.8l.4 4H16v4H10.6l.4 4.4 5 1.4V30.9L7.4 28.2 6.2 13H16zm0-7H6.6L7 10H16z" fill="#EBEBEB"/><path d="M16 13v4h5.2l-.5 5.5L16 24v4.9l5.4-1.5.4-4.4H16zm0-7v4h9.8l-.3-4z" fill="white"/></svg>,
  CSS3:            <svg viewBox="0 0 32 32"><path d="M4 2l2.4 26L16 30l9.6-2L28 2z" fill="#264DE4"/><path d="M16 27.4l7.8-2.2 2-22.2H16z" fill="#2965F1"/><path d="M16 13H9.8l.4 4H16v4H10.6l.4 4.4 5 1.4V30.9L7.4 28.2 6.2 13H16zm0-7H6.6L7 10H16z" fill="#EBEBEB"/><path d="M16 13v4h5.2l-.5 5.5L16 24v4.9l5.4-1.5.4-4.4H16zm0-7v4h9.8l-.3-4z" fill="white"/></svg>,
  JavaScript:      <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="3" fill="#F7DF1E"/><path d="M19.2 24.5c.6 1 1.4 1.7 2.8 1.7 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.3-2-1.8l-.7-.3c-2-.85-3.3-1.9-3.3-4.1 0-2.05 1.55-3.6 4-3.6 1.75 0 3 .6 3.9 2.2l-2.1 1.35c-.47-.85-.98-1.18-1.8-1.18-.82 0-1.34.52-1.34 1.18 0 .82.52 1.16 1.72 1.67l.7.3c2.34 1 3.66 2.04 3.66 4.34 0 2.49-1.95 3.8-4.57 3.8-2.56 0-4.22-1.22-5.03-2.82zm-9.7.22c.44.78.84 1.44 1.8 1.44.92 0 1.5-.36 1.5-1.76V15.1h2.6v9.36c0 2.9-1.7 4.22-4.18 4.22-2.24 0-3.54-1.16-4.2-2.56z" fill="#323330"/></svg>,
  TypeScript:      <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="3" fill="#3178C6"/><path d="M18 18.5v2.3c.4.2.8.3 1.3.3.4 0 .7-.1 1-.2v-2.2c-.3.1-.6.2-1 .2-.5 0-.9-.1-1.3-.4zM18 14h-5v1.8h1.6V22H17v-6.2H18V14z" fill="white"/><path d="M22 14v4.5c0 .6-.1 1-.3 1.2-.2.3-.6.4-1.1.4-.4 0-.8-.1-1.1-.3V22c.4.1.8.2 1.3.2.9 0 1.6-.2 2.1-.7.5-.5.8-1.2.8-2.2V14H22z" fill="white"/></svg>,
  Python:          <svg viewBox="0 0 32 32"><path d="M15.9 2C11 2 10 4.1 10 6.5V9h6v1H6.5C4 10 2 11.7 2 16s2.3 5.9 4.5 6h2.5v-2.8c0-2.5 2.2-4.7 4.5-4.7H20c2 0 3.5-1.6 3.5-3.5V6.5C23.5 4.1 21.5 2 15.9 2zM13 7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#3776AB"/><path d="M16.1 30C21 30 22 27.9 22 25.5V23h-6v-1h9.5C28 22 30 20.3 30 16s-2.3-5.9-4.5-6h-2.5v2.8c0 2.5-2.2 4.7-4.5 4.7H12c-2 0-3.5 1.6-3.5 3.5v5C8.5 27.9 10.5 30 16.1 30zM19 25c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#FFD43B"/></svg>,
  PHP:             <svg viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="14" ry="8.5" fill="#4F5B93"/><text x="16" y="20.5" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace" fontWeight="bold">php</text></svg>,
  Java:            <svg viewBox="0 0 32 32"><path d="M11.5 22.5s-1.5.9.9 1.2c2.7.3 4.1.3 7-.1 0 0 .8.5 1.9 1-6.7 2.9-15.2-.2-9.8-2.1zm-.8-3.6s-1.6 1.2 1 1.5c2.4.3 4.3.3 7.6-.1 0 0 .5.5 1.4.9-6.8 2-14.3.2-10-2.3z" fill="#5382A1"/><path d="M17.3 12.2c1.8 2.1.4 4-.4 4.8 0 0 3.3-1.7 1.7-4.3-1.5-2.4-2.7-3.6 3.7-7.7 0 0-10.1 2.5-5 7.2z" fill="#E76F00"/><path d="M22.4 25.4s1.1.9-1.2 1.6c-4.4 1.3-18.4 1.7-22.3.1-1.4-.6 1.2-1.4 2.1-1.6.8-.2 1.3-.2 1.3-.2-1.5-1.1-10 2.1-4.3 3 15.6 2.5 28.4-1.1 24.4-2.9z" fill="#5382A1"/><path d="M20.1 18.9c7.2-3.7 3.9-7.3 1.5-6.8-.5.1-.8.2-.8.2s.2-.4.6-.5c4.6-1.6 8.1 4.7-1.5 7.3z" fill="#E76F00"/><path d="M18.5 2s4 4-3.8 10.2c-6.3 5-1.4 7.8 0 11.1-3.7-3.3-6.4-6.2-4.6-8.9 2.7-4 10.2-6 8.4-12.4z" fill="#E76F00"/></svg>,
  "C++":           <svg viewBox="0 0 32 32"><path d="M16 2L4 8.5v15L16 30l12-6.5v-15z" fill="#00599C"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">C++</text></svg>,
  "C#":            <svg viewBox="0 0 32 32"><path d="M16 2L4 8.5v15L16 30l12-6.5v-15z" fill="#239120"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">C#</text></svg>,
  SQL:             <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#336791"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace" fontWeight="bold">SQL</text></svg>,
  Bash:            <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1e2a1e"/><text x="7" y="23" fill="#4EC9B0" fontSize="14" fontFamily="monospace" fontWeight="bold">$_</text></svg>,
  /* ── Frameworks ── */
  React:           <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="2.6" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" fill="none" stroke="#61DAFB" strokeWidth="1.4"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 16 16)"/></svg>,
  "Next.js":       <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#000"/><path d="M9 22V10l14 15h-2.5L9 12.5V22H9zm13-12v8.5l-3.5-4V10H22z" fill="white"/></svg>,
  "Vue.js":        <svg viewBox="0 0 32 32"><path d="M16 28L2 6h5.5L16 21 24.5 6H30z" fill="#41B883"/><path d="M16 28l-7-12h4.5L16 21l2.5-5H23z" fill="#35495E"/></svg>,
  Nuxt:            <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#00C58E"/><path d="M9 26l7-14 7 14H9zm7-10l-4 7h8z" fill="white"/></svg>,
  Angular:         <svg viewBox="0 0 32 32"><path d="M16 2L2.5 7l2 17.5L16 30l11.5-5.5 2-17.5z" fill="#DD0031"/><path d="M16 2v28l11.5-5.5 2-17.5z" fill="#C3002F"/><path d="M16 7l-7 16h2.6l1.4-3.5h6l1.4 3.5H23L16 7zm2.4 10h-4.8L16 12z" fill="white"/></svg>,
  Laravel:         <svg viewBox="0 0 32 32"><path d="M30 9.5L17.5 2.5l-4 2.3L26 11.8l4-2.3z" fill="#FF2D20"/><path d="M13.5 4.8L2 11.3v13l11.5 6.5V17.3L2 11.3l11.5-6.5z" fill="#FF2D20" opacity=".8"/><path d="M13.5 17.3v13L30 22.5V9.5L13.5 17.3z" fill="#FF2D20" opacity=".6"/></svg>,
  Symfony:         <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#1A171B"/><path d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S21.5 6 16 6zm3 14c-1.2.8-2.5 1.2-3.8 1-1.5-.2-2.5-1-2.5-2.3 0-1.2.8-2.2 2-2.7.3 1 1 1.5 2 1.5.7 0 1.2-.3 1.2-.8 0-.5-.4-.8-1.3-1.3-.9-.5-2.2-1.3-2.2-3 0-1.8 1.5-3 3.5-3 1.2 0 2.3.4 3 1.1l-1.2 1.5c-.5-.5-1-.8-1.8-.8-.7 0-1.2.4-1.2.9 0 .6.5.9 1.4 1.4.9.5 2.1 1.2 2.1 3 0 1-.5 1.9-1.2 2.5z" fill="white"/></svg>,
  Django:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#092E20"/><text x="16" y="21" textAnchor="middle" fill="#44B78B" fontSize="8" fontFamily="monospace" fontWeight="bold">Django</text></svg>,
  Flask:           <svg viewBox="0 0 32 32"><path d="M13 3v11L5 26c-.8 1.3 0 3 1.8 3h18.4c1.8 0 2.6-1.7 1.8-3L19 14V3" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"/><path d="M10 3h12" stroke="#aaa" strokeWidth="1.5"/><circle cx="10" cy="24" r="1.5" fill="#00e5ff"/><circle cx="16" cy="22" r="1" fill="#00e5ff"/><circle cx="21" cy="25" r="1.2" fill="#00e5ff"/></svg>,
  "Express.js":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#111"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold">Express</text></svg>,
  "Spring Boot":   <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#6DB33F"/><path d="M10 22c0-3 1.5-5.5 4-7l2 3c-1.2.8-2 2.2-2 3.7 0 1 .3 1.9.8 2.6C11.8 24.1 10 23.2 10 22zm12-12c0 3-1.5 5.5-4 7l-2-3c1.2-.8 2-2.2 2-3.7 0-1-.3-1.9-.8-2.6C20.2 7.9 22 8.8 22 10z" fill="white"/></svg>,
  "ASP.NET":       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#512BD4"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold">.NET</text></svg>,
  Bootstrap:       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#7952B3"/><path d="M9 8h8.5c3.3 0 5.5 1.8 5.5 4.5 0 1.8-1 3-2.5 3.5C22.5 16.5 24 18 24 20c0 3-2.3 5-6 5H9V8zm5 5v3.5h3c1.2 0 2-.7 2-1.8S18.2 13 17 13h-3zm0 6.5V23h3.5c1.3 0 2.1-.8 2.1-2s-.8-1.5-2.1-1.5H14z" fill="white"/></svg>,
  Tailwind:        <svg viewBox="0 0 32 32"><path d="M16 7c-3.5 0-5.7 1.75-6.7 5.25 1.35-1.75 2.9-2.4 4.7-2 1.02.26 1.75 1 2.55 1.83C17.8 13.4 19.2 15 22.7 15c3.5 0 5.7-1.75 6.7-5.25-1.35 1.75-2.9 2.4-4.7 2-1.02-.26-1.75-1-2.55-1.83C20.9 8.6 19.5 7 16 7zM9.3 15C5.8 15 3.6 16.75 2.6 20.25c1.35-1.75 2.9-2.4 4.7-2 1.02.26 1.75 1 2.55 1.83C11.1 21.4 12.5 23 16 23c3.5 0 5.7-1.75 6.7-5.25-1.35 1.75-2.9 2.4-4.7 2-1.02-.26-1.75-1-2.55-1.83C14.2 16.6 12.8 15 9.3 15z" fill="#38BDF8"/></svg>,
  jQuery:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0769AD"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia" fontStyle="italic" fontWeight="bold">jQ</text></svg>,
  "React Native":  <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="2.6" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" fill="none" stroke="#61DAFB" strokeWidth="1.4"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 16 16)"/></svg>,
  /* ── Databases ── */
  MySQL:           <svg viewBox="0 0 32 32"><path d="M16 5C9.4 5 4 7.4 4 10.4s5.4 5.4 12 5.4 12-2.4 12-5.4S22.6 5 16 5z" fill="#00758F"/><path d="M4 10.4v4c0 3 5.4 5.4 12 5.4s12-2.4 12-5.4v-4c0 3-5.4 5.4-12 5.4S4 13.4 4 10.4z" fill="#00758F"/><path d="M4 14.4v4c0 3 5.4 5.4 12 5.4s12-2.4 12-5.4v-4c0 3-5.4 5.4-12 5.4S4 17.4 4 14.4z" fill="#F29111"/></svg>,
  PostgreSQL:      <svg viewBox="0 0 32 32"><circle cx="16" cy="15" r="11" fill="#336791"/><path d="M16 8c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#fff" opacity=".25"/><path d="M22 6l3-3" stroke="#336791" strokeWidth="2" strokeLinecap="round"/></svg>,
  MariaDB:         <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#003545"/><path d="M6 22c2-4 6-7 10-7 2 0 4 .5 6 1.5" fill="none" stroke="#C0765A" strokeWidth="2.5" strokeLinecap="round"/><path d="M6 17c2-3 5-5 8-5" fill="none" stroke="#C0765A" strokeWidth="2" strokeLinecap="round" opacity=".6"/></svg>,
  MongoDB:         <svg viewBox="0 0 32 32"><path d="M16 3c0 0-7 10-7 16a7 7 0 0014 0C23 13 16 3 16 3z" fill="#4FAA41"/><path d="M16 6v20" stroke="#3D8B37" strokeWidth="1.5"/></svg>,
  Redis:           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#DC382D"/><path d="M7 21l9-4.5 9 4.5-9 4.5z" fill="white"/><path d="M7 17l9-4.5 9 4.5-9 4.5z" fill="white" opacity=".7"/><path d="M7 13l9-4.5 9 4.5-9 4.5z" fill="white" opacity=".4"/></svg>,
  Oracle:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#F80000"/><ellipse cx="16" cy="16" rx="9" ry="5.5" fill="none" stroke="white" strokeWidth="2"/></svg>,
  "SQL Server":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#CC2927"/><text x="16" y="17" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold">SQL</text><text x="16" y="26" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="monospace">Server</text></svg>,
  SQLite:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#044a64"/><text x="16" y="22" textAnchor="middle" fill="#61b8cc" fontSize="7" fontFamily="monospace" fontWeight="bold">SQLite</text></svg>,
  /* ── Cloud Providers ── */
  AWS:             <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><path d="M7 19l2.5-7.5 2.5 7.5h-5zm2.5-5.5 1 3h-2l1-3z" fill="#FF9900"/><path d="M17 19v-7.5h2v5.5h3V19h-5z" fill="#FF9900"/><path d="M5 24q11 3 22 0" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Azure:           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><path d="M8 26l8-18 8 18H8zm8-13.5-5 10.5h10z" fill="white"/></svg>,
  "Google Cloud":  <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#fff"/><path d="M21 14h-1.4A4 4 0 0012.5 15h-.7a3 3 0 000 6h9.2a3 3 0 000-6z" fill="none" stroke="#4285F4" strokeWidth="1.3"/><path d="M18.5 10l3 3-3 3" fill="none" stroke="#EA4335" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="21" r="2.2" fill="#34A853"/><circle cx="8" cy="21" r="2.2" fill="#FBBC05"/></svg>,
  "IBM Cloud":     <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1F70C1"/><text x="16" y="18" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">IBM</text><text x="16" y="27" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace">Cloud</text></svg>,
  /* ── Azure Services ── */
  "Azure VM":      <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><rect x="5" y="8" width="14" height="9" rx="1" fill="white" opacity=".9"/><rect x="13" y="15" width="14" height="9" rx="1" fill="#50E6FF"/></svg>,
  "App Service":   <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><rect x="6" y="6" width="20" height="20" rx="2" fill="none" stroke="white" strokeWidth="2"/><path d="M10 16h12M16 10v12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  "Azure Functions":<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><path d="M10 22l6-12 6 12" fill="none" stroke="#50E6FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 18h6" stroke="#50E6FF" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  "Blob Storage":  <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><ellipse cx="16" cy="18" rx="9" ry="6" fill="#50E6FF"/><ellipse cx="16" cy="14" rx="7" ry="4" fill="white"/></svg>,
  "Azure Disk":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><circle cx="16" cy="16" r="9" fill="none" stroke="#50E6FF" strokeWidth="2"/><circle cx="16" cy="16" r="4" fill="#50E6FF"/></svg>,
  "Azure DevOps":  <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D4"/><path d="M8 12l8-4 8 4v8l-8 4-8-4z" fill="none" stroke="#50E6FF" strokeWidth="1.8"/><path d="M16 8v8M8 12l8 4 8-4" stroke="#50E6FF" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  /* ── AWS Services ── */
  "EC2":           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><rect x="8" y="8" width="16" height="16" rx="2" fill="#FF9900"/><text x="16" y="20" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold">EC2</text></svg>,
  "Lambda":        <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><path d="M8 26l5-10 3 5 5-11" fill="none" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "Elastic Beanstalk":<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><path d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S21.5 6 16 6z" fill="none" stroke="#FF9900" strokeWidth="2"/><path d="M16 10c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" fill="#FF9900" opacity=".4"/></svg>,
  "S3":            <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><path d="M16 7l10 5v8l-10 5-10-5v-8z" fill="#FF9900" opacity=".3" stroke="#FF9900" strokeWidth="1.5"/><text x="16" y="20" textAnchor="middle" fill="#FF9900" fontSize="8" fontFamily="monospace" fontWeight="bold">S3</text></svg>,
  "CloudWatch":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><path d="M8 22c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="none" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round"/><circle cx="16" cy="22" r="2" fill="#FF9900"/></svg>,
  "RDS":           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#232F3E"/><ellipse cx="16" cy="11" rx="9" ry="4" fill="#FF9900" opacity=".8"/><path d="M7 11v5c0 2.2 4 4 9 4s9-1.8 9-4v-5" fill="none" stroke="#FF9900" strokeWidth="1.8"/><path d="M7 16v5c0 2.2 4 4 9 4s9-1.8 9-4v-5" fill="none" stroke="#FF9900" strokeWidth="1.8"/></svg>,
  /* ── GCP Services ── */
  "GCE":           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#fff"/><rect x="8" y="8" width="16" height="16" rx="2" fill="#4285F4"/><text x="16" y="20" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold">GCE</text></svg>,
  "App Engine":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#fff"/><path d="M16 6l10 8-10 8-10-8z" fill="#4285F4"/><path d="M16 22l10-8v6l-10 8-10-8v-6z" fill="#34A853" opacity=".7"/></svg>,
  "Cloud Functions":<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#fff"/><path d="M10 22l6-12 6 12" fill="none" stroke="#4285F4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 18h6" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  /* ── DevOps ── */
  Docker:          <svg viewBox="0 0 32 32"><path d="M3 17c0-2.5 3-3.8 6.5-3.3.5-3 3-4.8 6.5-4.8s6 1.8 6.5 4.8c3.5-.5 6.5 1 6.5 3.3H3z" fill="#2496ED"/><rect x="7.5" y="9.2" width="3" height="2.5" rx=".4" fill="none" stroke="#fff" strokeWidth=".9"/><rect x="11.5" y="9.2" width="3" height="2.5" rx=".4" fill="none" stroke="#fff" strokeWidth=".9"/><rect x="15.5" y="9.2" width="3" height="2.5" rx=".4" fill="none" stroke="#fff" strokeWidth=".9"/><rect x="11.5" y="12.7" width="3" height="2.5" rx=".4" fill="none" stroke="#fff" strokeWidth=".9"/><rect x="7.5" y="12.7" width="3" height="2.5" rx=".4" fill="none" stroke="#fff" strokeWidth=".9"/></svg>,
  Kubernetes:      <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#326CE5"/><circle cx="16" cy="16" r="3.5" fill="none" stroke="white" strokeWidth="1.8"/><line x1="16" y1="3" x2="16" y2="12.5" stroke="white" strokeWidth="1.4"/><line x1="16" y1="19.5" x2="16" y2="29" stroke="white" strokeWidth="1.4"/><line x1="3" y1="16" x2="12.5" y2="16" stroke="white" strokeWidth="1.4"/><line x1="19.5" y1="16" x2="29" y2="16" stroke="white" strokeWidth="1.4"/><line x1="7" y1="7" x2="13" y2="13" stroke="white" strokeWidth="1.4"/><line x1="19" y1="19" x2="25" y2="25" stroke="white" strokeWidth="1.4"/><line x1="25" y1="7" x2="19" y2="13" stroke="white" strokeWidth="1.4"/><line x1="7" y1="25" x2="13" y2="19" stroke="white" strokeWidth="1.4"/></svg>,
  Terraform:       <svg viewBox="0 0 32 32"><polygon points="5,18 12,22 12,10 5,6" fill="#7B42BC"/><polygon points="13,22 20,26 20,14 13,10" fill="#7B42BC" opacity=".7"/><polygon points="21,18 28,14 28,6 21,10" fill="#7B42BC" opacity=".5"/><polygon points="13,8 20,12 27,8 20,4" fill="#7B42BC" opacity=".9"/></svg>,
  Jenkins:         <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#D33834"/><circle cx="16" cy="12" r="5" fill="#F0D6B7"/><path d="M9 23c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="#335061"/></svg>,
  Ansible:         <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#EE0000"/><path d="M16 7l7 18h-3l-5-12-4 8h3.5L16 23l-8 2 9-18z" fill="white"/></svg>,
  Prometheus:      <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#E6522C"/><circle cx="16" cy="16" r="2.5" fill="white"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 7l2.5 2.5M22.5 22.5l2.5 2.5M7 25l2.5-2.5M22.5 9.5l2.5-2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  Grafana:         <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#F46800"/><path d="M9 22l3-6 3 4 3-8 3 10" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  GitLab:          <svg viewBox="0 0 32 32"><path d="M16 28L4 12l4-10 4 10h8l4-10 4 10z" fill="#FCA326"/><path d="M16 28L8 12l4-10 4 10z" fill="#FC6D26"/><path d="M16 28L24 12l-4-10-4 10z" fill="#E24329"/></svg>,
  Bitbucket:       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#2684FF"/><path d="M4 6l4.2 20h15.6L28 6H4zm15.6 12.5H12.4l-1.4-6.5h8l-1.4 6.5z" fill="white"/></svg>,
  Nginx:           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#009900"/><path d="M6 26V10l10-6 10 6v16l-10 4z" fill="none" stroke="white" strokeWidth="1.5"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="monospace" fontWeight="bold">nginx</text></svg>,
  Helm:            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#0F1689"/><path d="M16 8l4 4h3l1 4-3 3 1 4-4 1-3-3-3 3-4-1 1-4-3-3 1-4h3z" fill="white" opacity=".8"/></svg>,
  "Linux Admin":   <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#FCC624"/><circle cx="16" cy="13" r="5" fill="#231F20"/><ellipse cx="12" cy="11" rx="1.5" ry="2" fill="white"/><ellipse cx="20" cy="11" rx="1.5" ry="2" fill="white"/><circle cx="12" cy="11.5" r=".8" fill="#231F20"/><circle cx="20" cy="11.5" r=".8" fill="#231F20"/><path d="M11 24c0-3 2.3-5 5-5s5 2 5 5" fill="#231F20"/></svg>,
  "Windows Srv":   <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D6"/><rect x="4" y="4" width="11" height="11" rx="1" fill="white"/><rect x="17" y="4" width="11" height="11" rx="1" fill="white"/><rect x="4" y="17" width="11" height="11" rx="1" fill="white"/><rect x="17" y="17" width="11" height="11" rx="1" fill="white"/></svg>,
  "CI/CD":         <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#2E3440"/><circle cx="8" cy="16" r="3" fill="#88C0D0"/><circle cx="24" cy="16" r="3" fill="#A3BE8C"/><path d="M11 16h10M20 13l4 3-4 3" fill="none" stroke="#A3BE8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  /* ── Network Equipment ── */
  Cisco:           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1BA0D7"/><path d="M4 19h3v-5H4v5zm5-6h3v8H9v-8zm5-4h3v12h-3V9zm5 4h3v8h-3v-8zm5-2h3v12h-3V11z" fill="white"/></svg>,
  "HP / Aruba":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#00ADEF"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">HP</text></svg>,
  Huawei:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#CF0A2C"/><path d="M16 6c0 0-5 3-5 10s5 10 5 10 5-3 5-10S16 6 16 6zm-3 10c0-3 1.3-5.5 3-7.2 1.7 1.7 3 4.2 3 7.2s-1.3 5.5-3 7.2c-1.7-1.7-3-4.2-3-7.2z" fill="white"/></svg>,
  Fortinet:        <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#EE2025"/><path d="M10 8h5v7h7v5h-7v4h-5V8z" fill="white"/></svg>,
  "TP-Link":       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#4DAFE8"/><circle cx="16" cy="14" r="4" fill="white"/><path d="M8 24c0-4.4 3.6-6 8-6s8 1.6 8 6" fill="white"/></svg>,
  Hikvision:       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#E31E24"/><path d="M8 12h16v2H8zm0 4h16v2H8zm0 4h10v2H8z" fill="white"/></svg>,
  Dahua:           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#005BAA"/><circle cx="16" cy="16" r="5" fill="none" stroke="white" strokeWidth="2"/><circle cx="16" cy="16" r="2" fill="white"/><path d="M16 8v4M16 20v4M8 16h4M20 16h4" stroke="white" strokeWidth="1.5"/></svg>,
  "PBX / VoIP":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#34495E"/><path d="M8 12c0-2 2-4 4-4h1l2 4-2 2c1 2 3 4 5 5l2-2 4 2v1c0 2-2 4-4 4-6 0-12-6-12-12z" fill="white"/></svg>,
  /* ── Cabling ── */
  "RJ45":          <svg viewBox="0 0 32 32"><rect x="8" y="9" width="16" height="13" rx="2" fill="#FF8C00"/><rect x="10" y="14" width="2" height="5" rx="1" fill="white"/><rect x="13" y="13" width="2" height="6" rx="1" fill="white"/><rect x="16" y="14" width="2" height="5" rx="1" fill="white"/><rect x="19" y="13" width="2" height="6" rx="1" fill="white"/><path d="M16 22v5" stroke="#FF8C00" strokeWidth="2"/></svg>,
  "BNC / Coax":    <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="#888" strokeWidth="2.5"/><circle cx="16" cy="16" r="5" fill="#555"/><circle cx="16" cy="16" r="2" fill="#FFD700"/><path d="M26 16h4M2 16h4" stroke="#888" strokeWidth="2"/></svg>,
  "Patch Panel":   <svg viewBox="0 0 32 32"><rect x="2" y="11" width="28" height="10" rx="2" fill="#2C3E50"/><circle cx="7" cy="16" r="2" fill="#2ECC71"/><circle cx="11.5" cy="16" r="2" fill="#2ECC71"/><circle cx="16" cy="16" r="2" fill="#E74C3C"/><circle cx="20.5" cy="16" r="2" fill="#2ECC71"/><circle cx="25" cy="16" r="2" fill="#F39C12"/></svg>,
  "Fiber Optic":   <svg viewBox="0 0 32 32"><path d="M4 16 Q10 8 16 16 Q22 24 28 16" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="4" cy="16" r="2.5" fill="#00e5ff"/><circle cx="28" cy="16" r="2.5" fill="#00e5ff"/></svg>,
  "UTP / STP":     <svg viewBox="0 0 32 32"><path d="M4 12 Q8 8 12 12 Q16 16 20 12 Q24 8 28 12" fill="none" stroke="#F39C12" strokeWidth="2.2"/><path d="M4 20 Q8 16 12 20 Q16 24 20 20 Q24 16 28 20" fill="none" stroke="#F39C12" strokeWidth="2.2"/></svg>,
  "Structured Cabling":<svg viewBox="0 0 32 32"><rect x="4" y="6" width="24" height="4" rx="1" fill="#607D8B"/><rect x="4" y="14" width="24" height="4" rx="1" fill="#607D8B"/><rect x="4" y="22" width="24" height="4" rx="1" fill="#607D8B"/><rect x="8" y="10" width="2" height="4" fill="#37474F"/><rect x="14" y="10" width="2" height="4" fill="#37474F"/><rect x="20" y="10" width="2" height="4" fill="#37474F"/></svg>,
  /* ── Network Services & Security ── */
  VPN:             <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#2980B9"/><path d="M8 16h16M16 8c-4 2-6 5-6 8s2 6 6 8M16 8c4 2 6 5 6 8s-2 6-6 8" fill="none" stroke="white" strokeWidth="1.5"/></svg>,
  "DHCP / DNS":    <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#1ABC9C"/><path d="M8 16h16M16 8c-4 2-6 5-6 8s2 6 6 8M16 8c4 2 6 5 6 8s-2 6-6 8" fill="none" stroke="white" strokeWidth="1.5"/></svg>,
  Postfix:         <svg viewBox="0 0 32 32"><rect x="3" y="8" width="26" height="18" rx="2" fill="#E74C3C"/><path d="M3 10l13 9 13-9" fill="none" stroke="white" strokeWidth="2"/></svg>,
  "Active Dir.":   <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0078D6"/><circle cx="16" cy="12" r="4" fill="white"/><path d="M8 26c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="white"/></svg>,
  "Linux Srv":     <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#FCC624"/><circle cx="16" cy="13" r="5" fill="#231F20"/><ellipse cx="12" cy="11" rx="1.5" ry="2" fill="white"/><ellipse cx="20" cy="11" rx="1.5" ry="2" fill="white"/><circle cx="12" cy="11.5" r=".8" fill="#231F20"/><circle cx="20" cy="11.5" r=".8" fill="#231F20"/><path d="M11 24c0-3 2.3-5 5-5s5 2 5 5" fill="#231F20"/></svg>,
  Nagios:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#009DCC"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold">NAGIOS</text></svg>,
  pfSense:         <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#212121"/><text x="16" y="22" textAnchor="middle" fill="#00B2E3" fontSize="7" fontFamily="monospace" fontWeight="bold">pfSense</text></svg>,
  "Cisco ASA":     <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1BA0D7"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">ASA</text></svg>,
  FortiGate:       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#EE2025"/><path d="M10 8h5v7h7v5h-7v4h-5V8z" fill="white" opacity=".85"/></svg>,
  Wireshark:       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1679A7"/><path d="M8 22l3-7 3 5 3-10 3 12" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  Nmap:            <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#2C3E50"/><text x="16" y="22" textAnchor="middle" fill="#E74C3C" fontSize="9" fontFamily="monospace" fontWeight="bold">nmap</text></svg>,
  Metasploit:      <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1a1a1a"/><text x="16" y="21" textAnchor="middle" fill="#00FF41" fontSize="8" fontFamily="monospace" fontWeight="bold">MSF</text></svg>,
  "Snort / IDS":   <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#8B0000"/><path d="M16 8l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="#FF6B6B"/></svg>,
  "OpenVPN":       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#EA7E20"/><path d="M16 7c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 4a5 5 0 010 10 5 5 0 010-10z" fill="white"/></svg>,
  "SSL / TLS":     <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#27AE60"/><rect x="10" y="14" width="12" height="10" rx="2" fill="white"/><path d="M12 14v-3a4 4 0 018 0v3" fill="none" stroke="white" strokeWidth="2"/><circle cx="16" cy="19" r="1.5" fill="#27AE60"/></svg>,
  "Zabbix":        <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#D40000"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">ZBX</text></svg>,
  "SIEM":          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#6C3483"/><path d="M8 22l3-7 3 5 3-10 3 12" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/><circle cx="8" cy="22" r="1.5" fill="#E74C3C"/></svg>,
  "Kali Linux":    <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1a1a1a"/><path d="M16 6l10 10-10 10L6 16z" fill="none" stroke="#268BD2" strokeWidth="2"/><text x="16" y="20" textAnchor="middle" fill="#268BD2" fontSize="7" fontFamily="monospace" fontWeight="bold">KALI</text></svg>,
  /* ── Dev Tools ── */
  "VS Code":       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#007ACC"/><path d="M6 22.5L16 16 6 9.5V7l20 9.5-20 9v-3z" fill="white"/></svg>,
  GitHub:          <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#24292E"/><path d="M16 5.5a10.5 10.5 0 00-3.3 20.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.8-.3 2.7-.3.9 0 1.8.1 2.7.3 2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.6.7.5A10.5 10.5 0 0016 5.5z" fill="white"/></svg>,
  Figma:           <svg viewBox="0 0 32 32"><circle cx="21" cy="10" r="5" fill="#1ABCFE"/><circle cx="21" cy="22" r="5" fill="#0ACF83"/><circle cx="9" cy="22" r="5" fill="#FF7262"/><path d="M9 5h12a5 5 0 010 10H9a5 5 0 010-10z" fill="#F24E1E"/><path d="M9 15h0a5 5 0 010 10h0a5 5 0 010-10z" fill="#A259FF"/></svg>,
  Postman:         <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#FF6C37"/><path d="M16 10a6 6 0 010 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z" fill="white"/><path d="M20 12l4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
  SonarQube:       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#4E9BCD"/><path d="M8 22c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 24c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".7"/></svg>,
  StarUML:         <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#EA4335"/><polygon points="16,5 19,13 28,13 21,18 24,27 16,22 8,27 11,18 4,13 13,13" fill="#FFD700"/></svg>,
  Jira:            <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#2684FF"/><path d="M16 5L27 16 16 27 5 16z" fill="#0052CC"/><path d="M16 10l6 6-6 6-6-6z" fill="white"/></svg>,
  "draw.io":       <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#F08705"/><rect x="6" y="8" width="8" height="6" rx="1" fill="white"/><rect x="18" y="18" width="8" height="6" rx="1" fill="white"/><path d="M14 11h4M22 18v-4h-4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Slack:           <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#4A154B"/><rect x="10" y="6" width="4" height="10" rx="2" fill="#E01E5A"/><rect x="18" y="16" width="4" height="10" rx="2" fill="#ECB22E"/><rect x="6" y="14" width="10" height="4" rx="2" fill="#36C5F0"/><rect x="16" y="12" width="10" height="4" rx="2" fill="#2EB67D"/></svg>,
  Trello:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0079BF"/><rect x="4" y="6" width="10" height="20" rx="2" fill="white"/><rect x="18" y="6" width="10" height="12" rx="2" fill="white"/></svg>,
  DBeaver:         <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#3b4d61"/><path d="M16 8C11 8 7 11 7 16s4 8 9 8 9-3.6 9-8-4-8-9-8zm0 13c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5-2.7 5-6 5z" fill="#A5CFF0"/></svg>,
  Insomnia:        <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#4000BF"/><circle cx="16" cy="16" r="8" fill="none" stroke="white" strokeWidth="2"/><path d="M16 8v8l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
  VirtualBox:      <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#183A61"/><rect x="5" y="8" width="14" height="10" rx="1" fill="white" opacity=".8"/><rect x="13" y="14" width="14" height="10" rx="1" fill="#00ADEF"/></svg>,
  Notion:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="white"/><path d="M8 8h10l6 6v10H8V8zm10 0v6h6" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinejoin="round"/></svg>,
  "MobaXterm":     <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1F2937"/><text x="7" y="23" fill="#60A5FA" fontSize="14" fontFamily="monospace" fontWeight="bold">$</text><text x="18" y="23" fill="#34D399" fontSize="12" fontFamily="monospace">▮</text></svg>,
  VMware:          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#607078"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">VMware</text></svg>,
  /* Cloud Tools */
  "Terraform Cloud":<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#7B42BC"/><polygon points="5,19 11,23 11,11 5,7" fill="white"/><polygon points="13,23 19,27 19,15 13,11" fill="white" opacity=".7"/><polygon points="21,7 27,11 21,15" fill="white" opacity=".5"/></svg>,
  /* Net Tools */
  "Packet Tracer": <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1BA0D7"/><path d="M8 16h6l4-6 4 12 4-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "GNS3":          <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#2C3E50"/><circle cx="9" cy="16" r="4" fill="#E74C3C"/><circle cx="23" cy="16" r="4" fill="#3498DB"/><path d="M13 16h6" stroke="white" strokeWidth="2"/></svg>,
  "SecureCRT":     <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1a3a4a"/><text x="16" y="22" textAnchor="middle" fill="#00B4D8" fontSize="8" fontFamily="monospace" fontWeight="bold">CRT</text></svg>,
  "PuTTY":         <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#003B57"/><text x="16" y="22" textAnchor="middle" fill="#00C4A4" fontSize="8" fontFamily="monospace" fontWeight="bold">PuTTY</text></svg>,
};

const Ic = ({ n, s = 20 }) => {
  const svg = L[n];
  const fb = <svg viewBox="0 0 32 32" width={s} height={s}><rect width="32" height="32" rx="4" fill="#2a2a3a"/><text x="16" y="21" textAnchor="middle" fill="#aaa" fontSize="7" fontFamily="monospace">{String(n).slice(0,3)}</text></svg>;
  return (
    <span style={{display:"inline-flex",alignItems:"center",width:s,height:s,flexShrink:0,lineHeight:0}}>
      {svg ? React.cloneElement(svg,{width:s,height:s}) : fb}
    </span>
  );
};

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const CATS = [
  {
    id:"web", label:"Full-Stack Dev", icon:"🌐", color:"#00e5ff",
    desc:"I have solid mastery of the full web development stack — crafting accessible, pixel-perfect frontends with modern frameworks and architecting scalable backend APIs. I independently design, build and ship complete production-ready applications, from database schema to deployment, covering every layer of the stack with confidence.",
    groups:[
      { title:"Languages", items:["HTML5","CSS3","JavaScript","TypeScript","Python","PHP","Java","C++","C#","SQL","Bash"] },
      { title:"Frameworks & Libraries", items:["React","Next.js","Vue.js","Nuxt","Angular","Laravel","Symfony","Django","Flask","Express.js","Spring Boot","ASP.NET","Bootstrap","Tailwind","jQuery","React Native"] },
      { title:"Databases & Storage", items:["MySQL","PostgreSQL","MariaDB","MongoDB","Redis","Oracle","SQL Server","SQLite"] },
    ],
    toolsLabel:"Dev Tools & Environment",
    tools:["VS Code","GitHub","Figma","Postman","SonarQube","StarUML","Jira","draw.io","Slack","Trello","DBeaver","Insomnia","VirtualBox","Notion"],
  },
  {
    id:"cloud", label:"Cloud & DevOps", icon:"☁️", color:"#a78bfa",
    desc:"I architect and operate cloud-native infrastructure across AWS, Azure, Google Cloud and IBM Cloud. I design scalable, fault-tolerant systems using managed services, automate deployments with CI/CD pipelines and Infrastructure as Code, containerise workloads with Docker and Kubernetes, and monitor everything with Prometheus and Grafana.",
    groups:[
      { title:"Cloud Providers", items:["AWS","Azure","Google Cloud","IBM Cloud"] },
      { title:"AWS Services", items:["EC2","Lambda","S3","RDS","Elastic Beanstalk","CloudWatch"] },
      { title:"Azure Services", items:["Azure VM","App Service","Azure Functions","Blob Storage","Azure Disk","Azure DevOps"] },
      { title:"Google Cloud Services", items:["GCE","App Engine","Cloud Functions"] },
      { title:"DevOps & Automation", items:["Docker","Kubernetes","Terraform","Ansible","Jenkins","Helm","GitLab","Bitbucket","Nginx","CI/CD","Prometheus","Grafana"] },
      { title:"Server & OS", items:["Linux Admin","Windows Srv"] },
    ],
    toolsLabel:"Cloud Tools & Platforms",
    tools:["MobaXterm","VMware","Slack","Jira","GitLab","Bitbucket","CloudWatch","Terraform Cloud"],
  },
  {
    id:"net", label:"Network & Security", icon:"🔒", color:"#34d399",
    desc:"End-to-end enterprise network infrastructure — from structured cabling and switching to firewalls, VPNs, CCTV and voice systems. Full stack of server administration, network monitoring and penetration testing. I design, deploy and harden both physical and virtual network environments, ensuring reliability, performance and security at every layer.",
    groups:[
      { title:"Cabling & Physical Layer", items:["RJ45","Structured Cabling","Fiber Optic","UTP / STP","BNC / Coax","Patch Panel"] },
      { title:"Services & Protocols", items:["VPN","OpenVPN","DHCP / DNS","Active Dir.","Postfix","Windows Srv","Linux Srv","SSL / TLS"] },
      { title:"Firewalls & Monitoring", items:["pfSense","Cisco ASA","FortiGate","Nagios","Zabbix","Wireshark","Snort / IDS","SIEM"] },
      { title:"Penetration Testing", items:["Kali Linux","Nmap","Metasploit","Wireshark"] },
    ],
    toolsLabel:"Equipment & tools",
    tools:["Cisco","HP / Aruba","Huawei","Fortinet","TP-Link","Hikvision","Dahua","PBX / VoIP","Packet Tracer","GNS3","SecureCRT","PuTTY"],
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function Skills() {
  const [vis, setVis] = useState(false);
  const [tab, setTab] = useState("web");
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cat   = CATS.find(c => c.id === tab);
  const total = cat.groups.reduce((a, g) => a + g.items.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        @keyframes fuUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes fuPop { from{opacity:0;transform:scale(.82) translateY(6px)} to{opacity:1;transform:none} }
        @keyframes ln    { from{width:0;opacity:0} to{width:2.2rem;opacity:1} }
        *{box-sizing:border-box;margin:0;padding:0}

        .sk{font-family:'DM Sans',sans-serif;background:#060910;min-height:100vh;padding:5.5rem 0 7rem;position:relative;overflow:hidden;}
        .sk-b1,.sk-b2{position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px);}
        .sk-b1{width:700px;height:700px;top:-200px;left:-130px;background:radial-gradient(circle,rgba(0,229,255,.07),transparent 70%);}
        .sk-b2{width:580px;height:580px;bottom:-180px;right:-90px;background:radial-gradient(circle,rgba(167,139,250,.07),transparent 70%);}
        .sk-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.013) 1px,transparent 1px);background-size:56px 56px;pointer-events:none;}
        .sk-in{max-width:1400px;margin:0 auto;padding:0 2rem;position:relative;z-index:1;}

        /* header */
        .sk-eye{display:inline-flex;align-items:center;gap:.6rem;font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#00e5ff;margin-bottom:1rem;opacity:0;}
        .sk-eye.v{animation:fuUp .7s cubic-bezier(.16,1,.3,1) .1s forwards;}
        .sk-eye::before{content:'';height:1px;background:#00e5ff;animation:ln .6s ease .3s both;}
        .sk-h1{font-family:'Syne',sans-serif;font-size:clamp(2.4rem,5vw,4.2rem);font-weight:800;color:#f0f4f8;line-height:1.04;letter-spacing:-.025em;margin-bottom:3rem;opacity:0;}
        .sk-h1.v{animation:fuUp .8s cubic-bezier(.16,1,.3,1) .22s forwards;}
        .sk-h1 span{background:linear-gradient(135deg,#00e5ff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

        /* tabs */
        .sk-tabs{display:flex;gap:.55rem;flex-wrap:wrap;margin-bottom:2.8rem;opacity:0;}
        .sk-tabs.v{animation:fuUp .7s cubic-bezier(.16,1,.3,1) .38s forwards;}
        .sk-tab{display:inline-flex;align-items:center;gap:.45rem;padding:.55rem 1.3rem;border-radius:50px;font-family:'Syne',sans-serif;font-size:.74rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);color:rgba(248,250,252,.4);cursor:pointer;transition:all .22s ease;}
        .sk-tab:hover{color:rgba(248,250,252,.82);background:rgba(255,255,255,.04);}

        /* layout */
        .sk-body{display:grid;grid-template-columns:1fr 440px;gap:2.6rem;align-items:start;}
        @media(max-width:1100px){.sk-body{grid-template-columns:1fr;}}

        /* LEFT */
        .sk-groups{display:flex;flex-direction:column;gap:1.4rem;opacity:0;}
        .sk-groups.v{animation:fuUp .8s cubic-bezier(.16,1,.3,1) .5s forwards;}
        .sk-group{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.065);border-radius:1.1rem;padding:1.5rem 1.8rem;}
        .sk-gtitle{font-family:'Syne',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:rgba(248,250,252,.26);margin-bottom:1rem;}
        .sk-chips{display:flex;flex-wrap:wrap;gap:.52rem;}

        .sk-chip{
          display:inline-flex;align-items:center;gap:.42rem;
          padding:.34rem .78rem .34rem .4rem;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
          border-radius:.6rem;cursor:default;transition:all .17s ease;opacity:0;
        }
        .sk-chip.v{animation:fuPop .3s cubic-bezier(.34,1.56,.64,1) forwards;}
        .sk-chip:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.18);transform:translateY(-2px);}
        .sk-chip-lbl{font-size:.72rem;font-weight:500;color:rgba(248,250,252,.65);white-space:nowrap;}

        /* RIGHT */
        .sk-right{display:flex;flex-direction:column;gap:1.8rem;}

        /* card — bigger */
        .sk-card{border-radius:1.2rem;padding:2.4rem 2.6rem;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.025);opacity:0;}
        .sk-card.v{animation:fuUp .8s cubic-bezier(.16,1,.3,1) .65s forwards;}
        .sk-card-icon{font-size:2.8rem;display:block;margin-bottom:1.1rem;}
        .sk-card-name{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:.9rem;}
        .sk-card-desc{font-size:1rem;font-weight:300;color:rgba(248,250,252,.52);line-height:1.95;}
        .sk-card-stats{margin-top:1.5rem;padding-top:1.3rem;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:2rem;}
        .sk-stat{display:flex;flex-direction:column;gap:.15rem;}
        .sk-stat-n{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;line-height:1;}
        .sk-stat-l{font-size:.65rem;color:rgba(248,250,252,.3);letter-spacing:.08em;text-transform:uppercase;}

        /* tools panel — bigger */
        .sk-tpanel{border-radius:1.2rem;padding:2rem 2.2rem;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.025);opacity:0;}
        .sk-tpanel.v{animation:fuUp .8s cubic-bezier(.16,1,.3,1) .82s forwards;}
        .sk-tpanel-title{font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:rgba(248,250,252,.26);margin-bottom:1.3rem;}
        .sk-tgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:.7rem;}

        .sk-tool{
          display:flex;align-items:center;gap:.55rem;
          padding:.6rem .9rem;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.065);
          border-radius:.7rem;transition:all .17s ease;cursor:default;opacity:0;
        }
        .sk-tool.v{animation:fuPop .3s cubic-bezier(.34,1.56,.64,1) forwards;}
        .sk-tool:hover{transform:translateY(-2px);}
        .sk-tool-lbl{font-size:.82rem;font-weight:500;color:rgba(248,250,252,.6);white-space:nowrap;}
      `}</style>

      <section className="sk" ref={ref}>
        <div className="sk-b1"/><div className="sk-b2"/><div className="sk-grid"/>
        <div className="sk-in">
          <p className={`sk-eye${vis?" v":""}`}>Expertise</p>
          <h2 className={`sk-h1${vis?" v":""}`}>My <span>Skills</span></h2>

          {/* TABS */}
          <div className={`sk-tabs${vis?" v":""}`}>
            {CATS.map(c => (
              <button key={c.id} className="sk-tab"
                style={tab===c.id?{borderColor:c.color+"72",color:c.color,background:c.color+"18",boxShadow:`0 0 18px ${c.color}14`}:{}}
                onClick={() => setTab(c.id)}
              >{c.icon} {c.label}</button>
            ))}
          </div>

          <div className="sk-body">
            {/* LEFT — chips only (logo + name) */}
            <div className="sk-groups v" key={tab}>
              {cat.groups.map((grp, gi) => (
                <div className="sk-group" key={grp.title}>
                  <p className="sk-gtitle">{grp.title}</p>
                  <div className="sk-chips">
                    {grp.items.map((name, ii) => (
                      <div key={name}
                        className={`sk-chip${vis?" v":""}`}
                        style={{animationDelay:`${0.52+gi*0.06+ii*0.032}s`}}
                      >
                        <Ic n={name} s={20}/>
                        <span className="sk-chip-lbl">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — bigger card + bigger tools */}
            <div className="sk-right">
              <div className={`sk-card${vis?" v":""}`}
                style={{borderColor:cat.color+"28",boxShadow:`0 0 50px ${cat.color}0d`}}
              >
                <span className="sk-card-icon">{cat.icon}</span>
                <div className="sk-card-name" style={{color:cat.color}}>{cat.label}</div>
                <p className="sk-card-desc">{cat.desc}</p>
                <div className="sk-card-stats">
                  <div className="sk-stat">
                    <span className="sk-stat-n" style={{color:cat.color}}>{total}</span>
                    <span className="sk-stat-l">Technologies</span>
                  </div>
                  <div className="sk-stat">
                    <span className="sk-stat-n" style={{color:cat.color}}>{cat.groups.length}</span>
                    <span className="sk-stat-l">Domains</span>
                  </div>
                </div>
              </div>

              <div className={`sk-tpanel${vis?" v":""}`}
                style={{borderColor:cat.color+"20"}}
              >
                <p className="sk-tpanel-title">{cat.toolsLabel}</p>
                <div className="sk-tgrid">
                  {cat.tools.map((t, i) => (
                    <div key={t}
                      className={`sk-tool${vis?" v":""}`}
                      style={{animationDelay:`${0.88+i*0.05}s`,borderColor:`${cat.color}1a`}}
                      onMouseEnter={e=>{e.currentTarget.style.background=cat.color+"12";e.currentTarget.style.borderColor=cat.color+"45";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="";e.currentTarget.style.borderColor=cat.color+"1a";}}
                    >
                      <Ic n={t} s={22}/>
                      <span className="sk-tool-lbl">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
