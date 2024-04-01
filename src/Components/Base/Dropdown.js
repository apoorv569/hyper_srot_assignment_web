import { useState } from 'react';
import { BsCaretDownFill } from "react-icons/bs";

export default function Dropdown({
    buttonText,
    items,
    selectedItem,
    setSelectedItem,
    containerStyles,
    buttonStyles,
    contentStyles,
    itemStyles
}) {
    const [isActive, setIsActive] = useState(false);

    let onClickDropdownButton = () => {
        setIsActive(!isActive);
    };

    return (
        <div
          style={{
              width: 240,

              ...containerStyles
          }}
        >
          <div
            style={{
                background: "#faf6fd",
                color: "#6d686f",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                ...buttonStyles
            }}
            onClick={ onClickDropdownButton }
          >
            { selectedItem ? (
                <div>{ selectedItem }</div>
            ) : (
                <div>{ buttonText }</div>
            )}
            <BsCaretDownFill />
          </div>
          {isActive && (
              <div
                style={{
                    position: "absolute",
                    top: "auto",
                    background: "#fff",

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
                          color: "#262626",

                          onHover: {
                              backgroundColor: "gray",
                          },

                          ...itemStyles
                      }}
                      onClick={ () => {
                          setSelectedItem(item);
                          setIsActive(false);
                      }}
                    >
                      {item}
                      {index !== items.length - 1 && (
                          <div
                            style={{
                                marginTop: 5,
                                marginBottom: 5,
                                backgroundColor: "lightgray",
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
