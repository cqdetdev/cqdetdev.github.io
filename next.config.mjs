/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
            },
        ],
    },
    output: "export",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
