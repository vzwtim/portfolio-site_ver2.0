import { render, screen } from "@testing-library/react";
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
    expect(screen.queryByRole("button", { name: /埋め込みで開く/ })).not.toBeInTheDocument();
  });
});
