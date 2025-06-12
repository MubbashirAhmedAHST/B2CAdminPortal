import EmployeeDetail from "../components/EmployeeDetailSection";

export const metadata = {
  title: "Employee Detail | Admin | Click Ship & Go",
  description: "Employee Detail page",
};

export default  function EmployeeProfilePage({ params }) {
  const { adminID } =  params;

  return <EmployeeDetail adminID={adminID} />;
}
