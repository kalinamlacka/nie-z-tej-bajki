# SanityImage Component - Dokumentacja

Komponent `SanityImage` to zoptymalizowane rozwiązanie do wyświetlania obrazów z Sanity CMS w projekcie Astro. Wykorzystuje `astro-sanity-picture` dla maksymalnej wydajności.

## 📦 Instalacja

Komponent jest już gotowy do użycia w projekcie.

## 🎯 Funkcje

- ✅ **Automatyczna optymalizacja** - generuje responsive obrazy w różnych rozdzielczościach
- ✅ **Nowoczesne formaty** - WebP z fallbackiem do JPG (Sanity CDN)
- ✅ **Lazy loading** - domyślnie włączony
- ✅ **LQIP** (Low Quality Image Placeholder) - opcjonalne rozmyte placeholder'y
- ✅ **TypeScript** - pełna obsługa typów

## 🚀 Podstawowe użycie

```astro
---
import SanityImage from '../components/shared/SanityImage.astro';

// Przykład: obraz z Sanity CMS
const { heroImage } = await sanityClient.fetch(`*[_type == "homePage"][0]{
  heroImage
}`);
---

<SanityImage
  image={heroImage}
  alt="Hero image"
/>
```

## 📝 Props (Parametry)

| Prop | Typ | Domyślna wartość | Opis |
|------|-----|------------------|------|
| `image` | `SanityImageSource` | **wymagany** | Obiekt obrazu z Sanity |
| `alt` | `string` | `''` | Tekst alternatywny (ważny dla SEO) |
| `widths` | `number[]` | `[320, 640, 960, 1280, 1920]` | Szerokości generowanych obrazów |
| `sizes` | `string` | `'(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1280px'` | Sizes attribute dla responsive images |
| `quality` | `number` | `85` | Jakość kompresji (0-100) |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Strategia ładowania |
| `class` | `string` | `''` | Klasy CSS |
| `fetchpriority` | `'high' \| 'low' \| 'auto'` | `'auto'` | Priorytet pobierania |
| `lqip` | `boolean` | `false` | Włącz Low Quality Image Placeholder |

## 💡 Przykłady użycia

### Hero Image (powyżej fałdu)

```astro
<SanityImage
  image={heroImage}
  alt="Nie z Tej Bajki - Hero"
  widths={[640, 1280, 1920, 2560]}
  sizes="100vw"
  loading="eager"
  fetchpriority="high"
  quality={90}
/>
```

### Galeria zdjęć

```astro
{gallery.map((item) => (
  <SanityImage
    image={item.image}
    alt={item.alt}
    widths={[320, 640, 960]}
    sizes="(max-width: 768px) 100vw, 33vw"
    lqip={true}
  />
))}
```

### Obrazek w treści artykułu

```astro
<SanityImage
  image={articleImage}
  alt="Zdjęcie w artykule"
  widths={[640, 960, 1280]}
  sizes="(max-width: 1024px) 100vw, 800px"
  class="article-image"
/>
```

### Thumbnail z niską jakością placeholder

```astro
<SanityImage
  image={thumbnail}
  alt="Miniaturka"
  widths={[200, 400]}
  sizes="200px"
  quality={80}
  lqip={true}
/>
```

### Obrazek w tle sekcji (wysokiej jakości)

```astro
<SanityImage
  image={backgroundImage}
  alt=""
  widths={[1280, 1920, 2560, 3840]}
  sizes="100vw"
  quality={95}
/>
```

## 🎨 Stylowanie

Komponent akceptuje klasę CSS:

```astro
<SanityImage
  image={image}
  alt="Stylowany obrazek"
  class="rounded-lg shadow-xl"
/>
```

## ⚡ Optymalizacja wydajności

### Sizes attribute

Właściwie skonfigurowany `sizes` jest kluczowy dla wydajności:

```astro
<!-- Mobile first -->
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"

<!-- Full width hero -->
sizes="100vw"

<!-- Fixed width sidebar -->
sizes="300px"
```

### Loading strategy

- **`loading="eager"`** - dla obrazów powyżej fałdu (hero, logo)
- **`loading="lazy"`** - dla wszystkich innych obrazów (domyślnie)

### Fetch priority

- **`fetchpriority="high"`** - dla najważniejszego obrazu na stronie (LCP - Largest Contentful Paint)
- **`fetchpriority="auto"`** - dla większości obrazów

### Quality

- **90-100** - hero images, zdjęcia produktów
- **85** - standardowe zdjęcia (domyślne)
- **70-80** - thumbnails, tła

## 🔍 SEO

Zawsze dodawaj opisowy tekst `alt`:

```astro
<!-- ❌ Źle -->
<SanityImage image={image} />

<!-- ✅ Dobrze -->
<SanityImage
  image={image}
  alt="Kolorowe ilustracje bajek dla dzieci"
/>
```

## 🐛 Troubleshooting

### Obraz się nie wyświetla

1. Sprawdź czy obiekt `image` zawiera `asset` reference
2. Upewnij się, że masz skonfigurowane `image.domains` w [astro.config.mjs](../../astro.config.mjs)
3. Sprawdź konsolę - komponent wyświetla warning jeśli brakuje obrazu

### Problemy z TypeScript

Importuj typy z Sanity:

```typescript
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
```

## 📚 Więcej informacji

- [astro-sanity-picture GitHub](https://github.com/otterdev-io/astro-sanity-picture)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/)
