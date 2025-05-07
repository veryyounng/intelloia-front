import React from "react";

export default function ModalManager() {
  return (
    <>
      <dialog id="modal-add-midadmin" className="modal">
        <div className="modal-box modal-box-m">
          <button
            className="modal-close btn btn-icon-m btn-ghost"
            onClick={() => window.closeModal?.("modal-add-midadmin")}
          >
            <img src="../img/icon/x-mark-outline.svg" alt="" />
          </button>
          <div className="modal-header">
            <span>관리자 계정 등록</span>
          </div>
          <div className="modal-body flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="label-m" htmlFor="link">
                링크 복사
              </label>
              <div className="textfield flex flex-row">
                <input
                  className="textfield-placeholder"
                  type="url"
                  value="https://intelloia.com/admin/add"
                  readOnly
                />
                <button className="btn btn-neutral btn-outline btn-icon-m">
                  <img
                    src="../img/icon/document-duplicate-outline.svg"
                    alt="복사"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="label-m" htmlFor="email">
                메일로 링크 전송
              </label>
              <div className="textfield flex flex-row">
                <input
                  className="textfield-placeholder"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                />
                <button className="btn btn-neutral btn-outline btn-m">
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="modal-api-reissue" className="modal">
        <div className="modal-box modal-box-s">
          <button
            className="modal-close btn btn-icon-m btn-ghost"
            onClick={() => window.closeModal?.("modal-api-reissue")}
          >
            <img src="../img/icon/x-mark-outline.svg" alt="" />
          </button>
          <div className="modal-header">
            <span>API Key 재발급</span>
          </div>
          <div className="modal-body">
            <p>
              API Key를 재발급하시겠습니까?
              <br />
              재발급시 기존 API Key는 사용할 수 없습니다.
            </p>
          </div>
          <div className="modal-footer">
            <div className="btn-container">
              <button
                className="btn btn-m btn-wide btn-primary btn-soft"
                onClick={() => window.closeModal?.("modal-api-reissue")}
              >
                취소
              </button>
              <button className="btn btn-m btn-wide btn-primary">재발급</button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="modal-unsubscribe" className="modal">
        <div className="modal-box modal-box-s">
          <button
            className="modal-close btn btn-icon-m btn-ghost"
            onClick={() => window.closeModal?.("modal-unsubscribe")}
          >
            <img src="../img/icon/x-mark-outline.svg" alt="" />
          </button>
          <div className="modal-header">
            <span>구독 취소</span>
          </div>
          <div className="modal-body">
            <p>
              구독 취소를 진행하시겠습니까?
              <br />
              현재까지의 플랜만 적용됩니다.
            </p>
          </div>
          <div className="modal-footer">
            <div className="btn-container">
              <button
                className="btn btn-m btn-primary btn-wide btn-soft"
                onClick={() => window.closeModal?.("modal-unsubscribe")}
              >
                구독 유지
              </button>
              <button className="btn btn-m btn-wide btn-primary">
                구독 취소
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="modal-change-payinfo" className="modal">
        <div className="modal-box modal-box-s">
          <button
            className="modal-close btn btn-icon-m btn-ghost"
            onClick={() => window.closeModal?.("modal-change-payinfo")}
          >
            <img src="../img/icon/x-mark-outline.svg" alt="" />
          </button>
          <div className="modal-header">
            <span>구독 정보 변경</span>
          </div>
          <div className="modal-body">
            <p>
              구독 정보를 변경하시겠습니까?
              <br />
              변경 시 추가 결제가 진행됩니다.
            </p>
          </div>
          <div className="modal-footer">
            <div className="btn-container">
              <button
                className="btn btn-m btn-primary btn-wide btn-soft"
                onClick={() => window.closeModal?.("modal-change-payinfo")}
              >
                취소
              </button>
              <button className="btn btn-m btn-wide btn-primary">변경</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
