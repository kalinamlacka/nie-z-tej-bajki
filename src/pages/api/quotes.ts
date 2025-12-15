import type { APIRoute } from 'astro';
import { sanityClient } from 'sanity:client';

export const GET: APIRoute = async () => {
  try {
    // Pobierz tylko _id wszystkich cytatów (bardzo lekkie!)
    const allQuoteIds = await sanityClient.fetch(
      `*[_type == 'quote']._id`
    );

    // Losowo wybierz 5 ID
    const shuffled = [...allQuoteIds].sort(() => 0.5 - Math.random());
    const selectedIds = shuffled.slice(0, 5);

    // Pobierz tylko te 5 cytatów
    const quotes = await sanityClient.fetch(
      `*[_type == 'quote' && _id in $ids] {
        _id,
        author,
        text
      }`,
      { ids: selectedIds }
    );

    return new Response(
      JSON.stringify({
        quotes,
        count: quotes.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Bez cache - za każdym razem nowe losowe cytaty
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Błąd podczas pobierania cytatów:', error);

    return new Response(
      JSON.stringify({
        error: 'Wystąpił błąd podczas pobierania cytatów'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
