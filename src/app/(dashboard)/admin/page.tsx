import UserCard from "@/components/ui/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left side bar */}
      <div className="w-full lg:w-2/3">
        {/* user card */}
        <div className="">
          <UserCard type="Student" />
          <UserCard type="Teacher" />
          <UserCard type="Parent" />
          <UserCard type="Student" />
        </div>
      </div>
      {/* Right side bar */}

      <div className="w-full lg:w-1/3"></div>
    </div>
  );
};

export default AdminPage;
