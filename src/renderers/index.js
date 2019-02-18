import renderPlain from './rendererPlain';
import renderTree from './rendererTree';

const renderMethods = {
  json: JSON.stringify,
  plain: renderPlain,
  tree: renderTree,
};

export default (ast, format) => renderMethods[format](ast);
