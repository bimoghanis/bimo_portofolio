import React from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

const Footer = () => {
  const emailAddress = "bimoghanis@gmail.com";
  const whatsappNumber = "6287781379800";

  const emailSubject = "Collaboration / Internship Opportunity";
  const emailBody =
    "Hi Bimo, I would like to connect with you regarding an opportunity.";

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Bimo, I would like to connect with you regarding an opportunity.",
  )}`;

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[var(--bg-main)] pt-20 text-[var(--text-soft)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        {/* Contact Card */}
        <div className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 text-center backdrop-blur-md transition-colors duration-300 [box-shadow:0_25px_50px_-12px_var(--shadow-main)] lg:p-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            Let&apos;s Connect
          </p>

          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Interested in working together?
            <br />
            Let&apos;s build something great.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[var(--text-muted)]">
            I&apos;m open to internship opportunities, collaborations, and
            projects related to web development, data analytics, machine
            learning, and data engineering.
          </p>

          {/* Main Contact Buttons */}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--accent-main)] px-6 py-3 font-bold text-white shadow-lg shadow-[var(--shadow-accent)] transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
            >
              <FiMail />
              Email Me
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--success-main)] bg-[var(--bg-card)] px-6 py-3 font-bold text-[var(--success-main)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--success-main)] hover:text-white"
            >
              <FiPhone />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Info */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            <a
              href={mailtoLink}
              className="flex items-center gap-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-soft)] p-4 text-left text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-main)]">
                <FiMail />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-[var(--text-muted)]">Email</p>
                <p className="truncate font-semibold">{emailAddress}</p>
              </div>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-soft)] p-4 text-left text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--success-main)] hover:text-[var(--success-main)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--success-main)]">
                <FiPhone />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-[var(--text-muted)]">WhatsApp</p>
                <p className="truncate font-semibold">+62 877-8137-9800</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-soft)] p-4 text-left text-[var(--text-soft)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-secondary)]">
                <FiMapPin />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-[var(--text-muted)]">Location</p>
                <p className="truncate font-semibold">Bandung, West Java</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="https://github.com/bimoghanis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-xl text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
            >
              <FiGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-xl text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)]"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-main)] py-6 text-center md:flex-row md:text-left">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Bimo Ghanis Surya Putra Wibowo.
            All rights reserved.
          </p>


        </div>
      </div>
    </footer>
  );
};

export default Footer;