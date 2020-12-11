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
  const [payload, setPayload] = React.useState();
  const [code, setCode] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    console.log(code);
  }, [code]);

  React.useEffect(() => {
    const socket = io("ws://gd-authenticator-backend.herokuapp.com/");

    socket.on("connect", () => {
      socket.emit("ack");
    });

    socket.on("code", (data: string) => {
      const parsed = JSON.parse(data);

      setCode(parsed._code);

      if (!payload) {
        routine(parsed._expires, () => socket.emit("generate"));
        setPayload(parsed);
      }
    });

    socket.on("permission", async (body: any) => {
      await Authentication.login(body);

      router.push("/profile");
    });

    return () => {
      socket.close();
      clearInterval(t);
    }
  }, []);

  return (
    <Background>
      <Content>
        <section>
          <Title>Authorize this application</Title>
          <ul style={{marginLeft: 20}}>
            <li>
              Open you mobile application;
            </li>
            <li>
              Login into your account;
            </li>
            <li>
              Open the authenticator;
            </li>
            <li>
              Scan the QR Code;
            </li>
          </ul>
        </section>
        <section>
          <QRCode
            size={250}
            fgColor="rgba(152,12,156,1)"
            bgColor="#fff"
            level={"H"}
            value={code}
          />
        </section>
      </Content>
    </Background>
  );
};

export default Home;
