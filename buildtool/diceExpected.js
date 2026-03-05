function expected() {
    let dicecount = document.getElementById('exp_dice').value;
    let modi = Number.parseInt(document.getElementById('exp_modi').value);
    let remodi = Number.parseInt(document.getElementById('exp_remodi').value);



    let d = [];
    for (let i = 0; i < dicecount; i++) { d.push(1) }

    let results = [];
    let conti = true;
    while (conti) {
        results.push(d.reduce((sum, res) => { return sum + res }));

        let a = false;
        d.forEach(elm => { if (elm != 6) a = true; })
        conti = a;

        d[dicecount - 1]++;
        for (let i = 0; i < dicecount; i++) {
            if (d[dicecount - 1 - i] > 6) {
                d[dicecount - 1 - i] = 1;
                d[dicecount - 2 - i]++;
            }
        }
    }
    
    console.log((results.reduce((sum,res) =>{return sum + res})/results.length) + modi + remodi);
    document.getElementById('exp_result').innerText = `結果：${(results.reduce((sum,res) =>{return sum + res})/results.length) + modi + remodi}`;
}