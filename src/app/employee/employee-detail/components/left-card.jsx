"use client";

import moment from "moment";
import { constants } from "@/helpers/constants";
import { PiUserDuotone } from "react-icons/pi";
import { toTitleCase } from "@/helpers/utilities";

export default function ProfileLeftCard({ data }) {
  return (
    <div className="card m-3 mr-0">
      <div className="card-body">
        <center className="m-t-30">
          <label htmlFor="avatarInput">
            <img
              src="/imgs/avatar.webp"
              alt="Avatar"
              className="rounded-full"
              width="150"
              height="150"
            />
          </label>

          <div className="mt-6">
            <h5 className="card-title font-light">
              {data.firstName} {data.lastName}
              <p className="text-sm text-gray-500">{data.email}</p>
            </h5>
            <h6 className="flex gap-1 justify-center items-center text-xs">
              <span className="text-yellow-500">
                <PiUserDuotone className="w-3 h-3" />
              </span>
              {toTitleCase(data.role)}
            </h6>
          </div>
        </center>
      </div>

      <hr className="my-0" />

      <div className="card-body grid grid-cols-2 text-center divide-x">
        <div>
          <h6 className="text-gray-700">
            {data.createdAt
              ? moment(data.createdAt).format(constants.DateFormatStr)
              : "-"}
          </h6>
          <span className="text-gray-500 text-xs">Profile Registered At</span>
        </div>
        <div>
          <h6 className="text-gray-700">
            {data.modifiedAt
              ? moment(data.modifiedAt).format(constants.DateFormatStr)
              : "-"}
          </h6>
          <span className="text-gray-500 text-xs">Profile Updated At</span>
        </div>
      </div>
    </div>
  );
}
