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
var ruote = ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia', 'Nazionale'];
// variabile di tipo MAPPA cioè mappa valori
var estrazioni = {};
for (var _i = 0, ruote_1 = ruote; _i < ruote_1.length; _i++) {
    var ruota = ruote_1[_i];
    var estrazione = RNGsequence(5, 1, 90, 0);
    estrazioni[ruota] = estrazione;
}
//const myArr = RNGsequence( 10, 1, 15, 0);
console.log(JSON.stringify(estrazioni, null, 2));
function createRuota(ruotaName, ruotaEstrazioni) {
    var ruotaDiv = document.createElement('div');
    ruotaDiv.className = "ruota ".concat(ruotaName.toLowerCase());
    var nameH2 = document.createElement('h2');
    nameH2.className = 'ruotaName';
    nameH2.innerText = ruotaName;
    ruotaDiv.appendChild(nameH2);
    for (var _i = 0, ruotaEstrazioni_1 = ruotaEstrazioni; _i < ruotaEstrazioni_1.length; _i++) {
        var num = ruotaEstrazioni_1[_i];
        var numP = document.createElement('p');
        numP.innerText = num.toString();
        var numDiv = document.createElement('div');
        numDiv.className = 'ruota-estrazione';
        numDiv.appendChild(numP);
        ruotaDiv.appendChild(numDiv);
    }
    return ruotaDiv;
}
var container = document.getElementById('cnt');
if (container) {
    var pre = document.createElement('pre');
    for (var _a = 0, ruote_2 = ruote; _a < ruote_2.length; _a++) {
        var ruota = ruote_2[_a];
        var ruotaEstrazioni = estrazioni[ruota];
        var ruotaDiv = createRuota(ruota, ruotaEstrazioni);
        container.appendChild(ruotaDiv);
    }
}
