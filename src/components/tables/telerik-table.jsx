"use client";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { filterBy, orderBy, groupBy } from "@progress/kendo-data-query";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { IntlProvider, load } from "@progress/kendo-react-intl";
import ModalComponent from "@/components/ui/model";
import { useCallback, useRef, useState } from "react";
import DeletePopover from "../popovers/delete-popover";
import { Button, Title } from "rizzui";
import moment from "moment";
import { constants } from "../../helpers/constants";
import Link from "next/link";

import {
  PiCurrencyCircleDollar,
  PiNotePencil,
  PiMoney,
  PiEye,
  PiTrashBold,
  PiMagnifyingGlassBold,
  PiNotePencilBold,
  PiPencilBold,
  PiDownloadSimpleBold,
} from "react-icons/pi";
import GenericPopover from "../popovers/generic-popover";
import { GetClientDetails } from "../../helpers/auth";
import { FetchData_GET, FetchData_POST } from "../../helpers/dal";
import { getISOFormatDatetime } from "../../helpers/utilities";
import { useSelector } from "react-redux";

const castDateFields = (item) => {
  const castedItem = { ...item };
  for (const key in castedItem) {
    if (
      castedItem.hasOwnProperty(key) &&
      String(castedItem[key]).includes("-") &&
      String(castedItem[key]).includes("T")
    ) {
      castedItem[key] = new Date(castedItem[key]);
    }
  }

  return castedItem;
};

const openOptions = (e) => {
  var element = document.getElementById(e.target.id + "menu");
  const allelements = document.querySelectorAll(
    '[id^="optionBtn"][id$="menu"]'
  );
  allelements.forEach((el) => {
    if (!element.classList.contains("show")) {
      if (el.classList.contains("show")) {
        el.classList.remove("show");
      }
    }
  });

  if (element.classList.contains("show")) {
    element.classList.remove("show");
  } else {
    element.classList.add("show");
  }
};

