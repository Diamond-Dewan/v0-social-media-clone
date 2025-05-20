"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheckIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

interface SuggestedUser {
  id: string
  name: string
  username: string
  image: string
  isVerified: boolean
  isFollowing: boolean
}

export function WhoToFollow() {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([
    {
      id: "1",
      name: "Negin Gina",
      username: "negin",
      image: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      isFollowing: false,
    },
    {
      id: "2",
      name: "Narendra Modi",
      username: "nmodi",
      image: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "3",
      name: "Katy Perry",
      username: "katy",
      image: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      isFollowing: false,
    },
  ])

  const handleFollow = (userId: string) => {
    setSuggestedUsers(
      suggestedUsers.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)),
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">{user.name}</span>
                  {user.isVerified && <BadgeCheckIcon className="h-4 w-4 text-sky-400 fill-sky-400" />}
                </div>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <Button
              variant={user.isFollowing ? "outline" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleFollow(user.id)}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="link" className="text-sm w-full p-0 h-auto">
          Show more
        </Button>
      </CardContent>
    </Card>
  )
}
