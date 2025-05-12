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
      <div className="progressbar-container max-w-160 min-w-96"></div>

      <div className="signup background-white relative flex h-[638px] w-1/2 max-w-160 min-w-96 flex-col justify-center gap-12 rounded-xl p-10">
        <div className="text-container foreground-gray-default text-center">
          <span className="foreground-gray-strong text-xl font-bold">
            인텔로이아 계정 하나로<br />
            다양한 서비스를 쉽고 편리하게 이용하세요!
          </span>
          <br />
          <span className="foreground-gray-default text-sm">
            가입 유형에 따라 사용되는 서비스가 다르니 반드시 귀사의 역할에 맞는 가입 유형을 선택해주세요.
          </span>
        </div>

        <div className="form flex w-full flex-col overflow-hidden">
          <div className="form-content flex h-full w-full flex-col">
            <div className="form-content flex h-full flex-col gap-1">
              <div className="card-container flex flex-row gap-4">
                <div className="card-signup cursor-pointer">
                  <div className="card-signup-header">
                    <span className="foreground-gray-strong text-xl font-bold">고객사</span>
                    <span className="foreground-gray-default text-sm">
                      인텔로이아 API/서비스를 <br />연동하거나 <b>직접 이용</b>하는 기업
                    </span>
                  </div>
                  <div className="card-signup-body flex flex-col gap-4">
                    <div className="btn-container sticky bottom-0 w-full">
                      <div className="background-white h-6"></div>
                      <Link className="btn btn-m btn-primary btn-wide" to="/signup2">
                        고객사 회원가입
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-signup cursor-pointer">
                  <div className="card-signup-header">
                    <span className="foreground-gray-strong text-xl font-bold">파트너사</span>
                    <span className="foreground-gray-default text-sm">
                      인텔로이아 API/서비스를 <br />활용할 수 있도록 <b>지원</b>하는 기업
                    </span>
                  </div>
                  <div className="card-signup-body flex flex-col gap-4">
                    <div className="btn-container sticky bottom-0 w-full">
                      <div className="background-white h-6"></div>
                      <Link className="btn btn-m btn-primary btn-wide" to="/signup2">
                        파트너사 회원가입
                      </Link>
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

export default Signup;
