import { baseLanguage, languages } from "../../../languages";
import {
  DialogSchemaName,
  DIALOG_SCHEMAS,
  HeroSchemaName,
  HERO_SCHEMAS,
  ModuleSchemaName,
  MODULE_SCHEMAS,
} from "../../../types.sanity";
import {
  PageBuilder,
  PageBuilderItem,
  PageBuilderItemPreview,
} from "../../components/PageBuilder";
import PagePasswordComponent, {
  PagePasswordWrapper,
} from "../../components/PagePasswordComponent";
import { getISODateString } from "../../utils/datetime";
import { isPathUnique } from "../../utils/desk/isPathUnique";
import { SEO_FIELD } from "./config.seo";
import { nanoid } from "nanoid";
import { title } from "process";
import {
  ArrayRule,
  DateRule,
  defineField,
  PreviewConfig,
  SlugRule,
  SortOrdering,
  StringRule,
} from "sanity";

export const TITLE_FIELD = defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (Rule: StringRule) => Rule.required(),
  options: { localize: true } as any,
});

export const SLUG_FIELD = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  description:
    "The unique identifying part of a web address at the end of the URL. Only lowercase and no special characters except -.",
  options: {
    source: title,
    maxLength: 96,
    localize: true,
    isUnique: isPathUnique,
  } as any,
  validation: (Rule: SlugRule) =>
    Rule.required().custom(async (slug, context) => {
      if (typeof slug === "undefined") return true;
      const regex = /(^[a-z0-9-]+$)/;
      if (regex.test(slug.current || "")) {
        return true;
      } else {
        return "Invalid slug: Only numbers, lowercase letters, and dashes are permitted.";
      }
    }),
});

export const PUBLISHED_AT_FIELD = defineField({
  name: "publishedAt",
  initialValue: getISODateString(),
  title: "Date",
  type: "date",
  validation: (Rule: DateRule) => Rule.required(),
});

export const HERO_FIELD = defineField({
  name: "hero",
  title: "Hero",
  type: "array",
  components: {
    input: PageBuilder,
  },
  validation: (Rule: ArrayRule<any>) => Rule.max(languages.length).warning(),
  description: "The hero section of the page.",
  of: (Object.keys(HERO_SCHEMAS) as HeroSchemaName[]).map(
    (type: HeroSchemaName) => ({
      type,
      components: {
        preview: PageBuilderItemPreview,
        item: PageBuilderItem,
      },
    }),
  ),
  options: {
    filterType: /hero\./,
    updateField: "hero",
    placeholder: "Add a hero…",
  } as any,
});

export const MODULES_FIELD = defineField({
  name: "modules",
  title: "Modules",
  type: "array",
  components: {
    input: PageBuilder,
  },
  description: "Modules are the building blocks of a page.",
  of: [
    ...(Object.keys(MODULE_SCHEMAS) as ModuleSchemaName[]).map(
      (type: ModuleSchemaName) => ({
        type,
        components: {
          preview: PageBuilderItemPreview,
          item: PageBuilderItem,
        },
      }),
    ),
    { type: "studio.divider" },
  ],
  options: {
    filterType: /module|studio\./,
    updateField: "modules",
    placeholder: "Add a module…",
  } as any,
});

export const DIALOGS_FIELD = defineField({
  name: "dialogs",
  title: "Dialogs",
  type: "array",
  components: {
    input: PageBuilder,
  },
  description:
    "Dialogs are the modal windows, used to present extra information. A dialog must be created before it can be linked to from a button inside module.",
  of: (Object.keys(DIALOG_SCHEMAS) as DialogSchemaName[]).map(
    (type: DialogSchemaName) => ({
      type,
      components: {
        preview: PageBuilderItemPreview,
        item: PageBuilderItem,
      },
    }),
  ),
  options: {
    filterType: /dialog.*/,
    updateField: "dialogs",
    placeholder: "Add a dialog…",
  } as any,
});

export const ORDER_PUBLISHED_DESC: SortOrdering = {
  title: "Created ↑",
  name: "publishedAtDesc",
  by: [{ field: "publishedAt", direction: "desc" }],
};

