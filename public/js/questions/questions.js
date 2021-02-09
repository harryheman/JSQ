export default [
  // https://github.com/lydiahallie/javascript-questions
  // 1
  {
    question: `
function sayHi() {
  console.log(name)
  console.log(age)
  var name = "John"
  let age = 30
}

sayHi()
`,
    answers: `
A: John и undefined
B: John и Error
C: Error
D: undefined и Error
`,
    rightAnswer: `D`,
    explanation: `
В функции мы сначала определяем переменную "name" с помощью ключевого слова "var". Это означает, что "name" поднимается в начало функции. "name" будет иметь значение undefined до тех пор, пока выполнение кода не дойдет до строки, где ей присваивается значение "John". Мы не определили значение "name", когда пытаемся вывести ее в консоль, поэтому получаем undefined. Переменные, объявленные с помощью ключевого слова "let" (и "const"), также поднимаются, но в отличие от переменных, объявленных с помощью ключевого слова "var", не инициализируются, т.е. такие переменные поднимаются в начало своей области видимости без присвоенного им значения. Доступ к ним до инициализации невозможен. Это называется "временной мертвой зоной". Когда мы пытаемся обратиться к переменным до их определения, JavaScript выбрасывает исключение "ReferenceError".
`
  },

  // 2
  {
    question: `
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
`,
    answers: `
A: 0 1 2 и 0 1 2
B: 0 1 2 и 3 3 3
C: 3 3 3 и 0 1 2
D: 3 3 3 и 3 3 3
`,
    rightAnswer: `C`,
    explanation: `
Из-за очереди событий в JavaScript колбэк функции "setTimeout" выполняется после освобождения стека вызовов. Так как переменная "i" в первом цикле определяется с помощью ключевого слова "var", она является глобальной. В цикле мы каждый раз увеличиваем значение "i" на 1, используя оператор "++". К моменту выполнения колбэка "setTimeout" в первом примере значение "i" равняется 3. Во втором цикле переменная "i" определяется с помощью ключевого слова "let". Такие переменные (а также переменные, объявленные с помощью ключевого слова "const") имеют блочную область видимости (блок - это код внутри фигурных скобок ({})). На каждой итерации "i" будет иметь новое значение, и это значение будет замкнуто в области видимости внутри цикла.
`
  },

  // 3
  {
    question: `
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

console.log(shape.diameter())
console.log(shape.perimeter())
`,
    answers: `
A: 20 и 62.83185307179586
B: 20 и NaN
C: 20 и 63
D: NaN и 63
`,
    rightAnswer: `B`,
    explanation: `
Обратите внимание, что "diameter" - это обычная функция, а "perimeter" - стрелочная. У стрелочных функций, в отличие от обычных, значение "this" указывает на лексическое окружение. Это значит, что при вызове метода "perimeter" его "this" указывает не на объект "shape", а на внешнюю область видимости (глобальный объект "window"). У этого объекта нет свойства "radius", поэтому возвращается undefined.
`
  },

  // 4
  {
    question: `
console.log(+true)
console.log(!"John")
`,
    answers: `
A: 1 и false
B: 0 и true
C: false и NaN
D: false и false
`,
    rightAnswer: `A`,
    explanation: `
Унарный плюс (+) приводит операнд к числу. true - это 1, а false - 0. Строка "John" - это истинное значение. Мы спрашиваем, является ли это значение ложным? Ответ: false.
`
  },

  // 5
  {
    question: `
let c = { greeting: "Hey!" }
let d

d = c
c.greeting = "Hello!"
console.log(d.greeting)
`,
    answers: `
A: Hello!
B: Hey!
C: undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
В JavaScript все объекты являются "ссылочными" типами данных, т.е. значения объектов передаются по ссылке. Сначала в переменной "c" создается ссылка на объект. Затем мы указываем переменной "d" ссылаться на тот же объект, что и объект "c". При изменении объекта меняются значения всех указывающих на него ссылок.
`
  },

  // 6
  {
    question: `
let a = 3
let b = new Number(3)
let c = 3

console.log(a == b)
console.log(a === b)
console.log(b === c)
`,
    answers: `
A: true false true
B: false false true
C: true false false
D: false true true
`,
    rightAnswer: `C`,
    explanation: `
new Number() - это встроенная функция-конструктор. И хотя она выглядит как число, это не настоящее число: у него имеется ряд дополнительных возможностей. На самом деле, это объект. Оператор "==" (абстрактное равенство) разрешает преобразование типов данных, он проверяет равенство значений. Оба значения равны 3, поэтому возвращается true. При использовании оператора "===" (строговое равенство) должны совпадать не только значения, но и типы данных. В данном случае это не так: "new Number()" - это не число, а объект. Поэтому два последних сравнения возвращают false.
`
  },

  // 7
  {
    question: `
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: "pink" })
freddie.colorChange("orange")
`,
    answers: `
A: orange
B: pink
C: green
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Метод "colorChange" является статическим. Такие методы не имеют доступа к экземплярам класса. Так как "freddie" - это экземпляр, статический метод в нем не доступен. Поэтому выбрасывается исключение "TypeError".
`
  },

  // 8
  {
    question: `
// код выполняется в нестрогом режиме
let greeting
greetign = {} // опечатка!
console.log(greetign)
`,
    answers: `
A: {}
B: Error
C: undefined
D: ""
`,
    rightAnswer: `A`,
    explanation: `
С помощью выражения "greetign = {}" мы создаем новый глобальный пустой объект, который и выводится в консоль. Когда мы вместо "greeting" написали "greetign", интерпретатор выполнил "global.greetign = {}" в Node.js (или "window.greetign = {}" в браузере). В строгом режиме ("use strict") будет выброшено исключение "ReferenceError: greetign is not defined".
`
  },

  // 9
  {
    question: `
function bark() {
  console.log("Woof!")
}

bark.animal = "dog"

console.log(bark.animal)
`,
    answers: `
A: dog
B: Error
C: undefined
D: ""
`,
    rightAnswer: `A`,
    explanation: `
В JavaScript такое возможно, т.к. функции - это тоже объекты. Точнее, функция — это специальный тип объекта, который можно вызывать. Кроме того, функция — это объект со свойствами. Свойства такого объекта нельзя вызывать, поскольку они не являются функциями.
`
  },

  // 10
  {
    question: `
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const person = new Person("John", "Smith")
Person.getFullName = function () {
  return \`&#36;{this.firstName} &#36;{this.lastName}\`
}

console.log(person.getFullName())
`,
    answers: `
A: Error
B: ""
C: John Smith
D: undefined undefined
`,
    rightAnswer: `A`,
    explanation: `
Нельзя добавлять свойства к конструктору как к обычному объекту. Если необходимо добавить свойство или метод всем экземплярам, то следует использовать прототипы. В данном случае выражение "Person.prototype.getFullName = function () { return \`&#36;{this.firstName} &#36;{this.lastName}\` }" сделает метод "getFullName" рабочим. В чем тут преимущество? Предположим, что мы добавили этот метод к конструктору. Возможно, не каждому экземпляру класса "Person" он нужен. Это приведет к ненужному расходованию памяти, т.к. все экземпляры будут иметь указанный метод. Напротив, если мы добавим данный метод к прототипу, у нас будет только одно место в памяти, к которому смогут обращаться все экземпляры. Такие методы называются совместными или распределенными.
`
  },

  // 11
  {
    question: `
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const john = new Person("John", "Smith")
const jane = Person("Jane", "Air")

console.log(john)
console.log(jane)
`,
    answers: `
A: Person {firstName: "John", lastName: "Smith"} и undefined
B: Person {firstName: "John", lastName: "Smith"} и Person {firstName: "Jane", lastName: "Air"}
C: Person {firstName: "John", lastName: "Smith"} и {}
D: Person {firstName: "Smith", lastName: "Smith"} и Error
`,
    rightAnswer: `A`,
    explanation: `
Мы создаем объект "jane" без ключевого слова "new". Использование "new" приводит к созданию нового объекта (экземпляра). Без "new" создается глобальный объект. Мы указали, что "this.firstName" равняется "Jane" и "this.lastName" равняется "Air". На самом деле, мы определили "global.firstName = 'Jane'" и "global.lastName = 'Air'". Значением "jane" является undefined, поскольку мы не возвращаем значение из функции "Person".
`
  },

  // 12
  {
    question: `
function sum(a, b) {
  return a + b
}

console.log(sum(1, "2"))
`,
    answers: `
A: NaN
B: Error
C: "12"
D: 3
`,
    rightAnswer: `C`,
    explanation: `
JavaScript - это динамически типизированный язык (язык со слабой типизацией): мы не определяем тип данных при объявлении переменных (для этого был придуман TypeScript). Значения переменных могут быть автоматически преобразованы из одного типа в другой без нашего ведома, что называется "неявным приведением типов". Приведение - это преобразование данных из одного типа в другой. В рассматриваемом примере JavaScript конвертировал число 1 в строку, чтобы операция имела смысл и вернула хоть какое-то значение. При сложении числа (1) и строки ("2") число преобразуется в строку. Мы можем объединять строки так: "Hello" + "World". Это называется конкатенацией. Таким образом, 1 + "2" возвращает "12".
`
  },

  // 13
  {
    question: `
let number = 0
console.log(number++)
console.log(++number)
console.log(number)
`,
    answers: `
A: 1 1 2
B: 1 2 2
C: 0 2 2
D: 0 1 2
`,
    rightAnswer: `C`,
    explanation: `
Постфиксный оператор "++":<br>
Возвращает значение (0)<br>
Увеличивает (инкрементирует) значение (теперь переменная "number" имеет значение 1)<br>
Префиксный оператор "++":<br>
Инкрементирует значение (теперь number = 2)<br>
Возвращает значение (2)<br>
Результат: 0 2 2.
`
  },

  // 14
  {
    question: `
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = "John"
const age = 30

getPersonInfo\`&#36;{person} is &#36;{age} years old\`
`,
    answers: `
A: John 30 ["", " is ", " years old"]
B: ["", " is ", " years old"] John 30
C: John ["", " is ", " years old"] 30
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
При использовании тегированных шаблонных литералов (tagged template literals) первым значением, возвращаемым функцией, является массив строк. Прочими значениями являются значения, переданные функции в качестве аргументов.
`
  },

  // 15
  {
    question: `
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("Ты взрослый!")
  } else if (data == { age: 18 }) {
    console.log("Ты по-прежнему взрослый.")
  } else {
    console.log("Хм... У тебя что, нет возраста?")
  }
}

checkAge({ age: 18 })
`,
    answers: `
A: Ты взрослый!
B: Ты по-прежнему взрослый.
C: Хм... У тебя что, нет возраста?
D: undefined
`,
    rightAnswer: `C`,
    explanation: `
В операциях сравнения примитивы сравниваются по значениям, а объекты - по ссылкам. JavaScript проверяет, чтобы объекты указывали на одну и ту же область памяти. Сравниваемые объекты в приведенном примере не такие: объект, переданный в качестве аргумента, указывает на другое место в памяти, нежели объекты, используемые в сравнениях. Поэтому выражения "{ age: 18 } === { age: 18 }" и "{ age: 18 } == { age: 18 }" возвращают false.
`
  },

  // 16
  {
    question: `
function getAge(...args) {
  console.log(typeof args)
}

getAge(30)
`,
    answers: `
A: number
B: array
C: object
D: NaN
`,
    rightAnswer: `C`,
    explanation: `
Оператор распространения или расширения (spread, ...) возвращает массив с аргументами, переданными функции. Массив - это объект, поэтому выражение "typeof args" возвращает "object".
`
  },

  // 17
  {
    question: `
function getAge() {
  "use strict"
  age = 30
  console.log(age)
}

getAge()
`,
    answers: `
A: 30
B: undefined
C: Error
D: NaN
`,
    rightAnswer: `C`,
    explanation: `
"use strict", среди прочего, позволяет предотвратить случайное объявление глобальных переменных. Мы не объявляли переменную "age", поэтому (в строгом режиме) выбрасывается исключение "ReferenceError". В нестрогом режиме ошибки не возникнет, а переменная "age" станет свойством глобального объекта.
`
  },

  // 18
  {
    question: `
const sum = eval("10*10+5")

console.log(sum)
`,
    answers: `
A: 105
B: "105"
C: Error
D: "10*10+5"
`,
    rightAnswer: `A`,
    explanation: `
Функция "eval" выполняет код, переданный ей в виде строки. Если это выражение (как в данном случае), то оно вычисляется (оценивается). Выражение "10 * 10 + 5" возвращает число 105. Использовать "eval" не рекомендуется по причинам безопасности.
`
  },

  // 19
  {
    question: `
var num = 8
var num = 10

console.log(num)
`,
    answers: `
A: 8
B: 10
C: undefined
D: Error
`,
    rightAnswer: `B`,
    explanation: `
С помощью ключевого слова "var" можно определять любое количество одноименных переменных. Переменная будет хранить последнее присвоенное ей значение. Однако, такой трюк нельзя проделать с "let" и "const", т.к. переменные, объявленные с помощью этих ключевых слов, имеют блочную область видимости.
`
  },

  // 20
  {
    question: `
const obj = { 1: "a", 2: "b", 3: "c" }
const set = new Set([1, 2, 3, 4, 5])

console.log(obj.hasOwnProperty("1"))
console.log(obj.hasOwnProperty(1))
console.log(set.has("1"))
console.log(set.has(1))
`,
    answers: `
A: false true false true
B: false true true true
C: true true false true
D: true true true true
`,
    rightAnswer: `C`,
    explanation: `
Ключи объектов (кроме Symbol) являются строками, даже если заданы не в виде строк (например, индексы в массиве). Поэтому выражение "obj.hasOwnProperty('1')" также возвращает true. Однако, это не работает применительно к "Set". Значение "1" отсутствует в "set": "set.has('1')" возвращает false, а "set.has(1)" - true.
`
  },

  // 30
  {
    question: `
const obj = { a: "one", b: "two", a: "three" }
console.log(obj)
`,
    answers: `
A: { a: "one", b: "two" }
B: { b: "two", a: "three" }
C: { a: "three", b: "two" }
D: Error
`,
    rightAnswer: `C`,
    explanation: `
Если имеется два ключа с одинаковыми именами, то ключ перезаписывается. Его позиция сохраняется, а значением является последнее из присвоенных.
`
  },

  // 22
  {
    question: `
for (let i = 1; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
`,
    answers: `
A: 1 2
B: 1 2 3
C: 1 2 4
D: 1 3 4
`,
    rightAnswer: `C`,
    explanation: `
Оператор "continue" пропускает итерацию (цикл), если условие удовлетворяется (является истинным).
`
  },

  // 23
  {
    question: `
String.prototype.giveMePizza = () => {
  return "Give me pizza!"
}

const name = "John"

console.log(name.giveMePizza())
`,
    answers: `
A: Give me pizza!
B: Error
C: ""
D: undefined
`,
    rightAnswer: `A`,
    explanation: `
"String" - это встроенный конструктор, к которому можно добавлять новые свойства. Мы добавили метод "giveMePizza" к его прототипу. Строки-примитивы автоматически конвертируются (преобразуются) в строки-объекты (благодаря объектной обертке). Поэтому все строки (объекты) имеют доступ к указанному методу.
`
  },

  // 24
  {
    question: `
const a = {}
const b = { key: "b" }
const c = { key: "c" }

a[b] = 123
a[c] = 456

console.log(a[b])
`,
    answers: `
A: 123
B: 456
C: undefined
D: Error
`,
    rightAnswer: `B`,
    explanation: `
Ключи объекта (кроме Symbol) автоматически преобразуются в строки (даже индексы в массиве). Мы пытаемся добавить объект в качестве ключа со значением "123" к объекту "a". Однако, когда мы приводим объект к строке, он превращается в "[object Object]". Таким образом, мы говорим, что a["object Object"] = 123. Затем мы повторяем процедуру. "c" - это другой объект, который мы также неявно приводим к строке. Поэтому a["object Object"] = 456. Наконец, когда мы выводим "a[b]" в консоль, мы на самом деле обращаемся к a["object Object"]. Поэтому в консоль выводится 456.
`
  },

  // 25
  {
    question: `
const foo = () => console.log("first")
const bar = () => setTimeout(() => console.log("second"))
const baz = () => console.log("third")

bar()
foo()
baz()
`,
    answers: `
A: first second third
B: first third second
C: second first third
D: second third first
`,
    rightAnswer: `B`,
    explanation: `
Сначала мы вызываем функцию "setTimeout". Однако, ее колбэк выполняется последним. Это происходит из-за того, что в браузерах у нас имеется не только движок для запуска (выполнения) кода, но и WebAPI. WebAPI предоставляет нам функцию "setTimeout" и некоторые другие возможности. Например, DOM. После того, как "setTimeout" отправляется в WebAPI, функция "bar" удаляется из стека вызовов (call stack). После этого вызывается функция "foo", и "first" выводится в консоль. "foo" удаляется из стека и вызывается функция "baz". "third" выводится в консоль. WebAPI отправляет функцию обратного вызова "setTimeout" в очередь событий (task queue, второе слово читается как "кью"). Цикл событий (event loop) проверяет стек вызовов и очередь задач. Если стек оказывается пустым, то в него помещается первый элемент из очереди. Вызывается функция "bar" и в консоль выводится "second".
`
  },

  // 26
  {
    question: `
&lt;div onclick="console.log('div')">
  &lt;p onclick="console.log('p')">
    Нажми меня!
  &lt;/p>
&lt;/div>
`,
    answers: `
A: p div
B: div p
C: p
D: div
`,
    rightAnswer: `A`,
    explanation: `
После клика по элементу "p" в консоль будет выведено "p" и "div". Поток события (распространение события) имеет три фазы: захват, цель и всплытие. По умолчанию обработчики событий выполняются на фазе всплытия (если не установлен параметр "useCapture" со значением true). Всплытие идет от самого глубоко вложенного элемента до самого внешнего.
`
  },

  // 27
  {
    question: `
const person = { name: "John" }

function sayHi(age) {
  console.log(\`&#36;{this.name} is &#36;{age}\`)
}

sayHi.call(person, 30)
sayHi.bind(person, 30)
`,
    answers: `
A: undefined is 30 и John is 30
B: function и function
C: John is 30 и John is 30
D: John is 30 и function
`,
    rightAnswer: `D`,
    explanation: `
В обоих случаях мы передаем объект, на который будет указывать "this". Но метод "call" выполняется сразу, а метод "bind" возвращает копию функции с привязанным контекстом. Эту функцию следует вызывать отдельно или можно сделать так: "sayHi.bind(person, 30)()".
`
  },

  // 28
  {
    question: `
function sayHi() {
  return (() => 0)()
}

console.log(typeof sayHi())
`,
    answers: `
A: object
B: number
C: function
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Функция "sayHi" возвращает значение немедленно вызываемого функционального выражения (Immediately Invoked Function Expression, IIFE). Результатом является число 0 типа "number". Для информации: в JavaScript имеется 8 встроенных типов данных: string, number, bigint, boolean, null, undefined, object и symbol. "function" не является отдельным типом, функции - это объекты.
`
  },

  // 29
  {
    question: `
console.log(typeof typeof 1)
`,
    answers: `
A: number
B: string
C: object
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Выражение "typeof 1" возвращает "number". Выражение "typeof number" возвращает "string".
`
  },

  // 30
  {
    question: `
const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers)
`,
    answers: `
A: [1, 2, 3, 7 x null, 11]
B: [1, 2, 3, 11]
C: [1, 2, 3, 7 x empty, 11]
D: Error
`,
    rightAnswer: `C`,
    explanation: `
Когда в массив добавляется значение, которое выходит за пределы длины массива, JavaScript создает "пустые ячейки". На самом деле они имеют значение undefined, но в консоль выводятся как "[1, 2, 3, 7 x empty, 11]" (зависит от среды выполнения кода, от браузера).
`
  },

  // 31
  {
    question: `
(() => {
  let x, y
  try {
    throw new Error()
  } catch (x) {
    (x = 1), (y = 2)
    console.log(x)
  }
  console.log(x)
  console.log(y)
})()
`,
    answers: `
A: 1 undefined 2
B: undefined undefined undefined
C: 1 1 2
D: 1 undefined undefined
`,
    rightAnswer: `A`,
    explanation: `
Блок "catch" принимает параметр "x". Это не тот "x", который объявлен перед блоком "try". Мы присваиваем этому аргументу значение 1, а переменной "y" - 2. После этого мы выводим в консоль значение "x", т.е. 1. За пределами catch "x" все еще имеет значение undefined, а "y" - 2. Когда мы вызываем "console.log(x)" за пределами блока "catch", возвращается undefined, а "console.log(y)" возвращает 2.
`
  },

  // 32
  {
    question: `
const result =
  [[0, 1], [2, 3]].reduce(
    (acc, cur) => {
      return acc.concat(cur)
    },
    [1, 2]
  )

console.log(result)
`,
    answers: `
A: [0, 1, 2, 3, 1, 2]
B: [6, 1, 2]
C: [1, 2, 0, 1, 2, 3]
D: [1, 2, 6]
`,
    rightAnswer: `C`,
    explanation: `
[1, 2] - начальное значение переменной "acc". После первого прохода "acc" равняется [1, 2], а "cur" - [0, 1]. После конкатенации (объединения) "acc" равняется [1, 2, 0, 1], а "cur" - [2, 3]. После их объединения, мы получаем [1, 2, 0, 1, 2, 3].
`
  },

  // 33
  {
    question: `
console.log(!!null)
console.log(!!"")
console.log(!!1)
`,
    answers: `
A: false true false
B: false false true
C: false true true
D: true true false
`,
    rightAnswer: `B`,
    explanation: `
null - false. !null возвращает true. !true возвращает false.<br>
"" - false. !"" возвращает true. !true возвращает false.<br>
1 - true. !1 возвращает false. !false возвращает true.
`
  },

  // 34
  {
    question: `
console.log([..."John"])
`,
    answers: `
A: ["J", "o", "h", "n"]
B: ["John"]
C: [[], "John"]
D: [["J", "o", "h", "n"]]
`,
    rightAnswer: `A`,
    explanation: `
Строка является итерируемой (перебираемой) сущностью. Оператор распространения или расширения (spread, ...) преобразует строку в массив, состоящий из символов этой строки.
`
  },

  // 35
  {
    question: `
function* generator(i) {
  yield i
  yield i * 2
}

const gen = generator(10)

console.log(gen.next().value)
console.log(gen.next().value)
`,
    answers: `
A: [0, 10] и [10, 20]
B: 20 и 20
C: 10 и 20
D: 0, 10 и 10, 20
`,
    rightAnswer: `C`,
    explanation: `
Выполнение обычных функций не может быть остановлено после их запуска. Однако, генераторы можно останавливать в процессе выполнения, а затем продолжать с места остановки. Каждый раз, когда в функции-генераторе встречается ключевое слово "yield", функция возвращает значение, указанное после него. Обратите внимание, что в генераторе вместо "return" используется "yield". Сначала мы инициализируем генератор с "i" равным 10. Мы вызываем генератор, используя метод "next". Когда мы в первый раз вызываем генератор, "i" равняется 10. Движок JavaScript встречает первое ключевое слово "yield" и возвращает значение "i". После этого выполнение функции приостанавливается и 10 выводится в консоль. Затем мы снова вызываем функцию посредством "next()". Она запускается с того места, где остановилась, с "i" равным 10. Движок встречает следующее ключевое слово "yield" и возвращает "i * 2". "i" равно 10, поэтому возвращается 20.
`
  },

  // 36
  {
    question: `
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one")
})

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two")
})

Promise.race([firstPromise, secondPromise]).then(res => console.log(res))
`,
    answers: `
A: one
B: two
C: two one
D: one two
`,
    rightAnswer: `B`,
    explanation: `
Когда мы передаем несколько промисов методу "race", он возвращает первый разрешенный (выполненный или отклоненный) промис. В метод "setTimeout" мы передаем задержку в 500 мс для первого промиса и в 100 мс для второго. Это означает, что "secondPromise" разрешается первым со значением "two". Переменная "res" имеет значение "two", которое и выводится в консоль.
`
  },

  // 37
  {
    question: `
let person = { name: "John" }
const members = [person]
person = null

console.log(members)
`,
    answers: `
A: null
B: [null]
C: [{}]
D: [{ name: "John" }]
`,
    rightAnswer: `D`,
    explanation: `
Сначала мы объявляем переменную "person" со значением объекта, содержащего свойство "name". Затем мы объявляем переменную "members". Мы делаем первый элемент этого массива равным [person]. Объекты взаимодействуют посредством ссылок при установке их равными друг другу. Когда мы назначаем ссылку из одной переменной в другую, создается копия этой ссылки (обратите внимание, что у этих переменных не одинаковые ссылки). Затем мы присваиваем переменной "person" значение null. Мы изменили только значение "person", а не первый элемент массива, поскольку этот элемент имеет другую (скопированную) ссылку на объект. Первый элемент в "members" по-прежнему содержит ссылку на исходный объект. Когда мы выводим в консоль массив "members", первый элемент этого массива содержит значение объекта, который и выводится в консоль.
`
  },

  // 38
  {
    question: `
const person = {
  name: "John",
  age: 30
}

for (const item in person) {
  console.log(item)
}
`,
    answers: `
A: { name: "John" } и { age: 30 }
B: name и age
C: John и 30
D: ["name", "John"] и ["age", 30]
`,
    rightAnswer: `B`,
    explanation: `
С помощью цикла "for..in" мы перебираем ключи объекта, в данном случае "name" и "age". Ключи объекта (кроме Symbol) являются строками. В каждом цикле мы устанавливаем значение "item" равным текущему ключу, по которому он перебирается. Сначала "item" равен "name", и выводится в консоль. Затем "item" равен "age", который также выводится в консоль.
`
  },

  // 39
  {
    question: `
console.log(3 + 4 + "5")
`,
    answers: `
A: "345"
B: "75"
C: 12
D: "12"
`,
    rightAnswer: `B`,
    explanation: `
Ассоциативность операторов - это порядок оценивания выражения движком JavaScript, слева направо или справа налево. Это происходит только в том случае, если все операторы имеют одинаковый приоритет. У нас есть только один тип оператора: +. Ассоциативность - слева направо. 3 + 4 оценивается первым. Это приводит к числу 7. 7 + "5" приводит к "75" из-за неявного приведения типов. JavaScript преобразует число 7 в строку. Мы можем объединять (конкатенировать) две строки с помощью оператор "+". Выражение "'7' + '5'" возвращает "75".
`
  },

  // 40
  {
    question: `
const num = parseInt("7*6", 10)

console.log(num)
`,
    answers: `
A: 42
B: "42"
C: 7
D: NaN
`,
    rightAnswer: `C`,
    explanation: `
Функция "parseInt" проверяет, являются ли символы в строке допустимыми с точки зрения используемой системы счисления (второй необязательный аргумент). Как только встречается недопустимый символ, синтаксический анализ строки прекращается и последующие символы игнорируются. "*" является недопустимым числом. Поэтому parseInt прекращает разбор строки и возвращает 7.
`
  },

  // 41
  {
    question: `
const result =
  [1, 2, 3].map(num => {
    if (typeof num === "number") return
    return num * 2
  })

console.log(result)
`,
    answers: `
A: []
B: [null, null, null]
C: [undefined, undefined, undefined]
D: [ 3 x empty ]
`,
    rightAnswer: `C`,
    explanation: `
Метод "map" возвращает новый массив с обработанными каким-то образом с помощью функции обратного вызова элементами исходного массива. В данном случае элементы исходного массива являются числами, поэтому условие "if typeof num === 'number'" удовлетворяется. После этого выполнение функции останавливается, в новый массив попадает значение переменной "num", равное undefined.
`
  },

  // 43
  {
    question: `
function greeting() {
  throw "Всем привет!"
}

function sayHi() {
  try {
    const data = greeting()
    console.log("Работает!", data)
  } catch (error) {
    console.log("Ошибка: ", error)
  }
}

sayHi()
`,
    answers: `
A: Работает! Всем привет!
B: Ошибка: undefined
C: Error
D: Ошибка: Всем привет!
`,
    rightAnswer: `D`,
    explanation: `
С помощью оператора "throw" мы можем создавать собственные ошибки. Другими словами, с помощью этого оператора мы можем генерировать пользовательские исключения. Исключением может быть строка, число, логическое значение или объект. В данном случае, исключением является строка "Всем привет!". С помощью оператора "catch" мы можем указать, что делать, если в блоке "try" возникла ошибка. Исключение - "Всем привет!". "error" равняется этой строке. Это приводит к "Ошибка: Всем привет!".
`
  },

  // 44
  {
    question: `
function Car() {
  this.make = "Lamborghini"
  return { make: "Maserati" }
}

const myCar = new Car()
console.log(myCar.make)
`,
    answers: `
A: Lamborghini
B: Maserati
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Когда возвращается свойство, его значение равняется возвращаемому значению, а не значению, установленному в функции-конструкторе. Мы возвращаем строку "Maserati", поэтому значением "myCar.make" является "Maserati".
`
  },

  // 45
  {
    question: `
(() => {
  let x = (y = 10)
})()

console.log(typeof x)
console.log(typeof y)
`,
    answers: `
A: undefined и number
B: number и number
C: object и number
D: number и undefined
`,
    rightAnswer: `A`,
    explanation: `
Выражение "let x = y = 10" на самом деле является сокращением для: "y = 10; let x = y". Когда мы устанавливаем "y" равным 10, мы фактически добавляем свойство "y" к глобальному объекту ("window" в браузере, "global" в Node.js). В браузере "window.y" теперь равняется 10. Затем мы объявляем переменную "x" со значением "y". Переменные, объявленные с помощью ключевого слова "let" (и "const"), имеют блочную область видимости, они доступны только в блоке, в котором объявлены. Таким блоком, в данном случае, является немедленно вызываемое функциональное выражение (Immediately Invoked Function Expression, IIFE). Когда мы используем оператор "typeof", операнд "x" не определен: мы пытаемся получить доступ к "x" вне блока, в котором он объявлен. Это означает, что "x" имеет значение undefined. Переменные, которым не присвоено значение, имеют значение undefined по умолчанию. Выражение "console.log(typeof x)" возвращает undefined. Однако, мы создали глобальную переменную "y", присвоив ей значение 10. Это значение доступно в любом месте кода. "y" определена и содержит значение типа "number". Поэтому выражение "console.log(typeof y)" возвращает "number".
`
  },

  // 46
  {
    question: `
class Dog {
  constructor(name) {
    this.name = name
  }
}

Dog.prototype.bark = function() {
  console.log(\`Woof I am &#36;{this.name}\`)
}

const pet = new Dog("Rex")

pet.bark()

delete Dog.prototype.bark

pet.bark()
`,
    answers: `
A: "Woof I am Rex" и ""
B: "Woof I am Rex" и "Woof I am Rex"
C: "Woof I am Rex" и undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Оператор "delete" позволяет удалять свойства объектов, включая свойства прототипов. Удаленное свойство прототипа становится недоступным в цепочке прототипов. Другими словами, функция "bark" после "delete Dog.prototype.bark" становится недоступной, однако мы все же пытаемся получить к ней доступ. Когда мы пытаемся вызвать нечто, не являющееся функцией, выбрасывается исключение "TypeError". В данном случае "TypeError: pet.bark is not a function", поскольку значением свойства "bark" объекта "pet" является undefined.
`
  },

  // 47
  {
    question: `
const set = new Set([1, 1, 2, 3, 4])

console.log(set)
`,
    answers: `
A: [1, 1, 2, 3, 4]
B: [1, 2, 3, 4]
C: {1, 1, 2, 3, 4}
D: {1, 2, 3, 4}
`,
    rightAnswer: `D`,
    explanation: `
Объект "Set" является коллекцией уникальных значений. Мы передаем массив [1, 1, 2, 3, 4] с повторяющимся значением "1". Поскольку в "Set" не может быть двух одинаковых значений, одно из них удаляется. Это приводит к {1, 2, 3, 4}.
`
  },

  // 48
  {
    question: `
// counter.js
let counter = 10
export default counter

// index.js
import myCounter from "./counter.js"

myCounter += 1

console.log(myCounter)
`,
    answers: `
A: 10
B: 11
C: Error
D: NaN
`,
    rightAnswer: `C`,
    explanation: `
Импортируемый модуль доступен только для чтения: мы не можем его изменять. Это можно сделать только перед экспортом. Когда мы пытаемся увеличить значение переменной "myCounter", возникает ошибка: "myCounter доступен только для чтения и не может быть изменен".
`
  },

  // 49
  {
    question: `
const name = "John"
age = 30

console.log(delete name)
console.log(delete age)
`,
    answers: `
A: false и true
B: John и 30
C: true и true
D: undefined и undefined
`,
    rightAnswer: `A`,
    explanation: `
Оператор "delete" возвращает логическое значение: true при успешном удалении, иначе false. Однако, переменные, объявленные с помощью ключевых слов, не могут быть удалены с помощью "delete". Переменная "name" была объявлена ​​с помощью ключевого слова "const", поэтому возвращается false. Когда мы устанавливаем переменную "age" равной 30, мы фактически добавляем свойство "age" к глобальному объекту ("window.age" в браузере, "global.age" в Node.js). Свойства объектов, включая глобальный, удалять можно, поэтому выражение "delete age" возвращает true.
`
  },

  // 50
  {
    question: `
const numbers = [1, 2, 3, 4, 5]
const [y] = numbers

console.log(y)
`,
    answers: `
A: [[1, 2, 3, 4, 5]]
B: [1, 2, 3, 4, 5]
C: 1
D: [1]
`,
    rightAnswer: `C`,
    explanation: `
Мы можем распаковывать элементы из массивов или свойства из объектов путем деструктуризации. Например:<br>
[a, b] = [1, 2]<br>
Значение "a" теперь равно 1, а значение "b" - 2. Что мы на самом деле сделали в приведенном примере, так это:<br>
[y] = [1, 2, 3, 4, 5]<br>
Это означает, что "y" равняется первому элементу массива, которым является число 1. Поэтому в консоль выводится 1.
`
  },

  // 51
  {
    question: `
const user = { name: "John", age: 30 }
const admin = { admin: true, ...user }

console.log(admin)
`,
    answers: `
A: { admin: true, user: { name: "John", age: 30 } }
B: { admin: true, name: "John", age: 30 }
C: { admin: true, user: [John, 30] }
D: { admin: true }
`,
    rightAnswer: `B`,
    explanation: `
Оператор распространения или расширения (spread, ...) позволяет объединять объекты. Это позволяет создавать копии пар ключ/значение одного объекта и добавлять их в другой объект. В данном случае, мы создаем копию объекта "user" и добавляем ее в объект "admin". Объект "admin" содержит скопированные пары ключ/значение, что приводит к "{admin: true, name: 'John', age: 30}".
`
  },

  // 52
  {
    question: `
const person = { name: "John" }

Object.defineProperty(person, "age", { value: 30 })

console.log(person)
console.log(Object.keys(person))
`,
    answers: `
A: { name: "John", age: 30 } и ["name", "age"]
B: { name: "John", age: 30 } и ["name"]
C: { name: "John"} и ["name", "age"]
D: { name: "John"} и ["age"]
`,
    rightAnswer: `B`,
    explanation: `
С помощью метода "defineProperty" мы можем добавлять новые свойства к объекту или менять существующие. Когда мы добавляем свойство к объекту с помощью "defineProperty()", они по умолчанию являются не перечисляемыми. Метод "keys" возвращает все перечисляемые свойства объекта, в данном случае, только "name". Свойства, добавленные с помощью "defineProperty()", по умолчанию также иммутабельны (неизменяемы). Это поведение можно переопределить, используя свойства "writable", "configurable" и "enumerable". Таким образом, метод "defineProperty" позволяет осуществлять тонкую настройку свойств, добавляемых к объекту.
`
  },

  // 53
  {
    question: `
const settings = {
  username: "johnsmith",
  level: 19,
  health: 88
}

const data = JSON.stringify(settings, ["level", "health"])
console.log(data)
`,
    answers: `
A: {"level": 19, "health": 88}
B: {"username": "johnsmith"}
C: ["level", "health"]
D: {"username": "johnsmith", "level": 19, "health": 88}
`,
    rightAnswer: `A`,
    explanation: `
Второй аргумент "JSON.stringify()" - это заменитель (replacer). Заменитель может быть либо функцией, либо массивом, и позволяет контролировать, что и как должно быть преобразовано в значения. Если заменитель является массивом, только свойства, указанные в нем, будут добавлены в JSON-строку. В данном случае, в строку включаются только свойства "level" и "health", "username" исключается. Значение переменной "data" равняется {"level": 19, "health": 90}. Если заменитель является функцией, она вызывается для каждого свойства объекта. Значение, возвращаемое функцией, будет значением свойства при добавлении в строку. Если значением свойства является undefined, такое свойство исключается из состава строки.
`
  },

  // 54
  {
    question: `
let num = 10

const increaseNumber = () => num++
const increasePassedNumber = number => number++

const num1 = increaseNumber()
const num2 = increasePassedNumber(num1)

console.log(num1)
console.log(num2)
`,
    answers: `
A: 10 и 10
B: 10 и 11
C: 11 и 11
D: 11 и 12
`,
    rightAnswer: `A`,
    explanation: `
Постфиксный оператор "++" сначала возвращает значение операнда, затем увеличивает его. Значение переменной "num1" равняется 10, так как функция сначала возвращает значение переменной "num" и только после этого увеличивает его на 1. num2 равняется 10, так как мы передали "num1" в функцию "increasePassedNumber". Аргумент "number" равняется 10. Снова оператор "++" сначала возвращает значение операнда, а затем увеличивает его на 1. Поскольку аргумент "number" равняется 10, "num2" также равняется 10.
`
  },

  // 55
  {
    question: `
const value = { number: 10 }

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2))
}

multiply()
multiply()
multiply(value)
multiply(value)
`,
    answers: `
A: 20 40 80 160
B: 20 40 20 40
C: 20 20 20 40
D: NaN NaN 20 40
`,
    rightAnswer: `C`,
    explanation: `
В ES6 мы можем присваивать параметрам функции значения по умолчанию. Параметр будет иметь значение по умолчанию, если другое значение не было передано функции или, если значением переданного аргумента является undefined. В данном случае, мы распространяем свойства объекта "value" на новый объект, поэтому значение "x" по умолчанию равняется "{ number: 10 }". Аргумент по умолчанию реализуется в момент вызова функции. Каждый раз, когда мы вызываем функцию, создается новый объект. Мы вызываем функцию "multiply" первые два раза, не передавая ей никаких значений: "x" имеет значение "{ number: 10 }". Затем мы умножаем значение "x.number" на 2, получаем 20. В третий раз, когда мы вызываем multiply(), мы передаем ей аргумент - объект "value". Оператор "*=" является сокращением для "x.number = x.number * 2": мы меняем значение x.number, теперь оно равняется 20. В четвертый раз мы снова передаем multiply() объект "value". x.number равняется 20, поэтому выражение "x.number *= 2" возвращает 40.
`
  },

  // 56
  {
    question: `
[1, 2, 3, 4].reduce((x, y) => console.log(x, y))
`,
    answers: `
A: 1 2  3 3  6 4
B: 1 2  2 3  3 4
C: 1 undefined  2 undefined  3 undefined  4 undefined
D: 1 2  undefined 3  undefined 4
`,
    rightAnswer: `D`,
    explanation: `
Первый агрумент метода "reduce" - аккумулятор, в данном случае, "x". Второй аргумент - текущее значение, "y". С помощью "reduce" мы применяем функцию обратного вызова к каждому элементу массива, что приводит к единственному значению. В приведенном примере мы не возвращаем никаких значений из функции, а просто регистрируем значение аккумулятора и текущее значение. Значение аккумулятора равняется ранее возвращенному значению колбэка. Если методу "reduce" не передается необязательный аргумент "initialValue" (начальное значение), аккумулятор равняется первому элементу при первом вызове. При первом вызове аккумулятор (x) равняется 1, а текущее значение (y) - 2. Мы не выходим из функции, а регистрируем значение аккумулятора и текущее значение: 1 и 2 регистрируются. Если из функции не возвращается значения, она возвращает undefined. При следующем вызове аккумулятор равняется undefined, а текущее значение - 3. undefined и 3 регистрируются. При четвертом вызове мы снова не возвращаем значение из функции. Аккумулятор равняется undefined, а текущее значение - 4: undefined и 4 выводятся в консоль.
`
  },

  // 57
  {
    question: `
// index.js
console.log('Выполнение index.js')
import { sum } from './sum.js'
console.log(sum(1, 2))

// sum.js
console.log('Выполнение sum.js')
export const sum = (a, b) => a + b
`,
    answers: `
A: Выполнение index.js  Выполнение sum.js  3
B: Выполнение sum.js  Выполнение index.js  3
C: Выполнение sum.js  3  Выполнение index.js
D: Выполнение index.js  undefined  Выполнение sum.js
`,
    rightAnswer: `B`,
    explanation: `
При импорте модулей с помощью ключевого слова "import", они являются предварительно разобранными (прераспарсенными). Это означает, что модули запускаются первыми, а код в файле, который импортирует модуль, выполняется позже. В этом разница между "require()" в CommonJS и "import()". С помощью метода "require" мы можем загружать зависимости динамически во время выполнения кода. При использовании "require()" вместо "import()" в консоль будет выведено "Выполнение index.js Выполнение sum.js 3".
`
  },

  // 58
  {
    question: `
console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))
`,
    answers: `
A: true  true  false
B: false  true  false
C: true  false  true
D: true  true  true
`,
    rightAnswer: `A`,
    explanation: `
Каждый Symbol уникален. Цель аргумента, переданного Symbol, состоит в том, чтобы дать Symbol описание. Значение Symbol не зависит от переданного аргумента. Когда мы проверяем равенство, мы создаем два разных Symbol: первый Symbol('foo') и второй Symbol('foo'). Эти значения уникальны и не равны друг другу, поэтому выражение "Symbol('foo') === Symbol('foo')" возвращает false.
`
  },

  // 59
  {
    question: `
const name = "John Smith"
console.log(name.padStart(12))
console.log(name.padStart(2))
`,
    answers: `
A: "John Smith" и "John Smith"
B: " John Smith" и " John Smith" ("[12x whitespace]John Smith"  "[2x whitespace]John Smith")
C: " John Smith" и "John Smith" ("[1x whitespace]John Smith", "John Smith")
D: "John Smith" и "Jo"
`,
    rightAnswer: `C`,
    explanation: `
С помощью метода "padStart" мы добавляем отступы в начало строки. Значение, передаваемое этому методу, представляет собой общую длину строки вместе с отступом. Строка "John Smith" имеет длину равную 11. name.padStart(12) вставляет 1 пробел в начало строки, потому что 11 + 1 равняется 12. Если аргумент, переданный методу "padStart", меньше длины строки, заполнение не выполняется.
`
  },

  // 60
  {
    question: `
console.log("📱" + "💻")
`,
    answers: `
A: "📱💻"
B: 257548
C: undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
С помощью оператора "+" мы можем объединять строки. Это называется конкатенацией. В данном случае, мы объединяем строку "📱" со строкой "💻", что приводит к "📱💻".
`
  },

  // 61
  {
    question: `
function* startGame() {
  const answer = yield "Ты любишь JavaScript?"
  if (answer !== "Да") {
    return "Как интересно... В таком случае, что ты здесь делаешь?"
  }
  return "JavaScript тоже тебя любит ❤️"
}

const game = startGame()
console.log(/* 1 */) // Ты любишь JavaScript?
console.log(/* 2 */) // JavaScript тоже тебя любит ❤️
`,
    answers: `
A: game.next("Да").value и game.next().value
B: game.next.value("Да") и game.next.value()
C: game.next().value и game.next("Да").value
D: game.next.value() и game.next.value("Да")
`,
    rightAnswer: `C`,
    explanation: `
Когда движок JavaScript встречает ключевое слово "yield" выполнение функции-генератора приостанавливается. Во-первых, мы должны позволить функции вернуть строку "Ты любишь JavaScript?", что можно сделать, вызвав "game.next().value". Код выполняется последовательно до тех пор, пока не встречается ключевое слово "yield". В первой строке функции есть ключевое слово "yield": выполнение останавливается с первым результатом. Это означает, что переменная "answer" еще не определена. Когда мы вызываем "game.next("Да").value", предыдущий "yield" заменяется значением аргумента, переданного методу "next", в данном случае, "Да". Значение переменной "answer" равняется "Да". Условие "if (answer !== "Да")" возвращает false, и "JavaScript тоже тебя любит ❤️" выводится в консоль.
`
  },

  // 62
  {
    question: `
console.log(String.raw\`Hello\\nWorld!\`)
`,
    answers: `
A: Hello World!
B: Hello (на следующей строке) World!
C: Hello\\nWorld!
D: Hello\\n (на следующей строке) World!
`,
    rightAnswer: `C`,
    explanation: `
"String.raw" возвращает строку, в которой обратные последовательности (\\n, \\v, \\t и т.д.) игнорируются. Обратная косая черта может стать проблемой, например, такой код:<br>
const path = \`C:\\Documents\\Projects\\table.html\`
Будет преобразован в следующее:<br>
"C:DocumentsProjects able.html"<br>
С "String.raw" управляющие символы будут проигнорированы:<br>
C:\\Documents\\Projects\\table.html
`
  },

  // 63
  {
    question: `
async function getData() {
  return await Promise.resolve("Я сделал это!")
}

const data = getData()
console.log(data)
`,
    answers: `
A: Я сделал это!
B: Promise {<resolved>: "Я сделал это!"}
C: Promise {<pending>}
D: undefined
`,
    rightAnswer: `C`,
    explanation: `
Асинхронная функция всегда возвращает промис. "await" ожидает разрешения промиса: промис возвращается, когда мы вызываем "getData()", чтобы установить переменную "data" равным ему. Если бы мы хотели получить доступ к разрешенному значению "Я сделал это!", мы могли бы использовать метод "then" для "data": "data.then(res => console.log(res))". Тогда бы мы получили "Я сделал это!"
`
  },

  // 64
  {
    question: `
function addToList(item, list) {
  return list.push(item)
}

const result = addToList("apple", ["banana"])
console.log(result)
`,
    answers: `
A: ['apple', 'banana']
B: 2
C: true
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Метод "push" возвращает длину нового массива. Ранее массив содержал только один элемент (строку "banana") и имел длину, равную 1. После добавления в массив строки "apple", длина массива увеличилась до 2. Это значение возвращается из функции "addToList". Метод "push" изменяет исходный массив. Если мы хотим получить массив, а не его длину, необходимо вернуть "list" после добавления в него "item".
`
  },

  // 65
  {
    question: `
const box = { x: 10, y: 20 }

Object.freeze(box)

const shape = box
shape.x = 100

console.log(shape)
`,
    answers: `
A: { x: 100, y: 20 }
B: { x: 10, y: 20 }
C: { x: 100 }
D: Error
`,
    rightAnswer: `B`,
    explanation: `
"Object.freeze()" делает невозможным добавление, удаление или изменение свойств объекта (если только значение свойства не является другим объектом). Когда мы создаем переменную "shape" и устанавливаем ее равной замороженному объекту "box", "shape" ссылается на этот объект. Заморожен ли объект, можно определить посредством "Object.isFrozen()". В даном случае, "Object.isFrozen(shape)" вернет true, поскольку переменная "shape" ссылается на замороженный объект. Поскольку "shape" заморожен, а значение свойства "x" не является объектом, мы не можем изменить это свойство. "x" по-прежнему равняется 10, и "{ x: 10, y: 20 }" выводится в консоль.
`
  },

  // 66
  {
    question: `
const { name: myName } = { name: "John" }

console.log(name)
`,
    answers: `
A: John
B: myName
C: undefined
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Когда мы распаковываем свойство "name" из правого объекта, мы присваиваем значение "John" переменной "myName". С помощью выражения "{ name: myName }" мы сообщаем JavaScript, что хотим создать новую переменную с именем "myName" и со значением свойства "name" из правой части. Поскольку мы пытаемся вывести в консоль "name", переменную, которая не определена, выбрасывается исключение "ReferenceError".
`
  },

  // 67
  {
    question: `
const add = () => {
  const cache = {}
  return num => {
    if (num in cache) {
      return \`Из кэша! &#36;{cache[num]}\`
    } else {
      const result = num + 10
      cache[num] = result
      return \`Вычислено! &#36;{result}\`
    }
  }
}

const addFunction = add()
console.log(addFunction(10))
console.log(addFunction(10))
console.log(addFunction(5 * 2))
`,
    answers: `
A: Вычислено! 20  Вычислено! 20  Вычислено! 20
B: Вычислено! 20  Из кэша! 20  Вычислено! 20
C: Вычислено! 20  Из кэша! 20  Из кэша! 20
D: Вычислено! 20  Из кэша! 20  Error
`,
    rightAnswer: `C`,
    explanation: `
Функция "add" является функцией запоминания (мемоизации). С помощью запоминания мы можем кэшировать результаты вызова функции, чтобы ускорить ее повторное выполнение. В данном случае, мы создаем объект "cache" для хранения возвращаемых функцией значений. Если мы повторно вызовем функцию "addFunction" с тем же аргументом, она сначала проверит, имеется ли соответствующее значение в кэше. Если такое значение имеется, оно возвращается, что экономит время на выполнение функции. Иначе, если значение в кэше отсутствует, оно вычисляется и сохраняется. Мы вызываем addFunction() три раза с одним и тем же аргументом: при первом вызове для "num", равном 10, значение, возвращаемое функцией, в кэше отсутствует. Условие "if (num in cache)" возвращает false, и выполняется блок "else": "Вычислено! 20" выводится в консоль, а результат добавляется в объект "cache". "cache" теперь выглядит как "{ 10: 20 }". При повторном вызове значение для аргумента 10 возвращается из кэша. Условие "if (num in cache)" возвращает true, и "Из кэша! 20" выводится в консоль. В третий раз мы передаем в функцию выражение "5 * 2", что оценивается как 10. Объект "cache" содержит искомое значение. Условие "if (num in cache)" возвращает true, и "Из кэша! 20" выводится в консоль.
`
  },

  // 68
  {
    question: `
const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]

for (let item in myLifeSummedUp) {
  console.log(item)
}

for (let item of myLifeSummedUp) {
  console.log(item)
}
`,
    answers: `
A: 0 1 2 3  "☕" "💻" "🍷" "🍫"
B: "☕" "💻" "🍷" "🍫"  "☕" "💻" "🍷" "🍫"
C: "☕" "💻" "🍷" "🍫"  0 1 2 3
D: 0 1 2 3  {0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}
`,
    rightAnswer: `A`,
    explanation: `
С помощью цикла "for-in" мы перебираем перечисляемые свойства объекта. В массиве перечисляемые свойства являются "ключами" элементов массива, которые фактически являются их индексами. Вы можете представить массив как: <br>
{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"} <br>
где ключи - перечисляемые свойства. "0 1 2 3" выводится в консоль. С помощью цикла "for-of" мы перебираем значения итерируемых сущностей. Массив является итерируемой (перебираемой) сущностью. Когда мы выполняем итерацию по массиву, переменная "item" равняется итерируемому элементу, "☕" "💻" "🍷" "🍫" выводится в консоль.
`
  },

  // 69
  {
    question: `
const list = [1 + 2, 1 * 2, 1 / 2]
console.log(list)
`,
    answers: `
A: ["1 + 2", "1 * 2", "1 / 2"]
B: ["12", 2, 0.5]
C: [3, 2, 0.5]
D: [1, 1, 1]
`,
    rightAnswer: `C`,
    explanation: `
Элементами массива могут быть любые типы данных. Числа, строки, объекты, другие массивы, null, логические значения, undefined, а также даты, функции и выражения. Элемент будет равен возвращаемому значению. Выражение "1 + 2" возвращает 3, "1 * 2" - 2, а "1 / 2" - 0.5.
`
  },

  // 70
  {
    question: `
function sayHi(name) {
  return \`Hello, &#36;{name}\`
}

console.log(sayHi())
`,
    answers: `
A: Hello,
B: Hello, undefined
C: Hello, null
D: Error
`,
    rightAnswer: `B`,
    explanation: `
По умолчанию аргументы функции имеют значение undefined, если значение не было передано или присвоено по умолчанию. В данном случае, мы не передаем значения для аргумента "name". "name" равняется undefined. В ES6 мы можем перезаписать undefined параметрами по умолчанию. Например:<br>
function sayHi(name = "John") { ... }<br>
В данном случае, если мы не передали значение или если мы передали undefined, аргумент "name" будет иметь значение "John".
`
  },

  // 71
  {
    question: `
var status = "😎"

setTimeout(() => {
  const status = "😍"

  const data = {
    status: "😉",
    getStatus() {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)
`,
    answers: `
A: "😉"  "😍"
B: "😉"  "😎"
C: "😍"  "😎"
D: "😎"  "😎"
`,
    rightAnswer: `B`,
    explanation: `
Значение ключевого слова "this" зависит от того, в каком контексте оно используется. В методе "getStatus" this указывает на объект, которому принадлежит метод. Метод принадлежит объекту "data", поэтому "this" указывает на этот объект. Когда мы выводим в консоль "this.status", выводится свойство "status" объекта "data" или "😉". С помощью метода "call" мы можем изменить объект, на который ссылается "this". В функциях ключевое слово "this" относится к объекту, которому принадлежит функция, либо к объекту, создаваемому с помощью функции-конструктора. Мы объявили функцию "setTimeout" для объекта "global", поэтому в функции "setTimeout" ключевое слово "this" указывает на объект "global". В глобальном объекте есть переменная "status" со значением "😎", которое и выводится в консоль.
`
  },

  // 72
  {
    question: `
const person = {
  name: "John",
  age: 30
}

let city = person.city
city = "New York"

console.log(person)
`,
    answers: `
A: { name: "John", age: 30 }
B: { name: "John", age: 30, city: "New York" }
C: { name: "John", age: 30, city: undefined }
D: New York
`,
    rightAnswer: `A`,
    explanation: `
Мы устанавливаем переменную "city" равной значению свойства "city" объекта "person". У этого объекта нет свойства "city", поэтому переменная "city" имеет значение undefined. Обратите внимание, что мы не ссылаемся на "person". Мы просто устанавливаем переменную "city" равной текущему значению свойства "city" объекта "person". Затем мы устанавливаем city равным строке "New York". Это не изменяет объект "person".
`
  },

  // 73
  {
    question: `
function checkAge(age) {
  if (age < 18) {
    const message = "Ты слишком молод."
  } else {
    const message = "Ты достаточно взрослый!"
  }
  return message
}

console.log(checkAge(30))
`,
    answers: `
A: "Ты слишком молод."
B: "Ты достаточно взрослый!"
C: Error
D: undefined
`,
    rightAnswer: `C`,
    explanation: `
Переменные, объявленные с помощью ключевых слов "const" и "let", имеют блочную область видимости. Блок - это любой код между фигурными скобками ({}). В данном случае, в фигурных скобках операторов "if-else". Мы не можем получить доступ к переменной за пределами блока, в котором она объявлена, выбрасывается исключение "ReferenceError".
`
  },

  // 74
  {
    question: `
function getName(name) {
  const hasName = /* ? */
}
`,
    answers: `
A: !!name
B: name
C: new Boolean(name)
D: name.length
`,
    rightAnswer: `A`,
    explanation: `
С помощью выражения "!!name" мы определяем, является ли значение аргумента "name" истинным. Если "name" равняется true, то "!name" возвращает false. А "!false" (это то, чем на самом деле является "!!name") возвращает true. Устанавливая "hasName" равным "name", мы устанавливаем "hasName" равным любому значению, которое передается функции "getName", а не логическому значению true. "new Boolean(true)" возвращает объектную обертку, а не само логическое значение. "name.length" возвращает длину переданного аргумента.
`
  },

  // 75
  {
    question: `
console.log("Я хочу пиццу!"[0])
`,
    answers: `
A: ""
B: "Я"
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Чтобы получить символ по определенному индексу в строке, вы можете использовать скобочную нотацию. Первый символ в строке имеет индекс 0 и т.д. В данном случае, мы хотим получить элемент с индексом 0, символ "Я", который и выводится в консоль. Альтернативой является метод "charAt".
`
  },

  // 76
  {
    question: `
function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)
`,
    answers: `
A: NaN
B: 20
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Мы можем установить значение параметра по умолчанию равным другому параметру функции, если такой параметр был определен до параметра по умолчанию. Мы передаем значение 10 в функцию "sum". Если "sum()" принимает только один аргумент, значит, значение для "num2" не передано, оно получает значение по умолчанию, т.е. 10. Выражение "num1 + num2" возвращает 20. Если попытаться установить значение параметра по умолчанию равным параметру, который определяется позже, то возникнет ошибка.
`
  },

  // 77
  {
    question: `
// module.js
export default () => "Hello World!"
export const name = "John"

// index.js
import * as data from "./module"

console.log(data)
`,
    answers: `
A: { default: function default(), name: "John" }
B: { default: function default() }
C: { default: "Hello World!", name: "John" }
D: глобальный объект module.js
`,
    rightAnswer: `A`,
    explanation: `
С помощью "import * as name" мы импортируем все экспорты из файла "module.js" в файл "index.js", создается новый объект "data". В файле "module.js" имеется два экспорта: экспорт по умолчанию и именованный экспорт. Экспорт по умолчанию - это функция, которая возвращает строку "Hello World!", а именованный экспорт - это переменная "name", которая имеет значение "John". Объект "data" имеет свойство "default" для экспорта по умолчанию, другие свойства - именованные экспорты и соответствующие значения.
`
  },

  // 78
  {
    question: `
class Person {
  constructor(name) {
    this.name = name
  }
}

const member = new Person("John")
console.log(typeof member)
`,
    answers: `
A: class
B: function
C: object
D: string
`,
    rightAnswer: `C`,
    explanation: `
Классы являются синтаксическим сахаром для функций-конструкторов. Эквивалентом класса "Person" в качестве функции-конструктора будет:<br>
function Person() { this.name = name }<br>
Вызов функции-конструктора с ключевым словом "new" приводит к созданию экземпляра объекта "Person". Выражение "typeof member" возвращает "object".
`
  },

  // 79
  {
    question: `
let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
`,
    answers: `
A: [1, 2, 3, 4, 5]
B: [1, 2, 3, 5]
C: [1, 2, 3, 4]
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Метод "push" возвращает длину нового массива, а не сам массив. Устанавливая "newList" равным "[1, 2, 3].push(4)", мы устанавливаем "newList" равным 4. Затем мы пытаемся использовать метод "push" для "newList". Поскольку "newList" является числом 4, мы не можем использовать "push": выбрасывается исключение "TypeError".
`
  },

  // 80
  {
    question: `
function giveMePizza() {
  return "А вот и пицца!"
}

const giveMeChocolate = () => "Вот шоколад... теперь дуй в тренажерку."

console.log(giveMePizza.prototype)
console.log(giveMeChocolate.prototype)
`,
    answers: `
A: { constructor: ...} { constructor: ...}
B: {} { constructor: ...}
C: { constructor: ...} {}
D: { constructor: ...} undefined
`,
    rightAnswer: `D`,
    explanation: `
Обычные функции, такие как "giveMePizza", имеют свойство "prototype", которое является объектом (прототипом объекта) со свойством "constructor". Однако стрелочные функции, такие как "giveMeChocolate", не имеют прототипа. Поэтому при попытке получить доступ к "giveMeChocolate.prototype" возвращается undefined.
`
  },

  // 81
  {
    question: `
const person = {
  name: "John",
  age: 30
}

for (const [x, y] of Object.entries(person)) {
  console.log(x, y)
}
`,
    answers: `
A: name John и age 30
B: ["name", "John"] и ["age", 30]
C: ["name", "age"] и undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Object.entries(person) возвращает массив вложенных массивов, содержащий ключи и значения:<br>
[ [ 'name', 'John' ], [ 'age', 30 ] ]<br>
С помощью цикла "for-of" мы перебираем элементы массива, в данном случае подмассивы. Мы можем деструктурировать подмассивы в цикле, используя "const [x, y]". "x" равняется первому элементу в подмассиве, "y" - второму. Первым подмассивом является [ "name", "John" ], где "x" равняется "name", а "y" - "John". Вторым подмассивом является [ "age", 30 ], где "x" равняется "age", а "y" - 30.
`
  },

  // 82
  {
    question: `
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

console.log(getItems(["banana", "apple"], "pear", "orange"))
`,
    answers: `
A: ["banana", "apple", "pear", "orange"]
B: [["banana", "apple"], "pear", "orange"]
C: ["banana", "apple", ["pear"], "orange"]
D: Error
`,
    rightAnswer: `D`,
    explanation: `
"...args" - это прочие параметры (оператор "rest"). Значение rest - это массив, содержащий неиспользованные аргументы и в этой связи передаваемый последним. В приведенном примере rest является вторым аргументом. Это приводит к синтаксической ошибке. <br>
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit]
} <br>
getItems(["banana", "apple"], "pear", "orange") <br>
Данный код работает, как ожидается и возвращает массив "[ 'banana', 'apple', 'orange', 'pear' ]".
`
  },

  // 83
  {
    question: `
function nums(a, b) {
  if
    (a > b)
    console.log('a больше')
  else
    console.log('b больше')
    return
  a + b
}

console.log(nums(4, 2))
console.log(nums(1, 2))
`,
    answers: `
A: a больше, 6 и b больше, 3
B: a больше, undefined и b больше, undefined
C: undefined и undefined
D: Error
`,
    rightAnswer: `B`,
    explanation: `
В JavaScript мы не обязаны явно указывать точку с запятой (;), однако, интерпретатор автоматически добавляет их после операторов. Оператором могут быть переменные или ключевые слова, такие как throw, return, break и т.д. В приведенном примере имеется инструкция "return" и выражение "a + b" на новой строке. Поскольку это новая строка, движок не знает, что это значение, которое мы хотим вернуть. Он автоматически добавляет точку с запятой после "return". Это выглядит так: <br>
return; a + b <br>
Это означает, что строка "a + b" никогда не достигается, функция возвращает управление после ключевого слова "return". Если значение не возвращается, как в приведенном примере, функция возвращает undefined. Обратите внимание, что после операторов "if-else" точки с запятой автоматически не вставляются.
`
  },

  // 84
  {
    question: `
class Person {
  constructor() {
    this.name = "John"
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = "Jane"
  }
}

const member = new Person()
console.log(member.name)
`,
    answers: `
A: John
B: Jane
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Мы можем установить классы равными другим классам/функциям-конструкторам. В данном случае, мы устанавливаем класс "Person" равным классу "AnotherPerson". Свойство "name" этого конструктора имеет значение "Jane", поэтому свойство "name" для нового экземпляра класса "Person" member - это также "Jane".
`
  },

  // 85
  {
    question: `
const info = {
  [Symbol("a")]: "b"
}

console.log(info)
console.log(Object.keys(info))
`,
    answers: `
A: {Symbol('a'): 'b'} и ["{Symbol('a')"]
B: {} и []
C: { a: 'b' } и ['a']
D: {Symbol('a'): 'b'} и []
`,
    rightAnswer: `D`,
    explanation: `
Symbol не является перечисляемым. Метод "keys" возвращает все перечисляемые ключи объекта. Symbol не просматривается таким образом, поэтому возвращается пустой массив. При выводе в консоль объекта будут видны все его свойства, даже неперечисляемые. Это одно из качеств символа: помимо представления совершенно уникального значения (которое предотвращает случайное пересечение имен в объектах, например, при работе с 2 библиотеками, которые хотят добавить свойства с одинаковыми именами к одному и тому же объекту). Мы также можем "скрыть" свойства объектов таким способом (хотя и не полностью. Мы можем получить доступ к символам с помощью "Object.getOwnPropertySymbols()").
`
  },

  // 86
  {
    question: `
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "John", age: 30 }

console.log(getList(list))
console.log(getUser(user))
`,
    answers: `
A: [1, [2, 3, 4]] и undefined
B: [1, [2, 3, 4]] и { name: "John", age: 30 }
C: [1, 2, 3, 4] и { name: "John", age: 30 }
D: null и { name: "John", age: 30 }
`,
    rightAnswer: `A`,
    explanation: `
Функция "getList" принимает массив в качестве аргумента. В "getList()" мы деструктурируем этот массив. Это выглядит так:<br>
[x, ...y] = [1, 2, 3, 4]<br>
С помощью rest-оператора "...y" мы помещаем все "оставшиеся" аргументы в массив. Такими аргументами являются 2, 3 и 4. Значением переменной "y" является массив, содержащий прочие параметры. В данном случае, значение "x" равно 1, поэтому, в консоль попадает "[x, y]", т.е. "[1, [2, 3, 4]]". Функция "getUser" в качестве аргумента принимает объект. В случае стрелочных функций мы можем обойтись без фигурных скобок, если возвращаем только одно значение. Однако, если мы хотим вернуть объект из стрелочной функции, то должны указать его в круглых скобках, в противном случае, никакое значение не будет возвращено. Следующая функция вернула бы объект:<br>
const getUser = user => ({ name: user.name, age: user.age })<br>
Поскольку значение не возвращается явно, функция возвращает undefined.
`
  },

  // 87
  {
    question: `
const name = "John"

console.log(name())
`,
    answers: `
A: SyntaxError
B: ReferenceError
C: TypeError
D: undefined
`,
    rightAnswer: `C`,
    explanation: `
Переменная "name" содержит строку, которая не является функцией, поэтому не может быть вызвана. TypeError возникает, когда значение не соответствует ожидаемому типу. Движок JavaScript ожидает, что значением переменной "name" является функция, так как мы пытаемся ее вызвать. Однако, значением "name" является строка, поэтому выбрасывается исключение "TypeError: name is not a function". SyntaxError генерируются, когда мы написали нечто недопустимое с точки зрения JavaScript, например, когда ключевое слово "return" написано как "retrun". ReferenceError генерируются, когда JavaScript не может найти ссылку на значение, к которому мы обращаемся.
`
  },

  // 89
  {
    question: `
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
`,
    answers: `
A: false null []
B: null "" true
C: {} "" []
D: null null true
`,
    rightAnswer: `C`,
    explanation: `
Оператор "||" (логическое ИЛИ) возвращает первый истинный операнд. Если все значения ложны, возвращается последний операнд. (false || {} || null): пустой объект ({}) является истинным значением. Это первое (и единственное) истинное значение, которое и возвращается. Переменная "one" имеет значение "{}". (null || false ||" "): все операнды являются ложными. Это означает, что возвращается последний операнд - пустая строка (""). Переменная "two" имеет значение "". ([] || 0 ||" "): пустой массив ([]) является истинным значением. Это первое истинное значение, которое и возвращается. Переменная "three" имеет значение "[]".
`
  },

  // 90
  {
    question: `
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunction() {
  myPromise().then(res => console.log(res))
  console.log('first')
}

async function secondFunction() {
  console.log(await myPromise())
  console.log('second')
}

firstFunction()
secondFunction()
`,
    answers: `
A: I have resolved! first и I have resolved! second
B: first I have resolved! и second I have resolved!
C: I have resolved! second и first I have resolved!
D: first I have resolved! и I have resolved! second
`,
    rightAnswer: `D`,
    explanation: `
С промисами (promise) дело обстоит следующим образом: "Я хочу отложить выполнение этой функции, поскольку это может занять некоторое время" (promise переводится как "обещание"). Только когда промис выполнен (или отклонен), и когда стек вызовов (call stack) пуст, я хочу получить возвращаемое им значение. Мы можем получить значение с помощью ключевого слова "then" или "await" в асинхронной функции. Эти ключевые слова работают по-разному. В "firstFunction()" мы (вроде бы) приостановили выполнение функции "myPromise", и продолжили выполнение другого кода, в данном случае, "console.log('first')". Затем функция разрешается строкой "I have resolved!", которая выводится в консоль после освобождения стека вызовов. С помощью ключевого слова "await" в "secondFunction()", мы приостанавливаем выполнение асинхронной функции до тех пор, пока промис не будет разрешен. Это означает, что мы ожидаем разрешения "myPromise()" со значением "I have resolved!", и только после того, как это произошло, мы переходим к следующей строке. Поэтому строка "second" выводится в консоль последней.
`
  },

  // 91
  {
    question: `
const set = new Set()

set.add(1)
set.add("John")
set.add({ name: "John" })

for (let item of set) {
  console.log(item + 2)
}
`,
    answers: `
A: 3 NaN NaN
B: 3 7 NaN
C: 3 John2 [object Object]2
D: "12" John2 [object Object]2
`,
    rightAnswer: `C`,
    explanation: `
Оператор "+" используется не только для сложения чисел, но и для объединения (конкатенации) строк. Всякий раз, когда движок JavaScript видит, что одно или несколько значений не являются числом, он приводит число к строке. Первым значением является 1 - число. Выражение "1 + 2" возвращает 3. Вторым значением является "John". "John" является строкой, а 2 - числом: 2 приводится к строке. "John" и "2" объединяются, что приводит к "John2". { name: "John" } является объектом. Ни число, ни объект не являются строкой, поэтому они приводятся к строке. Когда объект приводится к строке он превращается в "[object Object]". "[object Object]", объединенный с "2", становится "[object Object]2".
`
  },

  // 92
  {
    question: `
console.log(Promise.resolve(5))
`,
    answers: `
A: 5
B: Promise {<pending>: 5}
C: Promise {<resolved>: 5}
D: Error
`,
    rightAnswer: `C`,
    explanation: `
Мы можем передавать в "Promise.resolve()" любой тип данных. Данный метод возвращает промис с разрешенным значением. Если мы передадим ему обычную функцию, промис разрешится с обычным значением. Если мы передадим промис, промис разрешится с разрешенным значением переданного промиса. В данном случае, мы передаем "Promise.resolve()" число 5. Поэтому возвращается разрешенный промис со значением 5.
`
  },

  // 93
  {
    question: `
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Не одинаковые!")
  } else {
    console.log("Одинаковые!")
  }
}

const person = { name: "Игорь" }

compareMembers(person)
`,
    answers: `
A: Не одинаковые!
B: Одинаковые!
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Объекты передаются по ссылке. Когда мы проверяем объекты на строгое равенство с помощью оператора "===", мы сравниваем их ссылки. Мы устанавливаем значение по умолчанию для параметра "person2", равное объекту "person", и передаем объект "person" в качестве значения для параметра "person1". Это означает, что оба параметра содержат ссылку на одно и то же место в памяти, поэтому они равны. Выполняется код в блоке "else", и в консоль выводится "Одинаковые!".
`
  },

  // 94
  {
    question: `
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
}

const colors = ["pink", "red", "blue"]

console.log(colorConfig.colors[1])
`,
    answers: `
A: true
B: false
C: undefined
D: Error
`,
    rightAnswer: `D`,
    explanation: `
В JavaScript у нас есть два способа получить доступ к свойствам объекта: скобочная нотация и точечная нотация. В данном случае, мы используем точечную нотацию (colorConfig.colors) вместо скобочной (colorConfig["colors"]). При точечной нотации движок пытается найти свойство объекта с указанным именем. В приведенном примере JavaScript пытается найти свойство "colors" в объекте "colorConfig". Такого свойства не существует, поэтому возвращается undefined. Затем мы пытаемся получить доступ к значению первого элемента массива, используя "[1]". Мы не можем сделать этого для undefined, поэтому выбрасывается исключение "TypeError: Cannot read property '1' of undefined". JavaScript интерпретирует (распаковывает) операторы. Когда мы используем скобочную нотацию, он видит открывающуюся скобку ([) и продолжает разбирать код, пока не найдет закрывающуюся скобку (]). Только тогда он оценивает выражение. Если бы мы использовали colorConfig[colors[1]], то вернулось бы значение свойства "red" объекта "colorConfig".
`
  },

  // 95
  {
    question: `
console.log('❤️' === '❤️')
`,
    answers: `
A: true
B: false
C: undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Смайлики - это юникоды. Юникод для сердца - "U+2764 U+FE0F". Юникоды одинаковы для одних и тех же смайликов. Таким образом, мы сравниваем две одинаковые строки, поэтому возвращается true.
`
  },

  // 96
  {
    question: `
const food = ['🍕', '🍫', '🍳', '🍔']
const info = { favoriteFood: food[0] }

info.favoriteFood = '🍝'

console.log(food)
`,
    answers: `
A: ['🍕', '🍫', '🍳', '🍔']
B: ['🍝', '🍫', '🍳', '🍔']
C: ['🍝', '🍕', '🍫', '🍳', '🍔']
`,
    rightAnswer: `A`,
    explanation: `
Мы устанавливаем значение свойства "favourFood" объекта "info" равным строке "🍕". Строка является примитивным типом данных. В JavaScript примитивные типы данных (все, что не является объектом) передаются по значению. Затем мы меняем значение свойства "favourFood". Массив "food" не изменился, поскольку значение "favourFood" было скопировано из значения первого элемента в массиве и не имеет ссылки на то же место в памяти, что и food[0]. Поэтому в консоль выводится исходный массив "['🍕', '🍫', '🍳', '🍔']".
`
  },

  // 97
  {
    question: `
let name = 'John'

function getName() {
  console.log(name)
  let name = 'Jane'
}

getName()
`,
    answers: `
A: John
B: Jane
C: undefined
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Каждая функция имеет собственный контекст выполнения (или область видимости). Функция "getName" сначала ищет переменную "name" в собственном контексте (области видимости). "getName()" содержит переменную "name": мы объявляем переменную "name" с помощью ключевого слова "let" и присваиваем ей значение "Jane". Переменные, объявленные с помощью ключевого слова "let" (и "const") не поднимаются в начало области видимости (в данном случае, функции), в отличие от переменных, объявленных с помощью ключевого слова "var". Они недоступны до инициализации. Это называется "временной мертвой зоной". Когда мы пытаемся получить доступ к таким переменным, JavaScript выбрасывает исключение "ReferenceError". Если бы мы не объявили переменную "name" в функции "getName", движок продолжал бы поиск переменной по цепочке областей видимости. Внешняя область видимости содержит переменную "name" со значением "John". В этом случае в консоль было бы выведено "John".
`
  },

  // 98
  {
    question: `
function* generatorOne() {
  yield ['a', 'b', 'c']
}

function* generatorTwo() {
  yield* ['a', 'b', 'c']
}

const one = generatorOne()
const two = generatorTwo()

console.log(one.next().value)
console.log(two.next().value)
`,
    answers: `
A: a  a
B: a  undefined
C: ['a', 'b', 'c']  a
D: a  ['a', 'b', 'c']
`,
    rightAnswer: `C`,
    explanation: `
С помощью ключевого слова "yield" мы получаем значения в функции-генераторе. С помощью yield* мы можем получить значение из другой функции-генератора или итерируемого объекта (например, массива). В "generatorOne()" мы получаем весь массив "[' a ',' b ',' c ']", используя "yield". Значение свойства "value", возвращаемого методом "next" объекта "one" (one.next().value), равняется массиву "['a', 'b', 'c']". <br>
console.log(one.next().value) // ['a', 'b', 'c'] <br>
console.log(one.next().value) // undefined <br>
В функции "generatorTwo" мы используем ключевое слово "yield*". Это означает, что первое значение равняется первому значению итератора. Итератор - это массив "['a', 'b', 'c']". Первым значением данного массива является "a", поэтому когда мы вызываем "two.next().value", возвращается "a". <br>
console.log(two.next().value) // 'a' <br>
console.log(two.next().value) // 'b' <br>
console.log(two.next().value) // 'c' <br>
console.log(two.next().value) // undefined <br>
`
  },

  // 99
  {
    question: `
console.log(\`&#36;{(x => x)('Я люблю')} писать код\`)
`,
    answers: `
A: Я люблю писать код
B: undefined писать код
C: &#36;{(x => x)('Я люблю') писать код
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Выражения внутри шаблонных литералов оцениваются первыми. Это означает, что строка будет содержать значение выражения, в данном случае, значение немедленно вызываемого функционального выражения "(x => x)('Я люблю')". Мы передаем значение "Я люблю" в качестве аргумента стрелочной функции "x => x". Аргумент "x" имеет значение "Я люблю", которое и возвращается. Это приводит к "Я люблю писать код".
`
  },

  // 100
  {
    question: `
const person = {
  name: "John",
  age: 29
}

const changeAge = (x = { ...person }) => x.age += 1
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1
  x.name = "Jane"
}

changeAge(person)
changeAgeAndName()

console.log(person)
`,
    answers: `
A: {name: "Jane", age: 30}
B: {name: "Jane", age: 31}
C: {name: "John", age: 30}
D: {name: "John", age: 31}
`,
    rightAnswer: `C`,
    explanation: `
Функции "changeAge" и "changeAgeAndName" имеют параметры по умолчанию, а именно: вновь созданный объект "{ ...person }". Этот объект имеет копии всех ключей/значений объекта "person". Сначала мы вызываем "changeAge()" и передаем ей объект "person" в качестве аргумента. Эта функция увеличивает значение свойства "age" на 1. "person" теперь равняется "{ name: 'John', age: 30 }". Затем мы вызываем "changeAgeAndName()" без аргументов. Поэтому значение аргумента "x" равняется новому объекту "{ ...person }". Поскольку это новый объект, он не влияет на свойства оригинального объекта "person". "person" по-прежнему равняется "{ name: 'John', age: 30 }".
`
  },

  // 101
  {
    question: `
function sumValues(x, y, z) {
  return x + y + z // 6
}
`,
    answers: `
A: sumValues([...1, 2, 3])
B: sumValues([...[1, 2, 3]])
C: sumValues(...[1, 2, 3])
D: sumValues([1, 2, 3])
`,
    rightAnswer: `C`,
    explanation: `
С помощью spread-оператора (...) мы разбиваем итерируемые сущности на отдельные элементы. Функция "sumValues" принимает три аргумента: x, y и z. Для того, чтобы эта функция вернула 6, ей в качестве аргумента необходимо передать "...[1, 2, 3]".
`
  },

  // 102
  {
    question: `
let num = 1
const list = ['a', 'b', 'c', 'd']

console.log(list[(num += 1)])
`,
    answers: `
A: b
B: c
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
С помощью оператора "+=" мы увеличиваем значение переменной "num" на 1. Начальным значением "num" является 1, выражение "1 + 1" оценивается как 2. Элементом массива со вторым индексом является "c", что и выводится в консоль.
`
  },

  // 103
  {
    question: `
const person = {
  firstName: 'John',
  lastName: 'Smith',
  pet: {
    name: 'Rex',
  },
  getFullName() {
    return \`&#36;{this.firstName} &#36;{this.lastName}\`
  },
}

console.log(person.pet?.name)
console.log(person.pet?.family?.name)
console.log(person.getFullName?.())
console.log(member.getLastName?.())
`,
    answers: `
A: undefined undefined undefined undefined
B: Rex undefined John Smith undefined
C: Rex null John Smith null
D: Error
`,
    rightAnswer: `B`,
    explanation: `
Благодаря оператору опциональной цепочки "?." нам больше не нужно определять наличие глубоко вложенных свойств. Если мы попытаемся получить доступ к свойству значения undefined или null, выражение вернет undefined. person.pet?.name: объект "person" имеет свойство "pet"; "pet" имеет свойство "name", возвращается "Rex". person.pet?.family?.name: объект "person" имеет свойство "pet"; "pet" не имеет свойства "family", возвращается undefined. person.getFullName?.(): объект "person" имеет метод "getFullName", возвращается "John Smith". member.getLastName?.(): переменная "member" не определена, возвращается undefined.
`
  },

  // 104
  {
    question: `
const groceries = ['банан', 'яблоко', 'апельсин']

if (groceries.indexOf('banana')) {
  console.log('Нам нужно купить бананы!')
} else {
  console.log('Нам не нужно покупать бананы!')
}
`,
    answers: `
A: Нам нужно купить бананы!
B: Нам не нужно покупать бананы!
C: undefined
D: 1
`,
    rightAnswer: `B`,
    explanation: `
Условие "groceries.indexOf('banana')" возвращает 0, который является ложным значением. Поскольку условие не удовлетворяется, выполняется код в блоке "else", в консоль выводится "Нам не нужно покупать бананы!"
`
  },

  // 105
  {
    question: `
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang)
  },
}

console.log(config.language)
`,
    answers: `
A: function language(lang) { this.languages.push(lang }
B: 0
C: []
D: undefined
`,
    rightAnswer: `D`,
    explanation: `
Метод "language" - это сеттер. Сеттеры не имеют собственных значений, их задача - модифицировать свойства объекта. Поэтому вызов сеттера возвращает undefined.
`
  },

  // 106
  {
    question: `
const name = 'John Smith'

console.log(!typeof name === 'object')
console.log(!typeof name === 'string')
`,
    answers: `
A: false true
B: true false
C: false false
D: true true
`,
    rightAnswer: `C`,
    explanation: `
Выражение "typeof name" возвращает "string". "string" - это истинное значение, поэтому выражение "!typeof name" возвращает false. false === 'object' и false === 'string' возвращают false (если мы хотим сравнить типы значений вместо "!typeof" следует использовать "!==").
`
  },

  // 107
  {
    question: `
const add = x => y => z => {
  console.log(x, y, z)
  return x + y + z
}

add(4)(5)(6)
`,
    answers: `
A: 4 5 6
B: 6 5 4
C: 4 function function
D: undefined undefined 6
`,
    rightAnswer: `A`,
    explanation: `
Функция "add" возвращает стрелочную функцию, которая возвращает стрелочную функцию, которая возвращает стрелочную функцию (вы еще здесь?). Это называется каррированием (currying). Первая функция принимает аргумент "x" со значением 4. Мы вызываем вторую функцию с аргументом "y" со значением 5. Затем мы вызываем третью функцию с аргументом "z" со значением 6. Когда мы пытаемся получить доступ к значениям "x" и "y", движок JavaScript поднимается по цепочке областей видимости в поисках соответствующих значений. Возвращается "4 5 6".
`
  },

  // 108
  {
    question: `
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i)
  }
}

;(async () => {
  const gen = range(1, 3)
  for await (const item of gen) {
    console.log(item)
  }
})()
`,
    answers: `
A: Promise {1} Promise {2} Promise {3}
B: Promise {<pending>} Promise {<pending>} Promise {<pending>}
C: 1 2 3
D: undefined undefined undefined
`,
    rightAnswer: `C`,
    explanation: `
Функция-генератор "range" возвращает асинхронный объект с промисами для каждого переданного значения: Promise{1}, Promise{2}, Promise{3}. Мы присваиваем переменной "gen" этот объект и перебираем его элементы с помощью цикла "for-await-of". Мы устанавливаем значение переменной "item" равным значению промиса. Поскольку мы ожидаем значения "item", т.е. разрешения промиса, то получаем "1 2 3".
`
  },

  // 109
  {
    question: `
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z)
}

myFunc(1, 2, 3)
`,
    answers: `
A: 1 2 3
B: {1: 1} {2: 2} {3: 3}
C: { 1: undefined } undefined undefined
D: undefined undefined undefined
`,
    rightAnswer: `D`,
    explanation: `
Функция "myFunc" в качестве аргумента ожидает получить объект со свойствами "x", "y" и "z". Поскольку мы передаем ей 1, 2, 3, а не { x: 1, y: 2, z: 3 }, то возвращается значение x, y и z по умолчанию, т.е. undefined.
`
  },

  // 111
  {
    question: `
const spookyItems = ['👻', '🎃', '👿']
({ item: spookyItems[3] } = { item: '💀' })

console.log(spookyItems)
`,
    answers: `
A: ["👻", "🎃", "👿"]
B: ["👻", "🎃", "👿", "💀"]
C: ["👻", "🎃", "👿", { item: "💀" }]
D: ["👻", "🎃", "👿", "[object Object]"]
`,
    rightAnswer: `B`,
    explanation: `
Деструктурируя объекты, мы распаковываем значения правого объекта и присваиваем их одноименному свойству левого объекта. В данном случае, мы присваиваем значение "💀" spookyItems[3]. Это означает, что мы модифицируем массив "spookyItems", добавляя в него "💀". Поэтому получаем ["👻", "🎃", "👿", "💀"].
`
  },

  // 112
  {
    question: `
const name = 'John Smith'
const age = 30

console.log(Number.isNaN(name))
console.log(Number.isNaN(age))

console.log(isNaN(name))
console.log(isNaN(age))
`,
    answers: `
A: true false true false
B: true false false false
C: false false true false
D: false true false true
`,
    rightAnswer: `C`,
    explanation: `
С помощью "Number.isNaN()" мы проверяем, является ли переданное значение числом и равняется ли оно NaN. "name" не является числом, поэтому "Number.isNaN(name)" возвращает false. "age" является числом, но не равняется NaN, поэтому "Number.isNaN(age)" также возвращает false. С помощью метода "isNaN" мы проверяем, что переданное значение не является числом. "name" не является числом, поэтому "isNaN(name)" возвращает true. "age" является числом, поэтому "isNaN(age)" возвращает false.
`
  },

  // 113
  {
    question: `
const randomValue = 30

function getInfo() {
  console.log(typeof randomValue)
  const randomValue = 'John Smith'
}

getInfo()
`,
    answers: `
A: number
B: string
C: undefined
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Переменные, объявленные с помощью ключевого слова "const" (и "let") недоступны до инициализации (это называется "временной мертвой зоной"). В "getInfo()" областью видимости переменной "randomValue" является функция. Когда мы пытаемся вывести значение "randomValue" в консоль, выбрасывается исключение "ReferenceError". Движок не поднимается по цепочке областей видимости, поскольку мы объявили переменную "randomValue" в функции "getInfo". Если бы мы этого не сделали, в консоль бы вывелся тип внешней переменной "randomValue", т.е. "number".
`
  },

  // 114
  {
    question: `
const myPromise = Promise.resolve('Woah some cool data')

;(async () => {
  try {
    console.log(await myPromise)
  } catch {
    throw new Error(\`Oops didn't work\`)
  } finally {
    console.log('Oh finally')
  }
})()
`,
    answers: `
A: Woah some cool data
B: Oh finally
C: Woah some cool data и Oh finally
D: Oops didn't work и Oh finally
`,
    rightAnswer: `C`,
    explanation: `
В блоке "try" мы выводим в консоль ожидаемое значение переменной "myPromise" - "Woah some cool data". Поскольку в блоке "try" не возникло ошибки, код в блоке "catch" не выполняется. Код в блоке "finally" выполняется всегда, поэтому в консоль выводится "Oh finally".
`
  },

  // 115
  {
    question: `
const emojis = ['💫', ['✨', '✨', ['🍕', '🍕']]]

console.log(emojis.flat(1))
`,
    answers: `
A: ['💫', ['✨', '✨', ['🍕', '🍕']]]
B: ['💫', '✨', '✨', ['🍕', '🍕']]
C: ['💫', ['✨', '✨', '🍕', '🍕']]
D: ['💫', '✨', '✨', '🍕', '🍕']
`,
    rightAnswer: `B`,
    explanation: `
С помощью метода "flat" мы создаем новый "плоский" массив. Глубина этого массива зависит от передаваемого значения. В данном случае, мы передаем значение 1 (чего мы могли бы не делать, поскольку это является значением по умолчанию), значит, будут объединены только массивы первого уровня вложенности, т.е. ['💫'] и ['✨', '✨', ['🍕', '🍕']]. Результатом объединения этих массивов является "['💫', '✨', '✨', ['🍕', '🍕']]".
`
  },

  // 116
  {
    question: `
class Counter {
  constructor() {
    this.count = 0
  }

  increment() {
    this.count++
  }
}

const counterOne = new Counter()
counterOne.increment()
counterOne.increment()

const counterTwo = counterOne
counterTwo.increment()

console.log(counterOne.count)
`,
    answers: `
A: 0
B: 1
C: 2
D: 3
`,
    rightAnswer: `D`,
    explanation: `
Переменная "counterOne" является экземпляром класса "Counter". Класс "Counter" содержит свойство "count" в конструкторе и метод "increment", увеличивающий значение данного свойства на 1. Сначала мы дважды вызываем "increment()". Значением "counterOne.count" становится 2. Затем мы создаем новую переменную "counterTwo" и присваиваем ей значение переменной "counterOne". Поскольку объекты взаимодействуют между собой через ссылки, мы просто создали новую ссылку на тоже самое место в памяти, на которое указывает "counterOne". Поскольку обе переменные ссылаются на одну и ту же область памяти, любые изменения объекта, на который ссылается "counterTwo" также влияют на "counterOne". Таким образом, значением "counterTwo" является 2. Мы вызываем "counterTwo.increment()", который увеличивает значение свойства "count" до 3. Наконец, мы выводим в консоль "counterOne.count", которое также равняется 3.
`
  },

  // 117
  {
    question: `
const myPromise = Promise.resolve(
    Promise.resolve('Promise!')
  )

function funcOne() {
  myPromise.then(res => res).then(res => console.log(res))
  setTimeout(() => console.log('Timeout!', 0))
  console.log('Last line!')
}

async function funcTwo() {
  const res = await myPromise
  console.log(await res)
  setTimeout(() => console.log('Timeout!', 0))
  console.log('Last line!')
}

funcOne()
funcTwo()
`,
    answers: `
A: Promise! Last line! Promise! Last line! Last line! Promise!
B: Last line! Timeout! Promise! Last line! Timeout! Promise!
C: Promise! Last line! Last line! Promise! Timeout! Timeout!
D: Last line! Promise! Promise! Last line! Timeout! Timeout!
`,
    rightAnswer: `D`,
    explanation: `
Сначала мы вызываем функцию "funcOne". На первой строке этой функции мы вызываем промис "myPromise", который является асинхронной операцией. Пока движок занят разрешением промиса, выполнение "myFunc()" продолжается. На следующей строке у нас асинхронная функция "setTimeout",которая отправляется в WebAPI. Промис и "setTimeout()" являются асинхронными, поэтому движок продолжает выполнять код функции, не ожидая разрешения промиса и обработки "setTimeout()". Сказанное означает, что сначала в консоль выводится "Last line!", поскольку "console.log()" не асинхронная операция. Это последняя строка кода в "myFunc()", промис разрешается и в консоль выводится "Promise!".<br>
В момент вызова функции "funcTwo" стек вызовов (call stack) не является пустым, поэтому колбэк "setTimeout()" не может туда попасть. В "funcTwo()" мы сначала ожидаем разрешение промиса "myPromise". С помощью ключевого слова "await" мы приостанавливаем выполнение функции до разрешения (выполнения или отклонения) промиса. Затем мы выводим в консоль ожидаемое значение переменной "res" (поскольку промис возвращает промис). В консоль выводится "Promise!". На следуюей строке у нас снова асинхронная функция "setTimeout", которая отправляется в WebAPI. Мы достигаем последней строки кода в "funcTwo()", в консоль выводится "Last line!".<br>
После того, как "funcTwo()" удаляется из стека вызовов, стек оказывается пустым. Ожидающие этого в очереди задач колбэки ("console.log("Timeout!")" из "funcOne()" и "console.log("Timeout!")" из "funcTwo()") помещаются туда одна за другой. Первый колбэк выводит в консоль "Timeout!" и удаляется из стека, затем тоже самое происходит со вторым колбэком. Таким образом, мы получаем "Last line! Promise! Promise! Last line! Timeout! Timeout!".
`
  },

  // 118
  {
    question: `
// sum.js
export default function sum(x) {
  return x + x
}

// index.js
import * as sum from './sum'
/* вызов функции "sum" */
`,
    answers: `
A: sum()
B: sum.sum()
C: sum.default()
D: символ * может использоваться только при именованном экспорте
`,
    rightAnswer: `C`,
    explanation: `
С помощью символа "*" мы импортируем все экспортируемые из файла данные, как дефолтные, так и именованные. Если у нас есть такой файл: <br>
// info.js<br>
export const name = 'John'<br>
export const age = 30<br>
export default 'I love JavaScript!'<br>
<br>
// index.js
import * as info from './info'<br>
console.log(info)<br>
В консоль будет выведено: <br>
{ default: "I love JavaScript!", name: "John", age: 30 } <br>
В данном случае, импортированное значение функции "sum" выглядит примерно так: <br>
{ default: function sum(x) { return x + x } } <br>
Мы можем вызвать эту функцию посредством sum.default().
`
  },

  // 119
  {
    question: `
const handler = {
  set: () => console.log('Added a new property!'),
  get: () => console.log('Accessed a property!'),
}

const person = new Proxy({}, handler)

person.name = 'John'
person.name
`,
    answers: `
A: Added a new property!
B: Accessed a property!
C: Added a new property! Accessed a property!
D: Error
`,
    rightAnswer: `C`,
    explanation: `
С помощью прокси (Proxy) мы можем добавить объекту, передаваемому в качестве второго аргумента, определенное поведение. В данном случае, мы передаем объект "handler", который имеет два свойства: "set" и "get". "set" вызывается при установке значений, а "get" - при их получении. Первый аргумент прокси - пустой объект ({}), который является значением "person". Поведение этого объекта определено в объекте "handler". При добавлении свойства объекту "person" вызывается метод "set". При получении доступа к свойству "person" вызывается "get". Сначала мы добавляем прокси новое свойство "name". Вызывается метод "set" и в консоль выводится "Added a new property!". Затем мы получаем значение свойства "name". Вызывается "get" и в консоль выводится "Accessed a property!".
`
  },

  // 120
  {
    question: `
const person = {
  name: 'John Smith',
  address: {
      street: '100 Some Street',
  }
}

Object.freeze(person)
person.address.street = "101 Main Street"
console.log(person.address.street)
`,
    answers: `
A: false
B: 100 Some Street
C: 101 Main Street
D: Error
`,
    rightAnswer: `С`,
    explanation: `
Object.freeze() "замораживает" объект. В такой объект нельзя добавлять новые свойства, а существующие свойства не могут изменяться или удаляться. Тем не менее, объект замораживается поверхностно. Это означает, что свойства первого уровня вложенности иммутабульны (неизменяемы). Однако, в случае, когда таким свойством является объект ("address" в нашем случае), его свойства можно изменять.
`
  },

  // 121
  {
    question: `
const add = x => x + x

function myFunc(num = 2, value = add(num)) {
  console.log(num, value)
}

myFunc()
myFunc(3)
`,
    answers: `
A: 2 4 и 3 6
B: 2 NaN и 3 NaN
C: 2 undefined и 3 6
D: 2 4 и 3 undefined
`,
    rightAnswer: `A`,
    explanation: `
Сначала мы вызываем функцию "myFunc" без аргументов. Поэтому аргументам присваиваются значения по умолчанию: "num" - 2, а "value" - значение функции "add". Мы передаем "add()" значение "num" в качестве аргумента, которое равняется 2. "add()" возвращает 4, что является значением "value". Затем мы вызываем "myFunc()" с аргументом 3, которое присваивается "num". Поскольку мы не присваиваем значения "value", его значением вновь становится значение, возвращаемое "add()". Мы передаем "add()" значение 3, она возвращает 6, что и является значением "value".
`
  },

  // 122
  {
    question: `
class Counter {
  #number = 10

  increment() {
      this.#number++
  }

  getNum() {
      return this.#number
  }
}

const counter = new Counter()
counter.increment()

console.log(counter.#number)
`,
    answers: `
A: 10
B: 11
C: undefined
D: Error
`,
    rightAnswer: `D`,
    explanation: `
В ECMAScript 2020 мы можем добавлять классам приватные переменные с помощью символа "#". Мы не можем получить доступ к таким переменным за пределами класса. Поэтому, когда мы пытается вывести в консоль значение "counter.#number", выбрасывается исключение "SyntaxError".
`
  },

  // 123
  {
    question: `
const teams = [
  { name: 'Team 1', members: ['John', 'Jane'] },
  { name: 'Team 2', members: ['Alice', 'Bob'] },
]

function* getMembers(members) {
  for (let i = 0; i < members.length; i++) {
    yield members[i]
  }
}

function* getTeams(teams) {
  for (let i = 0; i < teams.length; i++) {
    /* ? */
  }
}

const obj = getTeams(teams)
obj.next() // { value: "John", done: false }
obj.next() // { value: "Jane", done: false }
`,
    answers: `
A: yield getMembers(teams[i].members)
B: yield* getMembers(teams[i].members)
C: return getMembers(teams[i].members)
D: return yield getMembers(teams[i].members)
`,
    rightAnswer: `B`,
    explanation: `
Для того, чтобы перебрать "members" в каждом элементе массива "items", нам необходимо передать "teams[i].members" в функцию-генератор "getMembers". Генератор возвращает объект. Для того, чтобы перебрать элементы этого объекта следует использовать "yield*". Если мы не укажем yield, return yield или return, внутренняя функция-генератор не будет возвращена при первом вызове метода "next".
`
  },

  // 124
  {
    question: `
const person = {
  name: 'John Smith',
  hobbies: ['coding'],
}

function addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby)
  return hobbies
}

addHobby('running', [])
addHobby('dancing')
addHobby('baking', person.hobbies)

console.log(person.hobbies)
`,
    answers: `
A: ["coding"]
B: ["coding", "dancing"]
C: ["coding", "dancing", "baking"]
D: ["coding", "running", "dancing", "baking"]
`,
    rightAnswer: `C`,
    explanation: `
Функция "addHobby" принимает два аргумента: "hobby" и "hobbies" с дефолтным значением, равным свойству "hobbies" объекта "person". Сначала мы вызываем "addHobby()" и передаем ей "running" в качестве значения для "hobby" и пустой массив в качестве значения для "hobbies". Поскольку мы передали пустой массив в качестве значения для "hobbies", в него добавляется "running". Затем мы вызываем "addHobby()" и передаем ей "dancing" в качестве значения для "hobby". Мы не передаем значения для "hobbies", поэтому он получает значение по умолчанию, т.е. значение свойства "hobbies" объекта "person". В этот массив добавляется "dancing". Наконец, мы вызываем "addHobby()" и передаем ей "baking" в качестве значения для "hobby" и массив "person.hobbies" в качестве значения для "hobbies". Мы добавляем "baking" в массив "person.hobbies". После добавления "dancing" и "baking" значением "person.hoobies" является ["coding", "dancing", "baking"].
`
  },

  // 125
  {
    question: `
class Bird {
  constructor() {
    console.log("I'm a bird. 🐤")
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸")
    super()
  }
}

const pet = new Flamingo()
`,
    answers: `
A: I'm pink. 🌸
B: I'm pink. 🌸 и I'm a bird. 🐤
C: I'm a bird. 🐤 и I'm pink. 🌸
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Мы создаем переменную "pet", которая является экземпляром класса "Flamingo". При создании экземпляра вызывается "constructor()". В консоль выводится "I'm pink. 🌸", после чего вызывается "super()". "super()" вызывает конструктор родительского класса. В консоль выводится "I'm a bird. 🐤".
`
  },

  // 126
  {
    question: `
const person = {
  name: "John Smith",
  age: 30
}

[...person] // ["John Smith", 30]
`,
    answers: `
A: объекты являются итерируемыми по умолчанию
B: *[Symbol.iterator]() { for (let x in this) yield* this[x] }
C: *[Symbol.iterator]() { yield* Object.values(this) }
D: *[Symbol.iterator]() { for (let x in this) yield this }
`,
    rightAnswer: `C`,
    explanation: `
Объекты не являются итерируемыми по умолчанию. В итерируемых сущностях имеется протокол итератора. Мы можем сделать это вручную, добавив символ итератора ([Symbol.iterator]), который будет возвращать объект-генератор, например, сделав исходный объект функцией-генератором с помощью "[Symbol.iterator]() {}". Эта функция-генератор должна перебирать значения объекта "person". Если мы хотим вернуть массив "['John Smith', 30]", то объект должен выглядеть так: "yield* Object.values(this)".
`
  },

  // 127
  {
    question: `
let count = 0
const nums = [0, 1, 2, 3]

nums.forEach(num => {
  if (num) count += 1
})

console.log(count)
`,
    answers: `
A: 1
B: 2
C: 3
D: 4
`,
    rightAnswer: `C`,
    explanation: `
Условие в цикле "forEach" проверяет, является ли значение переменной "num" истинным. Поскольку первым значением "num" является 0 (ложное значение), код в блоке "if" не выполняется. Остальные значения "num" (1, 2, 3) являются истинными, поэтому значение "count" увеличивается на 1 три раза. В результате значением "count" становится 3.
`
  },

  // 128
  {
    question: `
function getFruit(fruits) {
  console.log(fruits?.[1]?.[1])
}

getFruit([['🍊', '🍌'], ['🍍']])
getFruit()
getFruit([['🍍'], ['🍊', '🍌']])
`,
    answers: `
A: null undefined 🍌
B: [] null 🍌
C: [] [] 🍌
D: undefined undefined 🍌
`,
    rightAnswer: `D`,
    explanation: `
Оператор "?." (опциональная цепочка) позволяет нам безопасно получать доступ к глубоко вложенным свойствам объектов. Мы пытаемся вывести в консоль элемент с индексом 1 подмассива с индексом 1 массива "fruits". Если подмассива с индексом 1 в массиве "fruits" не существует, возвращается undefined. Если подмассив с индексом 1 в массиве "fruits" существует, но не имеет элемента с индексом 1, также возвращается undefined. Сначала мы пытаемся вывести в консоль второй элемент подмассива ['🍍'] массива [['🍊', '🍌'], ['🍍']]]. Этот подмассив состоит из одного элемента, т.е. элемента с индексом 1 не существует, поэтому возвращается undefined. Затем мы вызываем функцию "getFruits" без аргументов, поэтому массив "fruits" имеет значение undefined. Наконец, мы пытаемся вывести в консоль второй элемент подмассива ['🍊', '🍌'] массива ['🍍'], ['🍊', '🍌']. Элементом с индексом 1 этого подмассива является "🍌", что и выводится в консоль.
`
  },

  // 129
  {
    question: `
class Calc {
  constructor() {
    this.count = 0
  }

  increase() {
    this.count++
  }
}

const calc = new Calc()
new Calc().increase()

console.log(calc.count)
`,
    answers: `
A: 0
B: 1
C: undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Мы присваиваем переменной "calc" значение нового экземпляра класса "Calc". Затем мы инициализируем новый экземпляр класса "Calc" и вызываем метод "increase" этого экземпляра. Поскольку свойство "count" находится в конструкторе класса "Calc", данное свойство не является общим для экземпляров класса "Calc". Это означает, что свойство "count" не обновляется для "calc", оно по-прежнему равняется 0.
`
  },

  // 130
  {
    question: `
const user = {
  email: "e@mail.com",
  password: "12345"
}

const updateUser = ({ email, password }) => {
  if (email) {
    Object.assign(user, { email })
  }

  if (password) {
    user.password = password
  }

  return user
}

const updatedUser = updateUser({ email: "new@email.com" })

console.log(updatedUser === user)
`,
    answers: `
A: false
B: true
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Функция "updateUser" обновляет свойства "email" и "password" объекта "user", если их значения переданы в качестве аргументов, после чего функция возвращает объект "user". Значением, которое вернула "updateUser()", является объект "user". Таким образом, переменная "updatedUser" ссылается на то же место в памяти, что и сам "user". Поэтому выражение "updatedUser === user" возвращает true.
`
  },

  // 131
  {
    question: `
const fruits = ['🍌', '🍊', '🍎']

fruits.slice(0, 1)
fruits.splice(0, 1)
fruits.unshift('🍇')

console.log(fruits)
`,
    answers: `
A: ['🍌', '🍊', '🍎']
B: ['🍊', '🍎']
C: ['🍇', '🍊', '🍎']
D: ['🍇', '🍌', '🍊', '🍎']
`,
    rightAnswer: `C`,
    explanation: `
Сначала мы вызываем метод "slice" для массива "fruits". Данный метод не модифицирует исходный массив и возвращает извлеченное значение: "🍌". Затем мы вызываем метод "splice". Данный метод модифицирует исходный массив, "fruits" теперь состоит из ['🍊', '🍎']. Наконец, мы вызываем метод "unshift", который также модифицирует исходный массив, добавляя к нему '🍇' в качестве первого элемента. Массив "fruits" теперь состоит из ['🍇', '🍊', '🍎'].
`
  },

  // 132
  {
    question: `
const animals = {}
let dog = { emoji: '🐶' }
let cat = { emoji: '🐈' }

animals[dog] = { ...dog, name: "Rex" }
animals[cat] = { ...cat, name: "Niko" }

console.log(animals[dog])
`,
    answers: `
A: { emoji: "🐶", name: "Rex" }
B: { emoji: "🐈", name: "Niko" }
C: undefined
D: Error
`,
    rightAnswer: `B`,
    explanation: `
Ключи объекта конвертируются (преобразуются) в строки. Поскольку значением переменной "dog" является объект, "animals[dog]" означает, что мы создаем новое свойство с именем "object Object", значением которого является новый объект. animals["object Object"] равняется { emoji: "🐶", name: "Rex"}. Значением переменной "cat" также является объект. Это означает, что мы перезаписываем свойство animals["object Object"] новым значением. Поэтому, когда мы выводим в консоль "animals[dog]", мы на самом деле обращаемся к animals["object Object"], поэтому получаем { emoji: "🐈", name: "Niko" }.
`
  },

  // 133
  {
    question: `
const user = {
  email: "my@email.com",
  updateEmail: email => {
    this.email = email
  }
}

user.updateEmail("new@email.com")
console.log(user.email)
`,
    answers: `
A: my@email.com
B: new@email.com
C: undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Функция "updateEmail" является стрелочной, поэтому она не привязана к объекту "user". Это означает, что ключевое слово "this" не ссылается на объект "user". В данном случае, "this" указывает на глобальную область видимости ("window" в браузере, "global" в Node.js). Значение свойства "email" объекта "user" не обновляется. Поэтому, когда мы обращаемся к "user.email", в консоль выводится "my@email.com".
`
  },

  // 134
  {
    question: `
const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')

const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2])
  const res2  = await Promise.all([promise3, promise4])
  return [res1, res2]
}

runPromises()
  .then(res => console.log(res))
  .catch(er => console.log(er))
`,
    answers: `
A: [['First', 'Second'] и ['Fourth']]
B: [['First', 'Second'] и ['Third', 'Fourth']]
C: [['First', 'Second']]
D: 'Third'
`,
    rightAnswer: `D`,
    explanation: `
"Promise.all()" выполняет переданные ему промисы одновременно (параллельно). Если один из промисов отклоняется, "Promise.all()" также отклоняется со значением отклоненного промиса. В данном случае, "promise3" отклоняется со значением "Third". Мы обрабатываем отклоненное значение в блоке "catch" вызова функции "runPromises". Поэтому в консоль выводится только "Third".
`
  },

  // 135
  {
    question: `
const keys = ["name", "age"]
const values = ["John", 30]

const method = /* ? */

Object[method](keys.map((_, i) => {
  return [keys[i], values[i]]
})) // { name: "John", age: 30 }
`,
    answers: `
A: entries
B: values
C: fromEntries
D: forEach
`,
    rightAnswer: `C`,
    explanation: `
Метод "fromEntries" преобразует двумерный массив в объект. Первый элемент каждого подмассива становится ключом, а второй - значением. В данном случае, мы перебираем элементы массива "keys", возвращая массив, первым элементом которого является элемент массива "keys" с текущим индексом, вторым элементом - элемент массива "values" с текущим индексом. Это создает массив массивов с правильными ключами и значениями, которые преобразуются в "{ name: 'John', age: 30 }".
`
  },

  // 136
  {
    question: `
const createMember = ({ email, address = {}}) => {
  const validEmail = /.+\@.+\..+/.test(email)
  if (!validEmail) throw new Error("Valid email please")

  return {
    email,
    address: address ? address : null
  }
}

const member = createMember({ email: "my@email.com" })
console.log(member)
`,
    answers: `
A: { email: "my@email.com", address: null }
B: { email: "my@email.com" }
C: { email: "my@email.com", address: {} }
D: { email: "my@email.com", address: undefined }
`,
    rightAnswer: `C`,
    explanation: `
Значением "address" по умолчанию является пустой объект ({}). Когда мы присваиваем переменной "member" значение, возвращаемое функцией "createMember", мы не передаем значение для "address", поэтому ее значением становится "{}". Пустой объект - это истинное значение, поэтому условие "address ? address : null" возвращает "address". Значением "address" остается "{}".
`
  },

  // 137
  {
    question: `
let randomValue = { name: "John" }
randomValue = 30

if (!typeof randomValue === "string") {
  console.log("Это не строка!")
} else {
  console.log("Это строка!")
}
`,
    answers: `
A: Это не строка!
B: Это строка!
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Условие проверяет, является ли "!typeof randomValue" строкой. Оператор "!" преобразует значение в логический тип данных. Если значение истинно, возвращается false, если ложно - true. В данном случае, значением "typeof randomValue" является "number", что есть истина, поэтому возвращается false. Выражение "!typeof randomValue === 'string'" возвращает false, поскольку на самом деле мы проверяем "false === 'string'". Условие возвращает false, поэтому выполняется код в блоке "else", и в консоль выводится "Это строка!".
`
  },

  // https://github.com/sudheerj/javascript-interview-questions
  // 138
  {
    question: `
var car = new Vehicle("Honda", "white", "2010", "UK")
console.log(car)

function Vehicle(model, color, year, country) {
  this.model = model
  this.color = color
  this.year = year
  this.country = country
}
`,
    answers: `
A: undefined
B: Error
C: null
D: { model: "Honda", color: "white", year: "2010", country: "UK" }
`,
    rightAnswer: `D`,
    explanation: `
Объявление функции поднимается подобно объявлению переменной. Это называется поднятием или подъемом (hoisting). Поэтому место объявления функции "Venicle" значения не имеет.
`
  },

  // 139
  {
    question: `
function foo() {
  let x = y = 0
  x++
  y++
  return x
}

console.log(foo(), typeof x, typeof y)
`,
    answers: `
A: 1 undefined undefined
B: Error
C: 1 undefined number
D: 1 number number
`,
    rightAnswer: `C`,
    explanation: `
Функция "foo" возвращает 1 из-за оператора "++". Выражение "let x = y = 0" определяет локальную переменную "x". Однако "y" определяется как глобальная переменная. Данное выражение эквивалентно следующему: <br>
let x <br>
window.y = 0 <br>
x = window.y <br>
Поскольку переменная "x" за пределами функции имеет значение undefined, т.е. не определена, ее типом также является undefined. Однако "y" за пределами функции доступна и имеет значение "0" с типом "number".
`
  },

  // 140
  {
    question: `
function main() {
  console.log('A')
  setTimeout(function print() {
    console.log('B')
  }, 0)
  console.log('C')
}

main()
`,
    answers: `
A: A B C
B: B A C
C: A C
D: A C B
`,
    rightAnswer: `D`,
    explanation: `
Порядок выполнения функций зависит от стека вызовов (call stack). В данном случае, он будет следующим: <br>
1. Сначала в стек помещается функция "main". <br>
2. Затем в стек помещается console.log('A'), выполняется и удаляется из стека. <br>
3. Далее "setTimeot()" отправляется в WebAPI, а оставшийся код продолжает выполняться. <br>
4. В стек помещается console.log('C'), выполняется и удаляется из стека. <br>
5. Колбэк "setTimeout()" помещается в очередь задач (task queue, второе слово читается как "кью"). <br>
6. Функция "main" удаляется из стека. <br>
7. После того, как стек вызовов опустел, в него помещается колбэк из очереди задач. <br>
8. В стек помещается console.log('B'), выполняется и удаляется из стека.
`
  },

  // 141
  {
    question: `
console.log(0.1 + 0.2 === 0.3)
`,
    answers: `
A: false
B: true
C: undefined
D: Error
`,
    rightAnswer: `A`,
    explanation: `
Здесь мы имеем дело с распространенной проблемой чисел с плавающей точкой (или запятой, или чисел двойной точности, см. IEEE 754). Поскольку такие числа преобразуются в двоичные данные, имеет место некоторая неточность округления. Поэтому математические операции с названными числами порой приводят к неожиданным результатам. В частности, значением выражения "0.1 + 0.2" будет 0.30000000000000004, что чуть больше, чем 0.3. Поэтому сравнение "0.1 + 0.2 === 0.3" возвращает false.
`
  },

  // 142
  {
    question: `
var y = 1
if (function f(){}) {
  y += typeof f
}
console.log(y)
`,
    answers: `
A: 1function
B: 1object
C: Error
D: 1undefined
`,
    rightAnswer: `D`,
    explanation: `
Условие "if (function f(){})" возвращает true. Поскольку переменная "f" нигде не определяется, она имеет значение undefined по умолчанию с типом undefined.
`
  },

  // 143
  {
    question: `
function foo() {
return
  {
    message: "Hello World"
  }
}
console.log(foo())
`,
    answers: `
A: Hello World
B: Object { message: "Hello World" }
C: undefined
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Здесь мы имеем дело с автоматической расстановкой точек с запятой. В данном случае, точка с запятой автоматически вставляется после оператора "return". Поэтому функция возвращает undefined. <br>
Если поставить "{" перед return, то функция будет работать, как ожидается: <br>
function foo() { return { message: 'Hello World' } } <br>
console.log(foo()) // { message: 'Hello World' }
`
  },

  // 144
  {
    question: `
var myChars = ['a', 'b', 'c', 'd']
delete myChars[0]
console.log(myChars)
console.log(myChars[0])
console.log(myChars.length)
`,
    answers: `
A: [empty, 'b', 'c', 'd'] empty 3
B: [null, 'b', 'c', 'd'] empty 3
C: [empty, 'b', 'c', 'd'] undefined 4
D: [null, 'b', 'c', 'd'] undefined 4
`,
    rightAnswer: `C`,
    explanation: `
Оператор "delete" удаляет свойства объекта, но не индексы массива. Точнее, удаляется только значение массива по указанному индексу, сам индекс остается, его значением становится undefined. Поэтому количество элементов в массиве или его длина сохраняется.
`
  },

  // 146
  {
    question: `
const obj = {
  prop1: function() { return 0 },
  prop2() { return 1 },
  ['prop' + 3]() { return 2 }
}

console.log(obj.prop1())
console.log(obj.prop2())
console.log(obj.prop3())
`,
    answers: `
A: 0 1 2
B: 0 { return 1 } 2
C: 0 { return 1 } { return 2 }
D: 0 1 undefined
`,
    rightAnswer: `A`,
    explanation: `
ES6, среди прочего, представил новые способы определения методов и сокращения свойств объекта. Поэтому "prop2" и "prop3" обрабатываются как обычные функции.
`
  },

  // 147
  {
    question: `
console.log(1 < 2 < 3)
console.log(3 > 2 > 1)
`,
    answers: `
A: true true
B: true false
C: Error
D: false false
`,
    rightAnswer: `B`,
    explanation: `
Если в блоке "if" содержатся одинаковые операторы, то выражение оценивается слева направо. Для первого выражения порядок будет следующим: <br>
console.log(1 < 2 < 3) <br>
console.log(true < 3) <br>
console.log(1 < 3) // true <br>
А для второго таким: <br>
console.log(3 > 2 > 1) <br>
console.log(true > 1) <br>
console.log(1 > 1) // false <br>
`
  },

  // 148
  {
    question: `
// код выполняется в нестрогом режиме
function printNumbers (first, second, first) {
  console.log(first, second, first)
}
printNumbers(1, 2, 3)
`,
    answers: `
A: 1 2 3
B: 3 2 3
C: Error
D: 1 2 1
`,
    rightAnswer: `B`,
    explanation: `
В нестрогом режиме дублирующиеся параметры в обычных функциях разрешены. В приведенном примере дублирующимися являются параметры 1 и 3. Первый параметр указывает на третий аргумент, передаваемый функции. Поэтому третий аргумент перезаписывает первый параметр. Обратите внимание, что в строгом режиме будет выброшено исключение.
`
  },

  // 149
  {
    question: `
// код выполняется в нестрогом режиме
const printNumbersArrow = (first, second, first) => {
  console.log(first, second, first)
}
printNumbersArrow(1, 2, 3)
`,
    answers: `
A: 1, 2, 3
B: 3, 2, 3
C: Error
D: 1, 2, 1
`,
    rightAnswer: `C`,
    explanation: `
В отличие от обычных, в стрелочных функциях дублирующиеся параметры запрещены, независимо от режима выполнения кода. Поэтому в данном случае будет выброшено исключение "SyntaxError: Duplicate parameter name not allowed in this context".
`
  },

  // 150
  {
    question: `
const f = () => arguments.length
console.log(f(1, 2, 3))
`,
    answers: `
A: Error
B: 3
C: undefined
D: null
`,
    rightAnswer: `A`,
    explanation: `
Стрелочные функции не имеют arguments, this, super и new.target. Поэтому любое обращение к "arguments" приводит к поиску переменной с таким названием в лексическом окружении функции. В данном случае, переменной "arguments" не существует. Поэтому возникнет ошибка.<br>
В обычных функциях "arguments" - это массивоподобный объект, содержащий переданные функции аргументы: <br>
const f = function () { return arguments.length } <br>
console.log(f(1, 2, 3)) // 3 <br>
В стрелочных функциях альтернативой "arguments" является rest-оператор "..." (прочие параметры): <br>
const f = (...args) => args.length <br>
console.log(f(1, 2, 3)) // 3 <br>
`
  },

  // 151
  {
    question: `
console.log( String.prototype.trimLeft.name === 'trimLeft' )
console.log( String.prototype.trimLeft.name === 'trimStart' )
`,
    answers: `
A: true false
B: false true
C: undefined
D: null
`,
    rightAnswer: `B`,
    explanation: `
По аналогии с "String.prototype.padStart" стандартный метод для удаления пробелов в начале строки был назван "trimStart". Однако для обеспечения обратной совместимости название "trimLeft" было сохранено в качестве синонима (алиаса) для "trimStart". При этом, прототипом "trimLeft" является "trimStart".
`
  },

  // 152
  {
    question: `
console.log(Math.max())
`,
    answers: `
A: undefined
B: Infinity
C: 0
D: -Infinity
`,
    rightAnswer: `D`,
    explanation: `
-Infinity - это наименьшее из сравниваемых значений, поскольку почти любое другое значение в JavaScript больше него. Поэтому, когда "Math.max()" вызывается без аргументов, возвращается "-Infinity".
`
  },

  // 153
  {
    question: `
console.log(10 == [10])
console.log(10 == [[[[[[[10]]]]]]])
`,
    answers: `
A: true true
B: true false
C: false false
D: false true
`,
    rightAnswer: `A`,
    explanation: `
Согласно спецификации приведенные выражения будут преобразованы следующим образом: <br>
10 == Number([10].valueOf().toString()) // 10 <br>
Поэтому количество скобок не имеет значения.
`
  },

  // 154
  {
    question: `
console.log(10 + '10')
console.log(10 - '10')
`,
    answers: `
A: 20 0
B: 1010 0
C: 1010 10-10
D: NaN NaN
`,
    rightAnswer: `B`,
    explanation: `
Оператор "+" применяется как к числам, так и к строкам. Если одним из операндов является строка, тогда второй операнд также приводится к строке, и операнды объединяются. Это называется конкатенацией. Оператор "-" пытается преобразовать операнды в числа. При невозможности это сделать возращается NaN.
`
  },

  // 155
  {
    question: `
console.log([1, 2] + [3, 4])
`,
    answers: `
A: [1,2,3,4]
B: [1,2][3,4]
C: Error
D: 1,23,4
`,
    rightAnswer: `D`,
    explanation: `
Оператор "+" не предназначен для сложения массивов. Поэтому массивы преобразуются в строки и объединяются.
`
  },

  // 156
  {
    question: `
const numbers = new Set([1, 1, 2, 3, 4])
console.log(numbers)

const browser = new Set('Firefox')
console.log(browser)
`,
    answers: `
A: {1, 2, 3, 4} и {"F", "i", "r", "e", "f", "o", "x"}
B: {1, 2, 3, 4} и {"F", "i", "r", "e", "o", "x"}
C: [1, 2, 3, 4] и ["F", "i", "r", "e", "o", "x"]
D: {1, 1, 2, 3, 4} и {"F", "i", "r", "e", "f", "o", "x"}
`,
    rightAnswer: `A`,
    explanation: `
Set - это объект, представляющий собой коллекцию уникальных значений, поэтому повторяющиеся значения в него не включаются. В тоже время, данный объект является чуствительным к регистру, поэтому в коллекцию записываются и "F", и "f".
`
  },

  // 157
  {
    question: `
console.log(NaN === NaN)
`,
    answers: `
A: true
B: false
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
NaN согласно стандарту IEEE 754 не равен никакому другому значению, включая NaN. Еще одной интересной особенностью NaN является то, что данное значение представляет собой неправильное, но все-таки число, несмотря на то, что NaN расшифровывается как "Not a Number" (не число). Для того, чтобы убедиться в том, что NaN - это число, выполните "console.log(typeof NaN)".
`
  },

  // 158
  {
    question: `
const numbers = [1, 2, 3, 4, NaN]
console.log(numbers.indexOf(NaN))
`,
    answers: `
A: 4
B: NaN
C: Error
D: -1
`,
    rightAnswer: `D`,
    explanation: `
"indexOf()" использует оператор строгого равенства (===), а поскольку NaN не равен никокому другому значению, включая NaN, выражение "NaN === NaN" возвращает false. "indexOf()" не может найти NaN в массиве, возвращается "-1". Для поиска индекса NaN можно использовать метод "findIndex". Также для проверки наличия NaN в массиве можно использовать метод "includes": <br>
const numbers = [1, 2, 3, 4, NaN] <br>
console.log(numbers.findIndex(Number.isNaN)) // 4 <br>
console.log(numbers.includes(Number.isNaN)) // true
`
  },

  // 159
  {
    question: `
const [a, ...b,] = [1, 2, 3, 4, 5]
console.log(a, b)
`,
    answers: `
A: 1 [2, 3, 4, 5]
B: 1 {2, 3, 4, 5}
C: Error
D: 1 [2, 3, 4]
`,
    rightAnswer: `C`,
    explanation: `
При использовании rest-оператора "..." (прочие параметры), он передается в качестве последнего аргумента. В данном случае, использование замыкающей запятой (trailing comma) приводит к возникновению ошибки. Если убрать запятую, то все будет в порядке: <br>
const [a, ...b] = [1, 2, 3, 4, 5] <br>
console.log(a, b) // 1, [2, 3, 4, 5]
`
  },

  // 160
  {
    question: `
async function func() {
  return 10
}
console.log(func())
`,
    answers: `
A: Promise {: 10}
B: 10
C: Error
D: Promise {: undefined}
`,
    rightAnswer: `A`,
    explanation: `
Асинхронная функция всегда возвращает промис. Даже если возвращаемое такой функцией значение само по себе не является промисом, оно будет "завернуто" в промис. Приведенный пример эквивалентен следующему: <br>
function func() { return Promise.resolve(10) }
`
  },

  // 161
  {
    question: `
async function func() {
  await 10
}
console.log(func())
`,
    answers: `
A: Promise {: 10}
B: 10
C: Error
D: Promise {: undefined}
`,
    rightAnswer: `D`,
    explanation: `
"await" возвращает Promise {: 10}, который может быть обработан с помощью "then()". В данном случае, функция не содержит оператора "return", т.е. не возвращает значение. Поэтому возвращается undefined. Приведенный пример эквивалентен следующему: <br>
function func () { return Promise.resolve(10).then(() => undefined) }
`
  },

  // 162
  {
    question: `
function delay() {
  return new Promise(resolve => setTimeout(resolve, 2000))
}

async function delayedLog(item) {
  await delay()
  console.log(item)
}

async function processArray(array) {
  array.forEach(item => {
    await delayedLog(item)
  })
}

processArray([1, 2, 3, 4])
`,
    answers: `
A: Error
B: 1, 2, 3, 4
C: 4, 4, 4, 4
D: 4, 3, 2, 1
`,
    rightAnswer: `A`,
    explanation: `
Несмотря на то, что "processArray" - это асинхронная функция, анонимная функция, которую мы используем в "forEach()", является синхронной. Использование ключевого слова "await" в синхронных функциях приводит к тому, что выбрасывается исключение "SyntaxError: await is only valid in async function".
`
  },

  // 163
  {
    question: `
function delay() {
  return new Promise(resolve => setTimeout(resolve, 2000))
}

async function delayedLog(item) {
  await delay()
  console.log(item)
}

async function process(array) {
  array.forEach(async (item) => {
    await delayedLog(i)
  })
  console.log('Process completed!')
}

process([1, 2, 3, 5])
`,
    answers: `
A: 1 2 3 5 и Process completed!
B: 5 5 5 5 и Process completed!
C: Process completed! и 5 5 5 5
D: Process completed! и 1 2 3 5
`,
    rightAnswer: `D`,
    explanation: `
Метод "forEach" не ожидает завершения операции, он лишь запускает ее выполнение и двигается дальше. Поэтому "console.log('Process finished!')" выполняется первым согласно последовательности разрешения промисов. Определить нужную последовательность можно с помощью оператора "for-of" и ключевого слова "await": <br>
async function processArray (array) { for (const item of array) { await delayedLog(item) }; console.log('Process completed!') }
`
  },

  // 164
  {
    question: `
var set = new Set()
set.add("+0")
  .add("-0")
    .add(NaN)
        .add(undefined)
            .add(NaN)

console.log(set)
`,
    answers: `
A: Set(4) {"+0", "-0", NaN, undefined}
B: Set(3) {"+0", NaN, undefined}
C: Set(5) {"+0", "-0", NaN, undefined, NaN}
D: Set(4) {"+0", NaN, undefined, NaN}
`,
    rightAnswer: `A`,
    explanation: `
В отличии от операторов равенства (==, ===), для "Set" все NaN являются одинаковыми значениями, а "+0" и "-0" - разными.
`
  },

  // 165
  {
    question: `
const sym1 = Symbol('one')
const sym2 = Symbol('one')

const sym3 = Symbol.for('two')
const sym4 = Symbol.for('two')

console.log(sym1 === sym2, sym3 === sym4)
`,
    answers: `
A: true true
B: true false
C: false true
D: false false
`,
    rightAnswer: `C`,
    explanation: `
Для символом характерно следующее:<br>
1. Каждый символ, возвращаемый "Symbol()", это уникальное значение. Строка, передаваемая "Symbol()", это лишь опциональная метка или описание символа, которая, обычно, используется в целях отладки кода.<br>
2. Метод "Symbol.for" создает символ в глобальном реестре символов. При каждом вызове данного метода проверяется, имеется ли символ с указанным ключом в реестре. После этого либо возвращается найденный символ, либо создается новый.
`
  },

  // 166
  {
    question: `
const sym1 = new Symbol('one')
console.log(sym1)
`,
    answers: `
A: Error
B: one
C: Symbol('one')
D: Symbol
`,
    rightAnswer: `A`,
    explanation: `
"Symbol" - это обычная функция, а не конструктор, в отличие, например, от "Number" или "String". Поэтому при попытке использования его с ключевым словом "new" выбрасывается исключение "TypeError: Symbol is not a constructor".
`
  },

  // 167
  {
    question: `
let myNumber = 100
let myString = "100"

if (!typeof myNumber === "string") {
  console.log("It is not a string!")
} else {
  console.log("It is a string!")
}

if (!typeof myString === "number"){
  console.log("It is not a number!")
} else {
  console.log("It is a number!")
}
`,
    answers: `
A: Error
B: It is not a string! и It is not a number!
C: It is not a string! и It is a number!
D: It is a string! и It is a number!
`,
    rightAnswer: `D`,
    explanation: `
Оператор "!" приводит значение к логическому типу. Поскольку выражения "typeof myNumber" и "typeof myString" истинные, в обоих случаях возвращается false. Далее выполняются блоки "else".
`
  },

  // 168
  {
    question: `
console.log(JSON.stringify({ myArray: ['one', undefined, function() {}, Symbol('')] }))
console.log(JSON.stringify({ [Symbol.for('one')]: 'one' }, [Symbol.for('one')]))
`,
    answers: `
A: {"myArray":['one', undefined, {}, Symbol]} и {}
B: {"myArray":['one', null, null, null]} и {}
C: {"myArray":['one', null, null, null]} и "{ [Symbol.for('one')]: 'one' }, [Symbol.for('one')]"
D: {"myArray":['one', undefined, function(){}, Symbol('')]} и {}
`,
    rightAnswer: `B`,
    explanation: `
undefined, функции и символы не являются валидными JSON-значениями. Такие значения не включаются в объект и конвертируются (преобразуются) в null. Поэтому возвращается null, null, null. Глобальные символы игнорируются, поэтому возвращается пустой объект ({}).
`
  },

  // 169
  {
    question: `
class A {
  constructor() {
    console.log(new.target.name)
  }
}

class B extends A { constructor() { super() } }

new A()
new B()
`,
    answers: `
A: A A
B: A B
C: B B
D: Error
`,
    rightAnswer: `B`,
    explanation: `
"new.target" ссылается на конструктор (указывает на класс), который вызывается с помощью ключевого слова "new". Это также справедливо для конструктора родительского класса, вызываемого из подкласса.
`
  },

  // 170
  {
    question: `
const { a: x = 10, b: y = 20 } = { a: 30 }

console.log(x)
console.log(y)
`,
    answers: `
A: 30 20
B: 10 20
C: 10 undefined
D: 30 undefined
`,
    rightAnswer: `A`,
    explanation: `
Для свойств объекта характерно следующее:<br>
1. Значение свойства (30) может быть извлечено и присвоено переменной (x).<br>
2. Свойству присваивается значение по умолчанию (20), когда извлекаемым значением является undefined (y).
`
  },

  // 171
  {
    question: `
function area({ length = 10, width = 20 }) {
  console.log(length * width)
}

area()
`,
    answers: `
A: 200
B: Error
C: undefined
D: 0
`,
    rightAnswer: `B`,
    explanation: `
Здесь мы имеем дело с деструктуризацией объекта. Если опустить правую часть выражения, функция при вызове попытается найти хотя бы один аргумент. Если ей не удастся этого сделать, будет выброшено исключение "TypeError: Cannot read property 'length' of undefined". Решить данную проблему можно следующими способами:<br>
1. Передать функции пустой объект ({}) в качестве аргумента: <br>
function area ({ length = 10, width = 20 }) { console.log(length * width) } <br>
area({}) // 200 <br>
2. Присвоить пустой объект в качестве значения по умолчанию: <br>
function area ({ length = 10, width = 20 } = {}) { console.log(length * width) } <br>
area() // 200 <br>
`
  },

  // 172
  {
    question: `
const props = [
  { id: 1, name: 'John'},
  { id: 2, name: 'Jane'},
  { id: 3, name: 'Bob'}
]

const [, , { name }] = props
console.log(name)
`,
    answers: `
A: Bob
B: Error
C: undefined
D: John
`,
    rightAnswer: `A`,
    explanation: `
Деструктуризацию массива и объекта можно комбинировать. В данном случае, переменной "name" присваивается значение соответствующего свойства третьего элемента массива "props".
`
  },

  // 173
  {
    question: `
function checkType(num = 1) {
  console.log(typeof num)
}

checkType()
checkType(undefined)
checkType('')
checkType(null)
`,
    answers: `
A: number undefined string object
B: undefined undefined string object
C: number number string object
D: number number number number
`,
    rightAnswer: `C`,
    explanation: `
Если функции не передается значение или передается undefined, аргумент принимает значение по умолчанию (1). Другие ложные значения ("" и null) присваиваются аргументу.<br>
Первые два вызова функции "checkType" возвращают "number", поскольку значением аргумента является 1.<br>
Типом пустой строки ("") является "string", а типом null - "object".
`
  },

  // 174
  {
    question: `
function add(item, items = []) {
  items.push(item)
  return items
}

console.log(add('Orange'))
console.log(add('Apple'))
`,
    answers: `
A: ['Orange'] и ['Orange', 'Apple']
B: ['Orange'] и ['Apple']
C: []
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Аргументу "items" при каждом вызове функции "add" присваивается пустой массив (значение по умолчанию), который возвращается с помещенным в него значением аргумента "item".
`
  },

  // 175
  {
    question: `
function greet(greeting, name, message = greeting + ' ' + name) {
  console.log([name, greeting, message])
}

greet('Hello', 'John')
greet('Hello', 'John', 'Good morning!')
`,
    answers: `
A: Error
B: ['Hello', 'John', 'Hello John'] и ['Hello', 'John', 'Good morning!']
C: ['Hello', 'John', 'Hello John'] и ['Hello', 'John', 'Hello John']
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
При первом вызове функции "greet" аргументу "message" присваивается значение по умолчанию (greeting + ' ' + name). При втором вызове данному аргументу присваивается переданное значение ("Good morning!").
`
  },

  // 176
  {
    question: `
function outer(f = inner()) {
  function inner() { return 'Inner' }
}
console.log(outer())
`,
    answers: `
A: Error
B: Inner
C: Inner Inner
D: undefined
`,
    rightAnswer: `A`,
    explanation: `
Функции и переменные, объявленные в теле функции, не могут использоваться в качестве значений по умолчанию, поэтому выбрасывается исключение "ReferenceError: inner is not defined". Функцию можно переписать так: <br>
function outer (f) { function inner () { return 'Inner' }; const fun = f || inner(); return fun } <br>
console.log(outer()) // Inner <br>
console.log(outer('Outer')) // Outer <br>
Или так: <br>
const outer = (msg = 'Inner') => msg <br>
console.log(outer()) // Inner <br>
console.log(outer('Outer')) // Outer <br>
`
  },

  // 177
  {
    question: `
function myFun(x, y, ...args) {
  console.log(args)
}

myFun(1, 2, 3, 4, 5)
myFun(1, 2)
`,
    answers: `
A: [3, 4, 5] и undefined
B: Error
C: [3, 4, 5] и []
D: [3, 4, 5] и [undefined]
`,
    rightAnswer: `C`,
    explanation: `
Оператор "rest" (прочие параметры, ...) возвращает массив с переданными функции непоименованными аргументами или пустой массив в случае, когда такие аргументы отсутствуют.
`
  },

  // 178
  {
    question: `
const obj = {'key': 'value'}
const array = [...obj]
console.log(array)
`,
    answers: `
A: ['key', 'value']
B: Error
C: []
D: ['key']
`,
    rightAnswer: `B`,
    explanation: `
Оператор "spread" (распространения или раширения, ...) применяется только к итерируемым сущностям. Объекты таковыми не являются. Поэтому выбрасывается исключение "TypeError: object is not iterable".
`
  },

  // 179
  {
    question: `
function* myGenFunc() {
  yield 1
  yield 2
  yield 3
}
var myGenObj = new myGenFunc
console.log(myGenObj.next().value)
`,
    answers: `
A: 1
B: undefined
C: 2
D: Error
`,
    rightAnswer: `D`,
    explanation: `
Генераторы (функции со специальным символом "*") не могут использоваться в качестве конструкторов, т.е. с ключевым словом "new", поэтому выбрасывается исключение "TypeError: myGenFunc is not a constructor".
`
  },

  // 180
  {
    question: `
function* yieldAndReturn() {
  yield 1
  return 2
  yield 3
}

var myGenObj = yieldAndReturn()
console.log(myGenObj.next())
console.log(myGenObj.next())
console.log(myGenObj.next())
`,
    answers: `
A: { value: 1, done: false }  { value: 2, done: true }  { value: undefined, done: true }
B: { value: 1, done: false }  { value: 2, done: false }  { value: undefined, done: true }
C: { value: 1, done: false }  { value: 2, done: true }  { value: 3, done: true }
D: { value: 1, done: false }  { value: 2, done: false }  { value: 3, done: true }
`,
    rightAnswer: `A`,
    explanation: `
Инструкция "return" в генераторе (функция со специальным символом "*") останавливает его выполнение. Возвращаемое значение 2 присваивается свойству "value", а значением свойства "done" становится true. После завершения работы генератора вызов метода "next" возвращает { value: undefined, done: true }.
`
  },

  // 181
  {
    question: `
const myGenerator = (function *(){
  yield 1
  yield 2
  yield 3
})()

for (const value of myGenerator) {
  console.log(value)
  break
}

for (const value of myGenerator) {
  console.log(value)
}
`,
    answers: `
A: 1 2 3 и 1 2 3
B: 1 2 3 и 4 5 6
C: 1 1
D: 1
`,
    rightAnswer: `D`,
    explanation: `
Генератор (функция со специальным символом "*") не может использоваться после закрытия итератора. В первом цикле мы с помощью оператора "break" останавливаем выполнение генератора со значением 1. Повторный перебор генератора невозможен, поэтому второй "console.log()" ничего не возвращает.
`
  },

  // 182
  {
    question: `
const squareObj = new Square(10)
console.log(squareObj.area)

class Square {
  constructor(length) {
    this.length = length
  }

  get area() {
    return this.length * this.length
  }

  set area(value) {
    this.area = value
  }
}
`,
    answers: `
A: 100
B: Error
C: 10
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
В отличие от объявления функций (но не функциональных выражений), объявления классов не поднимаются в начало их области видимости. Это также справедливо для выражений класса. Поэтому использовать класс можно только после его объявления, в противном случае, выбрасывается исключение "ReferenceError: Square is not defined".
`
  },

  // 183
  {
    question: `
function Person() { }

Person.prototype.walk = function() {
  return this
}

Person.run = function() {
  return this
}

let user = new Person()
let walk = user.walk
console.log(walk())

let run = Person.run
console.log(run())
`,
    answers: `
A: undefined undefined
B: Person Person
C: Error
D: Window Window
`,
    rightAnswer: `D`,
    explanation: `
Когда обычный метод или метод прототипа вызывается без передачи ему значения "this", метод возвращает значение "this" по умолчанию. В данном случае, таким значением является глобальный объект "window".
`
  },

  // 184
  {
    question: `
class Vehicle {
  constructor(name) {
    this.name = name
  }

  start() {
    console.log(\`&#36;{this.name} vehicle started\`)
  }
}

class Car extends Vehicle {
  start() {
    console.log(\`&#36;{this.name} car started\`)
    super.start()
  }
}

const car = new Car('BMW')
console.log(car.start())
`,
    answers: `
A: Error
B: BMW vehicle started и BMW car started
C: BMW car started и BMW vehicle started
D: BMW car started и BMW car started
`,
    rightAnswer: `C`,
    explanation: `
Ключевое слово "super" используется, в том числе, для вызова методов родительского класса. В отличие от других языков программирования, в JavaScript вызов "super()" не обязательно должен быть первой инструкцией.
`
  },

  // 185
  {
    question: `
const user = {'age': 30}
user.age = 25
console.log(user.age)
`,
    answers: `
A: 30
B: 25
C: Error
D: undefined
`,
    rightAnswer: `B`,
    explanation: `
Мы используем ключевое слово "const" для объявления переменной "user", т.е. делаем ее неизменяемой (константой). Однако иммутабельность переменной, являющейся объектом, не распространяется на свойства объекта. Другими словами, свойства такого объекта можно изменять. Однако, если мы попытаемся присвоить переменной "user" новое значение (user = {'age': 25}), будет выброшено исключение "TypeError: Assignment to constant variable". Для обеспечения иммутабельности свойств объекта используется метод "freeze".
`
  },

  // https://github.com/yeungon/In-JavaScript-we-trust
  // 186
  {
    question: `
function a(x) {
  x++
  return function () {
    console.log(++x)
  }
}

a(1)()
a(1)()
a(1)()

let x = a(1)
x()
x()
x()
`,
    answers: `
A: 1 2 3 и 1 2 3
B: 3 3 3 и 3 4 5
C: 3 3 3 и 1 2 3
D: 1 2 3 и 3 3 3
`,
    rightAnswer: `B`,
    explanation: `
Здесь мы имеем дело с замыканием. Замыкания позволяют нам создавать статические функции, которым доступны переменные из внешнего окружения. Другими словами, замыкание имеет доступ к глобальной области видимости, области видимости родительской функции и собственной области видимости.<br>
Мы получаем 3 3 3 и 3 4 5, поскольку сначала просто вызываем функцию "a". Она работает как обычная функция. Затем мы объявляем переменную "x" и присваиваем ей значение функции "a(1)", вот почему мы получаем 3 4 5 вместо 3 3 3.
`
  },

  // 187
  {
    question: `
function Name(a, b) {
  this.a = a
  this.b = b
}

const me = Name('John', 'Smith')

console.log(!(a.length - window.a.length))
`,
    answers: `
A: undefined
B: NaN
C: true
D: false
`,
    rightAnswer: `С`,
    explanation: `
Мы получаем true. Обратите внимание, что при создании объекта с помощью функции-конструктора "Name" мы не использовали ключевое слово "new". Из-за этого переменная "a" стала глобальной и получила значение "John". В действительности, глобальные переменные - это свойства глобального объекта "window" (в браузере) или "global" (в Node.js). Поэтому выражение "a.length - window.a.length" возвращает 0, а "!0" возвращает true.
`
  },

  // 188
  {
    question: `
const x = function (...x) {
  let k = (typeof x).length
  let y = () => "freetut".length
  let z = { y: y }

  return k - z.y()
}

console.log(Boolean(x()))
`,
    answers: `
A: true
B: 1
C: -1
D: false
`,
    rightAnswer: `A`,
    explanation: `
spread-оператор "...x" позволяет получить параметры функции в виде массива. "typeof array" возвращает "object". Длина строки "object" равняется 6. "z.y()" возвращает длину строки "freetut", т.е. 7. Функциональное выражение "x" возвращает -1, которое после преобразования в логический тип становится true. Обратите внимание, что "boolean(0)" вернет false.
`
  },

  // 189
  {
    question: `
(function js(x) {
  const y = (j) => j * x

  console.log(y(s()))

  function s() {
    return j()
  }

  function j() {
    return x ** x
  }
})(3)
`,
    answers: `
A: undefined
B: 18
C: 81
D: 12
`,
    rightAnswer: `A`,
    explanation: `
Функция "js" выполняется автоматически, поскольку является IIFE (Immediately Invoked Function Expression - немедленно вызываемым функциональным выражением). Параметр "x" функции "js" передается со значением 3. Значение, возвращаемое функцией "y(s())", означает вызов трех функций: "y", "s" и "j", поскольку "s()" возвращает "j()". "j()" возвращает 3 ^ 3 = 27, поэтому "s()" возвращает 27. "y(s())" означает "y(27)", которая возвращает 27 * 3 = 81. Обратите внимание, что мы можем вызвать функцию до ее объявления, но это не работает с функциональными выражениями.
`
  },

  // 190
  {
    question: `
var tip = 100

(function () {
  console.log("I have $" + husband())

  function wife() {
    return tip * 2
  }

  function husband() {
    return wife() / 2
  }

  var tip = 10
})()
`,
    answers: `
A: I have $10
B: I have $100
C: I have $50
D: I have $NaN
`,
    rightAnswer: `D`,
    explanation: `
Здесь мы имеем дело с IIFE (Immediately Invoked Function Expression - немедленно вызываемым функциональным выражением). IIFE выполняются автоматически. Последовательность следующая: "husband()" возвращает "wife()", а "wife()" возвращает "tip * 2". Можно подумать, что "tip" равняется 100, поскольку мы объявили ее с помощью ключевого слова "var" и она стала глобальной. Однако, на самом деле ее значением является undefined, поскольку мы объявляем переменную "tip" со значением 10 внутри функции. Поскольку переменная "tip" поднимается со значением undefined, правильным ответом является D. undefined возвращает NaN, когда мы пытаемся разделить его на 2 или умножить на 2. Если убрать "var tip = 10" в конце функции, правильным ответом будет B.
`
  },

  // 191
  {
    question: `
const js = { language: "loosely type", label: "difficult" }

const edu = { ...js, level: "PhD" }

const newbie = edu

delete edu.language

console.log(Object.keys(newbie).length)
`,
    answers: `
A: 2
B: 3
C: 4
D: 5
`,
    rightAnswer: `A`,
    explanation: `
Данная задача посвящена spread-оператору (...). Этот оператор позволяет получать параметры функции, копировать или объединять объекты и массивы. В переменной "edu" мы используем оператор распространения для копирования объекта "js" и добавления к нему нового свойства "level". Это также работает с массивами. Затем мы объявляем другую переменную с именем "newbie". Важное замечание: обе переменных указывают на одно место в памяти. Это называется передачей значения по ссылке. После удаления свойства "language" посредством "delete edu.language", длина обоих объектов становится равной 2.
`
  },

  // 192
  {
    question: `
var candidate = {
  name: "John",
  age: 30
}

var job = {
  frontend: "Vuejs or Reactjs",
  backend: "Nodejs and Express",
  city: "Ekaterinburg"
}

class Combine {
  static get() {
    return Object.assign(candidate, job)
  }

  static count() {
    return Object.keys(this.get()).length
  }
}

console.log(Combine.count())
`,
    answers: `
A: 5
B: 6
C: 7
D: 8
`,
    rightAnswer: `A`,
    explanation: `
"Object.assign(candidate, job)" объединяет "candidate" и "job" в один объект. Затем "Object.keys()" считает количество ключей объекта. Обратите внимание, что методы "get" и "count" определены как статические, поэтому их можно вызывать с помощью "Class.staticMethod()". Результирующий объект содержит 5 ключей.
`
  },

  // 193
  {
    question: `
var x = 1

;(() => {
  x += 1
  ++x
})()

;((y) => {
  x += y
  x = x % y
})(2)

;(() => (x += x))()

;(() => (x *= x))()

console.log(x)
`,
    answers: `
A: 4
B: 50
C: 2
D: 10
`,
    rightAnswer: `A`,
    explanation: `
Начальное значение переменной "x" равно 1. В первом IIFE (Immediately Invoked Function Expression - немедленно вызываемом функциональном выражении) значение "x" увеличивается до 3. Во втором IIFE выражение "x + y (3 + 2)" возвращает 5, а выражение "x % y (5 % 2)" - 1. В третьем и четвертом IIFE мы получаем 2 (1 + 1) и 4 (2 * 2), соответственно.
`
  },

  // 194
  {
    question: `
let x = {}
let y = {}
let z = x

console.log(x == y)
console.log(x === y)
console.log(x == z)
console.log(x === z)
`,
    answers: `
A: true true true true
B: false false false false
C: true true false false
D: false false true true
`,
    rightAnswer: `D`,
    explanation: `
Технически "x" и "y" имеют одинаковые значения. Обе переменные являются пустыми объектами. Однако объекты сравниваются не по значениям. "z" и "x" являются объектами, ссылающимися на одно и тоже место в памяти. В JavaScript объекты передаются по ссылке. Поэтому при сравнении "x" и "z" возвращается true.
`
  },

  // 195
  {
    question: `
console.log("hello")

setTimeout(() => console.log("hey"), 1)
setTimeout(() => console.log("yo"), 2)
setTimeout(() => console.log("world"), 0)

console.log("hi")
`,
    answers: `
A: hello hey yo world hi
B: hello hi hey yo world
C: hello hi world hey yo
D: hello hi hey world yo
`,
    rightAnswer: `D`,
    explanation: `
Три функции "setTimeout" помещаются в очередь задач (task queue) перед попаданием в стек вызовов (call stack), поэтому сначала в консоль выводятся "hello" и "hi". Можно подумать, что три колбэка "setTimeout()" будут выполнены в следующем порядке: "world" -> "hey" -> "yo" согласно временной задержке в 0 мс -> 1 мс -> 2 мс, соответственно. Однако, между 0 мс и 1 мс для браузера разницы не существует. Поэтому следующим в консоль выводится "hey", затем "world" и в конце "yo".
`
  },

  // 196
  {
    question: `
String.prototype.lengthy = () => {
  console.log("hello")
}

let x = { name: "John" }

delete x

x.name.lengthy()
`,
    answers: `
A: John
B: hello
C: undefined
D: Error
`,
    rightAnswer: `B`,
    explanation: `
С помощью "String.prototype.someThing = function() { }" можно определить новый встроенный метод объекта "String". Мы можем сделать тоже самое с Array, Object или FunctionName, где FunctionName - это созданная нами функция. Несложно понять, что "string".lengthy возвращает "hello". Оператор "delete" удаляет свойство объекта, а не сам объект. Поэтому мы получаем "hello", а не "RefferenceError". Обратите внимание, что если мы объявим объект без ключевых слов "let", "const" или "var", то получим глобальный объект. В этом случае выражение "delete objectName" вернет true.
`
  },

  // 197
  {
    question: `
let x = {}

x.__proto__.hi = 10

Object.prototype.hi = ++x.hi

console.log(x.hi + Object.keys(x).length)
`,
    answers: `
A: 10
B: 11
C: 12
D: NaN
`,
    rightAnswer: `C`,
    explanation: `
Начальным значением переменной "x" является пустой объект. Затем мы добавляем к нему свойство "hi" со значением 10 с помощью "x.__proto__.hi". Обратите внимание, что это эквивалентно "Object.prototype.hi = 10", поэтому мы добавляем свойство "hi" к родителю пустого объекта - Object. Это означает, что любой объект будет наследовать данное свойство. Свойство "hi" становится распределенным (совместным). Если мы объявим новый объект, скажем, "let y = {}", переменная "y" унаследует свойство "hi" от Object. Сравнение "x.__proto__ === Object.prototype" вернет true. После этого, мы перезаписываем значение свойства "hi" новым значением 11. Получаем 1 ("x" имеет одно свойство) + 11 (значение свойства "hi") = 12.
`
  },

  // 198
  {
    question: `
const array = (a) => {
  let length = a.length
  delete a[length - 1]
  return a.length
}

console.log(array([1, 2, 3, 4]))

const object = (obj) => {
  let key = Object.keys(obj)
  let length = key.length
  delete obj[key[length - 1]]

  return Object.keys(obj).length
}

console.log(object({ 1: 2, 2: 3, 3: 4, 4: 5 }))

const setPropNull = (obj) => {
  let key = Object.keys(obj)
  let length = key.length
  obj[key[length - 1]] = null

  return Object.keys(obj).length
}

console.log(setPropNull({ 1: 2, 2: 3, 3: 4, 4: 5 }))
`,
    answers: `
A: 3 3 3
B: 4 4 4
C: 4 3 4
D: 3 4 3
`,
    rightAnswer: `C`,
    explanation: `
Данная задача демонстрирует, как работает оператор "delete". Выражения "delete someObject" и "delete someArray" возвращают false (ничего не делают). Выражение "delete someObject.someProperty" удаляет указанное свойство объекта. В случае с массивом выражение "delete someArray[keyNumber]" удаляет только значение указанного индекса, сам индекс остается и его новым значением становится undefined. По этой причине первый "console.log()" выводит 4 (массив содержит 4 элемента, последний имеет значение undefined), а второй - 3 (оставшиеся свойства объекта). Последний "console.log()" выводит 4, поскольку присвоение свойству объекта значения null или undefined не удаляет это свойство. Ключ остается. Поэтому длина объекта не меняется.
`
  },

  // 199
  {
    question: `
var a = [1, 2, 3]
var b = [1, 2, 3]

var c = [1, 2, 3]
var d = c

var e = [1, 2, 3]
var f = e.slice()

console.log(a === b)
console.log(c === d)
console.log(e === f)
`,
    answers: `
A: true true true
B: false false true
C: true true false
D: false true false
`,
    rightAnswer: `D`,
    explanation: `
Сравнение "a" и "b" возвращает false, поскольку эти переменные ссылаются на разные места в памяти, несмотря на то, что их значения являются одинаковыми. В JavaScript, в случае с объектами, значения передаются по ссылке. Во втором случае "d" является копией "c", поэтому они ссылаются на одну и ту же область памяти. Любые изменения в "c" отражаются на "d". Третий пример демонстирует способ копирования массива с помощью метода "slice". "f" является копией "e", но они ссылаются на разные места в памяти. Поэтому их сравнение возвращает false.
`
  },

  // 200
  {
    question: `
var languages = {
  name: ["javascript", "java", "python", "php", { name: "feature" }],
  feature: "awesome"
}

let flag = languages.hasOwnProperty(
  Object.values(languages)[0][4].name
)

;(() => {
  if (flag !== false) {
    console.log(
      Object.getOwnPropertyNames(languages)[0].length <<
      Object.keys(languages)[0].length
    )
  } else {
    console.log(
      Object.getOwnPropertyNames(languages)[1].length <<
      Object.keys(languages)[1].length
    )
  }
})()
`,
    answers: `
A: 8
B: NaN
C: 64
D: 12
`,
    rightAnswer: `C`,
    explanation: `
Данная задача является довольно сложной, поскольку в ней встречается несколько встроенных методов для работы с объектами. Например, методы "keys" и "getOwnPropertyNames" возвращают свойства объекта: первый - только перечисляемые, второй - также не перечисляемые. "Object.values()" и "Object.keys()" возвращают значения и ключи объекта, соответственно. "Object.hasOwnProperty('propertyName')" возвращает логическое значение в зависимости от того, существует указанное свойство в объекте или нет. Переменная "language" имеет значение true, поскольку "Object.values(languages)[0][4].name" возвращает "feature", которое является свойством объекта. Наконец, мы получаем "4 << 4", что возвращает побитовое значение, эквивалентное "4 * 2 ^ 4" или "4 * 16", или 64.
`
  },

  // 203
  {
    question: `
var person = {}

Object.defineProperties(person, {
  name: {
    value: "John",
    enumerable: true,
  },
  job: {
    value: "developer",
    enumerable: true,
  },
  studying: {
    value: "PhD",
    enumerable: true,
  },
  money: {
    value: "USD",
    enumerable: false,
  },
})

class Evaluate {
  static checkFlag(obj) {
    return Object.getOwnPropertyNames(obj) > Object.keys(obj)
      ? Object.getOwnPropertyNames(obj)
      : Object.keys(obj)
  }
}

const flag = Evaluate.checkFlag(person)

console.log(flag.length)
`,
    answers: `
A: 1
B: 2
C: 3
D: 4
`,
    rightAnswer: `D`,
    explanation: `
"Object.keys(obj)" почти идентичен "Object.getOwnPropertyNames(obj)", за исключением того, что последний, кроме перечисляемых, возвращает также неперечисляемые свойства объекта. По умолчанию все свойства создаваемого объекта являются перечисляемыми. Мы можем сделать их неперечисляемыми с помощью "Object.defineProperty()" или "Object.defineProperties()". Поэтому "Object.keys(person)" возвращает 3, а "Object.getOwnPropertyNames(person)" - 4. Тернарный оператор возвращает 4.
`
  },

  // 204
  {
    question: `
const id = 10

const getID = (...id) => {
  id(id)

  function id(id) {
    console.log(typeof id)
  }
}

getID(id)
`,
    answers: `
A: Error
B: 10
C: undefined
D: function
`,
    rightAnswer: `D`,
    explanation: `
Когда мы определяем одну функцию внутри другой, то получаем замыкание (closure). Обратите внимание, если функция обычная (а не функциональное выражение), она поднимается в начало своей области видимости. Мы видим несколько "id" в коде, но некоторые из них ничего не делают. Результатом выполнения кода является "typeof id", т.е. "function". Таким образом, "id" в приведенном примере является функцией.
`
  },

  // 205
  {
    question: `
var book1 = {
  name: "Name of the rose",
  getName: function () {
    console.log(this.name)
  },
}

var book2 = {
  name: { value: "Harry Potter" },
}

var bookCollection = Object.create(book1, book2)

bookCollection.getName()
`,
    answers: `
A: Harry Potter
B: Name of the rose
C: Error
D: Object object
`,
    rightAnswer: `A`,
    explanation: `
"Object.create()" позволяет создавать одни объекты на основе других. Если мы не передадим второй параметр - "book2", в данном случае - свойство "name" объекта "bookCollection" будет иметь значение "Name of the rose", унаследованное от "book1". Это означает, что мы можем добавлять новые свойства создаваемому с помощью "Object.create()" объекту. "bookCollection" имеет собственное свойство "name" и одноименное свойство, унаследованное от "book1". Собственные свойства объекта имеют приоритет над унаследованными. Поэтому мы получаем "Harry Potter".
`
  },

  // 206
  {
    question: `
(() => {
  const a = Object.create({})

  const b = Object.create(null)

  let f1 = a.hasOwnProperty("toString")

  let f2 = "toString" in b

  let result =
    f1 === false && f2 === false
      ? console.log((typeof a.toString()).length)
      : console.log(b.toString())
})()
`,
    answers: `
A: Error
B: undefined
C: 0
D: 6
`,
    rightAnswer: `D`,
    explanation: `
Объекты "a" и "b" создаются с помощью "Object.create()". Разница между ними состоит в том, что "a" наследует прототип Object, а "b" является совершенно пустым, поскольку мы передали аргумент null методу "create". "hasOwnProperty('toString')" в обоих случаях возвращает false, поскольку в объектах метод "toString" не определен. Однако, данный метод существует в объекте "a" как унаследованный от Object. "f1" и "f2" возвращают false. Обратите внимание, что для проверки наличия свойства в объекте мы используем "Object.hasOwnProperty('key')" и "('key' in object)". Они отличаются тем, что первый возвращает только собственные свойства объекта, а второй - также унаследованные. "typeof a.toString()" возвращает "string", длина которой равняется 6.
`
  },

  // 207
  {
    question: `
let promise = new Promise((rs, rj) => {
  setTimeout(() => rs(4), 0)

  Promise.resolve(console.log(3))

  console.log(2)
})

promise
  .then((rs) => {
    console.log(rs ? rs ** rs : rs)
    return rs
  })
  .then((rs) => console.log(rs === 256 ? rs : rs * rs))
`,
    answers: `
A: 3 2 256 256
B: 3 2 256 16
C: 256 16 3 2
D: 16 256 3 2
`,
    rightAnswer: `B`,
    explanation: `
Мы определяем промис с помощью ключевого слова "let" и вызываем его. "setTimeout" - это асинхронная функция, которая выполняется последней, даже при нулевой задержке: "setTimeout(() => rs(4), 0)". Хотя выражение "Promise.resolve(console.log(3))" также возвращает промис, он относится к микрозадачам, которые имеет приоритет над макрозадачами, такими как "setTimeout()". В первом "then()" мы получаем "4 ^ 4", во втором - "4 * 4". Обратите внимание, что "return rs" возвращает оригинальное значение.
`
  },

  // 208
  {
    question: `
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 0)
  })

  setTimeout(() => console.log("world"), 0)

  console.log(await promise)

  console.log("hello")
}

f(setTimeout(() => console.log("timer"), 0))
`,
    answers: `
A: Error
B: done hello world
C: hello done world
D: timer done hello world
`,
    rightAnswer: `D`,
    explanation: `
Хотя мы не определяем параметров в функции "f", мы передаем ей "setTimeout(() => console.log("timer"), 0)" при вызове. Поэтому сначала в консоль выводится "timer". Переменная "promise", возвращающая разрешенный промис, вызывается с помощью ключевого слова "await". JavaScript приостанавливает выполнение кода на строке "console.log(await promise)" до разрешения промиса. Вот почему следующим мы получаем "done". Почему вторым значением, выведенным в консоль, является "done", а не "world" или "hello"? Поскольку JavaScript ставит выполнение кода на паузу, когда встречает ключевое слово "await", мы не можем получить "hello" до разрешения промиса (обратите внимание, что "setTimeout()" всегда выполняется последней, поскольку является асинхронной (макро)задачей, поэтому "setTimeout(() => console.log("world"), 0))" выполняется в конце). Здесь мы наблюдаем разницу в работе ключевого слова "await" перед асинхронным оператором (в данном случае, мы использовали "setTimeout()" в качестве примера) и вызовом функции/оператора без него.
`
  },

  // 210
  {
    question: `
class MySort {
  constructor(object) {
    this.object = object
  }

  getSort() {
    return Object.entries(this.object)[0][1].sort()[
      Object.values(this.object).length
    ]
  }
}

const object = {
  month: ["August", "September", "January", "December"],
}

const sortMe = new MySort(object)

console.log(sortMe.getSort())
`,
    answers: `
A: August
B: September
C: January
D: December
`,
    rightAnswer: `D`,
    explanation: `
"Object.entries()" возвращает массив, состоящий из ключей и значений объекта в виде массивов (подмассивов), "Object.values()" - массив значений объекта, а "Object.keys()" - массив ключей. Таким образом, "Object.entries(object)" в приведенном примере возвращает вложенный массив с одним элементом, значения которого вложены в другой массив -  [["month", ["August", "September", "January", "December"]]]. По этой причине "Object.entries(this.object)[0][1].sort()" на самом деле сортирует значения массива и возвращает их в новом порядке: "August" -> "December" -> "January" -> "September". Следовательно, когда мы пытаемся получить элемент с индексом "[Object.values(this.object).length]", то получаем "December", поскольку "[Object.values(this.object).length]" возвращает 1 (длина массива, возвращенного Object.values()).
`
  },

  // 211
  {
    question: `
const flag = [] !== !!!!![]

let f = () => {}

console.log((typeof f()).length + flag.toString().length)
`,
    answers: `
A: NaN
B: 12
C: 13
D: 14
`,
    rightAnswer: `C`,
    explanation: `
Сравнение двух массивов или объектов в JavaScript всегда возвращает false, поскольку оба передаются по ссылке, в отличие от примитивов, таких как строка, число или логическое значение. Вот почему сравнение [] и [] с помощью "==" или "===" возвращает false. Сложная часть - это "!==!!!!!", что эквивалентно "!==", так что на самом деле в ней нет ничего сложного. Таким образом, значением переменной "flag" является true. В функциональном выражении "f" мы используем стрелочную функцию, но {} - это часть функции, а не объект. Для того, чтобы вернуть объект, выражение следует записать так: "let f = () => ({})" или использовать обычную функцию. С помощью ключевого слова "return" мы легко можем перехватить содержимое функции, когда используем обычный способ ее определения. Поэтому "typeof f()" возвращает undefined, а не "object". Затем мы получаем 9 (длина undefined) + 4 (длина строки true) = 13.
`
  },

  // 212
  {
    question: `
(function (a, b, c) {
  arguments[2] = (typeof arguments).length
  c > 10 ? console.log(c) : console.log(++c)
})(1, 2, 3)
`,
    answers: `
A: 4
B: 5
C: 6
D: 7
`,
    rightAnswer: `D`,
    explanation: `
Здесь мы имеем дело с самовызываемой функцией с тремя параметрами. Обратите внимание, что "arguments" внутри функции возвращает массивоподобный объект, состоящий из аргументов, переданных функции при вызове. Когда мы присваиваем значение этому объекту (или любому его элементу), функция будет использовать это значение, а не значение переданного при ее вызове аргумента. Поэтому значением "(typeof arguments).length" будет 6, а не 3. 6 меньше 10, поэтому мы получаем "console.log(++c)" или 7. Обратите внимание, что "arguments" недоступна в стрелочных функциях. ES6 рекомендует использовать rest-оператор (...) - настоящий массив. Таким массивом можно манипулировать с помощью методов "map", "filter", "reduce" и др.
`
  },

  // 213
  {
    question: `
class Calculator {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  static getFlag() {
    return new Array(this.a).length == new Array(this.b)
      .toString().length
  }

  getValue() {
    return Calculator.getFlag() ? typeof this.a : typeof new Number(this.b)
  }
}

const me = new Calculator(5, 5)

console.log(me.getValue())
`,
    answers: `
A: NaN
B: string
C: object
D: number
`,
    rightAnswer: `C`,
    explanation: `
У нас имеется класс "Calculator". При создании нового экземпляра, мы передаем ему два аргумента: "a" и "b". Эти аргументы имеют одинаковые значения, но "new Array(this.a).length" сильно отличается от "new Array(this.b).toString().length", поскольку последний возвращает длину строки ",,,," или 4, а первый - длину массива или 5. По этой причине "getFlags()" возвращает false. В "getValue()" мы получаем выражение "typeof new Number(this.b)", что возвращает "object". Это немного отличается от выражения "typeof b", которое возвращает "number".
`
  },

  // 214
  {
    question: `
var name = "John"

const obj = {
  name: "Jane",

  callMe: function () {
    return this.name
  },
}

let me = obj.callMe

let she = obj.callMe.bind(obj)

let result = me() === obj.callMe() ? she() : \`&#36{me()} &#36;{she()}\`

console.log(result)
`,
    answers: `
A: undefined
B: John
C: Jane
D: John Jane
`,
    rightAnswer: `D`,
    explanation: `
Данный вопрос посвящен ключевому слову "this". У нас есть простой объект, содержащий один метод и одно свойство. Во-первых, важно понимать, что "let me = obj.callMe" и последующий вызов "me()" существенно отличаются от прямого вызова "obj.callMe()". Если мы присваиваем переменной метод, объявленный внутри объекта, "this" в этом объекте будет вести себя по-разному (когда мы вызываем переменную как метод и когда мы вызываем сам метод). В частности, в первом случае, "this" - это объект "window", в то время как во втором случае "this" внутри функции по-прежнему ссылается на свойство "name" объекта "obj". Это означает, что "me()" возвращает "John", а "obj.callMe" - "Jane". Затем "result" возвращает false, и мы получаем &#36;{me()} &#36;{she()}. Почему "she()" отличается от "me()"? Потому что "she()" привязана к объекту "obj", а "me()" нет.
`
  },

  // 216
  {
    question: `
((...a) => {
  const b = ["JavaScript", "Russia"]

  const c = [...a, typeof a, ...b, "apple"]

  console.log(c.length + c[0].length)
})(new Array(10))
`,
    answers: `
A: 5
B: 10
C: 15
D: 20
`,
    rightAnswer: `C`,
    explanation: `
"..." используется двумя способами: как оператор распространения (spread) и как прочие параметры (rest). В приведенном примере мы видим оба способа. Первый оператор в самовызываемой функции - это, разумеется, rest, а в константе "c" мы видим spread. В первом случае мы можем передать функции любое количество аргументов. Обратите внимание, что "typeof a" - это "object", несмотря на то, что фактически - это настоящий массив (в отличие от массивоподобного объекта "arguments"). spread позволяет нам объединять массивы. Таким образом, "...a" - это оператор rest при использовании в качестве параметра функции, но в константе - это оператор spread. Мы получаем массив "c" с пятью элементами ("...a" - это вложенный массив, поэтому его длина равняется 1), но первый элемент данного массива сам имеет 10 элементов (из-за того, что мы передали в функцию "new Array(10)"). Сумма длин обоих массивов равняется 15.
`
  },

  // 217
  {
    question: `
function F(name, ...career) {
  this.name = name

  return Array.isArray(career) === true && typeof career === "object" ? {} : ""
}

var student = new F("John")

console.log(student.name)
`,
    answers: `
A: John
B: undefined
C: Error
D: false
`,
    rightAnswer: `B`,
    explanation: `
У нас имеется функция-конструктор "F" (название написано с заглавной буквы, но это не обязательно), которая может использоваться для создания объекта, такого как объект "student" в приведенном примере. В функции имеется два параметра, хотя второй параметр - это на самом деле rest-оператор. Его типом является "object", но выражение "Array.isArray(career)" возвращает true. Оператор "return" возвращает пустой объект ({}). Вы можете быть немного удивлены, когда "console.log(student.name)" выведет в консоль undefined. Все дело в том, что у пустого объекта отсутствует свойство "name".
`
  },

  // 218
  {
    question: `
class Filter {
  constructor(element) {
    this.element = element
  }
  filter() {
    return this.type() === "object" ? this.element[0].name : "hello"
  }

  type() {
    return typeof this.element
  }
}

let countries = [
  { name: "Russia", isdeveloped: true },
  { name: "Vietnam", isdeveloped: false },
]

let x = new Filter(countries)

const filter = countries.filter((item) => {
  return !item.isdeveloped
})

console.log(x.filter().length + filter[0].name.length)
`,
    answers: `
A: 11
B: 12
C: 13
D: 14
`,
    rightAnswer: `D`,
    explanation: `
Пример получился немного длинным. На самом деле, он не слишком сложный. Вы легко найдете правильный ответ, если потратите немного времени на размышления. Сначала мы определяем класс с двумя методами. Первый метод "filter" возвращает первый элемент массива (свойства "element") или "hello" в зависимости от метода "type". Мы знаем, что "typeof array" вернет "object", так что "filter()" вернет "this.elements[0].name". Затем мы вызываем встроенный метод "filter". Этот метод возвращает новый массив в зависимости от условия, переданного колбэку. Обратите внимание, что "!item.isdeveloped" означает false. Значит, мы получаем "Vietnam". Наконец, мы получаем "Russia.length" и "Vietnam.length", что в сумме дает 13.
`
  },

  // 219
  {
    question: `
async function abc() {
  console.log(8)

  await Promise.resolve(2).then(console.log)

  console.log(3)
}

setTimeout(() => {
  console.log(1)
}, 0)

abc()

queueMicrotask(() => {
  console.log(0)
})

Promise.resolve(4).then(console.log)

console.log(6)
`,
    answers: `
A: 6  8  3  0  4  2  1
B: 8  2  3  0  4  6  1
C: 6  8  2  0  4  3  1
D: 8  6  2  0  4  3  1
`,
    rightAnswer: `D`,
    explanation: `
Порядок выполнения асинхронного кода зависит от микро- и макрозадач. Микрозадачи имеют приоритет. Запомните, что синхронный код всегда выполняется перед асинхронным. Поэтому мы имеем следующий порядок: <br>
1) синхронный код <br>
2) микрозадачи (промисы, async/await) <br>
3) макрозадачи (setTimeout, setInterval) <br>
Обратите внимание, что в Node.js у нас также имеется "process.nextTick()", который имеет наивысший приоритет, но в задаче его нет.<br>
Итак, колбэк "setTimeout()" будет выполнен последним, поскольку является макрозадачей. Поэтому мы получаем 1 последним.<br>
Следующей вызывается функция "abc". Сначала в консоль выводится 8. Затем на ключевом слове "await" выполнение функции приостанавливается, выполняется "console.log(6)", поскольку "Promise.resolve(4).then(console.log)" - это асинхронный код. Вот почему следующим мы получаем 6.<br>
Теперь настало время для "Promise.resolve(2)", поэтому мы получаем 2. Что произойдет, если убрать ключевое слово "await"?<br>
Поскольку у нас имеется ключевое слово "await", выполнение кода ставится на паузу. Мы получаем 0 и 4, а не 3. Промисы и async/await - микрозадачи, которые выполняются перед "console.log(3)".<br>
На следующем этапе мы получаем 3 и, последним, 1.<br>
Так что же произойдет, если убрать ключевое слово "await"? Тогда порядок будет следующим: 8  3  6  2  0  4  1.
`
  },

  // 220
  {
    question: `
const username = {
  x: "youtube.com/username".length,
  getMe() {
    const inner = function () {
      console.log(++this.x)
    }
    inner.bind(this)()
  },
}

username.getMe()
`,
    answers: `
A: 20
B: 30
C: 22
D: 23
`,
    rightAnswer: `B`,
    explanation: `
Мы получаем 30. Сначала "youtube.com/username" возвращает 20, поскольку мы используем свойство "length" строки. Затем значение "x" увеличивается на 1 посредством "++this.x". Вопрос выглядит тривиальным, но это не так. Нужно помнить о том, что "console.log(++this.x)" не будет работать, если значением "x" будет undefined при вызове за пределами объекта.<br>
Мы можем решить эту проблему с "this" с помощью стрелочной функции: "const inner = () => {}", поскольку стрелочные функции берут "this" из внешнего (лексического) окружения.<br>
Вторым решением является использование трюка с that/this. Нам нужно лишь объявить новую переменную "const that = this" внутри "insideMe()" и перед объявлением функции "inner". Это довольно распространенный прием.<br>
Третьим решением является использование apply(), call() или bind(), нативных методов функций (функция - это тоже объект). В данном случае, мы реализовали "bind(this)" для связывания функции и объекта, чтобы "this" указывал на объект при выполнении функции. Обратите внимание, что "bind()" не выполняется сразу, поэтому мы добавили "()" после него. Если заменить "bind()" на "call()", то дополнительные круглые скобки не понадобятся. "inner.bind(this)()" станет "inner.call(this)". На практике, мы, как правило, создаем переменную для хранения результата связывания функции и объекта.
`
  },

  // 221
  {
    question: `
function* userName() {
  yield "js.pro.ru"
  yield "youtube.com/username"
  yield "John Smith"
}

let data = userName()

console.log((typeof data).length + data.next().value.length)
`,
    answers: `
A: NaN
B: 10
C: Error
D: 15
`,
    rightAnswer: `D`,
    explanation: `
Присмотритесь к функции. После ключевого слова "function" имеется символ "*". В функции отсутствует ключевое слово "return". Что здесь происходит?<br>
Если вы знакомы с генераторами, вам не составит труда решить данную задачу. Мы не часто используем генераторы, но они являются основой "async/await", позволяющей удобно работать с асинхронным кодом.<br>
Выражение "typeof data" возвращает "object", а не "function". "typeof userName" возвращает "function", поскольку "userName" - обычная функция. Выражение "(typeof data).length" возвращает 6.<br>
"data.next()" вызывает встроенный метод "next", который возвращает значение первого "yield", определенного в функции. Получаем 9 - длину строки "js.pro.ru".<br>
В итоге получаем 15. Понимание работы генераторов имеет принципиальное значение для понимания работы "async/await".
`
  },

  // 222
  {
    question: `
const a = [1, 2, "one", 3, 1, "one", "two", 3]

const b = [...new Set(a)]

b.length = "one".length

console.log(b)
`,
    answers: `
A: 4
B: [1, 2, "one", 3, "two"]
C: [1, 2, "one", "two"]
D: [1, 2, "one"]
`,
    rightAnswer: `D`,
    explanation: `
"..." в массиве - это spread-оператор (оператор распространения), который похож на rest-оператор (прочие параметры). Данный оператор позволяет объединять (изменять) и копировать массивы. В примере "b" - это копия "a". Тем не менее, когда мы передаем "a" в "Set", возвращаются только уникальные значения. Это означает, что "b" содержит [1, 2, "one", 3, "two"]. Затем мы устанавливаем значение длины "b" равным 3 ("one".length). Таким образом, мы уменьшили длину массива. Вот почему в консоль выводится только [1, 2, "one"].
`
  },

  // 223
  {
    question: `
const one = function (p) {
  return arguments[0]
}

const two = function (...p) {
  return arguments[arguments[0]]
}

const a = [one(123), two(1, 2, 3)]

console.log(typeof a !== "object" ? a[0] : a[1])
`,
    answers: `
A: 1
B: 2
C: 3
D: 123
`,
    rightAnswer: `B`,
    explanation: `
Прежде всего, следует отметить, что мы не можем использовать "arguments" в стрелочных функциях. "arguments" - это массивоподобный объект, который содержит аргументы, переданные функции при ее вызове.<br>
"..." - это rest-оператор (прочие параметры). Мы используем его в функции и массиве. Обратите внимание, что "..." в массиве - это spread-оператор (оператор распространения), который ведет себя иначе, чем rest-оператор. При использовании "..." в функции, мы можем передавать ей любое количество аргументов.<br>
Также обратите внимание, что в функции "two" мы возвращаем "arguments[arguments[0]]" или 2, а не 1, поскольку "arguments[0]" возвращает 1, а "arguments[1]" - 2.<br>
Выражение "typeof a" возвращает "object". В итоге мы получаем 2 из "a[1]" или "two(1, 2, 3)".
`
  },

  // 224
  {
    question: `
class Component {
  constructor(age) {
    this.age = age + \`&#36;{typeof Coder}\`.length
  }

  getAge() {
    return ++this.age
  }
}

class Coder extends Component {
  constructor(age) {
    super(age)
    this.age = age - \`&#36;{typeof Coder}\`.length
  }
}

const a = new Coder(16)

console.log(a.getAge())
`,
    answers: `
A: 7
B: 8
C: 9
D: 10
`,
    rightAnswer: `C`,
    explanation: `
У нас есть два простых класса, "Coder" расширяет "Component". Ничего особенного. Поскольку "typeof ClassName" возвращает "function", а не "class", мы получаем 8 из "function".length.<br>
Поскольку мы используем "super(age)" в классе "Coder", то перезаписываем конструктор родительского класса "Component". Поэтому при инициализации объекта "a" автоматически выполняется "this.age = age - \`&#36;{typeof Coder}\`.length". Разница между дочерним и родительским конструкторами заключается в арифметической операции.<br>
Таким образом, мы получаем "16 - 8", а не "16 + 8", т.е. 8. Функция "getAge" возвращает 9.<br>
Помните, что JavaScript - это не настоящий объектно-ориентированный язык программирования, несмотря на то, что мы можем использовать в нем классы и объекты.
`
  },

  // 225
  {
    question: `
class RemoveFalse {
  constructor(element) {
    this.element = element

    this.length = this.removeFalse().length
  }

  removeFalse() {
    this.element = this.element.filter(Boolean)

    return this.element
  }
}

const theArray = [true, false, 1, 0, NaN, undefined, "", null, "string"]

const a = new RemoveFalse(theArray)

console.log(a.length)
`,
    answers: `
A: false
B: true
C: 2
D: 3
`,
    rightAnswer: `D`,
    explanation: `
Основной вывод, который можно сделать из приведенного примера - "filter(Boolean)" может быть использован для удаления из массива ложных значений. Для этого мы также можем использовать "filter(callback)". Обратите внимание, что мы должны передать методу "filter" функцию обратного вызова, а "Boolean" как раз является такой функцией. Вы можете убедиться в этом с помощью "typeof Boolean".<br>
Как и "map" или "reduce", "filter" возвращает новый массив из существующего. "[true, false, 1, 0, NaN, undefined, '', null, 'string'].filter(Boolean)" возвращает "[true, 1, 'string']", поэтому "a.length" возвращает 3.
`
  },

  // 226
  {
    question: `
const coderfarm = [1, [], {}, [], 2, 3]

const converted = Number(coderfarm instanceof Array)

const result = coderfarm.indexOf(converted + true)

console.log(result)
`,
    answers: `
A: []
B: {}
C: 2
D: 4
`,
    rightAnswer: `D`,
    explanation: `
У нас имеется массив, состоящий из нескольких чисел, двух массивов и объекта. Посредством встроенной функции "Number" мы можем конвертировать любое переданное ей значение в число. "codefarm instanceof Array" возвращает true, которое преобразуется в 1. Для проверки того, является ли значение массивом, также можно использовать "Array.isArray(arrayToBeChecked)", возвращающий логическое значение. Выражение "typeof []" возвращает "object", а не "array". Встроенная функция "indexOf" возвращает индекс искомого элемента. Поскольку "converted + true" возвращает 2, мы ищем индекс элемента 2 в массиве "codefarm". Данный элемент находится на 4 позиции.
`
  },

  // 227
  {
    question: `
const converter = (arrayInput) => {
  return { ...arrayInput }
}

const content = ["function", "object", "decorator"]

const checking = content[Number(false)]

const result = typeof converter(content) === content[1]

console.log(checking ? (result ? (typeof converter).length : false) : false)
`,
    answers: `
A: 6
B: NaN
C: true
D: 8
`,
    rightAnswer: `D`,
    explanation: `
Оператор "..." является очень полезным. В функции "converted" нет ничего необычного, она использует преимущества "..." (оператор rest || оператор spread) для преобразования массива в объект.<br>
Константа "checking" имеет значение "function" из "Number(false)", что дает 0, т.е. значением "checking" является элемент массива "content" с индексом 0.<br>
Константа "result" имеет значение true, поскольку "typeof converter(content)" возвращает "function", как и "content[1]".<br>
Таким образом, мы имеем "checking = true" и "result = true", поэтому получаем "(typeof converter).length" или "function".length, или 8.<br>
Главный вывод здесь такой: мы можем использовать оператор распространения (spread-оператор) для преобразования массива в объект. Например: const a = ['hello', 2]; const b = {...a}, получаем b = {0: 'hello', 1: 2}. Ключами объекта в данном случае являются индексы элементов в массиве.
`
  },

  // 228
  {
    question: `
function* js(length) {
  for (let i = length.length; i > 0; --i) {
    yield i
  }
}

let getJS = js(typeof js)

let result = getJS.next().value

console.log(result + getJS.next().value)
`,
    answers: `
A: 10
B: 14
C: 15
D: 16
`,
    rightAnswer: `C`,
    explanation: `
Здесь мы имеем дело с функцией-генератором, которая определяется с помощью символа "*". Благодаря ключевому слову "yield" мы можем хранить в функции любое количество значений. Поскольку "typeof js" возвращает "function", длина этой строки равняется 8. Поэтому при вызове "getJS.next().value" мы получаем 8. При следующем вызове мы получаем 7, затем 6. Вот почему генератор может хранить и возвращать любое количество значений. В итоге мы получаем "8 + 7" или 15.
`
  },

  // 229
  {
    question: `
var ages = [10, 15, 20, 25]

let response = []

ages.some(function (currentValue, index, ages) {
  if (currentValue > ages[ages.length - index])
    response.push(currentValue + ages.length)
})

console.log(response)
`,
    answers: `
A: [20]
B: [20, 25]
C: [25, 29]
D: [29]
`,
    rightAnswer: `D`,
    explanation: `
"Array.prototype.some()" - это встроенная функция, позволяющая обрабатывать элементы массива с помощью колбэка. Колбэк в примере имеет три параметра: "currentValue" (значение текущего элемента массива), "index" (индекс текущего элемента) и "ages" (сам массив). <br>
Метод "some" возвращает логическое значение. Выражение "currentValue > ages[ages.length - index]" возвращает true лишь один раз, поскольку речь идет о последнем элементе. Давайте рассмотрим код последовательно: <br>
"10 > ages[4 - 0]". Поскольку "ages[4]" возвращает undefined, и "10 > undefined" возвращает false, выполнение кода останавливается. <br>

"15 > ages[4 - 1]". Поскольку "ages[3]" возвращает 25, условие является ложным. <br>

"20 > ages[4 - 2]". Поскольку "ages[2]" возвращает 20, условие также не удовлетворяется. <br>

"25 > ages[4 - 3]". Поскольку "ages[1]" возвращает 10, выражение возвращает true. Только это значение помещается в массив "response". <br>
В массиве "response" содержится "response.push(currentValue + ages.length)" или "25 + ages.length" или "25 + 4", т.е. 29.
`
  },

  // 230
  {
    question: `
const getString = (string, method = false) => {
  if (method === true) {
    return string.slice(1, 4).length
  }

  return string.substr(1, 4).length
}

console.log(getString("hello", true) + getString("hello"))
`,
    answers: `
A: 6
B: 7
C: 8
D: 9
`,
    rightAnswer: `B`,
    explanation: `
"getString()" - это стрелочная функция с двумя параметрами. Как видите, параметр "method" имеет значение по умолчанию, равное false, если не передать другое значение при вызове функции, будет использовано значение по умолчанию.<br>
Основной вывод: разница между "slice(1, 4)", возвращающим 3, и "substr(1, 4)", возвращающим 4.<br>
"console.log(getSTring('hello', true) + getSTring('hello'))" или "console.log(string.substr(1, 4).length + string.slice(1, 4).length)", или "console.log(4 + 3)" выводит в консоль 7.
`
  },

  // 232
  {
    question: `
class UserName {
  name = "hello world"

  getSlice(slice) {
    return this.getName(slice).slice(true, this.name.length)
  }

  getName(space) {
    return this.name.split(space)
  }
}

UserName.prototype.split = function (argument) {
  return this.getSlice(argument)
}

const a = new UserName()

console.log(a.split("").length)
`,
    answers: `
A: NaN
B: true
C: 10
D: 11
`,
    rightAnswer: `C`,
    explanation: `
В приведенном примере нет ничего необычного. Он намеренно запутан. У нас есть класс "UserName" с двумя методами и одним свойством. Мы добавляем к нему еще один метод - "split", используя традиционный способ (через "prototype"). Помните, что "class" в JavaScript - это лишь синтаксический сахар для функции-конструктора (выражение "typeof ClassName" возвращает "function").<br>
При вызове "split()" мы передаем ему пустую строку. Данный метод вызывает другие методы. Порядок следующий:<br>
split("") -> this.getSlice("") -> this.getName("") -> this.name.split(""). Здесь "split()" - это функция, преобразующая строку в массив.<br>
Обратите внимание, что в "getSlice()" мы используем "slice(true, this.name.length)" для модификации массива с 1 по 11 индексы. Длина нового массива равняется 10.<br>
Данный код помогает понять, как работают прототипы в JavaScript, а также увидеть разницу между встроенными и пользовательскими методами.
`
  },

  // 233
  {
    question: `
function javaScript(node) {
  let one = node.includes("I") ? " love " : " you "

  return function (deno = one) {
    let two = node.replace(deno, " done ")

    return function (done = two) {
      return (node + deno + done).length
    }
  }
}

console.log(javaScript("I love you")()())
`,
    answers: `
A: 20
B: 26
C: 23
D: 25
`,
    rightAnswer: `B`,
    explanation: `
Кроме изучения некоторых встроенных функций для работы со строками, таких как "replace" и "includes", здесь мы имеем дело с каррированием (currying). Обратите внимание, что только внешняя (основная) функция имеет название, внутренние функции являются анонимными. У нас также имеется три ключевых слова "return".<br>
При вызове функции необходимо использовать три пары круглых скобок - "javaScript('I love you')()()". Мы не передаем аргументы вложенным функциям, поэтому они используют значения по умолчанию.<br>
Результирующим выражением является "return (node + deno + done).length", где node - "I love you", deno - "love" и done - "I done you". Длина получившейся строки "I love you love I done you" равняется 24. Пробелы принимаются в расчет.
`
  },

  // 235
  {
    question: `
(function (flag) {
  let age = Boolean(NaN === NaN ? false : flag)

  console.log(age.toString()[Number(flag)])
})([])
`,
    answers: `
A: "f"
B: "t"
C: true
D: false
`,
    rightAnswer: `B`,
    explanation: `
У нас имеется самовызываемая функция с пустым массивом в качестве аргумента. Обратите внимание, что сравнение "NaN === NaN" возвращает false, поэтому переменная "age" получает значение "flag", т.е. пустой массив. "Boolean([])" возвращает true.<br>
Функция "toString" возвращает строку true, а "Number([])" - 0. Поэтому в консоль выводится "t".<br>
Запомните, что Boolean([]) = true, но Number([]) = 0. И NaN === NaN возвращает false.
`
  },

  // 236
  {
    question: `
console.log(Boolean([]))
console.log(Number([]))
console.log(Number(Boolean([])))
console.log(Boolean(Number([])))

console.log(Boolean({}))
console.log(Number({}))
console.log(Number(Boolean({})))
console.log(Boolean(Number({})))

console.log(Boolean(new Boolean(false)))
`,
    answers: `
A: true  0  1  false  true  1  1  false  false
B: true  0  1  false  false  NaN  1  false  true
C: true  0  1  false  false  false  1  false  false
D: true  0  1  false  true  NaN  1  false  true
`,
    rightAnswer: `B`,
    explanation: `
JavaScript - это язык со слабой (динамической) типизацией. Тип переменной может меняться в зависимости от значения. При изменении одного значения на другое поведение JavaScript может быть весьма неожиданным.<br>
Например, Number([]) возвращает 0, Number({}) - NaN, а Boolean([]) и Boolean({}) - true.<br>
Boolean(new Boolean(false)) возвращает true, несмотря на то, что мы передаем функции-конструктору "Boolean" значение false. Однако, если мы уберем ключевое слово "new", то получим false. Boolean(new Boolean(false)) - это валидная операция, поэтому возвращается true. С другой стороны, Boolean(Boolean(false)) без ключевого слова "new", возвращает false, поскольку значение false вообще не является операцией.
`
  },

  // 237
  {
    question: `
const myYoutube = {
  name: "username",
  address: "youtube.com/username",
  getInfo() {
    return this
  },
  content: () => (this === window ? myYoutube.getInfo() : this),
}

console.log(myYoutube.content().name)
`,
    answers: `
A: username
B: window
C: NaN
D: undefined
`,
    rightAnswer: `A`,
    explanation: `
Для того, чтобы правильно ответить на данный вопрос, нужно понимать концепцию "this" в JavaScript (в браузере). По умолчанию "this" указывает на глобальный объект "window". Обратите внимание, что "Window" (с заглавной буквы) - это функция-конструктор объекта "window". Поэтому "console.log(this === window)" возвращает true, а "console.log(this === Window)" - false.<br>
"getInfo()" - это стрелочная функция, "this", объявленный внутри этой функции, указывает на "window", поэтому "myYoutube.content()" возвращает "myYoutube.getInfo()". Обратите внимание, что нам пришлось явно писать "myYoutube.getInfo()" для того, чтобы код работал корректно, поскольку "this" не указывает на текущий объект. В функции "getInfo" this указывает на текущий объект, поскольку "getInfo()" - это обычная функция.<br>
В итоге мы получаем "username" как значение свойства "name".
`
  },

  // 238
  {
    question: `
const myArray = [1, 2, 3]

myArray.someProperty = this

Array.prototype.someOtherProperty = "hello"

let result = []

for (let key in myArray) {
  result.push(key)
}

for (let key in myArray) {
  if (myArray.hasOwnProperty(key)) {
    result.push(key)
  }
}

console.log(result.length)
`,
    answers: `
A: 10
B: NaN
C: 9
D: 7
`,
    rightAnswer: `C`,
    explanation: `
У нас имеется простой массив с тремя элементами. При проверке типа массива с помощью оператора "typeof" мы получаем "object" (для определения того, что значение является массивом, можно использовать "Array.isArray(array)" или "array instanceof Array").<br>
При объявлении "myArray.someProperty" мы добавляем новое свойство к данному массиву, при объявлении "Array.prototype.someProperty = 'hello'", мы добавляем новое свойство к каждому массиву.<br>
Цикл "for-in" перебирает массив и возвращает пары ключ/значение, включая унаследованное свойство. На второй итерации мы используем метод "hasOwnProperty", который перебирает только собственные (не унаследованные) ключи/значения.<br>
Если коротко, на первой итерации мы получаем 5 (3 исходных элемента, 1 собственное свойство и еще 1 унаследованное). На второй - только 4 (унаследованное свойство не учитывается).<br>
Для перебора массива обычно используется цикл "for-of" или классический цикл "for". Использование "for-in" для этого является плохой практикой. "for-in", обычно, используется для перебора объектов.
`
  },

  // 239
  {
    question: `
const coderfarm = [1, 2, 3, 4, 5]

const [top, ...bottom] = (function (a) {
  let result = a

  a.unshift(new Array(3))

  return result
})(coderfarm)

console.log(top.length + bottom.length)
`,
    answers: `
A: 8
B: 9
C: 10
D: 11
`,
    rightAnswer: `A`,
    explanation: `
Здесь мы используем деструктуризацию для извлечения значений массива (или объекта) и spread-оператор (оператор распространения).<br>
Деструктурируемый массив возвращается из самовызываемой функции. Сначала мы передаем аргумент "codefarm" (параметр "a" в функции). Затем мы обновляем этот массив, добавляя в начало (посредством метода "unshift") массив из трех undefined (с помощью "new Array(3)"). После этого массив выглядит так: [[undefined, undefined, undefined], 1, 2, 3, 4, 5].<br>
Переменная "top" - это первый элемент массива или [undefined, undefined, undefined], длина которого равняется 3.<br>
Переменная "bottom" - это прочие элементы массива, ее длина равняется 5.<br>
В итоге мы получаем "3 + 5" или 8.
`
  },

  // 240
  {
    question: `
let age = { number: 10 }

const getAge = (flag) => {
  flag ? delete age.number : delete age
  return age.number++
}

console.log(getAge(false))

console.log(age.number)

console.log(getAge(true))

console.log(age.number)
`,
    answers: `
A: 10  10  NaN  NaN
B: 10  10  undefined  undefined
C: 10  11  undefined  undefined
D: 10  11  NaN  NaN
`,
    rightAnswer: `D`,
    explanation: `
Оператор "delete" удаляет свойство объекта, но не сам объект. У нас есть простая функция "getAge" с параметром "flag". Если значением "flag" является true, выполняется код "delete age.number", в противном случае, мы пытаемся удалить объект.<br>
Поскольку "delete" не может удалить объект, можно сказать, что "delete age" ничего не делает. Выражение "console.log(getAge(false))" возвращает 10 и затем увеличивает значение "age.number" на 1. Данное значение хранится в памяти, поэтому "console.log(age.number)" возвращает 11.<br>
Когда мы присваиваем "flag" значение true, "console.log(getAge(true))" выполняет код "delete age.number", что удаляет свойство "number" объекта "age". Это означает, что "age.number" равняется undefined. Однако, поскольку мы пытаемся увеличить значение этого свойства на 1 с помощью оператора "++", возвращается NaN.
`
  }
]
