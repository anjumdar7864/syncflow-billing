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
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Send
} from "lucide-react";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const invoices = [
    {
      id: "INV-001",
      customer: "Acme Corporation",
      date: "2024-01-26",
      dueDate: "2024-02-26",
      amount: 15680,
      status: "Paid",
      gst: 2352,
    },
    {
      id: "INV-002",
      customer: "Tech Solutions Ltd",
      date: "2024-01-25",
      dueDate: "2024-02-25",
      amount: 8450,
      status: "Pending",
      gst: 1267.5,
    },
    {
      id: "INV-003",
      customer: "Global Industries",
      date: "2024-01-24",
      dueDate: "2024-02-24",
      amount: 22340,
      status: "Overdue",
      gst: 3351,
    },
    {
      id: "INV-004",
      customer: "StartUp Inc",
      date: "2024-01-23",
      dueDate: "2024-02-23",
      amount: 5670,
      status: "Draft",
      gst: 850.5,
    },
    {
      id: "INV-005",
      customer: "Enterprise Corp",
      date: "2024-01-22",
      dueDate: "2024-02-22",
      amount: 31200,
      status: "Paid",
      gst: 4680,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success border-success/20";
      case "Pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "Overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Draft":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track all your invoices
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">₹82,340</div>
            <div className="text-sm text-muted-foreground">Total Paid</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">₹8,450</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">₹22,340</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-muted-foreground">₹5,670</div>
            <div className="text-sm text-muted-foreground">Draft</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Invoices</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
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
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>₹{invoice.gst.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
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

export default Invoices;