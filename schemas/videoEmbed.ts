import { PlayIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "videoEmbed",
  title: "Video Embed",
  icon: PlayIcon,
  type: "document",
  fields: [
    { title: "Title", name: "title", type: "string" },
    {
      title: "Video file",
      name: "video",
      type: "mux.video",
    },
  ],
});
