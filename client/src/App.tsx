import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Debates from "./pages/Debates";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Swedish (default) routes */}
      <Route path="/" component={Home} />
      <Route path="/punkt/:id" component={Home} />
      <Route path="/om" component={About} />
      <Route path="/about" component={About} />
      <Route path="/debatter" component={Debates} />
      <Route path="/debates" component={Debates} />

      {/* English routes with /en prefix */}
      <Route path="/en" component={Home} />
      <Route path="/en/punkt/:id" component={Home} />
      <Route path="/en/om" component={About} />
      <Route path="/en/about" component={About} />
      <Route path="/en/debatter" component={Debates} />
      <Route path="/en/debates" component={Debates} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
