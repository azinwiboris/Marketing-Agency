import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoImage } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block8 } from "./Block8";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block8,
  title: "Blocks/Block8",
} as Meta;

const DEMO_CONTENT = {
  title: "The most trusted cryptocurrency platform",
  intro: <p>Here are a few reasons why you should choose Flowbite</p>,
  items: [
    {
      _key: "",
      title: "Secure storage",
      intro: (
        <p>
          We store the vast majority of the digital assets in secure offline
          storage.
        </p>
      ),
      image: demoImage,
    },
    {
      _key: "",
      title: "Insurance",
      intro: (
        <p>
          Flowbite maintains crypto insurance and all USD cash balances are
          covered.
        </p>
      ),
      image: demoImage,
    },
    {
      _key: "",
      title: "Best practices",
      intro: (
        <p>
          Flowbite marketplace supports a variety of the most popular digital
          currencies.
        </p>
      ),
      image: demoImage,
    },
  ],
};

export const Default = () => <Block8 {...DEMO_CONTENT} />;

export const SingleItem = () => (
  <Block8 {...DEMO_CONTENT} items={DEMO_CONTENT.items.slice(0, 1)} />
);
export const TwoItems = () => (
  <Block8 {...DEMO_CONTENT} items={DEMO_CONTENT.items.slice(0, 2)} />
);
export const ThreeItems = () => (
  <Block8 {...DEMO_CONTENT} items={DEMO_CONTENT.items.slice(0, 3)} />
);
export const FourItems = () => (
  <Block8
    {...DEMO_CONTENT}
    items={[...DEMO_CONTENT.items, ...DEMO_CONTENT.items].slice(0, 4)}
  />
);
export const FiveItems = () => (
  <Block8
    {...DEMO_CONTENT}
    items={[...DEMO_CONTENT.items, ...DEMO_CONTENT.items].slice(0, 5)}
  />
);
export const SixItems = () => (
  <Block8
    {...DEMO_CONTENT}
    items={[...DEMO_CONTENT.items, ...DEMO_CONTENT.items].slice(0, 6)}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block8
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);

export const Alignments = () => (
  <>
    {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map(
      (align) => (
        <div key={align}>
          <Block8
            {...DEMO_CONTENT}
            theme={{
              block: { align },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block8
          title={DEMO_CONTENT.title}
          theme={{
            title: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <Block8
          title={DEMO_CONTENT.title}
          theme={{
            title: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block8
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroSizes = () => (
  <>
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
      <div key={size}>
        <Block8
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const Colors = () => (
  <Block8
    {...DEMO_CONTENT}
    theme={{
      title: { color: "white" },
      intro: { color: "white" },
      block: { background: "black" },
    }}
  />
);