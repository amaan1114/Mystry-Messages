import{
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
}from "@react-email/components";

interface VerificationEmailProps{
    username:string,
    otp:string
}
export default function VerificationEmail({username,otp}:VerificationEmailProps){
    return(
        <Html>
        <Head>
            <title>Verification Code</title>
            <Font
            fontFamily="Roboto"
            fallbackFontFamily="Arial"
            webFont={{
                url:"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
                format:"woff2"
            }}
            fontWeight={400}
           fontStyle="normal"/>



        </Head>
        <Preview>Your verification code</Preview>
        <Section style={{fontFamily:"Roboto",backgroundColor:"#f9f9f9",padding:"20px"}}>
            <Heading style={{color:"#333333",textAlign:"center"}}>Verify Your Email</Heading>
            <Text style={{color:"#555555",fontSize:"16px"}}>Hello {username},</Text>
            <Text style={{color:"#555555",fontSize:"16px"}}>Thank you for signing up! Please use the verification code below to verify your email address:</Text>
            <Row style={{justifyContent:"center",margin:"20px 0"}}>
                <Text style={{fontSize:"24px",fontWeight:"bold",color:"#000000",padding:"10px 20px",border:"2px dashed #000000",borderRadius:"5px"}}>{otp}</Text>
            </Row>
            <Text style={{color:"#555555",fontSize:"16px"}}>If you did not sign up for this account, please ignore this email.</Text>
            <Text style={{color:"#555555",fontSize:"16px"}}>Best regards,<br/>The Mystry Message Team</Text>
        </Section>
        </Html>
    )
}