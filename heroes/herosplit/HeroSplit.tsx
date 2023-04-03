import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { BleedProps } from "../../components/module/Bleed";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WidthProps } from "../../components/module/Width";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { ImageType } from "../../types";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Width = lazy<ComponentType<WidthProps>>(
  () => import(/* webpackChunkName: "Width" */ "../../components/module/Width"),
);

const Bleed = lazy<ComponentType<BleedProps>>(
  () => import(/* webpackChunkName: "Bleed" */ "../../components/module/Bleed"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

export type HeroSplitProps = {
  eyebrow?: string;
  title?: string;
  buttons?: ButtonProps[];
  text?: React.ReactElement;
  image?: ImageType;
};

export const HeroSplit = (data: HeroSplitProps) => {
  if (!data) return null;

  const { eyebrow, title, buttons, text, image }: HeroSplitProps = data;

  return (
    <header className="relative z-0 overflow-hidden text-neutral-500">
      <div className="relative flex flex-row z-30 pt-10 md:pt-15 lg:pt-20">
        <Bleed bleed="md">
          <Width
            width="inner"
            className="lg:space-x-24 flex flex-col items-start lg:flex-row justify-between"
          >
            <div className="lg:w-[40%] relative flex flex-col gap-4 mx-auto">
              {(title || eyebrow) && (
                <Title as="h1" size="6xl" color="neutral-800" eyebrow={eyebrow}>
                  {title}
                </Title>
              )}

              {text && (
                <Text size="lg" className="mt-2" color="neutral-900">
                  <PortableText content={text as any} />
                </Text>
              )}

              {buttons && (
                <ButtonGroup className="mt-4 md:mt-6 lg:mt-8" items={buttons} />
              )}
            </div>

            {image && (
              <div className="mt-12 lg:mt-0 lg:w-[60%]">
                <ResponsiveImage
                  {...image}
                  priority
                  loading="eager"
                  roundSize={50}
                />
              </div>
            )}
          </Width>
        </Bleed>
      </div>
    </header>
  );
};

export default React.memo(HeroSplit);