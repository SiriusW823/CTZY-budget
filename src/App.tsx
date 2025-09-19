import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './App.css';
const BudgetVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLedger, setShowLedger] = useState(false);

  // 逐筆帳目（來源：你提供的 Excel 內容）
  const transactions = [
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

  // 自動計算統計數字
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  // 使用者指定的目前餘額（覆寫 transactions 的自動計算）
  const currentBalance = -1317;

  // 使用率與格式化工具
  const usageRate = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  const formatCurrency = (v: number) => (v < 0 ? `-NT$ ${Math.abs(v).toLocaleString()}` : `NT$ ${v.toLocaleString()}`);

  const overviewData = [
    { name: '總募款', value: totalIncome, color: '#10B981' },
    { name: '總支出', value: totalExpense, color: '#EF4444' },
    { name: '目前餘額', value: currentBalance, color: currentBalance >= 0 ? '#10B981' : '#F59E0B' }
  ];

  // 主要支出分類（提供給「支出明細」圓餅圖與清單）
  const expenseCategories = [
    { name: '住宿費用', value: 113700, percentage: 42.1, color: '#3B82F6' },
    { name: '材料費用', value: 58247, percentage: 21.5, color: '#10B981' },
    { name: '交通費用', value: 45524, percentage: 16.8, color: '#F59E0B' },
    { name: '電子設備', value: 17861, percentage: 6.6, color: '#8B5CF6' },
    { name: '隊服製作', value: 8800, percentage: 3.3, color: '#EF4444' },
    { name: '報名費用', value: 6000, percentage: 2.2, color: '#06B6D4' },
    { name: '其他雜費', value: 20185, percentage: 7.5, color: '#6B7280' }
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
              {formatCurrency(currentBalance)}
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
                  <span className={`${usageRate >= 100 ? 'text-red-600' : 'text-green-600'} font-bold`}>{usageRate.toFixed(1)}%</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  目前結餘 {formatCurrency(currentBalance)}。感謝所有捐款人的支持！
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
                      {transactions.map((t, idx) => (
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
                          <td className="p-2 text-right align-top">NT${(t.balance ?? '').toLocaleString()}</td>
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
                  <p className="text-lg font-bold text-blue-600">{usageRate.toFixed(1)}%</p>
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
