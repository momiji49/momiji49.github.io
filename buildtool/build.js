async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function Load() {
    classes = await fetchData('class.json');
    skills = await fetchData('skill.json');
    equipment = await fetchData('equipment.json');
    InitialSet();
}

let classes;
let skills;
let equipment;
let skill_hozon = {};
Load();

function ChangeClass(value) {
    document.getElementById('sk_sel0').innerText = classes[value]["0"];
    document.getElementById('sk_sel1').innerText = classes[value]["1"];
    let sels = document.getElementsByClassName('skill_select');

    let sk_opts = ['<option value="0">-</option>'];
    let sk_optcount = 1;
    for (let x = 0; x < 3; x++) {
        if (classes[value][x == 0 ? 'passive' : x == 1 ? 'action' : 'reaction'].length != 0) {
            sk_opts.push(`<optgroup label="${x == 0 ? 'パッシヴスキル' : x == 1 ? 'アクションスキル' : 'リアクションスキル'}">`);
            classes[value][x == 0 ? 'passive' : x == 1 ? 'action' : 'reaction'].forEach(element => {
                sk_opts.push(`<option value=${sk_optcount}>${element}</option>`);
                skill_hozon[sk_optcount] = element;
                sk_optcount++;
            });
            sk_opts.push(`</optgroup>`);
        }
    };
    for (x of sels) {
        x.innerHTML = sk_opts.join('\n')
    }
    for (let int = 0; int < 6; int++)ChangeSkill(int);
    ChangeParam();
}

function ChangeSkill(num) {
    if (num < 2) {
        let skillname = document.getElementById(`sk_sel${num}`).innerText;
        let lv_opts = [`<option value="1">Level 1</option>`];
        for (let x = 1; x < skills[skillname].maxlevel; x++) { lv_opts.push(`<option value="${x + 1}">Level ${x + 1}</option>`) };
        document.getElementById(`lv_sel${num}`).innerHTML = lv_opts.join('\n');
    }
    else {
        let skillvalue = document.getElementById(`sk_sel${num}`).value;
        let lv_opts = [`<option value="1">Level 1</option>`];
        if (skillvalue != '0') {
            for (let x = 1; x < skills[skill_hozon[skillvalue]].maxlevel; x++) { lv_opts.push(`<option value="${x + 1}">Level ${x + 1}</option>`) };
        }
        document.getElementById(`lv_sel${num}`).innerHTML = lv_opts.join('\n');
    }
}

