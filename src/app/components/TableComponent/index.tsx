export default function TableComponent(props: {
  headerTable: string[];
  dataTable: any;
  isLoading: boolean;
  removeTable: any;
}) {
  const { headerTable, dataTable, isLoading, removeTable } = props;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headerTable.map((value, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {value}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? null
            : dataTable.map((value: any, index: number) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  {headerTable.map((val, idx) => (
                    <td className=" px-6 py-4" key={idx}>
                      {val === "icon" ? (
                        <img
                          src={`http://localhost:8081/${value["icon"]}`}
                          alt="icon"
                          width="200"
                        />
                      ) : val === "url" ? (
                        <a href={value["url"]} target={value.id}>
                          Click to redirect link
                        </a>
                      ) : (
                        value[val]
                      )}
                    </td>
                  ))}
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <span
                      onClick={() => removeTable(value?.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
