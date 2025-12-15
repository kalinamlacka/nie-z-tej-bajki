import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructrure} from './deskStructure'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'nie-z-tej-bajki',

  projectId: 'cloyxz6v',
  dataset: 'production',

  plugins: [structureTool({structure: deskStructrure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
