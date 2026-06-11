import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Activity, 
  Download, 
  Printer, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Info,
  Calendar,
  FileText,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Hardcoded Transaction Data (Week 1 & Week 2)
const transactionsData = [
  { date: 'Jun 1', desc: 'Opening Balance', category: '—', type: 'Income', amount: 5000, balance: 5000 },
  { date: 'Jun 1', desc: 'Canva Pro Subscription', category: 'Tools', type: 'Expense', amount: -499, balance: 4501 },
  { date: 'Jun 2', desc: 'GBP Reward — T09', category: 'GBP Income', type: 'Income', amount: 1100, balance: 5601 },
  { date: 'Jun 2', desc: 'LinkedIn Premium', category: 'Tools', type: 'Expense', amount: -1601, balance: 4000 },
  { date: 'Jun 3', desc: 'Outreach Travel — Delhi', category: 'Travel', type: 'Expense', amount: -800, balance: 3200 },
  { date: 'Jun 3', desc: 'GBP Reward — T10', category: 'GBP Income', type: 'Income', amount: 1200, balance: 4400 },
  { date: 'Jun 4', desc: 'Printing — Proposal Decks', category: 'Office', type: 'Expense', amount: -450, balance: 3950 },
  { date: 'Jun 4', desc: 'Client Meeting — Cafe', category: 'Travel', type: 'Expense', amount: -400, balance: 3550 },
  { date: 'Jun 5', desc: 'GBP Reward — PP03', category: 'GBP Income', type: 'Income', amount: 1000, balance: 4550 },
  { date: 'Jun 5', desc: 'WhatsApp Business API', category: 'Tools', type: 'Expense', amount: -499, balance: 4051 },
  { date: 'Jun 8', desc: 'GBP Reward — T11', category: 'GBP Income', type: 'Income', amount: 2000, balance: 6051 },
  { date: 'Jun 8', desc: 'Content Shoot — Props', category: 'Content', type: 'Expense', amount: -950, balance: 5101 },
  { date: 'Jun 9', desc: 'Outreach Campaign Costs', category: 'Outreach', type: 'Expense', amount: -1800, balance: 3301 },
  { date: 'Jun 9', desc: 'GBP Reward — C09', category: 'GBP Income', type: 'Income', amount: 1500, balance: 4801 },
  { date: 'Jun 10', desc: 'Zoom Pro Subscription', category: 'Tools', type: 'Expense', amount: -499, balance: 4302 },
  { date: 'Jun 10', desc: 'Video Editing Software', category: 'Content', type: 'Expense', amount: -500, balance: 3802 },
  { date: 'Jun 11', desc: 'GBP Reward — PP04', category: 'GBP Income', type: 'Income', amount: 1700, balance: 5502 },
  { date: 'Jun 11', desc: 'Office Supplies', category: 'Office', type: 'Expense', amount: -450, balance: 5052 },
  { date: 'Jun 12', desc: 'Outreach Travel — Mumbai', category: 'Travel', type: 'Expense', amount: -800, balance: 4252 },
  { date: 'Jun 14', desc: 'GBP Reward — O09', category: 'GBP Income', type: 'Income', amount: 1500, balance: 5752 }
];

// Line Chart Data (realistic 14 days representing the exact trend)
const lineChartData = [
  { date: 'Jun 1', Income: 5000, Expenses: 499, Balance: 4501 },
  { date: 'Jun 2', Income: 1100, Expenses: 1601, Balance: 4000 },
  { date: 'Jun 3', Income: 1200, Expenses: 800, Balance: 4400 },
  { date: 'Jun 4', Income: 0, Expenses: 850, Balance: 3550 },
  { date: 'Jun 5', Income: 1000, Expenses: 499, Balance: 4051 },
  { date: 'Jun 6', Income: 0, Expenses: 0, Balance: 4051 },
  { date: 'Jun 7', Income: 0, Expenses: 0, Balance: 4051 },
  { date: 'Jun 8', Income: 2000, Expenses: 950, Balance: 5101 },
  { date: 'Jun 9', Income: 1500, Expenses: 1800, Balance: 4801 },
  { date: 'Jun 10', Income: 0, Expenses: 999, Balance: 3802 },
  { date: 'Jun 11', Income: 1700, Expenses: 450, Balance: 5052 },
  { date: 'Jun 12', Income: 0, Expenses: 800, Balance: 4252 },
  { date: 'Jun 13', Income: 0, Expenses: 0, Balance: 4252 },
  { date: 'Jun 14', Income: 1500, Expenses: 0, Balance: 5752 }
];

