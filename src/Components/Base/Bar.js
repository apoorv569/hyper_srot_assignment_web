export default function Bar({ title, containerStyle, titleStyle, children }) {
    return (
        <div
          style={{
              display: "flex",
              justifyContent: "space-between",

              ...containerStyle
          }}
        >
          <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}
          >
            <p
              style={{
                  fontSize: 24,
                  fontWeight: "bold",

                  ...titleStyle
              }}
            >
              { title }
            </p>
            { children }
          </div>
        </div>
    );
}
