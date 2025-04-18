
import { useState } from "react";
import { 
  ArrowDown, 
  ArrowUp, 
  ChevronDown, 
  LineChart, 
  Settings, 
  Sliders, 
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from "@/components/ui/accordion";

type TradingStrategyProps = {
  id: string;
  name: string;
  active: boolean;
  description: string;
  pair: string;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
};

export function TradingStrategy({
  id,
  name,
  active,
  description,
  pair,
  onToggle,
  onDelete
}: TradingStrategyProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-5 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`h-3 w-3 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`} />
          <h3 className="font-medium text-lg">{name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={active} 
            onCheckedChange={(checked) => onToggle(id, checked)}
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onDelete(id)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span className="bg-secondary px-2 py-1 rounded">{pair}</span>
        <span className="px-2 py-1">Entry: {active ? "Bull crossover" : "Manual"}</span>
        <span className="px-2 py-1">Exit: Take-profit 3%</span>
      </div>
      
      <div className="mt-5">
        <Button 
          variant="ghost" 
          className="flex items-center w-full justify-between p-0 h-auto"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="text-sm font-normal text-muted-foreground">{description}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "transform rotate-180" : ""}`} />
        </Button>
        
        {expanded && (
          <div className="mt-4 grid gap-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="entry">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <ArrowDown className="h-4 w-4 mr-2 text-primary" />
                    Entry Conditions
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Strategy Type</span>
                      <Select defaultValue="crossover">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Strategy Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crossover">MA Crossover</SelectItem>
                          <SelectItem value="breakout">Breakout</SelectItem>
                          <SelectItem value="rsi">RSI</SelectItem>
                          <SelectItem value="volume">Volume Profile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time Frame</span>
                      <Select defaultValue="15m">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time Frame" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1 minute</SelectItem>
                          <SelectItem value="5m">5 minutes</SelectItem>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="4h">4 hours</SelectItem>
                          <SelectItem value="1d">1 day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="exit">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 mr-2 text-primary" />
                    Exit Conditions
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Take Profit</span>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Take Profit %" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1%</SelectItem>
                          <SelectItem value="2">2%</SelectItem>
                          <SelectItem value="3">3%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Stop Loss</span>
                      <Select defaultValue="2">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Stop Loss %" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1%</SelectItem>
                          <SelectItem value="2">2%</SelectItem>
                          <SelectItem value="3">3%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="risk">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Risk Management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Position Size</span>
                      <Select defaultValue="10">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="% of Balance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                          <SelectItem value="50">50%</SelectItem>
                          <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Max Daily Loss</span>
                      <Select defaultValue="15">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="% of Balance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="advanced">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Sliders className="h-4 w-4 mr-2 text-primary" />
                    Advanced Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trailing Stop</span>
                      <div className="flex items-center space-x-2">
                        <Switch id="trailing-stop" />
                        <label htmlFor="trailing-stop" className="text-sm">Enable</label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">DCA on Dip</span>
                      <div className="flex items-center space-x-2">
                        <Switch id="dca-dip" />
                        <label htmlFor="dca-dip" className="text-sm">Enable</label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto Compound</span>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-compound" defaultChecked />
                        <label htmlFor="auto-compound" className="text-sm">Enable</label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="flex justify-end space-x-2 mt-2">
              <Button variant="outline" size="sm">
                <LineChart className="h-4 w-4 mr-2" />
                Backtest
              </Button>
              <Button size="sm">Save Changes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
