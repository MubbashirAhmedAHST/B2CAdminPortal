"use client";

export default function MonthlyGraphicalReport({ stakeholdersStats }) {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <h5 className="m-0 mb-1 text-gray-700 font-semibold">
          User Registrations
        </h5>
        <p className="text-gray-500 text-sm mb-4">
          <small className="text-muted">Registration History</small>
        </p>

        <ul className="p-0 m-0 space-y-4">
          {stakeholdersStats.map((item, key) => (
            <li key={key} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="rounded-full bg-gray-100 p-3 flex items-center justify-center">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-grow justify-between items-center w-full">
                <div>
                  <h6 className="text-gray-700 font-medium">{item.title}</h6>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">
                    {item.value?.[0]?.count ?? "-"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
