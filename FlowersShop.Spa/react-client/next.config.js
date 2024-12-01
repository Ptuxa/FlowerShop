/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Отключает ESLint при сборке
    },
};

module.exports = nextConfig;