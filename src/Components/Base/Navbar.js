import Avatar from './Avatar';

export default function Navbar({ avatarSize, avatarImgSrc }) {
    return (
        <div
          style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
          }}
        >
          <p
            style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "black",
            }}
          >
            Task Board
          </p>

          <Avatar name='Foo' size={ avatarSize } imgSrc={ avatarImgSrc }/>
        </div>
    );
}
