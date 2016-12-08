'use strict';

const buildRequire = (j, v, r) => {
  let code = '';
  if (v && v.type === 'Identifier' && v.name.length) {
    code += `const ${v.name}`;
  }
  if (r && r.type === 'Literal' && r.value.length) {
    if (code.length) {
      code += ' = ';
    }
    code += `require('${r.value}')`;
  }
  code += ';';
  if (code === ';') {
    code = '';
  }
  return code;
};

module.exports = function (file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.ExpressionStatement)
    .filter((path) =>
            path.parentPath.node.type === 'Program' &&
            path.node.expression.type === 'CallExpression' &&
            path.node.expression.callee.type === 'Identifier' &&
            path.node.expression.callee.name === 'define' &&
            path.node.expression.arguments.length === 2 &&
            path.node.expression.arguments[0].type === 'ArrayExpression' &&
            [
              'FunctionExpression', 'ArrowFunctionExpression'
            ].indexOf(path.node.expression.arguments[1].type) >= 0)
    .replaceWith((path) => {
      const arrayExpression = path.node.expression.arguments[0];
      const functionExpression = path.node.expression.arguments[1];
      const comments = path.node.comments;
      const result = [];
      const statementSize = Math.max(
        functionExpression.params.length,
        arrayExpression.elements.length
      );
      for (let i = 0; i < statementSize; i++) {
        result.push(buildRequire(
          j,
          functionExpression.params[i],
          arrayExpression.elements[i]
        ));
      }
      if (result.length && comments && comments.length) {
        const firstNode = j(result[0]).get().value.program.body[0];
        firstNode.comments = [];
        comments.forEach((comment) => {
          let newComment;
          if (comment.type === 'CommentLine') {
            newComment = j.commentLine(
              comment.value, comment.leading, comment.trailing);
          } else if (comment.type === 'CommentBlock') {
            newComment = j.commentBlock(
              comment.value, comment.leading, comment.trailing);
          }
          if (newComment) {
            firstNode.comments.push(newComment);
          }
        });
        result[0] = firstNode;
      }
      const leading = [];
      let isLeading = true;
      functionExpression.body.body.forEach((item) => {
        if (isLeading &&
          item.type === 'ExpressionStatement' &&
          item.expression.type === 'Literal') {
          leading.push(item);
        } else if (item.type === 'ReturnStatement') {
          const returnStatement = j(item)
            .toSource()
            .replace('return ', 'module.exports = ');
          isLeading = false;
          result.push(returnStatement);
        } else {
          isLeading = false;
          result.push(item);
        }
      });
      return leading.concat(result);
    })
    .toSource();
};
