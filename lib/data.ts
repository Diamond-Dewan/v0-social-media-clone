// This is a mock data file that would be replaced with actual API calls

export interface User {
  id: string
  name: string
  username: string
  image: string
  bio: string
  followingCount: number
  followersCount: number
}

export interface Murmur {
  id: string
  content: string
  createdAt: Date
  likeCount: number
  replyCount: number
  retweetCount: number
  isLiked: boolean
  userId: string
  user: User
}

// Mock users
export const users: User[] = [
  {
    id: "1",
    name: "Ahmad Badreddin",
    username: "ahmad_b",
    image: "/placeholder.svg?height=40&width=40",
    bio: "Software engineer and aviation enthusiast",
    followingCount: 245,
    followersCount: 587,
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    image: "/placeholder.svg?height=40&width=40",
    bio: "Digital marketer and coffee lover",
    followingCount: 320,
    followersCount: 1240,
  },
  {
    id: "3",
    name: "Current User",
    username: "current_user",
    image: "/placeholder.svg?height=40&width=40",
    bio: "This is you!",
    followingCount: 150,
    followersCount: 89,
  },
]

// Mock murmurs
export const murmurs: Murmur[] = [
  {
    id: "1",
    content: "jet came to check out the landing gear on AirCanada flight 837. Everything is under control",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likeCount: 98,
    replyCount: 2,
    retweetCount: 20,
    isLiked: true,
    userId: "1",
    user: users[0],
  },
  {
    id: "2",
    content: "Just launched our new product! Check it out at example.com #excited",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likeCount: 45,
    replyCount: 5,
    retweetCount: 12,
    isLiked: false,
    userId: "2",
    user: users[1],
  },
  {
    id: "3",
    content: "Working on a new feature for our app. Can't wait to share it with you all!",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likeCount: 32,
    replyCount: 3,
    retweetCount: 8,
    isLiked: true,
    userId: "3",
    user: users[2],
  },
  {
    id: "4",
    content: "Just finished reading an amazing book on artificial intelligence. Highly recommend!",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likeCount: 67,
    replyCount: 12,
    retweetCount: 15,
    isLiked: false,
    userId: "1",
    user: users[0],
  },
  {
    id: "5",
    content: "Beautiful sunset today! 🌅",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likeCount: 89,
    replyCount: 7,
    retweetCount: 23,
    isLiked: true,
    userId: "2",
    user: users[1],
  },
  {
    id: "6",
    content: "Just had the best coffee of my life at that new place downtown.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    likeCount: 41,
    replyCount: 9,
    retweetCount: 5,
    isLiked: false,
    userId: "3",
    user: users[2],
  },
  {
    id: "7",
    content: "Excited to announce I'll be speaking at the tech conference next month!",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    likeCount: 112,
    replyCount: 24,
    retweetCount: 37,
    isLiked: true,
    userId: "1",
    user: users[0],
  },
  {
    id: "8",
    content: "Just hit 10k followers! Thank you all for your support.",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    likeCount: 245,
    replyCount: 42,
    retweetCount: 56,
    isLiked: false,
    userId: "2",
    user: users[1],
  },
  {
    id: "9",
    content: "Working from home today. My cat keeps sitting on my keyboard.",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    likeCount: 78,
    replyCount: 15,
    retweetCount: 8,
    isLiked: true,
    userId: "3",
    user: users[2],
  },
  {
    id: "10",
    content: "Just watched the latest episode of that show everyone's talking about. No spoilers, but wow!",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    likeCount: 56,
    replyCount: 23,
    retweetCount: 4,
    isLiked: false,
    userId: "1",
    user: users[0],
  },
]

// Mock data fetching functions
export async function getMurmurs(page = 1, limit = 10) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedMurmurs = murmurs.slice(start, end)

  return {
    murmurs: paginatedMurmurs,
    totalPages: Math.ceil(murmurs.length / limit),
  }
}

export async function getMurmurById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return murmurs.find((murmur) => murmur.id === id)
}

export async function getUserById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return users.find((user) => user.id === id)
}

export async function getUserMurmurs(userId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return murmurs.filter((murmur) => murmur.userId === userId)
}

export async function getCurrentUser() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Return the mock current user (id: "3")
  return users[2]
}

export async function toggleLike(murmurId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const murmur = murmurs.find((m) => m.id === murmurId)

  if (murmur) {
    murmur.isLiked = !murmur.isLiked
    murmur.likeCount = murmur.isLiked ? murmur.likeCount + 1 : murmur.likeCount - 1
    return murmur
  }

  return null
}

export async function deleteMurmur(murmurId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = murmurs.findIndex((m) => m.id === murmurId)

  if (index !== -1) {
    const deleted = murmurs.splice(index, 1)[0]
    return deleted
  }

  return null
}

export async function createMurmur(content: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Get the current user
  const currentUser = await getCurrentUser()

  // Create a new murmur
  const newMurmur: Murmur = {
    id: `new-${Date.now()}`,
    content,
    createdAt: new Date(),
    likeCount: 0,
    replyCount: 0,
    retweetCount: 0,
    isLiked: false,
    userId: currentUser.id,
    user: currentUser,
  }

  // Add the new murmur to the beginning of the murmurs array
  murmurs.unshift(newMurmur)

  return newMurmur
}
