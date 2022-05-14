import Link from "next/link";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
