"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Grid3x3, List, MoreVertical, Edit, Copy, Download, Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { storage, type SavedDesign, exportCanvasToImage, downloadImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

type ViewMode = "grid" | "list"
type SortOption = "recent" | "oldest" | "name"

export function MyDesignsGallery() {
  const { toast } = useToast()
  const [designs, setDesigns] = useState<SavedDesign[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [designToDelete, setDesignToDelete] = useState<string | null>(null)

  useEffect(() => {
    setDesigns(storage.getDesigns())
  }, [])

  const filteredDesigns = designs
    .filter((design) => design.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

  const handleDelete = (id: string) => {
    setDesignToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (designToDelete) {
      storage.deleteDesign(designToDelete)
      setDesigns(storage.getDesigns())
      toast({
        title: "删除成功",
        description: "设计已删除",
      })
      setDesignToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleDuplicate = (id: string) => {
    const newDesign = storage.duplicateDesign(id)
    if (newDesign) {
      setDesigns(storage.getDesigns())
      toast({
        title: "复制成功",
        description: `已创建副本: ${newDesign.title}`,
      })
    }
  }

  const handleDownload = async (design: SavedDesign) => {
    try {
      const dataUrl = await exportCanvasToImage(design.elements, {
        width: Number.parseInt(design.size.split("x")[0]),
        height: Number.parseInt(design.size.split("x")[1]),
      })
      downloadImage(dataUrl, `${design.title}.png`)
      toast({
        title: "下载成功",
        description: "海报已下载",
      })
    } catch (error) {
      toast({
        title: "下载失败",
        description: "无法下载海报，请重试",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "今天"
    if (diffDays === 1) return "昨天"
    if (diffDays < 7) return `${diffDays} 天前`
    return date.toLocaleDateString("zh-CN")
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">我的设计</h1>
            <p className="mt-1 text-muted-foreground">{designs.length} 个设计作品</p>
          </div>
          <Button asChild>
            <Link href="/templates">
              <Plus className="mr-2 h-4 w-4" />
              新建设计
            </Link>
          </Button>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索设计..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* View & Sort Controls */}
          <div className="flex items-center gap-2">
            {/* Sort */}
            <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <TabsList>
                <TabsTrigger value="recent">最近</TabsTrigger>
                <TabsTrigger value="oldest">最早</TabsTrigger>
                <TabsTrigger value="name">名称</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* View Mode */}
            <div className="flex rounded-md border border-border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Designs Grid/List */}
        {filteredDesigns.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                {searchQuery ? "未找到匹配的设计" : "还没有设计作品"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "尝试调整搜索条件" : "开始创作您的第一个海报吧"}
              </p>
              {!searchQuery && (
                <Button className="mt-4" asChild>
                  <Link href="/templates">
                    <Plus className="mr-2 h-4 w-4" />
                    新建设计
                  </Link>
                </Button>
              )}
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDesigns.map((design) => (
              <Card
                key={design.id}
                className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={design.thumbnail || "/placeholder.svg"}
                    alt={design.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                    <Button className="w-full" size="sm" asChild>
                      <Link href={`/editor?design=${design.id}`}>
                        <Edit className="mr-2 h-3 w-3" />
                        编辑
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="flex-1 truncate font-semibold">{design.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/editor?design=${design.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(design.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          复制
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(design)}>
                          <Download className="mr-2 h-4 w-4" />
                          下载
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(design.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(design.updatedAt)}</span>
                    <Badge variant="secondary" className="text-xs">
                      {design.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="border-border bg-card transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={design.thumbnail || "/placeholder.svg"}
                        alt={design.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{design.title}</h3>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(design.updatedAt)}</span>
                        <span>{design.size}</span>
                        <Badge variant="secondary" className="text-xs">
                          {design.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/editor?design=${design.id}`}>
                          <Edit className="mr-2 h-3 w-3" />
                          编辑
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDuplicate(design.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            复制
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(design)}>
                            <Download className="mr-2 h-4 w-4" />
                            下载
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(design.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>此操作无法撤销。确定要删除这个设计吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
