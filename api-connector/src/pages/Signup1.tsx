import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 버튼 마우스 이펙트
    const buttons = document.querySelectorAll(".btn-white, .btn-gradient");
    buttons.forEach((btn) => {
      const button = btn as HTMLElement;
      button.addEventListener("mousemove", (e) => {
        const event = e as MouseEvent;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        button.style.setProperty("--mask-x", `${x}px`);
        button.style.setProperty("--mask-y", `${y}px`);
      });

      button.addEventListener("mouseleave", () => {
        button.style.setProperty("--mask-x", "50%");
        button.style.setProperty("--mask-y", "50%");
      });
    });

    // 전체 동의 체크박스
    const allCheckbox = document.getElementById(
      "terms-all",
    ) as HTMLInputElement;
    const checkboxes = document.querySelectorAll(
      '.checkbox-wrapper input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;

    if (allCheckbox) {
      allCheckbox.addEventListener("change", () => {
        checkboxes.forEach((checkbox) => {
          if (checkbox !== allCheckbox) {
            checkbox.checked = allCheckbox.checked;
          }
        });
      });
    }

    checkboxes.forEach((checkbox) => {
      if (checkbox !== allCheckbox) {
        checkbox.addEventListener("change", () => {
          const allChecked = Array.from(checkboxes)
            .filter((c) => c !== allCheckbox)
            .every((c) => c.checked);
          if (allCheckbox) allCheckbox.checked = allChecked;
        });
      }
    });

    const checkboxWrappers = document.querySelectorAll(".checkbox-wrapper");
    checkboxWrappers.forEach((wrapper) => {
      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });

    // collapse toggle
    const toggleButtons = document.querySelectorAll(".collapse-toggle");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const collapse = button.closest(".collapse");
        const content = collapse?.querySelector(".collapse-content");
        button.classList.toggle("open");
        content?.classList.toggle("open");
      });
    });

    // 다음 버튼 제어
    const nextButton = document.querySelector(".btn-primary") as HTMLElement;
    if (!nextButton) return;

    nextButton.setAttribute("aria-disabled", "true");
    nextButton.classList.add("btn-disabled");

    const requiredInputs = document.querySelectorAll("input[required]");

    function checkAllRequired() {
      const allValid = Array.from(requiredInputs).every((input) => {
        const el = input as HTMLInputElement;
        return el.type === "checkbox" ? el.checked : el.value.trim() !== "";
      });

      if (allValid) {
        nextButton.setAttribute("aria-disabled", "false");
        nextButton.classList.remove("btn-disabled");
      } else {
        nextButton.setAttribute("aria-disabled", "true");
        nextButton.classList.add("btn-disabled");
      }
    }

    requiredInputs.forEach((input) => {
      const el = input as HTMLInputElement;
      el.addEventListener("change", checkAllRequired);
      el.addEventListener("input", checkAllRequired);
    });

    allCheckbox?.addEventListener("change", () => {
      const checkboxes = document.querySelectorAll(
        'input[type="checkbox"][required]',
      );
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = allCheckbox.checked;
      });
      checkAllRequired();
    });

    // 버튼 클릭 시 페이지 이동
    nextButton.addEventListener("click", (e) => {
      const isDisabled = nextButton.getAttribute("aria-disabled") === "true";
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      navigate("/signup2");
    });

    checkAllRequired();
  }, [navigate]);

  return (
    <main className="background-gray-subtler flex h-dvh min-w-2xl flex-col items-center justify-center p-20">
      <div className="progressbar-container max-w-160 min-w-96">
        <div className="progressbar progressbar-inprogress">
          <div className="progressbar-indicator"></div>
          <span className="progressbar-text">약관동의</span>
        </div>
        <div className="progressbar progressbar-notyet">
          <div className="progressbar-indicator"></div>
          <span className="progressbar-text">정보입력</span>
        </div>
        <div className="progressbar progressbar-notyet">
          <div className="progressbar-indicator"></div>
          <span className="progressbar-text">가입완료</span>
        </div>
      </div>

      <div className="signup background-white box-shadow relative flex h-[638px] w-1/2 max-w-160 min-w-96 flex-col gap-12 rounded-xl p-10">
        <div className="text-container foreground-gray-default text-center">
          <span className="foreground-gray-strong text-2xl font-bold">
            회원가입
          </span>
        </div>

        <div className="form flex h-full w-full flex-col overflow-hidden">
          <div className="form-content flex h-full w-full flex-col">
            <div className="form-content flex h-full flex-col gap-1">
              <div className="checkbox-container">
                <input type="checkbox" id="terms-all" required />
                <label htmlFor="terms-all">전체 약관에 동의합니다.</label>
              </div>
              <div className="collapse">
                <div className="collapse-title">
                  <div className="checkbox-container">
                    <input type="checkbox" id="terms-age" required />
                    <label htmlFor="terms-age">[필수] 만 14세 이상 확인</label>
                  </div>
                  <button
                    type="button"
                    className="collapse-toggle"
                    aria-label="내용 펼치기"
                  >
                    <img
                      src="/img/icon/chevron-down-outline.svg"
                      alt="내용 펼치기"
                    />
                  </button>
                </div>
                <div className="collapse-content">
                  만 14세 이상 여부를 확인해야 서비스 가입이 가능합니다.
                </div>
              </div>
              <div className="collapse">
                <div className="collapse-title">
                  <div className="checkbox-container">
                    <input type="checkbox" id="terms-service" required />
                    <label htmlFor="terms-service">
                      [필수] 서비스 이용약관 동의
                    </label>
                  </div>
                  <button
                    type="button"
                    className="collapse-toggle"
                    aria-label="내용 펼치기"
                  >
                    <img
                      src="/img/icon/chevron-down-outline.svg"
                      alt="내용 펼치기"
                    />
                  </button>
                </div>
                <div className="collapse-content">
                  제 1조 (목적) 본 약관은 Lorem Ipsum 서비스(이하 "서비스")의
                  이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을
                  규정함을 목적으로 합니다.
                  <br />
                  제 2조 (용어의 정의) 1. "회사"라 함은 Lorem Ipsum 서비스를
                  제공하는 주체를 의미합니다. 2. "이용자"라 함은 본 서비스에
                  접속하여 본 약관에 따라 서비스를 이용하는 자를 의미합니다. 3.
                  "계정"이라 함은 이용자가 서비스를 이용하기 위해 설정한 고유의
                  아이디와 비밀번호를 의미합니다.
                  <br />
                  제 3조 (약관의 효력 및 변경) 1. 본 약관은 이용자가 서비스에
                  가입 시 동의함으로써 효력이 발생합니다. 2. 회사는 필요 시 관련
                  법령을 위반하지 않는 범위 내에서 본 약관을 변경할 수 있으며,
                  변경된 약관은 공지사항을 통해 사전 고지됩니다.
                  <br />
                  제 4조 (서비스의 제공 및 변경) 1. 회사는 이용자에게 다음과
                  같은 서비스를 제공합니다. - 컨텐츠 제공 서비스 - 기타 회사가
                  정하는 서비스 2. 회사는 서비스의 일부 또는 전부를 변경할 수
                  있으며, 이에 대한 사항을 사전에 공지합니다.
                  <br />
                  **제 5조 (서비스 이용 제한)** 1. 이용자가 다음 각 호에
                  해당하는 경우 회사는 서비스 이용을 제한할 수 있습니다. -
                  타인의 정보를 도용하는 경우 - 서비스 운영을 방해하는 경우 -
                  기타 회사가 정한 이용 규칙을 위반한 경우 2. 회사는 필요 시
                  이용자의 서비스 이용을 일시적 또는 영구적으로 제한할 수
                  있습니다.
                  <br />
                  **제 6조 (면책 조항)** 1. 회사는 천재지변, 기술적 결함 등
                  불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지
                  않습니다. 2. 이용자가 서비스 이용 중 발생한 손해에 대해 회사는
                  고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다. **제 7조
                  (준거법 및 관할법원)** 본 약관은 대한민국 법률에 따라
                  해석되며, 서비스 이용과 관련한 분쟁은 회사의 본사 소재지를
                  관할하는 법원에서 해결합니다. 부칙. 본 약관은 2025년 3월
                  7일부터 시행됩니다.
                  <br />
                  제 1조 (목적) 본 약관은 Lorem Ipsum 서비스(이하 "서비스")의
                  이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을
                  규정함을 목적으로 합니다.
                  <br />
                  제 2조 (용어의 정의) 1. "회사"라 함은 Lorem Ipsum 서비스를
                  제공하는 주체를 의미합니다. 2. "이용자"라 함은 본 서비스에
                  접속하여 본 약관에 따라 서비스를 이용하는 자를 의미합니다. 3.
                  "계정"이라 함은 이용자가 서비스를 이용하기 위해 설정한 고유의
                  아이디와 비밀번호를 의미합니다.
                  <br />
                  제 3조 (약관의 효력 및 변경) 1. 본 약관은 이용자가 서비스에
                  가입 시 동의함으로써 효력이 발생합니다. 2. 회사는 필요 시 관련
                  법령을 위반하지 않는 범위 내에서 본 약관을 변경할 수 있으며,
                  변경된 약관은 공지사항을 통해 사전 고지됩니다.
                  <br />
                  제 4조 (서비스의 제공 및 변경) 1. 회사는 이용자에게 다음과
                  같은 서비스를 제공합니다. - 컨텐츠 제공 서비스 - 기타 회사가
                  정하는 서비스 2. 회사는 서비스의 일부 또는 전부를 변경할 수
                  있으며, 이에 대한 사항을 사전에 공지합니다.
                  <br />
                  **제 5조 (서비스 이용 제한)** 1. 이용자가 다음 각 호에
                  해당하는 경우 회사는 서비스 이용을 제한할 수 있습니다. -
                  타인의 정보를 도용하는 경우 - 서비스 운영을 방해하는 경우 -
                  기타 회사가 정한 이용 규칙을 위반한 경우 2. 회사는 필요 시
                  이용자의 서비스 이용을 일시적 또는 영구적으로 제한할 수
                  있습니다.
                  <br />
                  **제 6조 (면책 조항)** 1. 회사는 천재지변, 기술적 결함 등
                  불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지
                  않습니다. 2. 이용자가 서비스 이용 중 발생한 손해에 대해 회사는
                  고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다. **제 7조
                  (준거법 및 관할법원)** 본 약관은 대한민국 법률에 따라
                  해석되며, 서비스 이용과 관련한 분쟁은 회사의 본사 소재지를
                  관할하는 법원에서 해결합니다. 부칙. 본 약관은 2025년 3월
                  7일부터 시행됩니다.
                  <br />
                </div>
              </div>

              <div className="collapse">
                <div className="collapse-title">
                  <div className="checkbox-container">
                    <input type="checkbox" id="terms-privacy" required />
                    <label htmlFor="terms-privacy">
                      [필수] 개인정보 수집 및 이용 동의
                    </label>
                  </div>
                  <button
                    type="button"
                    className="collapse-toggle"
                    aria-label="내용 펼치기"
                  >
                    <img
                      src="/img/icon/chevron-down-outline.svg"
                      alt="내용 펼치기"
                    />
                  </button>
                </div>
                <div className="collapse-content">
                  1. 수집하는 개인정보 항목
                  <br />
                  - 이메일 주소, 비밀번호, 닉네임
                  <br />
                  2. 개인정보의 수집 및 이용목적
                  <br />- 서비스 제공, 계정 관리, 기능 개선
                </div>
              </div>

              <div className="collapse">
                <div className="collapse-content">
                  마케팅 정보 수신에 동의하시면 다음과 같은 혜택 정보를 받으실
                  수 있습니다:
                  <br />
                  - 신규 서비스 소식
                  <br />
                  - 이벤트 및 프로모션 정보
                  <br />- 맞춤형 컨텐츠 추천
                </div>
              </div>
            </div>

            <div className="btn-container sticky bottom-0 w-full">
              <div className="background-white h-6"></div>
              <Link
                className="btn btn-m btn-primary btn-wide btn-disabled"
                to="/signup2"
              >
                다음
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
