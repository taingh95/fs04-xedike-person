const lodash = require("lodash");

//isEmpty
//check xem object/array co phan tu nao k
const obj = {};
Object.keys(obj).length;
console.log("check empty normal: ", Object.keys(obj).length === 0);

console.log("check empty with lodash: ", lodash.isEmpty(obj));

// lodash.get
let obj2 = {
  item: {
    author: "abc"
  },
  type: {
    book: {
      name: "abcd"
    }
  }
};
// xu ly gi do tra ve mot result
// can lay obj2.content.attributes.id
console.log("Lay id voi lodash: ", lodash.get(obj2, "content.attribues.name"));
console.log('Normal: ', obj2.type.book.name)

//lodash .set

console.log('sau khi set:', lodash.set(obj2, 'type.book.name', 'Nha gia kim') )