import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {customImage} from '../objects/common/components/customImage'
import {seo} from '../objects/common/components/seo'

export const partnerDocument = defineType({
  name: 'partner',
  title: 'Partnerzy',
  type: 'document',
  icon: TagIcon,
  groups: [
    {
      name: 'content',
      title: 'Zawartość',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'string',
      description: 'Nazwa partnera',
      validation: (rule) => rule.required().error('Nazwa partnera jest wymagana'),
      group: 'content',
    }),
    defineField({
      name: 'partnerImage',
      title: 'Zdjęcie Partnera',
      type: customImage.name,
      description: 'Logo lub zdjęcie reprezentujące partnera',
      validation: (rule) => rule.required().error('Zdjęcie partnera jest wymagane'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Unikalny Identyfikator',
      type: 'slug',
      description:
        'Wersja nazwy przyjazna dla adresu URL. Kliknij „Generuj", aby automatycznie utworzyć nazwę na podstawie nazwy partnera.',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) {
            return 'Wymagany jest unikalny identyfikator. Kliknij „Generuj", aby utworzyć go na podstawie nazwy.'
          }
          if (slug.current.length < 3) {
            return 'Unikalny identyfikator musi mieć co najmniej 3 znaki.'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: seo.name,
      description: 'Ustawienia optymalizacji wyszukiwarek dla tego partnera',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      slug: 'slug.current',
      media: 'partnerImage',
    },
    prepare({name, media}) {
      return {
        title: name || 'Partner Bez Nazwy',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Nazwa A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Nazwa Z-A',
      name: 'nameDesc',
      by: [{field: 'name', direction: 'desc'}],
    },
    {
      title: 'Utworzone (Najnowsze)',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
