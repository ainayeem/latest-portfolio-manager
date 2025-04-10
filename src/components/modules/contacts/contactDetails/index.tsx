import { TContact } from "@/types/contacts";
import { Calendar, Mail, MessageSquare, Phone } from "lucide-react";
import moment from "moment-timezone";

export default function ContactDetails({ contact }: { contact: TContact }) {
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Details</h2>

      <div className="space-y-6">
        <div className="flex justify-between">
          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Name</h3>
            </div>
            <p className="ml-11 text-gray-600 dark:text-gray-400">{contact?.name}</p>
          </div>

          {/* Message Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Message Date</h3>
            </div>
            <p className="ml-11 text-gray-600 dark:text-gray-400">{moment(contact?.createdAt).tz("Asia/Dhaka").format("MMMM D, YYYY [at] h:mm A")}</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Email</h3>
            </div>
            <a href={`mailto:${contact?.email}`} className="ml-11 text-blue-600 dark:text-blue-400 hover:underline">
              {contact?.email}
            </a>
          </div>

          {/* Phone (conditional) */}
          {contact?.phone && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Phone</h3>
              </div>
              <a href={`tel:${contact?.phone}`} className="ml-11 text-blue-600 dark:text-blue-400 hover:underline">
                {contact?.phone}
              </a>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Message</h3>
          </div>
          <div className="ml-11 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{contact?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
