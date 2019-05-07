const glob = require("glob");
const path = require("path");
const SOURCE_PATH = 'src';
let FOLDER_PATH = '';
/**
 * {'home.entrity':'pages/home/home.entrity.js'}
 * new HtmlWebpackPlugin({
      template: 'html/about/about.html',
      filename: 'about/about.html',
      chunks: [COMMON_CHUNK_NAME, 'about']
    })
 *  */
const entryFileNameList = glob.sync(`${SOURCE_PATH}\\pages\\**\\*.entrity.js`);
console.log(entryFileNameList)
const entryNameList = entryFileNameList.map((entryFileName) => {
    var filename = path.basename(entryFileName, '.js');
    var pathname = path.relative(path.join(SOURCE_PATH, 'pages'), entryFileName);
    console.log(filename,':', pathname)
    return [filename, pathname];
});
