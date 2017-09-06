import { expect } from 'chai';
import Trie from '../scripts/Trie';

describe('TRIE', () => {
  let tree;

  beforeEach(() => {
    tree = new Trie()
  })

  it('should be a thing', () => {
    expect(tree).to.exist;
  })

  it('should take a word', () => {
    tree.add('david');
    expect(tree.count).to.equal(1);
  })

  it('should count words added', () => {
    tree.add('david')
    expect(tree.count).to.equal(1);
  })

  


})
