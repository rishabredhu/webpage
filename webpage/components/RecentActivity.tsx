// Start of Selection
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";
import { useEffect, useRef } from "react";

interface ActivityItem {
  date: string;
  event: string;
  location: string;
  category: "developing" | "networking" | "hackathon";
}

const recentActivities: ActivityItem[] = [
  {
    date: "2023-07-15",
    event: "AGI Hack House Meetup",
    location: "San Francisco",
    category: "hackathon",
  },
  {
    date: "2023-07-10",
    event: "AI Agent Hack",
    location: "NYC",
    category: "hackathon",
  },
  {
    date: "2023-06-05",
    event: "Tech Networking Mixer",
    location: "San Francisco",
    category: "networking",
  },
  {
    date: "2023-06-03",
    event: "Generative AI Bay Area Meetup",
    location: "Sunnyvale",
    category: "networking",
  },
  {
    date: "2023-05-25",
    event: "Startup Pitch Night",
    location: "Palo Alto",
    category: "developing",
  },
];

export function RecentActivity() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const scrollInterval = setInterval(() => {
        if (
          scrollArea.scrollTop + scrollArea.clientHeight >=
          scrollArea.scrollHeight
        ) {
          scrollArea.scrollTop = 0;
        } else {
          scrollArea.scrollTop += 1;
        }
      }, 50);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <div className="space-y-3 bg-white p-3 border-2 border-black-800 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-sm font-bold pixelated flex items-center gap-1 text-justify text-black-800">
        <Activity className="w-2.5 h-2.5 " />
        RECENT ACTIVITY
      </h3>
      <ScrollArea
        className="h-[100px] w-full rounded-md border-2 border-black-800 p-2 bg-purple-50"
        ref={scrollAreaRef}
      >
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="mb-2 last:mb-0 p-1.5 rounded transition-colors hover:bg-white-100"
          >
            <p className="text-xs font-semibold pixelated text-black-700 text-justify">
              {activity.date}
            </p>
            <p className="text-xs pixelated text-black-900 text-justify">
              {activity.event} @ {activity.location}
            </p>
            <p className="text-xs text-black-500 pixelated text-justify">
              {activity.category}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
