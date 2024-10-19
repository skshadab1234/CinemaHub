"use client"
import React, { Suspense, useEffect, useState } from 'react'
import MovieCard from './components/MovieCard'
import { useSearchParams } from 'next/navigation'

const Api_key = 'c45a857c193f6302f2b5061c3b85e743'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [allMovies, setAllMovies] = useState<any | null>(null)
  const [loading, setLoading] = useState(true) // To control skeleton loading
  const search = useSearchParams().get('search')

  const fetchMovies = async () => {
    setLoading(true) // Set loading state to true when fetching data
    try {
      let APIURL = '';

      if (search) {
        // If there's a search query, use the search API
        APIURL = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${search}&page=${page}`;
      } else {
        // Otherwise, fetch popular movies
        APIURL = `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`;
      }

      const response = await fetch(APIURL);
      const data = await response.json();
      setAllMovies(data?.results);
      setTotalPages(data?.total_pages);
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false) // Set loading state to false when fetching is done
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [page, search])

  const SkeletonLoader = () => (
    <div className='grid grid-cols-2 md:grid-cols-6 gap-5'>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="w-full bg-gray-200 rounded-lg overflow-hidden shadow-lg animate-pulse">
          {/* Skeleton for poster */}
          <div className="h-64 bg-gray-300"></div>
          <div className="p-4">
            {/* Skeleton for title */}
            <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
            {/* Skeleton for rating */}
            <div className="h-3 bg-gray-300 w-1/2 mb-2"></div>
            {/* Skeleton for some content */}
            <div className="h-3 bg-gray-300 w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Suspense>
      <div className='container mx-auto p-4'>
        {/* Heading */}
        <h1 className='text-3xl font-bold mb-6'>
          {search ? `Search Results for: ${search}` : 'Popular Movies'}
        </h1>

        {/* Pagination at the top */}
        <div className='flex justify-center mb-4'>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 text-gray-800">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Movie Cards or Skeleton Loader */}
        {
          loading ? (
            <SkeletonLoader /> // If loading, show skeleton
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-7 gap-5'>
              {allMovies?.length === 0 ? (
                'No movies found' // If no movies found
              ) : (
                allMovies.map((movie: any, index: number) => (
                  <MovieCard
                    key={index}
                    id={movie.id}
                    title={movie.title}
                    posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    rating={movie.vote_average}
                  />
                )) // If movies are found, show them
              )}
            </div>
          )
        }

        {/* Pagination at the bottom */}
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 text-gray-800">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Suspense>
  )
}

export default HomePage;
