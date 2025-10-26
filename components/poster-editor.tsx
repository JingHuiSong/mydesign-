"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Save, Loader2 } from "lucide-react"
import { EditorCanvas } from "@/components/editor-canvas"
import { EditorToolbar } from "@/components/editor-toolbar"
import { EditorProperties } from "@/components/editor-properties"
import { EditorLayers } from "@/components/editor-layers"
import { AIImageDialog } from "@/components/ai-image-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { storage, exportCanvasToImage, downloadImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

export interface CanvasElement {
  id: string
  type: "text" | "image" | "shape"
  x: number
  y: number
  width: number
  height: number
  rotation: number
  text?: string
  fontSize?: number
  fontWeight?: string
  fontFamily?: string
  color?: string
  textAlign?: "left" | "center" | "right"
  src?: string
  shape?: "rectangle" | "circle" | "triangle"
  fill?: string
  stroke?: string
  strokeWidth?: number
}

interface EditorHistory {
  past: CanvasElement[][]
  present: CanvasElement[]
  future: CanvasElement[][]
}

export function PosterEditor() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [history, setHistory] = useState<EditorHistory>({
    past: [],
    present: [],
    future: [],
  })

  const elements = history.present
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [canvasSize] = useState({ width: 800, height: 1200 })
  const [designId, setDesignId] = useState<string>("")
  const [designTitle, setDesignTitle] = useState("未命名设计")
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const selectedElement = elements.find((el) => el.id === selectedId)

  const updateElements = useCallback((newElements: CanvasElement[]) => {
    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newElements,
      future: [],
    }))
  }, [])

  const handleUndo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev
      const previous = prev.past[prev.past.length - 1]
      const newPast = prev.past.slice(0, prev.past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      }
    })
  }, [])

  const handleRedo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev
      const next = prev.future[0]
      const newFuture = prev.future.slice(1)
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      }
    })
  }, [])

  const handleAlign = useCallback(
    (alignment: "left" | "center" | "right") => {
      if (!selectedId) return

      const element = elements.find((el) => el.id === selectedId)
      if (!element) return

      let newX = element.x
      if (alignment === "left") {
        newX = 50
      } else if (alignment === "center") {
        newX = (canvasSize.width - element.width) / 2
      } else if (alignment === "right") {
        newX = canvasSize.width - element.width - 50
      }

      updateElements(elements.map((el) => (el.id === selectedId ? { ...el, x: newX } : el)))
    },
    [selectedId, elements, canvasSize.width, updateElements],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      } else if ((e.metaKey || e.ctrlKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault()
        handleRedo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleUndo, handleRedo])

  useEffect(() => {
    const designParam = searchParams.get("design")
    const templateParam = searchParams.get("template")

    if (designParam) {
      const design = storage.getDesign(designParam)
      if (design) {
        setDesignId(design.id)
        setDesignTitle(design.title)
        setHistory({
          past: [],
          present: design.elements,
          future: [],
        })
        toast({
          title: "设计已加载",
          description: `已加载设计: ${design.title}`,
        })
      }
    } else if (templateParam) {
      const newId = `design-${Date.now()}`
      setDesignId(newId)
      setDesignTitle(`模板设计 ${templateParam}`)
    } else {
      const newId = `design-${Date.now()}`
      setDesignId(newId)
    }
  }, [searchParams, toast])

  useEffect(() => {
    if (!designId || elements.length === 0) return

    const autoSaveInterval = setInterval(() => {
      handleSave(true)
    }, 30000)

    return () => clearInterval(autoSaveInterval)
  }, [designId, elements, designTitle])

  const addElement = (type: CanvasElement["type"]) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      x: canvasSize.width / 2 - 100,
      y: canvasSize.height / 2 - 50,
      width: 200,
      height: 100,
      rotation: 0,
    }

    if (type === "text") {
      newElement.text = "双击编辑文本"
      newElement.fontSize = 24
      newElement.fontWeight = "normal"
      newElement.fontFamily = "sans-serif"
      newElement.color = "#ffffff"
      newElement.textAlign = "center"
    } else if (type === "image") {
      newElement.src = "/placeholder.svg?height=400&width=400"
      newElement.width = 300
      newElement.height = 300
    } else if (type === "shape") {
      newElement.shape = "rectangle"
      newElement.fill = "#8b5cf6"
      newElement.stroke = "#ffffff"
      newElement.strokeWidth = 2
    }

    updateElements([...elements, newElement])
    setSelectedId(newElement.id)
  }

  const handleAIImageGenerated = (imageUrl: string) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: "image",
      x: canvasSize.width / 2 - 200,
      y: canvasSize.height / 2 - 200,
      width: 400,
      height: 400,
      rotation: 0,
      src: imageUrl,
    }

    updateElements([...elements, newElement])
    setSelectedId(newElement.id)
  }

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    updateElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const deleteElement = (id: string) => {
    updateElements(elements.filter((el) => el.id !== id))
    if (selectedId === id) {
      setSelectedId(null)
    }
  }

  const duplicateElement = (id: string) => {
    const element = elements.find((el) => el.id === id)
    if (element) {
      const newElement = {
        ...element,
        id: `element-${Date.now()}`,
        x: element.x + 20,
        y: element.y + 20,
      }
      updateElements([...elements, newElement])
      setSelectedId(newElement.id)
    }
  }

  const moveLayer = (id: string, direction: "up" | "down" | "top" | "bottom") => {
    const index = elements.findIndex((el) => el.id === id)
    if (index === -1) return

    const newElements = [...elements]
    const [element] = newElements.splice(index, 1)

    if (direction === "up" && index < elements.length - 1) {
      newElements.splice(index + 1, 0, element)
    } else if (direction === "down" && index > 0) {
      newElements.splice(index - 1, 0, element)
    } else if (direction === "top") {
      newElements.push(element)
    } else if (direction === "bottom") {
      newElements.unshift(element)
    }

    updateElements(newElements)
  }

  const handleSave = async (isAutoSave = false) => {
    if (!designId) return

    setIsSaving(true)

    try {
      const thumbnail = await exportCanvasToImage(elements, canvasSize)

      storage.saveDesign({
        id: designId,
        title: designTitle,
        elements,
        thumbnail,
        createdAt: storage.getDesign(designId)?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        size: `${canvasSize.width}x${canvasSize.height}`,
        category: "自定义",
      })

      if (!isAutoSave) {
        toast({
          title: "保存成功",
          description: "您的设计已保存",
        })
      }
    } catch (error) {
      if (!isAutoSave) {
        toast({
          title: "保存失败",
          description: "无法保存设计，请重试",
          variant: "destructive",
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const dataUrl = await exportCanvasToImage(elements, canvasSize)
      downloadImage(dataUrl, `${designTitle}.png`)

      toast({
        title: "导出成功",
        description: "您的海报已下载",
      })
    } catch (error) {
      toast({
        title: "导出失败",
        description: "无法导出海报，请重试",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Toolbar */}
      <EditorToolbar
        onAddElement={addElement}
        onOpenAIDialog={() => {}}
        onExport={handleExport}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onAlign={handleAlign}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
      />

      {/* Main Canvas Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex items-center gap-4 border-b border-border bg-card px-6 py-3">
          <Input
            value={designTitle}
            onChange={(e) => setDesignTitle(e.target.value)}
            className="max-w-xs"
            placeholder="设计标题"
          />
          <div className="flex-1" />
          <Button onClick={() => handleSave(false)} disabled={isSaving} variant="outline">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                保存
              </>
            )}
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                导出中...
              </>
            ) : (
              "导出"
            )}
          </Button>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-muted/30 p-8">
          <EditorCanvas
            elements={elements}
            selectedId={selectedId}
            canvasSize={canvasSize}
            onSelectElement={setSelectedId}
            onUpdateElement={updateElement}
          />
        </div>
      </div>

      {/* Right Sidebar - Properties & Layers */}
      <div className="flex w-80 flex-col border-l border-border bg-card">
        <EditorProperties
          element={selectedElement}
          onUpdate={(updates) => selectedElement && updateElement(selectedElement.id, updates)}
          onDelete={() => selectedElement && deleteElement(selectedElement.id)}
          onDuplicate={() => selectedElement && duplicateElement(selectedElement.id)}
        />
        <EditorLayers
          elements={elements}
          selectedId={selectedId}
          onSelectElement={setSelectedId}
          onDeleteElement={deleteElement}
          onMoveLayer={moveLayer}
        />
      </div>

      <AIImageDialog onImageGenerated={handleAIImageGenerated} trigger={null} />
    </div>
  )
}
