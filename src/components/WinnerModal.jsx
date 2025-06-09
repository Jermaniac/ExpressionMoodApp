import { useEffect, useState } from "react";

const WinnerModal = ({ mood, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-700 bg-opacity-90 rounded-xl p-8 flex flex-col items-center shadow-2xl">
        <img
          src={`/assets/images/emoji_${mood}.webp`}
          alt={mood}
          className="w-16 h-16 mb-4"
        />
        <h2 className="text-2xl font-bold text-white capitalize">{mood}</h2>
        <span className="text-white mt-2">is the winner mood!</span>
      </div>
    </div>
  );
};

export default WinnerModal;