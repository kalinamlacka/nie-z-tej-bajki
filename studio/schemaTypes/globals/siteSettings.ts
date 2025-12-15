import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia Strony',
  type: 'document',
  groups: [
    {name: 'podstawowe', title: 'Podstawowe', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'organizacja', title: 'Organizacja'},
    {name: 'media', title: 'Media Społecznościowe'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tytuł Strony',
      description: 'Główny tytuł Twojej strony internetowej',
      group: 'podstawowe',
      validation: (rule) => rule.required().error('Tytuł strony jest wymagany'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Opis Strony',
      description: 'Domyślny opis strony używany w SEO i mediach społecznościowych',
      group: 'podstawowe',
      validation: (rule) => rule.required().error('Opis strony jest wymagany'),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Adres URL Strony',
      type: 'url',
      description: 'Główny adres URL Twojej strony (np. https://www.nieztezbajki.pl)',
      group: 'podstawowe',
      validation: (rule) => rule.required().error('Adres URL strony jest wymagany'),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'customImage',
      description: 'Ikona strony wyświetlana w zakładkach przeglądarki (zalecane 32x32px)',
      group: 'podstawowe',
    }),
    defineField({
      name: 'keywords',
      title: 'Domyślne Słowa Kluczowe',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Domyślne słowa kluczowe SEO dla całej strony',
      group: 'seo',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Domyślny Obraz Open Graph',
      type: 'customImage',
      description: 'Domyślny obraz dla mediów społecznościowych (zalecane 1200x630px)',
      group: 'seo',
    }),
    defineField({
      name: 'organization',
      title: 'Dane Organizacji',
      type: 'object',
      group: 'organizacja',
      fields: [
        defineField({
          name: 'name',
          title: 'Nazwa Organizacji',
          type: 'string',
          validation: (rule) => rule.required().error('Nazwa organizacji jest wymagana'),
        }),
        defineField({
          name: 'logo',
          title: 'Logo Organizacji',
          type: 'customImage',
          description: 'Logo organizacji używane w stopce i informacjach o firmie',
        }),
        defineField({
          name: 'address',
          title: 'Adres',
          type: 'text',
          description: 'Pełny adres organizacji',
        }),
        defineField({
          name: 'phone',
          title: 'Numer Telefonu',
          type: 'string',
          description: 'Główny numer kontaktowy',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Główny adres email kontaktowy',
          validation: (rule) =>
            rule
              .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                name: 'email',
                invert: false,
              })
              .warning('Wprowadź poprawny adres email'),
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Media Społecznościowe',
      type: 'object',
      group: 'media',
      description: 'Linki do profili w mediach społecznościowych',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Link do profilu na Facebooku',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Link do profilu na Instagramie',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'Link do profilu na LinkedIn',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'Link do profilu na Twitter/X',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}) {
      return {
        title: title || 'Ustawienia Strony',
        subtitle: description || 'Skonfiguruj globalne ustawienia strony',
      }
    },
  },
})
