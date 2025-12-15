import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {seo} from '../objects/common/components/seo'
import {partnerDocument} from './partnerDocument'
import {customImage} from '../objects/common/components/customImage'

export const postDocument = defineType({
  name: 'post',
  title: 'Aktualności',
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
      name: 'partner',
      title: 'Partner',
      type: 'reference',
      to: [{type: partnerDocument.name}],
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Tytuł Posta',
      type: 'string',
      description: 'Tytuł posta',
      validation: (rule) => rule.required().error('Tytuł posta jest wymagany'),
      group: 'content',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Krótki Opis Posta',
      type: 'string',
      description: 'Krótki opis posta wyświetlany na liście',
      validation: (rule) => rule.required().error('Krótki opis jest wymagany'),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Zawartość Posta',
      type: 'array',
      description: 'Pełna treść posta z formatowaniem',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normalny', value: 'normal'},
            {title: 'Nagłówek 1', value: 'h1'},
            {title: 'Nagłówek 2', value: 'h2'},
            {title: 'Nagłówek 3', value: 'h3'},
            {title: 'Nagłówek 4', value: 'h4'},
            {title: 'Cytat', value: 'blockquote'},
          ],
          lists: [
            {title: 'Wypunktowanie', value: 'bullet'},
            {title: 'Numerowanie', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Pogrubienie', value: 'strong'},
              {title: 'Kursywa', value: 'em'},
              {title: 'Kod', value: 'code'},
              {title: 'Podkreślenie', value: 'underline'},
              {title: 'Przekreślenie', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link Zewnętrzny',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Adres URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Otwórz w nowej karcie',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: customImage.name,
        },
      ],
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'Unikalny Identyfikator',
      type: 'slug',
      description:
        'Wersja nazwy przyjazna dla adresu URL. Kliknij „Generuj", aby automatycznie utworzyć nazwę na podstawie tytułu.',
      options: {
        source: 'title',
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
            return 'Wymagany jest unikalny identyfikator. Kliknij „Generuj", aby utworzyć go na podstawie tytułu.'
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
      description: 'Ustawienia optymalizacji wyszukiwarek dla tego posta',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'title',
      slug: 'slug.current',
      media: 'partnerImage',
    },
    prepare({name, media}) {
      return {
        title: name || 'Post Bez Tytułu',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Nazwa A-Z',
      name: 'nameAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Nazwa Z-A',
      name: 'nameDesc',
      by: [{field: 'title', direction: 'desc'}],
    },
    {
      title: 'Utworzone (Najnowsze)',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
