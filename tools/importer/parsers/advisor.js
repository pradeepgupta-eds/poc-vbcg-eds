/* eslint-disable */
/* global WebImporter */
/**
 * Parser for advisor.
 * Base: advisor (custom block, no library convention).
 * Source: https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/
 *
 * Content model: single-cell block. The block renders a heading label
 * ("Search with our Value-based Care Advisor") plus an input + submit button
 * that are added by the block JS. For authoring we capture only the heading
 * text as the block's single-cell content.
 */
export default function parse(element, { document }) {
  // The heading label lives in the ".advisor-title" span in source HTML.
  // Prefer the full heading container (title + info glyph) so no source text
  // is dropped; fall back to the title span, then to the default label text.
  const headingEl = element.querySelector('.advisor-heading');
  const titleEl = element.querySelector('.advisor-title, [class*="title"], h1, h2, h3');
  const headingText = (headingEl?.textContent || titleEl?.textContent || element.textContent || '')
    .replace(/\s+/g, ' ')
    .trim() || 'Search with our Value-based Care Advisor';

  // Empty-block guard: nothing meaningful to author.
  if (!headingText) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single-column block: one row, one cell holding the heading text.
  const cells = [[headingText]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'advisor', cells });
  element.replaceWith(block);
}
