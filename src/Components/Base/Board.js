export default function Board({ title, titleBackgroundColor, children }) {
    return (
        <div
          style={{
              backgroundColor: "white",
              width: 420,
              height: 560,
              margin: 10,
              borderRadius: 16,
              border: "none",
              maxHeight: 560,
              overflowY: "hidden",
          }}
        >
          <p
            style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                padding: 20,
                textAlign: "center",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                backgroundColor: titleBackgroundColor,
            }}
          >
            { title }
          </p>
          <div
            style={{
                maxHeight: 500,
                overflowY: "auto",
            }}
          >
            { children }
          </div>
        </div>
    );
}
