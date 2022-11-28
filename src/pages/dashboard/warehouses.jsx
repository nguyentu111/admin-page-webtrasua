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
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import { authorsTableData, projectsTableData } from "@/data";
import { Link } from "react-router-dom";
const warehouses = [
  {
    id: "123",
    name: "chi nhanh da nang",
    phone_number: "0922222222",
    date_opend: "11/11/1111",
    active: "true",
  },
];
export function Warehouses() {
  const handleResetPass = (id) => {
    console.log(id);
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
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900
               focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search warehouse"
              required
            />
          </div>
        </div>
      </div>
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["name", "phone_number", "date opend", "active", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {warehouses.map(
                ({ active, date_opend, id, name, phone_number }, key) => {
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
                        <div>{phone_number}</div>
                      </td>
                      <td className={className}>
                        <div>{date_opend}</div>
                      </td>
                      <td className={className}>
                        <div>{String(active)}</div>
                      </td>
                      <td className={className}>
                        <div className="flex space-x-2">
                          <Link to={id}>
                            <Button
                              variant={"gradient"}
                              color={"blue"}
                              className="flex items-center px-3 py-1 capitalize"
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                Edit
                              </Typography>
                            </Button>
                          </Link>
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
    </div>
  );
}

export default Warehouses;
