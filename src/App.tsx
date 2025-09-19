import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './App.css';
const BudgetVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLedger, setShowLedger] = useState(false);
  const [csvText, setCsvText] = useState('');
  // 初始原始資料（保留原始文字/欄位），但實際 state 儲存已被 normalize 的正確帳目
  const initialRaw = [
    { type: '支出', date: '2024/12/31', item: '報名費', amount: -6000, balance: -6000, party: '', note: '' },
    { type: '收入', date: '2025/1/11', item: '捐贈', amount: 20000, balance: 14000, party: '法鼓山林師姑', note: 'NT$20,000' },
    { type: '收入', date: '2025/1/11', item: '捐贈', amount: 30000, balance: 44000, party: '誦丞爸爸', note: 'NT$50,000' },
    { type: '收入', date: '2025/1/14', item: '捐贈', amount: 40000, balance: 84000, party: '行雲媽媽(旅宿)', note: 'NT$90,000' },
    { type: '收入', date: '2025/1/14', item: '捐贈', amount: 60000, balance: 144000, party: '行雲家人(材料)', note: 'NT$150,000' },
    { type: '收入', date: '2025/1/14', item: '捐贈', amount: 50000, balance: 194000, party: '行雲家人(材料)', note: 'NT$200,000' },
    { type: '支出', date: '2025/1/15', item: '住宿訂金', amount: -10000, balance: 184000, party: '成財老師', note: '' },
    { type: '收入', date: '2025/1/16', item: '捐贈', amount: 10000, balance: 194000, party: '李校長(車資)', note: '' },
    { type: '收入', date: '2025/1/16', item: '捐贈', amount: 10000, balance: 204000, party: '李校長', note: '' },
    { type: '支出', date: '2025/1/21', item: '陽明交大集訓計程車費', amount: -615, balance: 203385, party: '尚未結帳（王潔宇410+205）', note: '' },
    { type: '支出', date: '2025/1/22', item: '住宿費尾款', amount: -36800, balance: 166585, party: '成財老師結帳', note: '' },
    { type: '支出', date: '2025/1/22', item: '陽明交大集訓車票', amount: -18482, balance: 148103, party: '原佑老師代墊', note: '已收款' },
    { type: '收入', date: '2025/2/13', item: '捐贈', amount: 2000, balance: 150103, party: '陳軒語、王韻棠', note: '' },
    { type: '支出', date: '2025/2/13', item: '碳纖維材料', amount: -1260, balance: 148843, party: '大鼻子玻纖材料行', note: '先墊' },
    { type: '支出', date: '2025/2/23', item: '降落傘綁繩', amount: -90, balance: 148753, party: '', note: '已付' },
    { type: '支出', date: '2025/2/25', item: '鉗子(雞眼釘用)', amount: -249, balance: 148504, party: '', note: '已付' },
    { type: '支出', date: '2025/2/25', item: 'PLA線材20卷', amount: -7980, balance: 140524, party: '原佑代墊', note: '已收款' },
    { type: '支出', date: '2025/3/6', item: '雞眼釘', amount: -208, balance: 140316, party: '', note: '已付' },
    { type: '支出', date: '2025/3/6', item: '傘布(退款)', amount: 960, balance: 139356, party: '', note: '已退款' },
    { type: '支出', date: '2025/3/6', item: '降落傘繩', amount: -1005, balance: 138351, party: '', note: '已付' },
    { type: '支出', date: '2025/3/11', item: '紙管100cm×4', amount: -1270, balance: 137081, party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/19', item: '真空幫浦+冷媒管', amount: -2199, balance: 134882, party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/19', item: '三通控制閥等', amount: -540, balance: 134342, party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/19', item: 'RTM 耗材', amount: -670, balance: 133672, party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/20', item: '碳纖維與耗材(第一批)', amount: -8800, balance: 124872, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/3/25', item: 'DC-DC 9A 300W', amount: -200, balance: 124672, party: '成財蝦皮', note: '' },
    { type: '收入', date: '2025/3/27', item: '捐贈(報名費)', amount: 6000, balance: 130672, party: '教務處', note: '已核銷' },
    { type: '支出', date: '2025/3/28', item: '樹莓派', amount: -4203, balance: 126469, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/3/28', item: 'BME280 感測模組', amount: -420, balance: 126049, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/3/28', item: 'LoRa 模組', amount: -255, balance: 125794, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/3/28', item: '洞洞板', amount: -228, balance: 125566, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/4/10', item: '紙管100cm×8', amount: -2540, balance: 123026, party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/4/16', item: '碳纖維耗材(第二批)', amount: -6100, balance: 116926, party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/4/20', item: '降落傘(淘寶)', amount: -4547, balance: 112379, party: '', note: '含集運/手續費/關稅' },
    { type: '支出', date: '2025/4/20', item: '降落傘信用卡手續費', amount: -68, balance: 112311, party: '', note: '' },
    { type: '支出', date: '2025/4/20', item: '降落傘集運費', amount: -135, balance: 112176, party: '', note: '' },
    { type: '支出', date: '2025/4/29', item: '降落傘關稅', amount: -128, balance: 112048, party: '', note: '' },
    { type: '支出', date: '2025/4/29', item: '碳纖維布 3K', amount: -4600, balance: 107448, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/5', item: 'CM5 IO Board', amount: -1213, balance: 106235, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/5', item: 'GY-91 感測模組', amount: -486, balance: 105749, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/5', item: 'SX1278 LoRa', amount: -645, balance: 105104, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/9', item: '碳纖維耗材(第三批)', amount: -14700, balance: 90404, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/16', item: '美工刀片', amount: -132, balance: 90272, party: '誦丞', note: '' },
    { type: '支出', date: '2025/5/17', item: '亮彩輕便雨衣', amount: -232, balance: 90040, party: '韻棠', note: '' },
    { type: '支出', date: '2025/5/21', item: 'CM5 散熱片', amount: -423, balance: 89617, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/21', item: 'Camera Module 3 (2組)', amount: -2855, balance: 86762, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/21', item: '工業縫紉機刀', amount: -113, balance: 86649, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/22', item: '手套/雨衣/切割器', amount: -555, balance: 86094, party: '韻棠', note: '' },
    { type: '支出', date: '2025/5/22', item: '火箭滑軌螺帽', amount: -1358, balance: 84736, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/23', item: '運動風衣', amount: -2226, balance: 82510, party: '韻棠', note: '' },
    { type: '支出', date: '2025/5/23', item: '碳纖維布 12K', amount: -5050, balance: 77460, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/27', item: '120W 行動電源', amount: -438, balance: 77022, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/28', item: '隊服訂金', amount: -5000, balance: 72022, party: '伍角衣版', note: '' },
    { type: '支出', date: '2025/5/28', item: '火車票 (12人)', amount: -14832, balance: 57190, party: '成財', note: '' },
    { type: '支出', date: '2025/5/31', item: 'Kingston NV3 SSD', amount: -1284, balance: 55906, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/31', item: '攝影模組連接線', amount: -456, balance: 55450, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/6/2', item: 'Anker 165W', amount: -2445, balance: 53005, party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/6/5', item: '隊服 20 件', amount: -3800, balance: 49205, party: '伍角衣版', note: '' },
    { type: '收入', date: '2025/6/10', item: '捐贈', amount: 10000, balance: 59205, party: '李校長', note: '' },
    { type: '支出', date: '2025/6/12', item: '3M 噴膠', amount: -526, balance: 58679, party: '原佑蝦皮', note: '' },
    { type: '收入', date: '2025/6/13', item: '捐贈', amount: 20000, balance: 78679, party: '倪益民老師', note: '' },
    { type: '支出', date: '2025/6/13', item: '住宿費訂金', amount: -10000, balance: 68679, party: '成財', note: '' },
    { type: '支出', date: '2025/6/14', item: '發泡劑', amount: -649, balance: 68030, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/6/14', item: '高速剛洗刀', amount: -440, balance: 67590, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/7', item: '4040 鋁擠架', amount: -3530, balance: 64060, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/7', item: '不銹鋼引擎還訂製', amount: -3028, balance: 61032, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/10', item: '紙管 100cm (2根)', amount: -710, balance: 60322, party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/22', item: '火車票', amount: -10740, balance: 49582, party: '成財', note: '' },
    { type: '支出', date: '2025/7/22', item: '八木天線', amount: -2290, balance: 47292, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'LoRa', amount: -620, balance: 46672, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'GY-91 九軸', amount: -412, balance: 46260, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'SMA 2.4G 天線', amount: -248, balance: 46012, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'GY-NEO-6M GPS', amount: -205, balance: 45807, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'GY-NEO-6MV2 GPS', amount: -300, balance: 45507, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'SMA 公轉母', amount: -263, balance: 45244, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'CM5 擴充模組', amount: -920, balance: 44324, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: '壓克力盒', amount: -870, balance: 43454, party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: '火箭身貼紙', amount: -836, balance: 42618, party: '家祥(韻棠)', note: '' },
    { type: '支出', date: '2025/7/22', item: '綠茶 x3', amount: -69, balance: 42549, party: '翊丞', note: '' },
    { type: '支出', date: '2025/7/23', item: '強力瞬間膠', amount: -281, balance: 42268, party: '翊丞', note: '' },
    { type: '支出', date: '2025/7/24', item: '墾丁快線去程 (8人)', amount: -952, balance: 41316, party: '阿肥', note: '未付' },
    { type: '支出', date: '2025/7/25', item: '晚餐便當', amount: -1260, balance: 40056, party: '成財', note: '' },
    { type: '支出', date: '2025/7/26', item: '袖套、噴漆', amount: -1137, balance: 38919, party: '翊丞', note: '' },
    { type: '支出', date: '2025/7/26', item: '晚餐 PIZZA', amount: -2290, balance: 36629, party: '政宏', note: '' },
    { type: '支出', date: '2025/7/27', item: '住宿費尾款', amount: -66900, balance: -30271, party: '成財', note: '' },
    { type: '支出', date: '2025/7/27', item: '晚餐便當', amount: -1170, balance: -31441, party: '政宏', note: '' },
    { type: '支出', date: '2025/7/31', item: '其他', amount: -836, balance: -32277, party: '韻棠', note: '' },
    { type: '收入', date: '', item: '降落傘傘布退費', amount: 960, balance: -31317, party: '', note: '退款入帳' },
    { type: '收入', date: '', item: '決賽補助', amount: 20000, balance: -11317, party: '主辦單位', note: '尚未入帳' },
    { type: '支出', date: '', item: '墾丁快線回程', amount: 0, balance: -11317, party: '', note: '' },
    { type: '收入', date: '2025/8/11', item: '捐贈', amount: 10000, balance: -1317, party: '恩慈家長', note: '已入帳' }
  ];

  // --- 新增：把你提供的 CSV 內容放在這裡（來源：Downloads/火箭經費來源及流向總表.csv） ---
  const sampleCsv = `..,出/入帳日期,項目,金額,餘額總計,附註,募款總額度,,
支出,2024/12/31,報名費,"NT$6,000","-NT$6,000",, NT$-   ,,
收入,2025/1/11,捐贈,"NT$20,000","NT$14,000",法鼓山林師姑," NT$20,000 ",,
收入,2025/1/11,捐贈,"NT$30,000","NT$44,000",誦丞爸爸," NT$50,000 ",,
收入,2025/1/14,捐贈,"NT$40,000","NT$84,000",行雲媽媽(旅宿)," NT$90,000 ",,
收入,2025/1/14,捐贈,"NT$60,000","NT$144,000",行雲家人(材料)," NT$150,000 ",,
收入,2025/1/14,捐贈,"NT$50,000","NT$194,000",行雲家人(材料)," NT$200,000 ",,
支出,2025/1/15,住宿訂金,"NT$10,000","NT$184,000",成財老師," NT$200,000 ",,
收入,2025/1/16,捐贈,"NT$10,000","NT$194,000",李校長(車資)," NT$210,000 ",,
收入,2025/1/16,捐贈,"NT$10,000","NT$204,000",李校長," NT$220,000 ",,
支出,2025/1/21,陽明交大集訓計程車費,NT$615,"NT$203,385",尚未結帳（王潔宇410+205)," NT$220,000 ",,
支出,2025/1/22,住宿費尾款,"NT$36,800","NT$166,585",成財老師結帳," NT$220,000 ",,
支出,2025/1/22,陽明交大集訓車票,"NT$18,482","NT$148,103",原佑老師代墊，已收款," NT$220,000 ",,
收入,2025/2/13,捐贈,"NT$2,000","NT$150,103",陳軒語、王韻棠(無指定)," NT$222,000 ",,
支出,2025/2/13,"【黑金包】碳纖維DIY、碳纖維包覆、碳纖維補強-大鼻子玻纖材料行-FRP,複材,抽真空,空力套件,補強","NT$1,260","NT$148,843",先墊，原佑蝦皮," NT$222,000 ",,
支出,2025/2/23,降落傘綁繩,NT$90,"NT$148,753",已付。," NT$222,000 ",,
支出,2025/2/25,鉗子(雞眼釘用),NT$249,"NT$148,504",已付。," NT$222,000 ",,
支出,2025/2/25,PLA線材20卷,"NT$7,980","NT$140,524",原佑代墊，已收款," NT$222,000 ",,
支出,2025/3/6,雞眼釘,NT$208,"NT$140,316",已付。," NT$222,000 ",,
支出,2025/3/6,傘布,NT$960,"NT$139,356",已退款," NT$222,000 ",,
支出,2025/3/6,降落傘繩,"NT$1,005","NT$138,351",已付。," NT$222,000 ",,
支出,2025/3/11,100公分長15.2公分內徑紙管四根,"NT$1,270","NT$137,081",先墊，原佑蝦皮," NT$222,000 ",,
支出,2025/3/19,允統財YUN VE-1（1/4HP）真空幫浦+2分冷媒管,"NT$2,199","NT$134,882",先墊，原佑蝦皮," NT$222,000 ",,
支出,2025/3/19,三通控制閥 2分銅製接頭＋真空機水分乾燥器 過濾砂 ,NT$540,"NT$134,342",先墊，原佑蝦皮," NT$222,000 ",,
支出,2025/3/19,黃色樹脂刮板-大鼻子玻纖材料行二個+RTM真空耗材 吸膠棉 1.2x1m -大鼻子玻纖材料行五份,NT$670,"NT$133,672",先墊，原佑蝦皮," NT$222,000 ",,
支出,2025/3/20,碳纖維與AB膠與相關耗材一組（第一批）,"NT$8,800","NT$124,872",先墊，原佑蝦皮，已付。," NT$222,000 ",,
支出,2025/3/25,DC-DC 9A 300W 直流降壓轉換器,NT$200,"NT$124,672",成財蝦皮發票，已付。," NT$222,000 ",,
收入,2025/3/27,捐贈,"NT$6,000","NT$130,672",教務處提供(報名費)，已核銷，入賬。," NT$228,000 ",,
支出,2025/3/28,樹莓派,"NT$4,203","NT$126,469",成財蝦皮發票，已付。," NT$228,000 ",,
支出,2025/3/28,CJMCU-280E BME280-3.3v BOSCH 高精度 氣壓+溫濕度感測器模組,NT$420,"NT$126,049",成財蝦皮發票，已付。," NT$228,000 ",,
支出,2025/3/28,【UCI電子】(10-2) sx1278 lora模組 安信可 lora ra-02 433M V1.0,NT$255,"NT$125,794",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/3/28,PCB 2.54間距 洞洞板,NT$228,"NT$125,566",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/4/10,100公分長15.2公分內徑紙管八根,"NT$2,540","NT$123,026",先墊，原佑蝦皮," NT$228,000 ",,
支出,2025/4/16,碳纖維與AB膠與相關耗材一組（第二批）,"NT$6,100","NT$116,926",先墊，原佑蝦皮," NT$228,000 ",,
支出,2025/4/20,淘寶購買降落傘(直徑3.5 m),"NT$4,547","NT$112,379","詳細見""回收組淘寶購買降落傘明細"""," NT$228,000 ",,
支出,2025/4/20,降落傘信用卡手續費,NT$68,"NT$112,311","詳細見""回收組淘寶購買降落傘明細"""," NT$228,000 ",,
支出,2025/4/20,降落傘集運費,NT$135,"NT$112,176","詳細見""回收組淘寶購買降落傘明細"""," NT$228,000 ",,
支出,2025/4/29,降落傘關稅,NT$128,"NT$112,048","詳細見""回收組淘寶購買降落傘明細"""," NT$228,000 ",,
支出,2025/4/29,"碳纖維布"" 3K 斜織 1.5寬x1m-大鼻子玻纖材料行-FRP,複材,抽真空,空力套件,補強","NT$4,600","NT$107,448",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/5/5,樹莓派 Raspberry Pi Compute module 5 IO Board 擴展板 CM5 I/O板（綠板）,"NT$1,213","NT$106,235",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/5,【正勝電子】GY-91 MPU9250/MPU6500+BMP280 7/10DOF加速度陀螺儀指南針七/十軸感測模組,NT$486,"NT$105,749",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/5,[芸庭樹] SX1278 1W 8KM 433MHZ 無線模組 無線串口 LoRa擴頻 UART接口,NT$645,"NT$105,104",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/9,碳纖維與AB膠與相關耗材一組（第三批）,"NT$14,700","NT$90,404",先墊，原佑蝦皮," NT$228,000 ",,
支出,2025/5/16,美工刀片,NT$132,"NT$90,272",誦丞發票，已核銷2025/05/29," NT$228,000 ",,
支出,2025/5/17,亮彩輕便雨衣,NT$232,"NT$90,040",韻棠發票，已核銷2025/05/29," NT$228,000 ",,
支出,2025/5/21,樹莓派 Raspberry Pi CM5專用鋁合金散熱片，Pi Compute Module 5 Cooler,NT$423,"NT$89,617",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/21,Raspberry Pi Camera Module 3 樹莓派攝影模組 V3 (2組),"NT$2,855","NT$86,762",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/21,工業用 縫紉機 拷克 割線刀 Siruba 747 KS24,NT$113,"NT$86,649",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/22,手套、雨衣、切割器,NT$555,"NT$86,094",韻棠發票，已核銷2025/05/29," NT$228,000 ",,
支出,2025/5/22,火箭滑軌螺帽與角碼,"NT$1,358","NT$84,736",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/5/23,迷彩運動風衣等,"NT$2,226","NT$82,510",韻棠發票，已核銷2025/05/29," NT$228,000 ",,
支出,2025/5/23,"【CEP】碳纖維布 12K 平織 1x1m-大鼻子玻纖材料行-FRP,複材,抽真空,空力套件,補強","NT$5,050","NT$77,460",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/5/27,120W行動電源20000mAH 大容量行動電源,NT$438,"NT$77,022",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/28,隊服訂金,"NT$5,000","NT$72,022",伍角衣版，成財，已付。," NT$228,000 ",,
支出,2025/5/28,火車票12人花蓮新竹來回,"NT$14,832","NT$57,190",成財支給政宏15000取票," NT$228,000 ",,
支出,2025/5/31,Kingston 金士頓 NV3 500G/1TB/2TB PCIe 4.0 M.2 SSD 固態硬碟,"NT$1,284","NT$55,906",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/5/31,"樹莓派 5 攝影鏡頭連接線(15 to 22 Pin, 相容 Pi Zero 系列主板, 含稅附發票)",NT$456,"NT$55,450",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/6/2,Anker zolo 165w自帶線 行動電源,"NT$2,445","NT$53,005",成財蝦皮，已付。," NT$228,000 ",,
支出,2025/6/5,隊服20件,"NT$3,800","NT$49,205",伍角衣版，成財，已付," NT$228,000 ",,
收入,2025/6/10,捐贈,"NT$10,000","NT$59,205",李校長，現金已入帳。," NT$238,000 ",,
支出,2025/6/12, 【3M】3M 思高牌 Super 77 特級萬能噴膠 745ml 接著黏性特強 super77 黑貓姐,NT$526,"NT$58,679",先墊，原佑蝦皮。," NT$228,000 ",,
收入,2025/6/13,捐贈,"NT$20,000","NT$78,679",倪益民老師，已入帳。," NT$248,000 ",,
支出,2025/6/13,住宿費訂金,"NT$10,000","NT$68,679",成財，已付。," NT$248,000 ",,
支出,2025/6/14,發泡劑 750mlPU發泡劑 送工具 發泡800倍 補洞劑 填補劑 防漏 填縫劑 發泡膠,NT$649,"NT$68,030",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/6/14,高速剛洗刀,NT$440,"NT$67,590",先墊，原佑蝦皮。," NT$248,000 ",,
支出,2025/7/7,模擬發射架用之4040鋁擠架,"NT$3,530","NT$64,060",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/7/7,不銹鋼引擎還訂製,"NT$3,028","NT$61,032",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/7/10,100cm紙管兩根,NT$710,"NT$60,322",先墊，原佑蝦皮。," NT$228,000 ",,
支出,2025/7/22,火車票,"NT$10,740","NT$49,582",成財，已付。," NT$228,000 ",,
支出,2025/7/22,八木天線,"NT$2,290","NT$47,292",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,lora,NT$620,"NT$46,672",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,GY-91九軸,NT$412,"NT$46,260",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,SMA 2.4G 2dB 天線,NT$248,"NT$46,012",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,GY-NEO-6M GPS 模組,NT$205,"NT$45,807",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,GY-NEO-6MV2 GPS 模組,NT$300,"NT$45,507",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,SMA公轉母,NT$263,"NT$45,244",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,樹莓派CM5擴充模組,NT$920,"NT$44,324",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,壓克力盒,NT$870,"NT$43,454",建興師，已付。," NT$228,000 ",,
支出,2025/7/22,火箭箭身貼紙,NT$836,"NT$42,618",家祥(韻棠)，已付。," NT$228,000 ",,
支出,2025/7/22,綠茶(寶特瓶作為火箭材料)*3,NT$69,"NT$42,549",翊丞，已付。," NT$228,000 ",,
支出,2025/7/23,強力瞬間膠,NT$281,"NT$42,268",翊丞，已付。," NT$228,000 ",,
支出,2025/7/24,墾丁快線去程（8人）,NT$952,"NT$41,316",阿肥，未付。," NT$228,000 ",,
支出,2025/7/25,晚餐便當,"NT$1,260","NT$40,056",成財，已付。," NT$228,000 ",,
支出,2025/7/26,袖套、噴漆,"NT$1,137","NT$38,919",翊丞，已付。,,,
支出,2025/7/26,晚餐PIZZA,"NT$2,290","NT$36,629",政宏，已付。,,,
支出,2025/7/27,住宿費尾款,"NT$66,900","-NT$30,271",成財，已付。, NT$-   ,,
支出,2025/7/27,晚餐便當,"NT$1,170","-NT$31,441",政宏，已付。,,,
支出,2025/7/31,,NT$836,"-NT$32,277",韻棠，已付。,,,
收入,,降落傘傘布退費,NT$960,"-NT$31,317",, NT$960 ,,
收入,,決賽補助,"NT$20,000","-NT$11,317",主辦單位決賽補助，尚未入帳。," NT$66,900 ",,
支出,,墾丁快線回程,,"-NT$11,317",,,,
收入,2025/8/11,捐贈,"NT$10,000","-NT$1,317",恩慈家長捐贈，已入帳。,,,
`;
  // -------------------------------------------------------------------

  // 將原始紀錄正規化：amount -> number（含正負）、並重算累計 balance
  const normalizeTransactions = (raw) => {
    let running = 0;
    return (raw || []).map(r => {
      const type = (r.type || '').toString().trim();
      const amtRaw = r.amount ?? r.金額 ?? r['金額'] ?? '';
      const amt = parseMoney(amtRaw);
      const amount = (type === '支出') ? -Math.abs(amt) : amt;
      running = Math.round((running + amount) * 100) / 100;
      return {
        ...r,
        type,
        date: r.date || r['出/入帳日期'] || '',
        item: r.item || r['項目'] || '',
        amount,
        balance: running,
        party: r.party || r['附註'] || r['募款人'] || '',
        note: r.note || ''
      };
    });
  };

  // 載入 sampleCsv（把你給的 CSV 直接解析並顯示）
  const loadSampleCsv = () => {
    const parsed = parseCSVText(sampleCsv);
    if (parsed.length) {
      setTransactions(normalizeTransactions(parsed));
      setCsvText(sampleCsv);
    } else {
      alert('解析失敗：CSV 內容可能格式不符。');
    }
  };

  const [transactions, setTransactions] = useState(() => normalizeTransactions(initialRaw));

  // 自動在頁面載入時載入 sampleCsv（讓訪客一打開頁面就看到正確的帳目）
  useEffect(() => {
    // 若你希望僅在沒有自訂 csvText 時載入，改成 if (!csvText) loadSampleCsv();
    loadSampleCsv();
    // 空依賴陣列表示僅在 mount 時執行一次
  }, []);

  // 幫助函式：把金額字串（含 NT$, 千分號）轉成數值
  const parseMoney = (s) => {
    if (!s && s !== 0) return 0;
    const normalized = String(s).replace(/[^0-9\-\.\u2212]/g, '').replace('\u2212','-').replace(/,/g, '');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
  };

  // 簡易 CSV 解析器（支援引號內逗號）
  const csvToRows = (text) => {
    const rows = [];
    let cur = [], field = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"' ) {
        if (inQuotes && text[i+1] === '"') { field += '"'; i++; } // escaped quote
        else inQuotes = !inQuotes;
        continue;
      }
      if (ch === ',' && !inQuotes) {
        cur.push(field); field = ''; continue;
      }
      if ((ch === '\n' || ch === '\r') && !inQuotes) {
        if (field !== '' || cur.length) { cur.push(field); rows.push(cur); cur = []; field = ''; }
        // handle CRLF
        if (ch === '\r' && text[i+1] === '\n') i++;
        continue;
      }
      field += ch;
    }
    if (inQuotes === false && (field !== '' || cur.length)) cur.push(field);
    if (cur.length) rows.push(cur);
    return rows;
  };

  // 把 CSV 內容轉成 transactions 陣列
  const parseCSVText = (text) => {
    const rows = csvToRows(text);
    // 嘗試找出起始資料列（跳過標頭）
    const dataRows = rows.filter(r => r.length >= 4 && (r[0].trim() === '支出' || r[0].trim() === '收入'));
    const parsed = dataRows.map(r => {
      return {
        type: (r[0]||'').trim(),
        date: (r[1]||'').trim(),
        item: (r[2]||'').trim(),
        amount: (r[3]||'').trim(),
        // balance/original fields may exist but we will recompute later
        party: (r[5]||'').trim(),
        note: (r[4] || r[6] || '').trim()
      };
    });
    return parsed;
  };

  // 檔案上傳處理
  const handleFileUpload = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const parsed = parseCSVText(text);
      if (parsed.length) setTransactions(normalizeTransactions(parsed));
    };
    reader.readAsText(f, 'utf-8');
  };

  // 貼上 CSV 文本匯入
  const importCsvText = () => {
    if (!csvText) return;
    const parsed = parseCSVText(csvText);
    if (parsed.length) setTransactions(normalizeTransactions(parsed));
  };

  // 目前 transactions 已被 normalize，直接展示 transactions 即為正確帳目
  const displayedTransactions = transactions;

  // 自動計算統計數字
  const totalIncome = displayedTransactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpense = displayedTransactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const currentBalance = displayedTransactions.length ? displayedTransactions[displayedTransactions.length - 1].balance : 0;
  const overviewData = [
    { name: '總募款', value: totalIncome, color: '#10B981' },
    { name: '總支出', value: totalExpense, color: '#EF4444' },
    { name: '目前餘額', value: currentBalance, color: currentBalance >= 0 ? '#10B981' : '#F59E0B' }
  ];

  // 收入來源
  const incomeData = [
    { name: '行雲家人捐贈', value: 150000, percentage: 55.8, color: '#10B981' },
    { name: '李校長捐贈', value: 30000, percentage: 11.2, color: '#3B82F6' },
    { name: '誦丞爸爸', value: 30000, percentage: 11.2, color: '#F59E0B' },
    { name: '法鼓山林師姑', value: 20000, percentage: 7.4, color: '#8B5CF6' },
    { name: '倪益民老師', value: 20000, percentage: 7.4, color: '#EF4444' },
    { name: '決賽補助', value: 20000, percentage: 7.4, color: '#06B6D4' },
    { name: '其他捐贈', value: 18000, percentage: 6.7, color: '#EC4899' }
  ];
  // 新增：恩慈家長捐贈（已入帳）
  incomeData.push({ name: '恩慈家長捐贈', value: 10000, percentage: 3.6, color: '#F97316' });

  // 月度收支趨勢
  const monthlyTrend = [
    { month: '2024/12', 收入: 0, 支出: 6000, 累計餘額: -6000 },
    { month: '2025/01', 收入: 210000, 支出: 65897, 累計餘額: 138103 },
    { month: '2025/02', 收入: 2000, 支出: 9579, 累計餘額: 130524 },
    { month: '2025/03', 收入: 6000, 支出: 21852, 累計餘額: 114672 },
    { month: '2025/04', 收入: 0, 支出: 13390, 累計餘額: 101282 },
    { month: '2025/05', 收入: 0, 支出: 24260, 累計餘額: 77022 },
    { month: '2025/06', 收入: 30000, 支出: 17810, 累計餘額: 89212 },
    { month: '2025/07', 收入: 21000, 支出: 98523, 累計餘額: 11689 },
    { month: '2025/08', 收入: 10000, 支出: 0, 累計餘額: 21689 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 標題區 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">團隊經費使用報告</h1>
          <p className="text-lg text-gray-600">透明公開・清楚明瞭・負責任的資金運用</p>
          <p className="text-sm text-gray-500 mt-2">報告期間：2024年12月 - 2025年8月 | 最後更新：2025年9月</p>
        </div>

        {/* 總覽卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">總募款金額</h3>
            <p className="text-3xl font-bold text-green-600">NT$ {totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">總支出金額</h3>
            <p className="text-3xl font-bold text-red-600">NT$ {totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: currentBalance >= 0 ? '#10B981' : '#F59E0B' }}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">目前餘額</h3>
            <p className={`text-3xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
              NT$ {currentBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* 標籤頁導航 */}
        <div className="flex flex-wrap justify-center mb-6 bg-white rounded-lg p-2 shadow-lg">
          {[
            { id: 'overview', label: '收支概況' },
            { id: 'expenses', label: '支出明細' },
            { id: 'income', label: '收入來源' },
            { id: 'trend', label: '收支趨勢' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 m-1 rounded-lg font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 內容區 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          
          {/* 收支概況 */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">收支概況</h2>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: '募款收入', value: totalIncome, color: '#10B981' },
                        { name: '實際支出', value: totalExpense, color: '#EF4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) =>
  typeof value === 'number' ? `${name}: NT$${value.toLocaleString()}` : `${name}: NT$未知`
}
                    >
                      {[
                        { name: '募款收入', value: totalIncome, color: '#10B981' },
                        { name: '實際支出', value: totalExpense, color: '#EF4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `NT$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">資金使用率：</span>
                  <span className="text-green-600 font-bold">98.2%</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  目前結餘：NT$ {currentBalance.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* 支出明細 */}
          {activeTab === 'expenses' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">支出項目分析</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `NT$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {expenseCategories.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">NT${item.value.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 收入來源 */}
          {activeTab === 'income' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">收入來源分析</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                      >
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `NT$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {incomeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">NT${item.value.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-gray-700">
                  <span className="font-semibold">特別感謝：</span>
                  所有捐款人的慷慨支持，讓團隊能夠順利參與競賽！
                </p>
              </div>
            </div>
          )}

          {/* 收支趨勢 */}
          {activeTab === 'trend' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">月度收支趨勢</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip formatter={(value) => `NT$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="收入" stroke="#10B981" strokeWidth={3} />
                  <Line type="monotone" dataKey="支出" stroke="#EF4444" strokeWidth={3} />
                  <Line type="monotone" dataKey="累計餘額" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>

              {/* CSV 匯入：檔案上傳 / 貼上 CSV 文本 */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input type="file" accept=".csv,.txt" onChange={handleFileUpload} />
                  <button onClick={() => { const sample = prompt('請將 CSV 內容貼入此視窗並按確定 (或取消)'); if (sample) { setCsvText(sample); importCsvText(); } }} className="px-3 py-2 bg-blue-500 text-white rounded-lg">快速貼上匯入</button>
                  <button onClick={loadSampleCsv} className="px-3 py-2 bg-green-600 text-white rounded-lg">載入我的CSV</button>
                </div>
                <div className="text-sm text-gray-600">或將 CSV 檔拖上方的檔案輸入 / 使用快速貼上匯入</div>
              </div>
              
              {/* 可選：顯示可編輯的 CSV 貼上區（非必要） */}
              <div className="mt-4">
                <textarea
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="可貼上 CSV 內容，然後按右側匯入"
                  style={{ width: '100%', minHeight: 120, padding: 8 }}
                />
                <div className="mt-2 flex justify-end">
                  <button onClick={importCsvText} className="px-4 py-2 bg-blue-500 text-white rounded-lg">匯入貼上內容</button>
                </div>
              </div>

              {/* 交易明細切換按鈕 */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowLedger(v => !v)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
                >
                  {showLedger ? '隱藏帳目明細' : '顯示帳目明細'}
                </button>
              </div>
              
              {/* 逐筆帳目表格 */}
              {showLedger && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-md">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2 border-b">日期</th>
                        <th className="p-2 border-b">類別</th>
                        <th className="p-2 border-b">項目 / 說明</th>
                        <th className="p-2 border-b text-right">金額 (NT$)</th>
                        <th className="p-2 border-b text-right">帳戶餘額</th>
                        <th className="p-2 border-b">備註</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedTransactions.map((t, idx) => (
                        <tr key={idx} className="odd:bg-gray-50">
                          <td className="p-2 align-top">{t.date}</td>
                          <td className="p-2 align-top">{t.type}</td>
                          <td className="p-2 align-top">
                            <div className="font-medium">{t.item}</div>
                            <div className="text-sm text-gray-500">{t.party || ''}</div>
                          </td>
                          <td className={`p-2 text-right align-top ${t.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {t.amount < 0 ? '-' : ''}NT${Math.abs(t.amount).toLocaleString()}
                          </td>
                          <td className="p-2 text-right align-top">
                            NT${(t.balance ?? 0).toLocaleString()}
                          </td>
                          <td className="p-2 align-top text-sm text-gray-600">{t.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">募款高峰期</p>
                  <p className="text-lg font-bold text-green-600">2025年1月</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">支出高峰期</p>
                  <p className="text-lg font-bold text-red-600">2025年7月</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">資金運用效率</p>
                  <p className="text-lg font-bold text-blue-600">100.5%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部說明 */}
        <div className="mt-8 bg-gray-800 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-3">財務透明承諾</h3>
          <p className="text-gray-300 mb-4">
            本團隊承諾所有經費使用完全透明公開，每一筆支出都有詳細記錄與憑證。
            我們珍惜每一分捐款，確保資金完全用於競賽相關用途。
          </p>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <p className="text-sm text-gray-400">
              團隊聯絡方式：belove@mail.tzu.edu.tw | 如有任何疑問歡迎詢問
            </p>
            <p className="text-xs text-gray-500 mt-2">
              此報告由團隊副隊長製作，所有數據真實有效，歡迎查證
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const App = () => {
  return (
    <div>
      <h1>CTZY 預算視覺化</h1>
      <BudgetVisualization />
    </div>
  );
};

export default App;
