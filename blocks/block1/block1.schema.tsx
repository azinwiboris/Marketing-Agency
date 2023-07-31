import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultImageTheme } from "../../components/images/image.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { IMAGE_POSITION_OPTIONS } from "./block1.options";
import { VirtualRealityImage } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block1",
  title: "Image with feature list",
  type: "object",
  icon: () => <VirtualRealityImage weight="thin" />,
  description: "Text, image and feature list left or right",
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title = "Block 1", image }: any) {
      return {
        title: title,
        media: image || <VirtualRealityImage weight="thin" />,
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "portabletext.basic",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defaultImageTheme,
        defineField({
          name: "layout",
          title: "Layout",
          type: "styles",
          options: {
            fields: [
              {
                name: "imagePosition",
                title: "Image position",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_POSITION_OPTIONS),
                },
              },
            ],
          },
        }),
        defaultTitleTheme,
        defaultTextTheme,
        { ...defaultTextTheme, name: "features", title: "Features" },
      ],
    }),
  ],
});

export default schema;