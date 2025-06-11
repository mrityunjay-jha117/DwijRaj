import { useEffect, useState } from "react";

interface ErrorMessageProps {
  text?: string;
  duration?: number; // in milliseconds
}

export default function ErrorMessage({ text = "Wrong inputs entered", duration = 5000 }: ErrorMessageProps) {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), duration - 1000);
    const hideTimer = setTimeout(() => setVisible(false), duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`font-semibold absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-100 text-black text-center text-xs sm:text-xl md:text-2xl p-3 sm:py-4 sm:px-20 rounded-full transition-opacity duration-1000 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {text}
    </div>
  );
}
