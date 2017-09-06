import TrieNode from './TrieNode.js';

export default class Trie extends TrieNode {
  constructor() {
    super(null);
  }

  add(string) {
    const addHelper = (node, str) => {
      if (!node.children[str[0]]) {
        node.children[str[0]] = new TrieNode(str[0]);
        if (str.length === 1) {
          node.children[str[0]].endWord = true;
          this.count++
        }
      }

      if (str.length > 1) {
        addHelper(node.children[str[0]], str.slice(1));
      }
    };

    addHelper(this, string)
  }
}
