import { defineArrayMember, defineType } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineArrayMember({
      type: "code",
      title: "Code Block",
      options: {
        withFilename: true,
        language: "javascript",
      },
    }),
    defineArrayMember({
      name: "table",
      title: "Table",
      type: "table",
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [
            {
              type: "block",
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                  { title: "Code", value: "code" },
                ],
                annotations: [
                  {
                    title: "URL",
                    name: "link",
                    type: "object",
                    fields: [
                      {
                        title: "URL",
                        name: "href",
                        type: "url",
                        validation: (Rule) =>
                          Rule.uri({
                            scheme: ["http", "https", "mailto", "tel"],
                            allowRelative: true,
                          }),
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          name: "category",
          title: "Category",
          type: "string",
          options: {
            list: [
              { title: "Success", value: "success" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
              { title: "Note", value: "note" },
            ],
            layout: "radio",
          },
          initialValue: "note",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
