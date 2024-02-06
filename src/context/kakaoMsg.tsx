import { ReactNode, createContext, useState } from "react";

export const KakaoMsgContext = createContext("");

export default function KakaoMsgProvider({ children }: { children: ReactNode }) {
  const [kakaoMsg, setKakaoMsg] = useState("");

  //   return <KakaoMsgContext.Provider value={{ kakaoMsg, setKakaoMsg }}>{children}</KakaoMsgContext.Provider>;
}
