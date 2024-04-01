export default function Menu({
    items,
    containerStyles,
    contentStyles,
    itemStyles,
    setSelectedItem,
    isActive,
    setIsActive,
    triggerPosition
}) {
    return (
        <div
          style={{
              ...containerStyles
          }}
        >
          {isActive && (
              <div
                style={{
                    position: "absolute",
                    top: triggerPosition.top + triggerPosition.height + 14,
                    left: triggerPosition.left - 116,
                    background: "#d9d9d9",

                    ...contentStyles
                }}
              >
                {items.map((item, index) => (
                    <div
                      key={ index }
                      style={{
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          alignItems: "flex-start",

                          ...itemStyles
                      }}
                      onClick={ () => {
                          setSelectedItem(item);
                          setIsActive(false);
                      }}
                      /* onMouseEnter={ (e) => { */
                      /*     e.target.style.backgroundColor = "lightgray"; */
                      /* }} */
                      /* onMouseLeave={ (e) => { */
                      /*     e.target.style.backgroundColor = "#d9d9d9"; */
                      /* }} */
                    >
                      {item}
                      {index !== items.length - 1 && (
                          <div
                            style={{
                                marginTop: 10,
                                backgroundColor: "#e6e6e6",
                                height: 1,
                                width: "100%",
                            }}
                          />
                      )}
                    </div>
                ))}
              </div>
          )}
        </div>
    );
}
