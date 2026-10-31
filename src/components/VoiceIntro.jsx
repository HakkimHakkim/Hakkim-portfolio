import { useEffect, useRef, useState } from "react";
import { Play, Square, Mic } from "lucide-react";
import { voiceIntro } from "../data/portfolio.js";

const BAR_COUNT = 5;

export default function VoiceIntro({
  onSpeakingChange,
  onVoiceLevelChange,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  // ============================================================
  // SUPPORT CHECK
  // ============================================================

  useEffect(() => {
    const speechSupported =
      "speechSynthesis" in window &&
      "SpeechSynthesisUtterance" in window;

    if (!voiceIntro.audioSrc && !speechSupported) {
      setIsSupported(false);
    }

    return () => {
      stopVoice();
    };
  }, []);

  // ============================================================
  // SEND SPEAKING STATE TO CHARACTER
  // ============================================================

  const setSpeaking = (value) => {
    setIsPlaying(value);

    if (onSpeakingChange) {
      onSpeakingChange(value);
    }

    if (!value && onVoiceLevelChange) {
      onVoiceLevelChange(0);
    }
  };

  // ============================================================
  // VOICE LEVEL ANIMATION
  //
  // SpeechSynthesis doesn't expose real audio amplitude,
  // so we create a natural animated level while speaking.
  // ============================================================

  const startVoiceAnimation = () => {
    const animate = () => {
      if (!isPlaying) return;

      const time = performance.now() / 1000;

      const level =
        0.25 +
        Math.abs(Math.sin(time * 7)) * 0.45 +
        Math.abs(Math.sin(time * 3.2)) * 0.2;

      if (onVoiceLevelChange) {
        onVoiceLevelChange(
          Math.min(level, 1)
        );
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current =
      requestAnimationFrame(animate);
  };

  // ============================================================
  // STOP VOICE
  // ============================================================

  const stopVoice = () => {
    window.speechSynthesis?.cancel();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(
        animationFrameRef.current
      );

      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    sourceRef.current = null;

    setSpeaking(false);
  };

  // ============================================================
  // PLAY PRE-RECORDED AUDIO
  // ============================================================

  const playAudioFile = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(
          voiceIntro.audioSrc
        );

        audioRef.current.preload = "auto";

        audioRef.current.addEventListener(
          "ended",
          () => {
            stopVoice();
          }
        );

        audioRef.current.addEventListener(
          "error",
          () => {
            stopVoice();
          }
        );
      }

      audioRef.current.currentTime = 0;

      setSpeaking(true);

      await audioRef.current.play();

      startVoiceAnimation();
    } catch (error) {
      console.error(
        "Voice playback failed:",
        error
      );

      stopVoice();
    }
  };

  // ============================================================
  // PLAY BROWSER SPEECH
  // ============================================================

  const playSpeechSynthesis = () => {
    if (
      !("speechSynthesis" in window)
    ) {
      setIsSupported(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        voiceIntro.script
      );

    // Professional natural speaking speed
    utterance.rate = 0.96;

    // Natural pitch
    utterance.pitch = 0.95;

    // Slightly stronger volume
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
      startVoiceAnimation();
    };

    utterance.onend = () => {
      stopVoice();
    };

    utterance.onerror = (event) => {
      console.error(
        "Speech synthesis error:",
        event
      );

      stopVoice();
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(
      utterance
    );

    setSpeaking(true);

    startVoiceAnimation();
  };

  // ============================================================
  // PLAY
  // ============================================================

  const play = () => {
    if (voiceIntro.audioSrc) {
      playAudioFile();
      return;
    }

    playSpeechSynthesis();
  };

  // ============================================================
  // BUTTON CLICK
  // ============================================================

  const handleClick = () => {
    if (isPlaying) {
      stopVoice();
    } else {
      play();
    }
  };

  // ============================================================
  // UI
  // ============================================================

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isPlaying}
      aria-label={
        isPlaying
          ? "Stop voice introduction"
          : "Play voice introduction"
      }
      className="
        group
        inline-flex
        items-center
        gap-3
        rounded-full
        border
        border-maroon-500/30
        bg-white/[0.03]
        px-5
        py-3
        text-sm
        text-ink-100
        backdrop-blur-sm
        transition-all
        duration-300
        hover:border-maroon-300/60
        hover:bg-white/[0.07]
        hover:shadow-[0_0_30px_rgba(116, 27, 56,0.18)]
        active:scale-95
      "
    >

      {/* PLAY / STOP ICON */}

      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-maroon-500/20
          text-maroon-300
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {isPlaying ? (
          <Square
            size={11}
            strokeWidth={2.5}
            fill="currentColor"
          />
        ) : (
          <Play
            size={12}
            strokeWidth={2.5}
            fill="currentColor"
          />
        )}
      </span>

      {/* TEXT */}

      <span className="font-medium">
        {isPlaying
          ? "Speaking..."
          : "Hear my introduction"}
      </span>

      {/* AUDIO VISUALIZER */}

      {isPlaying ? (
        <span
          className="
            flex
            h-5
            items-end
            gap-[3px]
          "
          aria-hidden="true"
        >
          {Array.from({
            length: BAR_COUNT,
          }).map((_, index) => (
            <span
              key={index}
              className="
                eq-bar
                w-[3px]
                rounded-full
                bg-maroon-300
              "
              style={{
                height:
                  `${35 + (index % 3) * 20}%`,
                animationDelay:
                  `${index * 0.12}s`,
              }}
            />
          ))}
        </span>
      ) : (
        <Mic
          size={14}
          className="
            text-ink-400
            transition-colors
            group-hover:text-maroon-300
          "
        />
      )}
    </button>
  );
}
