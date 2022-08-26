function _prepare(_mat) {
    _mat = [[]].concat(_mat)
    for (i = 0; i < _mat.length; ++i)
        _mat[i] = [0].concat(_mat[i])
    return _mat
}

function linear(_mat) {
    _mat = _prepare(_mat)
    return _solve(_mat)
}

function _solve(_mat) {
    var c = new Array()
      , d = new Array()
    var n = _mat.length - 1

    for (i = 0; i <= n + 1; i++) {
        d[i] = new Array();
        c[i] = 0
        for (j = 0; j <= n + 1; ++j)
            d[i][j] = 0
    }

    // mission impossible
    // calculate all the determinants of the system
    for (m = 2; m <= n; ++m) {
        for (i = m; i <= n; ++i)
            for (j = m - 1; j <= n + 1; ++j)
                d[i][j] = [_mat[i][j] * _mat[m - 1][m - 1], _mat[i][m - 1]]
        for (i = m; i <= n; ++i)
            for (j = m - 1; j <= n + 1; ++j) {
                _mat[i][j] = d[i][j][0] - d[i][j][1] * _mat[m - 1][j]
                if (Math.abs(_mat[i][j]) < 1e-25)
                    _mat[i][j] = 0
                // i have to add this line
            }
    }
    // now the coefficients of equation (not exactly)

    for (i = n; i >= 1; --i) {
        c[i - 1] = _mat[i][n + 1]
        if (i != n)
            for (j = n; j >= i + 1; --j)
                c[i - 1] = c[i - 1] - _mat[i][j] * c[j - 1]
        if (_mat[i][i] != 0)
            c[i - 1] = c[i - 1] / _mat[i][i]
        else
            c[i - 1] = 0
        if (Math.abs(c[i - 1]) < 1e-25)
            c[i - 1] = 0
    }
    c.length = n
    return c
}

function fitpoly(e, b) {
    var a = new Array()
    var n = 1 + b
      , e = [[0, 0]].concat(e)
      , ns = e.length - 1
    for (i = 0; i <= n + 1; i++) {
        a[i] = new Array();
        for (j = 0; j <= n + 1; ++j)
            a[i][j] = 0
    }
    for (m = 1; m <= n; m++)
        for (i = 1; i <= m; i++) {
            j = m - i + 1;
            for (ii = 1; ii <= ns; ii++)
                a[i][j] = a[i][j] + Math.pow(e[ii][0], m - 1)
        }
    for (i = 1; i <= n; ++i)
        for (ii = 1; ii <= ns; ++ii)
            a[i][n + 1] = a[i][n + 1] + e[ii][1] * Math.pow(e[ii][0], i - 1)
    for (m = n + 2; m <= 2 * n; ++m)
        for (i = m - n; i <= n; ++i) {
            j = m - i
            for (ii = 1; ii <= ns; ++ii)
                a[i][j] = a[i][j] + Math.pow(e[ii][0], m - 2)
            // coefficients of system
        }
    a.length = a.length - 1
    return _solve(a)
}

//and then
poly_degree = 3
points = [[5033, 2049], [4828, 1912], [4755, 1866], [5456, 2338], [5042, 2061], [5229, 2191], [41225, 64970], [16833, 10541], [49797, 89356], [7609, 3961], [9662, 5827]]
// coefficients of polynome 
console.log(fitpoly(points, poly_degree))

// or solve a linear system. Here with six variables
solution = linear([[1, 2, 3, -2, -3, -26, 52], [3, 2, 5, -2, 4, 30, -60], [6, 1, -4, -1, 5, 94, -188], [-1, 2, 4, 3, 4, 30, -60], [-1, 4, 2, -1, 2, 26, -52], [3, -3, 11, -7, -2, -1, -95]])
console.log(solution)

function aa(x) {
    let arr = fitpoly(points, poly_degree)
    let val = arr.reduce((a,b,i)=>{
        return a + b * (x ** i)
    }
    , 0)
    return val
}
function bb(x) {
    return (10 * Math.log(x + 1) + 30) * x ** 0.5
    // 51 34.95
}

function cc(x) {
    return (10 * Math.log(x + 1) + ((20**0.5)*Math.log(x+1)+0.115061)) * x ** 0.5
    // 51 34.95
}
function dd(x) {
    return (10 * Math.log(x + 1) + (10 *Math.log10(x+1)+3.127)) * x ** 0.5
    // 51 34.95
}
var obj = {
    // 咨询人数:咨询人数指数
    '1513': '4167',
    '1792': '4633',
    '1796': '4649',
    '1833': '4716',
    '1843': '4725',
    '1850': '4725',
    '1864': '4740',
    '1866': '4755',
    '1868': '4766',
    '1874': '4755',
    '1905': '4864',
    '1912': '4828',
    '2043': '5005',
    '2049': '5033',
    '2055': '5054',
    '2056': '5031',
    '2061': '5042',
    '2072': '5054',
    '2091': '5118',
    '2129': '5215',
    '2132': '5160',
    '2154': '5191',
    '2161': '5182',
    '2281': '5462',
    '2314': '5446',
    '2338': '5456',
    '2655': '6014',
    '2792': '6188',
    '3052': '6466',
    '3474': '7009',
    '3550': '7155',
    '3763': '7354',
    '3796': '7441',
    '3882': '7459',
    '4570': '8281',
    '5651': '9462',
    '5770': '9654',
    '6313': '10124',
    '6526': '10349',
    '7074': '10892',
    '10289': '13658',
    '16602': '18240',
    '22253': '21752',
    '29327': '25676',
    '35097': '28607',
    '38647': '30312',
    '42443': '32056',
    '45098': '33256',
    '47890': '34480',
    '50171': '35460',
    '52300': '36353',
    '54205': '37140',
    '58775': '38940',
    '60866': '39752',
    '62921': '40537',
    '64795': '41243',
    '64970': '41225',
    '66638': '41931',
    '68430': '42590',
    '70304': '43270',
    '72618': '44101',
    '76500': '45453',
    '78296': '46079',
    '80146': '46715',
    '82278': '47439',
    '84146': '48070',
    '85979': '48685',
    '87843': '49300',
    '89356': '49797',
    '123039': '59677',
}
function nn(x) {
    return obj[x] - (10 * Math.log(x + 1)) * x ** 0.5
}
[1866,2338,2655,2792,3052,3474,3550,3763,3796,3882,4570,5651,5770,6313,6526,7074,10289,16602,22253,29327,35097,38647,42443,45098,50171,52300,54205,58775,60866,62921,64795,64970,66638,68430,70304,72618,76500,78296,80146,85979,87843,89356,123039].map(i=>{
console.log('>>>',i) 
console.log(nn(i))
})
