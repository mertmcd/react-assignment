import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notification from "./Notification";
import "@testing-library/jest-dom";

describe("Notification", () => {
  const renderNotification = (props = {}) => {
    const defaultProps = {
      message: "This is a test message",
      type: "success" as "success" | "error",
      onClose: () => {},
      duration: 3000,
    };

    render(<Notification {...defaultProps} {...props} />);
  };

  it("should render the notification with correct message and type", () => {
    renderNotification({
      message: "This is a success message!",
      type: "success",
    });

    const notification = screen.getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveClass("bg-green-500");
  });

  it("should close the notification after the specified duration", () => {
    jest.useFakeTimers();
    const onCloseMock = jest.fn();

    renderNotification({ onClose: onCloseMock });

    expect(screen.getByTestId("notification")).toBeInTheDocument();
    jest.advanceTimersByTime(3000);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it("should call onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    renderNotification({ onClose: onCloseMock });

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
