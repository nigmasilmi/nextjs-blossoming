const getEventsUrl = process.env.NEXT_PUBLIC_GET_EVENTS;

export const getAllEvents = async () => {
  const events = [];
  try {
    const response = await fetch(getEventsUrl);
    const data = await response.json();

    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
  } catch (err) {
    console.log(err);
  }
  return events;
};

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getAllEventsIds() {
  const allEvents = await getAllEvents();
  const eventsIds = allEvents.map((event) => event.id);
  return eventsIds;
}
