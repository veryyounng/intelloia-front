// src/pages/UserDashboard.tsx
import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import { useAuthStore } from "../store/authStore";
import { getUserApiUsages, ApiUsageResponseDTO } from "../services/UserService";
import { fetchUserInfo } from "../services/UserService";

const UserDashboard: React.FC = () => {
  const { userInfo } = useAuthStore();
  // @ts-ignore
  const [apiUsages, setApiUsages] = useState<ApiUsageResponseDTO[]>([]);

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
        <SidebarMenu/>
        <div className="main-content">
          <div className="content flex flex-col gap-10">
            <div className="text-container relative">
              <div className="foreground-gray-strong text-2xl font-bold">
                My 사용내역
              </div>
            </div>
            <div className="divider"></div>
            <div className="section-container flex-row">
              <div className="section section-plain">
                <div className="section-header">
                  <span>MY APIs</span>
                </div>
                <div className="section-body flex-col">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <colgroup>
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th></th>
                          <th>사용처</th>
                          <th>사용 API</th>
                          <th>중간관리자</th>
                          <th>동시접속</th>
                          <th>요금</th>
                          <th>기타</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <tr className="row" key={idx}>
                            <td
                              className={
                                idx === 1 ? "td-status-stop" : "td-status-inuse"
                              }
                            ></td>
                            <td>서비스 A</td>
                            <td>음성 인식 API</td>
                            <td>3</td>
                            <td>2</td>
                            <td className="td-money">24,000</td>
                            <td>
                              <a
                                href="#"
                                className="btn btn-s btn-primary btn-outline"
                              >
                                더보기
                              </a>
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

              {/* MY Services 섹션 */}
              <div className="section section-plain">
                <div className="section-header">
                  <span>MY Services</span>
                </div>
                <div className="section-body flex-col">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <colgroup>
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "10%" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th></th>
                          <th>사용처</th>
                          <th>사용 서비스</th>
                          <th>중간관리자</th>
                          <th>플랜</th>
                          <th>계정 수</th>
                          <th>요금</th>
                          <th>기타</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="td-status-inuse"></td>
                          <td>사용처 A</td>
                          <td>다미톡</td>
                          <td>3</td>
                          <td>스타터 플랜</td>
                          <td>1</td>
                          <td className="td-money">10,000</td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-s btn-primary btn-outline"
                            >
                              더보기
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="td-status-inuse"></td>
                          <td>사용처 B</td>
                          <td>비즈챗</td>
                          <td className="foreground-gray-subtler">미등록</td>
                          <td>프로 플랜</td>
                          <td>3</td>
                          <td className="td-money">30,000</td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-s btn-primary btn-outline"
                            >
                              더보기
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="td-status-inuse"></td>
                          <td>사용처 C</td>
                          <td>클라우드톡</td>
                          <td>2</td>
                          <td>스타터 플랜</td>
                          <td>5</td>
                          <td className="td-money">50,000</td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-s btn-primary btn-outline"
                            >
                              더보기
                            </a>
                          </td>
                        </tr>
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
            <div className="section section-plain flex-col">
              <div className="section-header">사용량</div>
              <div className="section-filter flex flex-row justify-between gap-2">
                <div className="tab-container tab-m">
                  {[
                    "전체 내역",
                    "서비스 이용",
                    "API 이용",
                    "포인트 충전",
                    "포인트 환불",
                  ].map((label, idx) => (
                    <div
                      key={idx}
                      className={`tab ${idx === 0 ? "tab-active" : ""}`}
                    >
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  <div className="textfield-container">
                    <div className="textfield flex flex-row gap-2">
                      <input type="date" className="textfield-placeholder" />
                      <span className="textfield-suffix">~</span>
                      <input type="date" className="textfield-placeholder" />
                    </div>
                  </div>
                  <div className="btn btn-m btn-primary">검색</div>
                </div>
              </div>
              <div className="section-body flex-col">
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>유형</th>
                        <th>상세 내용</th>
                        <th>동시 계정 / 플랜</th>
                        <th>포인트 내역</th>
                        <th>잔여 포인트</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-03-20</td>
                        <td>포인트 충전</td>
                        <td>결제 (30,000P)</td>
                        <td>-</td>
                        <td className="td-point">+ 30,000</td>
                        <td className="td-point">88,000</td>
                      </tr>
                      <tr>
                        <td>2025-03-15</td>
                        <td>서비스 이용</td>
                        <td>서비스 A</td>
                        <td>스타터 플랜 * 1</td>
                        <td className="td-point">- 12,000</td>
                        <td className="td-point">58,000</td>
                      </tr>
                      <tr>
                        <td>2025-03-10</td>
                        <td>서비스 이용</td>
                        <td>서비스 C</td>
                        <td>엔터프라이즈 플랜 * 5</td>
                        <td className="td-point">- 50,000</td>
                        <td className="td-point">70,000</td>
                      </tr>
                      <tr>
                        <td>2025-03-05</td>
                        <td>포인트 충전</td>
                        <td>결제 (50,000P)</td>
                        <td>-</td>
                        <td className="td-point">+ 50,000</td>
                        <td className="td-point">120,000</td>
                      </tr>
                      <tr>
                        <td>2025-03-01</td>
                        <td>이용</td>
                        <td>의료 STT</td>
                        <td>프로 플랜 * 3</td>
                        <td className="td-point">- 30,000</td>
                        <td className="td-point">70,000</td>
                      </tr>
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
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
