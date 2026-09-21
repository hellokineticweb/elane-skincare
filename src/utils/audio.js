class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.ambientGain = null;
    this.oscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggleAmbient() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAmbient();
      this.isPlaying = false;
      return false;
    } else {
      this.startAmbient();
      this.isPlaying = true;
      return true;
    }
  }

  startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    const now = this.ctx.currentTime;

    // Master ambient gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 3);
    this.ambientGain.connect(this.ctx.destination);

    // Warm resonant frequencies (432Hz base chord: 216Hz, 324Hz, 432Hz, 648Hz)
    const freqs = [108, 216, 324, 432, 540];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle LFO detune
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.15 / (idx + 1), now);
      osc.connect(gain);
      gain.connect(this.ambientGain);

      osc.start();
      this.oscillators.push(osc, lfo);
    });
  }

  stopAmbient() {
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.001, now + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        this.oscillators = [];
      }, 1600);
    }
  }

  playChime(type = 'crystal') {
    this.init();
    if (!this.ctx || this.ctx.state === 'suspended') return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = type === 'click' ? 880 : 1320;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      // Ignore audio playback exceptions if blocked by user gesture policy
    }
  }
}

export const soundEngine = new SoundEngine();
