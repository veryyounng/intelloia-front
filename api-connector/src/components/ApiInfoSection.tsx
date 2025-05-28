
export default function ApiInfoSection() {
  return (
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
            <span>의료 STT</span>
          </div>
          <div className="section-body flex-col">
            <div className="form-container">
              <div className="flex flex-row gap-4">
                <label className="label-m" htmlFor="usage">
                  사용처
                </label>
                <div className="textfield flex flex-row">
                  <input
                    id="usage"
                    className="textfield-placeholder"
                    type="text"
                    placeholder="사용처를 입력해주세요."
                    defaultValue="양지병원 입원병동"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row items-start gap-4">
                <label className="label-m" htmlFor="concurrency">
                  동시 접속 수
                </label>
                <div className="flex flex-col gap-2">
                  <div className="stepper-container">
                    <div className="stepper">
                      <button
                        className="stepper-button decrement-button"
                        aria-label="Decrease value"
                      >
                        <div className="stepper-icon stepper-icon-left"></div>
                      </button>
                      <input
                        type="number"
                        className="stepper-input"
                        id="concurrency"
                        defaultValue={1}
                        required
                      />
                      <button
                        className="stepper-button increment-button"
                        aria-label="Increase value"
                      >
                        <div className="stepper-icon stepper-icon-right"></div>
                      </button>
                    </div>
                  </div>
                  <span className="text-xs font-normal">
                    동시 접속 수는 동시에 API를 사용할 수 있는 사용자(또는
                    장치)의 수를 의미합니다. 동시 접속 수가 초과되면 추가 요청은
                    대기 상태가 되거나 거부될 수 있으므로, 예상되는 사용량을
                    고려하여 적절히 설정해 주세요.
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <label className="label-m" htmlFor="apiKey">
                  API Key
                </label>
                <div className="textfield flex flex-row">
                  <input
                    className="textfield-placeholder"
                    type="text"
                    id="apiKey"
                    value="abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678"
                    readOnly
                  />
                  <a href="" className="btn btn-neutral btn-outline btn-icon-m">
                    <img
                      src="../img/icon/document-duplicate-outline.svg"
                      alt="copy"
                    />
                  </a>
                  <button
                    className="btn btn-m btn-neutral btn-outline"
                    onClick={() =>
                      (
                        document.getElementById(
                          "modal-api-reissue",
                        ) as HTMLDialogElement
                      )?.showModal()
                    }
                  >
                    재발급
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
