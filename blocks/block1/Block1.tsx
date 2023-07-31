import { WrapperProps } from "../../components/block/Wrapper";
import { SpaceType } from "../../components/block/spacing.options";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { ImageThemeType } from "../../components/images/image.options";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { ColorType, ImageType } from "../../types";
import { ImagePositionType } from "./block1.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

export type Block1Props = {
  theme?: {
    block?: {
      background?: ColorType;
      space?: SpaceType;
    };
    layout?: {
      imagePosition?: ImagePositionType;
    };
    image?: ImageThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    features?: TextThemeType;
  };

  title?: string;
  intro?: React.ReactNode;
  features?: React.ReactNode;
  image?: ImageType;
};

export const Block1 = ({
  theme,
  title,
  intro,
  features,
  image,
}: Block1Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div className="gap-8 items-center grid lg:grid-cols-2 xl:gap-16">
        <div className="order-1">
          {title && (
            <div className="mb-4">
              <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
                {title}
              </Title>
            </div>
          )}

          {intro && (
            <div className="mb-8">
              <Text
                size={theme?.intro?.size || "lg"}
                color={theme?.intro?.color}
              >
                <PortableText content={intro as any} />
              </Text>
            </div>
          )}

          {features && (
            <div className="pt-8 my-7 border-t border-gray-200">
              <Text
                size={theme?.features?.size || "lg"}
                color={theme?.features?.color}
              >
                <PortableText content={features as any} />
              </Text>
            </div>
          )}
        </div>

        {image && (
          <div
            className={cx(
              "order-0 mb-4 w-full lg:mb-0 lg:flex relative md:h-full max-w-[650px] lg:max-w-full",
              {
                ["aspect-video"]: theme?.image?.preserveAspectRatio !== true,
                ["lg:order-2"]: theme?.layout?.imagePosition !== "left",
                ["lg:order-0"]: theme?.layout?.imagePosition === "left",
              },
            )}
          >
            <ResponsiveImage
              {...image}
              {...theme?.image}
              fill={theme?.image?.preserveAspectRatio !== true}
              className={
                theme?.image?.preserveAspectRatio !== true
                  ? "absolute inset-0"
                  : ""
              }
              roundSize={25}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block1);
