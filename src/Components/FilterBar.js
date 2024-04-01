import { useState } from 'react';
import Dropdown from './Base/Dropdown';
import CreateTaskModal from './CreateTaskModal';
import DatePicker from 'react-datepicker';
import { BsCalendar4Event, BsXSquareFill } from "react-icons/bs";
import './Styles.css';
import "react-datepicker/dist/react-datepicker.css";

export default function FilterBar({
    priorities,
    assigneeName,
    setAssigneeName,
    priority,
    setPriority,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}) {
    const [isModalActive, setIsModalActive] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState(null);

    const onChangeDateRange = (dates) => {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            const startDay = start.getDate().toString().padStart(2, '0');
            const startMonth = (start.getMonth() + 1).toString().padStart(2, '0');
            const startYear = start.getFullYear().toString();

            const endDay = end.getDate().toString().padStart(2, '0');
            const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');
            const endYear = end.getFullYear().toString();

            const s = `${startDay}/${startMonth}/${startYear}`;
            const e = `${endDay}/${endMonth}/${endYear}`;

            setDatePickerValue(`${s} - ${e}`);
        }
    };

    if (isModalActive) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <div
          style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 10px 20px 10px",
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
                  marginRight: 10,
              }}
            >
              Filter By:
            </p>
            <input
              type="text"
              placeholder='Assignee Name'
              name="assignee"
              value={ assigneeName }
              onChange={ (event) => setAssigneeName(event.target.value) }
              style={{
                  width: 240,
                  height: 40,
                  boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                  fontWeight: "bold",
                  backgroundColor: "#faf6fd",
                  color: "#67646b",
                  marginRight: 10,
                  fontSize: 16,
                  paddingLeft: 10,
                  borderRadius: 8,
                  border: "none",
              }}
            >
            </input>

            <Dropdown
              buttonText='Priority'
              items={ priorities }
              selectedItem={ priority }
              setSelectedItem={ (priority) => setPriority(priority) }
              containerStyles={{
                  width: 250,
                  marginRight: 10,
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

            <div
              style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  width: 250,
              }}
            >
              <DatePicker
                className="datePickerBox"
                style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#faf6fd",
                    color: "#333",
                    boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                    fontWeight: "bold",
                    fontSize: 16,
                    paddingLeft: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 8,
                    border: "none",
                }}
                value={ datePickerValue }
                placeholderText='DD/MM/YYY - DD/MM/YYY'
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                onChange={ onChangeDateRange }
                isClearable={true}
              />
              <BsCalendar4Event
                style={{
                    fontSize: 20,
                    color: "#67646b",
                    position: "absolute",
                    right: 1,
                }}
              />
            </div>

            {/* <div */}
            {/*   style={{ */}
            {/*       display: "flex", */}
            {/*       marginLeft: 30, */}
            {/*       marginTop: 5, */}
            {/*   }} */}
            {/* > */}
            {/*   <p */}
            {/*     style={{ */}
            {/*         color: "#67646b", */}
            {/*         textAlign: "center", */}
            {/*         marginRight: 10, */}
            {/*     }} */}
            {/*   > */}
            {/*     Clear filter */}
            {/*   </p> */}
            {/*   <BsXSquareFill */}
            {/*     style={{ */}
            {/*         fontSize: 20, */}
            {/*         color: "#67646b", */}
            {/*     }} */}
            {/*   /> */}
            {/* </div> */}
          </div>
          <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                  fontSize: 16,
                  width: 340,
                  backgroundColor: "#25689c",
                  color: "white",
                  borderRadius: 8,
                  padding: "10px 50px 10px 50px",
              }}
              onClick={ () => setIsModalActive(!isModalActive) }
            >
              Add New Task
            </button>
          </div>

          { isModalActive &&
            <CreateTaskModal
              items={ priorities }
              onClickOutside={ () => setIsModalActive(false) }
              onClickClose={ () => setIsModalActive(false) }
            />
          }
        </div>
    );
}
