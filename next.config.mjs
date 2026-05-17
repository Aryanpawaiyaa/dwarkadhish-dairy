/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // Forces Next.js to generate a static 'out' folder
  images: { unoptimized: true } // Required by Next.js for static HTML exports
};

export default nextConfig;