// Pie Chart Data (Category breakdown)
const pieChartData = [
  { name: 'Tool Subscriptions', value: 2100, percentage: '25.5%', color: '#00FF41' },
  { name: 'Outreach Costs', value: 1800, percentage: '21.8%', color: '#00CC33' },
  { name: 'Content Creation', value: 1450, percentage: '17.6%', color: '#009926' },
  { name: 'Travel/Meetings', value: 1200, percentage: '14.6%', color: '#00661A' },
  { name: 'Office Supplies', value: 900, percentage: '10.9%', color: '#00330D' },
  { name: 'Miscellaneous', value: 790, percentage: '9.6%', color: '#00FF41' }
];

const categoryCards = [
  {
    id: 1,
    title: 'Tool Subscriptions',
    spent: 2100,
    budget: 2500,
    status: 'monitor',
    statusText: '🟡 Monitor — approaching budget limit',
    items: ['Canva Pro ₹499', 'LinkedIn ₹1601', 'WhatsApp API ₹499', 'Zoom ₹499']
  },
  {
    id: 2,
    title: 'Outreach Costs',
    spent: 1800,
    budget: 2000,
    status: 'within',
    statusText: '🟢 Within budget',
    items: ['Campaign costs ₹1,800']
  },
  {
    id: 3,
    title: 'Content Creation',
    spent: 1450,
    budget: 2000,
    status: 'within',
    statusText: '🟢 Within budget',
    items: ['Content shoot ₹950', 'Video editing ₹500']
  },
  {
    id: 4,
    title: 'Travel/Meetings',
    spent: 1200,
    budget: 2000,
    status: 'within',
    statusText: '🟢 Within budget',
    items: ['Delhi travel ₹800', 'Mumbai travel ₹800', 'Cafe meeting ₹400']
  },
  {
    id: 5,
    title: 'Office Supplies',
    spent: 900,
    budget: 1000,
    status: 'within',
    statusText: '🟢 Within budget',
    items: ['Printing ₹450', 'Supplies ₹450']
  },
  {
    id: 6,
    title: 'Miscellaneous',
    spent: 790,
    budget: 1000,
    status: 'within',
    statusText: '🟢 Within budget',
    items: ['Various small expenses']
  }
];

const budgetActualData = [
  { category: 'Tools', budget: 2500, actual: 2100, variance: 400, status: '🟢 Under' },
  { category: 'Outreach', budget: 2000, actual: 1800, variance: 200, status: '🟢 Under' },
  { category: 'Content', budget: 2000, actual: 1450, variance: 550, status: '🟢 Under' },
  { category: 'Travel', budget: 2000, actual: 1200, variance: 800, status: '🟢 Under' },
  { category: 'Office', budget: 1000, actual: 900, variance: 100, status: '🟢 Under' },
  { category: 'Misc', budget: 1000, actual: 790, variance: 210, status: '🟢 Under' }
];

