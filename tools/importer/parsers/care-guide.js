/* eslint-disable */
/* global WebImporter */
/**
 * Parser for care-guide.
 * Base: care-guide (custom block, no library convention).
 * Source: https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/allergy-care-guide
 *
 * Content model (rows top-to-bottom, matches blocks/care-guide/care-guide.js):
 *   Row 1: condition title            — single cell
 *   Row 2: two cells                  — [Quick Guide] | [Referral Guidelines]
 *   Row 3: Patient Communication      — single cell (optional)
 *
 * The block is widest at 2 columns (Row 2), so single-cell rows are padded
 * with an empty trailing cell to keep every row the same width.
 */
export default function parse(element, { document }) {
  // Row 1: title — plain text in ".care-guide-title".
  const titleEl = element.querySelector(':scope > .care-guide-title, .care-guide-title');
  const titleText = (titleEl?.textContent || '').trim();

  // Row 2: two-column body — Quick Guide | Referral Guidelines.
  const body = element.querySelector(':scope > .care-guide-body, .care-guide-body');
  const quick = body?.querySelector(':scope > .care-guide-quick, .care-guide-quick');
  const referral = body?.querySelector(':scope > .care-guide-referral, .care-guide-referral');

  // Row 3: Patient Communication (optional) — inner wrapper div holds content.
  const comms = element.querySelector(':scope > .care-guide-comms, .care-guide-comms');
  const commsContent = comms?.querySelector(':scope > div') || comms;

  // Empty-block guard: nothing meaningful to author.
  if (!titleText && !quick && !referral && !commsContent) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 1: title (single cell, padded to 2 columns).
  cells.push([titleText, '']);

  // Row 2: two cells (Quick Guide | Referral Guidelines). Preserve the inner
  // headings/paragraphs/lists/links by referencing the source elements.
  const quickCell = quick ? [...quick.childNodes] : '';
  const referralCell = referral ? [...referral.childNodes] : '';
  cells.push([quickCell, referralCell]);

  // Row 3: Patient Communication (single cell, padded to 2 columns).
  if (commsContent) {
    cells.push([[...commsContent.childNodes], '']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'care-guide', cells });
  element.replaceWith(block);
}
