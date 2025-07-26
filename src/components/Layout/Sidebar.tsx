import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Receipt,
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    title: "Point of Sale",
    href: "/pos",
    icon: ShoppingCart,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border shadow-card">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          BillMaster Pro
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-gradient-success p-4 text-success-foreground">
          <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
          <p className="text-xs mt-1 opacity-90">
            Unlock advanced features and unlimited invoices
          </p>
        </div>
      </div>
    </div>
  );
};