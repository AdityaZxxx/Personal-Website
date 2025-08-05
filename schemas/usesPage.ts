import { RobotIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "usesPage",
  title: "Uses Page Content",
  type: "document",
  icon: RobotIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About Page Data",
      readOnly: true,
    }),
    defineField({
      name: "uses",
      title: "Uses",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item",
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Laptop", value: "laptop" },
                  { title: "Accessories", value: "accessories" },
                  { title: "Hardware", value: "hardware" },
                  { title: "Coding", value: "coding" },
                  { title: "Software", value: "software" },
                ],
              },
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
            }),
          ],
        }),
      ],
    }),
  ],
});
