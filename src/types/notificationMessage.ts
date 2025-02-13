export interface NotificationProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}
