# GO-BRICS Team Budget Tracker

A premium, interactive React-based financial management dashboard designed for the **GO-BRICS Business Lab Operations Team** to monitor and audit the team's June 2026 budget (Reference: **TASK_O05**).

Developed with high-end dark luxury aesthetics, incorporating neon-green accents, customizable data graphs, print layouts, and spreadsheet exports.

---

## 🚀 Key Features

- **Executive Dashboard**:
  - Key Performance Indicators (KPIs) showing **Total Income** (₹12,400), **Total Expenses** (₹8,240), **Running Balance** (₹4,160), and **Budget Health Status** (On Track).
  - Dynamic `LineChart` visualizing Income vs Expenditure over a 2-week period (June 1 - June 14) with a toggle to switch between **Daily ledger** views and **Cumulative balance** progression.
  - Interactive `PieChart` breaking down operations cost share by categories.
  
- **Income vs Expenditure Ledger**:
  - Full tabular breakdown of Weeks 1 and 2 transactions.
  - Smart search indexing that filters through descriptions and categories.
  - Quick status select filters (All, Income only, Expenses only).
  - High-visibility color-coding showing green side borders for Income and red side borders for Expenses.
  
- **Category Breakdown**:
  - 6 dedicated sub-ledger category cards (Tools, Outreach, Content, Travel, Office Supplies, Miscellaneous).
  - Dynamic visual progress bars depicting percentage utilization of monthly allocations.
  - "🟡 Monitor" threshold flags for categories nearing their budget limit (e.g., Tool Subscriptions at 84%).
  
- **Summary View & Variance Report**:
  - Complete variance analytics table comparing budgeted amounts vs actual spend.
  - Key summary stat metrics highlighting the largest single expense and largest income reward.
  - 3 professional, actionable insight observations.

- **Reports & Downloads**:
  - **Export CSV**: Blob-based spreadsheet export compiling all 20 transaction records.
  - **Print PDF**: Comprehensive print stylesheet overrides that force sequential printing of all tabs onto formatted A4 pages.

---

## 🛠️ Tech Stack

- **Core**: React 19 & JavaScript
- **Styling**: Tailwind CSS v4
- **Typography**: Inter (Google Fonts)
- **Icons**: Lucide React
- **Data Visualization**: Recharts 3
- **Bundler/Server**: Vite 8

---

## 📦 Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Krisshna-16/O05-go-bricks.git
   cd O05-go-bricks
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5174/O05-go-bricks/](http://localhost:5174/O05-go-bricks/) in your browser.*

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📄 Print / Export Instructions

- To save the complete audit report as a PDF, click the **"Download PDF"** button in the header.
- The system uses print media CSS queries to automatically hide UI navigation tabs, format all tables and card grids into black-on-white high contrast A4 layout sheets, and append page breaks sequentially.

---

*Ledger-Ref: TASK_O05 | GO-BRICS Operations Lab | June 2026*
