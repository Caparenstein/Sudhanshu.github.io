/**
 * SUDHANSHU NIRALA (RENSTEIN) — ROBOTICS PORTFOLIO CONTROLLER
 * First-Person Perspective Architecture
 *
 * Modules:
 * 1. Living Canvas & Ambient Cursor Aura (Organic Interactive Feel, NO SOUNDS)
 * 2. Multi-Page Navigation & Active Route Highlighting
 * 3. 3D Perspective Card Tilt (Living Reaction to Cursor Proximity)
 * 4. Interactive Robotics Lab Simulator (5-DOF Arm, Turret PID, 4-Bot Swarm, LQR Balance Bot)
 * 5. Diagnostic Telemetry Console (ADRC ESO, Fuzzy Scheduler, Swarm Sync, LQR Riccati)
 * 6. Specification Modals & Technical Archives
 * 7. YouTube Video Controller & Experiments Player
 * 8. Contact Uplink Form & Clipboard Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initLivingCursorAura();
  initBackgroundCanvas();
  initNavigation();
  initInteractiveTilt();
  initRoboticsLabSimulator();
  initDiagnosticTerminal();
  initModals();
  initYouTubeController();
  initContactForm();

  // Set Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   01. LIVING BEING INTERACTION: AMBIENT CURSOR AURA & MOUSE TRACKER
   ========================================================================== */
let globalMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function initLivingCursorAura() {
  // Create an ambient organic radial glow that gently follows the user's cursor
  let aura = document.querySelector('.cursor-aura');
  if (!aura) {
    aura = document.createElement('div');
    aura.className = 'cursor-aura';
    document.body.appendChild(aura);
  }

  let auraX = globalMouse.x;
  let auraY = globalMouse.y;

  window.addEventListener('mousemove', (e) => {
    globalMouse.x = e.clientX;
    globalMouse.y = e.clientY;
  });

  function animateAura() {
    auraX += (globalMouse.x - auraX) * 0.12;
    auraY += (globalMouse.y - auraY) * 0.12;
    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;
    requestAnimationFrame(animateAura);
  }
  animateAura();
}

/* ==========================================================================
   02. AMBIENT BACKGROUND CANVAS (ORGANIC REACTIVE PARTICLES)
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 24000));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.8,
      isOrange: Math.random() > 0.4
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Subtle organic attraction to cursor proximity (feels alive)
      const dxMouse = globalMouse.x - p.x;
      const dyMouse = globalMouse.y - p.y;
      const distMouse = Math.hypot(dxMouse, dyMouse);
      if (distMouse < 180) {
        const pull = (180 - distMouse) * 0.0003;
        p.vx += dxMouse * pull;
        p.vy += dyMouse * pull;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Soft damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isOrange ? 'rgba(255, 98, 0, 0.55)' : 'rgba(15, 23, 42, 0.2)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 125) * 0.14;
          ctx.strokeStyle = p.isOrange ? `rgba(255, 98, 0, ${alpha * 1.2})` : `rgba(15, 23, 42, ${alpha * 0.5})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* ==========================================================================
   03. INTERACTIVE 3D PERSPECTIVE TILT (LIVING RESPONSE)
   ========================================================================== */
function initInteractiveTilt() {
  const tiltElements = document.querySelectorAll('#mechaFrame, .project-card, .experiment-video-card, .crazy-card, .creed-card, .yt-channel-card');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   04. MULTI-PAGE NAVIGATION & ACTIVE ROUTE HIGHLIGHTING
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Detect current active page based on window.location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-links .nav-link');

  navAnchors.forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    } else if (href.startsWith('#') && (currentPath === 'index.html' || currentPath === '')) {
      // Single page hash support if applicable
    } else {
      a.classList.remove('active');
    }
  });
}

/* ==========================================================================
   05. INTERACTIVE ROBOTICS LAB SIMULATOR (5-DOF ARM, TURRET, SWARM, LQR BOT)
   ========================================================================== */
