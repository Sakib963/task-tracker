import Select from "react-select";
import { useForm } from "react-hook-form";
import { BiErrorCircle, BiLogIn } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../hook/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  // UseAxios
  const [axiosSecure] = useAxios();

  //   Navigate
  const navigate = useNavigate();

  // Get User to Store User Email
  const { user } = useContext(AuthContext);

  //   For Dropdown Value
  const [prioritySelected, setPrioritySelected] = useState("");
  const [statusSelected, setStatusSelected] = useState("");

  //   Dropdown Value Handling
  const handleSelectChange = (selectedOption) => {
    setPrioritySelected(selectedOption);
  };
  const handleStatusSelectChange = (selectedOption) => {
    setStatusSelected(selectedOption);
  };

  //   Priority Options
  const options = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  //   Status Options
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  //   DropDown Styles
  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "start",
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!statusSelected.value || !prioritySelected.value) {
      return;
    }
    const taskData = {
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      status: statusSelected.value,
      priority: prioritySelected.value,
      email: user.email,
    };
    console.log(taskData);

    axiosSecure.post("/tasks", taskData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/");
      }
    });
  };
  return (
    <div className="text-center mt-20 lg:mt-10">
      <h2 className="text-2xl lg:text-3xl font-bold">Add A Task</h2>
      <div>
        {/* TODO:
                    ADD A FORM TO CREATE A TASK
                */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border p-5 lg:w-3/4 mx-10 lg:mx-auto space-y-3 rounded-lg mt-10"
        >
          {/* Task Title & Priority Field */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Class Name Field */}
            <div className="space-y-1">
              <p className="font-semibold">Task Title</p>
              <div className="input input-md outline-none input-bordered">
                <input
                  type="text"
                  name="taskTitle"
                  {...register("taskTitle", {
                    required: true,
                    pattern: /^(?!\s*$).+/,
                  })}
                  placeholder="Task Title"
                  className="h-full border-none w-full outline-none"
                />
              </div>
              {errors.taskTitle && (
                <span className="text-red-600 flex items-center gap-1">
                  <BiErrorCircle /> This field is required
                </span>
              )}
            </div>
            {/* Priority Field */}
            <div className="space-y-1">
              <p className="font-semibold">Priority</p>
              <Select
                options={options}
                onChange={handleSelectChange}
                value={prioritySelected}
                labelledBy="Select"
                styles={customStyles}
              />
              {!prioritySelected && (
                <span className="text-red-600 flex items-center gap-1">
                  <BiErrorCircle /> This field is required
                </span>
              )}
            </div>
          </div>
          {/* Task Description & Status Field */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Task Description Field */}
            <div className="space-y-1">
              <p className="font-semibold">Task Description</p>
              <div className="input input-md outline-none input-bordered">
                <input
                  type="text"
                  name="taskDescription"
                  {...register("taskDescription", {
                    required: true,
                    pattern: /^(?!\s*$).+/,
                  })}
                  placeholder="Add A Description"
                  className=" h-full border-none w-full outline-none"
                />
              </div>
              {errors.taskDescription && (
                <span className="text-red-600 flex items-center gap-1">
                  <BiErrorCircle /> This field is required
                </span>
              )}
            </div>
            {/* Status Field */}
            <div className="space-y-1">
              <p className="font-semibold">Status</p>
              <Select
                options={statusOptions}
                onChange={handleStatusSelectChange}
                value={statusSelected}
                labelledBy="Select Status"
                styles={customStyles}
              />
              {!statusSelected && (
                <span className="text-red-600 flex items-center gap-1">
                  <BiErrorCircle /> This field is required
                </span>
              )}
            </div>
          </div>

          <button className="flex gap-2 justify-center items-center bg-[#CDC7F8] px-3 py-3 font-semibold rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-[#A69BFB] duration-300 w-full">
            <BiLogIn className="text-2xl" />
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
