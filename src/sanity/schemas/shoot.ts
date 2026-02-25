// Schema: Shoot — gated galleries accessible via client access code
import { defineType, defineField } from "sanity";

export default defineType({
  name: "shoot",
  title: "Private Shoot",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "gallery", title: "Gallery" },
    { name: "security", title: "Security" },
  ],
  fields: [
    defineField({
      name: "model",
      title: "Model",
      type: "reference",
      to: [{ type: "model" }],
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      group: "details",
      description: 'e.g. "Nike Campaign"',
    }),
    defineField({
      name: "accessCode",
      title: "Access Code",
      type: "string",
      group: "security",
      description: "The password given to the brand to access this shoot",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "gallery",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "exclusiveNote",
      title: "Exclusive Note",
      type: "text",
      group: "security",
      rows: 3,
      description: "Private message visible only to the brand after login",
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "model.name",
      media: "gallery.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled shoot",
        subtitle: subtitle || "Unknown model",
        media,
      };
    },
  },
});
