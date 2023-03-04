//多页面打包
//通过glob库获取pages目录下所有子项目的入口文件，同时生成每个子项目自己的html模板
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const setMPA = ()=>{
    const entry = {}
    const htmlWebpackPlugin = []
    const entryFile = glob.sync('./pages/*/main.js')
    entryFile.forEach((filePath,index)=>{
        //根据获取到的路劲生成多入口entry对象
        const entryName = filePath.split('/pages/')[1].split('/main.js')[0]
        entry[entryName] = filePath
        //接着生成每个入口的html模板
        htmlWebpackPlugin.push(
            new HtmlWebpackPlugin({
                filename: `${entryName}.html`,
                template: path.resolve(__dirname,`./pages/${entryName}/public/index.html`),
                chunks: ['vendors',entryName], //只打入指定的chunks
                inject: true,//配置所有js资源放置在html得哪个位置
                minify:{
                    //压缩配置
                    collapseWhitespace: true,
                    preserveLineBreaks:false,
                    html5:true,
                    minifyCSS:true,
                    minifyJS:true,
                    removeComments: true,
                }
            })
        )
    })
    return{
        entry,
        htmlWebpackPlugin
    }
}

const {entry,htmlWebpackPlugin} =setMPA()
module.exports = {
    entry,
    output: {
        //所有文件的输出路径
        //__dirname: nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"),//绝对路径
        //最终产物的文件名，可以指定 也可以使用[name]占位 这样的话就会使用入口文件的名字，多入口的时候必须以占位的形式
        filename: "[name]_[chunkhash:8].js",
        //代码块的文件名
        // chunkFilename:"[name].chunk.js",
        clean:true //自动删除上次打包的结果
    },
    module: {
        rules: [
            {//通过babel-loader解析es6es7语法转为es5
                test:/\.js$/,
                use:[
                    "babel-loader"
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            /**
             * 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。
             * 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
             */
            // chunks:'all',
            // minSize: 3000,//需要处理的chunks的最小字节
            // maxSize: 0,//同上，相反
            // minChunks:1,//chunks最小被引用次数，超过这个次数就会被处理
            minSize: 0,//只要引用了就会被成单独的chunks
            cacheGroups: { //配置分离出来的chunks
                commons:{
                    test: /(vue)/,
                    name: 'vendors',
                    chunks: "all"
                },
                utils:{
                    name: 'utils',
                    chunks: "all",
                    minChunks: 2, //只要引用了两次以上就会被处理
                }
            }
        }
    },
    resolve: {
        alias: {
            '@':path.resolve(__dirname,'./src')
        }
    },
    plugins: [
        //plugin的配置
        //使用此插件将css分离出文件通过link引入
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        }),
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        ...htmlWebpackPlugin
    ],
    // devtool: "source-map"//输出源代码
    stats: "errors-only"
}
