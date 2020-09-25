最近在看《js高级程序设计》,对象的继承问题困扰了我很久,这个问题也是面试中大概率会被问到的问题。之前试过硬背代码，到了要写的时候还是写不出来，不知其所以然。在充分了解这一块之后，来进行一些总结。

## 创建对象

在理解对象继承之前得先弄明白创建对象这回事儿。

#### 工厂模式

```
function createCar(color, passengers, brand){
    var car = new Object();
    car.color = color;
    car.passengers = color;
    car.brand = brand;
    car.outBrand = function(){
        console.log(this.brand)
    }
    return car;
}
```

工厂模式很好理解，实例化一个对象，在把传入的参数放入该对象，再返回。

缺点：无法进行对象识别。由于返回的对象都是由Objcet对象实例化出来的，但是开发过程中，需要创建很多种对象，肯定会有进行对象识别的需求，工厂模式显然无法完成我们这样的诉求。我们继续探索。

#### 构造函数模式

```
function Car(color, passengers, brand){
    this.color = color;
    this.passengers = passengers;
    this.brand = brand;
    this.outBrand = function(){
        console.log(this.brand)
    }
}
var car1 = new Car('red', ['a','b'], 'benz');
var car2 = new Car('black', ['c','d'], 'BMW');

console.log(car1 instanceof Object); //true
console.log(car1 instanceof Car);    //true
console.log(car2 instanceof Object); //true
console.log(car2 instanceof Car);    //true
```

构造函数模式能够很好的使用 instanceof 进行对象的识别，Objcet对象是所有对象的顶层对象类，所有的对象都会继承他。对对象进行操作的各类方法就存放在Object对象里面。

缺点：但是无法解决引用类型的创建问题，我们每次对Car对象进行实例化的时候，都需要对outBrand方法进行创建，无法复用，浪费内存。要解决只能把他放到全局作用域。但是在全局作用域中定义的函数一般来说只能被某个对象调用，这会让全局作用域名不副实。并且也会失去封装性，我们来想象一下，如果该对象中有很多方法，那会让全局作用域充满了单独拎出来的方法，让代码可读性变差。

#### 原型模式

```
function Car(){

}
car.prototype.color = "red";
car.prototype.passengers = ["a","b","c"];
car.prototype.brand = "benz";
car.prototype.outBrand = function () {
    console.log(this.brand)
};

var car1 = new Car();
var car2 = new Car();
car1.color = "blue";
car1.passengers('d');
console.log(car1.brand); //["a","b","c","d"]
console.log(car2.brand); //["a","b","c","d"]
console.log(car1.color); // "bule"
console.log(car2.color); // "red"
```

这个模式利用了对象的原型,将基本参数挂载在原型上面。

缺点：省去了初始化参数，这一点有好有坏。最大的问题是对引用类型值的共享，car1和car2实例在实例化以后还会与Car类存在关系。如果对其赋值基本类型值的话，会在实例化的对象当中创建，并且调用时会首先在实例化对象中寻找。而对引用类型值进行操作的时候，会直接在原型对象的引用类型值上进行操作，所以会在所有实例中共享。

#### 组合构造函数

```
function Car(color,brand){
    this.color = color;
    this.brand = brand;
    this.passengers = ["a","b","c"];
}
Car.prototype = {
    constructor: Car,
    outBrand: function () {
        console.log(this.brand)
    }
}
var car1 = new Car("red",'benz');
var car2 = new Car("blue","BMW");
car1.color = "blue";
car1.passengers('d');
console.log(car1.brand); //["a","b","c"]
console.log(car2.brand); //["a","b","c","d"]
```

每个实例都会存在一份实例的副本，并且会对方法共享，最大程度节省了内存，也提供了向构造函数中传递参数的功能

#### 创建对象总结

- 我们在使用工厂模式的时候，发现了对象识别的问题，于是使用构造函数模式去解决这个问题。
- 在使用构造函数时，发现了引用类型值创建的问题，无法对其复用。于是使用了原型模式。
- 在原型模式中，引用类型值共享的问题又出现了。于是组合构造函数模式
- 组合构造函数模式中，结合构造函数模式和对引用类型操作的良好处理和原型模式对方法的共享，达到了最佳方案。

