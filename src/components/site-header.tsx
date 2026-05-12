import { Link } from "@tanstack/react-router";
import { 
  Menu, Search, Phone, Heart, ShoppingCart, 
  User, MoreVertical, Lightbulb, X, Trash2, ArrowRight 
} from "lucide-react";
import { useState, useEffect } from "react";
import { BRAND } from "@/lib/products";

// Sample Data for Cart (Real app mein ye state ya context se aayega)
const cartItems = [
  { id: 1, name: "Personalized Photo Frame", price: 499, qty: 1, img: "https://via.placeholder.com/50" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Body scroll lock jab cart khuli ho
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 md:px-8">
          
          {/* Left: Menu & Logo */}
          <div className="flex items-center gap-6">
            {/* <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-gray-100 p-1 rounded-md transition"
            >
              <Menu className="h-8 w-8 text-gray-800 stroke-[1.5]" />
            </button> */}
            
            <Link to="/" className="flex flex-col items-center">
              <h1 className="text-3xl font-black italic text-primary  leading-none tracking-tighter">
                {BRAND || "Presto"}
              </h1>
              <div className="flex flex-col items-center mt-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary ">
                  Personalised Wonders
                </span>
                <span className="text-[9px] italic text-gray-500 -mt-0.5">
                  A bit of you in every gift
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar (Desktop Only) */}
          <div className="relative hidden lg:block w-full max-w-md xl:max-w-m mx-8">
            <input
              type="text"
              placeholder="Search for Gifts..."
              className="w-full rounded-full border border-gray-300 py-2.5 pl-6 pr-12 text-sm focus:border-gray-500 focus:outline-none transition-all shadow-sm"
            />
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Right: Actions & Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Bulk Order Capsule */}
            <Link
              to="/contact"
              className="hidden xl:flex items-center gap-2 rounded-full bg-[#F8F9FA] px-5 py-2.5 border border-gray-100 hover:shadow-md transition"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Bulk Order</span>
            </Link>

            {/* Smart Gift Finder Capsule */}
            <Link
              to="/products"
              className="hidden xl:flex items-center gap-3 rounded-full bg-[#F8F9FA] px-5 py-2 border border-gray-100 hover:shadow-md transition"
            >
              <div className="bg-white p-1 rounded-full shadow-inner">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold text-gray-800">Smart Gift</span>
                <span className="text-[10px] text-gray-500 font-medium">Finder</span>
              </div>
            </Link>

            {/* Nav Icons */}
            <div className="flex items-center gap-3 md:gap-5 ml-2 border-l pl-4 border-gray-100">
              <button className="text-gray-700 hover:text-[#D32F2F] transition hidden sm:block">
                <Phone className="h-6 w-6 stroke-[1.5]" />
              </button>
              <button className="text-gray-700 hover:text-[#D32F2F] transition hidden sm:block">
                <Heart className="h-6 w-6 stroke-[1.5]" />
              </button>
              
              {/* CART TRIGGER */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-700 hover:text-[#D32F2F] transition group"
              >
                <ShoppingCart className="h-6 w-6 stroke-[1.5]" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D32F2F] text-[10px] font-bold text-white ring-2 ring-white">
                  {cartItems.length}
                </span>
              </button>

              <Link to="/login" className="text-gray-700 hover:text-[#D32F2F] transition hidden md:block">
              <button className="text-gray-700 hover:text-[#D32F2F] transition">
                <User className="h-7 w-7 stroke-[1.5]" />
              </button>
              </Link>
              {/* <button className="text-gray-400">
                <MoreVertical className="h-6 w-6" />
              </button> */}
            </div>
          </div>
        </div>
      </header>

      {/* --- CART DRAWER (TOGGLE) --- */}
      <div 
        className={`fixed inset-0 z-50 transform transition-all duration-500 ${
          isCartOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
            isCartOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsCartOpen(false)}
        />
        
        {/* Drawer Content */}
        <div 
          className={`absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-500">{cartItems.length} items added</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 text-gray-500 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Drawer Body (Items) */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img src={item.img} alt={item.name} className="h-20 w-20 rounded-md object-cover bg-gray-100" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.qty}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#D32F2F]">₹{item.price}</span>
                          <button className="text-gray-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <ShoppingCart className="h-12 w-12 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-lg">Your cart is empty!</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-[#D32F2F] font-bold flex items-center gap-2 hover:underline"
                  >
                    Start Shopping <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <p>Total Amount</p>
                  <p>₹499.00</p>
                </div>
                <p className="mt-1 text-xs text-gray-400 italic">Inclusive of all taxes & shipping</p>
                <div className="mt-6">
                  <button className="w-full rounded-full bg-[#D32F2F] py-4 text-center text-base font-bold text-white shadow-lg hover:bg-red-700 transition transform active:scale-95">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}