import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ChevronRight, 
  Star, 
  Truck, 
  Zap, 
  ShieldCheck, 
  Clock,
  Gift,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Components & Data
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import heroImg from "@/assets/hero.jpg";

// Animation Variants
const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const heroSlides = [
  {
    image: heroImg,
    title: "Premium Corporate Gifting Solutions",
    subtitle: "Impression that lasts. Quality that speaks. Delivered Pan-India."
  },
  {
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
    title: "Thoughtfully Curated Gift Hampers",
    subtitle: "Personalized touch for your employees, clients, and partners."
  }
];

const testimonials = [
  { name: "Ananya Sharma", role: "HR Head, TechCorp", text: "The personalized executive hampers were a huge hit! The quality was beyond expectations." },
  { name: "Rahul Verma", role: "Founder, Bloom Media", text: "Fastest quote response I've ever seen. The wood engraving is top-notch." },
  { name: "Priya Das", role: "Marketing Manager", text: "Pan-India delivery was seamless. Every gift reached in perfect condition." },
];

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = products.filter((p) => p.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen font-sans overflow-x-hidden text-foreground">
      {/* --- SECTION 1: HERO SLIDER --- */}
      <section className="relative h-[450px] md:h-[750px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img src={heroSlides[currentSlide].image} className="h-full w-full object-cover" alt="Banner" />
            {/* Overlay using your Primary brand color */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent z-10" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-20">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-4xl"
              >
                <h1 className="text-primary-foreground text-4xl md:text-8xl font-serif font-bold leading-tight">
                  {heroSlides[currentSlide].title.split(' ').slice(0, -1).join(' ')} <br/>
                  <span className="text-gold">{heroSlides[currentSlide].title.split(' ').pop()}</span>
                </h1>
                <p className="text-primary-foreground/80 text-lg md:text-2xl mt-6 max-w-2xl font-light">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <motion.div 
                  className="mt-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/products" className="inline-block bg-gold text-gold-foreground px-10 py-4 rounded-full shadow-2xl transition-all uppercase font-bold text-sm tracking-widest hover:bg-gold/90">
                    Explore Collections
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, i) => (
                <div key={i} className={`h-1 transition-all duration-500 ${currentSlide === i ? 'w-12 bg-gold' : 'w-4 bg-white/40'}`} />
            ))}
        </div>
      </section>

      {/* --- SECTION 2: SHOP BY CATEGORY --- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary uppercase tracking-tighter">Signature Collections</h2>
            <div className="h-1.5 w-24 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-8 gap-6 md:gap-12 no-scrollbar justify-start md:justify-center"
        >
          {categories.map((c) => (
            <motion.div
              variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }}
              key={c.slug}
            >
              <Link
                to="/products/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col items-center gap-4 w-28 md:w-40"
              >
                <div className="h-28 w-28 md:h-40 md:w-40 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg group-hover:shadow-gold/30 group-hover:border-gold transition-all duration-500">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <span className="text-xs md:text-sm font-bold text-muted-foreground text-center uppercase tracking-widest group-hover:text-gold transition-colors">
                  {c.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- SECTION 3: BESTSELLERS --- */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <motion.div {...fadeInUp} className="flex items-center justify-between mb-12 border-l-4 border-gold pl-6">
            <div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary italic">Bestsellers</h2>
                <p className="text-muted-foreground mt-2 font-medium">Top picks from our corporate partners</p>
            </div>
            <Link to="/products" className="group text-primary font-bold flex items-center gap-2 hover:text-gold transition-colors">
                View All <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {featured.map((p) => (
            <motion.div variants={{ initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } }} key={p.slug}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- BULK BANNER --- */}
      <section className="relative h-[400px] md:h-[500px] my-10 overflow-hidden">
        <motion.div 
           initial={{ scale: 1.2 }}
           whileInView={{ scale: 1 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0 bg-fixed bg-cover bg-center" 
           style={{backgroundImage: "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop')"}} 
        />
        <div className="absolute inset-0 bg-primary/90 flex items-center justify-center text-center px-4">
            <motion.div {...fadeInUp} className="max-w-3xl">
                <h2 className="text-primary-foreground text-4xl md:text-6xl font-serif font-bold mb-6">Bulk Order Discounts</h2>
                <p className="text-primary-foreground/80 text-xl font-light mb-10">Get special wholesale pricing and custom branding on orders above 50 units.</p>
                <WhatsAppButton message="Hi Photofinite, I want to discuss a bulk order." />
            </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: FULL PRODUCT LISTING --- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Explore Our Catalog</h2>
            <div className="h-1 w-20 bg-gold mx-auto mt-4" />
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((p) => (
            <motion.div variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }} key={p.slug}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
            <motion.h2 {...fadeInUp} className="text-4xl font-serif font-bold text-center mb-20 text-primary">How It Works</motion.h2>
            <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true }}
               className="grid md:grid-cols-3 gap-16"
            >
                {[
                  { step: "1", title: "Select Product", desc: "Browse from 500+ premium gift items." },
                  { step: "2", title: "Digital Mockup", desc: "Approve your logo placement on our design." },
                  { step: "3", title: "Pan-India Delivery", desc: "Secure shipping to your office or clients." },
                ].map((item, i) => (
                    <motion.div variants={{ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 } }} key={i} className="space-y-6 text-center">
                        <div className="w-16 h-16 bg-gold text-gold-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto rotate-12 shadow-lg shadow-gold/20">{item.step}</div>
                        <h3 className="font-serif font-bold text-2xl text-primary">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 {...fadeInUp} className="text-4xl font-serif font-bold mb-16 text-center">Trusted by Leaders</motion.h2>
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div variants={{ initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } }} key={i} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 hover:border-gold/50 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-gold text-gold" />)}
                </div>
                <p className="italic text-xl mb-8 leading-relaxed font-light text-primary-foreground/80">"{t.text}"</p>
                <div className="font-bold text-lg text-primary-foreground">{t.name}</div>
                <div className="text-gold text-sm uppercase tracking-widest font-semibold">{t.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- STATS BANNER --- */}
      <section className="bg-background py-16 border-y border-border/60">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12"
        >
            {[
                { label: "Premium Products", count: "500+", icon: Gift },
                { label: "Happy Clients", count: "1200+", icon: Users },
                { label: "Cities Covered", count: "100+", icon: Truck },
                { label: "Trust Rating", count: "4.9/5", icon: Star },
            ].map((stat, i) => (
                <motion.div variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }} key={i} className="flex flex-col items-center text-center group">
                    <div className="mb-4 p-4 rounded-2xl bg-muted text-primary group-hover:bg-gold group-hover:text-gold-foreground transition-all duration-500">
                        <stat.icon size={32} />
                    </div>
                    <span className="text-3xl md:text-4xl font-serif font-black text-primary">{stat.count}</span>
                    <span className="text-xs md:text-sm text-muted-foreground uppercase font-bold tracking-widest mt-1">{stat.label}</span>
                </motion.div>
            ))}
        </motion.div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="mx-auto max-w-7xl px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-primary rounded-[4rem] p-12 md:p-28 text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-10 blur-[100px] rounded-full -mr-20 -mt-20" />
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8">Ready to start?</h2>
            <p className="text-primary-foreground/80 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-light">Connect with us for a personalized catalog and competitive quote.</p>
            <div className="flex justify-center scale-125">
                 <WhatsAppButton message="Hi Photofinite team, I'd like to explore your catalog for my business." />
            </div>
        </motion.div>
      </section>
    </div>
  );
}