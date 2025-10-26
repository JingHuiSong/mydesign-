"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIImageDialogProps {
  onImageGenerated: (imageUrl: string) => void
  trigger?: React.ReactNode
}

export function AIImageDialog({ onImageGenerated, trigger }: AIImageDialogProps) {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("请输入图片描述")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          aspectRatio,
        }),
      })

      if (!response.ok) {
        throw new Error("生成失败")
      }

      const data = await response.json()

      if (data.imageUrl) {
        onImageGenerated(data.imageUrl)
        setOpen(false)
        setPrompt("")
      } else {
        throw new Error("未能生成图片")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请重试")
    } finally {
      setIsGenerating(false)
    }
  }

  const examplePrompts = [
    "一个现代简约风格的产品展示背景，蓝色渐变",
    "充满活力的音乐节海报背景，霓虹灯效果",
    "优雅的商务会议背景，专业氛围",
    "温馨的生日派对装饰，彩色气球和彩带",
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            AI 生成图片
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI 图片生成</DialogTitle>
          <DialogDescription>描述您想要的图片，AI 将为您生成独特的视觉内容</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt">图片描述</Label>
            <Textarea
              id="prompt"
              placeholder="例如：一个现代简约风格的产品展示背景，使用蓝色和白色配色..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Example Prompts */}
          <div className="space-y-2">
            <Label>示例提示词</Label>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => setPrompt(example)} className="text-xs">
                  {example}
                </Button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-2">
            <Label htmlFor="aspectRatio">宽高比</Label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger id="aspectRatio">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">正方形 (1:1)</SelectItem>
                <SelectItem value="16:9">横向 (16:9)</SelectItem>
                <SelectItem value="9:16">竖向 (9:16)</SelectItem>
                <SelectItem value="4:3">标准 (4:3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error Message */}
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          {/* Generate Button */}
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                生成图片
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
