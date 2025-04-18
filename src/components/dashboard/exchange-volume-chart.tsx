
import { useState } from "react";
import { ExchangeVolume } from "@/contexts/crypto-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type ExchangeVolumeChartProps = {
  data: ExchangeVolume[];
  className?: string;
};

export function ExchangeVolumeChart({ data, className }: ExchangeVolumeChartProps) {
  const [chartMetric, setChartMetric] = useState<"volume24h" | "change24h" | "pairCount">("volume24h");
  
  // Sort and limit data to top 10 by the selected metric
  const sortedData = [...data]
    .sort((a, b) => 
      chartMetric === "change24h" 
        ? b[chartMetric] - a[chartMetric] 
        : b[chartMetric] - a[chartMetric]
    )
    .slice(0, 10);

  // Format data for the chart
  const chartData = sortedData.map(item => ({
    name: item.exchange,
    value: chartMetric === "volume24h" 
      ? item.volume24h / 1000000 // Convert to millions
      : chartMetric === "change24h"
      ? item.change24h
      : item.pairCount,
    color: 
      chartMetric === "change24h" && item.change24h < 0 
        ? "#ff3d71" 
        : "#1a73e8",
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-2 rounded-md shadow-sm text-sm">
          <p className="font-medium">{label}</p>
          <p className="crypto-mono">
            {chartMetric === "volume24h" 
              ? `$${payload[0].value?.toFixed(1)}M` 
              : chartMetric === "change24h"
              ? `${payload[0].value?.toFixed(2)}%`
              : payload[0].value?.toString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const getYAxisLabel = () => {
    switch (chartMetric) {
      case "volume24h":
        return "Volume (Millions USD)";
      case "change24h":
        return "24h Change (%)";
      case "pairCount":
        return "Number of Pairs";
      default:
        return "";
    }
  };

  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-medium">Exchange Comparison</CardTitle>
          </div>
          <Select 
            value={chartMetric} 
            onValueChange={(value) => setChartMetric(value as any)}
          >
            <SelectTrigger className="h-8 w-[160px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume24h">24h Volume</SelectItem>
              <SelectItem value="change24h">24h Change %</SelectItem>
              <SelectItem value="pairCount">Pair Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Top 10 exchanges by {chartMetric === "volume24h" 
            ? "24-hour trading volume" 
            : chartMetric === "change24h"
            ? "24-hour change percentage"
            : "supported trading pairs"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                domain={[0, 'auto']}
                tickFormatter={(value) => 
                  chartMetric === "volume24h" 
                    ? `$${value}M` 
                    : chartMetric === "change24h"
                    ? `${value}%`
                    : value.toString()
                }
              />
              <YAxis dataKey="name" type="category" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                barSize={20}
                fillOpacity={0.8}
                fill="#1a73e8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
