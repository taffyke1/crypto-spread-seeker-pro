
import { MarketAnalysis } from "@/components/bot/market-analysis";

export default function MarketAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Market Analysis</h1>
          <p className="text-muted-foreground">
            Technical indicators and market sentiment analysis
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <MarketAnalysis />
      </div>
    </div>
  );
}
