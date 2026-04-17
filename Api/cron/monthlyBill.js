import cron from "node-cron";
import User from "../models/user.model.js";
import messBill from "../models/messBilling.model.js";
import generateBillPDF from "../utils/generateBillPDF.js";
import sendEmail from "../utils/sendEmail.js";

cron.schedule("59 23 * * *", async () => {
    console.log("Running monthly bill job...");

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);


    if (today.getMonth() !== tomorrow.getMonth()) {

        const month = today.toISOString().slice(0, 7);
        const users = await User.find();

        for (let user of users) {
            const bill = await messBill.findOne({
                user: user._id,
                month,
            });

            if (!bill) continue;

            const pdfBuffer = await generateBillPDF(bill, user);

            await sendEmail(
                user.email,
                "Your Monthly Mess Bill",
                `<p>Hello ${user.name},<br/>Please find your bill attached.</p>`,
                [
                    {
                        filename: `MessBill-${month}.pdf`,
                        content: pdfBuffer,
                    },
                ]
            );
        }

        console.log("Monthly emails sent ");
    }
});