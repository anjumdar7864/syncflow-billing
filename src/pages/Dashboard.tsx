import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  FileText, 
  Package, 
  Users, 
  TrendingUp, 
  Plus,
  Eye
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,680",
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      title: "Total Invoices", 
      value: "1,234",
      change: "+5.2%",
      icon: FileText,
    },
    {
      title: "Products in Stock",
      value: "2,567", 
      change: "-2.1%",
      icon: Package,
    },
    {
      title: "Active Customers",
      value: "892",
      change: "+8.3%", 
      icon: Users,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-primary p-8 text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={dashboardHero} 
            alt="Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to BillMaster Pro!</h1>
          <p className="text-lg opacity-90 mb-6">
            Your complete billing and invoicing solution.
          </p>
          <div className="flex space-x-4">
            <Button size="lg" variant="secondary">
              <Plus className="mr-2 h-5 w-5" />
              Create Invoice
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Eye className="mr-2 h-5 w-5" />
              View Reports
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-success">{stat.change}</span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;