
import PDFDocument from "pdfkit";

const generateBillPDF = (bill, user) => {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        let totalAmount = 0;

        bill.days.forEach((d) => {
            totalAmount +=
                (d.breakfast || 0) +
                (d.lunch || 0) +
                (d.dinner || 0) +
                (d.extras || 0);
        });

        doc
            .fontSize(24)
            .fillColor("#2c3e50")
            .text("Mess Bill Summary", { align: "center" });

        doc.moveDown(2);

        doc
            .rect(50, doc.y, 500, 100)
            .stroke("#cccccc");

        doc.moveDown(1);

        doc
            .fontSize(14)
            .fillColor("black")
            .text(`Name: ${user.name}`, 70)
            .text(`Roll No: ${user.rollno}`, 70)
            .text(`Month: ${bill.month}`, 70);

        doc.moveDown(3);

        const y = doc.y;

        doc
            .rect(50, y, 500, 60)
            .fill("#27ae60");

        doc
            .fillColor("white")
            .fontSize(18)
            .text(`Total Mess Bill: ₹ ${Number(totalAmount)}`, 70, y + 20);
        doc.moveDown(4);

        doc
            .fontSize(10)
            .fillColor("gray")
            .text("This is a system generated bill.", { align: "center" });

        doc.end();
    });
};

export default generateBillPDF;