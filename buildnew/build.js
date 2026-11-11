let lvsc = 0;
let st = { str: 6, con: 6, dex: 6, agi: 6, sen: 6, int: 6 };
let cl = 0;
let sk = ['0', '0', '0', '0'];
let skl = ['1', '1', '1', '1', '1', '1'];
let eq = { weapon: [0, 0], shield: [0, 0], helmet: [0, 0], armor: [0, 0], shoes: [0, 0], ac1: [0, 0], ac2: [0, 0], ac3: [0, 0] }
let sttemp = null;
let moditemp = { str: -1, con: -1, dex: -1, agi: -1, sen: -1, int: -1 };
let plsttemp = { str: 0, con: 0, dex: 0, agi: 0, sen: 0, int: 0 };
let buffskills = [false, false, false, false, false, false, false, false, false, false, false, false, false];
let bufftype = [-1, 0, -1, -1];//ガッツ、サンアンドムーン、コンセントレイション、メディテーション、
let buffhidden = [true, true, true, true, true, true, true, true, true, true, true, true, true];

const buffskilllist = ['charge', 'rage', 'backstab', 'assult', 'guts', 'fury', 'overload', 'bladework', 'duelist', 'eternity', 'sunmoon', 'conce', 'medi'];
const lvlist = [30, 20, 10, 5];
const lvcp = [300, 220, 140, 100];
const skillset_initial = {
    '0': { name: '-', maxlv: 1 },
    '1': { name: '-', maxlv: 1 },
    'pass': [],
    'act': [],
    'react': []
}
const skillset_Warrior = {
    '0': { name: 'バッシュ', maxlv: 4 },
    '1': { name: 'マイティガード', maxlv: 1 },
    'pass': [{ name: 'ソードマスタリー', maxlv: 3 }, { name: 'シールドマスタリー', maxlv: 3 }, { name: 'レイジ', maxlv: 4 }],
    'act': [{ name: 'スマッシュ', maxlv: 4 }, { name: 'エンゲージ', maxlv: 2 }],
    'react': [{ name: 'カバーリング', maxlv: 2 }, { name: 'アイアンクラッド', maxlv: 4 }, { name: 'ディフレクション', maxlv: 4 }]
}
const skillset_Thief = {
    '0': { name: 'クイックトリック', maxlv: 4 },
    '1': { name: '絶対回避', maxlv: 1 },
    'pass': [{ name: 'ダガーマスタリー', maxlv: 3 }, { name: 'バタフライダンス', maxlv: 3 }, { name: 'トラップマスタリー', maxlv: 1 }],
    'act': [{ name: 'インビジブルアタック', maxlv: 4 }, { name: 'フェイント', maxlv: 3 }, { name: 'ダッシュ', maxlv: 2 }, { name: 'プレパレーション', maxlv: 3 }],
    'react': [{ name: 'バックステップ', maxlv: 4 }]
}
const skillset_Archer = {
    '0': { name: 'ホークアイ', maxlv: 4 },
    '1': { name: 'インタラプト', maxlv: 1 },
    'pass': [{ name: 'ボウマスタリー', maxlv: 3 }],
    'act': [{ name: 'クイックドロウ', maxlv: 4 }, { name: 'スナイピング', maxlv: 4 }, { name: 'アローシャワー', maxlv: 4 }, { name: 'ダブルショット', maxlv: 4 }, { name: 'クイックステップ', maxlv: 2 }, { name: '影纏い', maxlv: 4 }],
    'react': [{ name: 'フェアリーステップ', maxlv: 4 }]
}
const skillset_Mage = {
    '0': { name: 'マジックアロー', maxlv: 4 },
    '1': { name: 'リフレクション', maxlv: 1 },
    'pass': [{ name: 'マジックマスタリー', maxlv: 3 }],
    'act': [{ name: 'ファイアーボール', maxlv: 4 }, { name: 'ウォータースピア', maxlv: 4 }, { name: 'ブリーズ', maxlv: 4 }, { name: 'スペルエンハンス', maxlv: 2 }, { name: 'スリーピング', maxlv: 4 }, { name: 'コンセントレイション', maxlv: 4 }],
    'react': [{ name: 'カウンタースペル', maxlv: 4 }]
}
const skillset_Acolyte = {
    '0': { name: 'ヒール', maxlv: 4 },
    '1': { name: 'リザレクション', maxlv: 1 },
    'pass': [{ name: 'メイスマスタリー', maxlv: 3 }, { name: 'マジックヴェール', maxlv: 3 }],
    'act': [{ name: 'リフレッシュ', maxlv: 4 }, { name: 'ブレッシング', maxlv: 4 }, { name: 'ヘイスト', maxlv: 4 }, { name: 'ホーリーライト', maxlv: 4 }, { name: '骨砕き', maxlv: 4 }],
    'react': [{ name: 'プロテクション', maxlv: 4 }]
}
const skillset_Dancer = {
    '0': { name: 'ユニゾン', maxlv: 1 },
    '1': { name: 'カーテンコール', maxlv: 1 },
    'pass': [],
    'act': [{ name: 'ソードダンス', maxlv: 4 }, { name: 'ワルツ', maxlv: 4 }, { name: 'ポルカ', maxlv: 4 }, { name: 'ジグ', maxlv: 3 }, { name: 'アンコール', maxlv: 3 }, { name: 'チャーム', maxlv: 2 }, { name: 'セイムフット', maxlv: 3 }],
    'react': [{ name: 'フロントステップ', maxlv: 4 }]
}
const skillset_Assassin = {
    '0': { name: 'クローキング', maxlv: 2 },
    '1': { name: 'デッドエンド', maxlv: 1 },
    'pass': [{ name: 'バックスタブ', maxlv: 4 }, { name: 'アサルトスタンス', maxlv: 4 }],
    'act': [{ name: 'インベナム', maxlv: 3 }, { name: 'スローイングナイフ', maxlv: 4 }, { name: 'スニークアタック', maxlv: 3 }, { name: 'シャドームーブ', maxlv: 2 }],
    'react': [{ name: 'ブレイクスルー', maxlv: 4 }, { name: 'アンブッシュ', maxlv: 4 }]
}
const skillset_Knight = {
    '0': { name: 'ガーディアン', maxlv: 3 },
    '1': { name: 'ラストスタンド', maxlv: 1 },
    'pass': [{ name: 'スピアマスタリー', maxlv: 3 }, { name: 'ディボーション', maxlv: 3 }, { name: 'ガッツ', maxlv: 4 }],
    'act': [{ name: 'ピアース', maxlv: 4 }, { name: 'ブランディッシュ', maxlv: 4 }, { name: 'シールドバッシュ', maxlv: 4 }, { name: 'ディフェンスライン', maxlv: 2 }],
    'react': [{ name: 'フルディフェンス', maxlv: 4 }]
}
const skillset_Druid = {
    '0': { name: 'プレイ', maxlv: 2 },
    '1': { name: 'プラーナ', maxlv: 1 },
    'pass': [{ name: 'リコレクト', maxlv: 1 }],
    'act': [{ name: 'リーフエッジ', maxlv: 4 }, { name: 'バインドゾーン', maxlv: 4 }, { name: 'メディテーション', maxlv: 4 }, { name: 'ポーレン', maxlv: 4 }, { name: 'プレフィル', maxlv: 4 }, { name: 'アースシェイク', maxlv: 4 }],
    'react': [{ name: 'ミラージュ', maxlv: 4 }]
}
const skillset_Bard = {
    '0': { name: 'プレリュード', maxlv: 2 },
    '1': { name: 'アリア', maxlv: 1 },
    'pass': [{ name: 'メドレー', maxlv: 4 }],
    'act': [{ name: 'アレンジ', maxlv: 2 }, { name: 'バラード', maxlv: 4 }, { name: 'ノクターン', maxlv: 4 }, { name: 'フォルテシモ', maxlv: 4 }, { name: 'アドリブ', maxlv: 2 }, { name: 'ディスコード', maxlv: 4 }],
    'react': [{ name: 'ハウリング', maxlv: 4 }]
}
const skillset_Berserker = {
    '0': { name: 'オーバーロード', maxlv: 2 },
    '1': { name: 'ソウルバスター', maxlv: 1 },
    'pass': [{ name: 'アクスマスタリー', maxlv: 3 }, { name: 'タフネス', maxlv: 4 }, { name: 'インデュア', maxlv: 4 }, { name: 'フューリー', maxlv: 4 }],
    'act': [{ name: 'ウォークライ', maxlv: 2 }, { name: 'デスパレート', maxlv: 4 }, { name: 'トマホーク', maxlv: 4 }, { name: 'プロヴォーク', maxlv: 4 }],
    'react': []
}
const skillset_Warlock = {
    '0': { name: 'ネクロポーテンス', maxlv: 4 },
    '1': { name: 'ドゥーム', maxlv: 1 },
    'pass': [{ name: 'デストルドー', maxlv: 1 }],
    'act': [{ name: 'シャドウボール', maxlv: 4 }, { name: 'ブラックホール', maxlv: 4 }, { name: 'カース', maxlv: 4 }, { name: 'ドレインライフ', maxlv: 4 }, { name: 'テラー', maxlv: 4 }, { name: 'マインドブラスト', maxlv: 4 }],
    'react': [{ name: 'ソウルシフト', maxlv: 4 }]
}
const skillset_Clown = {
    '0': { name: 'イリュージョン', maxlv: 2 },
    '1': { name: 'ショータイム', maxlv: 1 },
    'pass': [{ name: 'ドラマティカ', maxlv: 3 }],
    'act': [{ name: 'スワップ', maxlv: 2 }, { name: 'ディスアピア', maxlv: 2 }, { name: 'ジャグリング', maxlv: 4 }, { name: 'アピール', maxlv: 3 }, { name: 'ミミック', maxlv: 1 }, { name: 'ジョーク', maxlv: 2 }],
    'react': [{ name: 'スケープゴート', maxlv: 2 }]
}
const skillset_Sage = {
    '0': { name: 'バリア', maxlv: 4 },
    '1': { name: 'デファイアンス', maxlv: 1 },
    'pass': [{ name: 'カーム', maxlv: 4 }, { name: 'セカンドキャスト', maxlv: 2 }],
    'act': [{ name: 'ファーストエイド', maxlv: 4 }, { name: 'ショック', maxlv: 4 }, { name: 'レスキュー', maxlv: 2 }, { name: 'エンサイクロペディア', maxlv: 2 }],
    'react': [{ name: 'ディナイ', maxlv: 2 }, { name: 'インスパイア', maxlv: 4 }]
}
const skillset_Fencer = {
    '0': { name: 'ファント', maxlv: 4 },
    '1': { name: 'フラッシュリープ', maxlv: 1 },
    'pass': [{ name: 'ブレードワーク', maxlv: 3 }, { name: 'デュエリスト', maxlv: 4 }, { name: 'オブリージュ', maxlv: 3 }, { name: 'ペネトレイト', maxlv: 3 }],
    'act': [{ name: 'パリィ', maxlv: 2 }, { name: 'チャレンジ', maxlv: 2 }],
    'react': [{ name: 'リポスト', maxlv: 4 }, { name: 'スイッチ', maxlv: 2 }]
}
const skillset_Astrologer = {
    '0': { name: 'アルカナドロー', maxlv: 1 },
    '1': { name: 'オラクル', maxlv: 1 },
    'pass': [{ name: 'エタニティ', maxlv: 4 }, { name: 'サンアンドムーン', maxlv: 4 }],
    'act': [{ name: 'スターゲイザー', maxlv: 2 }, { name: 'シューティングスター', maxlv: 4 }, { name: 'エクリプス', maxlv: 2 }, { name: 'リパルション', maxlv: 2 }, { name: 'ワイルドカード', maxlv: 2 }],
    'react': [{ name: 'フェイト', maxlv: 4 }]
}
const eqlist = [
    { name: "なし", type: 'other', size: 'none', effect: [], 'att': [false, false, false, false, false, false], addeffect: {} },
    { name: 'ロングソード', type: 'sword', size: 'medium', effect: ['atk_d,+1', 'atk,+1'], att: [true, true, false, true, true, false], addeffect: { 1: ["atk,+1"], 2: ["atk,-1"] } },
    { name: 'ショートソード', type: 'sword', size: 'medium', effect: ['atk,+3', 'flee,+1'], att: [false, true, false, false, true, false], addeffect: { 1: ["atk,+1"], 2: ["atk,-1"] } },
    { name: 'ファルシオン', type: 'sword', size: 'medium', effect: ['atk_d,+1', 'hit,+1'], att: [false, true, true, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'レイピア', type: 'sword', size: 'medium', effect: ['atk_d,+1'], att: [false, true, false, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'ブロードソード', type: 'sword', size: 'medium', effect: ['atk_d,+1', 'def,+1'], att: [false, true, true, true, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'クレイモア', type: 'sword', size: 'large', effect: ['atk_d,+2'], att: [true, true, true, false, true, false], addeffect: { 1: ["atk,+2"], 2: ["atk,-2"] } },
    { name: 'ツヴァイハンダー', type: 'sword', size: 'large', effect: ['atk_d,+2', 'hit,-1,def,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ダガー', type: 'dagger', size: 'small', effect: ['atk_d,+1'], att: [true, true, true, false, true, true], addeffect: { 1: ["atk,+1"], 2: ["atk,-1"] } },
    { name: 'マインゴーシュ', type: 'dagger', size: 'small', effect: ['atk_d,+1', 'flee,+1'], att: [false, true, false, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'スティレット', type: 'dagger', size: 'small', effect: ['atk_d,+1'], att: [false, true, false, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'ククリ', type: 'dagger', size: 'small', effect: ['atk_d,+1', 'hit,+1'], att: [false, true, true, false, true, true], addeffect: { 2: ["atk,-1"] } },
    { name: 'ショートボウ', type: 'bow', size: 'large', effect: ['atk_d,+1'], att: [true, true, false, true, true, false], addeffect: { 1: ["atk,+1"], 2: ["atk,-1"] } },
    { name: 'ロングボウ', type: 'bow', size: 'large', effect: ['atk_d,+1'], att: [false, true, false, true, false, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'クロスボウ', type: 'bow', size: 'large', effect: ['atk_d,+1', 'hit,+1'], att: [false, true, false, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'アーバレスト', type: 'bow', size: 'large', effect: ['atk_d,+1', 'atk,+1', 'hit,-1'], att: [false, true, false, true, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'コンポジットボウ', type: 'bow', size: 'large', effect: [], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ロッド', type: 'rod', size: 'large', effect: ['matk_d,+1', 'matk,+1'], att: [true, true, false, true, false, false], addeffect: { 1: ["matk,+1"], 2: ["matk,-1"] } },
    { name: 'スタッフ', type: 'rod', size: 'large', effect: ['matk_d,+1', 'hit,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ワンド', type: 'rod', size: 'medium', effect: ['matk_d,+1', 'matk,-1', 'mdef,+1'], att: [false, false, false, true, false, false], addeffect: {} },
    { name: 'メイス', type: 'mace', size: 'medium', effect: ['atk_d,+1', 'resist,+1'], att: [true, false, false, true, false, false], addeffect: { 1: ["atk,+1"] } },
    { name: 'フレイル', type: 'mace', size: 'medium', effect: ['atk_d,+1', 'hit,+1'], att: [false, true, false, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'ウォーハンマー', type: 'mace', size: 'large', effect: ['atk_d,+2'], att: [false, true, true, false, true, false], addeffect: { 2: ["atk,-1"] } },
    { name: 'スピア', type: 'spear', size: 'medium', effect: ['atk_d,+1', 'atk,+1'], att: [true, false, false, false, false, false], addeffect: { 1: ["atk,+1"] } },
    { name: 'ショートスピア', type: 'spear', size: 'medium', effect: ['atk_d,+1', 'flee,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ハルバード', type: 'spear', size: 'medium', effect: ['atk_d,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'パイク', type: 'spear', size: 'medium', effect: ['atk_d,+1', 'hit,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ランス', type: 'spear', size: 'large', effect: ['atk_d,+2'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ハンドアクス', type: 'axe', size: 'medium', effect: ['atk_d,+1', 'hit,+1'], att: [true, false, false, false, false, false], addeffect: { 1: ["atk,+1"] } },
    { name: 'ブロードアクス', type: 'axe', size: 'medium', effect: ['atk_d,+1', 'def,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ブローヴァ', type: 'axe', size: 'medium', effect: ['atk_d,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'フランキスカ', type: 'axe', size: 'medium', effect: ['atk_d,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'バトルアクス', type: 'axe', size: 'large', effect: ['atk_d,+2'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'リュート', type: 'other', size: 'large', effect: ['dex,+3', 'hit,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'タンバリン', type: 'other', size: 'large', effect: ['dex,+3', 'flee,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'フィドル', type: 'other', size: 'large', effect: ['dex,+3', 'resist,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ハープ', type: 'other', size: 'large', effect: ['dex,+3', 'sp,+3'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'バックラー', type: 'shield', size: 'medium', effect: ['flee,+1', 'def_re,+2'], att: [true, true, true, false, false, true], addeffect: { 1: ["def_re,+1"], 2: ["def_re,-1"] } },
    { name: 'カイトシールド', type: 'shield', size: 'medium', effect: ['def,+1', 'def_re,+1'], att: [true, true, true, false, true, false], addeffect: { 1: ["def_re,+1"], 2: ["def_re,-1"] } },
    { name: 'ラウンドシールド', type: 'shield', size: 'medium', effect: ['def_re,+4'], att: [true, true, true, false, true, true], addeffect: { 1: ["def_re,+1"], 2: ["def_re,-1"] } },
    { name: 'ルーンシールド', type: 'shield', size: 'medium', effect: ['resist,+1', 'def_re,+2'], att: [true, false, false, false, false, false], addeffect: { 1: ["def_re,+1"] } },
    { name: 'ドミノ', type: 'helmet', size: 'medium', effect: ['flee,+1', 'resist,+1'], att: [true, true, false, false, false, false], addeffect: { 1: ["resist,+1"], 2: ["resist,-1"] } },
    { name: 'ハット', type: 'helmet', size: 'medium', effect: ['hit,+1', 'resist,+1'], att: [true, false, false, true, true, true], addeffect: { 1: ["resist,+1"] } },
    { name: 'ビレッタ', type: 'helmet', size: 'medium', effect: ['mdef,+1', 'resist,+1'], att: [true, false, false, false, false, true], addeffect: { 1: ["resist,+1"] } },
    { name: 'ヘルム', type: 'helmet', size: 'medium', effect: ['def,+1', 'resist,+1'], att: [true, true, true, false, true, false], addeffect: { 1: ["resist,+1"], 2: ["resist,-1"] } },
    { name: 'メイジハット', type: 'helmet', size: 'medium', effect: ['matk,+1', 'resist,+1'], att: [true, false, false, false, false, true], addeffect: { 1: ["resist,+1"] } },
    { name: 'サークレット', type: 'helmet', size: 'medium', effect: ['def,+1', 'mdef,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'ねじり鉢巻き', type: 'helmet', size: 'small', effect: ['atk,+2', 'resist,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: '疾風のバンダナ', type: 'helmet', size: 'small', effect: ['flee,+2', 'resist,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: '鷹羽のフード', type: 'helmet', size: 'small', effect: ['hit,+2', 'resist,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: '司祭帽', type: 'helmet', size: 'small', effect: ['resist,+3'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: '学者の帽子', type: 'helmet', size: 'small', effect: ['sp,+5', 'resist,+1'], att: [false, false, false, false, false, false], addeffect: {} },
    { name: 'クロースアーマー', type: 'armor', size: 'large', effect: ['hp,+4', 'def,+1', 'mdef,+1'], att: [true, true, true, true, false, false], addeffect: { 1: ["hp,+2"], 2: ["hp,-2"] } },
    { name: 'プレートメイル', type: 'armor', size: 'large', effect: ['hp,+5', 'def,+2'], att: [true, true, true, false, true, false], addeffect: { 1: ["hp,+2"], 2: ["hp,-2"] } },
    { name: 'ローブ', type: 'armor', size: 'large', effect: ['hp,+2', 'sp,+2', 'mdef,+2'], att: [true, true, true, true, false, true], addeffect: { 1: ["hp,+1", "sp,+1"], 2: ["hp,-1", "sp,+1"] } },
    { name: 'チェインメイル', type: 'armor', size: 'large', effect: ['hp,+5', 'def,+1'], att: [false, true, true, false, false, false], addeffect: { 2: ["hp,-2"] } },
    { name: 'レザーアーマー', type: 'armor', size: 'large', effect: ['hp,+5', 'def,+1'], att: [false, false, false, false, true, false], addeffect: {} },
    { name: 'スケイルアーマー', type: 'armor', size: 'large', effect: ['hp,+5', 'def,+1'], att: [false, true, true, true, false, false], addeffect: { 2: ["hp,-2"] } },
    { name: 'サンダル', type: 'shoes', size: 'medium', effect: ['mdef,+1', 'flee,+1'], att: [true, true, true, false, true, true], addeffect: { 1: ["flee,+1"], 2: ["flee,-1"] } },
    { name: 'シューズ', type: 'shoes', size: 'medium', effect: ['flee,+2'], att: [true, true, false, false, false, true], addeffect: { 1: ["flee,+1"], 2: ["flee,-1"] } },
    { name: 'ブーツ', type: 'shoes', size: 'medium', effect: ['def,+1', 'flee,+1'], att: [true, false, false, true, true, false], addeffect: { 1: ["flee,+1"] } },
    { name: 'バングル', type: 'accessory', size: 'small', effect: ['str,+2', 'int,-1'], att: [true, true, false, true, false, false, true, true, true], addeffect: { 1: ["str,+1"], 2: ["str,-1"], 7: ["str,-1", "hp,+3"], 8: ["str,-1", "atk,+1", "matk,+1"], 9: ["str,-1"] } },
    { name: 'ベルト', type: 'accessory', size: 'small', effect: ['con,+2', 'sen,-1'], att: [true, false, true, false, false, false, true, true, true], addeffect: { 1: ["con,+1"], 7: ["con,-1", "hp,+3"], 8: ["con,-1", "atk,+1", "matk,+1"], 9: ["con,-1"] } },
    { name: 'リング', type: 'accessory', size: 'small', effect: ['dex,+2', 'agi,-1'], att: [true, true, true, true, false, true, true, true, true], addeffect: { 1: ["dex,+1"], 2: ["dex,-1"], 7: ["dex,-1", "hp,+3"], 8: ["dex,-1", "atk,+1", "matk,+1"], 9: ["dex,-1"] } },
    { name: 'ブローチ', type: 'accessory', size: 'small', effect: ['agi,+2', 'dex,-1'], att: [true, true, false, false, false, false, true, true, true], addeffect: { 1: ["agi,+1"], 2: ["agi,-1"], 7: ["agi,-1", "hp,+3"], 8: ["agi,-1", "atk,+1", "matk,+1"], 9: ["agi,-1"] } },
    { name: 'ペンダント', type: 'accessory', size: 'small', effect: ['sen,+2', 'con,-1'], att: [true, true, false, false, false, true, true, true, true], addeffect: { 1: ["sen,+1"], 2: ["sen,-1"], 7: ["sen,-1", "hp,+3"], 8: ["sen,-1", "atk,+1", "matk,+1"], 9: ["sen,-1"] } },
    { name: 'イヤリング', type: 'accessory', size: 'small', effect: ['int,+2', 'str,-1'], att: [true, true, false, false, false, false, true, true, true], addeffect: { 1: ["int,+1"], 2: ["int,-1"], 7: ["int,-1", "hp,+3"], 8: ["int,-1", "atk,+1", "matk,+1"], 9: ["int,-1"] } },
    { name: '牙のお守り', type: 'accessory', size: 'small', effect: ['atk,+1', 'def,-1'], att: [false, false, false, false, false, false, false, false, false], addeffect: {} },
    { name: '甲羅のお守り', type: 'accessory', size: 'small', effect: ['def,+1', 'atk,-1'], att: [false, false, false, false, false, false, false, false, false], addeffect: {} },
    { name: '角のお守り', type: 'accessory', size: 'small', effect: ['matk,+1', 'mdef,-1'], att: [false, false, false, false, false, false, false, false, false], addeffect: {} },
    { name: '爪のお守り', type: 'accessory', size: 'small', effect: ['hit,+1', 'flee,-1'], att: [false, false, false, false, false, false, false, false, false], addeffect: {} },
    { name: '翼のお守り', type: 'accessory', size: 'small', effect: ['flee,+1', 'hit,-1'], att: [false, false, false, false, false, false, false, false, false], addeffect: {} },
    { name: '鱗のお守り', type: 'accessory', size: 'small', effect: ['resist,+1', 'hit,-1'], att: [false, false, false, false, false, false, false, false, false], addeffect: {} }
]
function skillsetcall(id) {
    switch (id) {
        case '0':
            return skillset_initial;
            break;
        case '1':
            return skillset_Warrior;
            break;
        case '2':
            return skillset_Thief;
            break;
        case '3':
            return skillset_Archer;
            break;
        case '4':
            return skillset_Mage;
            break;
        case '5':
            return skillset_Acolyte;
            break;
        case '6':
            return skillset_Dancer;
            break;
        case '7':
            return skillset_Assassin;
            break;
        case '8':
            return skillset_Knight;
            break;
        case '9':
            return skillset_Druid;
            break;
        case '10':
            return skillset_Bard;
            break;
        case '11':
            return skillset_Berserker;
            break;
        case '12':
            return skillset_Warlock;
            break;
        case '13':
            return skillset_Clown;
            break;
        case '14':
            return skillset_Sage;
            break;
        case '15':
            return skillset_Fencer;
            break;
        case '16':
            return skillset_Astrologer;
            break;
    }
}
function skilltypecall(a, value) {
    let type = 0;
    if (a['pass'].length <= value) {
        value -= a['pass'].length;
        type++;
    }
    if (a['act'].length <= value) {
        value -= a['act'].length;
        type++;
    }
    return [type, value];
}

function ChangeSync(value) {
    lvsc = value;
    StatusCalc();
}
function ChangeStatus(id, value) {
    st[id] = Number.parseInt(value);
    if (st[id] < 6) st[id] = 6;
    document.getElementById(id).value = st[id];

    StatusCalc();
}

function ChangeStatusButton(id) {
    let a = id.split("_");
    st[a[0]] += Number.parseInt(a[1]);
    if (st[a[0]] < 6) st[a[0]] = 6;
    document.getElementById(a[0]).value = st[a[0]]

    StatusCalc();
}

function ChangeClass(value) {
    cl = value;
    let a = skillsetcall(value);
    const b = { 0: ['pass', 'パッシヴスキル'], 1: ['act', 'アクションスキル'], 2: ['react', 'リアクションスキル'] }
    document.getElementById('sk_sel0').innerText = a['0']['name'];
    document.getElementById('sk_sel1').innerText = a['1']['name'];

    let sk_opts = ['<option value="0">-</option>'];
    let sk_optcount = 1;
    for (let x = 0; x < 3; x++) {
        if (a[b[x][0]].length != 0) {
            sk_opts.push(`<optgroup label="${b[x][1]}">`);
            a[b[x][0]].forEach(element => {
                sk_opts.push(`<option value=${sk_optcount}>${element.name}</option>`);
                sk_optcount++;
            });
            sk_opts.push(`</optgroup>`);
        }
    }
    for (x of document.getElementsByClassName('skill_select')) { x.innerHTML = sk_opts.join(''); }
    for (let x = 0; x < 6; x++) { ChangeSkill(x, 0); }
}

function ChangeSkill(slot, value) {
    let lv_opts = [`<option value = "1">Level 1</option>`];
    const a = skillsetcall(cl);
    if (slot >= 2) {
        sk[slot - 2] = value;
        if (value != 0) {
            const b = { 0: 'pass', 1: 'act', 2: 'react' }
            let ret = skilltypecall(a, value - 1);
            for (let x = 1; x < a[b[ret[0]]][ret[1]].maxlv; x++) {
                lv_opts.push(`<option value="${x + 1}">Level ${x + 1}</option>`);
            }
        }
    }
    else {
        for (let x = 1; x < a[slot].maxlv; x++) {
            lv_opts.push(`<option value="${x + 1}">Level ${x + 1}</option>`);
        }
    }
    skl[slot] = 1;
    document.getElementById(`lv_sel${slot}`).innerHTML = lv_opts.join('');
    console.log(skl);

    BuffSkillHidden();
    StatusCalc();
}

function ChangeSkillLv(slot, value) {
    skl[slot] = value;
    BuffSkillHidden();
    StatusCalc();
}

function ChangeEquipment(id, value) {
    eq[id][0] = value;
    eq[id][1] = 0;
    document.getElementById(id + '_att').value = 0;

    opts = document.getElementById(id + '_att').children;
    for (let c = 1; c < opts.length; c++) {
        opts[c].disabled = !eqlist[value].att[c - 1];
    }

    if (id == 'weapon') {
        if (eqlist[value].size == 'large') {
            document.getElementById('shield').disabled = true;
            document.getElementById('shield').value = 0;
            document.getElementById('shield_att').disabled = true;
            document.getElementById('shield_att').value = 0;
            eq.shield[0] = 0;
            eq.shield[1] = 0;
        }
        else {
            document.getElementById('shield').disabled = false;
            document.getElementById('shield_att').disabled = false;
        }
    }

    if (id == 'weapon' || id == 'shield') {
        let wepsel = document.getElementById('weapon');
        let shisel = document.getElementById('shield');

        { for (element of shisel.children) if (element.value != 0) element.disabled = element.value == wepsel.value }
        { for (element of wepsel.children) if (element.value != 0) element.disabled = element.value == shisel.value }
    }

    if (id == 'ac1' || id == 'ac2' || id == 'ac3') {
        let ac1sel = document.getElementById('ac1');
        let ac2sel = document.getElementById('ac2');
        let ac3sel = document.getElementById('ac3');

        for (element of ac1sel.children) { if (element.value != 0) element.disabled = (element.value == ac2sel.value || element.value == ac3sel.value) ? true : false }
        for (element of ac2sel.children) { if (element.value != 0) element.disabled = (element.value == ac1sel.value || element.value == ac3sel.value) ? true : false }
        for (element of ac3sel.children) { if (element.value != 0) element.disabled = (element.value == ac1sel.value || element.value == ac2sel.value) ? true : false }
    }

    BuffSkillHidden();
    StatusCalc();
}

function ChangeAttribute(id, value) {
    eq[id.split('_')[0]][1] = value;
    BuffSkillHidden();
    StatusCalc();
}

function BuffSkillHidden() {
    let checklist = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    let checklevel = [0, 0, 0];

    //チャージ
    {
        let a = 0;
        a += eq.weapon[1] == 3 ? 2 : 0;
        a += eq.shield[1] == 3 ? 1 : 0;
        a += eq.helmet[1] == 3 ? 1 : 0;
        a += eq.armor[1] == 3 ? 1 : 0;
        a += eq.helmet[1] == 3 ? 1 : 0;
        a += eq.ac1[1] == 3 ? 1 : 0;
        a += eq.ac2[1] == 3 ? 1 : 0;
        a += eq.ac3[1] == 3 ? 1 : 0;

        checklist[0] = a >= 3;
    }
    //オーバーロード
    checklist[6] = cl == 11;

    //その他のスキル
    for (let x = 0; x < 4; x++) {
        if (cl == 1 && sk[x] == 3) { checklist[1] = true; checklevel[0] = skl[x + 2] }
        if (cl == 7 && sk[x] == 1) checklist[2] = true;
        if (cl == 7 && sk[x] == 2) checklist[3] = true;
        if (cl == 8 && sk[x] == 3) checklist[4] = true;
        if (cl == 11 && sk[x] == 4) checklist[5] = true;
        if (cl == 15 && sk[x] == 1 && (eqlist[eq.weapon[0]].size == 'medium' || eq.shield[0] != 0)) checklist[7] = true;
        if (cl == 15 && sk[x] == 2) checklist[8] = true;
        if (cl == 16 && sk[x] == 1) checklist[9] = true;
        if (cl == 16 && sk[x] == 2) checklist[10] = true;
        if (cl == 4 && sk[x] == 7) { checklist[11] = true; checklevel[1] = skl[x + 2] }
        if (cl == 9 && sk[x] == 4) { checklist[12] = true; checklevel[2] = skl[x + 2] }
    }

    for (let x = 0; x < 13; x++) {
        switch (x) {
            case 1:
                if (checklist[1] && buffhidden[1]) {
                    document.getElementById(`buff_rage`).hidden = false;
                    buffhidden[1] = false;
                }
                else if (!checklist[1] && !buffhidden[1]) {
                    document.getElementById(`buff_rage`).hidden = true;
                    document.getElementById(`buff_rage_check`).checked = false;
                    document.getElementById(`buff_rage_growth`).hidden = true;
                    buffhidden[1] = true;
                    buffskills[1] = false;
                    bufftype[0] = -1;
                }
                if (bufftype[0] == -1 && checklevel[0] == 4) {
                    document.getElementById(`buff_rage_growth`).hidden = false;
                    document.getElementById(`buff_rage_growth`).value = 0;
                    bufftype[0] = 0;
                }
                else if (bufftype[0] != -1 && checklevel[0] != 4) {
                    document.getElementById(`buff_rage_growth`).hidden = true;
                    bufftype[0] = -1;
                }
                break;
            case 11:
                if (checklist[11] && buffhidden[11]) {
                    document.getElementById(`buff_conce`).hidden = false;
                    buffhidden[11] = false;
                }
                else if (!checklist[11] && !buffhidden[11]) {
                    document.getElementById(`buff_conce`).hidden = true;
                    document.getElementById(`buff_conce_check`).checked = false;
                    document.getElementById(`buff_conce_growth`).hidden = true;
                    buffhidden[11] = true;
                    buffskills[11] = false;
                    bufftype[2] = -1;
                }
                if (bufftype[2] == -1 && checklevel[1] == 4) {
                    document.getElementById(`buff_conce_growth`).hidden = false;
                    document.getElementById(`buff_conce_growth`).value = 0;
                    bufftype[2] = 0;
                }
                else if (bufftype[2] != -1 && checklevel[1] != 4) {
                    document.getElementById(`buff_conce_growth`).hidden = true;
                    bufftype[2] = -1;
                }
                break;
            case 12:
                if (checklist[12] && buffhidden[12]) {
                    document.getElementById(`buff_medi`).hidden = false;
                    buffhidden[12] = false;
                }
                else if (!checklist[12] && !buffhidden[12]) {
                    document.getElementById(`buff_medi`).hidden = true;
                    document.getElementById(`buff_medi_check`).checked = false;
                    document.getElementById(`buff_medi_growth`).hidden = true;
                    buffhidden[12] = true;
                    buffskills[12] = false;
                    bufftype[3] = -1;
                }
                if (bufftype[3] == -1 && checklevel[2] == 4) {
                    document.getElementById(`buff_medi_growth`).hidden = false;
                    document.getElementById(`buff_medi_growth`).value = 0;
                    bufftype[3] = 0;
                }
                else if (bufftype[3] != -1 && checklevel[2] != 4) {
                    document.getElementById(`buff_medi_growth`).hidden = true;
                    bufftype[3] = -1;
                }
                break;
            default:
                if (checklist[x] && buffhidden[x]) {
                    document.getElementById(`buff_${buffskilllist[x]}`).hidden = false;
                    buffhidden[x] = false;
                }
                else if (!checklist[x] && !buffhidden[x]) {
                    document.getElementById(`buff_${buffskilllist[x]}`).hidden = true;
                    document.getElementById(`buff_${buffskilllist[x]}_check`).checked = false;
                    buffhidden[x] = true;
                    buffskills[x] = false;
                }
                break;
        }
    }
}

function BuffSkillCheck(num, check) {
    buffskills[num] = check;
    StatusCalc();
}

function BuffTypeChange(num, value) {
    bufftype[num] = value;
    StatusCalc();
}

function StatusCalc() {
    let result = { HP: 0, SP: 0, ATK: 0, ATKd: 1, DEF: 0, DEFre: 0, MATK: 0, MATKd: 0, MDEF: 0, MDEFre: 0, HIT: 0, HITd: 0, FLEE: 0, FLEEd: 0, RESIST: 0, RESISTd: 0, strmodi: 0, conmodi: 0, dexmodi: 0, agimodi: 0, senmodi: 0, intmodi: 0 }
    let effects = { hp: 0, sp: 0, atk: 0, atk_d: 0, def: 0, def_re: 0, matk: 0, matk_d: 0, mdef: 0, hit: 0, hit_d: 0, flee: 0, flee_d: 0, resist: 0, resist_d: 0, str: 0, con: 0, dex: 0, agi: 0, sen: 0, int: 0 };
    let effectlist = [];

    Object.entries(eq).forEach(([key, value]) => {
        for (a of eqlist[value[0]].effect) {
            effectlist.push(a);
        }
        if (eqlist[value[0]].addeffect[value[1]] != undefined) {
            for (a of eqlist[value[0]].addeffect[value[1]]) {
                if (value[1] != 8 || (!buffskills[1] && !buffskills[4] && !buffskills[6])) {
                    effectlist.push(a);
                }
            }
        }
    });

    for (let x = 0; x < 4; x++) {
        switch (true) {
            case cl == 1 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'sword':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 1 && sk[x] == 2 && (eqlist[eq.weapon[0]].type == 'shield' || eq.shield[0] != 0):
                if (skl[x + 2] == 1) { effectlist.push('def_re,+1') } else if (skl[x + 2] == 2) { effectlist.push('def_re,+2') } else { effectlist.push('def_re,+3') }
                break;
            case cl == 2 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'dagger':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 2 && sk[x] == 2:
                if (skl[x + 2] == 1) { effectlist.push('flee,+1') } else if (skl[x + 2] == 2) { effectlist.push('flee,+2') } else { effectlist.push('flee,+3') }
                break;
            case cl == 3 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'bow':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 3 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'rod':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 4 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'mace':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 4 && sk[x] == 2:
                if (skl[x + 2] == 1) { effectlist.push('resist,+1') } else if (skl[x + 2] == 2) { effectlist.push('resist,+2') } else { effectlist.push('resist,+3') }
                break;
            case cl == 8 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'spear':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 11 && sk[x] == 1 && eqlist[eq.weapon[0]].type == 'axe':
                if (skl[x + 2] == 1) { effectlist.push('hit,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2') } else { effectlist.push('hit,+3') }
                break;
            case cl == 11 && sk[x] == 2:
                if (skl[x + 2] == 1) { effectlist.push('hp,+3') } else if (skl[x + 2] == 2) { effectlist.push('hp,+5') } else if (skl[x + 2] == 3) { effectlist.push('hp,+7') } else { effectlist.push('hp,+9') }
                break;
            case buffskills[1] && cl == 1 && sk[x] == 3:
                if (skl[x + 2] == 1) { effectlist.push('atk_d,+1') } else if (skl[x + 2] == 2) { effectlist.push('atk_d,+1', 'atk,+1') } else if (skl[x + 2] == 3) { effectlist.push('atk_d,+1', 'atk,+2') } else { if (bufftype[0] == 0) { effectlist.push('atk_d,+1', 'atk,+3') } else { effectlist.push('atk_d,+2') } }
                break;
            case buffskills[2] && cl == 7 && sk[x] == 1:
                if (skl[x + 2] == 1) { effectlist.push('atk_d,+1') } else if (skl[x + 2] == 2) { effectlist.push('atk_d,+1', 'atk,+1') } else if (skl[x + 2] == 3) { effectlist.push('atk_d,+1', 'atk,+2') } else { effectlist.push('atk_d,+1', 'atk,+3') }
                break;
            case buffskills[3] && cl == 7 && sk[x] == 2:
                if (skl[x + 2] == 1) { effectlist.push('atk,+1') } else if (skl[x + 2] == 2) { effectlist.push('atk,+2') } else if (skl[x + 2] == 3) { effectlist.push('atk,+3') } else { effectlist.push('atk,+4') }
                break;
            case buffskills[4] && cl == 8 && sk[x] == 3:
                if (skl[x + 2] == 1) { effectlist.push('def,+1') } else if (skl[x + 2] == 2) { effectlist.push('def,+2') } else if (skl[x + 2] == 3) { effectlist.push('def,+3') } else { effectlist.push('def,+4') }
                break;
            case buffskills[5] && cl == 11 && sk[x] == 4:
                if (skl[x + 2] == 1) { effectlist.push('atk,+3') } else if (skl[x + 2] == 2) { effectlist.push('atk,+4') } else if (skl[x + 2] == 3) { effectlist.push('atk,+5') } else { effectlist.push('atk,+6') }
                break;
            case buffskills[7] && cl == 15 && sk[x] == 1:
                if (skl[x + 2] == 1) { effectlist.push('hit,+1', 'flee,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit,+2', 'flee,+2') } else { effectlist.push('hit,+3', 'flee,+3') }
                break;
            case buffskills[8] && cl == 15 && sk[x] == 2:
                if (skl[x + 2] == 1) { effectlist.push('atk,+1') } else if (skl[x + 2] == 2) { effectlist.push('atk,+2') } else if (skl[x + 2] == 3) { effectlist.push('atk,+3') } else { effectlist.push('atk,+4') }
                break;
            case buffskills[9] && cl == 16 && sk[x] == 1:
                if (skl[x + 2] == 1) { effectlist.push('atk,+2', 'matk,+2') } else if (skl[x + 2] == 2) { effectlist.push('atk,+3', 'matk,+3') } else if (skl[x + 2] == 3) { effectlist.push('atk,+4', 'matk,+4') } else { effectlist.push('atk,+5', 'matk,+5') }
                break;
            case buffskills[10] && cl == 16 && sk[x] == 2:
                if (skl[x + 2] == 1) { effectlist.push(bufftype[1] == 0 ? 'hit,+1' : 'flee,+1') } else if (skl[x + 2] == 2) { effectlist.push(bufftype[1] == 0 ? 'hit,+2' : 'flee,+2') } else if (skl[x + 2] == 3) { effectlist.push(bufftype[1] == 0 ? 'hit,+3' : 'flee,+3') } else { effectlist.push(bufftype[1] == 0 ? 'hit,+4' : 'flee,+4') }
                break;
            case buffskills[11] && cl == 4 && sk[x] == 7: ;
                if (skl[x + 2] == 1) { effectlist.push('hit_d,+1', 'flee_d,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit_d,+1', 'flee_d,+1', 'hit,+1', 'flee,+1') } else if (skl[x + 2] == 3) { effectlist.push('hit_d,+1', 'flee_d,+1', 'hit,+2', 'flee,+2') } else { if (bufftype[2] == 0) { effectlist.push('hit_d,+1', 'flee_d,+1', 'hit,+2', 'flee,+2') } else if (bufftype[2] == 1) { effectlist.push('hit_d,+1', 'flee_d,+1', 'hit,+3', 'flee,+3') } else { effectlist.push('hit_d,+2', 'flee_d,+2') } }
                break;
            case buffskills[12] && cl == 9 && sk[x] == 4:
                if (skl[x + 2] == 1) { effectlist.push('hit_d,+1', 'resist_d,+1') } else if (skl[x + 2] == 2) { effectlist.push('hit_d,+1', 'resist_d,+1', 'hit,+1', 'resist,+1') } else if (skl[x + 2] == 3) { effectlist.push('hit_d,+1', 'resist_d,+1', 'hit,+2', 'resist,+2') } else { if (bufftype[3] == 0) { effectlist.push('hit_d,+1', 'resist_d,+1', 'hit,+2', 'resist,+2') } else if (bufftype[3] == 1) { effectlist.push('hit_d,+1', 'resist_d,+1', 'hit,+3', 'resist,+3') } else { effectlist.push('hit_d,+2', 'resist_d,+2') } }
                break;
        }
    }

    for (a of effectlist) {
        b = a.split(',');
        effects[b[0]] += Number.parseInt(b[1]);
    }

    if (buffskills[0]) effects.atk_d += 2;

    const modi = {
        str: Math.trunc((st.str + effects.str - 10) / 4),
        con: Math.trunc((st.con + effects.con - 10) / 4),
        dex: Math.trunc((st.dex + effects.dex - 10) / 4),
        agi: Math.trunc((st.agi + effects.agi - 10) / 4),
        sen: Math.trunc((st.sen + effects.sen - 10) / 4),
        int: Math.trunc((st.int + effects.int - 10) / 4)
    }

    result.HP = Math.trunc(((31 + st.str + st.con * 2) / 4) + ((lvlist[lvsc] + 2) / 3) + effects.hp);
    result.SP = Math.trunc(((31 + st.int + st.sen * 2) / 4) + ((lvlist[lvsc] + 2) / 3) + effects.sp);
    switch (eqlist[eq.weapon[0]].type) {
        case 'dagger':
            result.ATK += Math.trunc(modi.str * 1.5 + modi.dex * 0.5) + effects.atk;
            result.MATK += modi.int + effects.matk;
            break;
        case 'axe':
            result.ATK += Math.trunc(modi.str * 1.5 + modi.con * 0.5) + effects.atk;
            result.MATK += modi.int + effects.matk;
            break;
        case 'bow':
            result.ATK += modi.dex + effects.atk;
            result.MATK += modi.int + effects.matk;
            break;
        case 'rod':
            result.ATK += modi.str + effects.atk;
            result.MATK += Math.trunc(modi.int * 1.5) + effects.matk;
            break;
        default:
            result.ATK += modi.str * 2 + effects.atk;
            result.MATK += modi.int + effects.matk;
            break;
    }
    if (eqlist[eq.weapon[0]].size == 'large') result.ATK += Math.trunc(modi.str / 3);
    if (buffskills[6]) result.ATK += Math.trunc((result.HP - 1) / 3);
    result.DEF += modi.con + effects.def;
    result.DEFre += Math.ceil(result.DEF / 2) + effects.def_re + result.DEF;
    result.MDEF += modi.sen + effects.mdef;
    result.MDEFre += Math.ceil(result.MDEF / 2) + result.MDEF;
    result.HIT += modi.dex + effects.hit;
    result.FLEE += modi.agi + effects.flee;
    result.RESIST += modi.sen + effects.resist;
    result.ATKd += effects.atk_d;
    result.MATKd += effects.matk_d;
    result.HITd += effects.hit_d;
    result.FLEEd += effects.flee_d;
    result.RESISTd += effects.resist_d;

    if (sttemp == null) {
        a = document.getElementsByClassName('parametertext');
        a[0].innerText = result.HP;
        a[1].innerText = result.SP;
        a[2].innerText = result.ATKd + 'd' + (result.ATK < 0 ? '' : '+') + result.ATK;
        a[3].innerText = result.DEF + '(' + result.DEFre + ')';
        a[4].innerText = (result.MATKd < 1 ? '' : result.MATKd + 'd') + (result.MATK < 0 ? '' : result.MATKd < 1 ? '' : '+') + result.MATK;
        a[5].innerText = result.MDEF + '(' + result.MDEFre + ')';
        a[6].innerText = (result.HITd < 1 ? '' : result.HITd + 'd') + (result.HIT < 0 ? '' : result.HITd < 1 ? '' : '+') + result.HIT;
        a[7].innerText = (result.FLEEd < 1 ? '' : result.FLEEd + 'd') + (result.FLEE < 0 ? '' : result.FLEEd < 1 ? '' : '+') + result.FLEE;
        a[8].innerText = (result.RESISTd < 1 ? '' : result.RESISTd + 'd') + (result.RESIST < 0 ? '' : result.RESISTd < 1 ? '' : '+') + result.RESIST;
    }
    else {
        if (result.HP != sttemp.HP) document.getElementById('prm_hp').innerText = result.HP;
        if (result.SP != sttemp.SP) document.getElementById('prm_sp').innerText = result.SP;
        if (result.ATK != sttemp.ATK || result.ATKd != sttemp.ATKd) document.getElementById('prm_atk').innerText = result.ATKd + 'd' + (result.ATK < 0 ? '' : '+') + result.ATK;
        if (result.DEF != sttemp.DEF || result.DEFre != sttemp.DEFre) document.getElementById('prm_def').innerText = result.DEF + '(' + result.DEFre + ')';
        if (result.MATK != sttemp.MATK || result.MATKd != sttemp.MATKd) document.getElementById('prm_matk').innerText = (result.MATKd < 1 ? '' : result.MATKd + 'd') + (result.MATK < 0 ? '' : result.MATKd < 1 ? '' : '+') + result.MATK;
        if (result.MDEF != sttemp.MDEF || result.MDEFre != sttemp.MDEFre) document.getElementById('prm_mdef').innerText = result.MDEF + '(' + result.MDEFre + ')';
        if (result.HIT != sttemp.HIT || result.HITd != sttemp.HITd) document.getElementById('prm_hit').innerText = (result.HITd < 1 ? '' : result.HITd + 'd') + (result.HIT < 0 ? '' : result.HITd < 1 ? '' : '+') + result.HIT;
        if (result.FLEE != sttemp.FLEE || result.FLEEd != sttemp.FLEEd) document.getElementById('prm_flee').innerText = (result.FLEEd < 1 ? '' : result.FLEEd + 'd') + (result.FLEE < 0 ? '' : result.FLEEd < 1 ? '' : '+') + result.FLEE;
        if (result.RESIST != sttemp.RESIST || result.RESISTd != sttemp.RESISTd) document.getElementById('prm_resist').innerText = (result.RESISTd < 1 ? '' : result.RESISTd + 'd') + (result.RESIST < 0 ? '' : result.RESISTd < 1 ? '' : '+') + result.RESIST;
    }
    sttemp = result;

    if (effects.str != plsttemp.str) { document.getElementById('ac_str').innerText = (effects.str >= 0 ? '+' : '') + effects.str; plsttemp.str = effects.str; }
    if (effects.con != plsttemp.con) { document.getElementById('ac_con').innerText = (effects.con >= 0 ? '+' : '') + effects.con; plsttemp.con = effects.con; }
    if (effects.dex != plsttemp.dex) { document.getElementById('ac_dex').innerText = (effects.dex >= 0 ? '+' : '') + effects.dex; plsttemp.dex = effects.dex; }
    if (effects.agi != plsttemp.agi) { document.getElementById('ac_agi').innerText = (effects.agi >= 0 ? '+' : '') + effects.agi; plsttemp.agi = effects.agi; }
    if (effects.sen != plsttemp.sen) { document.getElementById('ac_sen').innerText = (effects.sen >= 0 ? '+' : '') + effects.sen; plsttemp.sen = effects.sen; }
    if (effects.int != plsttemp.int) { document.getElementById('ac_int').innerText = (effects.int >= 0 ? '+' : '') + effects.int; plsttemp.int = effects.int; }

    if (modi.str != moditemp.str) { document.getElementById('modi_str').innerText = modi.str; moditemp.str = modi.str; }
    if (modi.con != moditemp.con) { document.getElementById('modi_con').innerText = modi.con; moditemp.con = modi.con; }
    if (modi.dex != moditemp.dex) { document.getElementById('modi_dex').innerText = modi.dex; moditemp.dex = modi.dex; }
    if (modi.agi != moditemp.agi) { document.getElementById('modi_agi').innerText = modi.agi; moditemp.agi = modi.agi; }
    if (modi.sen != moditemp.sen) { document.getElementById('modi_sen').innerText = modi.sen; moditemp.sen = modi.sen; }
    if (modi.int != moditemp.int) { document.getElementById('modi_int').innerText = modi.int; moditemp.int = modi.int; }

    {
        const p = { 0: 'str', 1: 'con', 2: 'dex', 3: 'agi', 4: 'sen', 5: 'int' }
        let cp = 0;
        for (let x = 0; x < 6; x++) {
            if (st[p[x]] <= 20) { cp += (st[p[x]] - 6) * 2; }
            else if (st[p[x]] <= 40) { cp += (st[p[x]] - 20) * 3 + 28; }
            else if (st[p[x]] <= 60) { cp += (st[p[x]] - 40) * 4 + 88; }
            else if (st[p[x]] <= 80) { cp += (st[p[x]] - 60) * 5 + 168; }
            else { cp += (st[p[x]] - 80) * 6 + 268; }
            cp += (skl[x] - 1) * 3
        }
        document.getElementById('cp').innerText = `CP ${lvcp[lvsc] - cp}`;
        document.getElementById('cp').style.color = cp <= lvcp[lvsc] ? '#000' : '#F00';
    }
}

function BuildSave() {
    let url = new URL(window.location.href);
    url.searchParams.set('lvsc',lvsc);
    url.searchParams.set('st', [st.str,st.con,st.dex,st.agi,st.sen,st.int].join('_'))
    url.searchParams.set('cl', cl);
    url.searchParams.set('sk', sk.join('_'));
    url.searchParams.set('skl', skl.join('_'));

    url.searchParams.set('wep', eq.weapon.join('_'));
    url.searchParams.set('shi', eq.shield.join('_'));
    url.searchParams.set('hel', eq.helmet.join('_'));
    url.searchParams.set('arm', eq.armor.join('_'));
    url.searchParams.set('sho', eq.shoes.join('_'));
    url.searchParams.set('ac1', eq.ac1.join('_'));
    url.searchParams.set('ac2', eq.ac2.join('_'));
    url.searchParams.set('ac3', eq.ac3.join('_'));

    location.href = url;
}

function BuildInit() {
    let params = new URL(document.location).searchParams;
    let value;

    value = params.get('lvsc');
    if (value) { lvsc = value; }

    value = params.get('st');
    if (value && value.split('_').length == 6) {
        const rap = { 0: 'str', 1: 'con', 2: 'dex', 3: 'agi', 4: 'sen', 5: 'int' };
        let a = value.split('_');
        for (let xy = 0; xy < 6; xy++) { 
            st[rap[xy]] = Number.parseInt(a[xy]);
            document.getElementById(rap[xy]).value = Number.parseInt(a[xy]);
        }
    }

    value = params.get('cl');
    if (value) {
        ChangeClass(value);
        document.getElementById('class_select').value = value;
    }

    value = params.get('sk');
    if (value) {
        let a = value.split('_');
        for (let xy = 2; xy < 6; xy++) {
            ChangeSkill(xy, a[xy - 2]);
            document.getElementById(`sk_sel${xy}`).value = a[xy - 2];
        }
    }

    value = params.get('skl');
    if (value) { 
        let a = value.split('_');
        for(let xy = 0; xy < 6; xy++){
            ChangeSkillLv(xy,a[xy]);
            document.getElementById(`lv_sel${xy}`).value = a[xy];
        }
    }

    value = params.get('wep');
    if (value) { 
        let a = value.split('_');
        document.getElementById('weapon').value = a[0];
        ChangeEquipment('weapon',a[0]);
        document.getElementById('weapon_att').value = a[1];
        ChangeAttribute('weapon',a[1]);
    }

    value = params.get('shi');
    if (value) { 
        let a = value.split('_');
        document.getElementById('shield').value = a[0];
        ChangeEquipment('shield',a[0]);
        document.getElementById('shield_att').value = a[1];
        ChangeAttribute('shield',a[1]);
    }

    value = params.get('hel');
    if (value) { 
        let a = value.split('_');
        document.getElementById('helmet').value = a[0];
        ChangeEquipment('helmet',a[0]);
        document.getElementById('helmet_att').value = a[1];
        ChangeAttribute('helmet',a[1]);
    }

    value = params.get('arm')
    if (value) { 
        let a = value.split('_');
        document.getElementById('armor').value = a[0];
        ChangeEquipment('armor',a[0]);
        document.getElementById('armor_att').value = a[1];
        ChangeAttribute('armor',a[1]);
    }

    value = params.get('sho');
    if (value) {
        let a = value.split('_');
        document.getElementById('shoes').value = a[0];
        ChangeEquipment('shoes',a[0]);
        document.getElementById('shoes_att').value = a[1];
        ChangeAttribute('shoes',a[1]);
    }

    value = params.get('ac1');
    if (value) {
        let a = value.split('_');
        document.getElementById('ac1').value = a[0];
        ChangeEquipment('ac1',a[0]);
        document.getElementById('ac1_att').value = a[1];
        ChangeAttribute('ac1',a[1]);
    }

    value = params.get('ac2');
    if (value) {
        let a = value.split('_');
        document.getElementById('ac2').value = a[0];
        ChangeEquipment('ac2',a[0]);
        document.getElementById('ac2_att').value = a[1];
        ChangeAttribute('ac2',a[1]);
    }

    value = params.get('ac3');
    if (value) {
        let a = value.split('_');
        document.getElementById('ac3').value = a[0];
        ChangeEquipment('ac3',a[0]);
        document.getElementById('ac3_att').value = a[1];
        ChangeAttribute('ac3',a[1]);
    }

    StatusCalc();
}

BuildInit();