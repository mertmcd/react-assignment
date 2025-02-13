import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 w-80 p-4 rounded-lg shadow-lg text-white font-semibold text-sm ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="truncate">{message}</p>
        <button
          onClick={onClose}
          className="text-white font-bold px-2 py-1 hover:bg-white hover:bg-opacity-20 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Notification;
