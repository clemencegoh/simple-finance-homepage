import { Banknote } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-8">
        <div className="flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Banknote className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              FinSim
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
