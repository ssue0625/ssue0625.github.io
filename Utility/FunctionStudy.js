// 중복을 없애야 겠다..
// 수정이 용이하다.
// 작업 내용이 이름을 통해서 추상화 되었다.
// 덕분에,, 실체적인 구현 방법이나 내용이 감추어졌다.
// 비로소 블랙박스가 되었다.
// y = greet(x);
// 기본 함수 제작
function declaredGreet() { // 선언적 함수
    // 모니터에 출력을  하는 넘이 누군지 찾아야해..
    // const monitor = window.getMonitor();
    // const monitorJobQueue = monitor.getJobQueu();
    // monitorJobQueue.EnQueue('Hello, 수빈'); // 내일 
    // moitor Call Stack 에 일이 없으면,,
    // monitor 는 작업 큐에서 일을 가져와서 모니터에 뿌린다.
    // "내일"을 콜스택에 가져오면 비로서 밑의 내용이 찍한다.
    // 100만줄..
    console.log('Hello, 수빈');
    return; // 반환값
}
(function () {
    return;
})(); // IIFE
const LiteralGreet = function (name) { // name : 매개변수 parameter
    console.log('Hello, ' + name);
    return;
}

// 화살표 함수 
// this가 선언시 정해진다.
//(() => {})();   // IIFE
// const greet = (func, name) => {  // 함수를 인자로 받는 법.
//     //console.log('Hello, ' + name);
//     func(name);
// };
// Arrow는 더 줄일 수 있다.
//const greet = name => console.log(name);

// 함수를 반환하는 넘
const greet = _ => {
    return name => {
        console.log(name);
    };
};
const anotherGreet = greet; // 함수 주소값은 참조 변수와 동일하다.
const functionResult = greet(); // 함수 리턴값을 받는 방법..

// 함수에 인자 전달시, 함수도 전달할 수 있다.
//anotherGreet('수빈');    // 호출 방법, 인자 / 인수를 전달 argument
//anotherGreet('수빈');    // 호출 방법, 인자 / 인수를 전달 argument
(anotherGreet())('수빈~ '); // iife
//
// 100만줄
//
greet('john');
//
//
//
greet('david');

class MyClass {
    constructor(param) {
        this.field = param;
    }
    static func(data) {
        // Math.add(3 ,5);
        data += 3;
        return data;
    }
    // const func = function () {};
}
const result = MyClass.func(345); // result = 348;