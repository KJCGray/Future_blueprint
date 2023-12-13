import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

const Btnbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    nookies.destroy(null, "token");
    nookies.destroy(null, "userid");
    console.log("destroy");
    router.push("/");
  };
  return (
    <div className="flex items-center justify-center bg-orange-100 rounded-xl w-[260px] h-[400px]">
      <div className="flex flex-col w-32 space-y-8">
        <Button className="font-semibold text-yellow-900 bg-orange-200 ">個人資料</Button>
        <Button className="font-semibold text-yellow-900 bg-orange-200">帳戶設定</Button>
        <Button className="font-semibold text-yellow-900 bg-orange-200">留言紀錄</Button>
        <Button className="font-semibold text-yellow-900 bg-orange-200">我的收藏</Button>
        <Button className="font-semibold text-yellow-900 bg-orange-200" onClick={handleLogout}>
          登出
        </Button>
      </div>
    </div>
  );
};

export default Btnbar;
