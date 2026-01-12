import { defineField, defineType } from "sanity";
import { customImage } from "../../common/components/customImage";
import { personnelName } from "./personnelName";

export const personnel = defineType({
  name: 'personnel',
  title: 'Kadra',
  type: 'object',
  fields: [
    defineField({
        name: "firstImage",
        title: "Pierwsze zdjęcie",
        type: customImage.name,
        description: "Pierwsze zdjęcie prezentujące członka kadry",
        validation: (rule) => rule.required().error('Pierwsze zdjęcie jest wymagane'),
    }),
    defineField({
        name: "secondImage",
        title: "Drugie zdjęcie",
        type: customImage.name,
        description: "Drugie zdjęcie prezentujące członka kadry",
        validation: (rule) => rule.required().error('Drugie zdjęcie jest wymagane'),
    }),
    defineField({
        name: "names",
        title: "Imiona i nazwiska",
        type: "array",
        description: "Lista imion i nazwisk członków kadry",
        of: [
            {
                type: personnelName.name
            }
        ],
        validation: (rule) => rule.min(1).error('Dodaj co najmniej jedno imię')
    })
  ],
  preview: {
    select: {
      names: 'names',
      media: 'firstImage'
    },
    prepare({ names, media }) {
      const firstPerson = names?.[0]?.name || 'Brak imienia';
      const count = names?.length || 0;
      const subtitle = count > 1
        ? `${count} osoby`
        : names?.[0]?.description || '';

      return {
        title: firstPerson,
        subtitle: subtitle,
        media: media
      };
    }
  }
})
