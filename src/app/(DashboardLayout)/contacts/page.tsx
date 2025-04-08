import ManageContact from "@/components/modules/contacts";
import SectionTitle from "@/components/shared/SectionTitle";
import { getAllContacts } from "@/services/contact";

const ContactsPage = async () => {
  const { data } = await getAllContacts();
  const contacts = data ?? [];
  return (
    <div className="w-full">
      <SectionTitle title="Contacts" />
      <ManageContact contacts={contacts} />
    </div>
  );
};

export default ContactsPage;
