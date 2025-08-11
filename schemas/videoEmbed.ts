import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoEmbed",
  title: "Video Embed",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Teks singkat yang akan muncul di bawah video.",
    }),
  ],
  preview: {
    select: {
      title: "caption",
    },
    prepare({ title }) {
      return {
        title: title || "Video Embed",
        subtitle: "Komponen video interaktif",
      };
    },
  },
});
