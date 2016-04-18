import fs from 'fs';
import path from 'path';

import ebnfParser from 'ebnf-parser';
import lexParser from 'lex-parser';
import { Parser } from 'jison';
import rimraf from 'rimraf';
import test from 'tape';

const ebnfPath = path.join(__dirname, '..', '..', 'docs', 'rtype.y');
const ebnf = fs.readFileSync(ebnfPath, 'utf8');

const lexPath = path.join(__dirname, '..', '..', 'docs', 'rtype.l');
const lex = fs.readFileSync(lexPath, 'utf8');

let grammar;

test('ebnfParser parses rtype.ebnf into grammar JSON', (t) => {
  grammar = ebnfParser.parse(ebnf);
  t.ok(grammar);
  t.equals(typeof grammar, 'object');
  t.end();
});

let lexer;

test('lexParser parses rtype.ebnf into lex JSON', (t) => {
  lexer = lexParser.parse(lex);
  t.ok(lexer);
  t.equals(typeof lexer, 'object');
  t.end();
});

let parser;

test('grammar JSON transforms into parser', (t) => {
  grammar.lex = lexer;
  parser = Parser(grammar);
  t.ok(parser);
  t.equal(typeof parser.parse, 'function');
  t.end();
});

test(`parse('break')`, (t) => {
  let result;
  t.doesNotThrow(() => {
    result = parser.parse('break');
  }, Error);
  t.ok(result);
  t.end();
});

test(`parse('unspecified') throws`, (t) => {
  t.throws(() => {
    parser.parse('unspecified');
  });
  t.end();
});

let parserSource;
let tmpDir;
let parserPath;

test.onFinish(() => {
  rimraf.sync(tmpDir);
});

test('parserSource', (t) => {
  parserSource = parser.generate();
  t.ok(parserSource);
  t.equal(typeof parserSource, 'string');

  fs.mkdtemp('/tmp/rtype-ebnf-', (err, dirPath) => {
    t.error(err);
    tmpDir = dirPath;

    parserPath = path.join(tmpDir, 'parser.js');
    fs.writeFileSync(parserPath, parserSource, 'utf8');
    t.end();
  });
});

test('generated parser.js', (t) => {
  const parse = require(parserPath).parse;
  t.equal(typeof parse, 'function');
  t.end();
});

