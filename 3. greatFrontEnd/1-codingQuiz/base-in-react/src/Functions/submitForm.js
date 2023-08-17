const SUBMIT_URL = "https://www.greatfrontend.com/api/questions/contact-form";

const submitForm = async (event) => {
  event.preventDefault();
  const form = event.target;

  try {
    if (form.action !== SUBMIT_URL) {
      alert("Incorrect form action value");
      return;
    }
    if (form.method.toLowerCase() !== "post") {
      alert("Incorrect form method value");
      return;
    }

    const formData = new FormData(form);
    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    const responseAnswer = await response.text();
    alert(responseAnswer);
  } catch (error) {
    console.error(error);
    alert("Error submitting form!");
  }
};

export default submitForm;
