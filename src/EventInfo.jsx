import close from "./assets/buttons/x-close.svg";

import defaultPic from "./assets/events/default.jpg";
import microsoft from "./assets/events/microsoft.jpg";
import hootsuite from "./assets/events/hootsuite.jpg";



function EventDetailsModal({ event, events, onClose, onSelectEvent }) {
  const eventImages = {
      "Microsoft API Workshop" : microsoft,
      "Hootsuite API Workshop" : hootsuite,
    }

  return (
    <div className="font-[Poppins] fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[51]">
      <div className="relative bg-white rounded-lg shadow-lg w-screen min-h-[80vh] mx-[10%]">
          <div className="relative w-full h-96 rounded-lg bg-cover bg-center drop-shadow-md" 
                  style={{ backgroundImage: `url(${eventImages[event.name] || defaultPic})` }}> 
                  <button className="bg-white transition duration-300 hover:bg-gray-300 p-2 absolute top-4 right-4" onClick={onClose}>
                    <img alt="x-close" class="w-8 h-8" src={close}></img>
                  </button>
          </div>
        <div class="p-6">
          <h1 className="text-xl font-bold text-start">{event.name}</h1>
          <div class="flex w-full justify-start">
            <div class="eventType px-5 py-2 bg-green-200 rounded-lg font-bold flex items-center">
                <p>{event.event_type}</p>
            </div>
          </div>
          
          <div class="flex w-full justify-between">
            <p className="text-gray-700 text-start my-8">{event.description}</p>
          </div>
          {/* related events */}
          {event.related_events?.length > 0 && (
            <div className="mt-6 flex flex-col items-start">
              <h2 className="text-lg font-bold">related events:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {event.related_events.map((relatedId) => {
                  const relatedEvent = events.find((e) => e.id === relatedId);
                  return (
                    relatedEvent && (
                      <button
                        key={relatedEvent.id}
                        className="px-4 py-2 bg-[#717AFF] text-black transition duration-200 hover:bg-[#232ED1] rounded-md"
                        onClick={() => onSelectEvent(relatedEvent)}
                      >
                        {relatedEvent.name}
                      </button>
                    )
                  );
                })};
                </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default EventDetailsModal;

