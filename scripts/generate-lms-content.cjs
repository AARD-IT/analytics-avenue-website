const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const sourceFile = path.join(root, "src", "app", "lms", "index.html");
const outputFile = path.join(root, "src", "app", "lms", "lms-content.ts");

const html = fs.readFileSync(sourceFile, "utf8");
const escaped = html.replaceAll("`", "\\`").replaceAll("${", "\\${");

const content = `export const LMS_HTML_DOC = String.raw\`${escaped}\`;\n`;
fs.writeFileSync(outputFile, content, "utf8");

