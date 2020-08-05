/**
 * Data-is-ifies text nodes.
 *
 * @param {Text} textNode to data-is-ify.
 */
function dataIsifyTextNode(textNode) {
  if (/data\s+(are|were)/i.test(textNode.data)) {
    textNode.textContent = textNode.textContent
        .replaceAll(/(data\s+)are/gi, '$1is')
        .replaceAll(/(data\s+)were/gi, '$1was');
  }
}

/**
 * Data-is-ifies child and indirect child text nodes.
 *
 * @param {Node} node any node that might contain text nodes.
 */
function dataIsifyContainerNode(node) {
  const textWalker = document.createTreeWalker(
      node, NodeFilter.SHOW_TEXT);

  let textNode;
  while (textNode = textWalker.nextNode()) {
    dataIsifyTextNode(textNode);
  }
}

new MutationObserver((mutations) => {
  for (const {target} of mutations) {
    dataIsifyContainerNode(target);
  }
}).observe(document.body, {
  subtree: true,
  childList: true,
});

dataIsifyContainerNode(document.body);
const titleNode = document.head.querySelector('title');
if (titleNode) {
  dataIsifyContainerNode(titleNode);
}
