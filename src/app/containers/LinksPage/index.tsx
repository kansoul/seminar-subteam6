import { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { HEADER_TABLE_LINKS } from "../../configs";
import { Links } from "../../types/Link";
import { createLink, deleteLink, getLink } from "../../services/links";
import Modal from "../../components/Modal";

export default function LinksPage() {
  const [links, setLinks] = useState<Links[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isCreate, setCreate] = useState<boolean>(false);

  const handleFetchLinks = async () => {
    try {
      const data = await getLink();
      if (data && data?.data) {
        setLinks(data.data);
        setLoading(false);
      }
    } catch (error) {
      alert("Có lỗi xãy ra!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLink(id);
    } catch (error) {
      alert("Có lỗi xãy ra!");
    } finally {
      handleFetchLinks();
    }
  };

  useEffect(() => {
    handleFetchLinks();
    // eslint-disable-next-line
  }, []);

  const handleCloseModal = (created?: boolean) => {
    setCreate(false);
    if (created) handleFetchLinks();
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setCreate(true)}
        className="w-40 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Thêm Link App
      </button>
      <TableComponent
        headerTable={HEADER_TABLE_LINKS}
        dataTable={links}
        isLoading={isLoading}
        removeTable={handleDelete}
      />
      {isCreate && (
        <Modal
          apiModal={createLink}
          dataKey={HEADER_TABLE_LINKS}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
