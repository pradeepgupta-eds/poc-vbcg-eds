/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: poc-vbcg-eds (Value-based Care Guides) site-wide cleanup.
 *
 * Removes non-authorable site chrome shared across all templates
 * (care-guide-index homepage and *-care-guide pages).
 *
 * Selectors verified against captured DOM:
 *   - migration-work/_home/cleaned.html
 *   - migration-work/_guide/cleaned.html
 * Both pages share the same shell:
 *   <header class="header-wrapper"> ... </header>  (site nav / brand)
 *   <footer class="footer-wrapper"> ... </footer>  (disclaimer / copyright)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome (from captured DOM of both templates):
    //   header.header-wrapper — global header/nav/brand
    //   footer.footer-wrapper — global footer disclaimer/copyright
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
      'footer.footer-wrapper',
    ]);

    // Safe leftover elements not authored on a page.
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'link',
      'noscript',
      'iframe',
    ]);
  }
}
