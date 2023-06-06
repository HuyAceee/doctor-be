import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
};

export const markdownFields = ["doctorId", "clinicId", "specialtyId", "id"];

export const getFieldQuery = (data) => {
  let query = {};
  Object.keys(data).forEach((field) => {
    if (markdownFields.includes(field)) {
      query = {
        ...query,
        [field]: data[field],
      };
    }
  });
  if (Object.keys(query).length) return query;
  return null;
};

export const convertImageFromBuffer = (data) => {
  if (!data) return "";
  const res = new Buffer(data, "base64").toString("binary");
  return res;
};
export const sendMailer = async (data, doctorId, doctorName, timeType, token) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.PASS_EMAIL, // generated ethereal password
    },
  });

  console.log(data, doctorId, doctorName, timeType, token);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"HuyAce 👻" <dvhuyck200499@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h3>Xin chào ${data.email}</h3><br/>
            <h4>Cảm ơn bạn đã quan tâm đến dịch vụ khám và chăm sóc sức khỏe của Bookingcare</h4>
            <h3><b>Thông tin lịch hẹn của bạn:</b></h3><br/>
            <h4><b>Bác sĩ: ${doctorName}</b></h4><br/>
            <h4><b>Thời gian: ${timeType}</b></h4><br/>
            <h4>Xin vui lòng xác nhận trong đường link dưới đây để xác nhận lịch khám bệnh của bạn:</h4><br/>
            <a href="http://localhost:8000/booking/vetify?doctorId=${doctorId}&token=${token}" target="_blank">Click me!</a><br/>
            <h4>XIn chân thành cảm ơn</h4>`, // html body
  });
}
