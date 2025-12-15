import {documents} from './documents'
import {globals} from './globals'
import {objects} from './objects'
import {pages} from './pages'

export const schemaTypes = [...pages, ...objects, ...documents, ...globals]
