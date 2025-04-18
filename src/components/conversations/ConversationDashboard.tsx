
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Activity, Users, MessageSquare, CheckCheck } from "lucide-react";
import { Conversation, Channel } from "@/types/conversations";

interface ConversationDashboardProps {
  conversations: Conversation[];
}

const ConversationDashboard = ({ conversations }: ConversationDashboardProps) => {
  // Calculate metrics
  const totalConversations = conversations.length;
  const resolvedConversations = conversations.filter(c => c.status === "resolved").length;
  const pendingConversations = conversations.filter(c => c.status === "pending").length;
  const activeConversations = conversations.filter(c => c.status === "active").length;
  
  // Calculate response metrics
  const averageResponseTime = "15 min";
  const resolutionRate = `${Math.round((resolvedConversations / totalConversations) * 100)}%`;

  // Channel distribution
  const channelCounts: Record<Channel, number> = {
    whatsapp: 0,
    facebook: 0,
    instagram: 0,
    telegram: 0
  };
  
  conversations.forEach(conv => {
    channelCounts[conv.channel] += 1;
  });

  return (
    <div className="p-6 overflow-auto h-full">
      <h1 className="text-2xl font-semibold mb-6">Dashboard de Conversaciones</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversaciones Totales</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversations}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.round(totalConversations * 0.05)} desde ayer
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversaciones Activas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeConversations}</div>
            <p className="text-xs text-muted-foreground">
              {activeConversations > pendingConversations ? '+' : '-'}
              {Math.abs(activeConversations - pendingConversations)} vs pendientes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <CheckCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              -2 min desde la semana pasada
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Resolución</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolutionRate}</div>
            <p className="text-xs text-muted-foreground">
              +5% desde el mes pasado
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Canal</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <PieChart className="h-32 w-32 text-muted-foreground mb-4" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-sm">WhatsApp</div>
                    <div className="text-sm font-medium">{channelCounts.whatsapp}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-sm">Facebook</div>
                    <div className="text-sm font-medium">{channelCounts.facebook}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-sm">Instagram</div>
                    <div className="text-sm font-medium">{channelCounts.instagram}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-sm">Telegram</div>
                    <div className="text-sm font-medium">{channelCounts.telegram}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversaciones por Día</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <BarChart className="h-32 w-64 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversationDashboard;
