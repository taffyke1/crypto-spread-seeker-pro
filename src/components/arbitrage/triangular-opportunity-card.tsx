
import { TriangularOpportunity } from "@/contexts/crypto-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeftRight, 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  Repeat, 
  Triangle
} from "lucide-react";
import { cn } from "@/lib/utils";

type TriangularOpportunityCardProps = {
  opportunity: TriangularOpportunity;
  rank?: number;
  expanded?: boolean;
};

export function TriangularOpportunityCard({
  opportunity,
  rank,
  expanded = false,
}: TriangularOpportunityCardProps) {
  const {
    exchange,
    firstPair,
    secondPair,
    thirdPair,
    profitPercent,
    timestamp,
    path,
    estimatedProfit,
    fees,
    netProfit,
  } = opportunity;

  // Format timestamp
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card 
      className={cn(
        "opportunity-card transition-all",
        expanded ? "col-span-2" : "", 
        rank && rank <= 3 ? "border-primary/20" : "",
        profitPercent >= 1.5 ? "bg-success/5 dark:bg-success/10" : ""
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {rank && (
              <Badge 
                variant="outline" 
                className={cn(
                  "mr-2 h-6 w-6 rounded-full p-0 flex items-center justify-center",
                  rank <= 3 ? "bg-primary/10 text-primary border-primary/30" : ""
                )}
              >
                {rank}
              </Badge>
            )}
            <CardTitle className="text-sm font-medium">
              {exchange} <Triangle className="inline h-3 w-3 mx-1 rotate-90" /> Triangular
            </CardTitle>
          </div>
          <Badge variant={profitPercent >= 1.5 ? "default" : "outline"} className="capitalize">
            {profitPercent.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <ArrowLeftRight className="mr-1.5 h-4 w-4 text-crypto-purple" />
            <span className="font-medium crypto-mono text-xs">{path}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-xs">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span>{formatTimeAgo(timestamp)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs">First Pair</div>
            <div className="font-medium crypto-mono">{firstPair}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs">Second Pair</div>
            <div className="font-medium crypto-mono">{secondPair}</div>
          </div>
          
          {expanded ? (
            <>
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">Third Pair</div>
                <div className="font-medium crypto-mono">{thirdPair}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">Est. Profit</div>
                <div className="font-medium crypto-mono text-crypto-green">${estimatedProfit.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">Fees</div>
                <div className="font-medium crypto-mono text-crypto-red">${fees.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">Net Profit</div>
                <div className="font-medium crypto-mono text-crypto-green">${netProfit.toFixed(2)}</div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">Third Pair</div>
                <div className="font-medium crypto-mono">{thirdPair}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">Net Profit</div>
                <div className="font-medium crypto-mono text-crypto-green">${netProfit.toFixed(2)}</div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {expanded ? (
          <div className="flex w-full justify-between gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <Repeat className="mr-2 h-4 w-4" />
              Backtest
            </Button>
            <Button size="sm" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Execute
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" className="w-full">
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
