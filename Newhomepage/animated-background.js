// ==========================================================================
// ORIGINAL ANIMATED GEOMETRIC MESH BACKGROUND
// Flowing wave patterns with procedural generation
// ==========================================================================

class GeometricMeshBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error("Canvas element not found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    this.mousePos = { x: 0, y: 0 };
    this.distortions = [];
    this.gridSize = 40;
    this.waveAmplitude = 15;

    this.colors = {
      primary: '#8b00ff',
      accent: '#ff3b3b',
      dark: '#0a0a0a',
      line: 'rgba(139, 0, 255, 0.15)',
      lineHot: 'rgba(255, 59, 59, 0.3)',
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    document.addEventListener('mousemove', (e) => this.updateMouse(e));
    document.addEventListener('click', (e) => this.handleClick(e));

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

  handleClick(e) {
    // Only trigger if not clicking UI elements
    if (
      e.target.closest('.nav-tab-item') ||
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('a:not(.nav-tab-item)')
    ) {
      return;
    }

    // Create ripple distortion at click point
    this.distortions.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 300,
      force: 1,
      life: 1,
      decay: 0.02,
    });
  }

  // Perlin-like noise using sine waves
  noise(x, y, time) {
    return (
      Math.sin(x * 0.01 + time * 0.001) * 0.5 +
      Math.sin(y * 0.01 + time * 0.0015) * 0.3 +
      Math.sin((x + y) * 0.005 + time * 0.001) * 0.2
    );
  }

  // Get wave offset for a point based on time and position
  getWaveOffset(x, y, time) {
    const wave1 = Math.sin(x * 0.003 + time * 0.002) * this.waveAmplitude;
    const wave2 = Math.cos(y * 0.003 + time * 0.0025) * (this.waveAmplitude * 0.7);
    const wave3 = Math.sin((x + y) * 0.002 + time * 0.0018) * (this.waveAmplitude * 0.5);

    return {
      x: wave1 + wave3,
      y: wave2 + wave3,
    };
  }

  // Apply distortion from click ripples
  applyDistortion(x, y) {
    let distX = 0;
    let distY = 0;

    this.distortions.forEach((d) => {
      const dx = x - d.x;
      const dy = y - d.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < d.maxRadius && distance > 0) {
        const factor = Math.sin((d.radius / d.maxRadius) * Math.PI);
        const strength = (1 - distance / d.maxRadius) * factor * d.force;

        distX += (dx / distance) * strength * 8;
        distY += (dy / distance) * strength * 8;
      }
    });

    return { x: distX, y: distY };
  }

  updateDistortions() {
    this.distortions = this.distortions.filter((d) => d.life > 0);

    this.distortions.forEach((d) => {
      d.radius += 5;
      d.life -= d.decay;
      d.force *= 0.95;
    });
  }

  drawMesh() {
    const cols = Math.ceil(this.canvas.width / this.gridSize) + 2;
    const rows = Math.ceil(this.canvas.height / this.gridSize) + 2;

    // Build grid points with wave animation
    const points = [];
    for (let row = -1; row < rows; row++) {
      points[row] = [];
      for (let col = -1; col < cols; col++) {
        const baseX = col * this.gridSize;
        const baseY = row * this.gridSize;

        const wave = this.getWaveOffset(baseX, baseY, this.time);
        const distortion = this.applyDistortion(baseX, baseY);

        points[row][col] = {
          x: baseX + wave.x + distortion.x,
          y: baseY + wave.y + distortion.y,
          baseX,
          baseY,
        };
      }
    }

    // Draw grid lines (horizontal and vertical)
    this.ctx.lineWidth = 1;
    this.ctx.globalAlpha = 0.6;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols - 1; col++) {
        const p1 = points[row][col];
        const p2 = points[row][col + 1];

        // Color based on wave intensity
        const intensity = Math.abs(this.getWaveOffset(p1.baseX, p1.baseY, this.time).x);
        const heatMap = Math.min(intensity / this.waveAmplitude, 1);

        const color = heatMap > 0.5
          ? this.colors.lineHot
          : this.colors.line;

        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }

    // Draw vertical lines
    for (let row = -1; row < rows - 1; row++) {
      for (let col = -1; col < cols; col++) {
        const p1 = points[row][col];
        const p2 = points[row + 1][col];

        const intensity = Math.abs(this.getWaveOffset(p1.baseX, p1.baseY, this.time).y);
        const heatMap = Math.min(intensity / this.waveAmplitude, 1);

        const color = heatMap > 0.5
          ? this.colors.lineHot
          : this.colors.line;

        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }

    this.ctx.globalAlpha = 1;
  }

  drawNodePoints() {
    const cols = Math.ceil(this.canvas.width / this.gridSize) + 2;
    const rows = Math.ceil(this.canvas.height / this.gridSize) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const baseX = col * this.gridSize;
        const baseY = row * this.gridSize;

        const wave = this.getWaveOffset(baseX, baseY, this.time);
        const distortion = this.applyDistortion(baseX, baseY);

        const x = baseX + wave.x + distortion.x;
        const y = baseY + wave.y + distortion.y;

        // Small glow at grid intersections
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 4);
        gradient.addColorStop(0, `rgba(139, 0, 255, 0.4)`);
        gradient.addColorStop(1, `rgba(139, 0, 255, 0)`);

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Bright center dot
        this.ctx.fillStyle = 'rgba(139, 0, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  drawRippleVisualization() {
    this.distortions.forEach((d) => {
      const alpha = (d.life * 0.3);
      this.ctx.strokeStyle = `rgba(255, 59, 59, ${alpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.globalAlpha = alpha;
      this.ctx.beginPath();
      this.ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    });
  }

  animate() {
    // Clear with dark background
    this.ctx.fillStyle = this.colors.dark;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw subtle gradient overlay
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.canvas.width / 2,
      this.canvas.height / 2,
      Math.max(this.canvas.width, this.canvas.height)
    );
    gradient.addColorStop(0, 'rgba(30, 15, 15, 0.3)');
    gradient.addColorStop(1, 'rgba(10, 10, 10, 0.8)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw
    this.updateDistortions();
    this.drawMesh();
    this.drawNodePoints();
    this.drawRippleVisualization();

    this.time += 1;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new GeometricMeshBackground('animated-background-canvas');
  }, 100);
});
