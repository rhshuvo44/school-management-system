import Announcements from "@/components/modules/dashboard/Announcements";
import EventCalender from "@/components/modules/dashboard/EventCalender";
import BigCalender from "@/components/modules/student/BigCalender";

const TeacherPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* Left side bar */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <div className="h-full bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalender />
        </div>
      </div>
      {/* Right side bar */}
      <div className="w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
