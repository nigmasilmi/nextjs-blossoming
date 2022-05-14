import { Fragment } from "react";
import Head from "next/head";
import {
  getAllEventsIds,
  getFeaturedEvents,
  getEventById,
} from "../../helpers/api-utils";

import ErrorAlert from "../../components/ui/error-alert";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";

const EventDetailPage = (props) => {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{props.event.title}</title>
        <meta name="description" content={props.event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const selectedEvent = await getEventById(eventId);
  return {
    props: {
      event: selectedEvent,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();
  const eventsPaths = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: eventsPaths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
