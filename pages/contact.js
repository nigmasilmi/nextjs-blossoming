import { Fragment } from "react";
import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Contact form to reach the author" />
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
