import { expect } from 'chai';
import Trie from '../scripts/Trie';

const fs = require('fs')
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('add', () => {
  let tree;

  beforeEach(() => {
    tree = new Trie()
    tree.add('daver')
    tree.add('dave')
  })

  it('should be a thing', () => {
    expect(tree).to.exist;
  })

  it('should take a word', () => {
    expect(tree.count).to.be.above(0);
  })

  it('should count words added', () => {
    expect(tree.count).to.equal(2);
  })
})

describe('suggest', () => {
  let tree;

  beforeEach(() => {
    tree = new Trie()
    tree.add('david')
    tree.add('daver')
    tree.add('dave')
    tree.add('davad')
    tree.add('durvur')
    tree.add('durvad')
  })

  it('should produce accurate suggestions', () => {
    expect(tree.suggest('dav')).to.eql(['david', 'dave', 'daver', 'davad'])

    expect(tree.suggest('du')).to.eql(['durvur', 'durvad'])
  })
})

describe('populate', () => {
  let tree = new Trie()

  tree.populate(dictionary)

  it('dictionary should have populated', () => {
    expect(tree.count).to.eql(235886)
  })

  it('should give accurate suggestions', () => {
    expect(tree.suggest('piz')).to.eql(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })
})

describe('select', () => {
  let tree = new Trie()

  tree.populate(dictionary)

  it('should increment frequency', () => {
    tree.select('pizza')
    expect(tree.find('pizza', tree).freq).to.eql(1)
  })

  it('should give accurate suggestions', () => {

    tree.find('pizza', tree).freq = 0;

    expect(tree.find('pizza', tree).freq).to.eql(0)
    expect(tree.suggest('piz')).to.eql(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])

    tree.select('pizza')

    expect(tree.suggest('piz')).to.eql(["pizza", "pize", "pizzeria", "pizzicato", "pizzle"])
  })
})
