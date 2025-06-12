export const constants = {
  // SiteURL: import.meta.env.VITE_SITE_URL,
  APIURL: process.env.NEXT_PUBLIC_API_URL,
  // S3URL: import.meta.env.VITE_S3_URL,

  // //#region API VARS
  // SK: import.meta.env.VITE_SECRET_KEY,
  // ATED: import.meta.env.VITE_AUTH_TOKEN_EXPIRY_DURATION,
  // IFTK: import.meta.env.VITE_IPINFO_TOKEN,
  // ENVMODE: import.meta.env.VITE_ENV_MODE,
  //#endregion

  //#region CONSTANTS
  DateTimeFormatStr: "MMMM DD, YYYY HH:mm",
  DateFormatStr: "MMMM DD, YYYY",
  //#endregion

  //#region APIs
  AuthAPI: "auth/admin/token",
  LoginAPI: "admin/employee/login",
  ForgotPasswordAPI: "admin/employee/profile/forgotpassword",
  AdminDashboardAPI: "/admin/employee/dashboard",

  // employee
  ListOfEmployee: "admin/employee/employees/list",
  MyProfileAPI: "admin/employee/profile/details",
  AddNewEmployee: "admin/employee/register",
  UpdateEmployee: "admin/employee/profile/update",
  DeleteEmployee: "admin/employee/profile/delete",

  // vendor api
  ListOfVendor: "admin/vendor/vendors/list",
  VendorProfile: "admin/vendor/profile/detail",
  CreateVender: "admin/vendor/register",
  UpdateVendor: "admin/vendor/update",
  DeleteVendor: "admin/vendor/profile/delete",
  DeleteVendorAccount: "admin/vendor/account/delete",
  DeleteVendorService: "admin/vendor/service/delete",
  DeleteVendorProductType: "admin/vendor/producttype/delete",

  // shipment api
  ListOfShipment: "admin/shipment/shipments/list",
  ShipmentDetail: "admin/shipment/customershipment",
  DownloadAllShipment: "shipment/label/download/all",
  DownloadShipment: "shipment/label/download",
  CancelShipment: "shipment/cancelshipment",
  CancelItemShipment: "shipment/cancelshipmentitem",
  DeleteShipment: "shipment/deleteshipment",

  // customers API
  ListOfCustomer: "admin/customers/list",
  CustomerDetails: "admin/customer/profile/details",
  DeleteCustomer: "customer/profile/delete",
  UpdateCustomer:"customer/profile/update",

  // promotion api
  ListOfPromotion: "admin/promotion/list",
  PromotionDetials: "admin/promotion/details",
  CreatePromotion: "admin/promotion/create",
  UpdatePromotion: "admin/promotion/update",
  DeletePromotion: "admin/promotion/delete",

  // rategorup
  ListOfRateGroup: "admin/settings/rategroup/list",
  RateGroupDetail: "admin/settings/rategroup/detail",
  CreateRateGroup: "admin/settings/rategroup/create",
  UpdateRateGroup: "admin/settings/rategroup/update",
  DeleteRateGroup: "admin/settings/rategroup/delete",
  AvailableRateGroup: "admin/settings/rategroup/availablerategroups",

  // role
  roleListApi: "admin/settings/roles/list",
  roleDeatilsApi: "admin/settings/role/detail",
  roleCreateApi: "admin/settings/role/create",
  roleUpdateApi: "admin/settings/role/update",
  DeleteRoleApi: "admin/settings/role/delete",
  availableRolesApi: "admin/settings/roles/availableroles",
};
