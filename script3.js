// let arr = [0, 1, 2, 3];
// arr = new Proxy(arr, {
//   get(target, prop){
//     if(prop in target){
//       return target[prop];
//     } else{
//       return 0;
//     }},
//     set(target, prop, val) { // для перехвата записи свойства
//       if (typeof val === 'number') {
//         target[prop] = val;
//         return true;
//       } else {
//         return false;
//       }
//     }
// });
// arr.push(6);

// let dictionary = {
//   'Hello': 'Hola',
//   'Bye': 'Adiós'
// };
// let numbers = [1,2,3,4,5,6,7,8,9,0];
// dictionary = new Proxy(dictionary, {
//   get(target, phrase){
//     if(phrase in target){
//       return target[phrase];
//     } else{
//       return phrase;
//     }
//   },
//   set(target, phrase, value){
//     if(typeof(phrase) == 'string' && typeof(value) == 'string'){
//       numbers.forEach(elem =>{
//         if(phrase.includes(elem) || value.includes(elem)){
//           console.log('exit');
//           return false;
//         }
//       });
//       target[phrase] = value;
//       return true;
//     } else{
//       return false;
//     }
//   }
// });



// let descriptor = Object.getOwnPropertyDescriptors(dictionary);
// // console.log(descriptor);
// // console.log(JSON.stringify(descriptor, null, 2));
// Object.defineProperty(dictionary, "HowAreYou", {
//   enumerable: true,
//   writable: false,
//   configurable: true,
//   value: "fine"
// });
// Object.defineProperty(dictionary, "Country", {
//   enumerable:false,
//   writable: true,
//   value: "Russia"
// });

// Object.defineProperties(dictionary, {
//   name: {value: 'Ivan', enumerable: true, writable: false},
//   age: {value: '13', enumerable: true, writable: true}
// });


// Object.defineProperty(dictionary, Symbol("dog"), {
//   enumerable:true,
//   writable: true,
//   configurable: true,
//   value: "Russia"
// });
// //dictionary[dog] = "Gav";
// let names = Object.getOwnPropertyNames(dictionary);
// let symbols = Object.getOwnPropertySymbols(dictionary);
// let keys = Object.keys(dictionary);
// // console.log(`names: ${names}, все перебираемые ключи: ${keys}`);
// // console.log(symbols);

// let log = (text)=> `log: ${text}`;
// let fp = new Proxy(log, {
//   apply(target, thisArg, Args){
//     console.log(target);
//     console.log(thisArg);
//     console.log(Args);
//     return target.apply(thisArg, Args).toUpperCase();
//   }
// });

// class Person{
//   constructor(name, age){
//     this.name = name;
//     this.age = age;
//   }
// }

// const PersonProxy = new Proxy(Person, {
//   construct(target, args){
//     console.log('Construct...');
//     return new target(...args);
//   }
// });
// const p = new PersonProxy('Max', 22);

// class Animal{
//   constructor(name, age){
//     this.name = name;
//     this.age = age;
//   }
//   getName(){
//     return this.name;
//   }
//   getAge(){
//     return this.age;
//   }
// }

// const AnimalProxy = new Proxy(Animal, {
//   construct(target, args){
//     console.log('construct...');
//     return new Proxy(Reflect.construct(target, args), {
//       get(target, prop){
//         if(!(prop in target)){
//           return prop.split('_')
//             .map(elem => Reflect.get(target, elem))
//             .join(' ');
//         }
//         return Reflect.get(target, prop);
//       },
//       set(t, prop, value){
//         if(prop in t){
//           console.log('setting...');
//           Reflect.set(t, prop, value);
//         } else{
//           return false;
//         }
//       }
//     });
//   }
// });
// const cat = new AnimalProxy('cat', 2);

// let map = new Map();
// map.set('test', 1);
// map.set('testt', 2);
// map.set('test', 3);

// let proxy = new Proxy(map, {
//   get(target, prop, receiver) {
//     console.log('getting prop...');
//     let value = Reflect.get(...arguments);
//     console.dir(value);
//     return typeof value == 'function' ? value.bind(target) : value;
//   },
//   // set(target, prop, receiver){
//   //   console.log('setting in map...');
//   //   let value = Reflect.set(...arguments);
//   //   return typeof value == 'function' ? value.bind(target): value;
//   // }
// });

// proxy.set('test', 1);
// proxy.set('testt', 2);
// proxy.set('test', 3);
// console.log(proxy.get('test'));


// const withDefaultValue = (target, defaultValue = 0) => {
//   return new Proxy(target, {
//     get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
//   });
// };

// const position = withDefaultValue(
//   {
//     x: 43,
//     y: 55
//   },
//   0
// );

// //Hidden properties
// const withHiddenProps = (target, prefix = '_') => {
//   return new Proxy(target, {
  
//     has: (obj, prop) => (prop in obj && !prop.startsWith(prefix)),

//     ownKeys: (obj) => Reflect.ownKeys(obj)
//       .filter(elem => !elem.startsWith(prefix)),
    
//     get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void(0))
//   });
// };

// const data = withHiddenProps(
//   {
//     name: 'Alex',
//     age: 24,
//     _secret: '_2222'
//   }
// );

// //Optimization
// const userData = [
//   {id: 1, name: 'John', age: 24, job: 'Fullstack'},
//   {id: 2, name: 'Julia', age: 22, job: 'Junior'},
//   {id: 3, name: 'Katya', age: 21, job: 'Manager'},
//   {id: 4, name: 'Semen', age: 25, job: 'treator'}
// ];

// function User(name, age, password){
//   this.name = name;
//   this.age = age;
//   this._password = password;
// }
// let user1 = Reflect.construct(User, ['Ivan', 13, '123456abcd']);
// let user2 = new User('Ivan', 12, '123456abcd');
// console.log(user1);
// console.log(user2);

// function sum(a, b){
//   console.log(new.target);
//   return a+b;
// }
// sum(33,22);

// function Person(name, age){
//   this.name = name;
//   this.age = age;
//   console.log('obj: ' + new.target);
// }

// const person1 = new Person('ivan', 25);

// function *createGenerator(a, d){
//   yield arguments[0];
//   console.log(d);
//   yield arguments[1];
//   yield 2;
// }
// console.dir(createGenerator);
// console.log(createGenerator);
// let iterator = createGenerator(22, 33,44);
// console.dir(iterator);
// console.log(iterator);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

let j = 'jobs';
let persons = {
  name: 'Kohn',
  age: 23,
  [j]: 'fullstack',
  [Symbol.iterator]: function*() {
    for(let key in this){
      yield this[key];
    }
  },
  [Symbol('id')]: 11
};

Object.defineProperties(persons, 
  {
    'man':{
      value: 'man',
      enumerable: true,
      configurable: true
    },
    'country':{
      value: 'Russia',
      configurable: false,
      writable: false,
      enumerable: false
    }

    
  });

for(let elem in persons){
  console.log(elem);
}

let personsNames = Object.getOwnPropertyNames(persons);
console.log(personsNames);
let personsSymbols = Object.getOwnPropertySymbols(persons);
console.log(personsSymbols);
let personsKeys = Object.entries(persons);
console.log(personsKeys);