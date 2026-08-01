#!/usr/bin/env node
// build_standalone.js — index.html의 <link>/<script src>를 전부 인라인해
// dist/index_standalone.html 단일 파일을 생성한다. (zero-dependency)
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

let html = read('index.html');

// CSS 인라인
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) =>
  `<style>\n${read(href)}\n</style>`);

// JS 인라인 (</script> 조기 종료 방지 이스케이프)
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) =>
  `<script>\n${read(src).replace(/<\/script>/gi, '<\\/script>')}\n</script>`);

if (/(src|href)="(css|js|data)\//.test(html)) {
  console.error('FAIL: 인라인되지 않은 로컬 리소스 참조가 남아 있다.');
  process.exit(1);
}

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
const out = path.join(ROOT, 'dist', 'index_standalone.html');
fs.writeFileSync(out, html);
const size = fs.statSync(out).size;
if (size > 2.5 * 1024 * 1024) {
  console.error(`FAIL: ${(size / 1024 / 1024).toFixed(2)}MB > 2.5MB 예산 (POLICY §23)`);
  process.exit(1);
}
console.log(`OK: dist/index_standalone.html (${(size / 1024).toFixed(0)}KB)`);
