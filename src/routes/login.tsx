import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";

export function AuthPage({ mode = "login" }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Side: Image & Branding */}
      <div className="hidden lg:flex relative bg-primary items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80')] opacity-20 bg-cover bg-center" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gold text-gold-foreground rounded-3xl flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-8 shadow-2xl">P</div>
          <h1 className="text-5xl font-serif font-bold text-primary-foreground mb-6">Welcome to Photofinite</h1>
          <p className="text-primary-foreground/70 text-xl max-w-md mx-auto font-light">
            {isLogin ? "Access your corporate dashboard and manage your custom orders effortlessly." : "Join 1200+ brands and start creating premium personalized gift experiences."}
          </p>
        </div>
        <div className="absolute bottom-10 left-10 right-10 flex justify-between text-primary-foreground/40 text-sm">
          <span>© {new Date().getFullYear()} Photofinite</span>
          <span>Quality & Trust</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-serif font-bold text-primary">{isLogin ? "Sign In" : "Create Account"}</h2>
            <p className="text-muted-foreground mt-2">Enter your details to access your account</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/80 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary/80 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="email" placeholder="john@company.com" className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-primary/80">Password</label>
                {isLogin && <button className="text-xs text-gold font-bold hover:underline">Forgot Password?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />
              </div>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 group">
              {isLogin ? "Sign In" : "Register Now"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Link to={isLogin ? "/signup" : "/login"} className="text-gold font-bold ml-2 hover:underline">
                {isLogin ? "Create one now" : "Login here"}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}