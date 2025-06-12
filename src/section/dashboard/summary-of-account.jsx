import Link from "next/link";

export default function SummaryOfAccount() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex flex-wrap items-end">
          {/* Left Section */}
          <div className="w-full md:w-2/3">
            <h5 className="m-0 mb-2 text-gray-700 font-semibold">
              Summary of accounts receivable
            </h5>
            <h4 className="text-primary mb-4">
              <span className="text-lg">USD $12</span>
            </h4>
            <Link href="/dashboard_admin_account" className="btn btn-primary">
              View accounts receivable
            </Link>
          </div>

          {/* Right Section (Icon) */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full">
              <i className="mdi mdi-wallet text-primary text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
