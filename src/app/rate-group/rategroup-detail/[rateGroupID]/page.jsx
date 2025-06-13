import RateGroupDetailSection from "../components/RateGroupDeatilSection";

export const metadata = {
  title: "Rate Group Detail | Admin | Click Ship & Go",
  description: "Rate Group Detail page",
};

export default async function RateGroupDetail({params}) {
  const {rateGroupID} = await params
  return <RateGroupDetailSection rateGroupID={rateGroupID}/>;
}
