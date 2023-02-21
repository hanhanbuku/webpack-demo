//多页面打包
//通过glob库获取pages目录下所有子项目的入口文件，同时生成每个子项目自己的html模板
const glob = require('glob')
const path = require('path')
const setMPA = ()=>{
    const entry = {}
    const htmlWebpackPlugin = []
    const entryFile = glob.sync('./pages/*/index.js')
    console.log(path.join(__dirname,'./pages/user/index.js'))
    console.log(entryFile,13123)
    Object.keys(entryFile).map((index)=>{

        console.log(item,123)
    })
    return{
        entry,
        htmlWebpackPlugin
    }
}

setMPA()
module.exports = {

}
