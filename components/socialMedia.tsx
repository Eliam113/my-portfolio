"use client";
import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaYoutube } from 'react-icons/fa';

const iconClassName =
  'flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105';

const CustomSocialButtons = () => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-sm">
      <a href="https://www.linkedin.com/in/eliam-mputu/" target="_blank" rel="noopener noreferrer" className={iconClassName} aria-label="LinkedIn">
        <FaLinkedin className="text-[#0077B5]" />
      </a>
      <a href="https://github.com/Eliam113" target="_blank" rel="noopener noreferrer" className={iconClassName} aria-label="GitHub">
        <FaGithub className="text-[#f5f5f5]" />
      </a>
      <a href="https://www.facebook.com/EliamMputu/" target="_blank" rel="noopener noreferrer" className={iconClassName} aria-label="Facebook">
        <FaFacebook className="text-[#3b5998]" />
      </a>
      <a href="https://www.youtube.com/@eliammputu" target="_blank" rel="noopener noreferrer" className={iconClassName} aria-label="YouTube">
        <FaYoutube className="text-[#ff4444]" />
      </a>
    </div>
  );
};

export default CustomSocialButtons;