## 继承

#### 原型链继承

```
function OldCar(){
    this.color = "red";
    this.passengers = ['a','b','c']
}
OldCar.prototype.getOldColor = function(){
    return this.color;
}
function NewCar(){
   this.newColor = "blue";
}
NewCar.prototype = new OldCar();
SubType.prototype.getNewColor = function(){
    return this.newColor;
}
var car = new newCar();
console.log(car.getOldColor); //"red"
```

原型链继承通俗易懂，利用原型链将两个类串起来。

问题：会产生引用类型值的问题。与生成对象中的原型模式一脉相承。

#### 借用构造函数

```
function OldCar(){
    this.passengers = ['a','b','c'];
}
function NewCar(){
    OldCar.call(this);
}
```

基本思路就是在子类的构造函数的内部调用超类的构造函数。因为函数只是在特定的环境中执行代码的对象。借用构造函数的方式可以解决引用类型的问题。使用call()和apply()方法，在子类中调用超类。这样每个实例都会有自己的引用类型的副本了。

缺点：和构造函数创建对象一致的问题，方法都得在构造函数中定义，导致函数无法复用，造成内存的浪费。

#### 组合继承

```
function OldCar(brand){
    this.brand = brand;
    this.passengers = ['a','b','c']
}
OldCar.prototype.getBrand = function(){
    return this.brand;
}
function NewCar(name,color){
    OldCar.call(this,name)  //第一次调用
    this.color = color;
}
NewCar.prototype = new OldCar(); //第二次调用
NewCar.prototype.constructor = NewCar; //增强
SubType.prototype.getColor = function(){
    return this.color;
}
```

组合继承集借用构造函数方法和原型链继承两者之长，复用了方法，也解决了引用类型的问题。

缺点：需要调用两次超类的构造函数，第一次是`OldCar.call(this,name)`,第二次是`new OldCar()`。下一步我们需要解决的是超类的两次调用问题。

```
function A(){

}
A.prototype.name = 'py';
A.prototype.age = 12;

<!--等价于-->
A.prototype = {
    name: 'py',
    age: 12
}
A.prototype.constructor = A

```

上面的例子中，上半部分是最基本的对原型的赋值，而下班部分的对原型的赋值A的原型的构造函数会变成Object（先new Object然后再赋值参数），所以需要显式的去增强构造函数。

#### 寄生组合继承

为了解决组合继承的痛点，出现了寄生组合继承。

```
function OldCar(brand){
    this.brand = brand;
    this.passengers = ['a','b','c']
}
OldCar.prototype.getBrand = function(){
    return this.brand;
}
function NewCar(name,color){
    OldCar.call(this,name)
    this.color = color;
}

//继承开始
var middleObj = Objcet.create(OldCar.prototype);
middleObj.constructor = NewCar;
NewCar.prototype = middleObj
//继承结束

NewCar.prototype.getColor = function(){
    return this.color;
}
```

```
function createObj(obj){
    function Car();
    Car.prototype = obj;
    return new Car();
}
Object.create() 等价于 crateObj()，相当于对传入的对象进行了一次浅复制。
```

那么，我们来看看继承的过程中发生了什么。先对超类的原型进行一次浅复制。然后将中间对象的构造函数替换为普通类。为什么要进行这一步？因为对超类的原型进行浅复制以后，中间对象的构造函数变成了Object，需要对该对象进行增强处理。最后将普通类的原型指向中间变量，这样就只需要调用一次超类就可以完成继承。

#### 继承的总结

- 在原型链继承中，我们又遇到了老对手引用类型值的共享问题。
- 在借用构造函数进行继承中，方法共享问题，这个老对手又出现了。
- 按照创建对象的经验，组合两者优点的组合继承将成为最佳方式，但是我们却发现了超类会被调用两次的问题。
- 为了解决超类被调用两次的问题，寄生组合继承成为了最佳方案。
