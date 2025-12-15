import {defineField, defineType} from 'sanity'

export const customFile = defineType({
  name: 'customFile',
  title: 'Plik',
  type: 'file',
  fields: [
    defineField({
      name: 'fileName',
      title: 'Nazwa Pliku',
      type: 'string',
      description: 'Nazwa opisowa pliku (np. "Regulamin szkoły 2024")',
      validation: (rule) => rule.required().error('Nazwa pliku jest wymagana'),
    }),
  ],
})
