import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

const locationCoordinates = {
  Bhubaneswar: [20.2961, 85.8245],
  Cuttack: [20.4625, 85.8828],
  Kharagpur: [22.3460, 87.2319],
  Kolkata: [22.5726, 88.3639],
  India: [22.9734, 78.6569],
};

function ComplaintMap({ complaints }) {
  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[20.2961, 85.8245]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((complaint, index) => {
          const coordinates =
            locationCoordinates[
              complaint.location?.split(",")[0]?.trim()
            ] || [20.2961, 85.8245];

          return (
            <Marker
              key={index}
              position={coordinates}
            >
              <Popup>
                <strong>{complaint.title}</strong>

                <br />
                Category: {complaint.category}

                <br />
                Location: {complaint.location}

                <br />
                Status: {complaint.status}

                <br />
                Priority: {complaint.priority || "MEDIUM"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default ComplaintMap;