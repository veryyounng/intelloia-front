import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { getUserApiUsages, ApiUsageResponseDTO } from "../services/UserService";
import { fetchUserInfo } from "../services/UserService";

const APIsPage: React.FC = () => {
  const { userInfo } = useAuthStore();
  const [apiUsages, setApiUsages] = useState<ApiUsageResponseDTO[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    <div className="h-dvh w-dvw">
      <main className="main">
        <div className="menu">
          <div className="flex flex-row items-end gap-1">
            <a href="/html/MY-01-01.html">
              <img src="/img/logo.png" alt="intelloia logo" />
            </a>
            <a
              href="/html/LA-01.html"
              className="btn btn-icon-s btn-ghost pb-1"
            >
              <img src="/img/icon/square-arrow-out-up-right 1.svg" alt="" />
            </a>
          </div>
          <div className="divider"></div>
          <ul>
            <li>
              <Link to="/user-dashboard" className="menu-active">
                <img
                  src="/img/icon/document-text-outline.svg"
                  alt="MY 사용내역"
                />
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
              <a href="/html/SV-01-01.html">
                <img
                  src="/img/icon/building-storefront-outline.svg"
                  alt="Services"
                />
                Services
              </a>
            </li>
            <li>
              <a href="/html/PO-01-01.html">
                <img
                  src="/img/icon/credit-card-outline.svg"
                  alt="포인트 내역"
                />
                포인트 내역
              </a>
            </li>
            <li>
              <a href="/html/MM-01-01.html">
                <img
                  src="/img/icon/user-circle-outline.svg"
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
                <img src="/img/icon/user-outline.svg" alt="" />
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
                <a href="#" className="btn btn-icon-m btn-ghost">
                  <img src="/img/icon/power-outline.svg" alt="logout" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="content flex flex-col gap-10">
            <div className="text-container relative">
              <div className="foreground-gray-strong text-2xl font-bold">
                APIs
              </div>
            </div>
            <div className="divider"></div>

            <div className="flex-col">
              <div className="section-container">
                <div className="section section-plain">
                  <div className="section-header">
                    <span>MY API</span>
                  </div>
                  <div className="section-body flex-col">
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>사용처</th>
                            <th>사용 API</th>
                            <th>API Key</th>
                            <th>파트너사</th>
                            <th>중간관리자</th>
                            <th>동시접속</th>
                            <th>요금</th>
                            <th>상태</th>
                            <th>생성일</th>
                            <th>기타</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiUsages.map((usage, i) => (
                            <tr key={i} className="row">
                              <td>{usage.usageTarget}</td>
                              <td>{usage.apiName}</td>
                              <td className="td-api">
                                <span>{usage.apiKey}</span>
                                <a
                                  href="#"
                                  className="btn btn-neutral btn-ghost btn-icon-s"
                                  onClick={() =>
                                    navigator.clipboard.writeText(usage.apiKey)
                                  }
                                >
                                  <img
                                    src="/img/icon/document-duplicate-outline.svg"
                                    alt="복사"
                                  />
                                </a>
                              </td>
                              <td>{usage.partnerName}</td>
                              <td>{usage.managerCount}</td>
                              <td className="td-people">
                                {usage.concurrentAccess}
                              </td>
                              <td className="td-money">
                                {usage.price.toLocaleString()}
                              </td>
                              {/* <td
                                className={
                                  usage === "사용중"
                                    ? "td-status-inuse"
                                    : "td-status-stop"
                                }
                              >
                                {usage.status}
                                {usage.status === "사용정지" && (
                                  <div className="tooltip-icon">
                                    <span className="tooltip tooltip-right tooltip-neutral">
                                      {usage.reason || "사유 없음"}
                                    </span>
                                  </div>
                                )}
                              
                              </td> */}
                              <td className="td-status-inuse">사용중</td>
                              <td>{usage.createdAt?.substring(0, 10)}</td>
                              <td>
                                <Link
                                  to={`/api-detail/${usage.usageId}`}
                                  className="btn btn-s btn-primary btn-outline"
                                >
                                  더보기
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="pagination-container">
                      <div className="pagination">
                        <a className="pagination-item pagination-control">
                          <img src="/img/icon/chevron-left-solid.svg" alt="" />
                        </a>
                        <a className="pagination-item pagination-page">1</a>
                        <a className="pagination-item pagination-control">
                          <img src="/img/icon/chevron-right-solid.svg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section section-plain">
                <div className="section-header">APIs</div>
                <div className="section-body flex-row">
                  {[1, 2].map((i) => (
                    <div className="card" key={i}>
                      <div className="card-header">의료 STT</div>
                      <div className="card-body">
                        <span>
                          의료 현장에서 사용하는 음성을 의료 용어와 문맥에 맞게
                          텍스트로 변환할 수 있습니다.
                        </span>
                        <div className="btn-container flex flex-row">
                          <a className="btn btn-m btn-wide btn-primary btn-outline">
                            문서보기
                          </a>
                          <Link
                            to="medicalsttSub"
                            className="btn btn-m btn-wide btn-primary btn-outline"
                          >
                            사용하기
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default APIsPage;
