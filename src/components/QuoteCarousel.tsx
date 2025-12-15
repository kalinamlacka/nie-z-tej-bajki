import { useEffect, useState } from "react";

interface Quote {
    _id: string;
    author: string;
    text: string;
}

interface Props {
    rotationInterval?: number;
    className?: string;
}

export default function QuoteCarousel({ rotationInterval = 20000, className = "" }: Props) {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch quotes on mount
    useEffect(() => {
        async function fetchQuotes() {
            try {
                const response = await fetch("/api/quotes");

                if (!response.ok) {
                    throw new Error("Nie udało się pobrać cytatów");
                }

                const data = await response.json();
                const fetchedQuotes: Quote[] = data.quotes || [];

                if (fetchedQuotes.length === 0) {
                    setError("Brak cytatów do wyświetlenia");
                    return;
                }

                setQuotes(fetchedQuotes);
                setLoading(false);
            } catch (err) {
                console.error("Błąd podczas ładowania cytatów:", err);
                setError("Nie udało się załadować cytatów");
                setLoading(false);
            }
        }

        fetchQuotes();
    }, []);

    // Auto-rotate quotes
    useEffect(() => {
        if (quotes.length <= 1) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, rotationInterval);

        return () => clearInterval(intervalId);
    }, [quotes.length, rotationInterval]);

    if (loading) {
        return (
            <div className={`quote-wrapper ${className}`}>
                <div className="quote-loading">Ładowanie cytatów...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`quote-wrapper ${className}`}>
                <div className="quote-error">{error}</div>
            </div>
        );
    }

    if (quotes.length === 0) {
        return null;
    }

    return (
        <div className={`quote-wrapper ${className}`}>
            {quotes.map((quote, index) => (
                <div key={quote._id} className={`quote-slide ${index === currentIndex ? "active" : ""}`}>
                    <p className="quote-text">"{quote.text}"</p>
                    <p className="quote-author">~ {quote.author}</p>
                </div>
            ))}

            <style>{`
        .quote-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem;
          width: 100%;
          position: relative;
          min-height: 250px;
          border-top: 1px solid var(--separator-color);
          border-bottom: 1px solid var(--separator-color);
        }

        .quote-loading,
        .quote-error {
          text-align: center;
          font-style: italic;
        }

        .quote-loading {
          color: #999;
        }

        .quote-error {
          color: #e74c3c;
        }

        .quote-slide {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease, visibility 0s 0.6s;
          pointer-events: none;
        }

        .quote-slide.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(10px);
          pointer-events: auto;
          transition: opacity 0.6s ease, transform 0.6s ease, visibility 0s 0s;
        }

        .quote-wrapper p {
          text-align: center;
          font-style: italic;
          margin: 0;
        }

        .quote-text {
          font-size: 1.5rem;
        }

        .quote-author {
          font-size: 1.25rem;
          font-weight: bold;
        }

        /* Large screens (1200px and below) */
        @media only screen and (max-width: 1200px) {
          .quote-text {
            font-size: 1.25rem;
          }
          .quote-author {
            font-size: 1rem;
          }
        }

        /* Medium screens (768px and below) */
        @media only screen and (max-width: 768px) {
          .quote-wrapper {
            gap: 1.5rem;
            padding: 1.5rem;
          }
          .quote-slide {
            gap: 1.5rem;
            padding: 1.5rem;
          }
          .quote-text {
            font-size: 1rem;
          }
          .quote-author {
            font-size: 1rem;
          }
          .quote-slide.active {
            transform: translateY(30px);
          }
        }

        /* Small screens (485px and below) */
        @media only screen and (max-width: 485px) {
          .quote-wrapper {
            gap: 1rem;
            padding: 1rem;
          }
          .quote-slide {
            gap: 1rem;
            padding: 1rem;
          }
          .quote-text {
            font-size: .875rem;
          }
          .quote-author {
            font-size: 0.875rem;
          }
        }
      `}</style>
        </div>
    );
}
