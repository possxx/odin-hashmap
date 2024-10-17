export default class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.length() >= this.capacity * this.loadFactor) {
      const currentBuckets = this.buckets;
      this.buckets = [];
      this.capacity *= 2;

      for (let i = 0; i < this.capacity / 2; i++) {
        if (currentBuckets[i]) {
          let currentNode = currentBuckets[i];

          while (currentNode !== null) {
            this.set(currentNode.key, currentNode.value);
            currentNode = currentNode.pointer;
          }
        }
      }
    }

    const hashCode = this.hash(key);
    const node = { key, value, pointer: null };

    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = node;
    } else {
      let currentNode = this.buckets[hashCode];
      let previousNode;

      while (currentNode !== null) {
        if (node.key === currentNode.key) {
          currentNode.value = node.value;
          return;
        }

        previousNode = currentNode;
        currentNode = currentNode.pointer;
      }

      previousNode.pointer = node;
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    let currentNode = this.buckets[hashCode];

    if (currentNode) {
      while (currentNode !== null) {
        if (currentNode.key === key) return currentNode.value;
        currentNode = currentNode.pointer;
      }
    }

    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    let currentNode = this.buckets[hashCode];

    if (currentNode) {
      while (currentNode !== null) {
        if (currentNode.key === key) return true;
        currentNode = currentNode.pointer;
      }
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    let currentNode = this.buckets[hashCode];

    if (currentNode) {
      let nextNode = currentNode.pointer;
      let previousNode;

      if (!nextNode) {
        this.buckets[hashCode] = nextNode;
        return true;
      }

      while (currentNode !== null) {
        if (currentNode.key === key) {
          previousNode.pointer = nextNode;
          return true;
        }
        previousNode = currentNode;
        currentNode = currentNode.pointer;
        nextNode = nextNode.pointer;
      }
    }

    return false;
  }

  length() {
    let length = 0;

    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let currentNode = this.buckets[i];

        while (currentNode !== null) {
          length += 1;
          currentNode = currentNode.pointer;
        }
      }
    }

    return length;
  }

  clear() {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let currentNode = this.buckets[i];

        while (currentNode !== null) {
          let nextNode = currentNode.pointer;
          currentNode.pointer = null;
          currentNode = nextNode;
        }

        this.buckets[i] = null;
      }
    }
  }

  keys() {
    let keys = [];

    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let currentNode = this.buckets[i];

        while (currentNode !== null) {
          keys.push(currentNode.key);
          currentNode = currentNode.pointer;
        }
      }
    }

    return keys;
  }

  values() {
    let values = [];

    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let currentNode = this.buckets[i];

        while (currentNode !== null) {
          values.push(currentNode.value);
          currentNode = currentNode.pointer;
        }
      }
    }

    return values;
  }

  entries() {
    let entries = [];

    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let currentNode = this.buckets[i];

        while (currentNode !== null) {
          entries.push([currentNode.key, currentNode.value]);
          currentNode = currentNode.pointer;
        }
      }
    }

    return entries;
  }
}
