import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { mailTransport } from "../utlis/mail";
import { createContactFormInfoValidation } from "../validation/contactForm-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// submit Contact Form service
const submitContactForm = async (reqData: DataRegister) => {
  const contactFormInfo = validate(createContactFormInfoValidation, reqData);

  const result = await prismaClient.contact_form.create({
    data: contactFormInfo,
  });

  if (!result) {
    throw new ResponseError(500, "Internal Server Error");
  }

  //send email to user
  mailTransport().sendMail({
    from: "email@example.com",
    to: contactFormInfo.email,
    subject: contactFormInfo.subject,
    html: contactFormInfo.message,
  });

  const updateContactForm = await prismaClient.contact_form.update({
    where: {
      id: result.id,
    },

    data: { sentConfirmation: true },
  });

  //send actual contact form to ourselves
  mailTransport().sendMail({
    from: `${result.name} ${result.email}`,
    to: `recipients@example.com`,
    subject: `Contact request n. ${result.id}`,
    html: ` Name: ${result.name}<br>
                          Email: ${result.email}<br>

                          <br><br><br>

                          Message:<br>
                          ${result.message}`,
  });

  const updateContactFormAgain = await prismaClient.contact_form.update({
    where: {
      id: result.id,
    },

    data: { receivedEmail: true },
  });

  return "We got your message!";
};

export default { submitContactForm };
