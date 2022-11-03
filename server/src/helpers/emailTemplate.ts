function emailTemplate(title:string, username: string, body:string):string {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
            rel="stylesheet">
        <style>
        body {
            color: #2f3643;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Poppins', sans-serif;
        }

        * {
            color: #2f3643;
        }

        .container {
            width: 740px;
            margin: 1rem auto;
        }

        .email-title {
            font-size: 28px;
            text-align: center;
            font-weight: 600;
        }

        .divider {
            width: 500px;
            background-color: #5666ea;
            border: none;
            height: 2px;
        }

        .email-body {
            width: 70%;
            margin: 1rem auto;
            text-align: center;
        }
        p{
            text-align: left;
        }
        .massage-head {
            font-weight: 600;
        }

        .button {
            margin: 1rem auto;
            width: 115px;
            height: 21px;
            border-radius: 4px;
            border: 1px solid #5666ea;
            background-color: #5666ea;
            padding: 1rem 1rem;
            color: white !important;
            font-weight: 600;
            display: block;
            cursor: pointer;
        }
        a { 
            text-decoration: none;
            color: white;
        }
        .list{
            text-align: left;
        }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1 class="email-title">${title}</h1>
            <hr class="divider" />
            <div class="email-body">
                <p class="massage-head">Dear ${username},</p>
                ${body}
            </div>
        </div>
    </body>
    
    </html>`;
}

export default emailTemplate;
