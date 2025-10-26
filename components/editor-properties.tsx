"use client"

import { Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { CanvasElement } from "@/components/poster-editor"

interface EditorPropertiesProps {
  element: CanvasElement | undefined
  onUpdate: (updates: Partial<CanvasElement>) => void
  onDelete: () => void
  onDuplicate: () => void
}

export function EditorProperties({ element, onUpdate, onDelete, onDuplicate }: EditorPropertiesProps) {
  if (!element) {
    return (
      <div className="flex-1 p-6">
        <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
          选择一个元素以编辑其属性
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">属性</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onDuplicate}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Position & Size */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">位置与大小</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="x">X</Label>
              <Input
                id="x"
                type="number"
                value={Math.round(element.x)}
                onChange={(e) => onUpdate({ x: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="y">Y</Label>
              <Input
                id="y"
                type="number"
                value={Math.round(element.y)}
                onChange={(e) => onUpdate({ y: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">宽度</Label>
              <Input
                id="width"
                type="number"
                value={Math.round(element.width)}
                onChange={(e) => onUpdate({ width: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">高度</Label>
              <Input
                id="height"
                type="number"
                value={Math.round(element.height)}
                onChange={(e) => onUpdate({ height: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>旋转: {element.rotation}°</Label>
            <Slider
              value={[element.rotation]}
              onValueChange={([value]) => onUpdate({ rotation: value })}
              min={0}
              max={360}
              step={1}
            />
          </div>
        </div>

        <Separator />

        {/* Text Properties */}
        {element.type === "text" && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">文本</h4>
            <div className="space-y-2">
              <Label htmlFor="text">内容</Label>
              <Input
                id="text"
                value={element.text}
                onChange={(e) => onUpdate({ text: e.target.value })}
                placeholder="输入文本"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">字号: {element.fontSize}px</Label>
              <Slider
                value={[element.fontSize || 24]}
                onValueChange={([value]) => onUpdate({ fontSize: value })}
                min={12}
                max={120}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontFamily">字体</Label>
              <Select value={element.fontFamily} onValueChange={(value) => onUpdate({ fontFamily: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans-serif">无衬线</SelectItem>
                  <SelectItem value="serif">衬线</SelectItem>
                  <SelectItem value="monospace">等宽</SelectItem>
                  <SelectItem value="cursive">手写</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontWeight">字重</Label>
              <Select value={element.fontWeight} onValueChange={(value) => onUpdate({ fontWeight: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lighter">细体</SelectItem>
                  <SelectItem value="normal">正常</SelectItem>
                  <SelectItem value="bold">粗体</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textAlign">对齐</Label>
              <Select
                value={element.textAlign}
                onValueChange={(value: "left" | "center" | "right") => onUpdate({ textAlign: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">左对齐</SelectItem>
                  <SelectItem value="center">居中</SelectItem>
                  <SelectItem value="right">右对齐</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">颜色</Label>
              <Input
                id="color"
                type="color"
                value={element.color}
                onChange={(e) => onUpdate({ color: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Image Properties */}
        {element.type === "image" && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">图片</h4>
            <div className="space-y-2">
              <Label htmlFor="src">图片 URL</Label>
              <Input id="src" value={element.src} onChange={(e) => onUpdate({ src: e.target.value })} />
            </div>
          </div>
        )}

        {/* Shape Properties */}
        {element.type === "shape" && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">形状</h4>
            <div className="space-y-2">
              <Label htmlFor="shape">类型</Label>
              <Select
                value={element.shape}
                onValueChange={(value: "rectangle" | "circle") => onUpdate({ shape: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">矩形</SelectItem>
                  <SelectItem value="circle">圆形</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fill">填充颜色</Label>
              <Input id="fill" type="color" value={element.fill} onChange={(e) => onUpdate({ fill: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stroke">边框颜色</Label>
              <Input
                id="stroke"
                type="color"
                value={element.stroke}
                onChange={(e) => onUpdate({ stroke: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>边框宽度: {element.strokeWidth}px</Label>
              <Slider
                value={[element.strokeWidth || 2]}
                onValueChange={([value]) => onUpdate({ strokeWidth: value })}
                min={0}
                max={20}
                step={1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
