import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Minus, 
  Search, 
  Trash2, 
  CreditCard, 
  Banknote,
  QrCode,
  Calculator,
  ShoppingCart
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const POS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const products = [
    { id: "1", name: "Wireless Headphones", price: 2499, stock: 45, category: "Electronics" },
    { id: "2", name: "Gaming Mouse", price: 1299, stock: 8, category: "Electronics" },
    { id: "3", name: "USB Cable", price: 299, stock: 120, category: "Accessories" },
    { id: "4", name: "Smartphone Case", price: 599, stock: 30, category: "Accessories" },
    { id: "5", name: "Bluetooth Speaker", price: 3999, stock: 32, category: "Electronics" },
    { id: "6", name: "Power Bank", price: 1899, stock: 25, category: "Electronics" },
    { id: "7", name: "Wireless Charger", price: 1599, stock: 18, category: "Electronics" },
    { id: "8", name: "Screen Protector", price: 399, stock: 75, category: "Accessories" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 
          ? null 
          : { ...item, quantity: newQuantity, total: newQuantity * item.price };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  return (
    <div className="h-full flex gap-6">
      {/* Products Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Point of Sale</h1>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="cursor-pointer hover:shadow-elegant transition-all duration-200 hover:scale-105"
              onClick={() => addToCart(product)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="mt-auto">
                    <div className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        Stock: {product.stock}
                      </Badge>
                      <Button size="sm" className="h-6 px-2">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96">
        <Card className="h-full flex flex-col shadow-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart ({cart.length})
              </CardTitle>
              {cart.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearCart}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Cart is empty</p>
                  <p className="text-sm">Add products to start billing</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm font-semibold ml-3">
                        ₹{item.total.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{gst.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Button className="w-full bg-gradient-success shadow-elegant">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay by Card
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Banknote className="mr-2 h-4 w-4" />
                    Cash Payment
                  </Button>
                  <Button variant="outline" className="w-full">
                    <QrCode className="mr-2 h-4 w-4" />
                    UPI Payment
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default POS;