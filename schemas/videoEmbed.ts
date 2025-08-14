import { PlayIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "videoEmbed",
  title: "Video Embed",
  type: "object",
  icon: PlayIcon,
  fields: [
    {
      name: "video",
      type: "array",
      of: [
        {
          type: "object",
          name: "videoBlock",
          fields: [
            {
              name: "video",
              type: "mux.video",
              title: "Video Asset",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "autoplay",
              title: "Autoplay",
              type: "boolean",
              description: "Enable autoplay for the video.",
              initialValue: false,
            },
            {
              name: "loop",
              title: "Loop",
              type: "boolean",
              description: "Enable looping for the video.",
              initialValue: false,
            },
          ],
        },
      ],
    },
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
