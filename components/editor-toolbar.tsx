"use client"

import {
  Type,
  ImageIcon,
  Square,
  Download,
  Sparkles,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AIImageDialog } from "@/components/ai-image-dialog"

interface EditorToolbarProps {
  onAddElement: (type: "text" | "image" | "shape") => void
  onOpenAIDialog: () => void
  onExport: () => void
  onUndo?: () => void
  onRedo?: () => void
  onAlign?: (alignment: "left" | "center" | "right") => void
  canUndo?: boolean
  canRedo?: boolean
}

export function EditorToolbar({
  onAddElement,
  onOpenAIDialog,
  onExport,
  onUndo,
  onRedo,
  onAlign,
  canUndo = false,
  canRedo = false,
}: EditorToolbarProps) {
  const tools = [
    { icon: Type, label: "添加文本", type: "text" as const },
    { icon: ImageIcon, label: "添加图片", type: "image" as const },
    { icon: Square, label: "添加形状", type: "shape" as const },
  ]

  const handleAIImageGenerated = (imageUrl: string) => {
    // This will be handled by the parent component
  }

  return (
    <div className="flex w-20 flex-col items-center gap-2 border-r border-border bg-card p-4">
      <TooltipProvider>
        {tools.map((tool) => (
          <Tooltip key={tool.type}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => onAddElement(tool.type)}>
                <tool.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Separator className="my-2" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <AIImageDialog
                onImageGenerated={handleAIImageGenerated}
                trigger={
                  <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Sparkles className="h-5 w-5" />
                  </Button>
                }
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>AI 生成</p>
          </TooltipContent>
        </Tooltip>

        <Separator className="my-2" />

        {onUndo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12" onClick={onUndo} disabled={!canUndo}>
                <Undo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>撤销</p>
            </TooltipContent>
          </Tooltip>
        )}

        {onRedo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12" onClick={onRedo} disabled={!canRedo}>
                <Redo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>重做</p>
            </TooltipContent>
          </Tooltip>
        )}

        {onAlign && (
          <>
            <Separator className="my-2" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => onAlign("left")}>
                  <AlignLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>左对齐</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => onAlign("center")}>
                  <AlignCenter className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>居中对齐</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => onAlign("right")}>
                  <AlignRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>右对齐</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}

        <div className="flex-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12" onClick={onExport}>
              <Download className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>导出</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
