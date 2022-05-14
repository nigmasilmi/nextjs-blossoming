import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../helpers/api-utils";
import EventsSearch from "../../components/events/events-search";

const EventsPage = (props) => {
  const router = useRouter();
  const allEvents = props.events;
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="The best dummy events ever" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
}

export default EventsPage;
