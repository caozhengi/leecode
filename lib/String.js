/**
 * 415. 字符串相加
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
let addStrings = function (num1, num2) {
    const list1 = num1.split('').reverse()
    const list2 = num2.split('').reverse()
    const length = Math.max(list1.length, list2.length)
    const result = new Array(length + 1).fill(0)

    for (let i = 0; i < length; i++) {
        const num1 = Number(list1[i] || 0)
        const num2 = Number(list2[i] || 0)
        const sum = num1 + num2 + result[i]

        result[i] = sum % 10
        result[i + 1] = Math.floor(sum / 10)
    }

    return result.reverse().join('').replace(/^0*/, '') || '0'
}
