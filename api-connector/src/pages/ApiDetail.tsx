import { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ModalManager from "../components/ModalManager";
import { getApiUsageDetail } from "../services/UserService";
import { ApiUsageResponseDTO } from "../services/UserService";
import { useParams } from "react-router-dom";

export default function ApiDetail() {
  const { usageId } = useParams(); // 여기에 usageId 들어옴

  const [apiUsage, setApiUsage] = useState<
    (ApiUsageResponseDTO & { usageId: number }) | null
  >(null);

  useEffect(() => {
    if (!usageId) return;

    getApiUsageDetail(Number(usageId))
      .then((data) => {
        console.log("받은 api 상세 데이터", data);
        setApiUsage(data);
      })
      .catch((err) => console.error("상세 조회 실패:", err));
  }, [usageId]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 10).replace(/-/g, "/");
  };

  const add30Days = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 30);
    return date.toISOString().slice(0, 10).replace(/-/g, "/");
  };

  return (
    <main className="flex h-dvh w-dvw flex-row">
      <SidebarMenu />
      <div className="main-content">
        <div className="content flex flex-col gap-10">
          <div className="text-container relative">
            <div className="foreground-gray-strong text-2xl font-bold">
              APIs
            </div>
          </div>
          <div className="divider" />
          <div className="flex-col">
            <div className="section-container">
              <div className="section">
                <div className="section-header relative">
                  <button
                    className="btn btn-ghost btn-icon-m absolute -left-8"
                    onClick={() => history.back()}
                  >
                    <img src="../img/icon/chevron-left-outline.svg" alt="" />
                  </button>
                  <span>{apiUsage?.apiName}</span>
                </div>
                <div className="section-body flex-col">
                  <div className="form-container">
                    <div className="flex flex-row gap-4">
                      <label className="label-m" htmlFor="text">
                        사용처
                      </label>
                      <div className="textfield flex flex-row">
                        <input
                          className="textfield-placeholder"
                          type="text"
                          value={apiUsage?.usageTarget}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-start gap-4">
                      <label className="label-m" htmlFor="number">
                        동시 접속 수
                      </label>
                      <div className="flex flex-col gap-2">
                        <div className="stepper-container">
                          <div className="stepper">
                            <button
                              className="stepper-button decrement-button"
                              aria-label="감소"
                            >
                              <div className="stepper-icon stepper-icon-left"></div>
                            </button>
                            <input
                              type="number"
                              className="stepper-input"
                              value={apiUsage?.concurrentAccess}
                              required
                            />

                            <button
                              className="stepper-button increment-button"
                              aria-label="증가"
                            >
                              <div className="stepper-icon stepper-icon-right"></div>
                            </button>
                          </div>
                        </div>
                        <span className="text-xs font-normal">
                          동시 접속 수는 동시에 API를 사용할 수 있는 사용자(또는
                          장치)의 수를 의미합니다. 동시 접속 수가 초과되면 추가
                          요청은 대기 상태가 되거나 거부될 수 있으므로, 예상되는
                          사용량을 고려하여 적절히 설정해 주세요.
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <label className="label-m" htmlFor="text">
                        API Key
                      </label>
                      <div className="textfield flex flex-row">
                        <input
                          className="textfield-placeholder"
                          type="text"
                          value={apiUsage?.apiKey}
                          readOnly
                        />
                        <button className="btn btn-neutral btn-outline btn-icon-m">
                          <img
                            src="../img/icon/document-duplicate-outline.svg"
                            alt=""
                          />
                        </button>
                        <button
                          className="btn btn-m btn-neutral btn-outline"
                          onClick={() =>
                            window.openModal?.("modal-api-reissue")
                          }
                        >
                          재발급
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <label className="label-m" htmlFor="text">
                        결제정보
                      </label>
                      <div className="flex w-full flex-col">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>월 요금</th>
                              <th>사용 시작일</th>
                              <th>다음 결제일</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="td-money">
                                {apiUsage?.price?.toLocaleString() || 0}
                              </td>
                              <td>
                                {apiUsage?.createdAt
                                  ? formatDate(apiUsage.createdAt)
                                  : "-"}
                              </td>
                              <td>
                                {apiUsage?.createdAt
                                  ? add30Days(apiUsage.createdAt)
                                  : "-"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="btn-container">
                      <button
                        className="btn btn-l btn-neutral btn-soft w-[120px]"
                        onClick={() => window.openModal?.("modal-unsubscribe")}
                      >
                        구독 취소
                      </button>
                      <button
                        className="btn btn-l btn-wide btn-primary"
                        onClick={() =>
                          window.openModal?.("modal-change-payinfo")
                        }
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section fill-gray-subtler">
                <div className="section-header">
                  <span>관리자</span>
                </div>
                <div className="section-body">
                  <div className="form-container">
                    <div className="flex flex-row gap-4">
                      <div className="label-m">중간관리자</div>
                      <div className="flex w-full flex-col gap-2">
                        <div className="listprofile-container">
                          <div className="profile-container">
                            <div className="profile">
                              <img src="../img/icon/user-outline.svg" alt="" />
                            </div>
                            <div className="profile-info">
                              <div className="flex flex-row gap-2">
                                <span>홍길동</span>
                              </div>
                              <div>gildong@gmail.com</div>
                            </div>
                            <div className="profile-btn">
                              <button className="btn btn-s btn-soft btn-neutral">
                                삭제
                              </button>
                            </div>
                          </div>
                          <button
                            className="btn btn-m btn-neutral btn-soft"
                            onClick={() =>
                              window.openModal?.("modal-add-midadmin")
                            }
                          >
                            중간관리자 추가{" "}
                            <img
                              src="../img/icon/plus-circle-solid.svg"
                              alt=""
                            />
                          </button>
                          <span className="text-xs font-normal">
                            (임시) 중간 관리자는 결제를 제외한 모든 권한을
                            가지고 있습니다.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-row gap-4">
                      <div className="label-m">파트너사</div>
                      <div className="flex w-full flex-col gap-2">
                        <div className="search-container">
                          <div className="textfield flex flex-row">
                            <input
                              className="textfield-placeholder"
                              type="text"
                              placeholder="파트너사를 입력해주세요."
                              readOnly
                            />
                            <button className="btn btn-primary btn-m search-btn">
                              검색
                            </button>
                          </div>
                          <div className="search-results">
                            <ul className="search-results-list">
                              {/* 검색 결과가 여기에 동적으로 추가됩니다 */}
                            </ul>
                          </div>
                        </div>
                        <span className="text-xs font-normal">
                          • 사전 협의된 파트너사만 추가할 수 있습니다.
                          <br />
                          • 협의되지 않은 파트너사를 추가할 경우, 설정이 취소될
                          수 있습니다.
                          <br />• 파트너사 설정을 통해 관리 권한을 위임하므로,
                          신뢰할 수 있는 업체인지 꼭 확인해 주세요.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalManager />
    </main>
  );
}
