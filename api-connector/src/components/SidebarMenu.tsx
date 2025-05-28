import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { getUserApiUsages, ApiUsageResponseDTO } from "../services/UserService";
import { fetchUserInfo } from "../services/UserService";

export default function SidebarMenu() {
  const { userInfo } = useAuthStore();
  // @ts-ignore
  const [apiUsages, setApiUsages] = useState<ApiUsageResponseDTO[]>([]);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.userId) {
        try {
          const [usages, userDetails] = await Promise.all([
            getUserApiUsages(userInfo.userId),
            fetchUserInfo(userInfo.userId),
          ]);
          setApiUsages(usages);
          useAuthStore.getState().setUserDetails(userDetails);
        } catch (e) {
          console.error("사용내역 또는 유저 정보 조회 실패", e);
        }
      }
    };
    fetchData();
  }, [userInfo?.userId]);

  return (
    <div className="menu">
      <div className="flex flex-row items-end gap-1">
        <Link to= "/user-dashboard">
          <img src="../img/logo.png" alt="intelloia logo" />
        </Link>
        <Link to="/user-dashboard" className="btn btn-icon-s btn-ghost pb-1">
          <img src="../img/icon/square-arrow-out-up-right 1.svg" alt="" />
        </Link>
      </div>
      <div className="divider"></div>
      <ul>
        <li>
          <Link to="/user-dashboard" className="menu-active">
            <img src="/img/icon/document-text-outline.svg" alt="MY 사용내역" />
            MY 사용내역
          </Link>
        </li>
        <li>
          <Link to="/apis-page">
            <img src="/img/icon/command-line-outline.svg" alt="APIs" />
            APIs
          </Link>
        </li>
        <li>
          <Link to = "/service-page">
            <img src="../img/icon/building-storefront-outline.svg" alt="Services"/>
            Services
          </Link>
        </li>
        <li>
          <Link to="/point-page">
            <img src="../img/icon/credit-card-outline.svg" alt="포인트 내역" />
            포인트 내역
            </Link>
        </li>
        <li>
          <a href="">
            <img
              src="../img/icon/user-circle-outline.svg"
              alt="회원정보 관리"
            />
            회원정보 관리
          </a>
        </li>
      </ul>
      <div className="divider"></div>
      <div className="menu-footer align-center flex w-full flex-col items-center">
        <div className="profile-container">
          <div className="profile">
            <img src="../img/icon/user-outline.svg" alt="" />
          </div>
          <div className="profile-info">
            <div className="flex flex-row gap-2">
              <span>{userInfo?.userName}</span>
              <span className="chip chip-neutral chip-s">
                {userInfo?.authorities}
              </span>
            </div>
            <div>{userInfo?.email}</div>
          </div>
          <div className="profile-btn">
            <a href="" className="btn btn-icon-m btn-ghost">
              <img src="../img/icon/power-outline.svg" alt="logout" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
