/* eslint-disable */
/* global WebImporter */
/**
 * Parser for guide-nav.
 * Base: guide-nav (custom block, no library convention).
 * Source: https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/allergy-care-guide
 *
 * Content model: a single-cell block containing a list of links — a
 * "Back to Care Guide Index" lead link followed by per-condition jump links.
 * The block JS collects every <a>, treats the first as the lead link, and
 * rebuilds the sticky vertical nav.
 */
export default function parse(element, { document }) {
  // In source HTML the links live in "nav.guide-nav-list a".
  // Collect every anchor in document order; fall back to any anchor.
  const links = Array.from(element.querySelectorAll('a'));

  // Empty-block guard: no links to author.
  if (!links.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Preserve list semantics: rebuild a <ul> of the links (lead link first).
  const list = document.createElement('ul');
  links.forEach((a) => {
    const li = document.createElement('li');
    li.append(a);
    list.append(li);
  });

  // Single-column block: one row, one cell holding the list of links.
  const cells = [[list]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'guide-nav', cells });
  element.replaceWith(block);
}
