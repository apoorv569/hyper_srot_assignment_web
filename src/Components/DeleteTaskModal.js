import { useState } from 'react';
import Modal from './Base/Modal';

export default function DeleteTaskModal({ task, onClickOutside, onClickClose }) {
    const [isUploading, setIsUploading] = useState(false);

    const onSubmitForm = (event) => {
        event.preventDefault();

        setIsUploading(true);

        if (task.status === "Completed") {
            console.error("Unable to delete completed tasks");

            setIsUploading(false);

            return;
        }

        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: 'DELETE',
        }).then(() => {
            console.log('Task data deleted');
            setIsUploading(false);
        }).catch(error => {
            console.error('Error deleting task:', error);
            setIsUploading(false);
        });
    };

    return (
        <Modal
          modalWidth={400}
          modalHeight={190}
          title="DELETE TASK"
          onClickOutside={ onClickOutside }
          onClickClose={ onClickClose }
        >
          <form
            onSubmit={ onSubmitForm }
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 25px 30px 25px",
                gap: "20px",
            }}
          >
            <div
              style={{
                  textAlign: "left",
                  fontSize: 18,
              }}
            >
              <p>Do You Wish to Delete the Task?</p>
            </div>

            <div
              style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
              }}
            >
              <p
                style={{
                    fontWeight: "bold",
                    fontSize: 18,
                }}
              >
                { task.title }
              </p>

              <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: 20,
                    marginBottom: 15,
                }}
              >
                <button
                  type='submit'
                  style={{
                      alignSelf: "center",
                      marginTop: 15,
                      padding: "5px 30px 5px 30px",
                      backgroundColor: "#25689c",
                      color: "white",
                      borderRadius: 8,
                      boxShadow: "4px 4px 10px 4px rgba(0, 0, 0, 0.06)"
                  }}
                >
                  { isUploading ? "Deleting" : "Yes" }
                </button>
                <button
                  type='button'
                  style={{
                      alignSelf: "center",
                      marginTop: 15,
                      padding: "5px 30px 5px 30px",
                      backgroundColor: "#25689c",
                      color: "white",
                      borderRadius: 8,
                      boxShadow: "4px 4px 10px 4px rgba(0, 0, 0, 0.06)"
                  }}
                  onClick={ onClickClose }
                >
                  No
                </button>
              </div>
            </div>
          </form>
        </Modal>
    );
}
