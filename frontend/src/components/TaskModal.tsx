import { useState, useRef } from "react";
import { TaskItem } from "@interfaces";
import { createTask, updateTask } from "../helpers/api/api";
import SpinnerModal from "./SpinnerModal";
import { convertDateLocalToUTC, convertUTCtoDateLocal } from "../helpers";

interface TaskModal {
  editItem: boolean;
  taskItem: TaskItem;
  onCompleted: ()=>void;
  buttonText: string;
  title: string;

}


const TaskModal:React.FC<TaskModal> = (props:TaskModal) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>();
  const [formData, setFormData] = useState<TaskItem>({...props.taskItem, dueDate: convertUTCtoDateLocal(props.taskItem.dueDate)});
  const resetForm = () => {
      setFormData({
        title: "",
        description: "",
        completed: false,
        dueDate: "",
        id: 0
      });
  }

  const modalSpinnerRef = useRef<{ startLoading: () => void, stopLoading: (resultHasError:boolean) => void } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processError = (error)=>{
    console.log(error);
    if(error && error.messages){
      const errors:string[] = Object.entries(error.messages).map(([field, messages]) =>
        messages.map((msg, index) => msg as string));
      setErrorMessage(errors);
    }else{
      setErrorMessage(["Got error in saving, try again later"]);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(undefined);
    modalSpinnerRef.current?.startLoading();
    if(!props.editItem){
      createTask({...formData, dueDate: convertDateLocalToUTC(formData.dueDate)}).then(()=>{
        props.onCompleted();
        modalSpinnerRef.current?.stopLoading(false);
        resetForm();
        setIsOpen(false);
      }).catch((error)=>{
        processError(error.response.data);
        modalSpinnerRef.current?.stopLoading(true);
      });
    }else{
      updateTask({...formData, dueDate: convertDateLocalToUTC(formData.dueDate)}).then(()=>{
        props.onCompleted();
        modalSpinnerRef.current?.stopLoading(false);
        setIsOpen(false);
      }).catch((error)=>{
        processError(error.response.data);
        modalSpinnerRef.current?.stopLoading(true);
      });
    }
    
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {props.buttonText ? props.buttonText : "Add Task"}
      </button>
      <SpinnerModal ref={modalSpinnerRef} />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300/75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{props.title ? props.title : "Add Task"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
                <p className="font-semibold">Error</p>
                <ul>{errorMessage.map((error, index) => (<li key={index}>{error}</li>))}</ul>
              </div>
              }
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
