import AdminLeftSection from "../../Components/Admin/AdminLeftSection";
import AdminRightSection from "../../Components/Admin/AdminRightSection";

const Home = () => {
  return (
    <main className="flex gap-2 min-h-screen w-full">
      <AdminLeftSection />
      <AdminRightSection />
    </main>
  );
};

export default Home;
