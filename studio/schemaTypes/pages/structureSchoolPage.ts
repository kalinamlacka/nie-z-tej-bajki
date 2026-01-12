import {defineField, defineType} from 'sanity'
import {personnel} from '../objects/structure/components/personnel'
import {customFile} from '../objects/common/components/customFile'

export const structureSchoolPage = defineType({
  name: 'structureSchoolPage',
  title: 'Szkoła',
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
      initialValue: 'Struktura Szkoła',
      group: 'content',
    }),
    defineField({
      name: 'personnelImages',
      type: 'array',
      title: 'Zdjęcia Kadry',
      description: 'Zdjęcia i dane członków kadry szkoły',
      of: [
        {
          type: personnel.name,
        },
      ],
      group: 'content',
      options: {
        layout: 'grid',
      },
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
