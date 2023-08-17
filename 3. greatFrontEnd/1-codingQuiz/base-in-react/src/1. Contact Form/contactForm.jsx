import React from "react";
import submitForm from "../Functions/submitForm";

import "./contactForm.css";

const contactForm = () => {
  return (
    <form
      action='https://www.greatfrontend.com/api/questions/contact-form'
      method='post'
      onSubmit={submitForm}
      id='submit'
    >
      <label for='name'>Name</label>
      <input id='name' type='text' name='name' />
      <label for='email'>Email</label>
      <input id='email' type='email' name='email' />
      <label for='message'>Message</label>
      <textarea id='message' name='message' />
      <button form='submit'>Send</button>
    </form>
  );
};

export default contactForm;
