import React from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import useScrollReveal from "../hooks/useScrollReveal";

const Footer = () => {
  const emailAddress = "bimoghanis@gmail.com";
  const whatsappNumber = "6287781379800";

  const emailSubject = "Opportunity / Collaboration Inquiry";
  const emailBody =
    "Hi Bimo, I would like to connect with you regarding an opportunity.";

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Bimo, I would like to connect with you regarding an opportunity.",
  )}`;

  const revealRef = useScrollReveal();

  return (
    <footer
      id="contact"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] pt-20 text-[var(--text-soft)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Contact Card */}
        <div className="reveal clay-card-static p-8 text-center lg:p-12" data-delay="80">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]">
            Let&apos;s Connect
          </p>

          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Interested in working together?
            <br />
            Let&apos;s <span className="text-[var(--accent-main)]">build something impactful.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
            I am actively open to full-time engineering roles, contracts, and collaborative projects in software development, data engineering, and applied machine learning.
          </p>

          {/* Main Contact Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
            <a
              href={mailtoLink}
              className="clay-button-primary inline-flex items-center justify-center gap-2.5 px-6 py-3 font-bold text-sm"
              style={{ borderRadius: "16px" }}
            >
              <FiMail className="text-base" />
              Email Me
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-button inline-flex items-center justify-center gap-2.5 bg-[var(--bg-card)] px-6 py-3 font-bold text-sm text-[var(--success-main)] transition-colors duration-200 hover:text-[var(--accent-main)]"
            >
              <FiPhone className="text-base" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Info Cards */}
          <div className="mx-auto mt-9 grid max-w-4xl gap-3.5 md:grid-cols-3">
            <a
              href={mailtoLink}
              className="clay-inset flex items-center gap-3.5 bg-[var(--bg-soft)] p-4 text-left text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]"
            >
              <span className="clay-icon-box flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--accent-soft)] text-[var(--accent-main)]">
                <FiMail />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[var(--text-muted)]">Email</p>
                <p className="truncate text-xs font-bold">{emailAddress}</p>
              </div>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-inset flex items-center gap-3.5 bg-[var(--bg-soft)] p-4 text-left text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--success-main)]"
            >
              <span className="clay-icon-box flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--accent-soft)] text-[var(--success-main)]">
                <FiPhone />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[var(--text-muted)]">WhatsApp</p>
                <p className="truncate text-xs font-bold">+62 877-8137-9800</p>
              </div>
            </a>

            <div className="clay-inset flex items-center gap-3.5 bg-[var(--bg-soft)] p-4 text-left text-[var(--text-soft)]">
              <span className="clay-icon-box flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--accent-soft)] text-[var(--accent-secondary)]">
                <FiMapPin />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[var(--text-muted)]">Location</p>
                <p className="truncate text-xs font-bold">Depok / Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-7 flex justify-center gap-3">
            <a
              href="https://github.com/bimoghanis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="clay-button flex h-11 w-11 items-center justify-center bg-[var(--bg-card)] text-lg text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]"
            >
              <FiGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="clay-button flex h-11 w-11 items-center justify-center bg-[var(--bg-card)] text-lg text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-secondary)]"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="reveal mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border-soft)] py-6 text-center text-xs md:flex-row md:text-left" data-delay="150">
          <p className="text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Bimo Ghanis Surya Putra Wibowo. All rights reserved.
          </p>

          <p className="font-semibold text-[var(--text-muted)]">
            Fresh Informatics Graduate • Telkom University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;