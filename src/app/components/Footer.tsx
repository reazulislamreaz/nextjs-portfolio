"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950/50 backdrop-blur-xl border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-sm font-medium"
          >
            © {currentYear} <span className="text-zinc-300">Reazul Islam Reaz</span>. All rights reserved.
          </motion.p>
          
          <div className="flex items-center gap-8">
            <Link href="/#about" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">About</Link>
            <Link href="/#system-architecture" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">Architecture</Link>
            <Link href="/#skills" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">Skills</Link>
            <Link href="/#ai-workflow" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">Workflow</Link>
            <Link href="/#projects" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">Projects</Link>
            <Link href="/#contact" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