function ChangeParam() {
    let cp = {
        'str': Number.parseInt(document.getElementById('str').value),
        'con': Number.parseInt(document.getElementById('con').value),
        'dex': Number.parseInt(document.getElementById('dex').value),
        'agi': Number.parseInt(document.getElementById('agi').value),
        'sen': Number.parseInt(document.getElementById('sen').value),
        'int': Number.parseInt(document.getElementById('int').value),
        'skilllv_0': document.getElementById('lv_sel0').value,
        'skilllv_1': document.getElementById('lv_sel1').value,
        'skilllv_2': document.getElementById('lv_sel2').value,
        'skilllv_3': document.getElementById('lv_sel3').value,
        'skilllv_4': document.getElementById('lv_sel4').value,
        'skilllv_5': document.getElementById('lv_sel5').value
    }

    let effects = {
        "hp": 0,
        "sp": 0,
        "atk": 0,
        "atk_d": 1,
        "def": 0,
        "def_re": 0,
        "matk": 0,
        "matk_d": 0,
        "mdef": 0,
        "hit": 0,
        "flee": 0,
        "resist": 0,
        'str': 0,
        'con': 0,
        'dex': 0,
        'agi': 0,
        'sen': 0,
        'int': 0
    };

    for (es of document.getElementsByClassName("equipmentselect")) {
        for (eseff of equipment[es.value].effect) {
            let fanfan = eseff.split(',');
            effects[fanfan[0]] += Number.parseInt(fanfan[1]);
        }
        let attval = document.getElementById(es.id + '_att').value;
        if (equipment[es.value]['addeffect'][attval] != undefined) {
            for (effe of equipment[es.value]['addeffect'][attval]) {
                let fanfan = effe.split(',');
                effects[fanfan[0]] += Number.parseInt(fanfan[1]);
            }
        }
    }

    for (let xac = 2; xac < 6; xac++) {
        let aa = SkillEffect(skill_hozon[document.getElementById(`sk_sel${xac}`).value], document.getElementById(`lv_sel${xac}`).value, equipment[document.getElementById('weapon').value].type, document.getElementById('shield').value != 'なし');
        if (aa[0]) {
            effects[aa[1]] += aa[2];
        }
    }

    let status = {
        'str': cp['str'] + effects['str'],
        "con": cp['con'] + effects['con'],
        "dex": cp['dex'] + effects['dex'],
        "agi": cp['agi'] + effects['agi'],
        "sen": cp['sen'] + effects['sen'],
        "int": cp['int'] + effects['int']
    };
    let modi = {
        "str": Math.trunc((status['str'] - 10) / 4),
        "con": Math.trunc((status['con'] - 10) / 4),
        "dex": Math.trunc((status['dex'] - 10) / 4),
        "agi": Math.trunc((status['agi'] - 10) / 4),
        "sen": Math.trunc((status['sen'] - 10) / 4),
        "int": Math.trunc((status['int'] - 10) / 4)
    }

    let weapondata = equipment[document.getElementById('weapon').value];

    //HP＝（30＋筋力＋体力×2）÷4＋(レベル+2)÷3＋各種補正(鎧、アクセサリ等)
    document.getElementById("prm_hp").innerText = Math.trunc(((31 + status["str"] + status["con"] * 2) / 4) + (32 / 3)) + effects['hp'];
    //SP＝（30＋知力＋感覚×2）÷4＋(レベル+2)÷3＋各種補正(兜、鎧等)
    document.getElementById("prm_sp").innerText = Math.trunc(((31 + status["int"] + status["sen"] * 2) / 4) + (32 / 3)) + effects['sp'];
    //atkめんどすぎ
    /*  剣、短剣、杖、鈍器、槍、装備なしの場合：　筋力補正値×2＋各種補正
        短剣の場合：　筋力補正値×1.5(切り上げ)＋器用補正値×0.5(切り上げ)＋各種補正
        斧の場合：　筋力補正値×1.5(切り上げ)＋体力補正値×0.5(切り上げ)＋各種補正
        弓の場合：　器用補正値×1＋各種補正
        杖の場合：　筋力補正値×1＋各種補正
        両手武器（弓とワンド以外の杖もサイズ大であれば該当）の場合：さらに筋力補正値÷3(切り捨て)を加算
    */
    let prmatk = 0;
    switch (weapondata.type) {
        case 'dagger':
            prmatk += Math.ceil(modi['str']) + Math.ceil(modi['dex']) + effects['atk'];
            break;
        case 'axe':
            prmatk += Math.ceil(modi['str']) + Math.ceil(modi['con']) + effects['atk'];
            break;
        case 'bow':
            prmatk += modi['dex'] + effects['atk'];
            break;
        case 'rod':
            prmatk += modi['str'] + effects['atk'];
            break;
        default:
            prmatk += modi['str'] * 2 + effects['atk'];
            break;
    }
    if (weapondata.size == 'large') prmatk += Math.trunc(modi['str'] / 3);
    document.getElementById('prm_atk').innerText = `${effects['atk_d'] != 0 ? effects['atk_d'] + 'd' : ''}${(prmatk < 0 ? '' : '+') + prmatk}`;
    //MATK=知力補正値×1＋各種補正
    let prmmatk = weapondata.type == 'rod' ? Math.floor(modi['int'] * 1.5) + effects['matk'] : modi['int'] + effects['matk'];
    document.getElementById('prm_matk').innerText = `${effects['matk_d'] != 0 ? effects['matk_d'] + 'd' : ''}${(prmmatk < 0 ? '' : '+') + prmmatk}`
    //DEF=体力補正値×1+各種補正
    let prmdef = modi["con"] + effects['def'];
    document.getElementById("prm_def").innerText = prmdef + `(${prmdef + Math.ceil(prmdef / 2) + effects['def_re']})`;
    //MDEF=感覚補正値×1+各種補正
    let prmmdef = modi['sen'] + effects['mdef'];
    document.getElementById("prm_mdef").innerText = prmmdef + `(${prmmdef + Math.ceil(prmmdef / 2)})`;
    //HIT=器用補正値×1+各種補正
    document.getElementById("prm_hit").innerText = modi["dex"] + effects['hit'];
    //FLEE=敏捷補正値×1+各種補正
    document.getElementById("prm_flee").innerText = modi["agi"] + effects['flee'];
    //RESIST=感覚補正値×1+各種補正
    document.getElementById("prm_resist").innerText = modi["sen"] + effects['resist'];

    document.getElementById('ac_str').innerText = `${effects['str'] >= 0 ? '+' : ''}` + effects['str'];
    document.getElementById('ac_con').innerText = `${effects['con'] >= 0 ? '+' : ''}` + effects['con'];
    document.getElementById('ac_dex').innerText = `${effects['dex'] >= 0 ? '+' : ''}` + effects['dex'];
    document.getElementById('ac_agi').innerText = `${effects['agi'] >= 0 ? '+' : ''}` + effects['agi'];
    document.getElementById('ac_sen').innerText = `${effects['sen'] >= 0 ? '+' : ''}` + effects['sen'];
    document.getElementById('ac_int').innerText = `${effects['int'] >= 0 ? '+' : ''}` + effects['int'];

    document.getElementById('modi_str').innerText = modi['str'];
    document.getElementById('modi_con').innerText = modi['con'];
    document.getElementById('modi_dex').innerText = modi['dex'];
    document.getElementById('modi_agi').innerText = modi['agi'];
    document.getElementById('modi_sen').innerText = modi['sen'];
    document.getElementById('modi_int').innerText = modi['int'];


    //cp計算;
    let cpval = 0;

    for (let int = 0; int < 6; int++) {
        let sttname = Sttnum(int);
        if (cp[sttname] <= 20) { cpval += (cp[sttname] - 6) * 2; }
        else if (cp[sttname] <= 40) { cpval += (cp[sttname] - 20) * 3 + 28; }
        else if (cp[sttname] <= 60) { cpval += (cp[sttname] - 40) * 4 + 88; }
        else if (cp[sttname] <= 80) { cpval += (cp[sttname] - 60) * 5 + 168; }
        else if (cp[sttname] <= 100) { cpval += (cp[sttname] - 80) * 6 + 268; }
        cpval += (cp['skilllv_' + int] - 1) * 3;
    }
    document.getElementById('cp').innerText = `CP ${300 - cpval}`;
    document.getElementById('cp').style.color = cpval <= 300 ? '#000' : '#F00';

    /*期待値計算;
    let dice = [];

    for (let i = 0; i < effects.atk_d; i++) dice.push(1);

    let ifcontinue = true;
    let atk_values = [];
    //ATKダメージ;
    while (ifcontinue) {
        atk_values.push(dice.reduce((sum, ele) => { return sum + ele }, 0));

        ifcontinue = false;
        dice.forEach((elem) => { if (elem != 6) ifcontinue = true });
        dice[dice.length - 1]++;
        for (let i = 0; i < dice.length; i++) {
            if (dice[dice.length - i - 1] > 6) {
                dice[dice.length - i - 1] = 1;
                dice[dice.length - i - 2]++;
            }
        }
    }
    console.log(atk_values);
    document.getElementById('kitai_atk').innerText = Math.round((atk_values.reduce((sum, ele) => { return sum + ele }, 0) / atk_values.length + prmatk) * 100) / 100;*/
}

