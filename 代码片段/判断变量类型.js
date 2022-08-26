/**
 * @param {void} val
 * @returns {string}
 * @abstract 对类型进行细分
 * @abstract object 排除 null
 * @abstract number 排除 NaN、Infinity、-Infinity
 * @abstract string 排除 ''
 */
function getVarType(val) {
    var type = typeof val

    if (type === 'object') {
        var typeStr = Object.prototype.toString.call(val)

        typeStr = typeStr.split(' ')[1]
        type = typeStr.substring(0, typeStr.length - 1).toLowerCase()
    }

    if (type === 'number') {
        if (isFinite(val)) {
            type = 'number'
        } else {
            if (isNaN(val)) {
                type = 'NaN'
            } else {
                type = 'Infinity'
            }
        }
    } else if (type === 'string') {
        if ('' === val) {
            type = ''
        }
    }

    return type
}
