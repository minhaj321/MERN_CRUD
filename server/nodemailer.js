var nodemailer=require('nodemailer');

var transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user : 'minhajsohail25@gmail.com',
        pass : 'mubha1234'
    }
});

var mailOptions = {
    from :'minhajsohail25@gmail.com',
    to :'minhajsohail7@gmail.com',
    subject : 'Testing Changed',
    text : 'Changed ho gyi ye email ki subject nhi text',
    html :`<h1>Abay salay kya kr rha hai<h1>`
}
transport.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err)
    } else
    {
        console.log('Email Send'+info.response)
    }
})