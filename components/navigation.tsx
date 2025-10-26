"use client"

import Link from "next/link"
import { Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/templates", label: "模板" },
    { href: "/editor", label: "编辑器" },
    { href: "/my-designs", label: "我的设计" },
    { href: "/pricing", label: "价格" },
  ]

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 transition-smooth">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 transition-smooth">
            <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2 shadow-premium transition-smooth group-hover:scale-110 group-hover:shadow-premium-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              AI海报设计
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-muted/50">
              登录
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/90 shadow-premium transition-smooth hover:shadow-premium-lg hover:scale-105"
            >
              开始创作
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="transition-smooth hover:bg-muted/50">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] glass">
              <div className="flex flex-col gap-6 pt-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium transition-smooth hover:text-primary animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  <Button variant="outline" className="w-full bg-transparent transition-smooth hover:bg-muted/50">
                    登录
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/90 shadow-premium transition-smooth hover:shadow-premium-lg">
                    开始创作
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
