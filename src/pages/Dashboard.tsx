
import { useEffect, useState } from "react";
import { useCrypto } from "@/contexts/crypto-context";
import { ArbitrageOpportunityCard } from "@/components/arbitrage/arbitrage-opportunity-card";
import { MarketOverviewCard } from "@/components/dashboard/market-overview-card";
import { ExchangeVolumeChart } from "@/components/dashboard/exchange-volume-chart";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeftRight, 
  BarChart3, 
  DollarSign, 
  GitCompareArrows, 
  LineChart, 
  Percent, 
  RefreshCcw, 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Volume2 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { 
    isLoading, 
    priceData, 
    arbitrageOpportunities, 
    exchangeVolumes, 
    refreshData 
  } = useCrypto();
  
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  // Calculate market overview metrics
  const btcData = priceData.find(item => item.pair === 'BTC/USDT' && item.exchange === 'Binance');
  const ethData = priceData.find(item => item.pair === 'BTC/USDT' && item.exchange === 'Coinbase');
  
  const totalVolume = exchangeVolumes.reduce((acc, item) => acc + item.volume24h, 0);
  const avgChangePercent = priceData.reduce((acc, item) => acc + item.priceChangePercent24h, 0) / priceData.length;
  const totalOpportunities = arbitrageOpportunities.filter(opp => opp.spreadPercent >= 0.5).length;
  
  // Top arbitrage opportunities
  const topOpportunities = arbitrageOpportunities.slice(0, 4);

  // Trigger a refresh
  const handleRefresh = () => {
    refreshData();
    setLastRefreshed(new Date());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time market overview and top arbitrage opportunities
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          className="mt-4 md:mt-0"
          disabled={isLoading}
        >
          <RefreshCcw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
          Refresh Data
        </Button>
      </div>

      <div className="dashboard-grid">
        <MarketOverviewCard
          title="BTC/USDT"
          value={btcData?.price || 38245.67}
          change={btcData?.priceChangePercent24h || 2.4}
          trend={btcData?.priceChangePercent24h && btcData?.priceChangePercent24h > 0 ? "up" : "down"}
          isPrice
          icon={<DollarSign className="h-4 w-4 text-primary" />}
        />
        <MarketOverviewCard
          title="24h Market Change"
          value={avgChangePercent?.toFixed(2) || 1.8}
          change={avgChangePercent || 1.8}
          trend={avgChangePercent > 0 ? "up" : "down"}
          isPercentage
          icon={<Percent className="h-4 w-4 text-primary" />}
        />
        <MarketOverviewCard
          title="Total 24h Volume"
          value={(totalVolume / 1000000000).toFixed(2) + "B"}
          change={5.3}
          trend="up"
          isVolume
          icon={<Volume2 className="h-4 w-4 text-primary" />}
        />
        <MarketOverviewCard
          title="Active Opportunities"
          value={totalOpportunities}
          change={12.5}
          trend="up"
          icon={<Sparkles className="h-4 w-4 text-primary" />}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Top Arbitrage Opportunities</h2>
          <Button variant="outline" size="sm">
            <GitCompareArrows className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>
        <div className="dashboard-grid">
          {topOpportunities.map((opportunity, index) => (
            <ArbitrageOpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
              rank={index + 1}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ExchangeVolumeChart data={exchangeVolumes} />
        
        <div className="space-y-4">
          <div className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Market Trends</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="stats-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Market Sentiment</span>
                <TrendingUp className="h-4 w-4 text-crypto-green" />
              </div>
              <div className="text-2xl font-bold mb-1">Bullish</div>
              <div className="text-xs text-muted-foreground">
                Based on 12/15 bullish indicators
              </div>
            </div>
            <div className="stats-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Volatility</span>
                <TrendingDown className="h-4 w-4 text-crypto-yellow" />
              </div>
              <div className="text-2xl font-bold mb-1">Medium</div>
              <div className="text-xs text-muted-foreground">
                15% lower than last week
              </div>
            </div>
            <div className="stats-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Arbitrage Sentiment</span>
                <ArrowLeftRight className="h-4 w-4 text-crypto-blue" />
              </div>
              <div className="text-2xl font-bold mb-1">Favorable</div>
              <div className="text-xs text-muted-foreground">
                High spread opportunities on altcoins
              </div>
            </div>
            <div className="stats-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Funding Rates</span>
                <BarChart3 className="h-4 w-4 text-crypto-purple" />
              </div>
              <div className="text-2xl font-bold mb-1">Neutral</div>
              <div className="text-xs text-muted-foreground">
                Avg. rate: +0.005% per 8h
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <div>
            Last updated: {lastRefreshed.toLocaleTimeString()}
          </div>
          <div>
            Data refresh rate: 2 seconds
          </div>
        </div>
      </div>
    </div>
  );
}
