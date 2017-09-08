import { expect } from 'chai';
import TrieNode from '../scripts/TrieNode';

describe('TRIENODE', () => {
  let node;

  beforeEach(() => {
    node = new TrieNode('d')
  })

  it('should take a value', () => {
    expect(node.value).to.eql('d')
  })
})
