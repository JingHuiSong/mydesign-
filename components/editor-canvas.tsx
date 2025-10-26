"use client"

import type React from "react"
import { useRef, useState } from "react"
import type { CanvasElement } from "@/components/poster-editor"

interface EditorCanvasProps {
  elements: CanvasElement[]
  selectedId: string | null
  canvasSize: { width: number; height: number }
  onSelectElement: (id: string | null) => void
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void
}

export function EditorCanvas({
  elements,
  selectedId,
  canvasSize,
  onSelectElement,
  onUpdateElement,
}: EditorCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation()
    onSelectElement(elementId)
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    const element = elements.find((el) => el.id === selectedId)
    if (element) {
      const newX = Math.max(0, Math.min(canvasSize.width - element.width, element.x + deltaX))
      const newY = Math.max(0, Math.min(canvasSize.height - element.height, element.y + deltaY))

      onUpdateElement(selectedId, {
        x: newX,
        y: newY,
      })
    }

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onSelectElement(null)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        ref={canvasRef}
        className="relative bg-background shadow-2xl"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute cursor-move ${selectedId === element.id ? "ring-2 ring-primary" : ""}`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {element.type === "text" && (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  fontSize: element.fontSize,
                  fontWeight: element.fontWeight,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  textAlign: element.textAlign,
                }}
              >
                {element.text}
              </div>
            )}

            {element.type === "image" && (
              <img
                src={element.src || "/placeholder.svg"}
                alt="Element"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=400"
                }}
              />
            )}

            {element.type === "shape" && (
              <div
                className="h-full w-full"
                style={{
                  backgroundColor: element.fill,
                  border: `${element.strokeWidth}px solid ${element.stroke}`,
                  borderRadius: element.shape === "circle" ? "50%" : "0",
                }}
              />
            )}

            {selectedId === element.id && (
              <>
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-primary" />
                <div className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-primary" />
              </>
            )}
          </div>
        ))}

        {elements.length === 0 && (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">从左侧工具栏添加元素开始创作</p>
              <p className="mt-2 text-sm">点击文本、图片或形状工具</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
