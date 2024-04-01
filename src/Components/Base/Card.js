import { BsThreeDotsVertical } from "react-icons/bs";

export default function Card({ title, description, person, priority, status, onClickOptions }) {
    return (
        <div
          style={{
              backgroundColor: "#f3f1f2",
              margin: 16,
              padding: 16,
              borderRadius: 16,
              boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
          >
            <p
              style={{
                  fontSize: 24,
                  fontWeight: "bold",
              }}
            >
              { title }
            </p>
            <p
              style={{
                  backgroundColor: "#25689c",
                  color: "white",
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 4,
              }}
            >
              { priority }
            </p>
          </div>
          <div
            style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: "#c9c7c8",
                height: 1,
                width: "100%",
            }}
          />
          <div
            style={{
            }}
          >
            <p
              style={{
                  fontSize: 16,
                  textAlign: "left",
              }}
            >
              { description }
            </p>
          </div>
          <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 16,
                marginBottom: 16,
            }}
          >
            <p
              style={{
                  fontWeight: "bold",
                  fontSize: 18,
              }}
            >
              @{ person }
            </p>
            <div
              style={{
                  display: "flex",
                  backgroundColor: "#25689c",
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
              }}
            >
              <BsThreeDotsVertical
                style={{
                    color: "white",
                    fontSize: 18,
                }}
                onClick={ onClickOptions }
              />
            </div>
          </div>
          <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
          >
            <p
              style={{
                  fontSize: 16,
                  backgroundColor: "#25689c",
                  color: "white",
                  textAlign: "center",
                  width: "50%",
                  padding: "8px 16px 8px 16px",
                  borderRadius: 8,
              }}
            >
              { status }
            </p>
          </div>
        </div>
    );
}
