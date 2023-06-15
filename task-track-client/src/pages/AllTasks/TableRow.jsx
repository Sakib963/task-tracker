import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";

const TableRow = ({ task, index, handleDelete, handleMarkAsDone }) => {
  const { _id, taskTitle, taskDescription, status, priority } = task;
  const greenBackground = status === "completed";
  return (
    <tr className={greenBackground ? "bg-green-200" : ""}>
      <th>{index + 1}</th>
      <td>{taskTitle}</td>
      <td>
        {taskDescription.length > 50
          ? `${taskDescription.slice(0, 50)}`
          : taskDescription}
      </td>
      <td>{priority}</td>
      <td>{status}</td>
      <td>
        <div className="flex gap-2">
          <Link to={`/task/${_id}`}>
            <button title="Edit" className="btn bg-[#CDC7F8] btn-xs">
              <FiEdit />
              Edit
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            title="Edit"
            className="btn bg-[#CDC7F8] btn-xs"
          >
            <AiOutlineDelete />
            Delete
          </button>
        </div>
      </td>
      <td>
        <button
          onClick={() => handleMarkAsDone(_id)}
          disabled={status === "completed"}
          title="Mark As Completed"
          className="btn bg-[#CDC7F8] btn-xs"
        >
          <MdDoneAll />
          Mark As Done
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
