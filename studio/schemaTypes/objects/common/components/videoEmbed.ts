import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Film (YouTube/Vimeo)',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'Link do filmu',
      type: 'url',
      description: 'Wklej link do filmu z YouTube lub Vimeo',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https']}).custom((url) => {
          if (!url) return true
          const isYouTube =
            url.includes('youtube.com') || url.includes('youtu.be')
          const isVimeo = url.includes('vimeo.com')
          if (!isYouTube && !isVimeo) {
            return 'Link musi być z YouTube lub Vimeo'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Podpis (opcjonalny)',
      type: 'string',
      description: 'Opcjonalny podpis wyświetlany pod filmem',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({url, caption}) {
      let platform = 'Film'
      if (url) {
        if (url.includes('youtube') || url.includes('youtu.be')) {
          platform = 'YouTube'
        } else if (url.includes('vimeo')) {
          platform = 'Vimeo'
        }
      }
      return {
        title: caption || platform,
        subtitle: url ? `${platform}: ${url.substring(0, 50)}...` : 'Brak linku',
      }
    },
  },
})
