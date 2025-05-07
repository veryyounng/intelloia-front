import React from "react";

export default function AdminSection() {
  return (
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
                    <a href="" className="btn btn-s btn-soft btn-neutral">
                      삭제
                    </a>
                  </div>
                </div>
                <button
                  className="btn btn-m btn-neutral btn-soft"
                  onClick={() =>
                    (
                      document.getElementById(
                        "modal-add-midadmin",
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  중간관리자 추가
                  <img src="../img/icon/plus-circle-solid.svg" alt="" />
                </button>
                <span className="text-xs font-normal">
                  (임시) 중간 관리자는 결제를 제외한 모든 권한을 가지고
                  있습니다.
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-row gap-4">
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
                • 협의되지 않은 파트너사를 추가할 경우, 설정이 취소될 수
                있습니다.
                <br />• 파트너사 설정을 통해 관리 권한을 위임하므로, 신뢰할 수
                있는 업체인지 꼭 확인해 주세요.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
