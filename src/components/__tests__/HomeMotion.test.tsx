import { act, render } from "@testing-library/react";
import HomeMotion from "../HomeMotion";
import Lenis from "lenis";

jest.mock("lenis", () => jest.fn().mockImplementation(() => ({ destroy: jest.fn() })));

it("keeps photographs and chapter entrances static while scrolling, and clears activity with reduced motion", () => {
  const observers: Array<{ callback: IntersectionObserverCallback; disconnect: jest.Mock }> = [];
  const frames: FrameRequestCallback[] = [];
  let reduced = false;
  let preferenceChange: () => void = () => {};
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = query => ({
    get matches() { return query.includes("reduced-motion") ? reduced : true; },
    media: query, onchange: null, addListener: jest.fn(), removeListener: jest.fn(), dispatchEvent: jest.fn(),
    addEventListener: (_event: string, listener: EventListenerOrEventListenerObject) => { if (query.includes("reduced-motion")) preferenceChange = listener as () => void; },
    removeEventListener: jest.fn(),
  });
  const originalObserver = global.IntersectionObserver;
  global.IntersectionObserver = class {
    disconnect = jest.fn(); observe = jest.fn(); unobserve = jest.fn();
    constructor(callback: IntersectionObserverCallback) { observers.push({ callback, disconnect: this.disconnect }); }
  } as unknown as typeof IntersectionObserver;
  jest.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.push(callback); return frames.length; });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  const { container, unmount } = render(<main data-home-motion><HomeMotion /><section id="chapter" data-motion-section data-scene-surface><div data-project-image /></section></main>);
  const smooth = jest.mocked(Lenis).mock.results.at(-1)!.value;
  expect(Lenis).toHaveBeenCalledTimes(1);
  const section = container.querySelector("section")!;
  const image = container.querySelector<HTMLElement>("[data-project-image]")!;
  let top = window.innerHeight * .7;
  jest.spyOn(section, "getBoundingClientRect").mockImplementation(() => ({ top, height: 1600 } as DOMRect));
  jest.spyOn(image, "getBoundingClientRect").mockImplementation(() => ({ top: top + 100, height: 300 } as DOMRect));
  const enter = (observer: number, target: Element) => observers[observer].callback([{ target, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
  act(() => { enter(1, section); frames.shift()!(0); });
  expect(image.style.getPropertyValue("--project-pan")).toBe("");
  expect(image.style.getPropertyValue("--project-zoom")).toBe("");
  expect(section.style.getPropertyValue("--surface-inset")).toBe("");
  expect(section.style.getPropertyValue("--scene-copy-shift")).toBe("");
  expect(section.style.getPropertyValue("--scene-title-scale")).toBe("");
  top = window.innerHeight * .1;
  act(() => { window.dispatchEvent(new Event("scroll")); frames.shift()!(16); });
  expect(section.style.getPropertyValue("--surface-inset")).toBe("");
  expect(image.style.getPropertyValue("--project-pan")).toBe("");
  expect(image.style.getPropertyValue("--project-zoom")).toBe("");
  expect(section.style.getPropertyValue("--hero-zoom")).toBe("");
  act(() => { reduced = true; preferenceChange(); });
  expect(smooth.destroy).toHaveBeenCalledTimes(1);
  expect(Lenis).toHaveBeenCalledTimes(1);
  expect(container.querySelector("main")).not.toHaveAttribute("data-motion-ready");
  expect(image.style.getPropertyValue("--project-pan")).toBe("");
  expect(section.style.getPropertyValue("--surface-inset")).toBe("");
  expect(observers.every(observer => observer.disconnect.mock.calls.length === 1)).toBe(true);
  unmount();
  global.IntersectionObserver = originalObserver;
  window.matchMedia = originalMatchMedia;
  jest.restoreAllMocks();
});
