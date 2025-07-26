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
  Edit, 
  Trash2,
  AlertTriangle,
  TrendingUp,
  Package
} from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: "PRD-001",
      name: "Wireless Headphones",
      sku: "WH-001",
      category: "Electronics",
      stock: 45,
      minStock: 10,
      price: 2499,
      cost: 1800,
      value: 112455,
      status: "In Stock",
    },
    {
      id: "PRD-002",
      name: "Gaming Mouse",
      sku: "GM-002",
      category: "Electronics",
      stock: 8,
      minStock: 15,
      price: 1299,
      cost: 900,
      value: 10392,
      status: "Low Stock",
    },
    {
      id: "PRD-003",
      name: "USB Cable",
      sku: "UC-003",
      category: "Accessories",
      stock: 120,
      minStock: 25,
      price: 299,
      cost: 150,
      value: 35880,
      status: "In Stock",
    },
    {
      id: "PRD-004",
      name: "Smartphone Case",
      sku: "SC-004",
      category: "Accessories",
      stock: 0,
      minStock: 5,
      price: 599,
      cost: 300,
      value: 0,
      status: "Out of Stock",
    },
    {
      id: "PRD-005",
      name: "Bluetooth Speaker",
      sku: "BS-005",
      category: "Electronics",
      stock: 32,
      minStock: 8,
      price: 3999,
      cost: 2800,
      value: 127968,
      status: "In Stock",
    },
  ];

  const getStatusColor = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return "bg-destructive/10 text-destructive border-destructive/20";
    } else if (stock <= minStock) {
      return "bg-warning/10 text-warning border-warning/20";
    } else {
      return "bg-success/10 text-success border-success/20";
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = products.reduce((sum, product) => sum + product.value, 0);
  const lowStockItems = products.filter(product => product.stock <= product.minStock && product.stock > 0).length;
  const outOfStockItems = products.filter(product => product.stock === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage your product inventory
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
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
                <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{lowStockItems}</div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{outOfStockItems}</div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Product Inventory</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <span className={product.stock <= product.minStock ? "text-warning font-semibold" : ""}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product.minStock}</TableCell>
                  <TableCell>₹{product.price.toLocaleString()}</TableCell>
                  <TableCell>₹{product.cost.toLocaleString()}</TableCell>
                  <TableCell>₹{product.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status, product.stock, product.minStock)}>
                      {product.status}
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

export default Inventory;