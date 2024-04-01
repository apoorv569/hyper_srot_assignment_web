import { BsXCircle } from "react-icons/bs";

export default function Modal({ modalWidth, modalHeight, title, children, onClickOutside, onClickClose }) {
    return (
        <div
          className="modal"
          style={{
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
          }}
        >
          <div
            className="overlay"
            style={{
                background: "rgba(49, 49, 49, 0.8)",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed",
            }}
            onClick={ onClickOutside }
          >
          </div>
          <div
            className="modal-content"
            style={{
                position: "absolute",
                background: "linear-gradient(to bottom right, #f4dbf9, #d6d9fe)",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                lineHeight: 1.4,
                borderRadius: 4,
                maxWidth: 800,
                maxHeight: 800,
                width: modalWidth,
                height: modalHeight,
            }}
          >
            <div
              className="modal-header"
              style={{
                  background: "#f1f1f1",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "14px 28px",
              }}
            >
              <p
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                }}
              >
                { title }
              </p>
              <BsXCircle
                style={{
                    fontSize: 22,
                    cursor: "pointer",
                }}
                onClick={ onClickClose }
              />
            </div>
            { children }
          </div>
        </div>
    );
}
