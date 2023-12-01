function RNG(min, max) {
    var rng = Math.random();
    return Math.trunc(rng * (max - min) + min);
}
function RNG_Dec(min, max, precision) {
    // Testa se il numero è negativo
    if (precision < 0) {
        throw new Error("Precision  ".concat(precision, " non pu\u00F2 essere negativo "));
    }
    // Testa se il numero è decimale
    if (precision % 1 !== 0) {
        throw new Error("Precision  ".concat(precision, " non pu\u00F2 essere decimale "));
    }
    // il multifactor non è altro che la potenza di 10 elevata alla precision
    var multifactor = Math.pow(10, precision);
    // Moltiplichiamo min e max per la potenza di 10 per la sua precision così da avere N decimali in base al vaolre di precision
    return RNG(max * multifactor, min * multifactor) / multifactor;
}
function RNGsequence(len, min, max, precision) {
    var res = [];
    while (res.length < len) {
        if (len > max - min) {
            throw new Error("Non posso avere  ".concat(len, " tra ").concat(max, " e ").concat(min, " "));
            /* console.error('Non posso trovare  ${len} tra ${max} e ${min} ');
            return; */
        }
        var rn = RNG_Dec(min, max, precision);
        if (res.includes(rn)) {
            continue;
        }
        res.push(rn);
    }
    /*  for (let i= 0; i < len; i++) {
         res.push( RNG(min, max) );
         
     } */
    return res;
}
var myArr = RNGsequence(10, 1, 15, 2);
console.log(myArr);