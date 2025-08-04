import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page Content",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About Page Data",
      readOnly: true,
    }),
    defineField({
      name: "currentActivities",
      title: "What I'm Up To Now",
      type: "array",
      description: "Lists current activities or focus areas.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Activity Title",
              type: "string",
              description:
                'Part which is being talked about(e.g., "Exploring Advanced AI:")',
            },
            {
              name: "description",
              title: "Activity Description",
              type: "text",
              rows: 2,
              description:
                "Describes the current activity or focus area in detail.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "timelineEvents",
      title: "Timeline Journey",
      type: "array",
      description: "Lists the journey or learning from time to time.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "year",
              title: "Year / Title",
              type: "string",
              description: 'Year or title of event (e.g., "2020")',
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description:
                "Describes the event or learning experience in detail.",
            },
          ],
        },
      ],
    }),
  ],
});
