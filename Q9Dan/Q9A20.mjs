const Q9A20 = function () {
    const area = document.querySelector('.article');
    const content = `
    <body>
        <h3>결과</h3>
        <p>Console에서 결과 확인</p>
        <h3>코드</h3>
        <p>
            for (let j = 9; j > 1; j--) {
                for (let k = 9; k > 1; k--) {
                    console.log(k + " x " + j + " = " + k * j);
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
    area.innerHTML = content;
    for (let j = 9; j >= 1; j--) {
        for (let k = 9; k >= 1; k--) {
            console.log(j + " x " + k + " = " + j * k);
        }
    }
}
export default Q9A20;