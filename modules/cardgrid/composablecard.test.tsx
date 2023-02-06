import { render, screen, act } from "../../jest.utils";
import { demoImage, demoImage2 } from "../../stories/content";
import ComposableCard, { ComposableCardProps } from "./ComposableCard";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

const DEMO_CONTENT = {
  type: "card.composable",
  title: "title",
  subtitle: "subtitle",
  text: <p>text</p>,
  cover: demoImage,
  image: demoImage2,
  icon: "demo",
  buttons: [
    {
      label: "button 1",
      href: "/",
      variant: "primary",
    },
    {
      label: "button 2",
      href: "/",
      variant: "tertiary",
    },
  ],
  theme: {
    card: { background: "brand-500", align: "right" },
    title: { size: "md", color: "white" },
    text: { size: "md", color: "white" },
    icon: { size: "lg", color: "white" },
    image: { height: "lg", ratio: "16/9", rounded: "xl" },
  },
} as ComposableCardProps;

describe("Composable card", () => {
  it("renders content", async () => {
    await act(() => {
      render(<ComposableCard {...DEMO_CONTENT} />);
    });
    expect(screen.getByText("title", { selector: "h3" })).toBeInTheDocument();
    expect(
      screen.getByText("subtitle", { selector: "span" }),
    ).toBeInTheDocument();
    expect(screen.getByText("text", { selector: "p" })).toBeInTheDocument();
    expect(
      screen.getByText("button 1", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("button 2", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("demoimage"));
    expect(screen.getAllByAltText("demoimage2"));
    expect(screen.getByLabelText("icon demo white")).toBeInTheDocument();
  });
});