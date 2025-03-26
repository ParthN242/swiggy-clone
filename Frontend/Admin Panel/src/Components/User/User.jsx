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
    <div className="w-full max-h-screen flex flex-col px-2">
      <AdminHeader pageTitle={"Users"} />
      {loading ? (
        "Loading"
      ) : (
        <div className="flex-1 grid grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1  gap-4 max-sm:gap-1.5 mt-9 max-lg:mt-6 max-sm:mt-4 px-5 max-lg:p-1 max-sm:p-0">
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
      <div className="h-auto bg-orange-500 rounded-lg py-4 px-1 max-sm:py-1.5">
        <div className="flex items-center justify-center flex-col gap-2 max-sm:gap-1">
          <div>
            <img
              src={userAvatar}
              alt=""
              className="w-24 aspect-square max-sm:w-12 rounded-full"
            />
          </div>
          <p className="text-white font-medium text-xl max-sm:text-xs">User</p>
          <div className="text-white text-[16px] text-center text-balance max-md:text-sm font-semibold">
            {userData.email}
          </div>
          <p className="text-white text-[16px] text-center max-md:text-sm font-semibold">
            {userData.name}
          </p>
          <div className="flex gap-3 max-sm:gap-1">
            <div className="flex items-center gap-2 bg-primary shadow-lg text-orange-600 bg-white px-2 py-1 rounded-lg max-sm:text-sm">
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
