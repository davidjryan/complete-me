export default class TrieNode {
  constructor(value) {
    this.children = {};
    this.endWord = null;
    this.value = value;
    this.count = 0;
    this.freq = 0;
  }
}
