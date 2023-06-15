import { NavLink, Outlet } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import avatarIcon from "../assets/images/avatar-icon.png";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };
  const navOptions = (
    <>
      <li>
        <h3 className="text-2xl lg:text-3xl font-bold">
          Task <span className="text-[#6c63ff]">Tracker</span>
        </h3>
      </li>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <MdManageHistory className="text-lg" />
          All Tasks
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/add-task"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <AiOutlineFileAdd className="text-lg" />
          Add A Task
        </NavLink>
      </li>
      <div className="divider"></div>
      <div className="flex ps-4 items-center gap-2">
        {user?.photoURL ? (
          <div className="avatar placeholder">
            <div className="bg-[#CDC7F8] text-neutral-content rounded-full w-12">
              <img src={user.photoURL} alt="user photo" />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="bg-[#CDC7F8] text-neutral-content rounded-full w-12">
              <img src={avatarIcon} alt="" className="p-2" />
            </div>
          </div>
        )}
        <h3 className="">{user.displayName ? user.displayName : "User3210"}</h3>
      </div>

      <button
        onClick={handleLogout}
        className="ms-3 flex gap-2 items-center bg-[#CDC7F8] px-3 py-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#A69BFB] duration-300"
      >
        <BiLogOut className="text-2xl" />
        Logout
      </button>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <GiHamburgerMenu
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden text-5xl p-2 rounded-md bg-[#CDC7F8] m-2 fixed top-0"
          />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content lg:text-lg space-y-3">
          {/* Sidebar content here */}
          {navOptions}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
