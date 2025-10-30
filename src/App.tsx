import React from 'react';
import DialogAlert from './components/dialog-alert';
import DialogDeleteConfirmation from './components/dialog-delete-confirmation';
import DialogManageUser from './components/dialog-manage-user';
import DialogUserDetail from './components/dialog-user-detail';
import GroupButton from './components/group-button';
import Loading from './components/loading';
import SearchBar from './components/search-bar';
import UsersCard from './components/users-card';
import UsersList from './components/users-list';
import useLoading from './hooks/use-loading';
import useUsers from './hooks/use-users';
import useViewMode from './hooks/use-view-mode';
import type { UserDataType } from './models/users';
import GetUsersServices from './services/get-users';

function App(): React.ReactElement {
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

  const [showDialogDetailUser, setShowDialogDetailUser] = React.useState<boolean>(false);
  const [showDialogManageUser, setShowDialogManageUser] = React.useState<boolean>(false);
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
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center px-4 sm:h-24">
          <p className="text-3xl font-medium">Users</p>
        </div>
        <div className="mb-4 px-4 sm:mb-8">
          <div className="flex justify-between gap-3">
            <SearchBar />
            <GroupButton />
          </div>
          <div>
            <p className="mt-1 ml-1 text-xs font-light">Showed: {totalUsers} Users</p>
          </div>
        </div>

        <div className="mb-4 px-4">
          <button
            onClick={() => {
              setSelectedUser(null);
              setShowDialogManageUser(true);
            }}
            className="flex h-10 cursor-pointer items-center gap-4 rounded-xl bg-orange-500 px-5 text-sm text-white hover:bg-orange-600"
          >
            <p>+</p>
            <p>Add New User</p>
          </button>
        </div>

        <div className="h-[calc(100svh-12.3rem)] overflow-y-auto px-4 pb-4 sm:h-[calc(100svh-17.5rem)]">
          {loading ? (
            <Loading />
          ) : users.length <= 0 ? (
            <div className="mt-6 flex w-full justify-center">
              <p>Data not found.</p>
            </div>
          ) : (
            <div
              className={`${
                viewMode === 'list'
                  ? 'flex flex-col gap-4'
                  : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {[...users]
                .sort((a, b) => b.id - a.id)
                .map((user) => {
                  if (viewMode === 'list') {
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
          setOpen={setShowDialogDetailUser}
        />
      )}
      <DialogDeleteConfirmation
        open={showDialogDeleteConfirmation}
        setOpen={setShowDialogDeleteConfirmation}
        onYes={() => {
          if (selectedUser) {
            deleteUser(selectedUser.id);
          }
        }}
      />
      <DialogManageUser
        open={showDialogManageUser}
        selectedUser={selectedUser}
        setOpen={setShowDialogManageUser}
        onSubmit={(userData: UserDataType) => {
          if (selectedUser) {
            editUser(userData);
          } else {
            addUser(userData);
          }
        }}
      />
      <DialogAlert />
    </>
  );
}

export default App;
