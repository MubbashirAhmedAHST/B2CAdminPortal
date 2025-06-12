import CardUI from "@/components/cards/card-ui";

export default function ShipFromDetails({ data }) {
  return (
    <CardUI>
      <h4 className="text-[18px] font-semibold text-dark mb-3">
        Ship From Details
      </h4>
      <hr className="mb-4" />

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Sender Name</div>
        <div className="col-md-8 text-dark">{data.shipFromName || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Email</div>
        <div className="col-md-8 text-dark">{data.shipFromEmail || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Address</div>
        <div className="col-md-8 text-dark">{data.shipFromAddress || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">City</div>
        <div className="col-md-8 text-dark">{data.shipFromCity || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">State</div>
        <div className="col-md-8 text-dark">{data.shipFromState || "-"}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 font-medium text-muted">Postal Code</div>
        <div className="col-md-8 text-dark">
          {data.shipFromPostalCode || "-"}
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 font-medium text-muted">Country</div>
        <div className="col-md-8 text-dark">{data.shipFromCountry || "-"}</div>
      </div>
    </CardUI>
  );
}
