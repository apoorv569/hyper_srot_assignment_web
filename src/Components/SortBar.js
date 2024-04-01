import Dropdown from './Base/Dropdown';

export default function SortBar({ selectedItem, setSelectedItem }) {
    const sortOptions = ["Priority", "Start date", "End date"];

    return (
        <div
          style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 10px 20px 10px",
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
                  marginRight: 24,
              }}
            >
              Sort By:
            </p>
            <Dropdown
              buttonText='Priority'
              items={ sortOptions }
              selectedItem={ selectedItem }
              setSelectedItem={ setSelectedItem }
              containerStyles={{
                  width: 250,
              }}
              buttonStyles={{
                  padding: 10,
                  boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#fff",
                  borderRadius: 8,
              }}
              contentStyles={{
                  width: 229,
                  padding: 10,
                  boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                  borderRadius: 8,
              }}
              itemStyles={{
                  padding: "5px 10px 5px 10px",
              }}
            />
          </div>
        </div>
    );
}
