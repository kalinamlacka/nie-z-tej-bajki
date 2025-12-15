import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Tytuł Meta',
      type: 'string',
      description:
        'Tytuł wyświetlany w wynikach wyszukiwania i zakładkach przeglądarki (zalecane: 50-60 znaków)',
      validation: (rule) =>
        rule
          .max(60)
          .warning('Tytuły meta dłuższe niż 60 znaków mogą być obcięte w wynikach wyszukiwania'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Opis Meta',
      type: 'text',
      rows: 3,
      description: 'Opis wyświetlany w wynikach wyszukiwania (zalecane: 120-160 znaków)',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Opisy meta dłuższe niż 160 znaków mogą być obcięte w wynikach wyszukiwania'),
    }),
    defineField({
      name: 'keywords',
      title: 'Słowa Kluczowe',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Słowa kluczowe SEO (opcjonalne, skup się na naturalnej treści)',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Obraz Open Graph',
      type: 'customImage',
      description:
        'Obraz wyświetlany przy udostępnianiu w mediach społecznościowych (zalecane: 1200x630px)',
    }),
    defineField({
      name: 'openGraphTitle',
      title: 'Tytuł Open Graph',
      type: 'string',
      description: 'Tytuł dla mediów społecznościowych (opcjonalny, domyślnie używa Tytułu Meta)',
    }),
    defineField({
      name: 'openGraphDescription',
      title: 'Opis Open Graph',
      type: 'text',
      rows: 2,
      description: 'Opis dla mediów społecznościowych (opcjonalny, domyślnie używa Opisu Meta)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Bez Indeksowania',
      type: 'boolean',
      description: 'Zapobiega indeksowaniu tej strony przez wyszukiwarki',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Kanoniczny URL',
      type: 'url',
      description: 'Kanoniczny URL dla zduplikowanej treści (opcjonalny)',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      description: 'metaDescription',
    },
    prepare({title, description}) {
      return {
        title: title || 'Brak tytułu meta',
        subtitle: description || 'Brak opisu meta',
      }
    },
  },
})
