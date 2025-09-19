import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './App.css';
const BudgetVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLedger, setShowLedger] = useState(false);
  const [csvText, setCsvText] = useState('');
  // 直接內嵌：參考你的 CSV / Google Sheet，保留金額字串供 parseMoney() 處理
  const embeddedRaw: Array<Record<string, any>> = [
    { type: '支出', date: '2024/12/31', item: '報名費', amount: 'NT$6,000', party: '', note: '' },
    { type: '收入', date: '2025/1/11', item: '捐贈', amount: 'NT$20,000', party: '法鼓山林師姑', note: 'NT$20,000' },
    { type: '收入', date: '2025/1/11', item: '捐贈', amount: 'NT$30,000', party: '誦丞爸爸', note: 'NT$50,000' },
    { type: '收入', date: '2025/1/14', item: '捐贈', amount: 'NT$40,000', party: '行雲媽媽(旅宿)', note: 'NT$90,000' },
    { type: '收入', date: '2025/1/14', item: '捐贈', amount: 'NT$60,000', party: '行雲家人(材料)', note: 'NT$150,000' },
    { type: '收入', date: '2025/1/14', item: '捐贈', amount: 'NT$50,000', party: '行雲家人(材料)', note: 'NT$200,000' },
    { type: '支出', date: '2025/1/15', item: '住宿訂金', amount: 'NT$10,000', party: '成財老師', note: '' },
    { type: '收入', date: '2025/1/16', item: '捐贈', amount: 'NT$10,000', party: '李校長(車資)', note: '' },
    { type: '收入', date: '2025/1/16', item: '捐贈', amount: 'NT$10,000', party: '李校長', note: '' },
    { type: '支出', date: '2025/1/21', item: '陽明交大集訓計程車費', amount: 'NT$615', party: '尚未結帳（王潔宇410+205）', note: '' },
    { type: '支出', date: '2025/1/22', item: '住宿費尾款', amount: 'NT$36,800', party: '成財老師結帳', note: '' },
    { type: '支出', date: '2025/1/22', item: '陽明交大集訓車票', amount: 'NT$18,482', party: '原佑老師代墊', note: '已收款' },
    { type: '收入', date: '2025/2/13', item: '捐贈', amount: 'NT$2,000', party: '陳軒語、王韻棠', note: '' },
    { type: '支出', date: '2025/2/13', item: '碳纖維材料', amount: 'NT$1,260', party: '大鼻子玻纖材料行', note: '先墊' },
    { type: '支出', date: '2025/2/23', item: '降落傘綁繩', amount: 'NT$90', party: '', note: '已付' },
    { type: '支出', date: '2025/2/25', item: '鉗子(雞眼釘用)', amount: 'NT$249', party: '', note: '已付' },
    { type: '支出', date: '2025/2/25', item: 'PLA線材20卷', amount: 'NT$7,980', party: '原佑代墊', note: '已收款' },
    { type: '支出', date: '2025/3/6', item: '雞眼釘', amount: 'NT$208', party: '', note: '已付' },
    { type: '支出', date: '2025/3/6', item: '傘布(退款)', amount: 'NT$960', party: '', note: '已退款' },
    { type: '支出', date: '2025/3/6', item: '降落傘繩', amount: 'NT$1,005', party: '', note: '已付' },
    { type: '支出', date: '2025/3/11', item: '紙管100cm×4', amount: 'NT$1,270', party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/19', item: '真空幫浦+冷媒管', amount: 'NT$2,199', party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/19', item: '三通控制閥等', amount: 'NT$540', party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/19', item: 'RTM 耗材', amount: 'NT$670', party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/3/20', item: '碳纖維與耗材(第一批)', amount: 'NT$8,800', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/3/25', item: 'DC-DC 9A 300W', amount: 'NT$200', party: '成財蝦皮', note: '' },
    { type: '收入', date: '2025/3/27', item: '捐贈(報名費)', amount: 'NT$6,000', party: '教務處', note: '已核銷' },
    { type: '支出', date: '2025/3/28', item: '樹莓派', amount: 'NT$4,203', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/3/28', item: 'BME280 感測模組', amount: 'NT$420', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/3/28', item: 'LoRa 模組', amount: 'NT$255', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/3/28', item: '洞洞板', amount: 'NT$228', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/4/10', item: '紙管100cm×8', amount: 'NT$2,540', party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/4/16', item: '碳纖維耗材(第二批)', amount: 'NT$6,100', party: '原佑蝦皮', note: '先墊' },
    { type: '支出', date: '2025/4/20', item: '降落傘(淘寶)', amount: 'NT$4,547', party: '', note: '含集運/手續費/關稅' },
    { type: '支出', date: '2025/4/20', item: '降落傘信用卡手續費', amount: 'NT$68', party: '', note: '' },
    { type: '支出', date: '2025/4/20', item: '降落傘集運費', amount: 'NT$135', party: '', note: '' },
    { type: '支出', date: '2025/4/29', item: '降落傘關稅', amount: 'NT$128', party: '', note: '' },
    { type: '支出', date: '2025/4/29', item: '碳纖維布 3K', amount: 'NT$4,600', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/5', item: 'CM5 IO Board', amount: 'NT$1,213', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/5', item: 'GY-91 感測模組', amount: 'NT$486', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/5', item: 'SX1278 LoRa', amount: 'NT$645', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/9', item: '碳纖維耗材(第三批)', amount: 'NT$14,700', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/16', item: '美工刀片', amount: 'NT$132', party: '誦丞', note: '' },
    { type: '支出', date: '2025/5/17', item: '亮彩輕便雨衣', amount: 'NT$232', party: '韻棠', note: '' },
    { type: '支出', date: '2025/5/21', item: 'CM5 散熱片', amount: 'NT$423', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/21', item: 'Camera Module 3 (2組)', amount: 'NT$2,855', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/21', item: '工業縫紉機刀', amount: 'NT$113', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/22', item: '手套/雨衣/切割器', amount: 'NT$555', party: '韻棠', note: '' },
    { type: '支出', date: '2025/5/22', item: '火箭滑軌螺帽', amount: 'NT$1,358', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/23', item: '運動風衣', amount: 'NT$2,226', party: '韻棠', note: '' },
    { type: '支出', date: '2025/5/23', item: '碳纖維布 12K', amount: 'NT$5,050', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/5/27', item: '120W 行動電源', amount: 'NT$438', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/28', item: '隊服訂金', amount: 'NT$5,000', party: '伍角衣版', note: '' },
    { type: '支出', date: '2025/5/28', item: '火車票 (12人)', amount: 'NT$14,832', party: '成財', note: '' },
    { type: '支出', date: '2025/5/31', item: 'Kingston NV3 SSD', amount: 'NT$1,284', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/5/31', item: '攝影模組連接線', amount: 'NT$456', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/6/2', item: 'Anker 165W', amount: 'NT$2,445', party: '成財蝦皮', note: '' },
    { type: '支出', date: '2025/6/5', item: '隊服 20 件', amount: 'NT$3,800', party: '伍角衣版', note: '' },
    { type: '收入', date: '2025/6/10', item: '捐贈', amount: 'NT$10,000', party: '李校長', note: '' },
    { type: '支出', date: '2025/6/12', item: '3M 噴膠', amount: 'NT$526', party: '原佑蝦皮', note: '' },
    { type: '收入', date: '2025/6/13', item: '捐贈', amount: 'NT$20,000', party: '倪益民老師', note: '' },
    { type: '支出', date: '2025/6/13', item: '住宿費訂金', amount: 'NT$10,000', party: '成財', note: '' },
    { type: '支出', date: '2025/6/14', item: '發泡劑', amount: 'NT$649', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/6/14', item: '高速剛洗刀', amount: 'NT$440', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/7', item: '4040 鋁擠架', amount: 'NT$3,530', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/7', item: '不銹鋼引擎還訂製', amount: 'NT$3,028', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/10', item: '紙管 100cm (2根)', amount: 'NT$710', party: '原佑蝦皮', note: '' },
    { type: '支出', date: '2025/7/22', item: '火車票', amount: 'NT$10,740', party: '成財', note: '' },
    { type: '支出', date: '2025/7/22', item: '八木天線', amount: 'NT$2,290', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'LoRa', amount: 'NT$620', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'GY-91 九軸', amount: 'NT$412', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'SMA 2.4G 天線', amount: 'NT$248', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'GY-NEO-6M GPS', amount: 'NT$205', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'GY-NEO-6MV2 GPS', amount: 'NT$300', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'SMA 公轉母', amount: 'NT$263', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: 'CM5 擴充模組', amount: 'NT$920', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: '壓克力盒', amount: 'NT$870', party: '建興師', note: '' },
    { type: '支出', date: '2025/7/22', item: '火箭身貼紙', amount: 'NT$836', party: '家祥(韻棠)', note: '' },
    { type: '支出', date: '2025/7/22', item: '綠茶 x3', amount: 'NT$69', party: '翊丞', note: '' },
    { type: '支出', date: '2025/7/23', item: '強力瞬間膠', amount: 'NT$281', party: '翊丞', note: '' },
    { type: '支出', date: '2025/7/24', item: '墾丁快線去程 (8人)', amount: 'NT$952', party: '阿肥', note: '未付' },
    { type: '支出', date: '2025/7/25', item: '晚餐便當', amount: 'NT$1,260', party: '成財', note: '' },
    { type: '支出', date: '2025/7/26', item: '袖套、噴漆', amount: 'NT$1,137', party: '翊丞', note: '' },
    { type: '支出', date: '2025/7/26', item: '晚餐 PIZZA', amount: 'NT$2,290', party: '政宏', note: '' },
    { type: '支出', date: '2025/7/27', item: '住宿費尾款', amount: 'NT$66,900', party: '成財', note: '' },
    { type: '支出', date: '2025/7/27', item: '晚餐便當', amount: 'NT$1,170', party: '政宏', note: '' },
    { type: '支出', date: '2025/7/31', item: '其他', amount: 'NT$836', party: '韻棠', note: '' },
    { type: '收入', date: '', item: '降落傘傘布退費', amount: 'NT$960', party: '', note: '退款入帳' },
    { type: '收入', date: '', item: '決賽補助', amount: 'NT$20,000', party: '主辦單位', note: '尚未入帳' },
    { type: '支出', date: '', item: '墾丁快線回程', amount: 0, party: '', note: '' },
    { type: '收入', date: '2025/8/11', item: '捐贈', amount: 'NT$10,000', party: '恩慈家長', note: '已入帳' }
  ];

  // 將原始紀錄正規化：amount -> number（含正負）、並重算累計 balance
  const normalizeTransactions = (raw: Array<Record<string, any>>): Array<Record<string, any>> => {
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

  // 將 state 的型別明確化，直接用 embeddedRaw 初始化（已在程式碼內寫好正確帳目）
  const [transactions, setTransactions] = useState<Array<Record<string, any>>>(() => normalizeTransactions(embeddedRaw));

  // 幫助函式：把金額字串（含 NT$, 千分號）轉成數值
  const parseMoney = (s: any): number => {
    if (!s && s !== 0) return 0;
    const normalized = String(s).replace(/[^0-9\-\.\u2212]/g, '').replace('\u2212','-').replace(/,/g, '');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
  };

  // 簡易 CSV 解析器（支援引號內逗號）
  const csvToRows = (text: string): string[][] => {
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
  const parseCSVText = (text: string): Array<Record<string, any>> => {
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
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const text = (ev.target && ev.target.result) ? String(ev.target.result) : '';
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
