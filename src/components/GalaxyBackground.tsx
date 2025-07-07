
import { useEffect, useRef } from 'react';

interface GalaxyBackgroundProps {
  darkMode: boolean;
}

const GalaxyBackground = ({ darkMode }: GalaxyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    const numStars = darkMode ? 200 : 100;
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (darkMode ? 3 : 2) + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (darkMode) {
        gradient.addColorStop(0, '#0a0a23');
        gradient.addColorStop(0.5, '#1a1a3a');
        gradient.addColorStop(1, '#2a2a4a');
      } else {
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#B0E0E6');
        gradient.addColorStop(1, '#E0F6FF');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach((star, index) => {
        // Twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        if (darkMode) {
          const blueIntensity = Math.random() * 100 + 155;
          ctx.fillStyle = `rgba(${blueIntensity - 50}, ${blueIntensity - 30}, ${blueIntensity}, ${currentOpacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
        }
        
        ctx.fill();
        
        // Add glow effect for larger stars
        if (star.size > 2) {
          ctx.shadowBlur = darkMode ? 10 : 5;
          ctx.shadowColor = darkMode ? '#4a9eff' : '#ffffff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Move stars slowly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      });

      time += 0.01;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="galaxy-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GalaxyBackground;
