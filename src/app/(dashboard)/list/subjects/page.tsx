import FormModal from "@/components/ui/FormModal";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/ui/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type SubjectList = Subject & { teachers: Teacher[] };

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Teachers Name",
    accessor: "teachers",
    className: "hidden lg:table-cell",
  },

  {
    header: "Actions",
    accessor: "action",
  },
];
const SubjectsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  // URL PARAMS CONDITION

  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.lessons = {
              some: {
                teacherId: value,
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count(),
  ]);
  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>

      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(",")}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <Link href={`/list/subjects/${item.id}`}>
                <button className="w-7 h-7 bg-sky rounded-full flex items-center justify-center">
                  <Image src="/view.png" width={16} height={16} alt="edit" />
                </button>
              </Link>
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="flex-1 p-4 gap-4 bg-white rounded-md m-4 mt-0">
      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              <Image src="/filter.png" width={14} height={14} alt="add" />
            </button>
            <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              <Image src="/sort.png" width={14} height={14} alt="add" />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              //   <Image src="/plus.png" width={14} height={14} alt="add" />
              // </button>
              <FormModal table="subject" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION  */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SubjectsListPage;
