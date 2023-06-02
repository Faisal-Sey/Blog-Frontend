import mailchimp from '@mailchimp/mailchimp_marketing'

export default async (req, res) => {
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  mailchimp.setConfig({
    apiKey: API_KEY,
    server: "us14",
  });
  const { email ,fullName} = req.body;

  if (!email || !email.length) {
    return res.status(400).json({
      error: "Forgot to add your email?",
    });
  }

  try {
    console.log(LIST_ID)
    await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fullName.split(' ')[0],
        LNAME: fullName.split(' ')[1]
      }
    });

    // Success
    return res.status(201).json({ error: null });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: `Oops, something went wrong...`,
      message: error.toString()
    });
  }
};
