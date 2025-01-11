import FormModal from "@/components/ui/FormModal";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/ui/TableSearch";

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };


const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
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
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
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
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);
  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/avatar.png"}
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
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((sub) => sub.name).join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((className) => className.name).join(",")}
      </td>
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
            // <button className="w-7 h-7 bg-purple rounded-full flex items-center justify-center">
            //   <Image src="/delete.png" width={16} height={16} alt="" />
            // </button>
            <FormModal table="teacher" type="delete" id={item.id} />
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
            {role === "admin" && (
              // <button className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
              //   <Image src="/plus.png" width={14} height={14} alt="add" />
              // </button>
              <FormModal table="teacher" type="create" />
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

export default TeacherListPage;
