import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Card {
    id: number; // Add movie ID for dynamic routing
    title: string;
    rating: number;
    posterUrl: string; // URL to the movie poster image
}

const MovieCard: React.FC<Card> = ({ id, title, rating, posterUrl }) => {
    return (
        // Wrap the card in a Next.js Link component to navigate to the movie detail page
        <Link href={`/movie/${id}`} passHref>
            <div className="w-[200px] bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg cursor-pointer h-[430px]">
                <div className="relative w-full h-[300px]">
                    <Image
                        src={posterUrl}
                        alt={`${title} Poster`}
                        layout="fill"
                        priority
                        objectFit="contain"
                        className="rounded-t-lg"
                        quality={100}
                    />
                </div>

                <div className="p-4 h-[100px]">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-400">Rating: {rating.toFixed(1)}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
