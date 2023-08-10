import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { MobileScrollerProps } from "../../components/slider/MobileScroller";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { ImageType } from "../../types";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper")
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title")
);

const MobileScroller = lazy<ComponentType<MobileScrollerProps>>(
  () =>
    import(
      /* webpackChunkName: "MobileScroller" */ "../../components/slider/MobileScroller"
    )
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text")
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    )
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    )
);
const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    )
);

export type Block7Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;

  buttons?: ButtonProps[];
  items?: { _key?: string; image?: ImageType }[];
};

export const Block7 = ({
  theme,
  decorations,
  title,
  intro,
  buttons,
  items,
}: Block7Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col",
          textAlignClasses[theme?.block?.align || "left"]
        )}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/12 md:order-first order-last">
            {title && (
              <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
                {title}
              </Title>
            )}

            {intro && (
              <Text
                size={theme?.intro?.size || "xl"}
                color={theme?.intro?.color}
                align={theme?.block?.align || "left"}
              >
                <PortableText content={intro as any} />
              </Text>
            )}

            {buttons && Boolean(buttons?.filter(Boolean).length) && (
              <div className="mt-6">
                <ButtonGroup items={buttons} />
              </div>
            )}
          </div>

          <div className="md:w-10/12">
            {items && Boolean(items?.filter(Boolean).length) && (
              <MobileScroller className="md:pl-24 flex flex-row space-x-4">
                {items?.map(({ image, _key }) => (
                  <div className="overflow-hidden w-64 h-72 rounded-lg relative">
                    {image && <ResponsiveImage key={_key} {...image} fill />}
                  </div>
                ))}
              </MobileScroller>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(Block7);
