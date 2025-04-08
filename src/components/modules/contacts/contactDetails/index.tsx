import { TContact } from "@/types/contacts";
import moment from "moment-timezone";
import { Fragment } from "react";

export default function ContactDetails({ contact }: { contact: TContact }) {
  return (
    <Fragment>
      <div className="mt-4 space-y-4">
        {/* name and */}
        <div>
          <h3 className="text-xl font-medium">Name:</h3>
          <p className=" text-base text-[#989BA4] leading-relaxed">{contact?.name}</p>
        </div>

        {/* message send date */}
        <div>
          <h3 className="text-xl font-medium">Message Send Date:</h3>

          <div className="flex items-center space-x-3 ">
            <p className="text-base text-[#989BA4]"> {moment(contact?.createdAt).tz("Asia/Dhaka").format("MMMM D, YYYY")}</p>
            {/* <Image width={25} height={25} alt="Calendar Icon" src={calendar} /> */}
          </div>
        </div>

        {/* email */}
        <div>
          <h3 className="text-xl font-medium">Email:</h3>
          <p className=" text-base text-[#989BA4] leading-relaxed">{contact?.email}</p>
        </div>

        {/* phone */}
        {contact?.phone && (
          <div>
            <h3 className="text-xl font-medium">Phone Number:</h3>
            <p className=" text-base text-[#989BA4] leading-relaxed">{contact?.phone}</p>
          </div>
        )}

        {/* message */}
        <div>
          <h3 className="text-xl font-medium">Message:</h3>
          <p className=" text-base text-[#989BA4] leading-relaxed">{contact?.message}</p>
        </div>
      </div>
    </Fragment>
  );
}
