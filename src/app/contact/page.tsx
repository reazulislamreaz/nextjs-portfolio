"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  const [showMap, setShowMap] = useState(false);

  return (
    <Section id="contact" className="bg-black/40">
      <SectionHeader 
        title="Contact Me" 
        subtitle="Let's connect and discuss how we can work together on your next project"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8 w-full max-w-xl mx-auto md:mx-0"
        >
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md shadow-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.03)] transition-all duration-500 hover:border-zinc-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <p className="text-lg text-zinc-300 leading-relaxed mb-8 font-light">
                I&apos;m always open to discussing new opportunities, interesting
                projects, or just having a chat about technology and
                development. Feel free to reach out!
              </p>

              <div className="space-y-6 text-base">
                {/* Email Link */}
                <a 
                  href="mailto:reazul.dev@gmail.com"
                  className="flex items-center gap-4 p-4 bg-zinc-950/30 rounded-2xl border border-zinc-800/50 hover:border-emerald-500/40 transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover/item:bg-emerald-500/20 transition-colors duration-300">
                    <FiMail className="text-xl text-emerald-400 group-hover/item:text-emerald-300" />
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span className="text-zinc-300 group-hover/item:text-white transition-colors duration-300 whitespace-nowrap sm:text-base">
                      reazul.dev@gmail.com
                    </span>
                  </div>
                </a>

                {/* WhatsApp Link */}
                <a 
                  href="https://wa.me/8801770807782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-zinc-950/30 rounded-2xl border border-zinc-800/50 hover:border-emerald-500/40 transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover/item:bg-emerald-500/20 transition-colors duration-300">
                    <FaWhatsapp className="text-xl text-emerald-400 group-hover/item:text-emerald-300" />
                  </div>
                  <span className="text-zinc-300 group-hover/item:text-white transition-colors duration-300">
                    +8801770807782
                  </span>
                </a>

                {/* Map Link */}
                <div
                  onClick={() => setShowMap(true)}
                  className="flex items-center gap-4 p-4 bg-zinc-950/30 rounded-2xl border border-zinc-800/50 hover:border-emerald-500/40 transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover/item:bg-emerald-500/20 transition-colors duration-300">
                    <FiMapPin className="text-xl text-emerald-400 group-hover/item:text-emerald-300" />
                  </div>
                  <span className="text-zinc-300 group-hover/item:text-white transition-colors duration-300">
                    Faridpur, Bangladesh (Remote Available)
                  </span>
                </div>

                <div className="flex items-center gap-6 pt-6">
                  <span className="text-zinc-400 font-medium">
                    Follow me:
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://github.com/reazulislamreaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50 hover:border-zinc-500 transition-all duration-300 text-zinc-400 hover:text-white shadow-lg hover:shadow-emerald-500/5"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/reazulislamreaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20 hover:border-blue-400/50 hover:bg-blue-600/20 transition-all duration-300 text-blue-400 hover:text-blue-300 shadow-lg hover:shadow-blue-500/10"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMap(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiMapPin className="text-emerald-500" />
                  Faridpur, Bangladesh
                </h3>
                <button 
                  onClick={() => setShowMap(false)}
                  className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="aspect-video w-full bg-zinc-950">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116962.77526000047!2d89.75336181180237!3d23.601007785461247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe2f9b2d2f7fbd%3A0x6a0c0e7d5a5a1f0a!2sFaridpur!5e0!3m2!1sen!2sbd!4v1714850000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Faridpur, Bangladesh"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