export const EMPTY_RICHTEXT_MODULE = {
  _type: "module.richtext",
  _key: nanoid(),
  background: "white",
  content: [
    {
      _type: "block",
      _key: nanoid(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: nanoid(),
          text: "",
          marks: [],
        },
      ],
    },
  ],
};

export const PASSWORD = defineField({
  name: "locked",
  title: "Locked",
  type: "object",
  components: {
    input: PagePasswordComponent,
    field: PagePasswordWrapper,
  },
  fields: [
    ...languages.map(({ id, title }) => ({
      name: id,
      type: "boolean",
      title,
    })),
  ],
});

export const PARENT_FIELD = defineField({
  name: "parent",
  title: "Parent",
  type: "reference",
  to: [{ type: "page.content" }],
  options: {
    filter: ({ document }) => {
      if (!document._id) return {};

      return {
        filter: `
          _id != $id
        `,
        params: {
          id: document._id,
        },
      };
    },
  },
});

export const TAGS_FIELD = defineField({
  name: "tags",
  title: "Tags",
  type: "array",
  of: [{ type: "reference", to: [{ type: "page.tag" }] }],
});

export const AUTHOR_FIELD = defineField({
  name: "authors",
  title: "Authors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "person" }] }],
});

export const HIDE_NAV_FIELD = defineField({
  name: "hideNav",
  title: "Hide navigation",
  type: "boolean",
  description: "Option to hide the navigation",
  initialValue: false,
});

export const HIDE_FOOTER_FIELD = defineField({
  name: "hideFooter",
  title: "Hide footer",
  type: "boolean",
  description: "Option to hide the footer",
  initialValue: false,
});

export const pageBase = {
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
      options: {
        collapsible: true,
        collapse: true,
      },
    },
  ],
  fields: [
    PASSWORD,
    TITLE_FIELD,
    SLUG_FIELD,
    HERO_FIELD,
    MODULES_FIELD,
    DIALOGS_FIELD,
    SEO_FIELD,
    HIDE_NAV_FIELD,
    HIDE_FOOTER_FIELD,
  ],
};

export const SLUG_PREVIEW_SELECT_FIELDS = {
  slug: `slug.${baseLanguage}.current`,
  level1Slug: `parent.slug.${baseLanguage}.current`,
  level2Slug: `parent.parent.slug.${baseLanguage}.current`,
  level3Slug: `parent.parent.parent.slug.${baseLanguage}.current`,
  level4Slug: `parent.parent.parent.parent.slug.${baseLanguage}.current`,
  level5Slug: `parent.parent.parent.parent.parent.slug.${baseLanguage}.current`,
};

export const getPreviewSlugPagePath = (paths: string[]) => {
  return `/${["", ...Object.values(paths).filter(Boolean).reverse()]
    .filter(Boolean)
    .join("/")}`;
};

export const DEFAULT_CONTENT_PAGE_PREVIEW: PreviewConfig = {
  select: {
    title: `title.${baseLanguage}`,
    media: "hero.0.image",
    ...SLUG_PREVIEW_SELECT_FIELDS,
  },
  prepare({ title, media, ...paths }: any) {
    return {
      title: `${title}`,
      subtitle: getPreviewSlugPagePath(paths),
      media,
    };
  },
};

export const DEFAULT_CONTENT_PAGE_ORDERINGS: SortOrdering[] = [
  {
    title: "Title",
    name: "Title",
    by: [{ field: `title.${baseLanguage}`, direction: "asc" }],
  },
  {
    title: "Slug",
    name: "Slug",
    by: [{ field: `slug.${baseLanguage}.current`, direction: "asc" }],
  },
  {
    title: "Path",
    name: "Path",
    by: [
      {
        field: `parent.parent.parent.parent.parent.slug.${baseLanguage}.current`,
        direction: "desc",
      },
      {
        field: `parent.parent.parent.parent.slug.${baseLanguage}.current`,
        direction: "desc",
      },
      {
        field: `parent.parent.parent.slug.${baseLanguage}.current`,
        direction: "desc",
      },
      {
        field: `parent.parent.slug.${baseLanguage}.current`,
        direction: "desc",
      },
      { field: `parent.slug.${baseLanguage}.current`, direction: "desc" },
      { field: `slug.${baseLanguage}.current`, direction: "desc" },
    ],
  },
];