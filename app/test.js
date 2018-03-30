function A(a) {
  console.log(a, 'aaaaaa');
}

A.prototype.test = function() {
  console.log('A.test');
};

class M extends A
{
  constructor(...args) {
    super(...args);
  }
}

new M(3333);