function initRoboticsLabSimulator() {
  const canvas = document.getElementById('kinematicsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const simTabs = document.querySelectorAll('.sim-tab-btn');
  const simTitleBadge = document.getElementById('simTitleBadge');
  const simStateBadge = document.getElementById('simStateBadge');
  const consoleModeStatus = document.getElementById('consoleModeStatus');
  const canvasHelpTip = document.getElementById('canvasHelpTip');

  const theta1Val = document.getElementById('theta1Val');
  const theta2Val = document.getElementById('theta2Val');
  const theta3Val = document.getElementById('theta3Val');
  const gripperVal = document.getElementById('gripperVal');
  const theta1Bar = document.getElementById('theta1Bar');
  const theta2Bar = document.getElementById('theta2Bar');
  const theta3Bar = document.getElementById('theta3Bar');
  const gripperBar = document.getElementById('gripperBar');

  const heightVal = document.getElementById('heightVal');

  let activeMode = 'arm5dof'; // 'arm5dof', 'turret', 'swarm', 'balance'
  let cw = canvas.width = 600;
  let ch = canvas.height = 420;

  simTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      simTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMode = btn.getAttribute('data-sim');
      updateSimulatorHeaders();
    });
  });

  function updateSimulatorHeaders() {
    if (activeMode === 'arm5dof') {
      if (simTitleBadge) simTitleBadge.textContent = 'SIM://5_DOF_ROBOTIC_ARM_MANIPULATOR';
      if (simStateBadge) simStateBadge.textContent = 'ALGO: PID + ADRC + FUZZY LOGIC';
      if (consoleModeStatus) consoleModeStatus.textContent = 'ACTIVE: 5-DOF PID/ADRC';
      if (canvasHelpTip) canvasHelpTip.textContent = '⚡ Move cursor to test forward & inverse kinematics on my 5-DOF arm';
    } else if (activeMode === 'turret') {
      if (simTitleBadge) simTitleBadge.textContent = 'SIM://PAN_TILT_CAMERA_TURRET_PID';
      if (simStateBadge) simStateBadge.textContent = 'CLOSED LOOP: PROPORTIONAL-INTEGRAL-DERIVATIVE';
      if (consoleModeStatus) consoleModeStatus.textContent = 'ACTIVE: TURRET PID CONTROLLER';
      if (canvasHelpTip) canvasHelpTip.textContent = '⚡ Move cursor to test optical tracking & target lock on my turret';
    } else if (activeMode === 'swarm') {
      if (simTitleBadge) simTitleBadge.textContent = 'SIM://4_ROBOT_COLLABORATIVE_SWARM';
      if (simStateBadge) simStateBadge.textContent = 'AUTONOMOUS RANDOM EXPLORATION + CLICK CONVERGENCE';
      if (consoleModeStatus) consoleModeStatus.textContent = 'ACTIVE: 4-BOT SWARM MESH';
      if (canvasHelpTip) canvasHelpTip.textContent = '⚡ My 4 bots explore in randomness — click anywhere to command convergence!';
    } else if (activeMode === 'balance') {
      if (simTitleBadge) simTitleBadge.textContent = 'SIM://VARIABLE_HEIGHT_SELF_BALANCING_BOT';
      if (simStateBadge) simStateBadge.textContent = 'LQR OPTIMAL CONTROL: u = -Kx (RICCATI SOLVER)';
      if (consoleModeStatus) consoleModeStatus.textContent = 'ACTIVE: LQR STATE-FEEDBACK';
      if (canvasHelpTip) canvasHelpTip.textContent = '⚡ Click the 3 height buttons below to bend knee joints & test LQR balance';
    }
  }

  let simMouse = { x: cw / 2 + 80, y: ch / 2 - 40, isHovered: false };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    simMouse.x = (e.clientX - rect.left) * (cw / rect.width);
    simMouse.y = (e.clientY - rect.top) * (ch / rect.height);
    simMouse.isHovered = true;
  });
  canvas.addEventListener('mouseenter', () => { simMouse.isHovered = true; });
  canvas.addEventListener('mouseleave', () => { simMouse.isHovered = false; });

  // 1. 5-DOF ARM
  const armBase = { x: cw / 2, y: ch - 40 };
  const armLengths = [110, 90, 60, 35];
  let armJoints = [
    { x: armBase.x, y: armBase.y },
    { x: armBase.x, y: armBase.y - armLengths[0] },
    { x: armBase.x + 60, y: armBase.y - armLengths[0] - 60 },
    { x: armBase.x + 110, y: armBase.y - armLengths[0] - 90 },
    { x: armBase.x + 140, y: armBase.y - armLengths[0] - 110 }
  ];
  let armAutoAngle = 0;
  let gripperRatio = 0.85;

  // 3. 4-ROBOT SWARM
  const swarmRobots = [
    { id: 1, x: 180, y: 140, vx: 0.6, vy: 0.2, heading: 0.3, wanderTimer: 0, color: '#ff6200', targetOffsetX: 0, targetOffsetY: -36 },
    { id: 2, x: 380, y: 160, vx: -0.5, vy: 0.4, heading: 2.1, wanderTimer: 25, color: '#ff7a1a', targetOffsetX: -36, targetOffsetY: 0 },
    { id: 3, x: 160, y: 320, vx: 0.4, vy: -0.5, heading: 4.2, wanderTimer: 45, color: '#ff7a1a', targetOffsetX: 36, targetOffsetY: 0 },
    { id: 4, x: 420, y: 300, vx: -0.4, vy: -0.4, heading: 5.4, wanderTimer: 65, color: '#ff6200', targetOffsetX: 0, targetOffsetY: 36 }
  ];
  let swarmState = {
    isConverging: false,
    convergePoint: { x: cw / 2, y: ch / 2 },
    pulseRipples: []
  };

  function triggerSwarmConvergence(clickX, clickY) {
    swarmState.isConverging = true;
    swarmState.convergePoint.x = clickX;
    swarmState.convergePoint.y = clickY;
    swarmState.pulseRipples.push({ x: clickX, y: clickY, r: 8, alpha: 1.0 });

    const terminal = document.getElementById('terminalScreen');
    if (terminal) {
      const line = document.createElement('div');
      line.className = 'term-line warning';
      line.textContent = `[${new Date().toISOString().substring(11, 19)}] [SWARM] TARGET CONVERGENCE COMMANDED AT (${Math.round(clickX)}, ${Math.round(clickY)})`;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }
  }

  canvas.addEventListener('click', (e) => {
    if (activeMode === 'swarm') {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (cw / rect.width);
      const clickY = (e.clientY - rect.top) * (ch / rect.height);
      triggerSwarmConvergence(clickX, clickY);
    }
  });

  window.addEventListener('click', (e) => {
    if (activeMode === 'swarm') {
      if (e.target.closest('.sim-tab-btn') || e.target.closest('header') || e.target.closest('a') || e.target.closest('.btn-diag') || e.target.closest('button')) {
        return;
      }
      if (!canvas.contains(e.target)) {
        const rect = canvas.getBoundingClientRect();
        const clickX = Math.max(35, Math.min(cw - 35, (e.clientX - rect.left) * (cw / rect.width)));
        const clickY = Math.max(35, Math.min(ch - 35, (e.clientY - rect.top) * (ch / rect.height)));
        triggerSwarmConvergence(clickX, clickY);
      }
    }
  });

  // 4. VARIABLE-HEIGHT LQR BOT
  let balanceBot = {
    x: cw / 2,
    y: ch - 50,
    wheelRadius: 28,
    legHeightScale: 1.0,
    targetLegHeightScale: 1.0,
    tiltAngle: 0.0,
    tiltVel: 0.0,
    wheelVel: 0.0
  };

  const btnHeightCrouch = document.getElementById('btnHeightCrouch');
  const btnHeightMid = document.getElementById('btnHeightMid');
  const btnHeightTall = document.getElementById('btnHeightTall');

  function setBotHeight(targetScale, modeName) {
    balanceBot.targetLegHeightScale = targetScale;
    
    [btnHeightCrouch, btnHeightMid, btnHeightTall].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (targetScale <= 0.4 && btnHeightCrouch) btnHeightCrouch.classList.add('active');
    else if (targetScale > 0.4 && targetScale <= 0.8 && btnHeightMid) btnHeightMid.classList.add('active');
    else if (targetScale > 0.8 && btnHeightTall) btnHeightTall.classList.add('active');

    if (heightVal) {
      const pct = Math.round(targetScale * 100);
      heightVal.textContent = `${pct}% (${modeName} // LQR)`;
    }

    const terminal = document.getElementById('terminalScreen');
    if (terminal) {
      const line = document.createElement('div');
      line.className = 'term-line info';
      const L = (0.5 + targetScale * 0.5).toFixed(2);
      const K1 = (220 / Math.sqrt(0.5 + targetScale * 0.5)).toFixed(1);
      line.textContent = `[${new Date().toISOString().substring(11, 19)}] [LQR] POSTURE: ${modeName} | PENDULUM L=${L}m | OPTIMAL GAIN K_θ=-${K1}`;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }
  }

  if (btnHeightCrouch) {
    btnHeightCrouch.addEventListener('click', () => setBotHeight(0.35, 'LOW CROUCH'));
  }
  if (btnHeightMid) {
    btnHeightMid.addEventListener('click', () => setBotHeight(0.65, 'MID STANCE'));
  }
  if (btnHeightTall) {
    btnHeightTall.addEventListener('click', () => setBotHeight(1.0, 'STAND TALL'));
  }

  function renderSimulator() {
    ctx.clearRect(0, 0, cw, ch);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < cw; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
    }
    for (let y = 0; y < ch; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
    }

    if (activeMode === 'arm5dof') {
      render5DofArm();
    } else if (activeMode === 'turret') {
      renderTurretCalibration();
    } else if (activeMode === 'swarm') {
      render4RobotSwarm();
    } else if (activeMode === 'balance') {
      renderSelfBalancingBot();
    }

    requestAnimationFrame(renderSimulator);
  }

  function render5DofArm() {
    let target = { x: simMouse.x, y: simMouse.y };
    if (!simMouse.isHovered) {
      armAutoAngle += 0.02;
      target.x = armBase.x + Math.sin(armAutoAngle) * 150;
      target.y = armBase.y - 180 + Math.cos(armAutoAngle * 1.4) * 50;
    }

    const totalReach = armLengths.reduce((a, b) => a + b, 0);
    const dist = Math.hypot(target.x - armBase.x, target.y - armBase.y);
    if (dist > totalReach - 5) {
      target.x = armBase.x + ((target.x - armBase.x) / dist) * (totalReach - 5);
      target.y = armBase.y + ((target.y - armBase.y) / dist) * (totalReach - 5);
    }

    armJoints[4] = { x: target.x, y: target.y };
    for (let it = 0; it < 6; it++) {
      for (let i = 3; i >= 0; i--) {
        const dx = armJoints[i].x - armJoints[i + 1].x;
        const dy = armJoints[i].y - armJoints[i + 1].y;
        const l = Math.hypot(dx, dy) || 0.001;
        armJoints[i].x = armJoints[i + 1].x + (dx / l) * armLengths[i];
        armJoints[i].y = armJoints[i + 1].y + (dy / l) * armLengths[i];
      }
      armJoints[0] = { x: armBase.x, y: armBase.y };
      for (let i = 0; i < 4; i++) {
        const dx = armJoints[i + 1].x - armJoints[i].x;
        const dy = armJoints[i + 1].y - armJoints[i].y;
        const l = Math.hypot(dx, dy) || 0.001;
        armJoints[i + 1].x = armJoints[i].x + (dx / l) * armLengths[i];
        armJoints[i + 1].y = armJoints[i].y + (dy / l) * armLengths[i];
      }
    }

    const a1 = Math.atan2(armJoints[1].y - armJoints[0].y, armJoints[1].x - armJoints[0].x);
    const a2 = Math.atan2(armJoints[2].y - armJoints[1].y, armJoints[2].x - armJoints[1].x) - a1;

    const degYaw = ((target.x - armBase.x) / 10).toFixed(1);
    const degShoulder = (a1 * 180 / Math.PI + 90).toFixed(1);
    const degElbow = (a2 * 180 / Math.PI).toFixed(1);

    if (theta1Val) theta1Val.textContent = `${degYaw}°`;
    if (theta2Val) theta2Val.textContent = `${degShoulder}°`;
    if (theta3Val) theta3Val.textContent = `${degElbow}°`;
    if (gripperVal) gripperVal.textContent = `Grip: ${(gripperRatio * 100).toFixed(0)}%`;

    if (theta1Bar) theta1Bar.style.width = `${Math.min(100, Math.max(10, (parseFloat(degYaw) + 50)))}%`;
    if (theta2Bar) theta2Bar.style.width = `${Math.min(100, Math.max(10, (parseFloat(degShoulder) + 90) / 1.8))}%`;
    if (theta3Bar) theta3Bar.style.width = `${Math.min(100, Math.max(10, (parseFloat(degElbow) + 180) / 3.6))}%`;
    if (gripperBar) gripperBar.style.width = `${gripperRatio * 100}%`;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(armBase.x - 55, armBase.y, 110, 24);
    ctx.strokeStyle = '#ff6200';
    ctx.lineWidth = 2;
    ctx.strokeRect(armBase.x - 55, armBase.y, 110, 24);

    ctx.beginPath();
    ctx.arc(armBase.x, armBase.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
      const p1 = armJoints[i];
      const p2 = armJoints[i + 1];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 12 - i * 2;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = (i % 2 === 0) ? '#ff6200' : '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(armJoints[i].x, armJoints[i].y, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#ff7a1a';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(armJoints[i].x, armJoints[i].y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    const ee = armJoints[4];
    const prev = armJoints[3];
    const angle = Math.atan2(ee.y - prev.y, ee.x - prev.x);

    ctx.save();
    ctx.translate(ee.x, ee.y);
    ctx.rotate(angle);

    ctx.fillStyle = '#ff6200';
    ctx.fillRect(-4, -10, 8, 20);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(4, -8); ctx.lineTo(16, -12); ctx.lineTo(22, -6);
    ctx.moveTo(4, 8); ctx.lineTo(16, 12); ctx.lineTo(22, 6);
    ctx.stroke();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(target.x, target.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff6200';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function renderTurretCalibration() {
    const cx = cw / 2;
    const cy = ch / 2 - 20;

    ctx.save();
    ctx.translate(cx, cy);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-40, 50, 80, 20);
    ctx.strokeStyle = '#ff6200';
    ctx.strokeRect(-40, 50, 80, 20);

    const angleToMouse = Math.atan2(simMouse.y - cy, simMouse.x - cx);
    ctx.rotate(angleToMouse);

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#ff6200';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-20, -18, 40, 36);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(15, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6200';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(25, 0);
    ctx.lineTo(Math.hypot(simMouse.x - cx, simMouse.y - cy), 0);
    ctx.strokeStyle = 'rgba(255, 98, 0, 0.75)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(simMouse.x, simMouse.y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff6200';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('TARGET LOCK (PID)', simMouse.x + 18, simMouse.y + 4);
  }

  function render4RobotSwarm() {
    for (let r = swarmState.pulseRipples.length - 1; r >= 0; r--) {
      const rip = swarmState.pulseRipples[r];
      rip.r += 2.4;
      rip.alpha -= 0.024;
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 98, 0, ${Math.max(0, rip.alpha)})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      if (rip.alpha <= 0) {
        swarmState.pulseRipples.splice(r, 1);
      }
    }

    if (swarmState.isConverging) {
      const cp = swarmState.convergePoint;
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#ff6200';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255, 98, 0, 0.15)';
      ctx.fill();

      ctx.strokeStyle = '#ff6200';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cp.x - 20, cp.y); ctx.lineTo(cp.x + 20, cp.y);
      ctx.moveTo(cp.x, cp.y - 20); ctx.lineTo(cp.x, cp.y + 20);
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('RENDEZVOUS POINT', cp.x + 20, cp.y - 4);
    }

    for (let i = 0; i < swarmRobots.length; i++) {
      const bot = swarmRobots[i];

      if (swarmState.isConverging) {
        const targetX = swarmState.convergePoint.x + bot.targetOffsetX;
        const targetY = swarmState.convergePoint.y + bot.targetOffsetY;
        const dx = targetX - bot.x;
        const dy = targetY - bot.y;
        const dist = Math.hypot(dx, dy);

        const speed = Math.min(4.5, dist * 0.08 + 0.8);
        if (dist > 3) {
          bot.vx += ((dx / dist) * speed - bot.vx) * 0.18;
          bot.vy += ((dy / dist) * speed - bot.vy) * 0.18;
        } else {
          bot.vx *= 0.6;
          bot.vy *= 0.6;
        }
      } else {
        bot.wanderTimer++;
        if (bot.wanderTimer > 50 + Math.random() * 45) {
          bot.wanderTimer = 0;
          bot.heading += (Math.random() - 0.5) * 1.6;
        }

        bot.heading += (Math.random() - 0.5) * 0.08;
        const wanderSpeed = 1.35 + (bot.id % 2) * 0.35;
        const desiredVx = Math.cos(bot.heading) * wanderSpeed;
        const desiredVy = Math.sin(bot.heading) * wanderSpeed;

        bot.vx += (desiredVx - bot.vx) * 0.08;
        bot.vy += (desiredVy - bot.vy) * 0.08;

        const margin = 45;
        if (bot.x < margin) { bot.vx += 0.35; bot.heading = 0; }
        if (bot.x > cw - margin) { bot.vx -= 0.35; bot.heading = Math.PI; }
        if (bot.y < margin) { bot.vy += 0.35; bot.heading = Math.PI / 2; }
        if (bot.y > ch - margin) { bot.vy -= 0.35; bot.heading = -Math.PI / 2; }
      }

      for (let j = 0; j < swarmRobots.length; j++) {
        if (i !== j) {
          const peer = swarmRobots[j];
          const rx = bot.x - peer.x;
          const ry = bot.y - peer.y;
          const d = Math.hypot(rx, ry) || 1;
          const minSafeDist = 40;
          if (d < minSafeDist) {
            const repForce = (minSafeDist - d) * 0.16;
            bot.vx += (rx / d) * repForce;
            bot.vy += (ry / d) * repForce;
          }
        }
      }

      bot.x += bot.vx;
      bot.y += bot.vy;

      bot.x = Math.max(22, Math.min(cw - 22, bot.x));
      bot.y = Math.max(22, Math.min(ch - 22, bot.y));

      const angle = Math.atan2(bot.vy, bot.vx);

      for (let j = i + 1; j < swarmRobots.length; j++) {
        const peer = swarmRobots[j];
        ctx.beginPath();
        ctx.moveTo(bot.x, bot.y);
        ctx.lineTo(peer.x, peer.y);
        ctx.strokeStyle = 'rgba(255, 98, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.rotate(angle);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-14, -11, 28, 22);
      ctx.strokeStyle = bot.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-14, -11, 28, 22);

      ctx.fillStyle = '#ff6200';
      ctx.fillRect(-16, -13, 32, 4);
      ctx.fillRect(-16, 9, 32, 4);

      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = bot.color;
      ctx.fill();

      ctx.restore();

      ctx.fillStyle = '#0f172a';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`U${bot.id}`, bot.x - 6, bot.y + 22);
    }
  }

  function renderSelfBalancingBot() {
    const groundY = ch - 40;
    const bot = balanceBot;

    bot.legHeightScale += (bot.targetLegHeightScale - bot.legHeightScale) * 0.08;
    const standingHeight = 85 + (bot.legHeightScale - 0.35) * (190 - 85) / 0.65;

    const L = 0.5 + bot.legHeightScale * 0.5;
    const K_theta = 260 / Math.sqrt(L);
    const K_thetaDot = 24 * Math.sqrt(L);
    const K_x = 0.18;
    const K_v = 0.55;

    const targetTilt = 0.0;

    let disturbance = 0;
    if (simMouse.isHovered) {
      const mouseDist = simMouse.x - bot.x;
      if (Math.abs(mouseDist) < 70) {
        disturbance = (mouseDist / 70) * 0.015;
      }
    }

    const tiltError = bot.tiltAngle - targetTilt;
    const posError = bot.x - cw / 2;
    const u_LQR = -(K_theta * tiltError + K_thetaDot * bot.tiltVel + K_x * posError + K_v * bot.wheelVel);

    const restoringAccel = -(24 * tiltError + 7.2 * bot.tiltVel);
    bot.tiltVel += (restoringAccel + disturbance) * 0.05;
    bot.tiltVel *= 0.86;
    bot.tiltAngle += bot.tiltVel;

    if (Math.abs(bot.tiltAngle) < 0.0006 && Math.abs(disturbance) < 0.001) {
      bot.tiltAngle = 0;
      bot.tiltVel = 0;
    }

    bot.wheelVel += (u_LQR * 0.008 - posError * 0.012) * 0.1;
    bot.wheelVel *= 0.90;
    bot.x += bot.wheelVel;

    if (bot.x < 100) { bot.x = 100; bot.wheelVel = 0; }
    if (bot.x > cw - 100) { bot.x = cw - 100; bot.wheelVel = 0; }

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(35, groundY);
    ctx.lineTo(cw - 35, groundY);
    ctx.stroke();

    ctx.save();
    ctx.translate(bot.x, groundY - bot.wheelRadius);
    ctx.rotate(bot.tiltAngle);

    const kneeBendRatio = Math.max(0, 1.0 - bot.legHeightScale);
    const kneeSpreadX = Math.sin(kneeBendRatio * 1.55) * 44;
    const kneeY = -standingHeight * 0.52;

    ctx.strokeStyle = 'rgba(255, 98, 0, 0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -standingHeight);
    ctx.stroke();

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(-kneeSpreadX - 8, kneeY);
    ctx.lineTo(-8, -standingHeight);
    ctx.stroke();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(kneeSpreadX + 8, kneeY);
    ctx.lineTo(8, -standingHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a'; ctx.fill();
    ctx.strokeStyle = '#ff6200'; ctx.lineWidth = 2; ctx.stroke();

    ctx.beginPath();
    ctx.arc(-kneeSpreadX - 8, kneeY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a'; ctx.fill();
    ctx.strokeStyle = '#ff6200'; ctx.lineWidth = 2; ctx.stroke();

    ctx.beginPath();
    ctx.arc(kneeSpreadX + 8, kneeY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a'; ctx.fill();
    ctx.strokeStyle = '#ff6200'; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-24, -standingHeight - 36, 48, 38);
    ctx.strokeStyle = '#ff6200';
    ctx.lineWidth = 2;
    ctx.strokeRect(-24, -standingHeight - 36, 48, 38);

    ctx.beginPath();
    ctx.arc(0, -standingHeight - 17, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6200';
    ctx.fill();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(bot.x, groundY - bot.wheelRadius, bot.wheelRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#ff6200';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(bot.x, groundY - bot.wheelRadius, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText(`LQR GAIN: K = [-${K_theta.toFixed(1)}, -${K_thetaDot.toFixed(1)}, -0.18, -0.55]`, 25, 30);
    ctx.fillStyle = '#ff6200';
    const postureLabel = bot.legHeightScale > 0.8 ? 'STAND TALL (100%)' : bot.legHeightScale > 0.5 ? 'MID STANCE (65%)' : 'LOW CROUCH (35%)';
    ctx.fillText(`POSTURE: ${postureLabel} | BALANCE: STANDING STRAIGHT (0.0°)`, 25, 46);
  }

  requestAnimationFrame(renderSimulator);
}

/* ==========================================================================
   06. DIAGNOSTIC TERMINAL (FIRST-PERSON LOGS)
   ========================================================================== */
function initDiagnosticTerminal() {
  const terminal = document.getElementById('terminalScreen');
  const btnArmAdrc = document.getElementById('btnTestArmAdrc');
  const btnFuzzy = document.getElementById('btnTestFuzzy');
  const btnSwarmSync = document.getElementById('btnTestSwarmSync');
  const btnLqrBalance = document.getElementById('btnTestLqrBalance');

  const kpSlider = document.getElementById('kpSlider');
  const kdSlider = document.getElementById('kdSlider');
  const kpVal = document.getElementById('kpVal');
  const kdVal = document.getElementById('kdVal');

  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.textContent = `[${new Date().toISOString().substring(11, 19)}] ${text}`;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  if (btnArmAdrc) {
    btnArmAdrc.addEventListener('click', () => {
      appendLog('ACTIVATING MY ADRC EXTENDED STATE OBSERVER (ESO)...', 'prompt');
      setTimeout(() => appendLog('My algorithm is estimating 5-DOF joint friction & payload mass variations...', 'info'), 250);
      setTimeout(() => appendLog('Total disturbance estimate f(x,t) = 3.42 Nm compensated in real-time', 'success'), 550);
      setTimeout(() => appendLog('My tracking error converged to < 0.12mm under external load', 'success'), 850);
      setTimeout(() => appendLog('STATUS: MY ADRC OBSERVER LOCKED AND CONVERGED', 'warning'), 1200);
    });
  }

  if (btnFuzzy) {
    btnFuzzy.addEventListener('click', () => {
      appendLog('RUNNING MY FUZZY INFERENCE RULES (Mamdani Model)...', 'prompt');
      setTimeout(() => appendLog('Inputs: Error e = +0.42, Error Derivative de/dt = -0.15', 'info'), 250);
      setTimeout(() => appendLog('Membership: {Error: POSITIVE_SMALL, dE: ZERO}', 'info'), 550);
      setTimeout(() => appendLog('Defuzzified Centroid Output: Kp scale = 1.24x, Kd = 0.92x', 'success'), 850);
      setTimeout(() => appendLog('MY GAIN SCHEDULE ADAPTED: SMOOTH MOTION PRESERVED', 'warning'), 1150);
    });
  }

  if (btnSwarmSync) {
    btnSwarmSync.addEventListener('click', () => {
      appendLog('BROADCASTING CONSENSUS BEACON TO MY 4 SWARM ROBOTS...', 'prompt');
      setTimeout(() => appendLog('Node 1 (Leader), Node 2-4 (Followers) handshake verified', 'info'), 250);
      setTimeout(() => appendLog('Mesh latency: 1.4 ms | Packet loss: 0.00%', 'success'), 550);
      setTimeout(() => appendLog('APF Repulsion envelope: 0.85m inter-agent safety buffer', 'success'), 850);
      setTimeout(() => appendLog('MY SWARM STATE: 4/4 UNITS SYNCHRONIZED IN FORMATION', 'warning'), 1150);
    });
  }

  if (btnLqrBalance) {
    btnLqrBalance.addEventListener('click', () => {
      appendLog('SOLVING CONTINUOUS ALGEBRAIC RICCATI EQUATION (CARE)...', 'prompt');
      setTimeout(() => appendLog('My system state matrix A, input matrix B loaded for wheeled-legged bot', 'info'), 250);
      setTimeout(() => {
        appendLog('Optimal state-feedback gain matrix K calculated by my solver:', 'success');
        appendLog('K_LQR = [-260.0, -24.0, -0.18, -0.55]', 'info');
      }, 550);
      setTimeout(() => appendLog('Closed-loop poles in LHP: λ = [-4.6 ± 3.4j, -1.8, -0.92] (Asymptotically Stable)', 'success'), 850);
      setTimeout(() => appendLog('STATUS: MY LQR BALANCE RECOVERY LOCKED', 'warning'), 1150);
    });
  }

  if (kpSlider && kpVal) {
    kpSlider.addEventListener('input', (e) => {
      kpVal.textContent = parseFloat(e.target.value).toFixed(1);
    });
    kpSlider.addEventListener('change', (e) => {
      appendLog(`PROPORTIONAL GAIN TUNED: Kp = ${e.target.value}`, 'info');
    });
  }

  if (kdSlider && kdVal) {
    kdSlider.addEventListener('input', (e) => {
      kdVal.textContent = parseFloat(e.target.value).toFixed(1);
    });
    kdSlider.addEventListener('change', (e) => {
      appendLog(`DERIVATIVE DAMPING TUNED: Kd = ${e.target.value}`, 'info');
    });
  }
}

/* ==========================================================================
   07. PROTOTYPE SPECIFICATION MODALS (FIRST-PERSON PERSPECTIVE)
   ========================================================================== */
const prototypeDetails = {
  modalArm5Dof: {
    tag: 'UNIT: ARM-5DOF // MY KINEMATIC SPEC',
    title: 'My 5-DOF Robotic Arm & Precision Gripper',
    html: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p><strong>Creator & Roboticist:</strong> Sudhanshu Nirala (RENSTEIN)</p>
        <p><strong>Kinematic Chain:</strong> 5 Degrees of Freedom with serial revolute joints plus an active grabbing end-effector.</p>
        <div style="padding: 1rem; background: var(--bg-surface); border-left: 3px solid var(--orange-core); border-radius: 4px;">
          <h4 style="color: var(--orange-deep); margin-bottom: 0.5rem; font-family: var(--font-heading);">HOW I BUILT THE JOINTS & CONTROLS</h4>
          <ul style="list-style: none; padding: 0; line-height: 1.8; font-family: var(--font-mono); font-size: 0.85rem;">
            <li>▪ <strong>Joint 1 (θ1):</strong> Base Turntable Yaw Rotation (180° sweep)</li>
            <li>▪ <strong>Joint 2 (θ2):</strong> High-Torque Shoulder Pitch Joint</li>
            <li>▪ <strong>Joint 3 (θ3):</strong> Articulated Elbow Pitch Joint</li>
            <li>▪ <strong>Joint 4 (θ4):</strong> Wrist Pitch Orientation Joint</li>
            <li>▪ <strong>Joint 5 (θ5):</strong> Wrist Roll / Continuous Twisting Mechanism</li>
            <li>▪ <strong>End-Effector:</strong> Dual-jaw parallel grabbing mechanism with force feedback</li>
            <li>▪ <strong>My Control Architecture:</strong> Classical PID for baseline tracking, ADRC with an Extended State Observer (ESO) to eliminate unknown payload disturbances, and Fuzzy Logic for adaptive gain scheduling.</li>
          </ul>
        </div>
        <p><strong>Disturbance Rejection:</strong> My Extended State Observer estimates unmodeled joint friction, payload mass shifts, and gravitational sag as an augmented state, canceling disturbances in real-time.</p>
      </div>
    `
  },
  modalTurret: {
    tag: 'UNIT: TURRET-CAM-V1 // MY VISION SPEC',
    title: 'My Active Face-Tracking Camera Turret',
    html: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p><strong>Creator & Roboticist:</strong> Sudhanshu Nirala (RENSTEIN)</p>
        <p><strong>Target Tracking:</strong> High-speed optical Pan-Tilt camera gimbal capable of continuous face tracking and cursor following.</p>
        <div style="padding: 1rem; background: var(--bg-surface); border-left: 3px solid var(--orange-core); border-radius: 4px;">
          <h4 style="color: var(--orange-deep); margin-bottom: 0.5rem; font-family: var(--font-heading);">HOW I DESIGNED THE CONTROL LOOP</h4>
          <ul style="list-style: none; padding: 0; line-height: 1.8; font-family: var(--font-mono); font-size: 0.85rem;">
            <li>▪ <strong>Actuation:</strong> Dual metal-gear precision servo motors (Azimuth + Elevation)</li>
            <li>▪ <strong>Vision Processing:</strong> Real-time bounding box error extraction (Δx, Δy)</li>
            <li>▪ <strong>Discrete PID Controller:</strong> u[k] = Kp·e + Ki·Σe + Kd·Δe/Δt</li>
            <li>▪ <strong>Anti-Windup:</strong> Clamped integral term preventing servo saturation overshoot</li>
            <li>▪ <strong>Response:</strong> Critically damped trajectory locking to target coordinates</li>
          </ul>
        </div>
      </div>
    `
  },
  modalSwarm: {
    tag: 'UNIT: SWARM-QUAD-4 // MY SWARM SPEC',
    title: 'My 4-Robot Collaborative Swarm System',
    html: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p><strong>Creator & Roboticist:</strong> Sudhanshu Nirala (RENSTEIN)</p>
        <p><strong>System Configuration:</strong> 4 decentralized autonomous mobile robots coordinating in real time.</p>
        <div style="padding: 1rem; background: var(--bg-surface); border-left: 3px solid var(--orange-core); border-radius: 4px;">
          <h4 style="color: var(--orange-deep); margin-bottom: 0.5rem; font-family: var(--font-heading);">SWARM PROTOCOLS & ALGORITHMS</h4>
          <ul style="list-style: none; padding: 0; line-height: 1.8; font-family: var(--font-mono); font-size: 0.85rem;">
            <li>▪ <strong>Swarm Size:</strong> Exactly 4 coordinated autonomous agents</li>
            <li>▪ <strong>Consensus Protocol:</strong> Distributed leader-follower formation negotiation</li>
            <li>▪ <strong>Collision Avoidance:</strong> Artificial Potential Fields (APF) with virtual repulsive envelopes</li>
            <li>▪ <strong>Formations:</strong> Diamond, column, and perimeter containment</li>
          </ul>
        </div>
      </div>
    `
  },
  modalBalance: {
    tag: 'UNIT: STRIDER-BAL-1 // MY LQR DYNAMICS SPEC',
    title: 'My Variable-Height Self-Balancing Bot (LQR)',
    html: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p><strong>Creator & Roboticist:</strong> Sudhanshu Nirala (RENSTEIN)</p>
        <p><strong>Dynamic Balance:</strong> Transformable two-wheeled inverted pendulum with servo-driven height adjustment and articulated leg joint bending.</p>
        <div style="padding: 1rem; background: var(--bg-surface); border-left: 3px solid var(--orange-core); border-radius: 4px;">
          <h4 style="color: var(--orange-deep); margin-bottom: 0.5rem; font-family: var(--font-heading);">LQR OPTIMAL CONTROL & MECHANICAL SPECS</h4>
          <ul style="list-style: none; padding: 0; line-height: 1.8; font-family: var(--font-mono); font-size: 0.85rem;">
            <li>▪ <strong>Mobility:</strong> 2-Wheeled high-torque motorized hub wheels with closed-loop encoders</li>
            <li>▪ <strong>Leg Articulation:</strong> Servo knee and hip joint linkages with dynamic joint bending</li>
            <li>▪ <strong>3 Height Modes:</strong> Low Crouch (35%), Mid Stance (65%), and Stand Tall (100%)</li>
            <li>▪ <strong>Control Theory:</strong> LQR (Linear Quadratic Regulator) state feedback u = -Kx</li>
            <li>▪ <strong>Riccati Solver:</strong> Continuous Algebraic Riccati Equation solved across variable pendulum lengths L</li>
            <li>▪ <strong>State Vector:</strong> x = [θ, dθ/dt, x_pos, dx/dt]^T with quadratic cost matrices Q and R</li>
            <li>▪ <strong>Stability:</strong> Guaranteed asymptotic stability under aggressive height transitions</li>
          </ul>
        </div>
      </div>
    `
  }
};

function initModals() {
  const overlay = document.getElementById('modalOverlay');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');

  if (!overlay) return;

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function openModal(key) {
    const data = prototypeDetails[key];
    if (!data) return;

    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) modalBody.innerHTML = data.html;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }

  const inspectButtons = document.querySelectorAll('.btn-inspect, .btn-proto-inspect');
  inspectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   08. YOUTUBE CONTROLLER & EXPERIMENTS PLAYER
   ========================================================================== */
function initYouTubeController() {
  const videoCards = document.querySelectorAll('.experiment-video-card');
  const mainIframe = document.getElementById('mainYoutubeIframe');
  const currentVideoTitle = document.getElementById('currentVideoTitle');
  const currentVideoDesc = document.getElementById('currentVideoDesc');

  if (!videoCards.length) return;

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video-id');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      if (mainIframe && videoId) {
        mainIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        if (currentVideoTitle) currentVideoTitle.textContent = title;
        if (currentVideoDesc) currentVideoDesc.textContent = desc;

        // Smooth scroll up to video player
        const playerBox = document.querySelector('.featured-video-box');
        if (playerBox) {
          playerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // If no video ID yet, open channel directly
        window.open('https://www.youtube.com/@projectRenstein', '_blank');
      }
    });
  });
}

/* ==========================================================================
   09. CONTACT TRANSMISSION FORM & COPY CHIP
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('uplinkForm');
  const statusMsg = document.getElementById('formStatusMsg');
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.getElementById('emailLink');

  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', () => {
      const emailText = emailLink.textContent.trim();
      navigator.clipboard.writeText(emailText).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = 'var(--orange-core)';
        copyBtn.style.color = '#ffffff';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitTransmissionBtn');
      const submitSpan = submitBtn ? submitBtn.querySelector('span') : null;
      const originalText = submitSpan ? submitSpan.textContent : 'Send Message';

      if (submitSpan) submitSpan.textContent = 'Sending Message...';
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (submitSpan) submitSpan.textContent = 'Message Sent ✓';
        if (submitBtn) {
          submitBtn.style.background = '#059669';
          submitBtn.style.borderColor = '#059669';
        }

        if (statusMsg) {
          statusMsg.className = 'form-status-msg success';
          statusMsg.textContent = '✓ Your message has been delivered to me. I will respond to your email shortly.';
        }

        form.reset();

        setTimeout(() => {
          if (submitSpan) submitSpan.textContent = originalText;
          if (submitBtn) {
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
          }
        }, 4000);
      }, 1000);
    });
  }
}
