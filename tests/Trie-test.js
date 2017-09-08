import { expect } from 'chai';
import Trie from '../scripts/Trie';

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
