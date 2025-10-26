"use client"

import { ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { CanvasElement } from "@/components/poster-editor"

interface EditorLayersProps {
  elements: CanvasElement[]
  selectedId: string | null
  onSelectElement: (id: string) => void
  onDeleteElement: (id: string) => void
  onMoveLayer: (id: string, direction: "up" | "down" | "top" | "bottom") => void
}

export function EditorLayers({
  elements,
  selectedId,
  onSelectElement,
  onDeleteElement,
  onMoveLayer,
}: EditorLayersProps) {
  const getElementLabel = (element: CanvasElement) => {
    if (element.type === "text") return element.text || "文本"
    if (element.type === "image") return "图片"
    if (element.type === "shape") return element.shape === "circle" ? "圆形" : "矩形"
    return "元素"
  }

  return (
    <div className="border-t border-border p-4">
      <h3 className="mb-4 font-semibold">图层</h3>
      <ScrollArea className="h-64">
        <div className="space-y-1">
          {elements.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">暂无图层</div>
          ) : (
            [...elements].reverse().map((element, index) => (
              <div
                key={element.id}
                className={`group flex items-center gap-2 rounded-md p-2 hover:bg-muted ${
                  selectedId === element.id ? "bg-muted" : ""
                }`}
                onClick={() => onSelectElement(element.id)}
              >
                <div className="flex-1 truncate text-sm">{getElementLabel(element)}</div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveLayer(element.id, "top")
                    }}
                  >
                    <ChevronsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveLayer(element.id, "up")
                    }}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveLayer(element.id, "down")
                    }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveLayer(element.id, "bottom")
                    }}
                  >
                    <ChevronsDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteElement(element.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
