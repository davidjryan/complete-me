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
    const lowerCase = string.toLowerCase()
    
    //init call to addHelper
    addHelper(this, lowerCase)
  }

  suggest(string) {
    //storage of suggestions
    const allWords = [];
    const lowerCase = string.toLowerCase()

    const allWordsHelper = function(stringSoFar, tree) {
      //address all potential children
      for (let k in tree.children) {
        //assign potential child
        const child = tree.children[k]
        //concatenate children further down the tree
        let newString = stringSoFar + child.value;

        //once endWord - push word
        if (child.endWord) {
          if (child.freq) {
            allWords.unshift(newString);
          } else {
            allWords.push(newString);
          }
        }
        allWordsHelper(newString, child);
      }
    };

    const remainingTree = this.find(lowerCase, this);

    if (remainingTree) {
      allWordsHelper(lowerCase, remainingTree);
    }

    return allWords;
  }

  find(string, tree) {
    let node = tree;

    //find end node of given word
    while (string) {
      //traverse

      node = node.children[string[0]];
      //reduce
      string = string.substr(1);
    }

    return node;
  }

  populate(dictionary) {
    dictionary.forEach((currentValue) => {
      this.add(currentValue.toLowerCase());
    })
  }

  select(word) {
    const currentBranch = this.find(word, this);

    currentBranch.freq++
  }
}
