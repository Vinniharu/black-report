"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Shield, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Survex</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">Process</Link>
        </div>
        <Link 
          href="/create" 
          className="text-sm font-medium px-4 py-2 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full"
        >
          Create Report
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-white"></span>
            Professional Surveillance Reports
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            Streamline Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
              Security Reporting
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            Generate standard-compliant, printable PDF security and surveillance reports in minutes. Minimalistic, fast, and entirely secure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/create" 
              className="group flex items-center justify-center gap-2 h-14 px-8 bg-white text-black rounded-full font-semibold text-lg hover:bg-neutral-200 transition-all active:scale-95"
            >
              Start Reporting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#demo"
              className="flex items-center justify-center h-14 px-8 text-white rounded-full font-medium text-lg border border-white/20 hover:bg-white/5 transition-all"
            >
              View Template
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-32"
        >
          <FeatureCard 
            icon={<FileText className="w-6 h-6" />}
            title="Standardized Format"
            description="Built exactly to industry templates. Ensuring all activity, incidents, and officer details are captured perfectly."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Professional Output"
            description="Export directly to high-quality PDF. Clean, well-structured layouts ready for management review or filing."
          />
          <FeatureCard 
            icon={<CheckCircle className="w-6 h-6" />}
            title="Effortless Workflow"
            description="A modern, distraction-free interface guides you through daily activity logs and incident reports seamlessly."
          />
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Survex. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
      <div className="p-3 bg-white text-black rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}
