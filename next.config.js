/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  webpack: (webpackConfig, { isServer, webpack }) => {
    // Exclude Node.js built-in modules from client-side bundle
    if (!isServer) {
      // Ignore MongoDB and Mongoose entirely on the client side
      webpackConfig.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^mongodb$/,
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^mongoose$/,
        })
      );

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        fs: false,
        child_process: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        timers: false,
        'timers/promises': false,
        os: false,
        path: false,
        http: false,
        https: false,
        url: false,
        zlib: false,
        'mongodb-client-encryption': false,
        'aws4': false,
        'snappy': false,
        'kerberos': false,
        '@mongodb-js/zstd': false,
        'gcp-metadata': false,
        'socks': false,
      };
    }

    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      }),
    );

    return webpackConfig;
  },
};

module.exports = nextConfig;
