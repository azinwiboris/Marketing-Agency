import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ResourceCardProps } from "../../components/cards/ResourceCard";
import { IconLoaderProps } from "../../components/images/IconLoader";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { useTranslation } from "../../hooks/useTranslation";
import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "classnames";
import React, { ComponentType, lazy, useContext } from "react";

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

const ResourceCard = lazy<ComponentType<ResourceCardProps>>(
  () =>
    import(
      /* webpackChunkName: "ResourceCard" */ "../../components/cards/ResourceCard"
    ),
);

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

export type Block12Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    tags?: {
      display?: boolean;
      color?: ColorType;
      background?: ColorType;
    };
    card?: ResourceCardProps["theme"];
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  items?: ResourceCardProps[];
};

const PAGE_SIZE = 5 * 3;

export const Block12 = ({
  theme,
  decorations,
  title,
  intro,
  items,
}: Block12Props) => {
  const [currentTag, setCurrentTag] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);

  const filteredItems = items?.filter((item) => {
    if (!currentTag) return true;
    return item.tags?.includes(currentTag);
  });

  // poor mans pagination, at some point replace this with actual groq pagination
  const paginatedItems = filteredItems?.slice(0, PAGE_SIZE * page);

  // show load more button
  let hasMore =
    filteredItems &&
    paginatedItems &&
    filteredItems?.length > paginatedItems?.length;

  // handle load more
  const onLoadMoreClick = () => {
    setPage((page) => ++page);
  };

  // generate set of unique used tags
  const availableTags = React.useMemo(() => {
    return getUniqueTags(items || []);
  }, [items]);

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col gap-6 max-w-3xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}

        {intro && (
          <Text
            size={theme?.intro?.size || "xl"}
            color={theme?.intro?.color}
            align={theme?.block?.align || "center"}
          >
            <PortableText content={intro as any} />
          </Text>
        )}
      </div>

      <div
        className={cx(
          "flex flex-col gap-6 pt-6",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {availableTags &&
          theme?.tags?.display !== false &&
          Boolean(availableTags?.length) && (
            <div className="mb-4 md:mb-6">
              <ul className="flex flex-wrap gap-2">
                {availableTags?.filter(Boolean).map((tag) => (
                  <li key={tag}>
                    <button
                      className={cx(
                        "relative transition-all font-semibold text-md rounded py-1 px-2 hover:underline",
                        theme?.tags?.color && textClasses[theme?.tags?.color],

                        {
                          ["opacity-50"]: currentTag && currentTag !== tag,
                        },
                      )}
                      onClick={() =>
                        currentTag === tag
                          ? setCurrentTag(null)
                          : tag && setCurrentTag(tag)
                      }
                    >
                      <span
                        className={cx(
                          "absolute inset-0",
                          theme?.tags?.background &&
                            backgroundClasses[theme?.tags?.background],
                          {
                            ["opacity-5 bg-current"]: !theme?.tags?.background,
                          },
                        )}
                      />
                      <span className="relative">{tag}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {Boolean(paginatedItems?.length) && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedItems?.map((item) => (
              <li key={item._id}>
                <ResourceCard {...item} theme={theme?.card} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={onLoadMoreClick}
            className={cx(
              "font-semibold text-md rounded py-1 px-2 hover:underline flex gap-1 items-center",
              theme?.tags?.color && textClasses[theme?.tags?.color],
              theme?.tags?.background &&
                backgroundClasses[theme?.tags?.background],
            )}
          >
            {useTranslation("load_more", "Load more")}
            <IconLoader
              icon="chevrondown"
              className="block w-5 h-5 text-current"
            />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block12);

const getUniqueTags = (items: ResourceCardProps[]) => {
  const usedTags: Record<string, string> = {};
  const tags = items?.reduce((acc, item) => {
    if (item.tags) {
      item.tags.forEach((tag) => {
        if (!usedTags[tag]) {
          usedTags[tag] = tag;
          acc.push(tag);
        }
      });
    }
    return acc;
  }, [] as string[]);
  return tags?.sort((a, b) => a.localeCompare(b));
};
