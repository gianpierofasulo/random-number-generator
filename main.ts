
function RNG( min: number, max: number) {
    const rng = Math.random();
    
    return Math.trunc(rng * (max - min) + min);  

}

function RNG_Dec( min: number, max: number, precision: number) {
    
        // Testa se il numero è negativo
        if (precision < 0) {
            throw new Error(`Precision  ${precision} non può essere negativo `);
        } 
      
        // Testa se il numero è decimale
        if (precision % 1 !== 0) {
            throw new Error(`Precision  ${precision} non può essere decimale `);
        } 
          
    
      
   // il multifactor non è altro che la potenza di 10 elevata alla precision
   const multifactor = Math.pow( 10, precision);
   // Moltiplichiamo min e max per la potenza di 10 per la sua precision così da avere N decimali in base al vaolre di precision
   return  RNG (max * multifactor , min * multifactor )  / multifactor; 
}

function RNGsequence( len: number, min: number, max: number, precision: number) {

    const res: number[] = [];

    while (res.length < len) {
        if (len > max - min ) {
            throw new Error(`Non posso avere  ${len} tra ${max} e ${min} `);
        /* console.error('Non posso trovare  ${len} tra ${max} e ${min} '); 
        return; */
        }
        const rn = RNG_Dec(min, max, precision);
            if (res.includes(rn)) {
                continue;
            }
        res.push( rn );
    }

   /*  for (let i= 0; i < len; i++) {
        res.push( RNG(min, max) );
        
    } */
    return res;
}

const ruote = ['Bari','Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia', 'Nazionale'];

const estrazioni: {[ruota: string]: number[] } = {};

for ( const ruota of ruote ) {
    const estrazione = RNGsequence( 5, 1, 90, 0);
    estrazioni[ruota] = estrazione;
}

//const myArr = RNGsequence( 10, 1, 15, 0);

console.log(JSON.stringify( estrazioni, null ,2) );



