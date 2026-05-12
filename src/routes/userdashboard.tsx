import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  CreditCard,
  CheckCircle2
} from "lucide-react";

export function UserDashboard() {
  const stats = [
    { label: "Total Orders", value: "12", icon: Package },
    { label: "Active Quotes", value: "3", icon: CreditCard },
    { label: "Saved Items", value: "24", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary hidden md:flex flex-col text-primary-foreground p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gold text-gold-foreground rounded-lg flex items-center justify-center font-bold font-serif">P</div>
          <span className="text-xl font-serif font-bold tracking-tight">Photofinite</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { label: "Dashboard", icon: LayoutDashboard, active: true },
            { label: "My Orders", icon: Package },
            { label: "Wishlist", icon: Heart },
            { label: "Payments", icon: CreditCard },
            { label: "Settings", icon: Settings },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-gold text-gold-foreground' : 'hover:bg-white/10'}`}>
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-4 py-3 text-white/60 hover:text-white transition-colors mt-auto">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input type="text" placeholder="Track order or search gifts..." className="w-full pl-10 pr-4 py-2 bg-muted/40 rounded-lg text-sm focus:outline-none" />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right">
                <p className="text-sm font-bold text-primary">Ananya Sharma</p>
                <p className="text-[10px] uppercase font-bold text-gold tracking-widest">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-gold p-0.5">
                <img src="https://ui-avatars.com/api/?name=Ananya+Sharma&background=1e5d7b&color=fff" className="rounded-full" alt="profile" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <section>
            <h1 className="text-3xl font-serif font-bold text-primary">Welcome Back, Ananya!</h1>
            <p className="text-muted-foreground">Here's what's happening with your corporate orders today.</p>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-border group hover:border-gold transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-primary mt-1">{stat.value}</h3>
                  </div>
                  <div className="p-3 bg-primary/5 text-primary rounded-xl group-hover:bg-gold group-hover:text-gold-foreground transition-all">
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <section className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">Recent Orders</h2>
              <button className="text-sm text-gold font-bold hover:underline">View All Orders</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/30 text-xs uppercase text-muted-foreground font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { id: "#PF-9821", name: "Premium Executive Hamper", date: "Oct 12, 2023", price: "₹12,400", status: "In Transit" },
                    { id: "#PF-9750", name: "Engraved Wood Clock (Bulk)", date: "Sep 28, 2023", price: "₹45,000", status: "Delivered" },
                    { id: "#PF-9612", name: "Customized Travel Mug", date: "Sep 15, 2023", price: "₹2,100", status: "Delivered" },
                  ].map((order, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors text-sm">
                      <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                      <td className="px-6 py-4 text-primary font-medium">{order.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4 font-bold text-primary">{order.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gold/10 text-gold-foreground'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}