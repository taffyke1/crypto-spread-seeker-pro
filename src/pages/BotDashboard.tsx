
import { Button } from "@/components/ui/button";
import { Bot, Code, GitMerge, LineChart, Settings } from "lucide-react";

export default function BotDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trading Bot</h1>
          <p className="text-muted-foreground">
            Automated trading strategies and bot management
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="col-span-3 flex items-center justify-center p-12 rounded-lg border bg-card">
          <div className="text-center max-w-md">
            <Bot className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bot Dashboard Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              We're currently developing the trading bot functionality with automated strategy building, 
              risk management settings, and performance analytics.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                Trading Strategies
              </Button>
              <Button variant="outline" className="gap-2">
                <LineChart className="h-4 w-4" />
                Performance
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline" className="gap-2">
                <GitMerge className="h-4 w-4" />
                Backtest
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
