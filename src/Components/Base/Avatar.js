export default function Avatar({ size, imgSrc }) {
    return (
        <div
          style={{
              alignItems: "center",
          }}
        >
          <img
            style={{
                width: size,
                height: size,
                borderRadius: 50,
                backgroundColor: "white",
            }}
            src={ imgSrc }
            alt="avatar-logo-img"
          />
        </div>
    );
};
