import Link from "next/link"
import { ArrowRight, Sparkles, Wand2, Palette, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const features = [
    {
      icon: Wand2,
      title: "AI 智能排版",
      description: "自动分析内容，生成专业的设计布局，节省您的时间",
    },
    {
      icon: Palette,
      title: "丰富模板库",
      description: "数百种精美模板，覆盖营销、社交、活动等多个场景",
    },
    {
      icon: Sparkles,
      title: "AI 图像生成",
      description: "使用最先进的 AI 模型，根据描述生成独特的视觉内容",
    },
    {
      icon: Zap,
      title: "实时编辑",
      description: "拖拽式编辑器，所见即所得，轻松调整每个设计元素",
    },
  ]

  const useCases = [
    {
      title: "营销海报",
      description: "产品推广、促销活动、品牌宣传",
      image: "/marketing-poster-design.jpg",
    },
    {
      title: "社交媒体",
      description: "Instagram、微信朋友圈、小红书配图",
      image: "/social-media-post.png",
    },
    {
      title: "活动邀请",
      description: "会议、派对、展览活动邀请函",
      image: "/event-invitation-design.jpg",
    },
  ]

  const benefits = [
    "无需设计经验，3分钟上手",
    "AI 自动生成，节省 80% 时间",
    "高清导出，支持多种格式",
    "云端保存，随时随地访问",
    "专业模板，持续更新",
    "14天免费试用，无需信用卡",
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm shadow-premium animate-fade-in backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="font-medium text-primary">AI 驱动的设计平台</span>
            </div>

            <h1 className="mb-8 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl animate-slide-up">
              用 AI 创造
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                {" "}
                惊艳的海报
              </span>
            </h1>

            <p
              className="mb-12 text-xl text-muted-foreground text-pretty leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              无需设计经验，只需几分钟即可生成专业级海报。AI 智能排版、图像生成、一键导出，让创意触手可及。
            </p>

            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                size="lg"
                className="group w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 shadow-premium-lg transition-smooth hover:shadow-premium-lg hover:scale-105"
                asChild
              >
                <Link href="/templates">
                  开始创作
                  <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto glass transition-smooth hover:bg-muted/50 bg-transparent"
                asChild
              >
                <Link href="/editor">查看示例</Link>
              </Button>
            </div>

            <div
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-2 transition-smooth hover:text-foreground">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">10,000+ 用户信赖</span>
              </div>
              <div className="flex items-center gap-2 transition-smooth hover:text-foreground">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">100,000+ 设计作品</span>
              </div>
              <div className="flex items-center gap-2 transition-smooth hover:text-foreground">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">4.9/5.0 用户评分</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-balance sm:text-5xl">强大的 AI 功能</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              集成最先进的 AI 技术，让设计变得简单高效
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group border-border/50 bg-card shadow-premium transition-smooth hover:shadow-premium-lg hover:scale-105 hover:border-primary/30 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-8">
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 p-4 shadow-premium transition-smooth group-hover:scale-110 group-hover:shadow-premium-lg">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-gradient-to-b from-muted/30 to-transparent py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-balance sm:text-5xl">为什么选择我们？</h2>
            <p className="mb-16 text-xl text-muted-foreground text-pretty leading-relaxed">
              专为非设计师打造，让每个人都能创作出专业级作品
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 text-left shadow-premium transition-smooth hover:shadow-premium-lg hover:scale-105 hover:border-primary/30 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2 transition-smooth group-hover:scale-110">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-balance sm:text-5xl">适用于各种场景</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              无论是营销推广还是个人创作，都能找到合适的解决方案
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase, index) => (
              <Card
                key={useCase.title}
                className="group overflow-hidden border-border/50 bg-card shadow-premium transition-smooth hover:shadow-premium-lg hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                  <img
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <CardContent className="pt-6 pb-6">
                  <h3 className="mb-3 text-xl font-semibold">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-balance sm:text-5xl">准备好开始创作了吗？</h2>
          <p className="mb-12 text-xl text-muted-foreground text-pretty leading-relaxed">
            加入数千名创作者，用 AI 释放你的创意潜能
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 shadow-premium-lg transition-smooth hover:shadow-premium-lg hover:scale-105"
              asChild
            >
              <Link href="/templates">
                免费开始
                <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto glass transition-smooth hover:bg-muted/50 bg-transparent"
              asChild
            >
              <Link href="/pricing">查看价格</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2.5 shadow-premium">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">AI海报设计</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 AI海报设计平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
