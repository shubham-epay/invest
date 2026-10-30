import type { NextConfig } from 'next';

// Vinext beta prerenders slashless URLs; directory indexes are created after export.
const nextConfig: NextConfig = { output: 'export', trailingSlash: false };

export default nextConfig;
