import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";

import Button from "../../components/ui/button";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const filterData = router.query.slug;

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="Find all the events in your schedule" />
    </Head>
  );

  const getEventsUrl = process.env.NEXT_PUBLIC_GET_EVENTS;

  const [loadedEvents, setLoadedEvents] = useState();

  const { data, error } = useSWR(getEventsUrl, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>
        Events for {numYear}/{numMonth}
      </title>
      <meta name="description" content={`Events for ${numMonth}/${numYear}`} />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Try searching by different criteria</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}

        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}

      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
