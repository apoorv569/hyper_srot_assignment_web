import { useState } from 'react';
import useFetch from './Utils/useFetch';
import { parseDate } from './Utils/parseDate';
import Navbar from './Components/Base/Navbar';
import FilterBar from './Components/FilterBar';
import SortBar from './Components/SortBar';
import Board from './Components/Base/Board';
import Card from './Components/Base/Card';
import Menu from './Components/Base/Menu';
import DeleteTaskModal from './Components/DeleteTaskModal';
import EditTaskModal from './Components/EditTaskModal';
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
    const priorities = ['P0', 'P1', 'P2'];
    const status = ['Assign', 'In Progress', 'Completed', 'Deployed', 'Deffered'];

    const [isEditTaskModalActive, setIsEditTaskModalActive] = useState(false);
    const [isDeleteTaskModalActive, setIsDeleteTaskModalActive] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [menuTriggerPosition, setMenuTriggerPosition] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [sortOption, setSortOption] = useState(null);

    const [assigneeName, setAssigneeName] = useState("");
    const [priority, setPriority] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const menuItems = ["Edit", "Delete"];

    let { data, isLoading, error } = useFetch("http://localhost:8000/tasks");

    if (isEditTaskModalActive || isDeleteTaskModalActive) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    // sort the data based on the selected option
    const sortData = (option) => {
        switch (option) {
        case "Priority":
            if (data) {
                console.log("Sorting by priority..", sortOption);

                const priorityValues = { "P0": 0, "P1": 1, "P2": 2 };

                return data.sort((a, b) => {
                    const priorityValueA = priorityValues[a.priority];
                    const priorityValueB = priorityValues[b.priority];

                    return priorityValueA - priorityValueB;
                });
            }
            break;
        case "Start date":
            if (data) {
                console.log("Sorting by start date..", sortOption);

                return data.sort((a, b) => parseDate(b.start_date) - parseDate(a.start_date));
            }
            break;
        case "End date":
            if (data) {
                console.log("Sorting by end date..", sortOption);

                const sortedData = data.sort((a, b) => {
                    if (a.end_date || b.end_date) {
                        console.log("End date a and b: ", a.end_date, b.end_date);

                        return parseDate(b.end_date) - parseDate(a.end_date);
                    } else {
                        console.error("Cannot compare null date. Getting unsorted data.");

                        return data;
                    }
                });

                return sortedData;
            }
            break;
        default:
            if (data) {
                console.log("Not sorting data..", sortOption);

                return data;
            }
        }
    };

    const sortedData = sortData(sortOption);

    if (assigneeName) {
        data = data.filter(task => task.assignee === assigneeName);
    }

    if (priority) {
        data = data.filter(task => task.priority === priority);
    }

    if (startDate && endDate) {
        data = data.filter(task => {
            const start = parseDate(task.start_date);

            return start >= startDate && start <= endDate;
        });
    }

    return (
        <div
          style={{
              padding: 30,
          }}
        >
          <Navbar avatarSize={ 64 } avatarImgSrc={ require('./logo192.png') } />
          <div
            style={{
                borderWidth: 4,
                borderStyle: "solid",
                borderColor: "white",
                borderRadius: 12,
                padding: 10,
                boxShadow: "4 4 14 4 rgba(0, 0, 0, 0.4)",
            }}
          >
            <FilterBar
              priorities={ priorities }
              assigneeName={ assigneeName }
              setAssigneeName={ (name) => { console.log("Assignee name: ", name); setAssigneeName(name); }}
              priority={ priority }
              setPriority={ (priority) => setPriority(priority) }
              startDate={ startDate }
              setStartDate={ (date) => setStartDate(date) }
              endDate={ endDate }
              setEndDate={ (date) => setEndDate(date) }
            />
            <SortBar
              priorities={ priorities }
              selectedItem={ sortOption }
              setSelectedItem={ (item) => setSortOption(item) }
            />
            <div
              style={{
                  display: "flex",
                  flexDirection: "row",
              }}
            >
              <Board title="Pending" titleBackgroundColor="#8c8b90">
                {error &&
                 <div
                   style={{
                       backgroundColor: "crimson",
                       color: "black",
                       margin: 10,
                       padding: 10,
                       borderRadius: 4,
                   }}
                 >
                   { error }
                 </div>
                }
                {isLoading &&
                 <div
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       alignItems: "center",
                   }}
                 >
                   <ClipLoader
                     color="#25689c"
                     size={150}
                   />
                 </div>
                }
                {!isLoading && !error &&
                 data
                 .filter(task => task.status === "Assign")
                 .map(task => (
                     <Card
                       key={task.id}
                       title={task.title}
                       description={task.description}
                       person={task.assignee}
                       priority={task.priority}
                       status={task.status}
                       onClickOptions={(e) => {
                           setIsMenuActive(!isMenuActive);
                           setCurrentTask(task);

                           const rect = e.target.getBoundingClientRect();
                           setMenuTriggerPosition({
                               top: rect.top,
                               left: rect.left,
                               width: rect.width,
                               height: rect.height
                           });
                       }}
                     />
                 ))}
                <Menu
                  items={ menuItems }
                  setSelectedItem={ (item) => {
                      if (item === "Edit") {
                          setIsEditTaskModalActive(true);
                      }

                      if (item === "Delete") {
                          setIsDeleteTaskModalActive(true);
                      }
                  }}
                  isActive={ isMenuActive }
                  setIsActive={ setIsMenuActive }
                  contentStyles={{
                      width: 140,
                      boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                      borderRadius: 8,
                  }}
                  itemStyles={{
                      padding: "5px 10px 5px 10px",
                  }}
                  triggerPosition={ menuTriggerPosition }
                />
              </Board>
              <Board title="In Progress" titleBackgroundColor="#e79825">
                {error &&
                 <div
                   style={{
                       backgroundColor: "crimson",
                       color: "black",
                       margin: 10,
                       padding: 10,
                       borderRadius: 4,
                   }}
                 >
                   { error }
                 </div>
                }
                {isLoading &&
                 <div
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       alignItems: "center",
                       height: "100%",
                   }}
                 >
                   <ClipLoader
                     color="#25689c"
                     size={150}
                   />
                 </div>
                }
                {!isLoading && !error &&
                 data
                 .filter(task => task.status === "In Progress")
                 .map(task => (
                     <Card
                       key={task.id}
                       title={task.title}
                       description={task.description}
                       person={task.assignee}
                       priority={task.priority}
                       status={task.status}
                       onClickOptions={(e) => {
                           setIsMenuActive(!isMenuActive);
                           setCurrentTask(task);

                           const rect = e.target.getBoundingClientRect();
                           setMenuTriggerPosition({
                               top: rect.top,
                               left: rect.left,
                               width: rect.width,
                               height: rect.height
                           });
                       }}
                     />
                 ))}
                <Menu
                  items={ menuItems }
                  setSelectedItem={ (item) => {
                      if (item === "Edit") {
                          setIsEditTaskModalActive(true);
                      }

                      if (item === "Delete") {
                          setIsDeleteTaskModalActive(true);
                      }
                  }}
                  isActive={ isMenuActive }
                  setIsActive={ setIsMenuActive }
                  contentStyles={{
                      width: 140,
                      boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                      borderRadius: 8,
                  }}
                  itemStyles={{
                      padding: "5px 10px 5px 10px",
                  }}
                  triggerPosition={ menuTriggerPosition }
                />
              </Board>
              <Board title="Completed" titleBackgroundColor="#42a81e">
                {error &&
                 <div
                   style={{
                       backgroundColor: "crimson",
                       color: "black",
                       margin: 10,
                       padding: 10,
                       borderRadius: 4,
                   }}
                 >
                   { error }
                 </div>
                }
                {isLoading &&
                 <div
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       alignItems: "center",
                       height: "100%",
                   }}
                 >
                   <ClipLoader
                     color="#25689c"
                     size={150}
                   />
                 </div>
                }
                {!isLoading && !error &&
                 data
                 .filter(task => task.status === "Completed")
                 .map(task => (
                     <Card
                       key={task.id}
                       title={task.title}
                       description={task.description}
                       person={task.assignee}
                       priority={task.priority}
                       status={task.status}
                       onClickOptions={(e) => {
                           setIsMenuActive(!isMenuActive);
                           setCurrentTask(task);

                           const rect = e.target.getBoundingClientRect();
                           setMenuTriggerPosition({
                               top: rect.top,
                               left: rect.left,
                               width: rect.width,
                               height: rect.height
                           });
                       }}
                     />
                 ))}
                <Menu
                  items={ menuItems }
                  setSelectedItem={ (item) => {
                      if (item === "Edit") {
                          setIsEditTaskModalActive(true);
                      }

                      if (item === "Delete") {
                          setIsDeleteTaskModalActive(true);
                      }
                  }}
                  isActive={ isMenuActive }
                  setIsActive={ setIsMenuActive }
                  contentStyles={{
                      width: 140,
                      boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                      borderRadius: 8,
                  }}
                  itemStyles={{
                      padding: "5px 10px 5px 10px",
                  }}
                  triggerPosition={ menuTriggerPosition }
                />
              </Board>
              <Board title="Deployed" titleBackgroundColor="#353876">
                {error &&
                 <div
                   style={{
                       backgroundColor: "crimson",
                       color: "black",
                       margin: 10,
                       padding: 10,
                       borderRadius: 4,
                   }}
                 >
                   { error }
                 </div>
                }
                {isLoading &&
                 <div
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       alignItems: "center",
                       height: "100%",
                   }}
                 >
                   <ClipLoader
                     color="#25689c"
                     size={150}
                   />
                 </div>
                }
                {!isLoading && !error &&
                 data
                 .filter(task => task.status === "Deployed")
                 .map(task => (
                     <Card
                       key={task.id}
                       title={task.title}
                       description={task.description}
                       person={task.assignee}
                       priority={task.priority}
                       status={task.status}
                       onClickOptions={(e) => {
                           setIsMenuActive(!isMenuActive);
                           setCurrentTask(task);

                           const rect = e.target.getBoundingClientRect();
                           setMenuTriggerPosition({
                               top: rect.top,
                               left: rect.left,
                               width: rect.width,
                               height: rect.height
                           });
                       }}
                     />
                 ))}
                <Menu
                  items={ menuItems }
                  setSelectedItem={ (item) => {
                      if (item === "Edit") {
                          setIsEditTaskModalActive(true);
                      }

                      if (item === "Delete") {
                          setIsDeleteTaskModalActive(true);
                      }
                  }}
                  isActive={ isMenuActive }
                  setIsActive={ setIsMenuActive }
                  contentStyles={{
                      width: 140,
                      boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                      borderRadius: 8,
                  }}
                  itemStyles={{
                      padding: "5px 10px 5px 10px",
                  }}
                  triggerPosition={ menuTriggerPosition }
                />
              </Board>
              <Board title="Deffered" titleBackgroundColor="#f68871">
                {error &&
                 <div
                   style={{
                       backgroundColor: "crimson",
                       color: "black",
                       margin: 10,
                       padding: 10,
                       borderRadius: 4,
                   }}
                 >
                   { error }
                 </div>
                }
                {isLoading &&
                 <div
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       alignItems: "center",
                       height: "100%",
                   }}
                 >
                   <ClipLoader
                     color="#25689c"
                     size={150}
                   />
                 </div>
                }
                {!isLoading && !error &&
                 data
                 .filter(task => task.status === "Deffered")
                 .map(task => (
                     <Card
                       key={task.id}
                       title={task.title}
                       description={task.description}
                       person={task.assignee}
                       priority={task.priority}
                       status={task.status}
                       onClickOptions={(e) => {
                           setIsMenuActive(!isMenuActive);
                           setCurrentTask(task);

                           const rect = e.target.getBoundingClientRect();
                           setMenuTriggerPosition({
                               top: rect.top,
                               left: rect.left,
                               width: rect.width,
                               height: rect.height
                           });
                       }}
                     />
                 ))}
                <Menu
                  items={ menuItems }
                  setSelectedItem={ (item) => {
                      if (item === "Edit") {
                          setIsEditTaskModalActive(true);
                      }

                      if (item === "Delete") {
                          setIsDeleteTaskModalActive(true);
                      }
                  }}
                  isActive={ isMenuActive }
                  setIsActive={ setIsMenuActive }
                  contentStyles={{
                      width: 140,
                      boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
                      borderRadius: 8,
                  }}
                  itemStyles={{
                      padding: "5px 10px 5px 10px",
                  }}
                  triggerPosition={ menuTriggerPosition }
                />
              </Board>
            </div>
          </div>

          { isEditTaskModalActive &&
            <EditTaskModal
              task={ currentTask }
              items={ priorities }
              onClickOutside={ () => setIsEditTaskModalActive(false) }
              onClickClose={ () => setIsEditTaskModalActive(false) }
            />
          }

          { isDeleteTaskModalActive &&
            <DeleteTaskModal
              task={ currentTask }
              onClickOutside={ () => setIsDeleteTaskModalActive(false) }
              onClickClose={ () => setIsDeleteTaskModalActive(false) }
            />
          }
        </div>
    );
}
