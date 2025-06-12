export const user_stats_data = [
  {
    count: 0,
    label: "Active",
  },
  {
    count: 0,
    label: "Inactive",
  },
];

export const today_shipments_stats = [
  {
    title: "Total Shipments",
    value: undefined,
    icon: <></>,
  },
  {
    title: "Delivered Shipments",
    value: undefined,
    icon: <></>,
  },
  {
    title: "Cancelled Shipments",
    value: undefined,
    icon: <></>,
  }
];

export const one_year_shipments_stats = [
  {
    name: "Pending",
    value: "0",
    percentage: 0,
    color: "#10b981",
  },
  {
    name: "Processing",
    value: "0",
    percentage: 0,
    color: "#3872FA",
  },
  {
    name: "Arrived for clearance",
    value: "0",
    percentage: 0,
    color: "#f1c18c",
  },
  {
    name: "Clearance completed",
    value: "0",
    percentage: 0,
    color: "#f1416c",
  },
  {
    name: "In transit",
    value: "0",
    percentage: 0,
    color: "#f1416c",
  },
  {
    name: "Delivered",
    value: "0",
    percentage: 0,
    color: "#f1416c",
  },
  {
    name: "Cancelled",
    value: "0",
    percentage: 0,
    color: "#f1416c",
  },
  {
    name: "Disputed",
    value: "0",
    percentage: 0,
    color: "#f1416c",
  },
];

export const _7_days_chart_data = [
  {
    month: "Mon",
    pending: 5,
  },
  {
    month: "Tue",
    pending: 30,
  },
  {
    month: "Wed",
    pending: 60,
  },
  {
    month: "Thu",
    pending: 70,
  },
  {
    month: "Fri",
    pending: 90,
  },
  {
    month: "Sat",
    pending: 30,
  },
  {
    month: "Sun",
    pending: 35,
  },
];

export const duration_choices = [
  {
    name: "Yesterday",
    value: "1",
  },
  {
    name: "This Week",
    value: "7",
  },
  {
    name: "This Month",
    value: "30",
  },
  {
    name: "6 Months",
    value: "180",
  },
  {
    name: "This Year",
    value: "365",
  },
  {
    name: "Last Year",
    value: "730",
  },
  {
    name: "Overall",
    value: "overall",
  },
  {
    name: "Custom",
    value: "custom",
  },
];

export const colors = ["#3872FA", "#eab308", "#10b981", "#f1416c", "#a1d4de"];

export const styles = [
  "bg-[#028ca6]",
  "bg-[#8bcad6]",
  "bg-[#a1d4de]",
  "bg-[#cce8ed]",
  "bg-[#cce8ed]",
  "bg-[#cce8ed]",
];

export const bank_details = {
  bankName: "",
  branchCode: "",
  accountTitle: "",
  accountNo: "",
  accountIBAN: "",
  swiftCode: "",
  branchName: "",
  city: "",
  country: "",
};

export const file_templates = [
  { title: "Shipment Template", value: "shipping-template" },
  { title: "Box Shipment Template", value: "box-shipping-template" },
  { title: "Base Rate Template", value: "base-rate-template" },
];

export const statuses = [
  { value: true, title: "Active" },
  { value: false, title: "Inactive" },
];
