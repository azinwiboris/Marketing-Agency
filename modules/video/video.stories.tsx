import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { Video } from "./Video";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Video,
  title: "Modules/Video",
} as Meta;

export const Default = () => (
  <Video
    video={{
      caption: "youtube",
      provider: "youtube",
      videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    }}
  />
);

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <Video
                title="Video"
                theme={{
                  module: { background: color1 },
                  text: { color: color2 },
                }}
              />
            </div>
          ),
        ),
    )}
  </>
);
