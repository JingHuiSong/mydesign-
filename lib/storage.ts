import type { CanvasElement } from "@/components/poster-editor"

export interface SavedDesign {
  id: string
  title: string
  elements: CanvasElement[]
  thumbnail: string
  createdAt: string
  updatedAt: string
  size: string
  category: string
}

const STORAGE_KEY = "poster_designs"

export const storage = {
  // Get all designs
  getDesigns(): SavedDesign[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  // Get a single design by ID
  getDesign(id: string): SavedDesign | null {
    const designs = this.getDesigns()
    return designs.find((d) => d.id === id) || null
  },

  // Save a design
  saveDesign(design: SavedDesign): void {
    const designs = this.getDesigns()
    const existingIndex = designs.findIndex((d) => d.id === design.id)

    if (existingIndex >= 0) {
      designs[existingIndex] = { ...design, updatedAt: new Date().toISOString() }
    } else {
      designs.unshift(design)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs))
  },

  // Delete a design
  deleteDesign(id: string): void {
    const designs = this.getDesigns()
    const filtered = designs.filter((d) => d.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  },

  // Duplicate a design
  duplicateDesign(id: string): SavedDesign | null {
    const design = this.getDesign(id)
    if (!design) return null

    const newDesign: SavedDesign = {
      ...design,
      id: `design-${Date.now()}`,
      title: `${design.title} (副本)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.saveDesign(newDesign)
    return newDesign
  },
}

// Export canvas to image
export async function exportCanvasToImage(
  elements: CanvasElement[],
  canvasSize: { width: number; height: number },
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      resolve("")
      return
    }

    // Fill background
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw elements
    elements.forEach((element) => {
      ctx.save()
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2)
      ctx.rotate((element.rotation * Math.PI) / 180)
      ctx.translate(-(element.x + element.width / 2), -(element.y + element.height / 2))

      if (element.type === "text") {
        ctx.fillStyle = element.color || "#ffffff"
        ctx.font = `${element.fontWeight || "normal"} ${element.fontSize || 24}px sans-serif`
        ctx.textAlign = (element.textAlign as CanvasTextAlign) || "center"
        ctx.textBaseline = "middle"
        ctx.fillText(element.text || "", element.x + element.width / 2, element.y + element.height / 2)
      } else if (element.type === "shape") {
        ctx.fillStyle = element.fill || "#8b5cf6"
        ctx.strokeStyle = element.stroke || "#ffffff"
        ctx.lineWidth = element.strokeWidth || 2

        if (element.shape === "circle") {
          ctx.beginPath()
          ctx.arc(
            element.x + element.width / 2,
            element.y + element.height / 2,
            Math.min(element.width, element.height) / 2,
            0,
            2 * Math.PI,
          )
          ctx.fill()
          ctx.stroke()
        } else {
          ctx.fillRect(element.x, element.y, element.width, element.height)
          ctx.strokeRect(element.x, element.y, element.width, element.height)
        }
      }

      ctx.restore()
    })

    resolve(canvas.toDataURL("image/png"))
  })
}

// Download image
export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement("a")
  link.download = filename
  link.href = dataUrl
  link.click()
}
