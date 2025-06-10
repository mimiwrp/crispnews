// src/services/textToSpeechService.js

class TextToSpeechService {
    constructor() {
      this.synth = window.speechSynthesis;
      this.utterance = null;
      this.isPlaying = false;
      this.isPaused = false;
      this.onStart = null;
      this.onEnd = null;
      this.onPause = null;
      this.onResume = null;
      this.onError = null;
    }
  
    // Check if TTS is supported
    isSupported() {
      return 'speechSynthesis' in window;
    }
  
    // Get available voices
    getVoices() {
      return this.synth.getVoices();
    }
  
    // Get a good default voice (English, preferably female for news)
    getDefaultVoice() {
      const voices = this.getVoices();
      
      // Try to find a good English voice
      const preferredVoices = [
        'Google US English Female',
        'Microsoft Zira - English (United States)',
        'Alex', // macOS default
        'Samantha' // macOS female
      ];
  
      for (const preferred of preferredVoices) {
        const voice = voices.find(v => v.name.includes(preferred));
        if (voice) return voice;
      }
  
      // Fallback to any English voice
      const englishVoice = voices.find(v => 
        v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
      );
      
      if (englishVoice) return englishVoice;
  
      // Last resort - any English voice
      return voices.find(v => v.lang.startsWith('en')) || voices[0];
    }
  
    // Speak the given text
    speak(text, options = {}) {
      console.log('🔊 Starting TTS for text:', text.substring(0, 50) + '...');
  
      if (!this.isSupported()) {
        console.error('❌ Text-to-Speech not supported in this browser');
        throw new Error('Text-to-Speech not supported in this browser');
      }
  
      // Force stop any current speech and clear the queue
      this.synth.cancel();
      
      // Wait a bit for the cancel to take effect
      setTimeout(() => {
        // Create new utterance
        this.utterance = new SpeechSynthesisUtterance(text);
  
        // Set voice
        const voice = options.voice || this.getDefaultVoice();
        if (voice) {
          this.utterance.voice = voice;
          console.log('🎤 Using voice:', voice.name);
        }
  
        // Set speech parameters
        this.utterance.rate = options.rate || 1.0;     // Faster for busy users
        this.utterance.pitch = options.pitch || 1.0;   // Normal pitch
        this.utterance.volume = options.volume || 1.0; // Full volume
  
        // Set up event listeners
        this.utterance.onstart = () => {
          console.log('▶️ TTS Started');
          this.isPlaying = true;
          this.isPaused = false;
          if (this.onStart) this.onStart();
        };
  
        this.utterance.onend = () => {
          console.log('⏹️ TTS Ended');
          this.isPlaying = false;
          this.isPaused = false;
          if (this.onEnd) this.onEnd();
        };
  
        this.utterance.onpause = () => {
          console.log('⏸️ TTS Paused');
          this.isPaused = true;
          if (this.onPause) this.onPause();
        };
  
        this.utterance.onresume = () => {
          console.log('▶️ TTS Resumed');
          this.isPaused = false;
          if (this.onResume) this.onResume();
        };
  
        this.utterance.onerror = (event) => {
          console.error('❌ TTS Error:', event.error);
          this.isPlaying = false;
          this.isPaused = false;
          if (this.onError) this.onError(event.error);
        };
  
        // Start speaking
        console.log('🚀 Starting speech synthesis...');
        this.synth.speak(this.utterance);
      }, 100); // Small delay to ensure cancel takes effect
    }
  
    // Pause speech
    pause() {
      if (this.isPlaying && !this.isPaused) {
        console.log('⏸️ Pausing TTS');
        this.synth.pause();
      }
    }
  
    // Resume speech
    resume() {
      if (this.isPaused) {
        console.log('▶️ Resuming TTS');
        this.synth.resume();
      }
    }
  
    // Stop speech
    stop() {
      console.log('🛑 Stopping TTS');
      this.synth.cancel(); // Use cancel instead of individual checks
      this.isPlaying = false;
      this.isPaused = false;
    }
  
    // Toggle play/pause
    toggle() {
      if (this.isPlaying && !this.isPaused) {
        this.pause();
      } else if (this.isPaused) {
        this.resume();
      }
      // If not playing at all, the calling component should call speak()
    }
  
    // Get current state
    getState() {
      return {
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        isSupported: this.isSupported()
      };
    }
  
    // Set event listeners
    setEventListeners({ onStart, onEnd, onPause, onResume, onError }) {
      this.onStart = onStart;
      this.onEnd = onEnd;
      this.onPause = onPause;
      this.onResume = onResume;
      this.onError = onError;
    }
  }
  
  // Create and export a singleton instance
  const ttsService = new TextToSpeechService();
  
  export default ttsService;
  
  // Helper function to speak briefing text
  export const speakBriefing = (briefingText, onStart, onEnd, onError) => {
    ttsService.setEventListeners({
      onStart,
      onEnd,
      onError
    });
  
    ttsService.speak(briefingText, {
      rate: 1.0,  // Faster speed for busy users
      pitch: 1.0,
      volume: 1.0
    });
  };
  
  // Helper function to toggle briefing playback
  export const toggleBriefingPlayback = (briefingText, isCurrentlyPlaying, callbacks) => {
    console.log('🎵 toggleBriefingPlayback called - isCurrentlyPlaying:', isCurrentlyPlaying);
    
    if (!briefingText) {
      console.warn('⚠️ No briefing text provided');
      return;
    }
  
    // Always stop first to ensure clean state
    ttsService.stop();
    
    if (!isCurrentlyPlaying) {
      // Start playing after a small delay
      setTimeout(() => {
        console.log('🚀 Starting speech...');
        speakBriefing(briefingText, callbacks.onStart, callbacks.onEnd, callbacks.onError);
      }, 150);
    } else {
      // Already stopped above, just call the onEnd callback
      if (callbacks.onEnd) {
        callbacks.onEnd();
      }
    }
  };