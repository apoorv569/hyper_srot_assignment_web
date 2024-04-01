import { useState } from 'react';
import Dropdown from './Base/Dropdown';
import Modal from './Base/Modal';

export default function EditTaskModal({ task, items, onClickOutside, onClickClose }) {
    const [isUploading, setIsUploading] = useState(false);

    const originalData = {
        title: task.title,
        description: task.description,
        team: task.team,
        assignees: task.assignee,
        priority: task.priority,
        status: task.status,
        start_date: task.start_date,
        end_date: task.end_date
    };

    const [formData, setFormData] = useState(originalData);

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

        const date = new Date().getDate;

        let taskData = {};

        if (task.status === "Completed") {
            taskData = {
                title: formData.title,
                description: formData.description,
                team: formData.team,
                assignee: formData.assignees,
                priority: formData.priority,
                status: formData.status,
                start_date: task.start_date,
                end_date: date
            };
        } else {
            taskData = {
                title: formData.title,
                description: formData.description,
                team: formData.team,
                assignee: formData.assignees,
                priority: formData.priority,
                status: formData.status,
                start_date: task.start_date,
                end_date: task.end_date
            };
        }

        console.log("Form data: ", formData);

        setIsUploading(true);

        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        }).then(() => {
            console.log('Task data updated');
            setIsUploading(false);
        }).catch(error => {
            console.error('Error updating task:', error);
            setIsUploading(false);
        });
    };

    return (
        <Modal
          modalWidth={450}
          modalHeight={620}
          title="EDIT TASK"
          onClickOutside={ onClickOutside }
          onClickClose={ onClickClose }
        >
          <form
            onSubmit={ onSubmitForm }
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px 20px",
                gap: "20px",
            }}
          >
            <div
              style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
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
                readOnly
                disabled
                style={{
                    width: "97%",
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
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
                rows={3}
                type="text"
                name="description"
                value={ formData.description }
                readOnly
                disabled
                style={{
                    flex: 3,
                    width: "97%",
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
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
                readOnly
                disabled
                style={{
                    flex: 3,
                    width: "97%",
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
              }}
            >
              <label
                style={{
                    flex: 1,
                    fontSize: 18,
                    textAlign: "left",
                }}
              >
                Assignee:
              </label>
              <input
                type="text"
                name="assignees"
                value={ formData.assignees }
                readOnly
                disabled
                style={{
                    flex: 3,
                    width: "97%",
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
              }}
            >
              <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
              >
                <label
                  style={{
                      flex: 1,
                      fontSize: 18,
                  }}
                >
                  Priority:
                </label>
                <Dropdown
                  buttonText={ formData.priority }
                  items={ items }
                  selectedItem={ formData.priority }
                  setSelectedItem={ (priority) => setFormData({ ...formData, priority }) }
                  containerStyles={{
                      width: 70,
                      marginRight: 50,
                  }}
                  buttonStyles={{
                      padding: "5px 10px 5px 10px",
                      color: "#1c1c1c",
                      backgroundColor: "#fdfdfa",
                      border: "solid",
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: "#aba4b0",
                  }}
                  contentStyles={{
                      width: 70,
                  }}
                  itemStyles={{
                      padding: "5px 10px 5px 10px",
                  }}
                />
              </div>
              <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
              >
                <label
                  style={{
                      flex: 1,
                      fontSize: 18,
                  }}
                >
                  Status:
                </label>
                <input
                  type="text"
                  name="status"
                  value={ formData.status }
                  onChange={ onChangeField }
                  style={{
                      flex: 1,
                      width: 122,
                      fontSize: 16,
                      padding: 6,
                      color: "#1c1c1c",
                      backgroundColor: "#fdfdfa",
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: "#aba4b0",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 20,
                  marginTop: 20,
              }}
            >
              <button
                type='submit'
                style={{
                    alignSelf: "center",
                    padding: "5px 30px 5px 30px",
                    backgroundColor: "#25689c",
                    color: "white",
                    borderRadius: 8,
                    boxShadow: "4px 4px 10px 4px rgba(0, 0, 0, 0.06)"
                }}
              >
                {isUploading ? "Uploading" : "Submit" }
              </button>
              <button
                type='button'
                onClick={ () => {
                    setFormData(originalData);
                }}
                style={{
                    alignSelf: "center",
                    padding: "5px 30px 5px 30px",
                    backgroundColor: "#25689c",
                    color: "white",
                    borderRadius: 8,
                    boxShadow: "4px 4px 10px 4px rgba(0, 0, 0, 0.06)"
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </Modal>
    );
}
