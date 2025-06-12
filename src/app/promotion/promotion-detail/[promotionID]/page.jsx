import PromotionDetailSection from "../components/PromotionDetailSection";

export const metadata = {
  title: "Promotion Detail | Admin | Click Ship & Go",
  description: "Promotion Detail page",
};

export default  function PromotionDetail({ params }) {
  const { promotionID } =  params;
  return <PromotionDetailSection promotionID={promotionID} />;
}
