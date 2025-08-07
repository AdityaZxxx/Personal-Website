
import { defineField, defineType } from "sanity";

export default defineType({
  name: "guestbookEntry",
  title: "Guestbook Entry",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "authorImage",
      title: "Author Image",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "authorEmail",
      title: "Author Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "message",
    },
  },
});
