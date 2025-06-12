import moment from "moment";
import { constants } from "@/helpers/constants";
import { PiUserDuotone } from "react-icons/pi";

function ProfileLeftCard({ data }) {
  return (
    <>
      <div className="card m-3 mr-0">
        <div className="card-body">
          {/* <div className="d-md-flex align-items-center">
            <div>
              <h4 className="card-title">Edit client</h4>
            </div>
          </div>
          <div>
            <hr />
            <br />
          </div> */}

          <center className="m-t-30">
            <label htmlFor="avatarInput">
              <img
                src="/imgs/avatar.webp"
                className="rounded-circle"
                width="150"
              />
            </label>
            <div>
              <br />
              <br />
            </div>

            {/* <form
                      className="form-horizontal form-material"
                      id="edit_avatar_form"
                      name="edit_avatar_form"
                      method="post"
                      encType="multipart/form-data"
                    >
                      <div className="col-md-6 mb-3">
                        <div className="form-group" style={{ display: "none" }}>
                          <Input
                            className="form-control"
                            id="avatarInput"
                            name="avatar"
                            type="file"
                          />
                        </div>
                      </div>
                      <div className="col-md-8 mb-3">
                        <Button type="submit" className="btn filterBtn rounded">
                          Update Avatar
                        </Button>
                      </div>
                      <div className="d-none">
                        <Input name="id" id="id" type="hidden" value="5" />
                      </div>
                    </form> */}

            <h5 className="card-title m-t-10 font-light">
              {data?.customer.firstName} {data?.customer.lastName}
              <p className="text-sm">{data?.customer.email}</p>
            </h5>
            <h6
              className="flex gap-1 card-subtitle justify-center items-center"
              style={{ fontSize: "12px" }}
            >
              <span className="text-warning">
                <PiUserDuotone className="w-[12px] h-[12px]" />
              </span>{" "}
              Customer
            </h6>
            {/* <h6 className="card-subtitle">
                      <span>
                        Virtual mailbox{" "}
                        <i className="icon-double-angle-right"></i>
                      </span>
                      <div className="badge badge-pill badge-light font-16">
                        {" "}
                        LOC 23069
                      </div>
                    </h6> */}
          </center>
        </div>
        <div>
          <hr />
        </div>
        <div className="card-body row text-center">
          <div className="col-6 border-right">
            <h6 className="text-color-grey">
              {moment(data?.customer.createdAt).format(constants.DateFormatStr)}
            </h6>
            <span className="text-color-grey">Profile Registered At</span>
          </div>
          <div className="col-6">
            <h6 className="text-color-grey">
              {data?.customer.modifiedA
                ? moment(data?.customer.modifiedAt).format(
                    constants.DateFormatStr
                  )
                : "-"}
            </h6>
            <span className="text-color-grey">Profile Updated At</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileLeftCard;
