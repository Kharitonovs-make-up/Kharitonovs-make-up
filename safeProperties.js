// class CoffeeMachine {
//   // ...

//   constructor(power) {
//     this._power = power;
//   }

//   get power() {
//     return this._power;
//   }

// }

// // создаём кофеварку
// let coffeeMachine = new CoffeeMachine(100);

// console.log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

// //coffeeMachine.power = 25; // Error (no setter)

// let people = {
//   name: 'Ivan',
//   surname: 'Suslikov',
//   getsurName(){
//     return this.surname + ' mister';
//   }
// };

// Object.defineProperty(people, 'fullName', {
//   get (){
//     return `fullname: ${this.name} ${this.surname}`;
//   },
//   set(value){
//     [this.name, this.surname] = value.split(' ');
//   }
// });
// console.log(people.fullName);

class Animal {

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }

}

// Наследует от Animal
// class Rabbit extends Animal {
//   constructor(name, speed, age){
//     super(name, speed);
//     this.age = age;
//   }
//   hide() {
//     console.log(`${this.name} прячется!`);
//   }
// }
// class Rabbit {
//   constructor(name, speed, age){
//     this.__proto__.constructor(this, name, speed);
//     this.age = age;
//   }
//   hide() {
//     console.log(`${this.name} прячется!`);
//   }
// }
// Rabbit.__proto__ = Animal;
// Rabbit.prototype.__proto__ = Animal.prototype;

// console.log(Rabbit.__proto__ === Animal); // true

// // для обычных методов
// console.log(Rabbit.prototype.__proto__ === Animal.prototype);

// let rabbits = [
//   new Rabbit("Белый кролик", 10, 'three months'),
//   new Rabbit("Чёрный кролик", 5, 'two months')
// ];
// console.dir(Rabbit.constructor);
// //rabbits.sort(Rabbit.compare);

// rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.
// console.dir(Rabbit);

// let animal = {
//   name: "Животное",
//   eat() {         // animal.eat.[[HomeObject]] == animal
//     console.log(`${this.name} ест.`);
//   }
// };

// let rabbit = {
//   __proto__: animal,
//   name: "Кролик",
//   eat() {         // rabbit.eat.[[HomeObject]] == rabbit
//     super.eat();
//   }
// };

// let longEar = {
//   __proto__: rabbit,
//   name: "Длинноух",
//   eat() {         // longEar.eat.[[HomeObject]] == longEar
//     super.eat();
//   }
// };
// console.dir(animal.eat);
// // работает верно
// longEar.eat();  // Длинноух ест.

function A(a){
  this.varA = a;
}

// What is the purpose of including varA in the prototype when A.prototype.varA will always be shadowed by
// this.varA, given the definition of function A above?
A.prototype = {
  varA : null,  // Shouldn't we strike varA from the prototype as doing nothing?
      // perhaps intended as an optimization to allocate space in hidden classes?
      // https://developers.google.com/speed/articles/optimizing-javascript#Initializing instance variables
      // would be valid if varA wasn't being initialized uniquely for each instance
  doSomething : function(){
    console.log('prototypeA');
    // ...
  }
};

function B(a, b){
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB : {
    value: null, 
    enumerable: true, 
    configurable: true, 
    writable: true 
  },
  doSomething : { 
    value: function(){ // override
      A.prototype.doSomething.apply(this, arguments); // call super
      // ...
      console.log('prototypeB');
      return 'done';
    },
    enumerable: true,
    configurable: true, 
    writable: true
  }
});
//B.prototype.constructor = B;

var b = new B();
let result = b.doSomething();
console.log(result);