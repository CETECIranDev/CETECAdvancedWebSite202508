import React, { useRef, useEffect } from 'react';

// 1. Define a specific interface for a single node
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NeuralNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // 2. Use the 'Node[]' type instead of 'any[]'
    let nodes: Node[] = [];
    const nodeCount = 60;
    const maxDistance = 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const primaryColor = isDark ? 'hsla(217, 91%, 60%, 1)' : 'hsla(221, 83%, 53%, 1)';
      const nodeColor = isDark ? 'hsla(210, 40%, 98%, 1)' : 'hsla(240, 4%, 46%, 1)';
      const lineColorDark = `hsla(210, 40%, 98%,`;
      const lineColorLight = `hsla(240, 4%, 46%,`;
      
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        nodes.forEach(linkNode => {
          const distance = Math.sqrt((node.x - linkNode.x) ** 2 + (node.y - linkNode.y) ** 2);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(linkNode.x, linkNode.y);
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = isDark ? `${lineColorDark} ${opacity})` : `${lineColorLight} ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        if (mouseRef.current.x && mouseRef.current.y) {
          const mouseDistance = Math.sqrt((node.x - mouseRef.current.x) ** 2 + (node.y - mouseRef.current.y) ** 2);
          if (mouseDistance < maxDistance * 1.5) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

export default NeuralNetworkCanvas;