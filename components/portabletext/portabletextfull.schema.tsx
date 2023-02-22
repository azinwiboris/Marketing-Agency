import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { DIRECTION_OPTIONS } from "../buttons/buttongroup.options";
import { SCRIPT_REFERENCE_FIELD } from "../script/script.schema";
import richTextBasicSchema from "./portabletextbasic.schema";
import { Chain, Tables } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField } from "sanity";

export default defineField({
  name: "portabletext.full",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      title: "Rich text",
      styles: [
        ...(richTextBasicSchema.of[0] as any).styles,
        { title: "H2", value: "h2" },
        { title: "H5", value: "h5" },
      ].sort((a, b) => a.title.localeCompare(b.title)),
      lists: [...(richTextBasicSchema.of[0] as any).lists],
      marks: {
        decorators: [...(richTextBasicSchema.of[0] as any).marks.decorators],
        annotations: [...(richTextBasicSchema.of[0] as any).marks.annotations],
      },
    },
    { type: "image.simple" },
    { type: "video" },
    {
      name: "buttons",
      title: "Buttons",
      type: "object",
      groups: [
        {
          name: "theme",
          title: "Theme",
        },
      ],
      preview: {
        select: {
          items: "items",
        },
        prepare({ items }: any) {
          return {
            title: "Button group",
            subtitle:
              items?.map(({ label }: { label: string }) => label).join(", ") ||
              "",
            media: <Chain weight="thin" />,
          };
        },
      },
      fields: [
        { type: "buttongroup", name: "items" },
        {
          name: "direction",
          title: "Direction",
          type: "string",
          group: "theme",
          initialValue: "horizontal",
          options: {
            layout: "radio",
            direction: "horizontal",
            list: optionsToList(DIRECTION_OPTIONS),
          },
        },
      ],
    },
    {
      type: "object",
      name: "csv",
      title: "CSV",
      icon: () => <Tables weight="thin" />,
      preview: {
        select: {
          file: "file.asset.url",
          filename: "file.asset.originalFilename",
        },
        prepare({ file, filename }: any) {
          return {
            title: filename,
            subtitle: file,
          };
        },
      },
      fields: [
        {
          name: "file",
          title: "CSV file",
          type: "file",
          options: { accept: "text/csv" },
        },
      ],
    },
    SCRIPT_REFERENCE_FIELD,
  ],
});
