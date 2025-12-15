import {defineField, defineType} from 'sanity'
import {seo} from '../objects/common/components/seo'
import {customFile} from '../objects/common/components/customFile'

export const structureInstitutionPage = defineType({
  name: 'structureInstitutionPage',
  title: 'Struktura Placówka',
  type: 'document',
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
      name: 'title',
      type: 'string',
      title: 'Tytuł',
      readOnly: true,
      initialValue: 'Struktura Placówka',
      group: 'content',
    }),
    defineField({
      name: 'filesToDownload',
      title: 'Dokumenty do Pobrania',
      type: 'array',
      description: 'Pliki dostępne do pobrania (regulaminy, dokumenty, itp.)',
      of: [
        {
          type: customFile.name,
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Ustawienia SEO dla tej strony',
      group: 'seo',
    }),
  ],
})
