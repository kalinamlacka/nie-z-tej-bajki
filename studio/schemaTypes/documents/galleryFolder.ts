import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'
import {customImage} from '../objects/common/components/customImage'
import {seo} from '../objects/common/components/seo'

export const galleryFolderDocument = defineType({
  name: 'galleryFolder',
  title: 'Galeria - Foldery',
  type: 'document',
  icon: FolderIcon,
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
      title: 'Nazwa Folderu',
      type: 'string',
      description: 'Nazwa folderu galerii',
      validation: (rule) => rule.required().error('Nazwa folderu jest wymagana'),
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Okładka Folderu',
      type: customImage.name,
      description: 'Zdjęcie wyświetlane jako miniatura folderu',
      validation: (rule) => rule.required().error('Okładka folderu jest wymagana'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Unikalny Identyfikator',
      type: 'slug',
      description:
        'Wersja nazwy przyjazna dla adresu URL. Kliknij „Generuj", aby automatycznie utworzyć nazwę na podstawie nazwy folderu.',
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
      name: 'images',
      type: 'array',
      title: 'Zdjęcia',
      description: 'Galeria zdjęć w tym folderze',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Obraz',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Tekst alternatywny',
              description: 'Opis obrazu dla dostępności',
            },
          ],
        },
      ],
      group: 'content',
      options: {
        layout: 'grid',
      },
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: seo.name,
      description: 'Ustawienia SEO dla tego folderu galerii',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      media: 'coverImage',
      images: 'images',
    },
    prepare({name, media, images}) {
      const imageCount = images?.length || 0
      return {
        title: name || 'Folder Bez Nazwy',
        subtitle: `${imageCount} ${imageCount === 1 ? 'zdjęcie' : imageCount < 5 ? 'zdjęcia' : 'zdjęć'}`,
        media: media,
      }
    },
  },
})
