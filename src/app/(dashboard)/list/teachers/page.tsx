import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/ui/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const TeacherListPage = () => {
  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          width={40}
          height={40}
          alt="teacher"
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className=" font-semibold">{item.name}</span>
          <span className="text-gray-500 text-xs">{item.email}</span>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 bg-sky rounded-full flex items-center justify-center">
              <Image src="/view.png" width={16} height={16} alt="edit" />
            </button>
          </Link>

          {role === "admin" && (
            <button className="w-7 h-7 bg-purple rounded-full flex items-center justify-center">
              <Image src="/delete.png" width={16} height={16} alt="" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="flex-1 p-4 gap-4 bg-white rounded-md m-4 mt-0">
      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              <Image src="/filter.png" width={14} height={14} alt="add" />
            </button>
            <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              <Image src="/sort.png" width={14} height={14} alt="add" />
            </button>
            <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              <Image src="/plus.png" width={14} height={14} alt="add" />
            </button>
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* PAGINATION  */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;