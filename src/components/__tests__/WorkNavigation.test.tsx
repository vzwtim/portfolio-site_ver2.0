import { act, fireEvent, render } from '@testing-library/react';
import WorkNavigation from '../WorkNavigation';

const push = jest.fn();
const prefetch = jest.fn();
const router = { push, prefetch };
let pathname = '/works';
jest.mock('next/navigation', () => ({ useRouter: () => router, usePathname: () => pathname }));

describe('work navigation wipe', () => {
  let finish: () => void;
  let reduced = false;
  beforeEach(() => {
    jest.useFakeTimers();
    push.mockClear(); prefetch.mockClear(); pathname = '/works'; reduced = false;
    window.matchMedia = jest.fn().mockImplementation(() => ({ matches: reduced }));
    Element.prototype.animate = jest.fn().mockImplementation(() => ({ finished: new Promise<void>(resolve => { finish = resolve; }) }));
  });
  afterEach(() => { jest.useRealTimers(); });

  it('expands before routing, then clears the overlay once the new route renders', async () => {
    const view = render(<><WorkNavigation /><a href="/works/odo-renovation">Project</a></>);
    fireEvent.click(view.getByText('Project'), { clientX: 240, clientY: 320 });
    expect(document.querySelector('.workNavigationWipe')).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
    await act(async () => finish());
    expect(push).toHaveBeenCalledWith('/works/odo-renovation');
    pathname = '/works/odo-renovation';
    view.rerender(<><WorkNavigation /><a href="/works/odo-renovation">Project</a></>);
    act(() => jest.advanceTimersByTime(40));
    await act(async () => finish());
    expect(document.querySelector('.workNavigationWipe')).not.toBeInTheDocument();
  });

  it('leaves modified clicks, external links, filters and reduced motion to the browser', () => {
    const view = render(<><WorkNavigation /><a href="/works/odo-renovation">Project</a><a href="/works?tag=architecture">Filter</a><a href="https://example.com/works/demo">External</a></>);
    const click = (element: HTMLElement, options = {}) => {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...options });
      // Prevent jsdom navigation after observing whether our capture listener intercepted it.
      let intercepted = false;
      const check = () => { intercepted = event.defaultPrevented; event.preventDefault(); };
      element.addEventListener('click', check, { once: true });
      element.dispatchEvent(event);
      return intercepted;
    };
    expect(click(view.getByText('Project'), { ctrlKey: true })).toBe(false);
    expect(click(view.getByText('Filter'))).toBe(false);
    expect(click(view.getByText('External'))).toBe(false);
    reduced = true;
    expect(click(view.getByText('Project'))).toBe(false);
    expect(push).not.toHaveBeenCalled();
    expect(document.querySelector('.workNavigationWipe')).not.toBeInTheDocument();
  });

  it('removes an interrupted wipe on unmount', () => {
    const view = render(<><WorkNavigation /><a href="/works/odo-renovation">Project</a></>);
    fireEvent.click(view.getByText('Project'));
    view.unmount();
    expect(document.querySelector('.workNavigationWipe')).not.toBeInTheDocument();
  });
});
