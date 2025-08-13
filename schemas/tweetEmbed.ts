import { FaTwitter } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "tweetEmbed",
  title: "Tweet Embed",
  type: "object",
  icon: FaTwitter,
  fields: [
    defineField({
      name: "tweetUrl",
      title: "Tweet URL",
      type: "url",
      description:
        "Copy and paste the full URL of the tweet you want to display.",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
  preview: {
    select: {
      url: "tweetUrl",
    },
    prepare({ url }) {
      return {
        title: "Tweet Embed",
        subtitle: url || "No URL entered",
      };
    },
  },
});
