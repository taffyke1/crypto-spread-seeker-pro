import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { CryptoProvider } from "@/contexts/crypto-context";
import { Layout } from "@/components/layout/layout";
import Dashboard from "./pages/Dashboard";
import DirectArbitrage from "./pages/arbitrage/DirectArbitrage";
import TriangularArbitrage from "./pages/arbitrage/TriangularArbitrage";
import FuturesArbitrage from "./pages/arbitrage/FuturesArbitrage";
import BotDashboard from "./pages/BotDashboard";
import MarketAnalysis from "./pages/MarketAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="crypto-arbitrage-theme">
      <CryptoProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/arbitrage/direct" element={<DirectArbitrage />} />
                <Route path="/arbitrage/triangular" element={<TriangularArbitrage />} />
                <Route path="/arbitrage/futures" element={<FuturesArbitrage />} />
                <Route path="/arbitrage" element={<DirectArbitrage />} />
                <Route path="/bot" element={<BotDashboard />} />
                <Route path="/market-analysis" element={<MarketAnalysis />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CryptoProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
