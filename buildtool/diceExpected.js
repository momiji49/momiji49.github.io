function Expected() {
    let dicecount = document.getElementById('exp_dice').value;
    let modi = Number.parseInt(document.getElementById('exp_modi').value);
    let remodi = Number.parseInt(document.getElementById('exp_remodi').value);



    let d = [];
    for (let i = 0; i < dicecount; i++) { d.push(1) }

    let results = [];
    if (dicecount == 0) {
        results.push(0);
    }
    else {
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
    }

    console.log((results.reduce((sum, res) => { return sum + res }) / results.length) + modi + remodi);
    document.getElementById('exp_result').innerText = `計算結果：${(results.reduce((sum, res) => { return sum + res }) / results.length) + modi + remodi}`;
}

function Simulation() {
    let dicecount = document.getElementById('exp_dice').value;
    let modi = Number.parseInt(document.getElementById('exp_modi').value);
    let remodi = Number.parseInt(document.getElementById('exp_remodi').value);

    let d_res = [];
    for (let i = 0; i < dicecount; i++) { d_res.push(Math.floor(Math.random() * 6) + 1); }
    document.getElementById('simu_result').innerText = dicecount <= 0 ? '※「ダイス数」には正の整数を入力してください': `試振結果：${d_res.reduce((sum, res) => { return sum + res }) + modi + remodi} ([${d_res.join(', ')}] ${modi < 0 ? modi : '+' + modi} ${remodi < 0 ? remodi : '+' + remodi})`;
}