
import { useState, useEffect } from "react";
import { 
  ArbitrageOpportunity, 
  Exchange, 
  useCrypto 
} from "@/contexts/crypto-context";
import { ArbitrageOpportunityCard } from "@/components/arbitrage/arbitrage-opportunity-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ArrowDownUp, 
  Bell, 
  Filter, 
  LayoutGrid, 
  List, 
  RefreshCcw, 
  Search, 
  SlidersHorizontal, 
  SortAsc, 
  SortDesc 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DirectArbitrage() {
  const { isLoading, arbitrageOpportunities, exchanges, refreshData } = useCrypto();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  // Filter and sorting state
  const [filteredOpportunities, setFilteredOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minSpread, setMinSpread] = useState(0.5);
  const [sortBy, setSortBy] = useState<"spreadPercent" | "volume24h" | "timestamp">("spreadPercent");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFromExchange, setSelectedFromExchange] = useState<Exchange | "all">("all");
  const [selectedToExchange, setSelectedToExchange] = useState<Exchange | "all">("all");
  const [expandedOpportunity, setExpandedOpportunity] = useState<string | null>(null);

  // Handle search and filtering
  useEffect(() => {
    let filtered = [...arbitrageOpportunities];
    
    // Apply min spread filter
    filtered = filtered.filter(opp => opp.spreadPercent >= minSpread);
    
    // Apply exchange filters
    if (selectedFromExchange !== "all") {
      filtered = filtered.filter(opp => opp.fromExchange === selectedFromExchange);
    }
    
    if (selectedToExchange !== "all") {
      filtered = filtered.filter(opp => opp.toExchange === selectedToExchange);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        opp => 
          opp.pair.toLowerCase().includes(query) ||
          opp.fromExchange.toLowerCase().includes(query) ||
          opp.toExchange.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const factor = sortOrder === "asc" ? 1 : -1;
      
      if (sortBy === "spreadPercent") {
        return (a.spreadPercent - b.spreadPercent) * factor;
      }
      
      if (sortBy === "volume24h") {
        return (a.volume24h - b.volume24h) * factor;
      }
      
      // sort by timestamp (newest first by default)
      return (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) * factor;
    });
    
    setFilteredOpportunities(filtered);
  }, [
    arbitrageOpportunities, 
    searchQuery, 
    minSpread, 
    sortBy, 
    sortOrder, 
    selectedFromExchange, 
    selectedToExchange
  ]);

  // Handle refresh
  const handleRefresh = () => {
    refreshData();
    setLastRefreshed(new Date());
  };

  // Toggle expanded opportunity
  const toggleExpandOpportunity = (id: string) => {
    setExpandedOpportunity(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Direct Arbitrage</h1>
          <p className="text-muted-foreground">
            Monitor cross-exchange price differences in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleRefresh} 
            disabled={isLoading}
          >
            <RefreshCcw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Arbitrage Opportunities</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode("grid")}
                  className={cn(viewMode === "grid" ? "bg-muted" : "")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode("list")}
                  className={cn(viewMode === "list" ? "bg-muted" : "")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search pairs or exchanges..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spreadPercent">Spread %</SelectItem>
                  <SelectItem value="volume24h">Volume (24h)</SelectItem>
                  <SelectItem value="timestamp">Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredOpportunities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ArrowDownUp className="h-8 w-8 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No matching opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or refresh the data
                </p>
              </div>
            ) : (
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" 
                  : "space-y-4"
              )}>
                {filteredOpportunities.map((opportunity, index) => (
                  <div 
                    key={opportunity.id} 
                    onClick={() => toggleExpandOpportunity(opportunity.id)}
                    className="cursor-pointer"
                  >
                    <ArbitrageOpportunityCard 
                      opportunity={opportunity} 
                      rank={index + 1}
                      expanded={expandedOpportunity === opportunity.id}
                    />
                  </div>
                ))}
              </div>
            )}
            {filteredOpportunities.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Showing {filteredOpportunities.length} of {arbitrageOpportunities.length} opportunities
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </CardTitle>
            <CardDescription>Refine arbitrage opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Minimum Spread</label>
                <span className="text-sm font-mono">{minSpread.toFixed(1)}%</span>
              </div>
              <Slider
                value={[minSpread]}
                min={0}
                max={5}
                step={0.1}
                onValueChange={(values) => setMinSpread(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>5%</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">From Exchange</label>
              <Select 
                value={selectedFromExchange.toString()} 
                onValueChange={(value) => setSelectedFromExchange(value as Exchange | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All exchanges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exchanges</SelectItem>
                  {exchanges.map((exchange) => (
                    <SelectItem key={exchange} value={exchange}>
                      {exchange}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Exchange</label>
              <Select 
                value={selectedToExchange.toString()} 
                onValueChange={(value) => setSelectedToExchange(value as Exchange | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All exchanges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exchanges</SelectItem>
                  {exchanges.map((exchange) => (
                    <SelectItem key={exchange} value={exchange}>
                      {exchange}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
              <Button variant="secondary" size="sm" className="w-full gap-2">
                <Bell className="h-4 w-4" />
                <span>Set Alert</span>
              </Button>
            </div>
          </CardContent>
        </Card>
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
