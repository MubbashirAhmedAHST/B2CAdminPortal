import VendorDetailSection from "../components/VendorDetailSection";

export const metadata = {
  title: "Vendor Detail | Admin | Click Ship & Go",
  description: "Vendor Detail page",
};

export default function VendorProfilePage({ params }) {
  const { vendorID } =  params;

  return <VendorDetailSection vendorID={vendorID} />;
}
