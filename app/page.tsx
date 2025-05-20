"use client"

import { useState, useEffect } from "react"
import { MurmurCard } from "@/components/murmur-card"
import { Pagination } from "@/components/pagination"
import { getMurmurs } from "@/lib/data"
import type { Murmur } from "@/lib/data"
import { ComposeMurmur } from "@/components/compose-murmur"
import { WhoToFollow } from "@/components/who-to-follow"

export default function HomePage() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMurmurs() {
      setLoading(true)
      try {
        const data = await getMurmurs(currentPage, 10)
        setMurmurs(data.murmurs)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("Failed to fetch murmurs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMurmurs()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const refreshMurmurs = async () => {
    setLoading(true)
    try {
      const data = await getMurmurs(currentPage, 10)
      setMurmurs(data.murmurs)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Failed to fetch murmurs:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <h1 className="text-xl font-bold p-4">Home</h1>
        </div>

        <div className="p-4">
          <ComposeMurmur onMurmurCreated={refreshMurmurs} />
        </div>

        {loading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-3">
                  <div className="rounded-full bg-muted h-12 w-12"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="divide-y">
              {murmurs.map((murmur) => (
                <MurmurCard key={murmur.id} murmur={murmur} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>

      <div className="hidden lg:block w-80 pl-4 sticky top-0 self-start h-screen overflow-y-auto pt-4">
        <WhoToFollow />
      </div>
    </div>
  )
}
