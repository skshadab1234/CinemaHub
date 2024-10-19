"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CastDetails from "@/app/components/CastDetails";

// Replace with your actual API key
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const DetailPage: React.FC = ({ params }: any) => {
    const { id } = params; // Extract movie ID from the route

    const [movie, setMovie] = useState<any>(null); // Movie details state
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    // Fetch movie details from the TMDb API
    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!id) return;

            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch movie details");
                }
                const data = await res.json();
                setMovie(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div className="text-center text-white">Loading movie details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!movie) {
        return <div className="text-center text-white">No movie data found.</div>;
    }

    return (
        <>
            <div className="relative bg-gray-900 text-white rounded-lg shadow-lg m-4 flex flex-col lg:flex-row">
                {/* Content on the left side */}
                <div className="relative flex flex-col justify-between w-full lg:w-1/2 p-6 border border-black/10 bg-gradient-to-br from-black via-black to-gray-900 rounded-lg shadow-lg">
                    {/* Movie Poster */}
                    <div className="mb-4 flex-1 justify-center">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={150}
                            height={225}
                            className="rounded-lg shadow-lg"
                            priority
                        />
                    </div>

                    {/* Movie Details */}
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <div className="text-gray-300 mb-4 flex items-center">
                            <span className="mr-2">
                                <span className="text-blue-400 font-semibold">Rating: </span>
                                {movie.vote_average?.toFixed(1)}
                            </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-400 mb-4">
                            <span className="mr-4">{movie.runtime} min</span>
                            <span>{movie.genres.map((g: any) => g.name).join(", ")}</span>
                        </div>

                        <div className="text-gray-400 mb-4">
                            <span className="mr-2">Release Date:</span>
                            {new Date(movie.release_date).toLocaleDateString("en-GB", {
                                weekday: "short", // "Sat"
                                day: "numeric", // "23"
                                month: "short", // "Nov"
                                year: "numeric", // "2024"
                            })}
                        </div>

                        <div className="text-lg text-white mt-4">
                            <h3 className="font-semibold">Overview</h3>
                            <p className="text-gray-300">{movie.overview}</p>
                        </div>
                    </div>
                </div>

                {/* Background Image with Enhanced Black Overlay */}
                <div
                    className="relative w-full lg:w-1/2 bg-cover bg-center rounded-r-lg h-[400px] lg:h-auto"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                    }}
                ></div>
            </div>

            <CastDetails movie_id={id} />
        </>
    );
};

export default DetailPage;
