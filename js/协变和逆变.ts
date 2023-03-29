// ## 结构化类型
// 在 TypeScript 中，数据类型需要声明，但是结构（不同数据的组成结构）也是一种类型。TypeScript 的类型系统是结构化的，即不需要明确声明结构，只需要判断内部结构是否相同即可确定两个类型是否相同，这有点类似于鸭子类型。如果一个数据与某个结构的定义完全符合，那么我们就说这个结构就像一只鸭子。但基于名义类型的语言，如 C# 和 Java，不支持鸭子类型。
// ## 变型
// 在 TypeScript 中，子类型会继承父类型，因此辈分越低的类型具有的属性、方法等越详细。在类型系统中，**具有更多属性的类型是子类型，在集合论中，具有更少属性的集合是子集**。这涉及到协变和逆变的概念。协变表示父类型可以被赋值给子类型，逆变表示子类型可以被赋值给父类型。我们可能会关注一个类型向上转型或向下转型时可能出现的问题，但我们不必担心两个没有关联的类型或兄弟类型之间的变换。
// 变型必会导致不安全，但有些情况下的变型在带来巨大灵活性的同时，之引入了少量不安全的可能，所以类型系统往往都支持了或重或轻的变型。而在这方面，Ts 的支持是很重的。

// - 协变（covariance）：通过类型构造器后，子类型关系保留；
// - 逆变（contravariance）：通过类型构造器后，子类型关系翻转；
// - 不变（invariance）：通过类型构造器后，子类型关系消失；

// 子类型关系保留代表了，被构造后的类型，可以分配给被构造后的父类型。

// 就以这个关系结构来讨论：
// 不去关注细节，就当狗是一种动物，猫也是一种动物，它们俩则不可兼容。

// ```ts
// Animal
// / \
//  Dog Cat

// // 简单的接口定义：
// interface Animal {
// move(): void;
// }
// interface Dog extends Animal {
// woof: string;
// }
// interface Cat extends Animal {
// meow: string;
// }
// ```

// ## 从问题入手

// ```
// A ≼ B 代表A是B的子类型
// ```

// 现在有
// 女人 ≼ 人 ≼ 生物

// ```ts
// Female ≼ Human ≼ Creature
// ```

// 我现在要写一个函数 F，传入一个 `Hunan，返回一个` `Human(Human -> Human)`，那么
// 下面那个类型是 F 的子类型？或者说如果将`Human->Human` 作为高阶函数参数传入，谁会安全执行？

// 1. `Female` -> `Human` (参数更具体，返回一样)
// 2. `Creature` -> `Female` （参数更泛，返回具体）
// 3. `Female` -> `Creature` （参数更具体，返回更泛）

// ### 1: `Female` -> `Human`

// 对于这个函数的 `Female` 参数，变得比原来的更具体，那么需要考虑一种情况，`f(g)`中，调用 `g` 的 `f` 函数可能会使用 `Male`(男人)传入参数。

// ### 2: `Creature` -> `Female`

// 现在安全了，f 会使用不同的 `Human` 的子类型的变量作为参数传入 `g` 调用，而 `g` 的约束是 `Creature，所有的` `Human` 都是 Creature 的子类型，因此安全，而传出的返回值 Female 是一个更具体的类型，因此这个 `Creature->Female` 是属于 `Human->Human` 的子类型。

// ### 3：同理 1

// 相当于:
// 3->1 是 2->2 的子类型（数字越大辈分越大）、爷爷->儿子 是 父亲->父亲 的子类型

// ### 其他

// 问题：List<Dog> 能否为 List<Animal> 的子类型？

// 答案有点微妙。如果列表是不可变的（immutable），那么答案是肯定的，因为类型很安全。但是假如列表是可变的，那么答案绝对是否定的！

// 原因是，假设我需要一串 List<Animal> 而你传给我一串 List<Dog>。由于我认为我拥有的是一串 List<Animal> ，我可能会尝试往列表插入一只 Cat。那么你的 List<Dog> 里面就会有一只猫！类型系统不应该允许这种情况发生。

// 总结一下，我们可以允许不变的列表（immutable）在它的参数类型上是协变的，但是对于可变的列表（mutable），其参数类型则必须是不变的（invariant），既不是协变也不是逆变。 -->

// A->B A比B更具体，A是B的子类型
interface IAnimal {
  name: string;
  walk: () => void;
}

interface ICat {
  name: string;
  walk: () => void;
  meow: () => void;
}
class Animal implements IAnimal {
  constructor(public name: string) {}
  walk = () => console.log(this.name + "walking!");
}
class Cat implements ICat {
  constructor(public name: string) {}
  walk = () => console.log(this.name + "walking!");
  meow = () => console.log(`${this.name}+"meowwwwww~`);
}

// 协变
function Call(animal: Animal) {}
Call(new Cat("mimi")); //具体的类型可以传入到函数参数中。其中 Cat是Animal的子类型
// Cat -> Animal
// 实际上的调用时候的传入比声明函数参数的时候更加具体(往子类型的方向走); 根据这个原理 Cat -> Animal
// 协变：越变越具体
//
// ## 逆变

type CatParamFn = (cat: Cat) => void;
type AnimalParamFn = (ani: Animal) => void;

function ExcuteAnimals(fna: AnimalParamFn) {
  let animal = new Animal("dog~");
  fna(animal);
}
function ExcuteCats(fnc: CatParamFn) {
  let c = new Cat("mmm~");
  fnc(c);
}
let fnc: CatParamFn = (obj: Cat) => {
  obj.meow();
};

let fna: AnimalParamFn = (obj: Animal) => {
  obj.walk();
};

// ExcuteAnimals(fnc); 这样不行
ExcuteCats(fna); //这样却可以

// 这里我们发现，如果fnc无法作为函数参数传入到Excute中但是相反可以。
// 因此对于值类型这样的传入，函数类型在实际传入的时候会比之前的更加宽泛（越宽泛的反而是子类型 Animal->void 是 Cat->void的子类型
// 这就说是，函数在传入真正调用的时候，发生了逆变(变得更宽泛)

// 另一种说法：

class Human {
  name: string;
}
class Female extends Human {
  name: string;
  husband: Male;
}
class Male extends Human {
  name: string;
  wife: Female;
}

let xiaoming: Human = new Male();
// 这一点是毋庸置疑的。我们发现这个xiaoming在声明的时候和在实际上赋值（调用）的时候类型发生了了具体化（范围缩小） --->具体/--->辈分降低/ 这个过程叫做协变

// 如果是函数呢？
//一个女厕所
type femaleWC = (f: Female) => void;
//一个公共厕所
type humanWC = (h: Human) => void;

let wc: femaleWC = (h: Human) => {}; //ok
// let weirdWc: humanWC = (h: Female) => {
//   console.log(h.husband);
// }; //error
// 男女共用的WC不能只让女生上 ，男生也要用啊
// 其实也是因为函数的调用，实际上的传参可能会比约束更具体，所以这个humanWC参数函数中的h可能是一个Male。但是我这里却传入了Female
// 可以说我们允许一个函数类型中，返回值类型是协变的，而参数类型是逆变的。返回值类型是协变的
// 我所认为的：值类型协变，因为他们不会在之前被假定使用到。参数类型逆变，是因为参数会被函数动态调用其中的类型，如果具体化，那么可能会出现一个需要传入一个函数f（传入Animal）
// 而传入了一个(Dog)但是f在调用g函数的时候
