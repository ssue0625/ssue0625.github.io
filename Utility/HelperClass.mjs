export default class HelperClass {
    // console.log()
    c(...parameters) { // 가변인자 : 배열로 만들어줌
        console.log(...parameters); // Spread 연산자 : 배열을 ,,, 로 분리해서 넣어줌
    }
    // console.dir()
    d(...parameters) {
        console.dir(parameters[0]); // 상세히 log
    }
    // Document.body.article 이용
    w(...parameters) { // article class 이용
        const display = document.querySelector('.article');
        display.innerHTML = '';
        display.style.backgroundColor = '#c8c8c8';
        let div;
        for (let string of parameters) {
            div = document.createElement('div');
            div.textContent = string;
            display.appendChild(div);
        }
    }
}