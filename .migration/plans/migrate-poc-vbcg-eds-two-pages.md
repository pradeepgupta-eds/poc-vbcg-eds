# Migrate poc-vbcg-eds — 2 Pages to AEM Edge Delivery Services

## Scope
Migrate two pages from the source site into this AEM EDS project:
- **Homepage** — `https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/`
- **Allergy Care Guide** — `https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/allergy-care-guide`

Migration will include: **page content**, **design & styling**, **navigation (header)**, and **footer**.

## Approach
Run the standard site-migration workflow scoped to these two URLs. Each page is analyzed for section/block structure, import infrastructure (parsers + transformers) is generated, content is imported as HTML, then design tokens/CSS are applied, and nav + footer are instrumented. Every stage is verified against the original in the preview.

## Checklist

### 1. Setup & discovery
- [ ] Confirm project profile (org `pradeepgupta-eds`, site `poc-vbcg-eds`) and content source
- [ ] Determine project type and the correct Block Library endpoint (project-expert)
- [ ] Survey the available block inventory for content modeling

### 2. Page analysis (per page)
- [ ] Scrape & analyze the **homepage** — sections, sequences, blocks, images, metadata
- [ ] Scrape & analyze the **allergy-care-guide** page — sections, sequences, blocks, images, metadata
- [ ] Catalog the two pages into page template(s) and map block variants
- [ ] Create any new block variants needed (reuse existing where ≥80% similar)

### 3. Import infrastructure
- [ ] Generate block parsers for each block variant
- [ ] Generate page transformers (cleanup, sections, media handling)
- [ ] Assemble the bundled import script

### 4. Content import
- [ ] Run the import for both URLs to produce HTML content files
- [ ] Verify imported content renders in the preview and matches source structure

### 5. Design & styling
- [ ] Extract design tokens (colors, typography, spacing) from the source
- [ ] Apply site-level styles and per-block CSS to match the original look
- [ ] Visually critique each page against the original and iterate on gaps

### 6. Navigation (header)
- [ ] Instrument the site header/nav from the source (desktop + mobile)
- [ ] Validate nav structure and appearance against the original

### 7. Footer
- [ ] Build the footer from the source (desktop + mobile)
- [ ] Validate footer structure and appearance against the original

### 8. Final validation
- [ ] Post-import validation: score both pages for content completeness (source vs output)
- [ ] Full-page visual comparison for both pages; fix any flagged divergences
- [ ] Summarize results and any manual follow-ups

## Notes
- Content HTML is only ever produced via the bundled import script — never hand-authored.
- Execution requires **Execute mode**; this plan is prepared for approval first.
