import Link from "next/link";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummyEventsData";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