function ChangeStatusButton(id) {
    let stid = id.split('_')[0];
    let stval = Number.parseInt(document.getElementById(stid).value) + Number.parseInt(id.split('_')[1]);
    if (stval < 6) stval = 6;
    document.getElementById(stid).value = stval;
    ChangeParam();
}

function ChangeStatus(id) {
    let stval = Number.parseInt(document.getElementById(id).value);
    if (stval == NaN || stval < 6) stval = 6;
    document.getElementById(id).value = stval;
    ChangeParam();
}

function ChangeEquipment(id) {
    let eqval = document.getElementById(id).value;
    let opts = document.getElementById(id + '_att').children;
    document.getElementById(id + '_att').value = 0;
    for (let cnt = 1; cnt < opts.length; cnt++) {
        opts[cnt].disabled = equipment[eqval]['attribute'][cnt - 1] ? false : true;
    }

    if (id == 'weapon') {
        if (equipment[eqval]['size'] == 'large') {
            document.getElementById('shield').disabled = true;
            document.getElementById('shield').value = 0;
            document.getElementById('shield_att').disabled = true;
            document.getElementById('shield_att').value = 0;
        }
        else {
            document.getElementById('shield').disabled = false;
            document.getElementById('shield_att').disabled = false;
        }
    }

    if (id == 'weapon' || id == 'shield') {
        let wepsel = document.getElementById('weapon');
        let shisel = document.getElementById('shield');

        if (wepsel.value != 0) { for (elm of shisel.children) elm.disabled = elm.value == wepsel.value ? true : false; }
        if (shisel.value != 0) { for (elm of wepsel.children[9].children) elm.disabled = elm.value == shisel.value ? true : false; }
    }

    if (id == 'ac1' || id == 'ac2' || id == 'ac3') {
        let ac1sel = document.getElementById('ac1');
        let ac2sel = document.getElementById('ac2');
        let ac3sel = document.getElementById('ac3');

        for (elm of ac1sel.children) { if (elm.value != 0) elm.disabled = (elm.value == ac2sel.value || elm.value == ac3sel.value) ? true : false }
        for (elm of ac2sel.children) { if (elm.value != 0) elm.disabled = (elm.value == ac1sel.value || elm.value == ac3sel.value) ? true : false }
        for (elm of ac3sel.children) { if (elm.value != 0) elm.disabled = (elm.value == ac1sel.value || elm.value == ac2sel.value) ? true : false }

    }

    ChangeParam();
}

