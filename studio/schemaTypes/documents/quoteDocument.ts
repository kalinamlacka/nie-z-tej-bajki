import {defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'

export const quoteDocument = defineType({
  name: 'quote',
  title: 'Cytaty',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Treść cytatu',
      type: 'text',
      description: 'Treść cytatu (max 280 znaków dla optymalnej czytelności)',
      validation: (rule) =>
        rule
          .required()
          .max(280)
          .warning('Cytaty powyżej 280 znaków mogą być trudne do odczytania'),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      description: 'Imię i nazwisko autora cytatu',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      author: 'author',
    },
    prepare({text, author}) {
      return {
        title: `${text.substring(0, 60)}${text.length > 60 ? '...' : ''}`,
        subtitle: `— ${author}`,
        media: BlockquoteIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Autor A-Z',
      name: 'authorAsc',
      by: [{field: 'author', direction: 'asc'}],
    },
    {
      title: 'Autor Z-A',
      name: 'authorDesc',
      by: [{field: 'author', direction: 'desc'}],
    },
    {
      title: 'Utworzono (najnowsze)',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'Utworzono (najstarsze)',
      name: 'createdAsc',
      by: [{field: '_createdAt', direction: 'asc'}],
    },
  ],
})
