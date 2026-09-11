"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSpotlight() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-25 pointer-events-none overflow-hidden dark:mix-blend-screen mix-blend-multiply">
      <motion.div 
        className="spotlight-wrapper will-change-transform"
        animate={{ 
          x: ['-20vw', '20vw'], 
          y: ['-15vh', '15vh'] 
        }}
        transition={{ 
          x: { duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }, 
          y: { duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'linear' } 
        }}
        transformTemplate={({ x, y }: any) => `translate3d(${x || 0}, ${y || 0}, 0)`}
      >
        <div className="univers-loader will-change-transform">
          <svg width="100%" height="100%" viewBox="0 0 160 160" className="relative z-10">
            <defs>
              <linearGradient id="neural-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-one)" />
                <stop offset="100%" stopColor="var(--color-two)" />
              </linearGradient>
            </defs>
            
            {/* Neural Network Connections - Mobile Optimized */}
            <g className="neural-line" stroke="white" opacity="0.3" fill="none">
              <path d="M80 80 L50 40 M80 80 L110 40 M80 80 L50 120 M80 80 L110 120 M80 80 L40 80 M80 80 L120 80" />
              <path d="M50 40 L30 30 M110 40 L130 30 M50 120 L30 130 M110 120 L130 130" />
            </g>

            {/* Traveling Neural Pulses (Electrical Firing) - Removed heavy filters */}
            <circle r="1.5" fill="white">
              <animateMotion dur="3s" repeatCount="indefinite" path="M80 80 L50 40 L30 30" />
            </circle>
            <circle r="1.5" fill="white">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M80 80 L110 120 L130 130" begin="0.8s" />
            </circle>
            <circle r="1.5" fill="white">
              <animateMotion dur="4s" repeatCount="indefinite" path="M80 80 L40 80" begin="1.2s" />
            </circle>

            {/* Neural Nodes (Soma / Synapses) - CSS scaling applied */}
            <circle cx="80" cy="80" className="neuron soma" />
            <circle cx="50" cy="40" className="neuron synapse" />
            <circle cx="110" cy="40" className="neuron synapse" />
            <circle cx="50" cy="120" className="neuron synapse" />
            <circle cx="110" cy="120" className="neuron synapse" />
            <circle cx="40" cy="80" className="neuron synapse" />
            <circle cx="120" cy="80" className="neuron synapse" />
          </svg>
          <div className="box" />
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .spotlight-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          max-width: 100vw;
          backface-visibility: hidden;
          perspective: 1000;
        }

        .univers-loader {
          --color-one: #ffbf48;
          --color-two: #be4a1d;
          --color-three: #ffbf4780;
          --color-four: #bf4a1d80;
          --color-five: #ffbf4740;
          --time-animation: 5s;
          --size: 6; 
          --neuron-scale: 1;
          --line-width: 0.5px;
          
          @media (max-width: 768px) {
            --size: 3.5;
            --neuron-scale: 0.8;
            --line-width: 0.3px;
          }
          
          position: relative;
          border-radius: 50%;
          width: calc(160px * var(--size));
          height: calc(160px * var(--size));
          filter: drop-shadow(0 0 30px var(--color-three)) drop-shadow(0 25px 60px var(--color-four));
          animation: colorize calc(var(--time-animation) * 4) ease-in-out infinite;
          backface-visibility: hidden;
        }

        .neuron {
          fill: white;
          animation: neuronPulse 2.5s infinite ease-in-out;
          will-change: opacity, transform;
          transform-box: fill-box;
          transform-origin: center;
        }

        .soma {
          r: calc(4px * var(--neuron-scale));
          fill: var(--color-one);
          animation-duration: 4s;
        }

        .synapse {
          r: calc(2.5px * var(--neuron-scale));
          opacity: 0.6;
        }

        .neural-line {
          stroke-width: var(--line-width);
          stroke: white;
          opacity: 0.2;
        }

        @keyframes neuronPulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.9) translate3d(0,0,0); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1) translate3d(0,0,0); 
          }
        }

        .univers-loader::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: solid 1px var(--color-five);
          background: radial-gradient(circle at center, var(--color-five), transparent 70%);
        }

        .univers-loader .box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        @keyframes colorize {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02) translate3d(0,0,0);
          }
        }
      `}} />
    </div>
  );
}
