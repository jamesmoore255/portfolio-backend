import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Application, Response, Request } from 'express';
import * as express from 'express';
import * as nodemailer from 'nodemailer';

// const PORT = process.env.PORT || 8080;

let app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const transporter: any = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'james.p.development@gmail.com',
    pass: 'testpassword225',
  },
});

app.post('/sendMail', (req: Request, res: Response) => {
  const email = req.body.email;
  const message = req.body.body;
  const mailOptions = {
    from: 'james.p.development@gmail.com', // sender address
    to: 'jamesmoore255@gmail.com', // list of receivers
    subject: `A new enquiry from ${email}!`, // Subject line
    html: `<p>${message}</p>`// plain text body
  };
  try {
    const sending = transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
    return res.json({
      status: 200,
      message: `Email sent to: ${email}`,
    });
  } catch (e) {
    console.log(`Error: ${e}`);
    return res.json({
      status: 400, // Find out the proper code
      message: `Something went wrong, ${e}`,
    });
  }
});

app.listen(8080, () => {
  console.log(`App running on localhost:8080`);
});