function SkillEffect(skillname, level, weapontype, ifshield) {
    let effect = [false];
    switch (skillname) {
        case 'ソードマスタリー':
            if (weapontype == 'sword') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'シールドマスタリー':
            if (weapontype == 'shield' || ifshield == true) { if (level == 1) effect = [true, 'def_re', 1]; else if (level == 2) effect = [true, 'def_re', 2]; else if (level == 3) effect = [true, 'def_re', 3]; }
            break;
        case 'ダガーマスタリー':
            if (weapontype == 'dagger') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'バタフライダンス':
            if (level == 1) effect = [true, 'flee', 1]; else if (level == 2) effect = [true, 'flee', 2]; else if (level == 3) effect = [true, 'flee', 3];
            break;
        case 'ボウマスタリー':
            if (weapontype == 'bow') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'マジックマスタリー':
            if (weapontype == 'rod') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'メイスマスタリー':
            if (weapontype == 'mace') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'マジックヴェール':
            if (level == 1) effect = [true, 'resist', 1]; else if (level == 2) effect = [true, 'resist', 2]; else if (level == 3) effect = [true, 'resist', 3];
            break;
        case 'スピアマスタリー':
            if (weapontype == 'spear') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'アクスマスタリー':
            if (weapontype == 'axe') { if (level == 1) effect = [true, 'hit', 1]; else if (level == 2) effect = [true, 'hit', 2]; else if (level == 3) effect = [true, 'hit', 3]; }
            break;
        case 'タフネス':
            if (level == 1) effect = [true, 'hp', 3]; else if (level == 2) effect = [true, 'hp', 5]; else if (level == 3) effect = [true, 'hp', 7]; else if (level == 4) effect = [true, 'hp', 9];
            break;
    }
    return effect;
}

function Sttnum(num) {
    let ret = 0;
    switch (num) {
        case 0: ret = 'str'; break;
        case 1: ret = 'con'; break;
        case 2: ret = 'dex'; break;
        case 3: ret = 'agi'; break;
        case 4: ret = 'sen'; break;
        case 5: ret = 'int'; break;
    }
    return ret;
}

