import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { toast } from "react-toastify";
import axios from "axios";
import userAvatar from "../../Assets/avatar.png";
import { MdEmail, MdDelete } from "react-icons/md";
import DeleteModel from "../DeleteModel/DeleteModel";

const User = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("/user/all");

        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error while fetching users details");
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="w-full max-h-screen flex flex-col">
      <AdminHeader pageTitle={"Users"} />
      {loading ? (
        "Loading"
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-4 mt-10 px-5">
          {users.map((user) => (
            <UserCard key={user._id} userData={user} />
          ))}
        </div>
      )}
    </div>
  );
};

const UserCard = ({ userData }) => {
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const handleUserDelete = async () => {
    try {
      await axios.delete(`/user/${userData._id}`);
      toast.success("User deleted successfully");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while deleting user");
    }
    setOpenDeleteModel(false);
  };

  return (
    <>
      {openDeleteModel && (
        <DeleteModel
          setOpenDeleteModel={setOpenDeleteModel}
          deleteHandler={handleUserDelete}
        />
      )}
      <div className="max-w-sm h-auto bg-orange-500 rounded-lg py-4">
        <div className="flex items-center justify-center flex-col gap-2">
          <div>
            <img src={userAvatar} alt="" className="w-24 h-24 rounded-full" />
          </div>
          <p className="text-white font-medium text-xl">User</p>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-white text-[16px] font-semibold">
              {userData.email}
            </p>
            <p className="text-white text-[16px] font-semibold">
              {userData.name}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-primary shadow-lg text-orange-600 bg-white px-2 py-1 rounded-lg">
              <MdEmail />
              <p>password</p>
            </div>
            <button
              className="flex items-center gap-2 bg-primary shadow-lg text-orange-600 bg-white px-2 py-1 rounded-lg"
              onClick={() => setOpenDeleteModel(true)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
