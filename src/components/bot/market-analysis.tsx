
import { useState, useEffect } from "react";
import { 
  ArrowDownFromLine, 
  ArrowUpFromLine, 
  ChevronDown, 
  ChevronUp,
  LineChart,
  Percent,
  RefreshCcw,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrypto } from "@/contexts/crypto-context";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Generate mock price data
const generateMockPriceData = (length = 30, volatility = 0.01) => {
  const basePrice = 40000 + Math.random() * 2000;
  return Array.from({ length }, (_, i) => {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - (length - i));
    
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const price = basePrice * (1 + randomChange * i);
    
    return {
      timestamp: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Math.round(price * 100) / 100,
      volume: Math.round(Math.random() * 10000)
    };
  });
};

export function MarketAnalysis() {
  const { priceData, selectedPair, setSelectedPair } = useCrypto();
  const [timeframe, setTimeframe] = useState("15m");
  const [chartData, setChartData] = useState(generateMockPriceData());
  const [isLoading, setIsLoading] = useState(false);
  
  // Find current price data for selected pair
  const currentPriceData = priceData.find(item => item.pair === selectedPair && item.exchange === 'Binance');
  
  // Calculate key metrics
  const lastPrice = currentPriceData?.price || chartData[chartData.length - 1].price;
  const priceChange = currentPriceData?.priceChangePercent24h || 2.34;
  const volume24h = currentPriceData?.volume24h || 430500000;
  const high24h = currentPriceData?.high24h || lastPrice * 1.05;
  const low24h = currentPriceData?.low24h || lastPrice * 0.95;
  
  // Simulate refreshing chart data
  const refreshChartData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateMockPriceData());
      setIsLoading(false);
    }, 800);
  };
  
  // Refresh chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newPoint = {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: prev[prev.length - 1].price * (1 + (Math.random() - 0.5) * 0.01),
          volume: Math.round(Math.random() * 10000)
        };
        return [...prev.slice(1), newPoint];
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update chart data when pair changes
  useEffect(() => {
    refreshChartData();
  }, [selectedPair, timeframe]);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Market Analysis</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedPair} onValueChange={setSelectedPair}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
              <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
              <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
              <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
              <SelectItem value="XRP/USDT">XRP/USDT</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="4h">4h</SelectItem>
              <SelectItem value="1d">1d</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={refreshChartData}
            disabled={isLoading}
          >
            <RefreshCcw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="stats-card">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Price</span>
              {priceChange > 0 ? (
                <ChevronUp className="h-4 w-4 text-green-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="text-lg font-bold">${lastPrice.toLocaleString()}</div>
            <div className={cn(
              "text-xs flex items-center",
              priceChange > 0 ? "text-green-500" : "text-red-500"
            )}>
              {priceChange > 0 ? <ArrowUpFromLine className="h-3 w-3 mr-1" /> : <ArrowDownFromLine className="h-3 w-3 mr-1" />}
              {Math.abs(priceChange).toFixed(2)}%
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">24h Volume</span>
              <Volume2 className="h-4 w-4 text-primary" />
            </div>
            <div className="text-lg font-bold">${(volume24h / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-muted-foreground">
              {(volume24h / lastPrice / 1000).toFixed(2)}K coins
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">24h High</span>
              <ArrowUpFromLine className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-lg font-bold">${high24h.toLocaleString()}</div>
            <div className="text-xs text-green-500">
              +{((high24h - lastPrice) / lastPrice * 100).toFixed(2)}%
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">24h Low</span>
              <ArrowDownFromLine className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-lg font-bold">${low24h.toLocaleString()}</div>
            <div className="text-xs text-red-500">
              {((low24h - lastPrice) / lastPrice * 100).toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div className="h-[300px] mb-4">
          <ChartContainer 
            config={{ 
              price: { theme: { dark: '#22c55e', light: '#22c55e' } } 
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="timestamp" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  minTickGap={30}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  dataKey="price"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  domain={['auto', 'auto']}
                  style={{ fontSize: '12px' }}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => `$${Number(value).toLocaleString()}`} 
                    />
                  } 
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center space-x-2 mb-2">
              <LineChart className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Technical Indicators</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">RSI (14)</span>
                <span className={cn(
                  "text-sm font-medium",
                  priceChange > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {42 + Math.floor(Math.random() * 30)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MACD</span>
                <span className={cn(
                  "text-sm font-medium",
                  priceChange > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {priceChange > 0 ? "Bullish" : "Bearish"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MA (50/200)</span>
                <span className="text-sm font-medium text-green-500">
                  Crossover
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bollinger Bands</span>
                <span className="text-sm font-medium text-muted-foreground">
                  Neutral
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center space-x-2 mb-2">
              <Percent className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Market Sentiment</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fear & Greed</span>
                <span className="text-sm font-medium text-yellow-500">
                  Neutral (54)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Long/Short Ratio</span>
                <span className="text-sm font-medium text-green-500">
                  1.45 (Bullish)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Funding Rate</span>
                <span className="text-sm font-medium text-red-500">
                  -0.003%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Volume</span>
                <span className="text-sm font-medium text-green-500">
                  High
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
