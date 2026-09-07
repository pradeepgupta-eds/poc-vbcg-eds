/* eslint-disable */
/* global WebImporter */
/**
 * Parser for specialty-index.
 * Base: specialty-index (custom block, no library convention).
 * Source: https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/
 *
 * Content model: a list of specialty links. Authored as a single cell
 * containing the list of links (one <a> per specialty). The block JS collects
 * every <a> and rebuilds the A–Z directory list.
 */
export default function parse(element, { document }) {
  // In source HTML the links live in ".specialty-index-list li a".
  // Collect every anchor in document order; fall back to any anchor.
  const links = Array.from(element.querySelectorAll('a'));

  // Empty-block guard: no links to author.
  if (!links.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Preserve the list semantics: rebuild a <ul> of the links so authored
  // content stays a list rather than a run of inline anchors.
  const list = document.createElement('ul');
  links.forEach((a) => {
    const li = document.createElement('li');
    li.append(a);
    list.append(li);
  });

  // Single-column block: one row, one cell holding the list.
  const cells = [[list]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'specialty-index', cells });
  element.replaceWith(block);
}
