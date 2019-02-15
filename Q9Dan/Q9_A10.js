const testFunc = function() {
const area = document.querySelector('.article');
const content = `
<body>
<h3 id="Q9_A100">결과</h3>
    <h3>코드</h3>
    <p>
        for (let j = 1; j < 10; j++) { 
            for (let k=1; k < 10; k++) { 
                console.log(j + " x " + k + " = " + j * k); 
            } 
        }
    </p>
    <h3>사용 기술</h3>
    <p>처음으로 짜는 99단<br>console.log() 사용</p>
    <h3>문제점</h3>
    <p>브라우저의 검사를 불러야만 결과를 볼 수 있다.</p>
    <h3>ToDo</h3>
    <p>Document 구조를 이용해서 브라우저에 출력하는 걸 해 본다.</p>
    </body>
`;
//
area.innerHTML = content;
for (let j = 1; j < 10; j++) {
    for (let k = 1; k < 10; k++) {
        console.log(j + " x " + k + " = " + j * k);
    }
}
}