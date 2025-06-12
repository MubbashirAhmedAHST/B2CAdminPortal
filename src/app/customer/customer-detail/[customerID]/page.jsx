import CustomerDetailSection from "../components/CustomerDetailSection";

export const metadata = {
  title: "Customer Detail | Admin | Click Ship & Go",
  description: "Customer Detail page",
};

export default async function CustomerDetails({ params }) {
  const { customerID } = await params;

  return <CustomerDetailSection customerID={customerID} />;
}
