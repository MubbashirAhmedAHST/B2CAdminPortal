import ShipmentDetailsSection from "../components/ShipmentDetailSection";

export const metadata = {
  title: "Shipment Detail | Admin | Click Ship & Go",
  description: "Shipment Detail page",
};

export default async function ShipmentPage({ params }) {
  const { shipmentCode } = await params;

  return <ShipmentDetailsSection shipmentCode={shipmentCode} />;
}