export default function TelerikTable({
  dataGridTitle = "",
  dataGridTitleIcon = undefined,
  data,
  fields,
  showActions = false,
  actionsList = [],
  showIDField = true,
  allowSorting = true,
  allowFiltering = true,
  allowGrouping = true,
  allowPagination = true,
  initialFilter = [],
  initialSort = [],
  initialGroup = [],
  aggregates = [],
  showToolbar = false,
  showExportAsExcel = false,
  excelFileName = "",
  showExportAsPDF = false,
  pdfFileName = "",
}) {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [ProfileData, setProfileData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [gridData] = useState(
    data.map((item, index) => ({
      ...castDateFields(item), //...item,
      telerikTableRowID: index + 1, // Autogenerate ID based on the index
    }))
  );

  //#region EXPORT AS EXCEL AND PDF
  const _export = useRef(null);
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };
  let gridPDFExport;
  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
  };
  //#endregion

  //#region INITIAL STATES
  //   const initialFilter = {
  //     logic: "and",
  //     filters: [
  //       //   {
  //       //     field: "ProductName",
  //       //     operator: "contains",
  //       //     value: "Mobile",
  //       //   },
  //     ],
  //   };
  //   const initialSort = [
  //     //   {
  //     //     field: "ProductName",
  //     //     dir: "asc",
  //     //   },
  //   ];
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  //#endregion

  //#region SORTING
  const [sort, setSort] = useState(initialSort);
  //#endregion

  //#region FILTERING
  const [filter, setFilter] = useState(initialFilter);
  //#endregion
  const getTableData = () => {
    if (allowPagination == false) {
      return gridData;
    } else {
      return newData.slice(page.skip, page.take + page.skip);
    }
  };
  //#region GROUPING
  const processWithGroups = (data, group) => {
    if (group) {
      group.map((group) => (group.aggregates = aggregates));
    }
    const newDataState = groupBy(data, group);
    setGroupIds({
      data: newDataState,
      group: group,
    });
    return newDataState;
  };
  const [group, setGroup] = useState(initialGroup);
  const [resultState, setResultState] = useState(
    processWithGroups(gridData, initialGroup)
  );
  const [collapsedState, setCollapsedState] = useState([]);
  const onGroupChange = useCallback((event) => {
    const newGroups = event.group;
    const areNewGroupsUnique = !newGroups.some(
      (item, index) =>
        newGroups.findIndex((group) => group.field === item.field) !== index
    );
    if (areNewGroupsUnique) {
      const newDataState = processWithGroups(gridData, event.group);
      setGroup(event.group);
      setResultState(newDataState);
    }
  }, []);
  const downloadAllLabels = (code) => {
    const requestBody = {
      selectedShipmentCodes: [code],
    };

    FetchData_POST(
      constants.DownloadAllShipment,
      requestBody,
      accessToken,
      details
    )
      .then((data) => {
        if (!data || !data.fileContents) {
          console.log(data);
          throw new Error("Invalid file data received");
        }

        // Decode base64 file content
        const byteCharacters = atob(data.fileContents);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i += 512) {
          const slice = byteCharacters.slice(i, i + 512);
          const byteNumbers = new Array(slice.length);
          for (let j = 0; j < slice.length; j++) {
            byteNumbers[j] = slice.charCodeAt(j);
          }
          byteArrays.push(new Uint8Array(byteNumbers));
        }

        // Create Blob and trigger download
        const blob = new Blob(byteArrays, {
          type: data.contentType || "application/octet-stream",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          data.fileDownloadName || `Shipment_Labels_${code}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log("Download failed:", error);
        alert("Failed to download labels. Please try again.");
      });
  };

  const confirmCancelShipment = (code) => {
    const requestBody = {
      shipmentCode: code,
      modifiedBy: details?.email || "system",
      modifiedAt: new Date().toISOString(),
    };

    FetchData_POST(constants.CancelShipment, requestBody, accessToken, details)
      .then((data) => {
        if (data) {
          alert("Shipment cancelled successfully.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Cancel shipment failed:", error);
        alert("Failed to cancel shipment. Please try again.");
      });
  };

  const downloadLabels = (shipmentCode, trackingNumber) => {
    const requestBody = {
      shipmentCode: shipmentCode,
      trackingNumber: trackingNumber,
    };

    FetchData_POST(
      constants.DownloadShipment,
      requestBody,
      accessToken,
      details
    )
      .then((data) => {
        if (!data || !data.fileContents) {
          console.log(data);
          throw new Error("Invalid file data received");
        }

        // Decode base64 file content
        const byteCharacters = atob(data.fileContents);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i += 512) {
          const slice = byteCharacters.slice(i, i + 512);
          const byteNumbers = new Array(slice.length);
          for (let j = 0; j < slice.length; j++) {
            byteNumbers[j] = slice.charCodeAt(j);
          }
          byteArrays.push(new Uint8Array(byteNumbers));
        }

        // Create Blob and trigger download
        const blob = new Blob(byteArrays, {
          type: data.contentType || "application/octet-stream",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          data.fileDownloadName || `Shipment_Label_${trackingNumber}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log("Download failed:", error);
        alert("Failed to download label. Please try again.");
      });
  };

  const CancelShipmentItem = (shipmentCode, trackingNumber) => {
    const requestBody = {
      shipmentCode: shipmentCode,
      trackingNumber: trackingNumber,
      modifiedBy: details?.email || "system",

      modifiedAt: new Date().toISOString(),
    };

    FetchData_POST(
      constants.CancelItemShipment,
      requestBody,
      accessToken,
      details
    )
      .then((data) => {
        if (!data || data.error) {
          console.log("Cancel failed:", data);
          throw new Error(data?.error?.[0] || "Failed to cancel shipment item");
        } else {
          setCancelSuccessMessage("Shipment item cancelled successfully.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Cancel shipment item failed:", error);
        alert("Failed to cancel shipment item. Please try again.");
      });
  };

  const onExpandChange = useCallback(
    (event) => {
      const item = event.dataItem;
      if (item.groupId) {
        const newCollapsedIds = !event.value
          ? [...collapsedState, item.groupId]
          : collapsedState.filter((groupId) => groupId !== item.groupId);
        setCollapsedState(newCollapsedIds);
      }
    },
    [collapsedState]
  );
  const newData = setExpandedState({
    data: resultState,
    collapsedIds: collapsedState,
  });
  const cellRender = (tdElement, cellProps) => {
    if (
      String(cellProps.rowType).toUpperCase() === "groupFooter".toUpperCase()
    ) {
      const aggs = aggregates.filter(
        (el) => String(cellProps.field).toUpperCase() === el.field.toUpperCase()
      );
      if (aggs.length > 0) {
        const agg = aggs[0];
        let aggValue = -1;
        let operation = "";
        const description = agg.description;
        if (cellProps.dataItem.aggregates[agg.field].sum) {
          aggValue = cellProps.dataItem.aggregates[agg.field].sum;
          operation = "SUM";
        } else if (cellProps.dataItem.aggregates[agg.field].average) {
          aggValue = cellProps.dataItem.aggregates[agg.field].average;
          operation = "AVG";
        }
        return (
          <td
            aria-colindex={cellProps.columnIndex}
            role={"gridcell"}
            className={tdElement ? tdElement.props.className : "k-table-td"}
          >
            {aggValue
              ? description == "%"
                ? `${operation}: ${aggValue.toFixed(2)}${description}`
                : `${operation}: ${description}${aggValue.toFixed(2)}`
              : ""}
          </td>
        );
      }
    }
    return tdElement;
  };
  //#endregion

  const onDeleteItem = async (id, condition) => {
    if (condition === "delete_role") {
      const requestBody = {
        roleID: id,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      FetchData_POST(constants.DeleteRoleApi, requestBody, accessToken, user)
        .then((result) => {
          console.log(result);
          if (typeof result === "boolean" && result === true) {
            setModalHeader("Delete Successful");
            setModalMessage("The role was deleted successfully.");
            setModalOpen(true);
          } else {
            setModalHeader("Delete Failed");
            setModalMessage(result?.error?.[0] || "An unknown error occurred.");
            setModalOpen(true);
          }
        })
        .catch((error) => {
          console.log("Role delete failed:", error);
          setModalHeader("Error");
          setModalMessage("Something went wrong. Please try again.");
          setModalOpen(true);
        });
    } else if (condition == "delete_rategroup") {
      const requestBody = {
        rateGroupID: id,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      FetchData_POST(constants.DeleteRateGroup, requestBody, accessToken, user)
        .then((result) => {
          console.log(result);
          if (typeof result === "boolean" && result === true) {
            setModalHeader("Delete Successful");
            setModalMessage("The rateGroup was deleted successfully.");
            setModalOpen(true);
          } else {
            setModalHeader("Delete Failed");
            setModalMessage(result?.error?.[0] || "An unknown error occurred.");
            setModalOpen(true);
          }
        })
        .catch((error) => {
          console.log("Rate Group delete failed:", error);
          setModalHeader("Error");
          setModalMessage("Something went wrong. Please try again.");
          setModalOpen(true);
        });
    } else if (condition == "delete_promotion") {
      const requestBody = {
        promotionID: id,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      FetchData_POST(constants.DeletePromotion, requestBody, accessToken, user)
        .then((result) => {
          console.log(result);
          if (typeof result === "boolean" && result === true) {
            setModalHeader("Delete Successful");
            setModalMessage("The Promotion was deleted successfully.");
            setModalOpen(true);
          } else {
            setModalHeader("Delete Failed");
            setModalMessage(result?.error?.[0] || "An unknown error occurred.");
            setModalOpen(true);
          }
        })
        .catch((error) => {
          console.log("Promotion delete failed:", error);
          setModalHeader("Error");
          setModalMessage("Something went wrong. Please try again.");
          setModalOpen(true);
        });
    } else if (condition == "delete_shipment") {
      const requestBody = {
        shipmentCode: id,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      FetchData_POST(constants.DeleteShipment, requestBody, accessToken, user)
        .then((result) => {
          console.log(result);
          if (typeof result === "boolean" && result === true) {
            setModalHeader("Delete Successful");
            setModalMessage("The Shipment was deleted successfully.");
            setModalOpen(true);
          } else {
            setModalHeader("Delete Failed");
            setModalMessage(result?.error?.[0] || "An unknown error occurred.");
            setModalOpen(true);
          }
        })
        .catch((error) => {
          console.log("Shipment delete failed:", error);
          setModalHeader("Error");
          setModalMessage("Something went wrong. Please try again.");
          setModalOpen(true);
        });
    } else if (condition === "delete_employee") {
      try {
        // Step 1: Fetch employee details to get their email
        const profileResult = await FetchData_GET(
          `${constants.MyProfileAPI}?adminID=${id}`,
          accessToken,
          user
        );

        if (!profileResult || !profileResult.email) {
          throw new Error("Employee profile or email not found.");
        }

        // Step 2: Construct the request body using the retrieved email
        const requestBody = {
          adminID: id,
          email: profileResult.email,
          modifiedBy: user?.email || "system",
          modifiedAt: new Date().toISOString(),
        };

        // Step 3: Proceed with the delete API call
        const deleteResult = await FetchData_POST(
          constants.DeleteEmployee,
          requestBody,
          accessToken,
          user
        );

        // Step 4: Handle success or error modal messages
        if (typeof deleteResult === "boolean" && deleteResult === true) {
          setModalHeader("Delete Successful");
          setModalMessage("The Employee was deleted successfully.");
        } else {
          setModalHeader("Delete Failed");
          setModalMessage(
            deleteResult?.error?.[0] || "An unknown error occurred."
          );
        }
      } catch (error) {
        console.log("Employee delete failed:", error);
        setModalHeader("Error");
        setModalMessage(error.message || "Something went wrong.");
      }

      setModalOpen(true);
    } else if (condition === "delete_customer") {
      try {
        // Step 1: Fetch employee details to get their email
        const profileResult = await FetchData_GET(
          `${constants.CustomerDetails}?customerID=${id}`,
          accessToken,
          user
        );
        if (!profileResult.customer || !profileResult.customer.email) {
          throw new Error("Employee profile or email not found.");
        }

        // Step 2: Construct the request body using the retrieved email
        const requestBody = {
          customerID: id,
          email: profileResult.customer.email,
          modifiedBy: user?.email || "system",
          modifiedAt: new Date().toISOString(),
        };

        // Step 3: Proceed with the delete API call
        const deleteResult = await FetchData_POST(
          constants.DeleteCustomer,
          requestBody,
          accessToken,
          user
        );

        // Step 4: Handle success or error modal messages
        if (typeof deleteResult === "boolean" && deleteResult === true) {
          setModalHeader("Delete Successful");
          setModalMessage("The Customer was deleted successfully.");
        } else {
          setModalHeader("Delete Failed");
          setModalMessage(
            deleteResult?.error?.[0] || "An unknown error occurred."
          );
        }
      } catch (error) {
        console.log("Customer delete failed:", error);
        setModalHeader("Error");
        setModalMessage(error.message || "Something went wrong.");
      }

      setModalOpen(true);
    } else if (condition === "delete_vendor") {
      try {
        const profileResult = await FetchData_GET(
          `${constants.CustomerDetails}?vendorID=${id}`,
          accessToken,
          user
        );

        const requestBody = {
          vendorID: id,
          modifiedBy: user?.email || "system",
          modifiedAt: new Date().toISOString(),
        };

        const deleteResult = await FetchData_POST(
          constants.DeleteVendor,
          requestBody,
          accessToken,
          user
        );

        if (deleteResult === true) {
          setModalHeader("Delete Successful");
          setModalMessage("The Vendor was deleted successfully.");
        } else {
          setModalHeader("Delete Failed");
          setModalMessage(
            deleteResult?.error?.[0] || "An unknown error occurred."
          );
        }
      } catch (error) {
        console.log("Vendor delete failed:", error);
        setModalHeader("Error");
        setModalMessage(error.message || "Something went wrong.");
      }

      setModalOpen(true);
    }
  };

  //#region PAGINATION
  const [page, setPage] = useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = useState();
  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take =
      targetEvent.value === "All" ? gridData.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };
  //#endregion

  //#region CUSTOM CELLS
  const CustomDataCell = (props, field) => {
    if (props.rowType.toUpperCase() == "DATA") {
      if (
        ["ISACTIVE", "ISDELETED", "ISSENT", "ISGENERATED", "ISPII"].includes(
          props.field.toUpperCase()
        )
      ) {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] ? "Yes" : "No"}
          </td>
        );
      }
      if (props.format == "{0:dd-MM-yyyy}") {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {moment(props.dataItem[props.field]).format(
              constants.DateFormatStr
            )}
          </td>
        );
      }
      if (props.format == "{0:c}") {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined
              ? `$ ${props.dataItem[props.field].toFixed(2)}`
              : ""}
          </td>
        );
      }
      if (props.format == "{0:%}") {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined
              ? `${props.dataItem[props.field]} %`
              : ""}
          </td>
        );
      }
      if (
        field.fieldTitle.toUpperCase().includes("(LBS)") ||
        props.format == "{0:LBS}"
      ) {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined
              ? `${props.dataItem[props.field]} LBS`
              : ""}
          </td>
        );
      }
      if (
        field.fieldTitle.toUpperCase().includes("(KGS)") ||
        props.format == "{0:KGS}"
      ) {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined
              ? `${props.dataItem[props.field]} KGS`
              : ""}
          </td>
        );
      }
      if (props.format == "{0:NUMBER}") {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined
              ? `${props.dataItem[props.field]}`
              : ""}
          </td>
        );
      }
      if (props.format == "{0:DEST_ZONE}") {
        return (
          <td
            className={props.className + " border-0"}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined
              ? props.dataItem["shipmentMedium"]
                  .toUpperCase()
                  .includes("GROUND")
                ? `${props.dataItem[props.field]}`
                : `${props.dataItem["sourceZone"]}`
              : ""}
          </td>
        );
      }
      if (props.format == "{0:LINK}") {
        return (
          <td
            className={props.className + " border-0 active underline "}
            style={props.style}
            id={props.id}
          >
            {props.dataItem[props.field] != undefined ? (
              <>
                {field.fieldLinkProperty ? (
                  <Link
                    className="font-semibold"
                    href={
                      field.fieldLink
                        .replace(
                          `<${field.fieldLinkProperty}>`,
                          props.dataItem[field.fieldLinkProperty]
                        )
                        .replace(
                          `<${field.fieldLinkProperty2}>`,
                          props.dataItem[field.fieldLinkProperty2]
                        ) + props.dataItem[props.field]
                    }
                    target="_blank"
                  >
                    {props.dataItem[props.field]}
                  </Link>
                ) : (
                  <Link
                    className="font-semibold"
                    href={field.fieldLink + props.dataItem[props.field]}
                    target="_blank"
                  >
                    {props.dataItem[props.field]}
                  </Link>
                )}
              </>
            ) : (
              ""
            )}
          </td>
        );
      }

      return (
        <td
          className={props.className + " border-0"}
          style={props.style}
          id={props.id}
        >
          {props.dataItem[props.field] != undefined &&
          props.dataItem[props.field].length > 0
            ? props.dataItem[props.field]
            : "-"}
        </td>
      );
    }

    if (props.rowType.toUpperCase() == "GROUPFOOTER") {
      const aggs = aggregates.filter(
        (el) => String(props.field).toUpperCase() === el.field.toUpperCase()
      );
      if (aggs.length > 0) {
        const agg = aggs[0];
        let aggValue = -1;
        let operation = "";
        const description = agg.description;
        if (props.dataItem.aggregates[agg.field].sum) {
          aggValue = props.dataItem.aggregates[agg.field].sum;
          operation = "SUM";
        } else if (props.dataItem.aggregates[agg.field].average) {
          aggValue = props.dataItem.aggregates[agg.field].average;
          operation = "AVG";
        }
        return (
          <td
            aria-colindex={props.columnIndex}
            role={"gridcell"}
            className={props ? props.className + " k-table-td" : "k-table-td"}
          >
            {aggValue
              ? description == "%"
                ? `${operation}: ${aggValue.toFixed(2)}${description}`
                : `${operation}: ${description}${aggValue.toFixed(2)}`
              : ""}
          </td>
        );
      } else {
        return (
          <td
            className={props ? props.className + " k-table-td" : "k-table-td"}
          ></td>
        );
      }
    }
    return undefined;
  };
  const CustomOptionCell = (props) => {
    return (
      <td
        className={props.className + " border-0"}
        style={props.style}
        id={props.id}
      >
        <div className="btn-group">
          <button
            id={"optionBtn" + props.id}
            className="btn btn-block btn-outline-dark btn-sm dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={(e) => openOptions(e)}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          <div
            id={"optionBtn" + props.id + "menu"}
            className="dropdown-menu"
            style={{ overflowY: "auto", maxHeight: "225px" }}
          >
            {actionsList.map((d, key) => {
              // --- View ---
              if (d.fieldName.includes("view_")) {
                return (
                  <Link
                    key={key}
                    href={`${d.fieldURL}${props.dataItem[d.fieldProperty]}`}
                    title="Show Details"
                    className="dropdown-item flex items-center"
                  >
                    <div className="flex">
                      <PiMagnifyingGlassBold className="me-1 h-[17px] w-[17px]" />
                      Show Details
                    </div>
                  </Link>
                );
              }

              // --- Edit ---
              if (d.fieldName.includes("edit_")) {
                if (d.fieldCondition) {
                  const conditionMet = String(
                    props.dataItem[d.fieldCondition.field]
                  )
                    .toUpperCase()
                    .includes(String(d.fieldCondition.value).toUpperCase());

                  if (!conditionMet) return null;
                }

                return (
                  <Link
                    key={key}
                    href={
                      d.fieldURL.includes("<")
                        ? getPageURL(
                            d.fieldURL,
                            d.fieldProperty,
                            d.fieldProperties,
                            props
                          )
                        : `${d.fieldURL}${props.dataItem[d.fieldProperty]}`
                    }
                    title={d.fieldTitle}
                    className="dropdown-item flex"
                  >
                    {d.fieldIcon || (
                      <PiPencilBold className="me-1 h-[17px] w-[17px] mt-[3px]" />
                    )}
                    {d.fieldTitle}
                  </Link>
                );
              }

              // --- Delete ---
              if (d.fieldName.includes("delete_")) {
                return (
                  <button
                    key={key}
                    onClick={() =>
                      onDeleteItem(props.dataItem[d.fieldProperty], d.fieldName)
                    }
                    title={d.fieldTitle}
                    className="dropdown-item flex"
                  >
                    <div className="flex">
                      <PiTrashBold className="me-1 h-[17px] w-[17px] mt-[3px]" />
                      {d.fieldTitle}
                    </div>
                  </button>
                );
              }

              // --- Download Label ---
              if (d.fieldName === "download_label") {
                return (
                  <button
                    key={key}
                    onClick={() =>
                      downloadLabels(
                        props.dataItem.shipmentCode,
                        props.dataItem.trackingNumber
                      )
                    }
                    title={d.fieldTitle}
                    className="dropdown-item flex"
                  >
                    <div className="flex">
                      <PiDownloadSimpleBold className="me-1 h-[17px] w-[17px] mt-[3px]" />
                      {d.fieldTitle}
                    </div>
                  </button>
                );
              }

              // --- Cancel Shipment Item ---
              if (d.fieldName === "cancel_shipment_item") {
                return (
                  <button
                    key={key}
                    onClick={() =>
                      CancelShipmentItem(
                        props.dataItem.shipmentCode,
                        props.dataItem.trackingNumber
                      )
                    }
                    title={d.fieldTitle}
                    className="dropdown-item flex"
                  >
                    <div className="flex">
                      <PiTrashBold className="me-1 h-[17px] w-[17px] mt-[3px]" />
                      {d.fieldTitle}
                    </div>
                  </button>
                );
              }

              // --- Download All Labels ---
              if (d.fieldName === "downloadAll_label") {
                return (
                  <button
                    key={key}
                    onClick={() =>
                      downloadAllLabels(props.dataItem[d.fieldProperty])
                    }
                    title={d.fieldTitle}
                    className="dropdown-item flex"
                  >
                    <div className="flex">
                      <PiDownloadSimpleBold className="me-1 h-[17px] w-[17px] mt-[3px]" />
                      {d.fieldTitle}
                    </div>
                  </button>
                );
              }

              // --- Cancel Entire Shipment ---
              if (d.fieldName === "cancel_Allshipment_item") {
                return (
                  <button
                    key={key}
                    onClick={() =>
                      confirmCancelShipment(props.dataItem[d.fieldProperty])
                    }
                    title={d.fieldTitle}
                    className="dropdown-item flex"
                  >
                    <div className="flex">
                      <PiTrashBold className="me-1 h-[17px] w-[17px] mt-[3px]" />
                      {d.fieldTitle}
                    </div>
                  </button>
                );
              }

              return null;
            })}
          </div>
        </div>
      </td>
    );
  };

  //#endregion

  return (
    <IntlProvider locale="en-US">
      {showExportAsExcel == true && (
        <ExcelExport data={gridData} ref={_export} fileName={excelFileName}>
          <ExcelExportColumn
            filterable={false}
            field="telerikTableRowID"
            title="S.No"
            width={"50"}
            headerClassName="fcs-font-size"
            className="fcs-font-size"
          />
          {fields.length > 0 &&
            fields.map((d, key) => (
              <ExcelExportColumn
                key={key}
                field={d.fieldName}
                title={d.fieldTitle}
              />
            ))}
        </ExcelExport>
      )}

      {dataGridTitle && (
        <Title
          as="h5"
          className="m-0 me-2 text-color-grey afterlogin mb-2 flex items-center gap-2"
        >
          {dataGridTitle} {dataGridTitleIcon && dataGridTitleIcon}
        </Title>
      )}

      <Grid
        id="dataGridControl"
        data={orderBy(filterBy(getTableData(), filter), sort)}
        navigatable={true}
        //#region FILTERING OPTIONS
        filterable={allowFiltering}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
        //#endregion
        //#region SORTING OPTIONS
        sortable={allowSorting}
        sort={sort}
        onSortChange={(e) => {
          setSort(e.sort);
        }}
        //#endregion
        //#region GROUPING OPTIONS
        groupable={{
          enabled: allowGrouping,
          footer: aggregates.length > 0 ? "visible" : "none",
        }}
        onGroupChange={onGroupChange}
        group={group}
        onExpandChange={onExpandChange}
        expandField="expanded"
        //#endregion
        //#region PAGINATION OPTIONS
        skip={page.skip}
        take={page.take}
        total={gridData.length}
        pageable={
          allowPagination == true && {
            buttonCount: 4,
            pageSizes: [5, 10, 15, "All"],
            pageSizeValue: pageSizeValue,
          }
        }
        onPageChange={pageChange}
        //#endregion
        style={{
          minHeight: "420px",
        }}
        cellRender={cellRender}
        className="fcs-font-size border-0"
      >
        {showToolbar == true && (
          <GridToolbar className="px-0">
            {showExportAsExcel == true && (
              <Button
                title="Export as Excel"
                themeColor={"primary"}
                type="button"
                onClick={excelExport}
                className="btn btn-outline-secondary px-3"
              >
                Export as Excel
              </Button>
            )}
            {showExportAsPDF == true && (
              <Button
                title="Export as PDF"
                themeColor={"primary"}
                type="button"
                onClick={exportPDF}
                className="btn btn-outline-secondary px-3"
              >
                Export as PDF
              </Button>
            )}
          </GridToolbar>
        )}

        {showIDField == true && (
          <GridColumn
            filterable={false}
            field="telerikTableRowID"
            title="S.No"
            width={"50"}
            headerClassName="fcs-font-size !font-semibold"
            className="fcs-font-size"
          />
        )}

        {fields.map((d, key) => (
          <GridColumn
            key={key}
            field={d.fieldName}
            title={d.fieldTitle}
            format={d.format ? d.format : ""}
            cell={(props) => CustomDataCell(props, d)}
            hidden={d.isHidden}
            headerClassName="fcs-font-size !font-semibold"
            className="fcs-font-size"
            width={fields.length > 6 ? "200px" : ""}
            filter={d.filterType ? d.filterType : "text"}
          />
        ))}

        {actionsList.length > 0 && (
          <GridColumn
            field={"actions"}
            title="Actions"
            headerClassName="fcs-font-size !font-semibold"
            className="fcs-font-size text-right"
            cell={(props) => CustomOptionCell(props)}
            width="80px"
            filterable={false}
          />
        )}
      </Grid>

      {showExportAsPDF == true && (
        <GridPDFExport
          ref={(pdfExport) => (gridPDFExport = pdfExport)}
          fileName={pdfFileName}
          paperSize={"A4"}
          margin={10}
          scale={0.6}
        >
          <Grid
            id="dataGridControlForPDF"
            data={gridData}
            navigatable={true}
            //#region FILTERING OPTIONS
            filterable={allowFiltering}
            filter={filter}
            onFilterChange={(e) => setFilter(e.filter)}
            //#endregion
            //#region SORTING OPTIONS
            sortable={allowSorting}
            sort={sort}
            onSortChange={(e) => {
              setSort(e.sort);
            }}
            //#endregion
            //#region GROUPING OPTIONS
            groupable={{
              enabled: allowGrouping,
              footer: aggregates.length > 0 ? "visible" : "none",
            }}
            onGroupChange={onGroupChange}
            group={group}
            onExpandChange={onExpandChange}
            expandField="expanded"
            //#endregion
            //#region PAGINATION OPTIONS
            skip={page.skip}
            take={page.take}
            total={gridData.length}
            pageable={{
              buttonCount: 4,
              pageSizes: [5, 10, 15, "All"],
              pageSizeValue: pageSizeValue,
            }}
            onPageChange={pageChange}
            //#endregion
            style={{
              minHeight: "420px",
            }}
            cellRender={cellRender}
            className="fcs-font-size border-0"
          >
            {showToolbar == true && (
              <GridToolbar>
                {showExportAsExcel == true && (
                  <Button
                    title="Export as Excel"
                    themeColor={"primary"}
                    type="button"
                    onClick={excelExport}
                    className="btn btn-outline-secondary px-3"
                  >
                    Export as Excel
                  </Button>
                )}
                {showExportAsPDF == true && (
                  <Button
                    title="Export as PDF"
                    themeColor={"primary"}
                    type="button"
                    onClick={exportPDF}
                    className="btn btn-outline-secondary px-3"
                  >
                    Export as PDF
                  </Button>
                )}
              </GridToolbar>
            )}

            {showIDField == true && (
              <GridColumn
                filterable={false}
                field="telerikTableRowID"
                title="S.No"
                width={"50"}
                headerClassName="fcs-font-size !font-semibold"
                className="fcs-font-size"
              />
            )}

            {fields.map((d, key) => (
              <GridColumn
                key={key}
                field={d.fieldName}
                title={d.fieldTitle}
                format={d.format ? d.format : ""}
                cell={(props) => CustomDataCell(props, d)}
                hidden={d.isHidden}
                headerClassName="fcs-font-size !font-semibold"
                className="fcs-font-size"
                width={fields.length > 6 ? "200px" : ""}
              />
            ))}

            {/* {actionsList.map((d, key) => (
              <GridColumn
                key={key}
                field={d.fieldName}
                cell={CustomCell}
                width="150px"
              />
            ))} */}
          </Grid>
        </GridPDFExport>
      )}
      <ModalComponent
        open={modalOpen}
        onClose={() => window.location.reload()}
        header={modalHeader}
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </IntlProvider>
  );
}
