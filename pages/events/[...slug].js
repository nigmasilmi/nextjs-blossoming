import { useRouter } from "next/router";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummyEventsData";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);
  // because we have access to the url segments only after the component is rendered for the first time
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  // validate if the array comes with more than 2 values (simple validation)

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2023 ||
    numYear < 2022 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust the values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">
            No events found for {numYear}/{numMonth}
          </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
