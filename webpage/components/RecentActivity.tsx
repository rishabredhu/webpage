import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"
import { useEffect, useRef } from "react"

interface ActivityItem {
  date: string
  event: string
  location: string
}

const recentActivities: ActivityItem[] = [
  { date: "2023-07-15", event: "AGI Hack House Meetup", location: "San Francisco" },
  { date: "2023-07-10", event: "AI Agent Hack", location: "NYC" },
  { date: "2023-06-05", event: "Tech Networking Mixer", location: "San Francisco" },
  { date: "2023-06-03", event: "Generative AI Bay Area Meetup", location: "Sunnyvale" },
  { date: "2023-05-25", event: "Startup Pitch Night", location: "Palo Alto" },
]

export function RecentActivity() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const scrollInterval = setInterval(() => {
        if (scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight) {
          scrollArea.scrollTop = 0
        } else {
          scrollArea.scrollTop += 1
        }
      }, 50)

      return () => clearInterval(scrollInterval)
    }
  }, [])

  return (
    <div className="space-y-3 bg-white p-3 border-2 border-black-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(147,51,234,0.5)]">
      <h3 className="text-sm font-bold pixelated flex items-center gap-1 text-black-800">
        <Activity className="w-2.5 h-2.5" />
        RECENT ACTIVITY
      </h3>
      <ScrollArea className="h-[100px] w-full rounded-md border-2 border-black-900 p-2 bg-purple-50" ref={scrollAreaRef}>
        {recentActivities.map((activity, index) => (
          <div key={index} className="mb-2 last:mb-0 p-1.5 rounded transition-colors hover:bg-white-100">
            <p className="text-xs font-semibold pixelated text-black-700">{activity.date}</p>
            <p className="text-xs pixelated text-black-900">{activity.event} @ {activity.location}</p>
            <p className="text-xs text-black-500 pixelated"></p>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}