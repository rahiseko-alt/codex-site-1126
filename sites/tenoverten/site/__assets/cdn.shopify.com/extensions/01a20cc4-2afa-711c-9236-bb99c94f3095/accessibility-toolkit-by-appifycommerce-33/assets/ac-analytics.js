const acAnalyticsRequestUrl = "https://aca.appifycommerce.com";

/**
 * Track accessibility event
 * @param {string} type
 */
function trackAccessibilityEvent(type) {
  if (!window.Shopify?.shop) {
    console.warn("Shopify.shop not available");
    return;
  }

  try {
    fetch(`${acAnalyticsRequestUrl}/api/widget/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ shop: Shopify.shop, type }),
    }).catch((err) => {
      console.error("Tracking failed:", err);
    });
  } catch (err) {
    console.error("Tracking error:", err);
  }
}

const featureNameMap = Object.freeze({
  aca_dt: "decrease_text",
  aca_it: "increase_text",
  aca_gs: "grayscale",
  aca_ic: "invert_colors",
  aca_hl: "highlight_links",
  aca_hh: "highlight_headings",
  aca_rs: "read_selected_text",
  aca_rp: "read_page_text",
  aca_lh: "line_height",
  aca_ls: "letter_spacing",
  aca_cc: "cursor_contrast",
  aca_ta: "text_align",
  aca_pa: "pause_animation",
  aca_cf: "change_fonts",
  aca_hi: "hide_images",
  aca_ms: "mute_sounds",
  aca_tt: "tooltip",
  aca_rf: "read_focus",
  aca_ps: "page_structure",
  aca_kn: "keyboard_navigation",
  aca_visually_impaired: "visually_impaired_mode",
  aca_blind: "blind_mode",
  aca_adhd: "adhd_mode",
  aca_dyslexia: "dyslexia_mode",
  aca_eco_mode: "eco_mode",
  aca_reset: "reset",
  aca_hide_widget: "hide_widget",
  aca_keyboard_shortcuts_guide: "keyboard_shortcuts_guide",
});

const additionalSelectors = [
  { selector: ".aca_lang_selector", type: "language" },
  {
    selector: ".aca_profile_select, .aca_profile_box",
    type: "accessibility_profile",
  },
  {
    selector: "#aca-enlarge-toggle, .aca_enlarge_switch",
    type: "large_widget",
  },
  { selector: ".aca_card_header_shortcuts_link", type: "keyboard_shortcuts" },
  { selector: ".aca_footer_statment_link", type: "accessibility_statement" },
];

const bindAnalyticsEvents = () => {
  document.addEventListener("click", (event) => {
    if (!event.isTrusted) return;

    const target = event.target;

    // Feature buttons
    const featureButton = target.closest("div[type]");
    if (featureButton) {
      const typeAttr = featureButton.getAttribute("type");
      const readableName = featureNameMap[typeAttr];

      if (readableName) {
        trackAccessibilityEvent(readableName);
        return; // stop further checks if matched
      }
    }

    // Other tracked elements
    for (const { selector, type } of additionalSelectors) {
      if (target.closest(selector)) {
        trackAccessibilityEvent(type);
        return;
      }
    }
  });
};

// Expose on `window` explicitly. `const` creates a global *lexical* binding, not a
// property of `window`, so `window.bindAnalyticsEvents` was undefined and the
// widget bundle (storefront/src/init.ts) skipped its
// `typeof window.bindAnalyticsEvents === "function"` guard — leaving the click
// listener unbound and every feature click untracked.
window.bindAnalyticsEvents = bindAnalyticsEvents;
window.trackAccessibilityEvent = trackAccessibilityEvent;
