# PortableText Component - Dokumentacja

Komponent do renderowania Portable Text (rich text) z Sanity CMS w projekcie Astro. Wykorzystuje `astro-portabletext` dla optymalnej wydajności i pełnej customizacji.

## 📦 Instalacja

Komponent jest już gotowy do użycia w projekcie.

## 🎯 Funkcje

- ✅ **Automatyczne renderowanie** - obsługuje wszystkie standardowe elementy Portable Text
- ✅ **Custom komponenty** - możliwość używania własnych komponentów Astro
- ✅ **Formatowanie inline** - strong, em, code, underline, strike-through
- ✅ **Nagłówki** - H1-H4 z custom stylowaniem
- ✅ **Listy** - numerowane i punktowane
- ✅ **Linki** - z obsługą target="_blank"
- ✅ **Obrazy** - integracja z SanityImage
- ✅ **Cytaty** - blockquote z custom stylowaniem
- ✅ **TypeScript** - pełna obsługa typów

## 🚀 Podstawowe użycie

```astro
---
import PortableText from '../components/shared/PortableText.astro';
import { sanityClient } from 'sanity:client';

const post = await sanityClient.fetch(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    description
  }
`, { slug: Astro.params.slug });
---

<article>
  <h1>{post.title}</h1>
  <PortableText value={post.description} />
</article>
```

## 📝 Props (Parametry)

| Prop | Typ | Domyślna wartość | Opis |
|------|-----|------------------|------|
| `value` | `PortableTextBlock[]` | **wymagany** | Tablica bloków Portable Text z Sanity |
| `class` | `string` | `''` | Dodatkowe klasy CSS |

## 💡 Przykłady użycia

### Podstawowy artykuł/post

```astro
---
import PortableText from '../components/shared/PortableText.astro';

const { post } = Astro.props;
---

<article class="max-w-4xl mx-auto">
  <h1>{post.title}</h1>
  <PortableText value={post.description} class="prose" />
</article>
```

### W komponencie karty

```astro
---
import PortableText from '../components/shared/PortableText.astro';

const { news } = Astro.props;
---

<div class="card">
  <h2>{news.title}</h2>
  <div class="card-content">
    <PortableText value={news.description} />
  </div>
</div>
```

### Z custom klasami

```astro
<PortableText
  value={content}
  class="article-content dark:text-white"
/>
```

## 🎨 Obsługiwane Elementy

### Formatowanie tekstu

- **Strong** (Bold) - `<strong>`
- **Emphasis** (Italic) - `<em>`
- **Code** - `<code>` z background
- **Underline** - `<u>`
- **Strike-through** - `<s>`

### Nagłówki

- **H1** - `text-4xl font-bold`
- **H2** - `text-3xl font-bold`
- **H3** - `text-2xl font-bold`
- **H4** - `text-xl font-bold`

### Listy

- **Bullet list** - lista punktowana z `list-disc`
- **Numbered list** - lista numerowana z `list-decimal`

### Inne elementy

- **Links** - automatyczne otwarcie w nowej karcie (jeśli `blank: true`)
- **Blockquote** - cytaty z border-left
- **Images** - używa komponentu `SanityImage`

## 🔧 Customizacja

### Dodanie własnego komponentu

W pliku [PortableText.astro](./PortableText.astro) możesz dodać własne komponenty:

```typescript
const components = {
  type: {
    customImage: SanityImage,
    // Dodaj swój custom typ
    youtube: YouTubeEmbed,
    callToAction: CallToAction,
  },
  // ...
};
```

### Zmiana stylowania

Możesz edytować style w sekcji `<style>` komponentu lub nadpisać przez `class` prop:

```astro
<PortableText
  value={content}
  class="custom-styling"
/>
```

```css
.custom-styling :global(h2) {
  color: #ff6b6b;
  font-size: 2.5rem;
}

.custom-styling :global(p) {
  line-height: 1.8;
  color: #333;
}
```

### Custom handler dla linków

W komponencie możesz zmodyfikować sposób renderowania linków:

```typescript
mark: {
  link: ({ value, children }: any) => {
    const { href, blank } = value;
    // Custom logika np. dodanie ikony dla external links
    return `<a href="${href}"
              ${blank ? 'target="_blank" rel="noopener noreferrer"' : ''}
              class="custom-link">
              ${children}
              ${blank ? ' ↗' : ''}
            </a>`;
  },
}
```

## 📚 Struktura Sanity

Komponent oczekuje standardowej struktury Portable Text z Sanity:

```typescript
// Query w Sanity
*[_type == "post"][0]{
  title,
  description[] {
    ...,
    _type == "customImage" => {
      ...,
      asset->,
      alt
    }
  }
}
```

## 🐛 Troubleshooting

### Brak treści

1. Sprawdź czy `value` nie jest `undefined` lub `null`
2. Upewnij się że query pobiera pole z treścią (np. `description`)
3. Sprawdź konsolę - komponent wyświetli błąd jeśli coś jest nie tak

### Obrazy się nie wyświetlają

1. Upewnij się że typ obrazu w Sanity to `customImage`
2. Sprawdź czy komponent `SanityImage` działa poprawnie
3. Zweryfikuj że query pobiera `asset->` dla obrazów

### Style nie działają

1. Sprawdź czy masz konflikt z globalnymi stylami
2. Użyj `:global()` w Astro dla zagnieżdżonych elementów
3. Sprawdź specificity CSS

## 🔗 Linki

- [astro-portabletext npm](https://www.npmjs.com/package/astro-portabletext)
- [astro-portabletext GitHub](https://github.com/theisel/astro-portabletext)
- [Sanity Portable Text Docs](https://www.sanity.io/docs/portable-text)
- [Netlify Guide](https://developers.netlify.com/guides/how-to-use-sanity-portable-text-with-astro/)

## 📝 Przykład GROQ Query

```groq
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  shortDescription,
  "description": description[]{
    ...,
    _type == "customImage" => {
      ...,
      asset->,
      alt
    },
    markDefs[]{
      ...,
      _type == "link" => {
        ...,
        href,
        blank
      }
    }
  },
  featuredImages{
    asset->,
    alt
  },
  partner->{
    name,
    partnerImage
  }
}
```
