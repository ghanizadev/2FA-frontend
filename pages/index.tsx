import QRCode from "qrcode.react";
import { io } from "socket.io-client";
import React from "react";
import Background from "../components/Background";
import Title from "../components/Title";
import Content from "../components/Content";
import Authentication from "../services/Authentication";
import { useRouter } from "next/router";

let t: number;

const routine = (timer: number, callback: () => void) => {
  if (t) clearInterval(t);

  t = setInterval(() => {
    callback();
  }, timer);
};

const Home = () => {
  const [payload, setPayload] = React.useState({
    code: "",
    expires: "",
  });
  const router = useRouter();

  React.useEffect(() => {
    process.env.NODE_ENV === "development" && console.log(payload.code);
  }, [payload.code]);

  React.useEffect(() => {
    const socket = io(`ws://${process.env.SERVER_URL}`);

    socket.on("connect", () => {
      socket.emit("ack");
    });

    socket.on("code", (data: string) => {
      const parsed = JSON.parse(data);

      if (!payload) {
        routine(parsed.expires, () => socket.emit("generate"));
      }

      setPayload(parsed);
    });

    socket.on("permission", async (body: any) => {
      await Authentication.login(body);

      router.push("/profile");
    });

    return () => {
      socket.close();
      clearInterval(t);
    };
  }, []);

  return (
    <Background>
      <Content>
        <section>
          <Title>Authorize this application</Title>
          <ul style={{ marginLeft: 20 }}>
            <li>Open you mobile application;</li>
            <li>Login into your account;</li>
            <li>Open the authenticator;</li>
            <li>Scan the QR Code;</li>
          </ul>
        </section>
        <section>
          <QRCode
            size={250}
            fgColor="rgba(152,12,156,1)"
            bgColor="#fff"
            level={"H"}
            value={payload.code}
          />
        </section>
      </Content>
    </Background>
  );
};

export default Home;
