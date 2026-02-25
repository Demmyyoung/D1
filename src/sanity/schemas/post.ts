// Schema: Post — wall posts that appear on the model's profile
import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Wall Post",
  type: "document",
  fields: [
    defineField({
      name: "model",
      title: "Model",
      type: "reference",
      to: [{ type: "model" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "Standard" },
          { title: "Polaroid", value: "Polaroid" },
        ],
        layout: "radio",
      },
      initialValue: "Standard",
    }),
    defineField({
      name: "album",
      title: "Album",
      type: "string",
      description: 'e.g. "Studio", "Campaigns", "Portraits"',
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "timestampDesc",
      by: [{ field: "timestamp", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "album",
      media: "image",
      modelName: "model.name",
    },
    prepare({ title, subtitle, media, modelName }) {
      return {
        title: title || "Untitled post",
        subtitle: `${modelName || "Unknown"} — ${subtitle || "No album"}`,
        media,
      };
    },
  },
});
