import {
  DocumentsIcon,
  HomeIcon,
  EarthGlobeIcon,
  FolderIcon,
  CogIcon,
  UsersIcon,
  DocumentTextIcon,
  BlockquoteIcon,
  ImagesIcon,
  ComponentIcon,
} from '@sanity/icons'
import {pages} from './schemaTypes/pages'
import {globals} from './schemaTypes/globals'
import {documents} from './schemaTypes/documents'

export const deskStructrure = (S: any, context: any) => {
  const pageIcons: Record<string, any> = {
    examplePage: HomeIcon,
    structureSchoolPage: ComponentIcon,
    structureInstitutionPage: ComponentIcon,
  }

  const documentIcons: Record<string, any> = {
    partnerDocument: UsersIcon,
    postDocument: DocumentTextIcon,
    galleryFolder: ImagesIcon,
    quoteDocument: BlockquoteIcon,
  }

  const globalsIcons: Record<string, any> = {
    siteSettings: CogIcon,
  }

  return S.list()
    .title('Nie z tej bajki CMS')
    .items([
      // Pages Section
      S.listItem()
        .title('Strony')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Strony')
            .items([
              ...pages.map((page) => {
                return S.listItem()
                  .title(page.title)
                  .icon(pageIcons[page.name] || DocumentsIcon)
                  .child(S.editor().schemaType(page.name).documentId(page.name))
              }),
            ]),
        ),

      S.divider(),

      // Globals Section
      S.listItem()
        .title('Globalne')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Globalne')
            .items([
              ...globals.map((global) => {
                return S.listItem()
                  .title(global.title)
                  .icon(globalsIcons[global.name] || DocumentsIcon)
                  .child(S.editor().schemaType(global.name).documentId(global.name))
              }),
            ]),
        ),

      S.divider(),

      // Documents Section
      S.listItem()
        .title('Dokumenty')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Dokumenty')
            .items([
              ...documents.map((document) => {
                const documentList = S.documentTypeList(document.name).title(document.title)

                // Domyślne sortowanie po dacie dla postów i klubów
                if (document.name === 'post' || document.name === 'club') {
                  return S.listItem()
                    .title(document.title)
                    .icon(documentIcons[document.name] || DocumentsIcon)
                    .child(documentList.defaultOrdering([{field: 'date', direction: 'desc'}]))
                }

                return S.listItem()
                  .title(document.title)
                  .icon(documentIcons[document.name] || DocumentsIcon)
                  .child(documentList)
              }),
            ]),
        ),

      S.divider(),

      // Other document types (if any)
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          ![
            'media.tag',
            ...pages.map((page) => page.name),
            ...globals.map((global) => global.name),
            ...documents.map((document) => document.name),
          ].includes(listItem.getId()),
      ),
    ])
}
