import { FC } from "react";
import { Image as DatoImage } from "react-datocms";

import { graphql } from "@/generated/graphql";
import { performRequest } from "@/lib/datocms";
import Link from "next/link";

const headerDataQueryDocument = graphql(/* GraphQL */ `
  query HeaderDataQuery {
    contactData: contact {
      logo {
        responsiveImage(
          imgixParams: { fit: crop, w: 100, h: 100, auto: format }
        ) {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
      email
      phone
      facebookLink
      instagramLink
    }
    menuLinks: allPages(filter: { displayInMenu: { eq: true } }) {
      slug
      title
      linkText
    }
    configuration {
      happyCustomerLogo {
        responsiveImage(
          imgixParams: { fit: crop, w: 111, h: 110, auto: format }
        ) {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
    }
  }
`);

const Header: FC = async () => {
  const { contactData, menuLinks, configuration } = await performRequest(
    headerDataQueryDocument,
  );

  return (
    <header className="bg-white px-12 py-6 flex items-center justify-between transition-colors duration-300">
      {contactData?.logo?.responsiveImage && (
        <DatoImage data={contactData?.logo?.responsiveImage} priority />
      )}
      <nav className="px-0 py-4">
        <ul className="list-none flex gap-5">
          <li>
            <Link href="/" className="text-[#040e27] hover:text-[#1ec6b6]">
              Domů
            </Link>
          </li>
          {menuLinks?.map((link) => (
            <li key={link.slug}>
              <Link
                href={`/${link.slug}`}
                className="text-[#040e27] hover:text-[#1ec6b6] transition-colors duration-300"
              >
                {link.linkText}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/fotogalerie"
              className="text-[#040e27] hover:text-[#1ec6b6] transition-colors duration-300"
            >
              Fotogalerie
            </Link>
          </li>
          <li>
            <Link
              href="https://sklep.udvouzvirat.cz/"
              className="text-[#ef302c] hover:text-[#1ec6b6] transition-colors duration-300"
            >
              E-shop
            </Link>
          </li>
        </ul>
      </nav>
      <aside className="flex">
        <div className="flex flex-col justify-center gap-2">
          <a
            href={`tel:${contactData?.phone}`}
            className="hover:text-[#0056b3]"
          >
            <i className="fa fa-phone text-[#1ec6b6] mr-1" />{" "}
            {contactData?.phone}
          </a>
          <a
            href={`mailto:${contactData?.email}`}
            className="hover:text-[#0056b3]"
          >
            <i className="fa fa-envelope text-[#1ec6b6] mr-1" />{" "}
            {contactData?.email}
          </a>
        </div>
        <div className="mx-5 px-5 border-[#eaeaea] border-x-2">
          {configuration?.happyCustomerLogo?.responsiveImage && (
            <DatoImage
              data={configuration.happyCustomerLogo.responsiveImage}
              priority
            />
          )}
        </div>
        <ul className="list-none flex items-center gap-4 text-[#aab1b7]">
          {contactData?.instagramLink && (
            <li>
              <a
                href={contactData.instagramLink}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 hover:text-[#1ec6b6]"
              >
                <i className="fa fa-instagram" />
              </a>
            </li>
          )}
          {contactData?.facebookLink && (
            <li>
              <a
                href={contactData.facebookLink}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 hover:text-[#1ec6b6]"
              >
                <i className="fa fa-facebook" />
              </a>
            </li>
          )}
        </ul>
      </aside>
    </header>
  );
};

export default Header;
