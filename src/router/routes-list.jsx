const routes_list = {
  // Other Pages
  dashboard: "/",
  forgot_password: "/forgot-password",
  login: "/login",
  my_profile: "/my-profile",
  error: "/error",

  //rate groups
  rategroup_list: "/rate-group/rategroup-list",
  rategroup_detail: "/rate-group/rategroup-detail/",
  rategroup_create: "/rate-group/create-rategroup",

   //rate groups
  role_list: "/manage-role/list-role",
  role_detail: "/manage-role/update-role/",
  role_create: "/manage-role/create-role",
  // vendors
  vendor_list: "/vendor/vendor-list",
  create_vendor: "/vendor/create-vendor",
  VendorDetail: "/vendor/vendor-detail/",

  // shipment
  shipment_list: "/shipment/shipment-list",
  shipment_detail: "/shipment/shipment-detail/",

  // customer
  customer_list: "/customer/customer-list",
  update_customer: "/customer/update-customer",
  customer_Detail: "/customer/customer-detail/",

  // employee
  employee_list: "/employee/employee-list",
  employee_detail: "/employee/employee-detail/",
  create_employee: "/employee/create-employee",

  // promotional
  promotion_list: "/promotion/promotion-list",
  promotion_detail: "/promotion/promotion-detail/",
  create_promotion: "/promotion/addnew-promotion",

  // about: "/about",
  // contact: "/contact",
  // cookie_policy: "/cookie-policy",
  // privacy_policy: "/privacy-policy",
  // terms_and_conditions: "/terms-and-conditions",
  // rate_calculator: "/",
  // error_page: "/error",
  // address_book_create: "/create-address",
  // manage_address_book: "/my-address-book",
  // manage_shipping_preferences: "/my-shipping-preferences",

  // register: "/register",
  // change_password: "/change-password",
  // profile: "/my-profile",
  // view_all_notifications: "/notifications",
  // dashboard: "/dashboard",
  // // customer_profile : "/customer-profile",
  // subcustomer_create: "/create-subcustomer",
  // subcustomer_profile: "/subcustomer-profile",
  // rate_sheet: "/ratesheet",
  // view_all_subcustomers: "/view-all-subcustomers",
  // group_create: "/create-rate-group",
  // view_all_groups: "/view-all-rate-groups",
  // customer_overdraft: "/customer-overdraft",
  // review_remittances_topups: "/accounts-management/review-remittances-topups",
  // topup_details: "/topup-details",
  // group_history: "/rate-group-history",

  // // Shipping Management
  // shipment_routes: {
  //   create_bulk_shipment: "/create-bulk-shipments",
  // },
  // box_shipment_routes: {
  //   create_bulk_box_shipment: "/create-bulk-box-shipments",
  // },
  // subcustomer_routes: {

  // },
  // view_all_shipments: "/view-all-shipments",
  // view_all_box_shipments: "/view-all-box-shipments",
  // view_all_incomplete_shipments: "/view-all-incomplete-shipments",
  // create_shipment_by_form: "/create-shipment",
  // // create_shipment_by_csv: "/create-bulk-shipments",
  // // create_box_shipment_by_csv: "/create-bulk-box-shipments",
  // view_shipment_detail: "/shipment-details",
  // shipment_thankyou: "/shipment-thankyou",
  // create_box_shipment_by_form: "/create-box-shipment",
  // create_airway_shipment: "/create-airway-shipment",
  // view_all_airway_shipments: "/view-all-airway-shipments",
  // view_airway_shipment: "/view-airway-shipment",
  // view_all_incomplete_airway_shipments: "/view-all-incomplete-airway-shipments",

  // // Reports
  // shipments_reports: "/report/shipments",
  // profit_loss_reports: "/report/profit-loss",
  // customers_reports: "/report/customers",

  // // Accounts Management
  // topup: "/accounts-management/topup",
  // view_invoice: "/view-invoice",
  // view_unbilled_invoice: "/view-unbilled-invoice",
  // view_statement: "/accounts-management/view-statement",
  // view_general_ledger: "/accounts-management/view-detailed-accounts",
  // view_customer_invoice: "/view-customer-invoice",

  // // Label Management
  // view_all_labels: "/view-all-labels",

  // // Tracking
  // customer_tracking: "/track-shipment",
  // airway_tracking: "/track-airway",

  // // Users Management
  // create_user: "/create-user",
  // view_all_users: "/view-all-users",

  // // Roles Management
  // create_role: "/create-role",
  // view_all_roles: "/view-all-roles",
  // edit_permissions: "/edit-permissions",
};

export default routes_list;
