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
      description:
        "Short description of the video will be displayed below the video.",
    }),
    defineField({
      name: "autoplay",
      title: "Autoplay",
      type: "boolean",
      description: "Enable autoplay for the video.",
      initialValue: false,
    }),
    defineField({
      name: "loop",
      title: "Loop",
      type: "boolean",
      description: "Enable looping for the video.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "caption",
    },
    prepare({ title }) {
      return {
        title: title || "Video Embed",
      };
    },
  },
});
