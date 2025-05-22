
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { BarChart, LineChart, PieChart } from "recharts";
import { 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Line,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Facebook', engagement: 4000, reach: 2400, value: 40 },
  { name: 'Instagram', engagement: 3000, reach: 1398, value: 30 },
  { name: 'Twitter', engagement: 2000, reach: 9800, value: 20 },
  { name: 'LinkedIn', engagement: 2780, reach: 3908, value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ContentMetrics() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('content.metrics.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('content.metrics.engagementByPlatform')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('content.metrics.reachByPlatform')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="reach" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('content.metrics.audienceDistribution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name}) => name}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('content.metrics.topPerformingContent')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {Array.from({length: 5}).map((_, i) => (
                <li key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs">IMG</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {t('content.metrics.contentTitle')} {i + 1}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('content.metrics.engagement')}: {1000 - i * 100}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
