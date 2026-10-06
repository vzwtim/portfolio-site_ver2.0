import { render, screen } from "@testing-library/react";
import ShadowAnimation from "../ShadowAnimation";
import Footer from "../Footer";

jest.mock("framer-motion", () => ({
  useReducedMotion: () => true,
  motion: {
    img: ({ whileHover: _hover, transition: _transition, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { whileHover?: unknown; transition?: unknown }) => {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...props} />;
    },
  },
}));

describe("footer landscape", () => {
  it("keeps links outside the decorative clipped scene and visible to assistive technology", () => {
    const { container } = render(<ShadowAnimation><Footer /></ShadowAnimation>);
    const footer = screen.getByRole("contentinfo");
    const landscape = container.querySelector(".footerLandscape");
    expect(landscape).toHaveAttribute("aria-hidden", "true");
    expect(landscape).not.toContainElement(footer);
    const world = container.querySelector(".footerWorld");
    expect(world).toContainElement(container.querySelector(".footerPanorama"));
    expect(world).toContainElement(container.querySelector('img[src="/images/deer_1.svg"]'));
    expect(footer.previousElementSibling).toBe(landscape);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeVisible();
    expect(screen.queryByAltText("Sakura Petal")).not.toBeInTheDocument();
  });
});
