import { useState } from 'react';
import Dropdown from './Base/Dropdown';
import Modal from './Base/Modal';

export default function CreateTaskModal({ items, onClickOutside, onClickClose }) {
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        team: "",
        assignees: "",
        priority: "",
        status: "Assign",
        start_date: null,
        end_date: null
    });

    const onChangeField = (event) => {
        const { name, value } = event.target;

        console.log(`Field: ${name} Value: ${value}`);

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        const currentDate = new Date();

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        const formattedDate = `${day}/${month}/${year}`;

        const taskData = {
            title: formData.title,
            description: formData.description,
            team: formData.team,
            assignee: formData.assignees,
            priority: formData.priority,
            status: formData.status,
            start_date: formattedDate,
            end_date: formData.end_date,
        };

        console.log("Form data: ", taskData);

        setIsUploading(true);

        fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        }).then(() => {
            console.log('New task data added');
            setIsUploading(false);
        }).catch(error => {
            console.error('Error adding new task:', error);
            setIsUploading(false);
        });
    };

    return (
        <Modal
          modalWidth={500}
          modalHeight={430}
          title="CREATE A TASK"
          onClickOutside={ onClickOutside }
          onClickClose={ onClickClose }
        >
          <form
            onSubmit={ onSubmitForm }
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px 25px 30px 25px",
                gap: "20px",
            }}
          >
            <div
              style={{
                  display: "flex",
                  alignItems: "center",
              }}
            >
              <label
                style={{
                    flex: 1,
                    fontSize: 18,
                    textAlign: "left",
                }}
              >
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={ formData.title }
                onChange={ onChangeField }
                style={{
                    flex: 3,
                    fontSize: 16,
                    padding: 5,
                    backgroundColor: "#dadada",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "#aba4b0",
                }}
              />
            </div>

            <div
              style={{
                  display: "flex",
              }}
            >
              <label
                style={{
                    flex: 1,
                    fontSize: 18,
                    textAlign: "left",
                }}
              >
                Description:
              </label>
              <textarea
                rows={2}
                type="text"
                name="description"
                value={ formData.description }
                onChange={ onChangeField }
                style={{
                    flex: 3,
                    fontSize: 16,
                    padding: 5,
                    resize: "none",
                    backgroundColor: "#dadada",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "#aba4b0",
                }}
              />
            </div>

            <div
              style={{
                  display: "flex",
                  alignItems: "center",
              }}
            >
              <label
                style={{
                    flex: 1,
                    fontSize: 18,
                    textAlign: "left",
                }}
              >
                Team:
              </label>
              <input
                type="text"
                name="team"
                value={ formData.team }
                onChange={ onChangeField }
                style={{
                    flex: 3,
                    fontSize: 16,
                    padding: 5,
                    backgroundColor: "#dadada",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "#aba4b0",
                }}
              />
            </div>

            <div
              style={{
                  display: "flex",
                  alignItems: "center",
              }}
            >
              <label
                style={{
                    flex: 1,
                    fontSize: 18,
                    textAlign: "left",
                }}
              >
                Assignees:
              </label>
              <input
                type="text"
                name="assignees"
                value={ formData.assignees }
                onChange={ onChangeField }
                style={{
                    flex: 3,
                    fontSize: 16,
                    padding: 5,
                    backgroundColor: "#dadada",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "#aba4b0",
                }}
              />
            </div>

            <div
              style={{
                  display: "flex",
                  alignItems: "center",
              }}
            >
              <label
                style={{
                    flex: 1,
                    fontSize: 18,
                    textAlign: "left",
                }}
              >
                Priority:
              </label>
              <Dropdown
                buttonText='Priority'
                items={ items }
                selectedItem={ formData.priority }
                setSelectedItem={ (priority) => setFormData({ ...formData, priority }) }
                containerStyles={{
                    width: 140,
                    marginRight: 198,
                }}
                buttonStyles={{
                    padding: "5px 10px 5px 10px",
                    backgroundColor: "#dadada",
                    border: "solid",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "#aba4b0",
                }}
                contentStyles={{
                    width: 140,
                }}
                itemStyles={{
                    padding: "5px 10px 5px 10px",
                }}
              />
            </div>

            <div
              style={{
                  display: "flex",
                  justifyContent: "flex-end",
              }}
            >
              <button
                type='submit'
                onSubmit={() => console.log("Creating task..")}
                style={{
                    alignSelf: "center",
                    marginTop: 5,
                    padding: "5px 30px 5px 30px",
                    backgroundColor: "#25689c",
                    color: "white",
                    borderRadius: 8,
                    boxShadow: "4px 4px 10px 4px rgba(0, 0, 0, 0.06)"
                }}
              >
                { isUploading ? "Uploading" : "Create" }
              </button>
            </div>
          </form>
        </Modal>
    );
}
