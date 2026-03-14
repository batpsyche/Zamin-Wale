/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            },
            {
                protocol: "https",
                hostname: "zaminwale-private.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "zaminwale-api.onrender.com"
            },
            {
                protocol: "https",
                hostname: "youtube.com"
            },
            {
                protocol: "https",
                hostname: "placehold.co"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
};

export default nextConfig;


