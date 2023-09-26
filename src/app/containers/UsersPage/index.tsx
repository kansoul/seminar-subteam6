import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import TableComponent from "../../components/TableComponent";
import { User } from "../../types/User";
import { createUser, deleteUser, getUsers } from "../../services/users";
import { HEADER_TABLE_USERS } from "../../configs";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isCreate, setCreate] = useState<boolean>(false);

  const handleFetchUsers = async () => {
    try {
      const data = await getUsers();
      if (data && data?.data) {
        setUsers(data.data);
        setLoading(false);
      }
    } catch (error) {
      alert("Có lỗi xãy ra!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      alert("Có lỗi xãy ra!");
    } finally {
      handleFetchUsers();
    }
  };

  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleCloseModal = (created?: boolean) => {
    setCreate(false);
    if (created) handleFetchUsers();
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setCreate(true)}
        className="w-40 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Thêm Tài Khoản
      </button>
      <TableComponent
        headerTable={HEADER_TABLE_USERS}
        dataTable={users}
        isLoading={isLoading}
        removeTable={handleDelete}
      />
      {isCreate && (
        <Modal
          apiModal={createUser}
          dataKey={HEADER_TABLE_USERS}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
