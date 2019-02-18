import renderPlain from './rendererPlain';
import renderTree from './rendererTree';

const renderMethods = {
  plain: renderPlain,
  tree: renderTree,
};

export default (ast, format) => renderMethods[format](ast);
