import AttendanceChart from "@/components/modules/dashboard/AttendanceChart";
import CountChart from "@/components/modules/dashboard/CountChart";
import EventCalender from "@/components/modules/dashboard/EventCalender";
import FinanceChart from "@/components/modules/dashboard/FinanceChart";
import UserCard from "@/components/modules/dashboard/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left side bar */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        {/* user card */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Students" />
          <UserCard type="Teachers" />
          <UserCard type="Parents" />
          <UserCard type="Staffs" />
        </div>
        {/* chart */}
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        <div className="w-full  h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* Right side bar */}

      <div className="w-full lg:w-1/3">
        <EventCalender />
      </div>
    </div>
  );
};

export default AdminPage;
