"use client"

import { useState, useEffect } from "react"
import { MurmurCard } from "@/components/murmur-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { getCurrentUser, getUserMurmurs, deleteMurmur } from "@/lib/data"
import type { User, Murmur } from "@/lib/data"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      try {
        const userData = await getCurrentUser()
        setUser(userData)

        if (userData) {
          const userMurmurs = await getUserMurmurs(userData.id)
          setMurmurs(userMurmurs)
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleDeleteMurmur = async (murmurId: string) => {
    try {
      await deleteMurmur(murmurId)
      setMurmurs(murmurs.filter((m) => m.id !== murmurId))
    } catch (error) {
      console.error("Failed to delete murmur:", error)
    }
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
      </div>
    )
  }

  return (
    <div>
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
          <Button variant="outline">Edit profile</Button>
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
                  <div key={murmur.id} className="relative group">
                    <MurmurCard murmur={murmur} />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete murmur?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your murmur.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMurmur(murmur.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
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
