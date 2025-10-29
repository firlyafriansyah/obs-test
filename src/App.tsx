import * as React from "react";
import DialogAlert from "./components/dialog-alert";
import DialogDeleteConfirmation from "./components/dialog-delete-confirmation";
import DialogManageUser from "./components/dialog-manage-user";
import DialogUserDetail from "./components/dialog-user-detail";
import GroupButton from "./components/group-button";
import Loading from "./components/loading";
import SearchBar from "./components/search-bar";
import UsersCard from "./components/users-card";
import UsersList from "./components/users-list";
import useLoading from "./hooks/use-loading";
import useUsers from "./hooks/use-users";
import useViewMode from "./hooks/use-view-mode";
import type { UserDataType } from "./models/users";
import GetUsersServices from "./services/get-users";
import useAlert from "./hooks/use-alert";

function App() {
  const { setAlert } = useAlert();
  const { viewMode } = useViewMode();
  const { loading, setLoading } = useLoading();
  const {
    users,
    addUser,
    deleteUser,
    selectedUser,
    setSelectedUser,
    setUsers,
    editUser,
    totalUsers,
  } = useUsers();

  const [showDialogDetailUser, setShowDialogDetailUser] =
    React.useState<boolean>(false);
  const [showDialogManageUser, setShowDialogManageUser] =
    React.useState<boolean>(false);
  const [showDialogDeleteConfirmation, setShowDialogDeleteConfirmation] =
    React.useState<boolean>(false);

  const fetchingUsersData = React.useCallback(() => {
    GetUsersServices()
      .then((res) => setUsers(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [setLoading, setUsers]);

  React.useEffect(() => {
    setLoading(true);
    fetchingUsersData();
  }, [fetchingUsersData, setLoading, setUsers]);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16 sm:h-24 px-4">
          <p className="text-3xl font-medium">Users</p>
        </div>
        <div className="mb-4 sm:mb-8 px-4">
          <div className="flex justify-between gap-3">
            <SearchBar />
            <GroupButton />
          </div>
          <div>
            <p className="text-xs mt-1 ml-1 font-light">
              Showed: {totalUsers} Users
            </p>
          </div>
        </div>

        <div className="mb-4 px-4">
          <button
            onClick={() => setShowDialogManageUser(true)}
            className="flex gap-4 items-center h-10 px-5 rounded-xl bg-orange-500 text-white text-sm cursor-pointer hover:bg-orange-600"
          >
            <p>+</p>
            <p>Add New User</p>
          </button>
        </div>

        <div
          className={`h-[calc(100svh-13.5rem)] sm:h-[calc(100svh-17.5rem)] overflow-y-auto pb-4 px-4`}
        >
          {loading ? (
            <Loading />
          ) : users.length <= 0 ? (
            <div className="w-full flex justify-center mt-6">
              <p>Data not found.</p>
            </div>
          ) : (
            <div
              className={`${
                viewMode === "list"
                  ? "flex flex-col gap-4"
                  : "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              }`}
            >
              {[...users]
                .sort((a, b) => b.id - a.id)
                .map((user) => {
                  if (viewMode === "list") {
                    return (
                      <UsersList
                        key={user.id}
                        user={user}
                        showDetail={() => {
                          setSelectedUser(user.id);
                          setShowDialogDetailUser(true);
                        }}
                        onDelete={() => {
                          setSelectedUser(user.id);
                          setShowDialogDeleteConfirmation(true);
                        }}
                        onEdit={() => {
                          setSelectedUser(user.id);
                          setShowDialogManageUser(true);
                        }}
                      />
                    );
                  } else {
                    return (
                      <UsersCard
                        key={user.id}
                        user={user}
                        showDetail={() => {
                          setSelectedUser(user.id);
                          setShowDialogDetailUser(true);
                        }}
                        onDelete={() => {
                          setSelectedUser(user.id);
                          setShowDialogDeleteConfirmation(true);
                        }}
                        onEdit={() => {
                          setSelectedUser(user.id);
                          setShowDialogManageUser(true);
                        }}
                      />
                    );
                  }
                })}
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <DialogUserDetail
          selectedUser={selectedUser}
          open={showDialogDetailUser}
          setOpen={(open) => {
            setShowDialogDetailUser(open);
            if (!open) setSelectedUser(null);
          }}
        />
      )}
      <DialogDeleteConfirmation
        open={showDialogDeleteConfirmation}
        setOpen={(open) => {
          setShowDialogDeleteConfirmation(open);
          if (!open) setSelectedUser(null);
        }}
        onYes={() => {
          if (selectedUser) {
            setLoading(true);
            setSelectedUser(null);
            deleteUser(selectedUser.id);
            setAlert({ show: true, type: "success" });
            setLoading(false);
          }
        }}
      />
      <DialogManageUser
        open={showDialogManageUser}
        selectedUser={selectedUser}
        setOpen={(open) => {
          setShowDialogManageUser(open);
          if (!open) setSelectedUser(null);
        }}
        onSubmit={(userData: UserDataType) => {
          setLoading(true);
          if (selectedUser) {
            editUser(userData);
          } else {
            addUser(userData);
          }
          setShowDialogManageUser(false);
          setSelectedUser(null);
          setAlert({ show: true, type: "success" });
          setLoading(false);
        }}
      />
      <DialogAlert />
    </>
  );
}

export default App;
