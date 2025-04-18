
import { useState } from "react";
import { MarketAnalysis } from "@/components/bot/market-analysis";
import { AlertSystem } from "@/components/bot/alert-system";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellDot, LayoutGrid, LineChart, TrendingUp } from "lucide-react";

export default function MarketAnalysisPage() {
  const [activeTab, setActiveTab] = useState<string>("analysis");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Market Analysis</h1>
          <p className="text-muted-foreground">
            Technical indicators and market sentiment analysis
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full md:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2 bg-secondary/30">
              <TabsTrigger value="analysis" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1">
                <BellDot className="h-4 w-4" />
                <span>Alerts</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6">
        {activeTab === "analysis" ? (
          <MarketAnalysis />
        ) : (
          <AlertSystem />
        )}
      </div>
    </div>
  );
}
