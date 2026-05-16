"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-dvh w-full bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid h-20 w-20 place-items-center rounded-2xl bg-zinc-900 shadow-xl ring-1 ring-zinc-800"
          aria-label="Loading portfolio"
        >
          <span className="select-none text-xl font-bold tracking-wide text-emerald-500">
            RIR
          </span>
        </motion.div>

        <div className="text-center">
          <p className="text-lg font-medium text-zinc-200">Loading portfolio</p>
          <p className="mt-1 text-sm text-zinc-500">
            Preparing content
            <span className="sr-only">, please wait</span>
          </p>
        </div>

        <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-zinc-900 ring-1 ring-zinc-800">
          <motion.div
            className="h-full rounded-full bg-emerald-500"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
