const path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    target: 'node',

    entry: {
        server: {
            import: ['./src/htmlResponses.js', './src/jsonResponses.js', './src/server.js'],
            filename: 'server.js'
        },
        client: {
            import: ['./client/main.js', './client/create.js', './client/vote.js', './client/chart.js'],
            filename: 'client.js'
        }
    },


    module: {
        rules: [{
                test: /.js$/,
                exclude: /node_modules/,

                use: [

                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                        // options: {
                        //     "presets": [
                        //         ["env", {
                        //           "modules": false
                        // 		  }
                        // 		]
                        // 	]
                        // }

                    }
                    // { loader: 'style-loader' },

                    // [css-loader](/loaders/css-loader)
                    // {
                    //   loader: 'css-loader',
                    // options: {
                    //   modules: true
                    // }
                    //}
                ]
            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },

            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

        ]
    }

};