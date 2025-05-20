"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MurmurCard } from "@/components/murmur-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getMurmurById } from "@/lib/data"
import type { Murmur } from "@/lib/data"

export default function MurmurDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [murmur, setMurmur] = useState<Murmur | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMurmur() {
      setLoading(true)
      try {
        const data = await getMurmurById(params.id)
        setMurmur(data || null)
      } catch (error) {
        console.error("Failed to fetch murmur:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadMurmur()
    }
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center p-4 gap-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Murmur</h1>
        </div>
      </div>

      {loading ? (
        <div className="p-4 animate-pulse">
          <div className="flex gap-3">
            <div className="rounded-full bg-muted h-12 w-12"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ) : murmur ? (
        <div className="p-4">
          <MurmurCard murmur={murmur} showActions={true} />
        </div>
      ) : (
        <div className="p-4 text-center">
          <p>Murmur not found</p>
          <Button variant="link" onClick={handleBack}>
            Go back
          </Button>
        </div>
      )}
    </div>
  )
}
