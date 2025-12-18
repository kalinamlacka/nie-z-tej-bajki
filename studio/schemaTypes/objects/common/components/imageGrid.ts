import {defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

export const imageGrid = defineType({
  name: 'imageGrid',
  title: 'Grid zdjęć',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      type: 'array',
      of: [{type: 'customImage'}],
      validation: (rule) => rule.required().min(2).error('Dodaj minimum 2 zdjęcia'),
    }),
    defineField({
      name: 'layout',
      title: 'Układ',
      type: 'string',
      options: {
        list: [
          {title: '2 kolumny', value: '2-columns'},
          {title: '3 kolumny', value: '3-columns'},
          {title: '4 kolumny', value: '4-columns'},
          {title: 'Masonry (automatyczny)', value: 'masonry'},
        ],
        layout: 'radio',
      },
      initialValue: '2-columns',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gap',
      title: 'Odstępy między zdjęciami',
      type: 'string',
      options: {
        list: [
          {title: 'Małe', value: 'small'},
          {title: 'Średnie', value: 'medium'},
          {title: 'Duże', value: 'large'},
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      layout: 'layout',
    },
    prepare({images, layout}) {
      const layoutLabels: Record<string, string> = {
        '2-columns': '2 kolumny',
        '3-columns': '3 kolumny',
        '4-columns': '4 kolumny',
        'masonry': 'Masonry',
      }
      const imageCount = images?.length || 0
      return {
        title: `Grid zdjęć (${imageCount})`,
        subtitle: layoutLabels[layout] || layout,
      }
    },
  },
})
