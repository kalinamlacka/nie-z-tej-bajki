import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {seo} from '../objects/common/components/seo'
import {partnerDocument} from './partnerDocument'
import {customImage} from '../objects/common/components/customImage'
import {imageGrid} from '../objects/common/components/imageGrid'
import {videoEmbed} from '../objects/common/components/videoEmbed'

export const clubDocument = defineType({
  name: 'club',
  title: 'Kluby',
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
      description: 'Powiązany partner - jego logo będzie wyświetlane jako zdjęcie klubu',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie klubu',
      type: customImage.name,
      description: 'Zdjęcie wyświetlane gdy klub nie ma powiązanego partnera',
      hidden: ({document}) => !!document?.partner,
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Nazwa klubu',
      type: 'string',
      description: 'Nazwa klubu',
      validation: (rule) => rule.required().error('Nazwa klubu jest wymagana'),
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: 'Data publikacji',
      type: 'datetime',
      description: 'Data publikacji klubu',
      validation: (rule) => rule.required().error('Data publikacji jest wymagana'),
      group: 'content',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Krótki Opis Klubu',
      type: 'string',
      description: 'Krótki opis klubu wyświetlanego na liście',
      validation: (rule) => rule.required().error('Krótki opis jest wymagany'),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Zawartość Klubu',
      type: 'array',
      description: 'Pełna treść klubu z formatowaniem',
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
        {
          type: imageGrid.name,
        },
        {
          type: videoEmbed.name,
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
      partnerImage: 'partner.image',
      clubImage: 'image',
    },
    prepare({name, partnerImage, clubImage}) {
      return {
        title: name || 'Klub Bez Nazwy',
        media: partnerImage || clubImage,
      }
    },
  },
  orderings: [
    {
      title: 'Data publikacji (Najnowsze)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Data publikacji (Najstarsze)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
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
  ],
})
