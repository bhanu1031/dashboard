import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Download, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [payoutRate, setPayoutRate] = useState(50);
  useEffect(() => {
    const fetchNews = async () => {
      const data = [
        { id: 1, title: 'Tech News', author: 'John Doe', date: '2025-01-02', type: 'news' },
        { id: 2, title: 'AI Updates', author: 'Jane Smith', date: '2025-01-02', type: 'blog' },
      ];
      setArticles(data);
    };
    fetchNews();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = true;
    return matchesSearch && matchesDate;
  });

  const calculatePayout = (articles) => {
    return articles.length * payoutRate;
  };

  const chartData = [
    { name: 'Jan', articles: 20 },
    { name: 'Feb', articles: 30 },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Dashboard</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Filter Dates
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{articles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${calculatePayout(articles)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payout Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={payoutRate}
              onChange={(e) => setPayoutRate(Number(e.target.value))}
              className="w-32"
            />
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Article Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="articles" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Author</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{article.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{article.author}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{article.date}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{article.type}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">${payoutRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/*Buttons*/}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;