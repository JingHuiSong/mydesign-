"use client"

import { useState } from "react"
import { Check, Sparkles, Zap, Crown, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface PricingTier {
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  icon: LucideIcon
  popular?: boolean
  features: string[]
  limitations?: string[]
}

const pricingTiers: PricingTier[] = [
  {
    name: "免费版",
    description: "适合个人用户和初学者",
    monthlyPrice: 0,
    annualPrice: 0,
    icon: Sparkles,
    features: ["每月 5 个设计项目", "基础模板库访问", "标准导出质量", "基础编辑工具", "社区支持"],
    limitations: ["AI 生成次数：5次/月", "存储空间：100MB"],
  },
  {
    name: "专业版",
    description: "适合专业设计师和小团队",
    monthlyPrice: 99,
    annualPrice: 990,
    icon: Zap,
    popular: true,
    features: [
      "无限设计项目",
      "完整模板库访问",
      "高清导出质量",
      "高级编辑工具",
      "AI 智能排版",
      "AI 图像生成",
      "优先客户支持",
      "去除水印",
      "团队协作（最多 5 人）",
    ],
    limitations: ["AI 生成次数：100次/月", "存储空间：10GB"],
  },
  {
    name: "企业版",
    description: "适合大型团队和企业",
    monthlyPrice: 299,
    annualPrice: 2990,
    icon: Crown,
    features: [
      "专业版所有功能",
      "无限 AI 生成",
      "无限存储空间",
      "自定义品牌模板",
      "API 访问",
      "专属客户经理",
      "SLA 保障",
      "无限团队成员",
      "高级分析报告",
      "白标解决方案",
    ],
  },
]

const faqs = [
  {
    question: "可以随时取消订阅吗？",
    answer: "是的，您可以随时取消订阅。取消后，您仍可以使用服务直到当前计费周期结束。",
  },
  {
    question: "年付和月付有什么区别？",
    answer: "年付可以享受约 17% 的折扣，相当于免费使用 2 个月。年付用户还可以获得优先支持。",
  },
  {
    question: "AI 生成次数用完后怎么办？",
    answer: "免费版和专业版用户可以购买额外的 AI 生成次数包。企业版用户享有无限 AI 生成次数。",
  },
  {
    question: "支持哪些支付方式？",
    answer: "我们支持支付宝、微信支付、信用卡等多种支付方式。企业用户还可以选择对公转账。",
  },
  {
    question: "可以申请试用吗？",
    answer: "专业版和企业版都提供 14 天免费试用，无需信用卡。试用期结束后可以选择继续订阅或降级到免费版。",
  },
  {
    question: "团队协作如何计费？",
    answer: "专业版包含最多 5 个团队成员。企业版支持无限团队成员。每个成员都可以独立创建和编辑设计。",
  },
]

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const getPrice = (tier: PricingTier) => {
    return billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice
  }

  const getSavings = (tier: PricingTier) => {
    if (billingCycle === "annual" && tier.monthlyPrice > 0) {
      const monthlyCost = tier.monthlyPrice * 12
      const savings = monthlyCost - tier.annualPrice
      return Math.round((savings / monthlyCost) * 100)
    }
    return 0
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-balance sm:text-5xl">选择适合您的方案</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            无论是个人创作还是团队协作，我们都有适合您的定价方案
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mb-12 flex justify-center">
          <Tabs
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
            className="w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">按月付费</TabsTrigger>
              <TabsTrigger value="annual">
                按年付费
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  省 17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="mb-20 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col border-border bg-card ${
                tier.popular ? "border-2 border-primary shadow-xl" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary px-4 py-1 text-primary-foreground">最受欢迎</Badge>
                </div>
              )}

              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 w-fit">
                  <tier.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-base">{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">¥{getPrice(tier)}</span>
                    {tier.monthlyPrice > 0 && (
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "月" : "年"}</span>
                    )}
                  </div>
                  {billingCycle === "annual" && getSavings(tier) > 0 && (
                    <p className="mt-2 text-sm text-primary">节省 {getSavings(tier)}%</p>
                  )}
                </div>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {tier.limitations?.map((limitation) => (
                    <div key={limitation} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" variant={tier.popular ? "default" : "outline"} size="lg">
                  {tier.monthlyPrice === 0 ? "免费开始" : "开始试用"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold">功能对比</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left font-semibold">功能</th>
                  <th className="p-4 text-center font-semibold">免费版</th>
                  <th className="p-4 text-center font-semibold">专业版</th>
                  <th className="p-4 text-center font-semibold">企业版</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4">设计项目数量</td>
                  <td className="p-4 text-center text-muted-foreground">5/月</td>
                  <td className="p-4 text-center">无限</td>
                  <td className="p-4 text-center">无限</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">AI 生成次数</td>
                  <td className="p-4 text-center text-muted-foreground">5/月</td>
                  <td className="p-4 text-center">100/月</td>
                  <td className="p-4 text-center">无限</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">存储空间</td>
                  <td className="p-4 text-center text-muted-foreground">100MB</td>
                  <td className="p-4 text-center">10GB</td>
                  <td className="p-4 text-center">无限</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">导出质量</td>
                  <td className="p-4 text-center text-muted-foreground">标准</td>
                  <td className="p-4 text-center">高清</td>
                  <td className="p-4 text-center">超高清</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">团队协作</td>
                  <td className="p-4 text-center text-muted-foreground">-</td>
                  <td className="p-4 text-center">最多 5 人</td>
                  <td className="p-4 text-center">无限</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">API 访问</td>
                  <td className="p-4 text-center text-muted-foreground">-</td>
                  <td className="p-4 text-center text-muted-foreground">-</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-primary" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">优先支持</td>
                  <td className="p-4 text-center text-muted-foreground">-</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-primary" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-primary" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold">常见问题</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-20 rounded-lg border border-primary/20 bg-primary/5 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">还有疑问？</h2>
          <p className="mb-6 text-lg text-muted-foreground">我们的团队随时为您解答</p>
          <Button size="lg" variant="outline" className="bg-transparent">
            联系销售团队
          </Button>
        </div>
      </div>
    </div>
  )
}
