// ==========================================================================
// INTERACTIVE ANIMATED BACKGROUND SYSTEM
// Particle-based animation with click responsiveness
// ==========================================================================

class AnimatedBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error("Canvas element not found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.orbs = [];
    this.mousePos = { x: 0, y: 0 };
    this.clickEffect = null;

    // Color palette matching your theme
    this.colors = {
      primary: '#8b00ff',      // Deep purple
      accent: '#ff3b3b',       // Crimson red
      secondary: '#1f0808',    // Dark red
      light: 'rgba(255, 255, 255, 0.1)',
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    document.addEventListener('mousemove', (e) => this.updateMouse(e));
    document.addEventListener('click', (e) => this.handleClick(e));

    this.createOrbNetwork();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateMouse(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }

  createOrbNetwork() {
    // Create static orb positions that form a network
    const orbCount = 5;
    for (let i = 0; i < orbCount; i++) {
      this.orbs.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        baseX: 0,
        baseY: 0,
        radius: Math.random() * 3 + 1.5,
        velocity: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
        },
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAmount: 0,
      });
    }
  }

  handleClick(e) {
    // Only trigger click effect if not clicking on interactive elements
    if (
      e.target.closest('.nav-tab-item') ||
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('a:not(.nav-tab-item)')
    ) {
      return;
    }

    // Create explosion effect at click point
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = Math.random() * 3 + 2;

      this.particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: Math.random() > 0.5 ? this.colors.accent : this.colors.primary,
        size: Math.random() * 3 + 1,
        decay: Math.random() * 0.02 + 0.015,
      });
    }

    // Create a brief flash effect
    this.clickEffect = {
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 100,
      opacity: 0.6,
      expandSpeed: 4,
      color: this.colors.accent,
    };
  }

  updateParticles() {
    this.particles = this.particles.filter((p) => p.life > 0);

    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // Gravity
      p.life -= p.decay;
      p.vx *= 0.98; // Friction
    });
  }

  updateOrbs() {
    this.orbs.forEach((orb) => {
      // Slow floating motion
      orb.x += orb.velocity.x;
      orb.y += orb.velocity.y;

      // Bounce off edges
      if (orb.x - orb.radius < 0 || orb.x + orb.radius > this.canvas.width) {
        orb.velocity.x *= -1;
      }
      if (orb.y - orb.radius < 0 || orb.y + orb.radius > this.canvas.height) {
        orb.velocity.y *= -1;
      }

      // Keep in bounds
      orb.x = Math.max(orb.radius, Math.min(this.canvas.width - orb.radius, orb.x));
      orb.y = Math.max(orb.radius, Math.min(this.canvas.height - orb.radius, orb.y));

      // Pulsing effect
      orb.pulseAmount = Math.sin(Date.now() * orb.pulseSpeed * 0.001) * 1.5;

      // React to mouse proximity
      const dx = this.mousePos.x - orb.x;
      const dy = this.mousePos.y - orb.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        orb.velocity.x -= (dx / distance) * force * 0.15;
        orb.velocity.y -= (dy / distance) * force * 0.15;
      }

      // Damping
      orb.velocity.x *= 0.99;
      orb.velocity.y *= 0.99;
    });
  }

  updateClickEffect() {
    if (this.clickEffect) {
      this.clickEffect.radius += this.clickEffect.expandSpeed;
      this.clickEffect.opacity -= 0.015;

      if (this.clickEffect.opacity <= 0 || this.clickEffect.radius > this.clickEffect.maxRadius) {
        this.clickEffect = null;
      }
    }
  }

  drawOrbConnections() {
    // Draw lines between nearby orbs
    for (let i = 0; i < this.orbs.length; i++) {
      for (let j = i + 1; j < this.orbs.length; j++) {
        const dx = this.orbs[i].x - this.orbs[j].x;
        const dy = this.orbs[i].y - this.orbs[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250) {
          const opacity = (1 - distance / 250) * 0.3;
          this.ctx.strokeStyle = `rgba(139, 0, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.orbs[i].x, this.orbs[i].y);
          this.ctx.lineTo(this.orbs[j].x, this.orbs[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  drawOrbs() {
    this.orbs.forEach((orb) => {
      const currentRadius = orb.radius + orb.pulseAmount;

      // Glow effect
      const gradient = this.ctx.createRadialGradient(
        orb.x,
        orb.y,
        0,
        orb.x,
        orb.y,
        currentRadius * 3
      );
      gradient.addColorStop(0, `rgba(139, 0, 255, ${orb.opacity * 0.4})`);
      gradient.addColorStop(0.7, `rgba(139, 0, 255, ${orb.opacity * 0.1})`);
      gradient.addColorStop(1, 'rgba(139, 0, 255, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, currentRadius * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Core orb
      this.ctx.fillStyle = `rgba(139, 0, 255, ${orb.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Bright center
      this.ctx.fillStyle = `rgba(255, 255, 255, ${orb.opacity * 0.6})`;
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, currentRadius * 0.4, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawParticles() {
    this.particles.forEach((p) => {
      this.ctx.fillStyle = `${p.color}${Math.round(p.life * 255).toString(16).padStart(2, '0')}`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawClickEffect() {
    if (this.clickEffect) {
      this.ctx.strokeStyle = `rgba(255, 59, 59, ${this.clickEffect.opacity})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(
        this.clickEffect.x,
        this.clickEffect.y,
        this.clickEffect.radius,
        0,
        Math.PI * 2
      );
      this.ctx.stroke();
    }
  }

  animate() {
    // Clear canvas with semi-transparent background for trailing effect
    this.ctx.fillStyle = 'rgba(20, 17, 17, 0.15)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.updateOrbs();
    this.updateClickEffect();

    this.drawOrbConnections();
    this.drawOrbs();
    this.drawParticles();
    this.drawClickEffect();

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a brief moment to ensure canvas is in the DOM
  setTimeout(() => {
    new AnimatedBackground('animated-background-canvas');
  }, 100);
});
