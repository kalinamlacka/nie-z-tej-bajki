import {defineField, defineType} from 'sanity'

export const customImage = defineType({
  name: 'customImage',
  title: 'Obraz',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Tekst alternatywny',
      type: 'string',
      description: 'Opis obrazu dla osób niewidomych i wyszukiwarek (wymagany dla dostępności)',
      validation: (rule) => rule.required().error('Tekst alternatywny jest wymagany dla dostępności'),
    }),
  ],
})
