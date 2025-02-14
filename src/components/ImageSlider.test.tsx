import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageSlider from "./ImageSlider";
import "@testing-library/jest-dom";

describe("ImageSlider", () => {
  it("should render the image slider with correct images", () => {
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    render(<ImageSlider images={images} />);
    const image = screen.getByAltText("Slide 1") as HTMLImageElement;
    expect(image.src).toContain("image1.jpg");
  });

  it("should change slide when next or previous button is clicked", () => {
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    render(<ImageSlider images={images} />);
    const nextButton = screen.getByText("❯");
    const prevButton = screen.getByText("❮");

    fireEvent.click(nextButton);
    let image = screen.getByAltText("Slide 2") as HTMLImageElement;
    expect(image.src).toContain("image2.jpg");

    fireEvent.click(nextButton);
    image = screen.getByAltText("Slide 3") as HTMLImageElement;
    expect(image.src).toContain("image3.jpg");

    fireEvent.click(nextButton);
    image = screen.getByAltText("Slide 1") as HTMLImageElement;
    expect(image.src).toContain("image1.jpg");

    fireEvent.click(prevButton);
    image = screen.getByAltText("Slide 3") as HTMLImageElement;
    expect(image.src).toContain("image3.jpg");

    fireEvent.click(prevButton);
    image = screen.getByAltText("Slide 2") as HTMLImageElement;
    expect(image.src).toContain("image2.jpg");

    fireEvent.click(prevButton);
    image = screen.getByAltText("Slide 1") as HTMLImageElement;
    expect(image.src).toContain("image1.jpg");
  });
});
