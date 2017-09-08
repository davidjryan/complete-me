import TrieNode from './TrieNode.js';

export default class Trie extends TrieNode {
  constructor() {
    super(null);
  }

  add(string) {
    const addHelper = (node, str) => {
      //if character node doesn't exist
      if (!node.children[str[0]]) {
        //add new character node
        node.children[str[0]] = new TrieNode(str[0]);
      }
      //if end of string end of word
      if (str.length === 1) {
        node.children[str[0]].endWord = true;
        this.count++
      }
      //if string larger than 1
      if (str.length > 1) {
        //recursive call- child & "shifted" string
        addHelper(node.children[str[0]], str.slice(1));
      }
    };
    //init call to addHelper
    addHelper(this, string)
  }

  suggest(string) {
    const getRemainingTree = function(string, tree) {
      //current node
      let node = tree;
      //find end node of given word
      while (string) {
        //traverse
        node = node.children[string[0]];
        //reduce
        string = string.substr(1);
      }

      return node;
    };
    //storage of suggestions
    const allWords = [];

    const allWordsHelper = function(stringSoFar, tree) {
      //address all potential children
      for (let k in tree.children) {
        //assign potential child
        const child = tree.children[k]
        //concatenate children further down the tree
        let newString = stringSoFar + child.value;
        //once endWord - push word
        if (child.endWord) {
          allWords.push(newString);
        }
        allWordsHelper(newString, child);
      }
    };

    const remainingTree = getRemainingTree(string, this);

    if (remainingTree) {
      allWordsHelper(string, remainingTree);
    }

    return allWords;
  }

  populate(dictionary) {
    
  }
}
