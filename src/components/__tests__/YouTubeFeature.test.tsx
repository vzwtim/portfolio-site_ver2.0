import { fireEvent, render, screen } from "@testing-library/react";
import YouTubeFeature from "../YouTubeFeature";

describe("YouTubeFeature", () => {
  it("renders the featured video and channel selection immediately", () => {
    render(
      <YouTubeFeature
        videoId="AV41DNDRaMk"
        channelUrl="https://www.youtube.com/@vzwtim"
        uploadsHandle="vzwtim"
      />,
    );

    const featured = screen.getByTitle("旧街道を、自転車でたどる。");
    const channel = screen.getByRole("link", { name: "@vzwtim の映像を見る" });

    expect(featured).toHaveAttribute("src", expect.stringContaining("/embed/AV41DNDRaMk?start=2"));
    expect(channel).toHaveAttribute("href", "https://www.youtube.com/@vzwtim");
    expect(document.querySelectorAll("iframe")).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /を再生$/ })).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: /奥州街道.*を再生$/ }));
    expect(document.querySelectorAll("iframe")).toHaveLength(1);
    expect(document.querySelector("iframe")).toHaveAttribute("src", expect.stringContaining("/embed/2v_vI3E9cts"));
    expect(screen.queryByRole("button", { name: /埋め込みで開く/ })).not.toBeInTheDocument();
  });
});
