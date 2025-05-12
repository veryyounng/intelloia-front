import React from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";

const Service: React.FC = () => {
  return (
    <main className="main h-dvh w-dvw">
      <SidebarMenu/>
      <div className="main-content">
        <div className="content flex flex-col gap-10">
          <div className="text-container relative">
            <div className="foreground-gray-strong text-2xl font-bold">Services</div>
          </div>
          <div className="divider"></div>

          <div className="flex-col">
            <div className="section-container">
              <div className="section section-plain">
                <div className="section-header">
                  <span>MY Services</span>
                </div>
                <div className="section-body flex-col">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <colgroup>
                        <col style={{ width: "11%" }} />
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "5%" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>사용처</th>
                          <th>사용 서비스</th>
                          <th>Plug-in Key</th>
                          <th>파트너사</th>
                          <th>플랜</th>
                          <th>계정 수</th>
                          <th>중간관리자</th>
                          <th>요금</th>
                          <th>상태</th>
                          <th>생성일</th>
                          <th>기타</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map((i) => (
                          <tr className="row" key={i}>
                            <td>양지병원 입원병동</td>
                            <td>다미톡</td>
                            <td className="td-api">
                              <span>
                                abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678
                              </span>
                              <Link to="" className="btn btn-neutral btn-ghost btn-icon-s">
                                <img src="/img/icon/document-duplicate-outline.svg" alt="" />
                              </Link>
                            </td>
                            <td>회사 X</td>
                            <td>Starter</td>
                            <td className="td-count">3</td>
                            <td className="td-people">5</td>
                            <td className="td-money">120,000</td>
                            <td className="td-status-inuse">사용중</td>
                            <td>2024-03-31</td>
                            <td>
                              <Link
                                to={i % 2 === 0 ? "/html/AP-03-01.html" : "/html/SV-03-01.html"}
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

              <div className="section section-plain">
                <div className="section-header">Services</div>
                <div className="section-body flex-row">
                  <div className="card">
                    <div className="card-header">다미톡</div>
                    <div className="card-body">
                      <span>
                        의료 현장에서 사용하는 음성을 의료 용어와 문맥에 맞게 텍스트로 변환할 수 있습니다.
                      </span>
                      <div className="btn-container flex flex-row">
                        <a className="btn btn-m btn-wide btn-primary btn-outline">문서보기</a>
                        <Link
                          to="/html/SV-02-01.html"
                          className="btn btn-m btn-wide btn-primary btn-outline"
                        >
                          사용하기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Service;
