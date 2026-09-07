/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-allergy-care-guide.js
  var import_allergy_care_guide_exports = {};
  __export(import_allergy_care_guide_exports, {
    default: () => import_allergy_care_guide_default
  });

  // tools/importer/parsers/guide-nav.js
  function parse(element, { document }) {
    const links = Array.from(element.querySelectorAll("a"));
    if (!links.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const list = document.createElement("ul");
    links.forEach((a) => {
      const li = document.createElement("li");
      li.append(a);
      list.append(li);
    });
    const cells = [[list]];
    const block = WebImporter.Blocks.createBlock(document, { name: "guide-nav", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/care-guide.js
  function parse2(element, { document }) {
    const titleEl = element.querySelector(":scope > .care-guide-title, .care-guide-title");
    const titleText = ((titleEl == null ? void 0 : titleEl.textContent) || "").trim();
    const body = element.querySelector(":scope > .care-guide-body, .care-guide-body");
    const quick = body == null ? void 0 : body.querySelector(":scope > .care-guide-quick, .care-guide-quick");
    const referral = body == null ? void 0 : body.querySelector(":scope > .care-guide-referral, .care-guide-referral");
    const comms = element.querySelector(":scope > .care-guide-comms, .care-guide-comms");
    const commsContent = (comms == null ? void 0 : comms.querySelector(":scope > div")) || comms;
    if (!titleText && !quick && !referral && !commsContent) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cells.push([titleText, ""]);
    const quickCell = quick ? [...quick.childNodes] : "";
    const referralCell = referral ? [...referral.childNodes] : "";
    cells.push([quickCell, referralCell]);
    if (commsContent) {
      cells.push([[...commsContent.childNodes], ""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "care-guide", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/vbcg-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.header-wrapper",
        "footer.footer-wrapper"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "script",
        "style",
        "link",
        "noscript",
        "iframe"
      ]);
    }
  }

  // tools/importer/import-allergy-care-guide.js
  var parsers = {
    "guide-nav": parse,
    "care-guide": parse2
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "allergy-care-guide",
    description: "Clinical care guide document: sticky in-page navigation and repeated per-condition care-guide blocks with Quick Guide / Referral Guidelines / Patient Communication.",
    urls: [
      "https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.page/allergy-care-guide"
    ],
    blocks: [
      {
        name: "guide-nav",
        instances: [".guide-nav.block", "div.guide-nav-wrapper > div.guide-nav"]
      },
      {
        name: "care-guide",
        instances: [".care-guide.block", "div.care-guide-wrapper > div.care-guide"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    const seen = /* @__PURE__ */ new Set();
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_allergy_care_guide_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_allergy_care_guide_exports);
})();
