/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org']
    },
    typescript: {
        ignoreDevErrors: true,
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
