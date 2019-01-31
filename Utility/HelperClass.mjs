export default class HelperClass {
    c(...parameters) {  // 가변인자 : 배열로 만들어줌
        console.log(...parameters); // Spread 연산자 : 배열을 ,,, 로 분리해서 넣어줌
    }
    d(...parameters) {
        const scr = document.querySelector('nav');
        scr.innerHTML = '';
        let str = '';
        //let div;
        for (let s of parameters) {
            //div = document.makeElement('div');
            str += s + '\n';
            //scr.appendChild(div);
        }
        scr.textContent = str;
    }
}

