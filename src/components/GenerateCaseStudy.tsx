
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileBarChart, TrendingUp, PieChart as PieChartIcon, Download, Sparkles, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const chartData = [
  { month: 'Jan', cases: 45, resolved: 38, revenue: 12500 },
  { month: 'Feb', cases: 52, resolved: 44, revenue: 15200 },
  { month: 'Mar', cases: 38, resolved: 35, revenue: 11800 },
  { month: 'Apr', cases: 61, resolved: 48, revenue: 18900 },
  { month: 'May', cases: 55, resolved: 52, revenue: 16750 },
  { month: 'Jun', cases: 48, resolved: 45, revenue: 14200 }
];

const pieData = [
  { name: 'Resolved', value: 68, color: '#10b981' },
  { name: 'Pending', value: 24, color: '#f59e0b' },
  { name: 'Escalated', value: 8, color: '#ef4444' }
];

const chartConfig = {
  cases: {
    label: "Total Cases",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-3))",
  }
};

const GenerateCaseStudy: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20">
        <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-950/30 dark:to-cyan-950/30 border-b border-white/30 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <FileBarChart className="text-white h-5 w-5" />
              </div>
              Case Study Analytics
            </CardTitle>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 rounded-xl"
            >
              {isGenerating ? (
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl border border-violet-200/30 dark:border-violet-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Total Cases</span>
              </div>
              <div className="text-2xl font-bold text-violet-700 dark:text-violet-300">299</div>
              <Badge className="mt-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                +12% this month
              </Badge>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/30 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Resolution Rate</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">89.2%</div>
              <Badge className="mt-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                +5.3% improved
              </Badge>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200/30 dark:border-amber-800/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Avg Recovery</span>
              </div>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">$1,247</div>
              <Badge className="mt-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                +8.1% increase
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/20">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-white/30 dark:border-slate-700/50">
            <CardTitle className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Monthly Case Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="cases" fill="url(#caseGradient)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="url(#resolvedGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="caseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20">
          <CardHeader className="pb-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-white/30 dark:border-slate-700/50">
            <CardTitle className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
              <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Case Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateCaseStudy;
