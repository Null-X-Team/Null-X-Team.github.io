// ==========================================================================
// ENHANCED INTERACTIVE GEOMETRIC MESH BACKGROUND
// Mouse distortion, trail effects, and shockwave reactions
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
    this.prevMousePos = { x: 0, y: 0 };
    this.distortions = [];
    this.shockwaves = [];
    this.mouseTrail = [];
    this.gridSize = 40;
    this.waveAmplitude = 15;
    this.mouseDistortionRadius = 120;
    this.mouseDistortionForce = 1.2;

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
    this.prevMousePos.x = this.mousePos.x;
    this.prevMousePos.y = this.mousePos.y;
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;

    // Add to mouse trail for healing effect (2-3 second healing time)
    this.mouseTrail.push({
      x: e.clientX,
      y: e.clientY,
      radius: this.mouseDistortionRadius,
      life: 1,
      maxLife: 1,
      decay: 0.0035, // Slower healing - takes ~2.8 seconds
    });
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

    // Create powerful shockwave at click point
    this.shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 500,
      force: 2.5,
      life: 1,
      decay: 0.018,
    });
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

  // Apply distortion from mouse position
  applyMouseDistortion(x, y) {
    let distX = 0;
    let distY = 0;

    const dx = x - this.mousePos.x;
    const dy = y - this.mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Current mouse breaks/pushes mesh away
    if (distance < this.mouseDistortionRadius && distance > 0) {
      const strength = (1 - distance / this.mouseDistortionRadius) * this.mouseDistortionForce;
      distX += (dx / distance) * strength * 12;
      distY += (dy / distance) * strength * 12;
    }

    return { x: distX, y: distY };
  }

  // Apply healing trail effect
  applyTrailHealing(x, y) {
    let healX = 0;
    let healY = 0;

    this.mouseTrail.forEach((trail) => {
      const dx = x - trail.x;
      const dy = y - trail.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < trail.radius && distance > 0) {
        const strength = (1 - distance / trail.radius) * trail.life * 0.8;
        healX += (dx / distance) * strength * 8;
        healY += (dy / distance) * strength * 8;
      }
    });

    return { x: healX, y: healY };
  }

  // Apply shockwave distortion
  applyShockwave(x, y) {
    let shockX = 0;
    let shockY = 0;

    this.shockwaves.forEach((shock) => {
      const dx = x - shock.x;
      const dy = y - shock.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < shock.maxRadius && distance > 0) {
        // Wave effect - pushes away from center
        const waveWidth = 40;
        const distFromWave = Math.abs(distance - shock.radius);
        
        if (distFromWave < waveWidth) {
          const factor = Math.sin((1 - distFromWave / waveWidth) * Math.PI);
          const strength = factor * shock.force * shock.life;

          shockX += (dx / distance) * strength * 15;
          shockY += (dy / distance) * strength * 15;
        }
      }
    });

    return { x: shockX, y: shockY };
  }

  updateTrail() {
    this.mouseTrail = this.mouseTrail.filter((t) => t.life > 0);

    this.mouseTrail.forEach((trail) => {
      trail.life -= trail.decay;
      trail.radius *= 0.995; // Slowly shrink
    });
  }

  updateShockwaves() {
    this.shockwaves = this.shockwaves.filter((s) => s.life > 0);

    this.shockwaves.forEach((shock) => {
      shock.radius += 8;
      shock.life -= shock.decay;
      shock.force *= 0.92;
    });
  }

  drawMesh() {
    const cols = Math.ceil(this.canvas.width / this.gridSize) + 2;
    const rows = Math.ceil(this.canvas.height / this.gridSize) + 2;

    // Build grid points with wave animation + distortions
    const points = [];
    for (let row = -1; row < rows; row++) {
      points[row] = [];
      for (let col = -1; col < cols; col++) {
        const baseX = col * this.gridSize;
        const baseY = row * this.gridSize;

        const wave = this.getWaveOffset(baseX, baseY, this.time);
        const mouseDistort = this.applyMouseDistortion(baseX, baseY);
        const trailHeal = this.applyTrailHealing(baseX, baseY);
        const shockwave = this.applyShockwave(baseX, baseY);

        points[row][col] = {
          x: baseX + wave.x + mouseDistort.x + trailHeal.x + shockwave.x,
          y: baseY + wave.y + mouseDistort.y + trailHeal.y + shockwave.y,
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
    // Much more subtle - optional minimal glow only at grid corners
    // Commented out for cleaner look
  }

  drawMouseDistortionZone() {
    // Hidden - no visual indicator needed
  }

  drawTrailHealing() {
    // Hidden - healing effect applied silently without visual indicator
  }

  drawShockwaveRings() {
    // Draw shockwave visualization
    this.shockwaves.forEach((shock) => {
      const alpha = shock.life * 0.4;
      this.ctx.strokeStyle = `rgba(255, 59, 59, ${alpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.globalAlpha = alpha;
      this.ctx.beginPath();
      this.ctx.arc(shock.x, shock.y, shock.radius, 0, Math.PI * 2);
      this.ctx.stroke();

      // Inner ring
      this.ctx.strokeStyle = `rgba(139, 0, 255, ${alpha * 0.6})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(shock.x, shock.y, shock.radius - 20, 0, Math.PI * 2);
      this.ctx.stroke();
    });
    this.ctx.globalAlpha = 1;
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

    // Update effects
    this.updateTrail();
    this.updateShockwaves();

    // Draw layers
    this.drawMesh();
    this.drawShockwaveRings();

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
