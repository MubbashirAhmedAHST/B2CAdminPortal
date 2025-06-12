"use client";

import moment from "moment";
import { constants } from "@/helpers/constants";
import { PiUserDuotone } from "react-icons/pi";

function ProfileLeftCard({ data }) {
  return (
    <>
      <div className="card mr-0">
        <div className="card-body fcs-font-size">
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
              {data.name}
              <p className="text-sm">{data.vendorEmail}</p>
            </h5>
            <h6 className="flex gap-1 card-subtitle justify-center items-center">
              <span className="text-warning">
                <PiUserDuotone className="w-[12px] h-[12px]" />
              </span>{" "}
              Vendor
            </h6>
          </center>
        </div>
        <div>
          <hr />
        </div>
        <div className="card-body row text-center">
          <div className="col-6 border-right">
            <h6 className="text-color-grey">
              {moment(data.createdAt).format(constants.DateFormatStr)}
            </h6>
            <span className="text-color-grey">Profile Registered At</span>
          </div>
          <div className="col-6">
            <h6 className="text-color-grey">
              {moment(data.modifiedAt).format(constants.DateFormatStr)}
            </h6>
            <span className="text-color-grey">Profile Updated At</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileLeftCard;
