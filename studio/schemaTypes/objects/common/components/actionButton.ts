import {defineField, defineType} from 'sanity'

export const actionButton = defineType({
  name: 'actionButton',
  title: 'Przycisk Akcji',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Tekst przycisku',
      type: 'string',
      description: 'Tekst wyświetlany na przycisku',
      validation: (rule) => rule.required().error('Tekst przycisku jest wymagany'),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Adres URL lub ścieżka docelowa (np. /kontakt lub https://example.com)',
      validation: (rule) => rule.required().error('Link jest wymagany'),
    }),
  ],
})
