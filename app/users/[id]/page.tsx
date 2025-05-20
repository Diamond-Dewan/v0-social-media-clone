"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { MurmurCard } from "@/components/murmur-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { getUserById, getUserMurmurs } from "@/lib/data"
import type { User, Murmur } from "@/lib/data"
import { useRouter } from "next/navigation"

export default function UserDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    async function loadUserData() {
      setLoading(true)
      try {
        const userData = await getUserById(params.id)
        setUser(userData || null)

        if (userData) {
          const userMurmurs = await getUserMurmurs(userData.id)
          setMurmurs(userMurmurs)

          // Randomly set following status for demo
          setIsFollowing(Math.random() > 0.5)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadUserData()
    }
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  if (loading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-32 bg-muted mb-16"></div>
        <div className="flex flex-col items-center -mt-16 mb-4">
          <div className="rounded-full bg-muted h-24 w-24 border-4 border-background"></div>
          <div className="h-6 bg-muted rounded w-1/3 mt-4"></div>
          <div className="h-4 bg-muted rounded w-1/4 mt-2"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>User not found</p>
        <Button variant="link" onClick={handleBack}>
          Go back
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center p-4 gap-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{murmurs.length} murmurs</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40"></div>
        <div className="absolute top-20 left-4">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="pt-16 px-4">
        <div className="flex justify-end mb-4">
          <Button variant={isFollowing ? "outline" : "default"} onClick={toggleFollow}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <div className="mb-4">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>

          <p className="my-2">{user.bio}</p>

          <div className="flex gap-4 text-sm">
            <span>
              <strong>{user.followingCount}</strong> Following
            </span>
            <span>
              <strong>{user.followersCount}</strong> Followers
            </span>
          </div>
        </div>

        <Tabs defaultValue="murmurs" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="murmurs" className="flex-1">
              Murmurs
            </TabsTrigger>
            <TabsTrigger value="replies" className="flex-1">
              Replies
            </TabsTrigger>
            <TabsTrigger value="media" className="flex-1">
              Media
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex-1">
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="murmurs" className="mt-4">
            {murmurs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No murmurs yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {murmurs.map((murmur) => (
                  <MurmurCard key={murmur.id} murmur={murmur} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="replies" className="mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No replies yet</p>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No media yet</p>
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No likes yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
