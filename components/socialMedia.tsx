"use client";
import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaYoutube } from 'react-icons/fa';

const CustomSocialButtons = () => {
  const iconStyle = { fontSize: '3.5rem', margin: '10px', cursor: 'pointer', border: '2px solid white', borderRadius: '80%', padding: '7px', transition: 'transform 0.2s' };

  return (
    <div className="flex left-0 top-0 h-full w-full md:w-1/2 flex justify-center items-center p-[5%] text-white">
      <a href="https://www.linkedin.com/in/eliam-mputu/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin style={{ ...iconStyle, color: '#0077B5' }} />
      </a>
      <a href="https://github.com/Eliam113" target="_blank" rel="noopener noreferrer">
        <FaGithub style={{ ...iconStyle, color: '#333' }} />
      </a>
      <a href="https://www.facebook.com/EliamMputu/" target="_blank" rel="noopener noreferrer">
        <FaFacebook style={{ ...iconStyle, color: '#3b5998' }} />
      </a>
      <a href="https://www.youtube.com/@eliammputu" target="_blank" rel="noopener noreferrer">
        <FaYoutube style={{ ...iconStyle, color: '#ff4444ff' }} />
      </a>
    </div>
  );
};

export default CustomSocialButtons;

