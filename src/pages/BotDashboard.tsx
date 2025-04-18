
import { useState } from "react";
import { 
  AlertCircle, 
  Bot, 
  Brain, 
  GitMerge, 
  LineChart, 
  ListPlus, 
  Plus, 
  Play, 
  Settings, 
  ShieldAlert 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MarketAnalysis } from "@/components/bot/market-analysis";
import { TradingStrategy } from "@/components/bot/trading-strategy";
import { PerformanceTracker } from "@/components/bot/performance-tracker";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Sample trading strategies
const initialStrategies = [
  {
    id: "strategy-1",
    name: "BTC Momentum",
    active: true,
    description: "Momentum-based strategy using MA crossovers for BTC/USDT",
    pair: "BTC/USDT",
  },
  {
    id: "strategy-2",
    name: "ETH Breakout",
    active: false,
    description: "Volatility breakout strategy for ETH/USDT with RSI filter",
    pair: "ETH/USDT",
  },
  {
    id: "strategy-3",
    name: "SOL Scalping",
    active: false,
    description: "Short-term scalping strategy for SOL/USDT using Bollinger Bands",
    pair: "SOL/USDT",
  }
];

export default function BotDashboard() {
  const [strategies, setStrategies] = useState(initialStrategies);
  const [isGlobalActive, setIsGlobalActive] = useState(false);
  const { toast } = useToast();
  
  // Toggle a specific strategy
  const handleToggleStrategy = (id: string, active: boolean) => {
    setStrategies(prev => 
      prev.map(strategy => 
        strategy.id === id ? { ...strategy, active } : strategy
      )
    );
    
    toast({
      title: active ? "Strategy Activated" : "Strategy Deactivated",
      description: `Strategy has been ${active ? "activated" : "deactivated"} successfully.`,
    });
  };
  
  // Delete a strategy
  const handleDeleteStrategy = (id: string) => {
    setStrategies(prev => prev.filter(strategy => strategy.id !== id));
    
    toast({
      title: "Strategy Deleted",
      description: "The trading strategy has been removed.",
      variant: "destructive",
    });
  };
  
  // Toggle all strategies globally
  const handleGlobalToggle = (active: boolean) => {
    setIsGlobalActive(active);
    setStrategies(prev => 
      prev.map(strategy => ({ ...strategy, active }))
    );
    
    toast({
      title: active ? "Trading Bot Activated" : "Trading Bot Deactivated",
      description: `All strategies have been ${active ? "activated" : "deactivated"}.`,
      variant: active ? "default" : "destructive",
    });
  };
  
  // Add a new strategy
  const handleAddStrategy = () => {
    const newStrategy = {
      id: `strategy-${strategies.length + 1}`,
      name: `New Strategy ${strategies.length + 1}`,
      active: false,
      description: "A new trading strategy",
      pair: "BTC/USDT",
    };
    
    setStrategies(prev => [...prev, newStrategy]);
    
    toast({
      title: "New Strategy Created",
      description: "Configure the strategy settings before activating.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trading Bot</h1>
          <p className="text-muted-foreground">
            Automated trading strategies and bot management
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="gap-2" variant={isGlobalActive ? "destructive" : "default"}>
                {isGlobalActive ? (
                  <>
                    <ShieldAlert className="h-4 w-4" />
                    Stop All Bots
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start Trading
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isGlobalActive ? "Stop all trading bots?" : "Start automated trading?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isGlobalActive 
                    ? "This will immediately stop all active trading strategies and close any open positions according to your risk management settings."
                    : "This will activate all enabled trading strategies. Make sure your risk management settings are properly configured before proceeding."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleGlobalToggle(!isGlobalActive)}
                  className={isGlobalActive ? "bg-destructive hover:bg-destructive/90" : ""}
                >
                  {isGlobalActive ? "Stop All Bots" : "Start Trading"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="outline" className="gap-2" onClick={handleAddStrategy}>
            <ListPlus className="h-4 w-4" />
            New Strategy
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Trading Risk Warning</AlertTitle>
        <AlertDescription>
          Cryptocurrency trading involves significant risk. Always use proper risk management settings and only trade with funds you can afford to lose.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <MarketAnalysis />
        </div>
        
        <div>
          <PerformanceTracker />
        </div>
      </div>
      
      <Tabs defaultValue="strategies" className="mt-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="strategies" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Trading</span> Strategies
          </TabsTrigger>
          <TabsTrigger value="backtest" className="flex items-center gap-2">
            <GitMerge className="h-4 w-4" />
            <span className="hidden sm:inline">Strategy</span> Backtest
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span> Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategies" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Trading Strategies</h2>
            <Button variant="outline" size="sm" onClick={handleAddStrategy}>
              <Plus className="h-4 w-4 mr-2" />
              Add Strategy
            </Button>
          </div>
          
          {strategies.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Strategies Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first trading strategy to start automated trading.
              </p>
              <Button onClick={handleAddStrategy}>
                <Plus className="h-4 w-4 mr-2" />
                Create Strategy
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {strategies.map(strategy => (
                <TradingStrategy
                  key={strategy.id}
                  id={strategy.id}
                  name={strategy.name}
                  active={strategy.active}
                  description={strategy.description}
                  pair={strategy.pair}
                  onToggle={handleToggleStrategy}
                  onDelete={handleDeleteStrategy}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="backtest" className="mt-6">
          <div className="col-span-3 flex items-center justify-center p-12 rounded-lg border bg-card">
            <div className="text-center max-w-md">
              <GitMerge className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Backtest Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                Our advanced backtesting engine is under development. Soon you'll be able to test your strategies against historical data with detailed analytics.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="gap-2" disabled>
                  <LineChart className="h-4 w-4" />
                  Backtesting Engine
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  <Settings className="h-4 w-4" />
                  Test Parameters
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-6">
          <div className="col-span-3 flex items-center justify-center p-12 rounded-lg border bg-card">
            <div className="text-center max-w-md">
              <LineChart className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Performance Logs Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                Detailed performance logs and analytics for your trading strategies will be available here soon.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="gap-2" disabled>
                  <LineChart className="h-4 w-4" />
                  Trading Logs
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  <Settings className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
