"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Template {
  id: string
  title: string
  category: string
  image: string
  tags: string[]
  isAI?: boolean
}

const templates: Template[] = [
  // 营销海报
  {
    id: "marketing-1",
    title: "产品促销海报",
    category: "marketing",
    image: "/modern-product-promotion-poster-with-vibrant-color.jpg",
    tags: ["促销", "电商"],
    isAI: true,
  },
  {
    id: "marketing-2",
    title: "新品发布会",
    category: "marketing",
    image: "/elegant-product-launch-event-poster.jpg",
    tags: ["发布会", "科技"],
  },
  {
    id: "marketing-3",
    title: "限时折扣",
    category: "marketing",
    image: "/eye-catching-discount-sale-poster.jpg",
    tags: ["折扣", "促销"],
    isAI: true,
  },
  {
    id: "marketing-4",
    title: "品牌宣传",
    category: "marketing",
    image: "/professional-brand-awareness-poster.jpg",
    tags: ["品牌", "企业"],
  },
  // 社交媒体
  {
    id: "social-1",
    title: "Instagram 故事",
    category: "social",
    image: "/trendy-instagram-story-design.jpg",
    tags: ["Instagram", "故事"],
    isAI: true,
  },
  {
    id: "social-2",
    title: "朋友圈配图",
    category: "social",
    image: "/aesthetic-wechat-moments-post.jpg",
    tags: ["微信", "分享"],
  },
  {
    id: "social-3",
    title: "小红书封面",
    category: "social",
    image: "/stylish-xiaohongshu-cover-design.jpg",
    tags: ["小红书", "封面"],
    isAI: true,
  },
  {
    id: "social-4",
    title: "Twitter 卡片",
    category: "social",
    image: "/modern-twitter-card-design.jpg",
    tags: ["Twitter", "社交"],
  },
  // 活动邀请
  {
    id: "event-1",
    title: "商务会议邀请",
    category: "event",
    image: "/professional-business-conference-invitation.jpg",
    tags: ["会议", "商务"],
  },
  {
    id: "event-2",
    title: "生日派对",
    category: "event",
    image: "/fun-birthday-party-invitation-poster.jpg",
    tags: ["派对", "庆祝"],
    isAI: true,
  },
  {
    id: "event-3",
    title: "艺术展览",
    category: "event",
    image: "/elegant-art-exhibition-poster.jpg",
    tags: ["展览", "艺术"],
  },
  {
    id: "event-4",
    title: "音乐节",
    category: "event",
    image: "/vibrant-music-festival-poster.jpg",
    tags: ["音乐", "节日"],
    isAI: true,
  },
  // 教育培训
  {
    id: "education-1",
    title: "在线课程",
    category: "education",
    image: "/modern-online-course-promotional-poster.jpg",
    tags: ["课程", "在线"],
  },
  {
    id: "education-2",
    title: "研讨会",
    category: "education",
    image: "/professional-workshop-seminar-poster.jpg",
    tags: ["研讨", "培训"],
    isAI: true,
  },
  {
    id: "education-3",
    title: "技能培训",
    category: "education",
    image: "/engaging-skill-training-poster.jpg",
    tags: ["技能", "学习"],
  },
  {
    id: "education-4",
    title: "讲座通知",
    category: "education",
    image: "/placeholder.svg?height=400&width=300",
    tags: ["讲座", "学术"],
  },
]

const categories = [
  { id: "all", label: "全部模板" },
  { id: "marketing", label: "营销海报" },
  { id: "social", label: "社交媒体" },
  { id: "event", label: "活动邀请" },
  { id: "education", label: "教育培训" },
]

export function TemplateGallery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory = activeCategory === "all" || template.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-balance">精选海报模板</h1>
          <p className="text-lg text-muted-foreground text-pretty">选择一个模板开始创作，或使用 AI 生成全新设计</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索模板、标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              {filteredTemplates.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">未找到匹配的模板</p>
                  <p className="mt-2 text-sm text-muted-foreground">尝试调整搜索条件或选择其他分类</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img
                          src={template.image || "/placeholder.svg"}
                          alt={template.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        {template.isAI && (
                          <div className="absolute right-2 top-2">
                            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur">
                              <Sparkles className="mr-1 h-3 w-3" />
                              AI
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                          <Button className="w-full" size="sm" asChild>
                            <Link href={`/editor?template=${template.id}`}>使用模板</Link>
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 font-semibold">{template.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* AI Generation CTA */}
        <div className="mt-16 rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">找不到合适的模板？</h2>
            <p className="mb-6 text-muted-foreground">使用 AI 根据您的描述生成独特的海报设计</p>
            <Button size="lg" asChild>
              <Link href="/editor?mode=ai">AI 生成海报</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
