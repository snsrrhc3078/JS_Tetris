/**
 * 최대값을 정수로 입력받아 0부터 최대값 사이의 랜덤한 값을 반환하는 함수
 * @param {number} max  랜덤으로 나올 수 있는 최대값
 * @returns 정수형태의 랜덤출력값
 */
function getRandom(max){
    return parseInt(Math.random() * max) ; //0~n 사이의 정수 출력
}       

//범위가 있는 랜덤값
// min: 시작값
//max: 끝값
/**
 * 최소값과 최대값을을 정수로 입력받아 최소값부터 최대값 사이의 랜덤한 값을
 * 반환하는 함수
 * @param {number}  min 랜덤으로 나올 수 있는 최소값
 * @param {number} max  랜덤으로 나올 수 있는 최대값
 * @returns 정수형태의 랜덤출력값
 */
function getRandomWithRange(min, max){
    return parseInt(Math.random() * (max-min+1)) + min; //m~n 사이의 정수 출력
}
// export {getRandom, getRandomWithRange};