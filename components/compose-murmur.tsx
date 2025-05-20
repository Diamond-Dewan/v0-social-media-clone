"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ImageIcon, SmileIcon } from "lucide-react"
import { getCurrentUser } from "@/lib/data"
import { useEffect } from "react"
import type { User } from "@/lib/data"

interface ComposeMurmurProps {
  onMurmurCreated?: () => void
}

export function ComposeMurmur({ onMurmurCreated }: ComposeMurmurProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [characterCount, setCharacterCount] = useState(0)
  const maxCharacters = 280

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }

    loadUser()
  }, [])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    if (newContent.length <= maxCharacters) {
      setContent(newContent)
      setCharacterCount(newContent.length)
    }
  }

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to create a new murmur
      console.log("Creating murmur:", content)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Clear the input after successful submission
      setContent("")
      setCharacterCount(0)

      // Notify parent component to refresh the murmur list
      if (onMurmurCreated) {
        onMurmurCreated()
      }
    } catch (error) {
      console.error("Failed to create murmur:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-4 shadow-sm border rounded-xl mb-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name || "User"} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            placeholder="Write..."
            value={content}
            onChange={handleContentChange}
            className="min-h-[80px] border-none resize-none focus-visible:ring-0 p-0 text-base"
          />

          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-primary">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-primary">
                <SmileIcon className="h-5 w-5" />
              </Button>
              {characterCount > 0 && (
                <span className="text-xs text-muted-foreground self-center ml-2">
                  {characterCount}/{maxCharacters}
                </span>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="rounded-full px-4 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Posting..." : "Tweet"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
