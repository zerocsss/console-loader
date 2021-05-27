const parser = require('@babel/parser'); // 将源代码解析成AST
const traverse = require('@babel/traverse').default; //对AST节点进行递归遍历，生成便于操作，转换的path对象
const generator = require('@babel/generator').default; // 将AST生成js
const t = require('@babel/types'); // 提供对AST节点的操作

module.exports = function(source) {
  const ast = parser.parse(source, {sourceType: 'module'});
  traverse(ast, {
    CallExpression(path) {
      if (t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, {name: 'console'})) {
        path.remove()
      }
    }
  })
  const output = generator(ast, {} , source);
  return output.code
}