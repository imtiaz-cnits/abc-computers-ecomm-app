/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,

  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      })
    );
    return config;
  },
};

export default nextConfig;
