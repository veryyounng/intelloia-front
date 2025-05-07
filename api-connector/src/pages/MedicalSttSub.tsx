import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import { postUserApiUsage } from "../services/UserService";
import { useAuthStore } from "../store/authStore";

export function MedicalSttSub() {
  const [connectionCount, setConnectionCount] = useState(1);
  const [usageTarget, setUsageTarget] = useState("");

  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const userId = userInfo?.userId;

  const handleDecrement = () => {
    if (connectionCount > 1) {
      setConnectionCount((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setConnectionCount((prev) => prev + 1);
  };

  const estimatedMonthlyFee = 12000 * connectionCount;

  const handleRegisterApi = async () => {
    const newApiUsage = {
      apiName: "의료 STT",
      apiKey: "abcd-1234-efgh-5678",
      partnerName: "인텔로이드",
      managerCount: 1,
      concurrentAccess: 1,
      price: 12000,
      createdAt: new Date().toISOString(),
      usageTarget: usageTarget,
    };
    if (!userId) throw new Error("userId가 없습니다!");
    try {
      await postUserApiUsage(userId, newApiUsage);
      console.log("API 등록 완료!");
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <main className="main">
      <SidebarMenu />
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
              <div className="section">
                <div className="section-header relative">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost btn-icon-s absolute -left-8"
                  >
                    <img
                      src="/img/icon/chevron-left-outline.svg"
                      alt="뒤로가기"
                    />
                  </button>
                  <span>의료 STT</span>
                </div>
                <div className="section-body flex-col">
                  <div className="form-container">
                    <div className="flex flex-row items-center gap-4">
                      <label className="label-m">사용처</label>
                      <div className="textfield flex flex-row">
                        <input
                          className="textfield-placeholder"
                          type="text"
                          placeholder="사용처를 입력해주세요."
                          value={usageTarget}
                          onChange={(e) => setUsageTarget(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-start gap-4">
                      <label className="label-m">동시 접속 수</label>
                      <div className="flex flex-col gap-2">
                        <div className="stepper-container">
                          <div className="stepper">
                            <button
                              className="stepper-button decrement-button"
                              onClick={handleDecrement}
                            >
                              <div className="stepper-icon stepper-icon-left"></div>
                            </button>
                            <input
                              type="number"
                              className="stepper-input"
                              value={connectionCount}
                              readOnly
                            />
                            <button
                              className="stepper-button increment-button"
                              onClick={handleIncrement}
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
                    <button
                      className="btn btn-l btn-primary"
                      onClick={handleRegisterApi}
                    >
                      2주 무료체험
                    </button>
                  </div>
                </div>
              </div>

              <div className="section fill-gray-subtler">
                <div className="section-header">
                  <span>매월 예상요금</span>
                  <span className="helptext">
                    <img
                      src="/img/icon/information-circle-outline.svg"
                      alt=""
                    />
                    2주 무료체험 후 적용됩니다.
                  </span>
                </div>
                <div className="section-body">
                  <div className="listcard-container">
                    <div className="listcard-item">
                      <div className="label-m">월정액 금액</div>
                      <div className="label-m text-right">
                        <span>12,000</span>
                        <span> 원</span>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="listcard-item">
                      <div className="label-m">동시 접속 수</div>
                      <div className="label-m text-right">
                        <span>{connectionCount}</span>
                        <span> 개</span>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="listcard-item">
                      <div className="label-m"></div>
                      <div className="label-m text-right">
                        <span>12,000</span>
                        <span> x </span>
                        <span>{connectionCount}</span>
                      </div>
                    </div>
                    <div className="listcard-item">
                      <div className="label-m">월정액 금액</div>
                      <div className="label-m text-right">
                        <span className="foreground-gray-strong stepper-result text-3xl">
                          {estimatedMonthlyFee.toLocaleString()}
                        </span>
                        <span className="foreground-gray-default text-lg">
                          {" "}
                          원/월
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
    </main>
  );
}
