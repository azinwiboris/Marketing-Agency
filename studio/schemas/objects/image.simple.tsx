import { ImageType } from "../../types";
import { SanityFieldType, SanitySchemaType } from "../../types.sanity";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: "source" | keyof ImageType;
  } & SanityFieldType)[];
};

const ImagePreview = ({ value }) => {
  if (!value?.media?.asset?.url)
    return (
      <div
        style={{
          aspectRatio: "4/3",
          width: "100%",
          border: "1px solid rgba(0,0,0,.1)",
          backgroundColor: "rgba(0,0,0,.05)",
        }}
      />
    );
  return (
    <img
      src={`${value?.media?.asset?.url}?w=550`}
      style={{ maxWidth: "100%" }}
    />
  );
};

const schema: SchemaType = {
  name: "image.simple",
  title: "Image",
  type: "object",
  preview: {
    select: {
      alt: "alt",
      caption: "caption",
      media: "source",
      src: "source.asset.url",
    },
    component: ImagePreview,
    prepare({ alt = "", caption = "", type = "", media }) {
      return {
        title: `${alt} ${caption}`,
        subtitle: type,
        media,
      };
    },
  },
  fieldsets: [
    {
      name: "imageOptions",
      title: "Image options",
      options: { collapsed: true, collapsable: true },
    },
  ],
  fields: [
    {
      name: "source",
      title: "Source",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description:
        "The alternative text is used to describe the image for screen readers.",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Optional caption to display with the image. Only shown on the website when layout allows for it.",
    },
    {
      name: "preventResize",
      title: "Prevent resize",
      type: "boolean",
      description:
        "If enabled, the image will maintain its aspect ratio when scaled.",
    },
  ],
};

export default schema;
