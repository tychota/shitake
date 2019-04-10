const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    webpack: (config, options, webpack) => {
        config.entry.main = ['./index.ts'];

        config.resolve = {
            extensions: ['.ts', '.js', '.json', '.proto'],
        };

        config.externals = [
            nodeExternals({
                whitelist: ['webpack/hot/poll?100', /@shitake/],
            }),
        ];

        config.module.rules.push({
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
        });
        config.module.rules.push({ test: /.proto$/, use: 'cop' });

        config.plugins.push(new CopyPlugin([{ from: 'packages/**/*.proto', to: '[name].proto' }]));

        return config;
    },
};
