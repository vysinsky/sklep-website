import { FC } from "react";
import { graphql } from "@/generated/graphql";
import { performRequest } from "@/lib/datocms";
import Image from "next/image";

const footerDataQueryDocument = graphql(/* GraphQL */ `
  query FooterDataQuery {
    contactData: contact {
      logoInverted {
        url
      }
      street
      postcode
      icoCode
      city
      phone
      email
      facebookLink
      instagramLink
    }
  }
`);
const Footer: FC = async () => {
  const { contactData } = await performRequest(footerDataQueryDocument);

  return (
    <footer className="flex flex-col md:flex-row p-4 py-8 gap-4 items-center md:justify-center transition-colors duration-300 bg-[#040e27]">
      <div className="md:pr-10">
        {contactData?.logoInverted && (
          <Image
            src={contactData?.logoInverted?.url}
            width={180}
            height={180}
            alt=""
          />
        )}
      </div>
      {contactData && (
        <div className="flex flex-col text-white leading-8">
          <p className="py-8">
            {contactData.street} <br />
            {contactData.postcode}, {contactData.city} <br />
            <a href={`tel:${contactData.phone}`}>{contactData.phone}</a> <br />
            <a href={`mailto:${contactData.email}`}>{contactData.email}</a>{" "}
            <br />
            IČO: {contactData.icoCode}
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
