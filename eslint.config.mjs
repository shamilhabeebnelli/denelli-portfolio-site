export default [{
  files: ["**/*.js", "**/*.mjs"],
  languageOptions: { ecmaVersion: 2023, sourceType: "module",
    globals: { document: "readonly", window: "readonly", matchMedia: "readonly", top: "readonly", self: "readonly",
      innerWidth: "readonly", innerHeight: "readonly", scrollY: "readonly", addEventListener: "readonly",
      requestAnimationFrame: "readonly", setTimeout: "readonly", performance: "readonly",
      IntersectionObserver: "readonly", globalThis: "readonly", console: "readonly", process: "readonly" } },
  rules: { "no-unused-vars": "error", "no-undef": "error", "eqeqeq": "error", "prefer-const": "error" },
}];
