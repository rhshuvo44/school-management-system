import Announcements from "@/components/modules/dashboard/Announcements";
import EventCalender from "@/components/modules/dashboard/EventCalender";
import BigCalender from "@/components/modules/student/BigCalender";

const ParentPage = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
    {/* LEFT */}
    <div className="w-full xl:w-2/3">
      <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
        <BigCalender />
      </div>
    </div>
    {/* RIGHT */}
    <div className="w-full min-h-screen xl:w-1/3 flex flex-col gap-8">
    
      <Announcements />
    </div>
  </div>
  );
};

export default ParentPage;
