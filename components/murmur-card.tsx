import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Repeat2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MurmurCardProps {
  murmur: {
    id: string
    content: string
    createdAt: Date
    likeCount: number
    replyCount: number
    retweetCount: number
    isLiked: boolean
    user: {
      id: string
      name: string
      username: string
      image: string
    }
  }
  showActions?: boolean
}

export function MurmurCard({ murmur, showActions = true }: MurmurCardProps) {
  return (
    <Card className="p-4 border-b rounded-none hover:bg-muted/30 transition-colors">
      <div className="flex gap-3">
        <Link href={`/users/${murmur.user.id}`}>
          <Avatar>
            <AvatarImage src={murmur.user.image || "/placeholder.svg"} alt={murmur.user.name} />
            <AvatarFallback>{murmur.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <Link href={`/users/${murmur.user.id}`} className="font-semibold hover:underline truncate">
              {murmur.user.name}
            </Link>
            <span className="text-muted-foreground text-sm">
              @{murmur.user.username} · {formatDistanceToNow(murmur.createdAt, { addSuffix: false })}
            </span>
          </div>

          <Link href={`/murmurs/${murmur.id}`}>
            <p className="mt-1 whitespace-pre-wrap">{murmur.content}</p>
          </Link>

          {showActions && (
            <div className="flex justify-between mt-3 max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{murmur.replyCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-full gap-1"
              >
                <Repeat2 className="h-4 w-4" />
                <span className="text-xs">{murmur.retweetCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "hover:text-primary hover:bg-primary/10 rounded-full gap-1",
                  murmur.isLiked ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Heart className={cn("h-4 w-4", murmur.isLiked && "fill-primary")} />
                <span className="text-xs">{murmur.likeCount}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