const insights = [
  { text: "Team is 21.5% under total budget — strong fiscal discipline", icon: "💰", color: "text-[#00FF41]" },
  { text: "Tool subscriptions at 84% of budget — review before adding new tools", icon: "⚠️", color: "text-yellow-400" },
  { text: "GBP income increasing weekly — on track for 3,000 GBP target", icon: "📈", color: "text-emerald-400" }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [chartMode, setChartMode] = useState('daily'); // daily or cumulative

  // Filtered transactions for Tab 2
  const filteredTransactions = useMemo(() => {
    return transactionsData.filter(t => {
      const matchesSearch = t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || t.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  // CSV Download logic
  const handleDownloadCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (₹)', 'Running Balance (₹)'];
    const rows = transactionsData.map(t => [
      t.date,
      t.desc.replace(/,/g, ' '),
      t.category,
      t.type,
      t.amount,
      t.balance
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `GO-BRICS_TASK_O05_Team_Budget_June_2026.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom tooltips for Recharts
  const CustomLineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-3 rounded-lg shadow-xl text-xs">
          <p className="font-semibold text-gray-400 mb-1">{data.date}, 2026</p>
          <div className="space-y-1">
            <p className="text-[#00FF41]">Income: ₹{data.Income.toLocaleString('en-IN')}</p>
            <p className="text-red-500">Expenses: ₹{data.Expenses.toLocaleString('en-IN')}</p>
            <p className="text-white border-t border-[#2E2E2E] pt-1 mt-1 font-medium">
              Balance: ₹{data.Balance.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-3 rounded-lg shadow-xl text-xs">
          <p className="font-semibold text-white mb-1">{data.name}</p>
          <p className="text-[#00FF41] font-medium">Spent: ₹{data.value.toLocaleString('en-IN')}</p>
          <p className="text-gray-400">Share: {data.payload.percentage}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      {/* HEADER */}
      <header className="border-b border-[#1A1A1A] bg-[#0A0A0A] py-6 px-4 sm:px-6 lg:px-8 print-avoid-break">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse-slow"></span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white glow-green-text print-heading-main">
                GO-BRICS Team Budget Tracker
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono tracking-wider print-heading-sub">
              TASK_O05 | Operations | GO-BRICS Business Lab | June 2026
            </p>
          </div>
          
          {/* Actions - PDF & CSV download */}
          <div className="flex items-center gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#00FF41] hover:text-[#00FF41] transition duration-200 cursor-pointer shadow-sm glow-green-box"
              title="Download PDF / Print Report"
            >
              <Printer className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#00FF41] text-black hover:bg-[#00D837] hover:scale-[1.02] active:scale-[0.98] transition duration-200 cursor-pointer shadow-md"
              title="Download CSV Spreadsheet"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="border-b border-[#1A1A1A] bg-[#0A0A0A] py-2 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'transactions', label: 'Income vs Expenditure' },
            { id: 'categories', label: 'Category Breakdown' },
            { id: 'summary', label: 'Summary View' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-xs font-semibold transition duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-[#00FF41] border border-[#00FF41]/30 font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-[#111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        
        {/* ========================================================
            TAB 1: DASHBOARD
            ======================================================== */}
        <div className={`${activeTab === 'dashboard' ? 'block' : 'hidden'} print-force-block space-y-6 sm:space-y-8`}>
          <h2 className="hidden print:block print-section-title">1. Dashboard Executive Summary</h2>
          
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print-grid-2">
            
            {/* Total Income */}
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 glow-green-box flex items-center justify-between print-card-style">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Income</p>
                <h3 className="text-2xl font-bold mt-1 text-[#00FF41]">₹12,400</h3>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">Approved Funds</span>
              </div>
              <div className="bg-[#00FF41]/10 p-3 rounded-lg border border-[#00FF41]/20">
                <Wallet className="w-6 h-6 text-[#00FF41]" />
              </div>
            </div>

            {/* Total Expenses */}
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 glow-green-box flex items-center justify-between print-card-style">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Expenses</p>
                <h3 className="text-2xl font-bold mt-1 text-red-500">₹8,240</h3>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">Spent (Jun 1-14)</span>
              </div>
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
            </div>

            {/* Running Balance */}
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 glow-green-box flex items-center justify-between print-card-style">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Running Balance</p>
                <h3 className="text-2xl font-bold mt-1 text-white">₹4,160</h3>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">Available Liquid Funds</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Budget Health */}
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 glow-green-box flex items-center justify-between print-card-style">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Budget Health</p>
                <h3 className="text-xl font-bold mt-1 text-emerald-400 flex items-center gap-1.5">
                  ✅ On Track
                </h3>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">Within 66.3% Utilisation</span>
              </div>
              <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 print-grid-1">
            
            {/* Line Chart */}
            <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 sm:p-6 print-card-style print-avoid-break">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    Income vs Expenditure — 2 Weeks
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5">Daily Ledger Metrics (June 1 - 14, 2026)</p>
                </div>
                
                {/* Daily vs Cumulative Toggle */}
                <div className="flex border border-[#2E2E2E] rounded-lg overflow-hidden no-print">
                  <button
                    onClick={() => setChartMode('daily')}
                    className={`px-3 py-1 text-[10px] font-semibold transition ${
                      chartMode === 'daily' 
                        ? 'bg-[#00FF41] text-black font-bold' 
                        : 'bg-black text-gray-400 hover:text-white'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setChartMode('cumulative')}
                    className={`px-3 py-1 text-[10px] font-semibold transition ${
                      chartMode === 'cumulative' 
                        ? 'bg-[#00FF41] text-black font-bold' 
                        : 'bg-black text-gray-400 hover:text-white'
                    }`}
                  >
                    Cumulative
                  </button>
                </div>
              </div>

              <div className="h-64 sm:h-80 w-full font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineChartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888" 
                      tickLine={false} 
                      axisLine={false}
                      dy={8}
                    />
                    <YAxis 
                      stroke="#888" 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(v) => `₹${v}`}
                      dx={-4}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ color: '#fff', fontSize: '10px' }}
                    />
                    <Line
                      name={chartMode === 'cumulative' ? "Cumulative Income" : "Income Amount"}
                      type="monotone"
                      dataKey={chartMode === 'cumulative' ? "Income" : "Income"}
                      stroke="#00FF41"
                      strokeWidth={2.5}
                      dot={{ r: 4, stroke: '#1A1A1A', strokeWidth: 1.5, fill: '#00FF41' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      name={chartMode === 'cumulative' ? "Cumulative Expenses" : "Expense Amount"}
                      type="monotone"
                      dataKey={chartMode === 'cumulative' ? "Expenses" : "Expenses"}
                      stroke="#EF4444"
                      strokeWidth={2.5}
                      dot={{ r: 4, stroke: '#1A1A1A', strokeWidth: 1.5, fill: '#EF4444' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="lg:col-span-4 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 sm:p-6 print-card-style print-avoid-break">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide mb-1">
                Expense Breakdown by Category
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-mono mb-4">Operations Cost Share (%)</p>

              <div className="h-48 sm:h-52 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legends list */}
              <div className="space-y-1.5 mt-3 max-h-48 overflow-y-auto pr-1">
                {pieChartData.map((category, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: category.color }}></span>
                      <span className="text-gray-300 truncate font-sans">{category.name}</span>
                    </div>
                    <span className="font-mono text-gray-400 flex-shrink-0 ml-2">
                      ₹{category.value.toLocaleString('en-IN')} <span className="text-[10px] text-gray-500">({category.percentage})</span>
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================
            TAB 2: INCOME vs EXPENDITURE
            ======================================================== */}
        <div className={`${activeTab === 'transactions' ? 'block' : 'hidden'} print-force-block space-y-6`}>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print-avoid-break">
            <div>
              <h2 className="text-lg font-bold tracking-tight glow-green-text print-section-title">
                Income & Expenditure Ledger
              </h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5 print-heading-sub">
                Complete transactional breakdown for Operations (Weeks 1 & 2)
              </p>
            </div>
            
            {/* Filters (Search & Type Select) */}
            <div className="flex flex-wrap items-center gap-3 no-print">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search description or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] text-white focus:outline-none focus:border-[#00FF41] placeholder-gray-500"
                />
              </div>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] text-white focus:outline-none focus:border-[#00FF41] cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Income">Income only</option>
                <option value="Expense">Expenses only</option>
              </select>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl overflow-hidden print-card-style print-avoid-break shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2E2E2E] bg-black/40 text-gray-300 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold">Description</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Type</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Amount</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E2E2E] font-sans">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx, index) => {
                      const isIncome = tx.type === 'Income';
                      return (
                        <tr 
                          key={index} 
                          className={`transition duration-150 ${
                            isIncome 
                              ? 'bg-emerald-950/5 hover:bg-emerald-950/15 border-l-2 border-l-[#00FF41]' 
                              : 'bg-red-950/5 hover:bg-red-950/15 border-l-2 border-l-red-500'
                          }`}
                        >
                          <td className="py-3.5 px-4 font-mono text-gray-400 whitespace-nowrap">{tx.date}</td>
                          <td className="py-3.5 px-4 font-medium text-white">{tx.desc}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2A2A2A] text-gray-300 border border-[#3E3E3E]">
                              {tx.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 font-semibold text-[10px] uppercase ${
                              isIncome ? 'text-[#00FF41]' : 'text-red-500'
                            }`}>
                              {isIncome ? (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF41]"></span>
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                              )}
                              {tx.type}
                            </span>
                          </td>
                          <td className={`py-3.5 px-4 text-right font-mono font-bold ${
                            isIncome ? 'text-[#00FF41]' : 'text-red-400'
                          }`}>
                            {isIncome ? '+' : ''}₹{tx.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-gray-300 font-medium">
                            ₹{tx.balance.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500 font-mono">
                        No transactions found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer Stats Summary */}
            <div className="bg-black/30 px-6 py-4 border-t border-[#2E2E2E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-400 no-print">
              <div>
                Showing <span className="text-white font-bold">{filteredTransactions.length}</span> of {transactionsData.length} entries
              </div>
              <div className="flex gap-4">
                <div>
                  Filtered Expenses: <span className="text-red-400 font-bold">₹{filteredTransactions.reduce((acc, curr) => curr.type === 'Expense' ? acc + Math.abs(curr.amount) : acc, 0).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  Filtered Income: <span className="text-[#00FF41] font-bold">₹{filteredTransactions.reduce((acc, curr) => curr.type === 'Income' ? acc + curr.amount : acc, 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            TAB 3: CATEGORY BREAKDOWN
            ======================================================== */}
        <div className={`${activeTab === 'categories' ? 'block' : 'hidden'} print-force-block space-y-6`}>
          <div>
            <h2 className="text-lg font-bold tracking-tight glow-green-text print-section-title">
              Operations Spending by Category
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5 print-heading-sub">
              Detailed tracking of budget allocations vs actual expenditures
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print-grid-2">
            {categoryCards.map((card) => {
              const utilPercentage = ((card.spent / card.budget) * 100).toFixed(1);
              const isWarning = card.status === 'monitor';
              
              return (
                <div 
                  key={card.id} 
                  className={`bg-[#1A1A1A] border rounded-xl p-5 flex flex-col justify-between glow-green-box print-card-style print-avoid-break ${
                    isWarning ? 'border-yellow-500/30 hover:border-yellow-400' : 'border-[#2E2E2E]'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-bold text-sm text-white">{card.title}</h3>
                      <span className={`px-2 py-0.5 text-[9px] font-bold font-mono rounded ${
                        isWarning ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {utilPercentage}% Spent
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-black/50 rounded-full h-1.5 mb-4 border border-[#2E2E2E]">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWarning ? 'bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.4)]' : 'bg-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.4)]'
                        }`} 
                        style={{ width: `${Math.min(Number(utilPercentage), 100)}%` }}
                      ></div>
                    </div>

                    {/* Cost stats */}
                    <div className="flex justify-between items-center text-xs font-mono mb-4 text-gray-400">
                      <div>
                        Spent: <span className="text-white font-bold">₹{card.spent.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        Budget: <span className="text-gray-300">₹{card.budget.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Item list */}
                    <div className="space-y-1.5 border-t border-[#2E2E2E]/60 pt-3 mb-4">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Sub-Ledger Details</p>
                      {card.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-1.5 text-xs text-gray-300">
                          <span className="text-[#00FF41] font-mono text-[10px]">&gt;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status footer */}
                  <div className={`mt-auto text-xs font-mono font-medium border-t border-[#2E2E2E] pt-3 flex items-center gap-1.5 ${
                    isWarning ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {isWarning ? (
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    )}
                    <span className="truncate">{card.statusText}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            TAB 4: SUMMARY VIEW
            ======================================================== */}
        <div className={`${activeTab === 'summary' ? 'block' : 'hidden'} print-force-block space-y-6 sm:space-y-8`}>
          
          <div className="print-avoid-break">
            <h2 className="text-lg font-bold tracking-tight glow-green-text print-section-title">
              Operations Audit & Summary
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5 print-heading-sub">
              Comprehensive performance logs, variance report, and audit logs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 print-grid-1">
            
            {/* Column left - Summary card & Highlights */}
            <div className="lg:col-span-5 space-y-6 print-grid-1">
              
              {/* Summary Dashboard Card */}
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 glow-green-box print-card-style print-avoid-break">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide border-b border-[#2E2E2E] pb-3 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00FF41]" />
                  <span>Audit Summary Ledger</span>
                </h3>
                
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-[#2E2E2E]/60 pb-2">
                    <span className="text-gray-400">Ledger Period</span>
                    <span className="text-white font-semibold">June 1-14, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2E2E2E]/60 pb-2">
                    <span className="text-gray-400">Total Income</span>
                    <span className="text-[#00FF41] font-bold">₹12,400</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2E2E2E]/60 pb-2">
                    <span className="text-gray-400">Total Expenses</span>
                    <span className="text-red-400 font-bold">₹8,240</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2E2E2E]/60 pb-2">
                    <span className="text-gray-400">Net Surplus</span>
                    <span className="text-[#00FF41] font-bold">₹4,160</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2E2E2E]/60 pb-2">
                    <span className="text-gray-400">Budget Utilisation</span>
                    <span className="text-white font-bold">66.3%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2E2E2E]/60 pb-2">
                    <span className="text-gray-400">Largest Single Expense</span>
                    <span className="text-red-400 font-semibold text-right">LinkedIn Premium (₹1,601)</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-400">Largest Single Income</span>
                    <span className="text-[#00FF41] font-semibold text-right">GBP Reward T11 (₹2,000)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Print/Export (Repeated for convenience) */}
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 glow-green-box no-print print-avoid-break">
                <h3 className="font-bold text-xs text-white uppercase tracking-wider mb-3">Download Reports</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold border border-[#2E2E2E] rounded-lg text-white hover:text-[#00FF41] hover:border-[#00FF41] transition duration-200 cursor-pointer shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Report PDF</span>
                  </button>
                  <button
                    onClick={handleDownloadCSV}
                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-[#00FF41] text-black hover:bg-[#00D837] rounded-lg transition duration-200 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Column right - Budget vs Actual & Insights */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Budget vs Actual Variance Table */}
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 sm:p-6 glow-green-box print-card-style print-avoid-break">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide mb-4">
                  Budget vs Actual Variance Report
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#2E2E2E] bg-black/40 text-gray-400 font-mono text-[10px] uppercase">
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3 text-right">Budget</th>
                        <th className="py-2.5 px-3 text-right">Actual Spent</th>
                        <th className="py-2.5 px-3 text-right">Variance</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E2E2E]/60 font-mono">
                      {budgetActualData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-black/20 text-gray-300">
                          <td className="py-2.5 px-3 font-sans text-white font-medium">{row.category}</td>
                          <td className="py-2.5 px-3 text-right">₹{row.budget.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right">₹{row.actual.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right text-[#00FF41] font-bold">
                            +₹{row.variance.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">{row.status}</td>
                        </tr>
                      ))}
                      {/* Total Row */}
                      <tr className="font-bold bg-black/50 text-white border-t border-[#2E2E2E]">
                        <td className="py-3 px-3 font-sans uppercase">TOTAL</td>
                        <td className="py-3 px-3 text-right">₹10,500</td>
                        <td className="py-3 px-3 text-right text-red-400">₹8,240</td>
                        <td className="py-3 px-3 text-right text-[#00FF41] font-bold">
                          +₹2,260
                        </td>
                        <td className="py-3 px-3 text-center text-[#00FF41]">🟢 Under</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Insights Section */}
              <div className="space-y-3 print-avoid-break">
                <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider font-mono px-1">
                  Ops Audit Observations
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {insights.map((insight, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex items-center gap-3 glow-green-box print-card-style"
                    >
                      <span className="text-xl flex-shrink-0" role="img" aria-hidden="true">
                        {insight.icon}
                      </span>
                      <p className="text-xs text-gray-200 leading-relaxed font-medium">
                        {insight.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1A1A1A] bg-[#0A0A0A] py-6 px-4 text-center text-[10px] text-gray-500 font-mono mt-auto no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 GO-BRICS Business Lab. All rights reserved.</p>
          <p className="text-gray-600">Operations Team Ledger Ledger-Ref: TASK_O05</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
