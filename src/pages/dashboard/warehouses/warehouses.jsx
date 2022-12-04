import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
// import { authorsTableData, projectsTableData } from "@/data";
import { Link } from "react-router-dom";
import useWarehouse from "@/hooks/useWarehouse";
import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "@mui/material";
import ConfirmDialog from "@/components/ConfirmDialog";

export function Warehouses() {
  const [idChoosing, setIdChoosing] = useState(null);
  const [open, setOpen] = useState(false);
  const [warehouses, setWarehouses] = useState();
  const [page, setPage] = useState(warehouses?.meta?.current_page);

  const { getAllWarehouses, deleteWarehouse } = useWarehouse();
  useEffect(() => {
    (async () => {
      const res = await getAllWarehouses();
      setWarehouses(res);
    })();
  }, []);
  const handleOpen = (id, type) => {
    setOpen(!open);
    setIdChoosing(id);
  };
  const handleOK = () => {
    deleteWarehouse(idChoosing);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (e, npage) => {
    setPage(npage);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          {/* <label
            for="default-search"
            class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label> */}
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </div>
            <input
              type="search"
              id="default-search"
              class="primary-search"
              placeholder="Search warehouse"
              required
            />
          </div>
        </div>

        <Link to="add" className="">
          <Button
            variant={"gradient"}
            color={"blue"}
            className="flex items-center px-3 py-1 capitalize"
          >
            <Typography color="inherit" className="font-medium capitalize">
              Add Warehouse
            </Typography>
          </Button>
        </Link>
      </div>
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "name",
                  "phone number",
                  "date opend",
                  "address",
                  "active",
                  "",
                ].map((el, i) => (
                  <th
                    key={i}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {warehouses?.data?.map(
                (
                  { active, dateOpened, id, name, phoneNumber, address },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === warehouses.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div>{name}</div>
                      </td>
                      <td className={className}>
                        <div>{phoneNumber}</div>
                      </td>
                      <td className={className}>
                        <div>{dateOpened}</div>
                      </td>
                      <td className={className}>
                        <div>{address}</div>
                      </td>

                      <td className={className}>
                        <div>{String(active)}</div>
                      </td>
                      <td className={className}>
                        <div className="flex space-x-2">
                          <Link to={String(id)}>
                            <Tooltip content="Edit">
                              <PencilSquareIcon className="h-9 w-5 cursor-pointer text-light-blue-600" />
                            </Tooltip>
                          </Link>
                          <button onClick={() => handleOpen(id)}>
                            <Tooltip content="delete">
                              <TrashIcon className="h-5 w-5 cursor-pointer text-red-500" />
                            </Tooltip>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div className="m-auto w-fit">
        <Pagination
          count={Math.ceil(
            warehouses?.meta?.total / warehouses?.meta?.per_page
          )}
          page={page}
          onChange={handleChangePage}
        />
      </div>
      <ConfirmDialog
        title={"Delete this warehouse ?"}
        handleClose={handleClose}
        open={open}
        handleOK={handleOK}
      />
    </div>
  );
}

export default Warehouses;
