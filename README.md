# Nie z Tej Bajki - Dokumentacja Projektu

## Struktura Projektu

Projekt jest stworzony w architekturze "monorepo", ponieważ mamy frontend oraz cmsa w tym samym miejscu.

Frontend - Astro.js
CMS - Sanity

## Dostępne komendy

### Instalacja

```bash
npm install
```

### Development

Uruchamia frontend lokalnie.

```bash
npm run dev
```

Uruchamia cms lokalnie.

```bash
cd studio && npm run dev
```

### Build

Buduje frontend do kodu produkcyjnego.

```bash
npm run build
```

## Struktura tworzenia commitów i branchy

### Nazewnictwo branchy

Brancha tworzysz w zależności od typu zadania:

- **Story/Feature**: `feature/NZTB-<numer-zadania>`
  - Przykład: `feature/NZTB-123`

- **Bug/Fix**: `fix/NZTB-<numer-zadania>`
  - Przykład: `fix/NZTB-456`

- **Task**: `task/NZTB-<numer-zadania>`
  - Przykład: `task/NZTB-789`

### Tworzenie brancha

```bash
# Dla feature
git checkout -b feature/NZTB-123

# Dla fix
git checkout -b fix/NZTB-456

# Dla task
git checkout -b task/NZTB-789
```

### Konwencja commitów

Commity powinny być zapisane w formacie:

```
nazwa_brancha, <opis> przykład: feature/NZTB-123, Opis commita
```

## Zmienne środowiskowe

| Nazwa zmiennej         | Opis                 |
| ---------------------- | -------------------- |
| `NODE_ENV`             | Środowisko aplikacji |
| `DATABASE_URL`         | URL do bazy danych   |
| `API_URL`              | URL do API           |
| `SECRET_KEY`           | Klucz do szyfrowania |
| `PORT`                 | Port aplikacji       |
| `NEXT_PUBLIC_SITE_URL` |                      |

## Workflow pracy

1. Przełączmy się na brancha develop i uruchamiamy komendę "git pull" aby mieć najświeższą wersję
2. Tworzymy nowego brancha od brancha "develop"
3. Po zakończonej pracy wystawiamy PR-a, z feature brancha do developa
4. Sprawdzamy czy na środowisku deweloperskim wszystko działa poprawnie
5. Następnie wystawiamy PR-a z developa do mastera
6. Mergujemy zmiany do mastera

## CI/CD

Po zmergowaniu zmian do brancha develop z feature branch, strona się przebuduje i wgra na środowisko deweloperskie - https://nie-z-tej-bajki.netlify.app/

Po zmergowaniu zmian do brancha master z develop, strona się przebuduje i wgra na środowisko deweloperskie - <miejsce_na_domene>
