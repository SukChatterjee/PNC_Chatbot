import React, { useState, useCallback, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { Sidebar as TransparencyCenter } from './components/Sidebar';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Header } from './components/Header';
import { KpiCard } from './components/KpiCard';
import { Tabs } from './components/Tabs';
import { getFinancialAdvice } from './services/geminiService';
import type { Message, XaiData, FinancialData, Tab } from './types';
import { Sender } from './types';
import { initialBotMessage } from './constants';
import { financialData } from './data/financialData';
import { 
  ArrowUpRightIcon, 
  ArrowDownRightIcon, 
  CurrencyDollarIcon, 
  ShieldCheckIcon 
} from './components/icons';


const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [currentXaiData, setCurrentXaiData] = useState<XaiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [data] = useState<FinancialData>(financialData);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  useEffect(() => {
    setConversationHistory([`AI: ${initialBotMessage.text}`]);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: Sender.User,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const updatedHistory = [...conversationHistory, `User: ${text}`];
    setConversationHistory(updatedHistory);

    try {
      const result = await getFinancialAdvice(updatedHistory, data);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: result.recommendation,
        sender: Sender.AI,
        xaiData: result,
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentXaiData(result);
      setConversationHistory(prev => [...prev, `AI: ${result.recommendation}`]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorBotMessage: Message = {
        id: Date.now() + 1,
        text: `I'm sorry, I encountered an error. Please try again. Details: ${errorMessage}`,
        sender: Sender.AI,
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [conversationHistory, data]);

  const handleAlternativeSelect = (alternative: string) => {
    setActiveTab('coach');
    const message = `Let's explore this alternative: "${alternative}"`;
    handleSendMessage(message);
  };

  const kpis = data.kpis;
  // FIX: Explicitly type kpiConfig to prevent TypeScript from widening the 'color' property to 'string'.
  const kpiConfig: {
    kpi: { title: string; value: number; };
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color: 'green' | 'red' | 'blue' | 'purple';
  }[] = [
    { kpi: kpis.monthlyRevenue, icon: ArrowUpRightIcon, color: 'green' },
    { kpi: kpis.monthlyExpenses, icon: ArrowDownRightIcon, color: 'red' },
    { kpi: kpis.netCashFlow, icon: CurrencyDollarIcon, color: 'blue' },
    { kpi: kpis.cashReserves, icon: ShieldCheckIcon, color: 'purple' },
  ];

  return (
    <div className="h-screen bg-slate-100 text-slate-800 font-sans flex flex-col overflow-hidden">
      <div className="container mx-auto p-4 md:p-8 flex-1 flex flex-col min-h-0">
        <Header companyName={data.companyName} lastUpdated={data.lastUpdated} />
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {kpiConfig.map(({kpi, icon, color}) => (
            <KpiCard 
              key={kpi.title}
              title={kpi.title}
              value={kpi.value}
              icon={icon}
              color={color}
            />
          ))}
        </div>
        
        {/* Tabbed Content */}
        <div className="bg-white rounded-2xl shadow-lg p-2 flex-1 flex flex-col min-h-0">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-2 p-4 md:p-6 flex-1 min-h-0">
            {activeTab === 'dashboard' && <AnalyticsDashboard data={data} />}
            {activeTab === 'coach' && (
              <ChatInterface 
                messages={messages} 
                isLoading={isLoading}
                onSendMessage={handleSendMessage} 
              />
            )}
            {activeTab === 'transparency' && (
              <TransparencyCenter 
                xaiData={currentXaiData} 
                onAlternativeSelect={handleAlternativeSelect} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;