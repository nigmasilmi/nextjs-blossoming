import { Fragment } from "react";
import { getAllEventsIds } from "../../helpers/api-utils";
import { getEventById } from "../../helpers/api-utils";

import ErrorAlert from "../../components/ui/error-alert";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = (props) => {
  const event = props.event;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
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
  };
}

export async function getStaticPaths() {
  const eventIds = await getAllEventsIds();
  const eventsPaths = eventIds.map((id) => ({ params: { eventId: id } }));
  return {
    paths: eventsPaths,
    fallback: false,
  };
}

export default EventDetailPage;
