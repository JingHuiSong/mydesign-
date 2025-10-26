import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { PosterEditor } from "@/components/poster-editor"
import { Loader2 } from "lucide-react"

function EditorContent() {
  return <PosterEditor />
}

export default function EditorPage() {
  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <EditorContent />
      </Suspense>
    </div>
  )
}