function InitialSet() {
    let params = new URL(document.location).searchParams;
    if (params != 0) {
        let st = params.get('st').split('_');
        for (let int = 0; int < 6; int++) { document.getElementById(Sttnum(int)).value = st[int]; }

        let cl = params.get('cl');
        document.getElementById('class_select').value = cl;
        ChangeClass(cl);

        let sk = params.get('sk').split('_');
        for (let int = 2; int < 6; int++) { document.getElementById('sk_sel' + int).value = sk[int - 2]; }

        let skl = params.get('skl').split('_');
        for (let int = 0; int < 6; int++) { ChangeSkill(int); document.getElementById('lv_sel' + int).value = skl[int] }

        let wep = params.get('wep').split('_');
        document.getElementById('weapon').value = wep[0];
        ChangeEquipment('weapon');
        document.getElementById('weapon_att').value = wep[1];

        let shi = params.get('shi').split('_');
        document.getElementById('shield').value = shi[0];
        ChangeEquipment('shield');
        document.getElementById('shield_att').value = shi[1];

        let hel = params.get('hel').split('_');
        document.getElementById('helmet').value = hel[0];
        ChangeEquipment('helmet');
        document.getElementById('helmet_att').value = hel[1];


        let arm = params.get('arm').split('_');
        document.getElementById('armor').value = arm[0];
        ChangeEquipment('armor');
        document.getElementById('armor_att').value = arm[1];

        let sho = params.get('sho').split('_');
        document.getElementById('shoes').value = sho[0];
        ChangeEquipment('shoes');
        document.getElementById('shoes_att').value = sho[1];

        let ac1 = params.get('ac1').split('_');
        document.getElementById('ac1').value = ac1[0];
        ChangeEquipment('ac1');
        document.getElementById('ac1_att').value = ac1[1];


        let ac2 = params.get('ac2').split('_');
        document.getElementById('ac2').value = ac2[0];
        ChangeEquipment('ac2');
        document.getElementById('ac2_att').value = ac2[1];

        let ac3 = params.get('ac3').split('_');
        document.getElementById('ac3').value = ac3[0];
        ChangeEquipment('ac3');
        document.getElementById('ac3_att').value = ac3[1];

    }

    ChangeParam();
}

function BuildSave() {
    let st = [
        document.getElementById('str').value,
        document.getElementById('con').value,
        document.getElementById('dex').value,
        document.getElementById('agi').value,
        document.getElementById('sen').value,
        document.getElementById('int').value
    ]
    let cl = document.getElementById('class_select').value;
    let sk = [
        document.getElementById('sk_sel2').value,
        document.getElementById('sk_sel3').value,
        document.getElementById('sk_sel4').value,
        document.getElementById('sk_sel5').value,
    ]
    let skl = [
        document.getElementById('lv_sel0').value,
        document.getElementById('lv_sel1').value,
        document.getElementById('lv_sel2').value,
        document.getElementById('lv_sel3').value,
        document.getElementById('lv_sel4').value,
        document.getElementById('lv_sel5').value,
    ]
    let wep = [document.getElementById('weapon').value, document.getElementById('weapon_att').value];
    let shi = [document.getElementById('shield').value, document.getElementById('shield_att').value];
    let hel = [document.getElementById('helmet').value, document.getElementById('helmet_att').value];
    let arm = [document.getElementById('armor').value, document.getElementById('armor_att').value];
    let sho = [document.getElementById('shoes').value, document.getElementById('shoes_att').value];
    let ac1 = [document.getElementById('ac1').value, document.getElementById('ac1_att').value];
    let ac2 = [document.getElementById('ac2').value, document.getElementById('ac2_att').value];
    let ac3 = [document.getElementById('ac3').value, document.getElementById('ac3_att').value];

    let url = new URL(window.location.href);
    url.searchParams.set('st', st.join('_'));
    url.searchParams.set('cl', cl);
    url.searchParams.set('sk', sk.join('_'));
    url.searchParams.set('skl', skl.join('_'));

    url.searchParams.set('wep', wep.join('_'));
    url.searchParams.set('shi', shi.join('_'));
    url.searchParams.set('hel', hel.join('_'));
    url.searchParams.set('arm', arm.join('_'));
    url.searchParams.set('sho', sho.join('_'));
    url.searchParams.set('ac1', ac1.join('_'));
    url.searchParams.set('ac2', ac2.join('_'));
    url.searchParams.set('ac3', ac3.join('_'));
    location.href = url;
}