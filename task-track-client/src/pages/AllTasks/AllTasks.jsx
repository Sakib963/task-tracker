import Swal from "sweetalert2";
import useTasks from "../../hook/useTasks";
import TableRow from "./TableRow";
import useAxios from "../../hook/useAxios";

const AllTasks = () => {
  const [tasks, refetch] = useTasks();
  const [axiosSecure] = useAxios();
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/task/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Task has been deleted.", "success");
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  const handleMarkAsDone = (_id) => {
    axiosSecure
      .patch(`/task/${_id}?status=completed`)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status Updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <div className="text-center mt-20 lg:mt-10">
      <h2 className="text-2xl lg:text-3xl font-bold">All Tasks</h2>
      {tasks.length === 0 ? (
        <div className="text-center mt-10">
          <iframe
            className="mx-auto"
            src="https://embed.lottiefiles.com/animation/94729"
          ></iframe>
          <h3 className="text-2xl lg:text-3xl font-bold">No Task Added.</h3>
        </div>
      ) : (
        <div className="mt-10 lg:w-3/4 lg:mx-auto mx-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Task Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Mark As Done</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <TableRow
                    key={task._id}
                    task={task}
                    index={index}
                    handleDelete={handleDelete}
                    handleMarkAsDone={handleMarkAsDone}
                  ></TableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
