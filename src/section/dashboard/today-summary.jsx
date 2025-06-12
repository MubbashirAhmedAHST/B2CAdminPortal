import SimpleBar from "simplebar-react";
import StatCards from "@/components/cards/stat-cards";
import CubeSolidIcon from "@/components/icons/cube-solid";
import RevenueUpIcon from "@/components/icons/revenue-up";
import ContainersIcon from "@/components/icons/containers";

export default function TodaySummary({ todayShipmentsStats }) {
  return (
    <div className="card mb-0">
      <div className="card-body min-h-[153px]">
        <div className="flex flex-wrap items-end">
          <div className="w-full">
            <h5 className="card-title mb-5 font-semibold text-gray-700">
              Today Summary
            </h5>
            <SimpleBar className="overflow-hidden">
              <div className="grid grid-flow-col gap-5 pb-1 min-w-[600px]">
                <StatCards
                  id={1}
                  title="Shipments"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffb456"
                        d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.99.99 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88zM12 4.15l-1.89 1.07L16 8.61l1.96-1.11zM6.04 7.5L12 10.85l1.96-1.1l-5.88-3.4zM5 15.91l6 3.38v-6.71L5 9.21zm14 0v-6.7l-6 3.37v6.71z"
                      />
                    </svg>
                  }
                  metric={todayShipmentsStats?.total || 0}
                />
                <StatCards
                  id={2}
                  title="Completed"
                  icon={<CubeSolidIcon className="h-7 w-7 text-green-600" />}
                  metric={todayShipmentsStats?.completed || 0}
                />
                <StatCards
                  id={3}
                  title="Cancelled"
                  icon={
                    <i className="mdi mdi-cancel text-red-600 text-[32px]" />
                  }
                  metric={todayShipmentsStats?.cancelled || 0}
                />
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
}
