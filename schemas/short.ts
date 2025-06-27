import { defineField, defineType } from "sanity";

export default defineType({
  name: "short",
  title: "Short",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "viewCount",
      title: "View Count",
      type: "number",
      description:
        "How many times this short has been viewed. Updated automatically.",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "likeCount",
      title: "Like Count",
      type: "number",
      description:
        "How many times this short has been liked. Updated automatically.",
      initialValue: 0,
      readOnly: true,
    }),
  ],
});
