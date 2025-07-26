import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2,
  Users,
  Star,
  TrendingUp,
  Phone,
  Mail
} from "lucide-react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUST-001",
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+91 98765 43210",
      gstin: "22AAAAA0000A1Z5",
      totalOrders: 15,
      totalValue: 125680,
      lastOrder: "2024-01-26",
      status: "Active",
      type: "Premium",
    },
    {
      id: "CUST-002",
      name: "Tech Solutions Ltd",
      email: "info@techsolutions.com",
      phone: "+91 87654 32109",
      gstin: "27BBBBB1111B2Y4",
      totalOrders: 8,
      totalValue: 68450,
      lastOrder: "2024-01-25",
      status: "Active",
      type: "Regular",
    },
    {
      id: "CUST-003",
      name: "Global Industries",
      email: "sales@global.com",
      phone: "+91 76543 21098",
      gstin: "29CCCCC2222C3X3",
      totalOrders: 22,
      totalValue: 245340,
      lastOrder: "2024-01-24",
      status: "Active",
      type: "Premium",
    },
    {
      id: "CUST-004",
      name: "StartUp Inc",
      email: "hello@startup.com",
      phone: "+91 65432 10987",
      gstin: "",
      totalOrders: 3,
      totalValue: 15670,
      lastOrder: "2024-01-23",
      status: "Inactive",
      type: "Regular",
    },
    {
      id: "CUST-005",
      name: "Enterprise Corp",
      email: "business@enterprise.com",
      phone: "+91 54321 09876",
      gstin: "19DDDDD3333D4W2",
      totalOrders: 35,
      totalValue: 456200,
      lastOrder: "2024-01-22",
      status: "Active",
      type: "Premium",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Inactive":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Premium":
        return "bg-primary/10 text-primary border-primary/20";
      case "Regular":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "Active").length;
  const premiumCustomers = customers.filter(c => c.type === "Premium").length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and track their activity
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <div className="text-sm text-muted-foreground">Total Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeCustomers}</div>
                <div className="text-sm text-muted-foreground">Active Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Star className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">{premiumCustomers}</div>
                <div className="text-sm text-muted-foreground">Premium</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Customers</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>GSTIN</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={customer.gstin ? "" : "text-muted-foreground"}>
                      {customer.gstin || "Not provided"}
                    </span>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>₹{customer.totalValue.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(customer.type)}>
                      {customer.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;