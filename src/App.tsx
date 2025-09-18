import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './App.css';
const BudgetVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 收支總覽數據
  const overviewData = [
    { name: '總募款', value: 269000, color: '#10B981' },
    { name: '總支出', value: 270317, color: '#EF4444' },
    { name: '目前餘額', value: -1317, color: '#F59E0B' }
  ];

  // 主要支出分類
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
            <p className="text-3xl font-bold text-green-600">NT$ 269,000</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">總支出金額</h3>
            <p className="text-3xl font-bold text-red-600">NT$ 270,317</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">目前餘額</h3>
            <p className="text-3xl font-bold text-orange-600">-NT$ 1,317</p>
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
                        { name: '募款收入', value: 269000, color: '#10B981' },
                        { name: '實際支出', value: 270317, color: '#EF4444' }
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
                        { name: '募款收入', value: 269000, color: '#10B981' },
                        { name: '實際支出', value: 270317, color: '#EF4444' }
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
                  <span className="text-red-600 font-bold">100.5%</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  團隊非常謹慎使用每一分經費，目前略有超支 NT$1,317，將由團隊自行補足
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
              團隊聯絡方式：[belove@mail.tzu.edu.tw] | 如有任何疑問歡迎詢問
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
