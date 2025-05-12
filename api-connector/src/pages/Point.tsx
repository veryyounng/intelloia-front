import React from "react";
import SidebarMenu from "../components/SidebarMenu";

const Point: React.FC = () => {
  return (
    <div className="h-dvh w-dvw">
      <main className="main">
        <SidebarMenu />
        <div className="main-content">
          <div className="content flex flex-col gap-10">
            <div className="text-container relative">
              <div className="foreground-gray-strong text-2xl font-bold">
                포인트 내역
              </div>
            </div>
            <div className="divider" />
            {/* 포인트 정보 카드 영역 */}
            <div className="section-container flex-col">
              {/* 포인트 정보 */}
              <div className="section section-plain">
                <div className="section-header">
                  <span>포인트</span>
                </div>
                <div className="section-body flex-row">
                  {/* 보유 포인트 및 소멸 예정 */}
                  <div className="section-m-2 section-m">
                    <div className="section-body">
                      <div className="listcard-container">
                        <div className="listcard-item justify-between">
                          <div className="label-m">보유 포인트</div>
                          <div className="label-l text-right">
                            <span>12,000</span>
                            <span> P</span>
                          </div>
                        </div>
                        <div className="divider"></div>
                        <div className="listcard-item justify-between">
                          <div className="label-m">소멸 예정 포인트 (30일 이내)</div>
                          <div className="label-l text-right foreground-gray-subtle">
                            <span>-</span>
                            <span>6,000</span>
                            <span> P</span>
                            <div className="flex flex-row gap-2 mt-2">
                              <button className="btn btn-s btn-neutral btn-outline">상세 내역</button>
                              <button className="btn btn-s btn-neutral btn-outline">포인트 환불</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 포인트 충전 */}
                  <div className="section section-m">
                    <div className="section-body flex-col">
                      <span className="label-m">포인트 충전</span>
                      <div className="section-body flex-col">
                        <div className="btn-container flex flex-row gap-2">
                          <button className="btn btn-m btn-primary btn-wide">직접 입력</button>
                          {['1만원', '3만원', '5만원', '10만원'].map((amount) => (
                            <button key={amount} className="btn btn-m btn-primary btn-outline btn-wide">{amount}</button>
                          ))}
                        </div>
                        <span className="helptext">
                          <img src="/img/icon/information-circle-outline.svg" alt="" />
                          충전 금액은 포인트로 전환되고 1년 내로 포인트가 소진되어야 합니다.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 사용 내역 */}
              <div className="section section-plain">
                <div className="section-header">사용내역</div>
                <div className="section-filter flex flex-row justify-between gap-2">
                  <div className="tab-container tab-m">
                    {["전체 내역", "서비스 사용", "API 사용", "포인트 충전", "포인트 환불"].map((tab) => (
                      <div key={tab} className={`tab ${tab === "전체 내역" ? "tab-active" : ""}`}>
                        <span>{tab}</span>
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
                    <button className="btn btn-m btn-primary">검색</button>
                  </div>
                </div>
                <div className="section-body flex-col">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead className="point-table">
                        <tr>
                          <th>날짜</th>
                          <th>유형</th>
                          <th>상세 내용</th>
                          <th>동시 계정 / 플랜</th>
                          <th>포인트 내역</th>
                          <th>잔여 포인트</th>
                        </tr>
                      </thead>
                      <tbody className="point-table">
                        {/* 예시 데이터 */}
                        {[
                          { date: "2025-03-20", type: "포인트 충전", detail: "결제 (30,000P)", plan: "-", point: "30,000", remain: "88,000" },
                          { date: "2025-03-15", type: "서비스 사용", detail: "서비스 A", plan: "스타터 플랜 * 1", point: "12,000", remain: "58,000" },
                          { date: "2025-03-10", type: "서비스 사용", detail: "서비스 C", plan: "엔터프라이즈 플랜 * 5", point: "50,000", remain: "70,000" },
                          { date: "2025-03-05", type: "포인트 충전", detail: "결제 (50,000P)", plan: "-", point: "50,000", remain: "120,000" },
                          { date: "2025-03-01", type: "API 사용", detail: "의료 STT", plan: "프로 플랜 * 3", point: "30,000", remain: "70,000" },
                        ].map((item, index) => (
                          <tr key={index} className="row">
                            <td>{item.date}</td>
                            <td>{item.type}</td>
                            <td>{item.detail}</td>
                            <td>{item.plan}</td>
                            <td className="td-point">{item.point}</td>
                            <td className="td-point">{item.remain}</td>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Point;