import CardUI from "@/components/cards/card-ui";

export default function ShipToDetails({ data }) {
  return (
    <CardUI>
      <h4 className="text-[18px] font-semibold text-dark mb-3">
        Ship To Details
      </h4>
      <hr className="mb-4" />

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Recipient Name</div>
        <div className="col-md-8 text-dark">{data.shipToName || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Email</div>
        <div className="col-md-8 text-dark">{data.shipToEmail || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Address</div>
        <div className="col-md-8 text-dark">{data.shipToAddress || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">City</div>
        <div className="col-md-8 text-dark">{data.shipToCity || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">State</div>
        <div className="col-md-8 text-dark">{data.shipToState || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Postal Code</div>
        <div className="col-md-8 text-dark">{data.shipToPostalCode || "-"}</div>
      </div>

      <div className="row">
        <div className="col-md-4 font-medium text-muted">Country</div>
        <div className="col-md-8 text-dark">{data.shipToCountry || "-"}</div>
      </div>
    </CardUI>
  );
}
