"use client";

export default function HistoryReport({
  todayShipmentsStats = [],
  historicShipmentsStats1 = [],
  historicShipmentsStats2 = [],
}) {
  return (
    <div className="flex flex-wrap">
      {/* Today's Summary */}
      <div className="w-full lg:w-5/12 pr-4">
        <h5 className="m-0 mb-1 text-gray-700 font-semibold">
          Today's Summary
        </h5>
        <p className="text-gray-600 text-sm mb-3">
          <small className="text-muted">
            Delivered, Cancelled and Total Shipments
          </small>
        </p>
        <ul className="space-y-2">
          {todayShipmentsStats.map((d, key) => (
            <li key={key} className="flex items-center space-x-3">
              <div className="flex-shrink-0">{d.icon}</div>
              <div>
                <h5 className="text-gray-800 font-semibold">
                  {d.value || "-"}
                </h5>
                <small className="text-gray-600">{d.title}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Historical Stats */}
      {/* <div className="w-full lg:w-7/12 pl-4">
            <h5 className="m-0 mb-1 text-gray-700 font-semibold">
              Historical Logistics Record
            </h5>
            <p className="text-gray-600 text-sm mb-3">
              <small className="text-muted">
                Shipments, Box Shipments, and Consolidations
              </small>
            </p>

            <div className="flex flex-wrap">
              <div className="w-1/2 space-y-3 pr-2">
                {historicShipmentsStats1.map((d, key) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{d.icon}</div>
                    <div>
                      <h5 className="text-gray-800 font-semibold">{d.value}</h5>
                      <small className="text-gray-600">{d.title}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-1/2 space-y-3 pl-2">
                {historicShipmentsStats2.map((d, key) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{d.icon}</div>
                    <div>
                      <h5 className="text-gray-800 font-semibold">{d.value}</h5>
                      <small className="text-gray-600">{d.title}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
    </div>
  );
}
