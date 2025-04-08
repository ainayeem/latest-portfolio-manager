import ContactDetails from "@/components/modules/contacts/contactDetails";
import SectionTitle from "@/components/shared/SectionTitle";
import { getContactById } from "@/services/contact";

const ContactDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: contact } = await getContactById(id);

  return (
    <>
      <SectionTitle title="Contact Details" />
      <ContactDetails contact={contact} />
    </>
  );
};

export default ContactDetailsPage;
