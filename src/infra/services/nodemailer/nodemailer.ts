import transporter from ".";

export async function sendEmail(to: string, title: string, content: string) {
    const info = await transporter.sendMail({
        from: 'dapscreed@gmail.com', // sender address
        to, // list of receivers
        subject: title, // Subject line
        text: content, // html body
    });

    console.log(info);
}