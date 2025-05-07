// COMPONENT - BUTTON 마우스 이벤트 (LA-01)
document.addEventListener("DOMContentLoaded", () => {
  // 모든 .btn-white 클래스를 가진 버튼을 선택
  const buttons = document.querySelectorAll(".btn-white", ".btn-gradient");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      // 버튼 내에서의 마우스 상대 위치 계산
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // CSS 변수 업데이트
      button.style.setProperty("--mask-x", `${x}px`);
      button.style.setProperty("--mask-y", `${y}px`);
    });

    // 버튼에서 마우스가 벗어날 때 기본 위치로 리셋
    button.addEventListener("mouseleave", () => {
      button.style.setProperty("--mask-x", "50%");
      button.style.setProperty("--mask-y", "50%");
    });
  });
});

// COMPONENT - CHECKBOX - 전체 동의 (SI-01)
document.addEventListener("DOMContentLoaded", function () {
  const allCheckbox = document.getElementById("terms-all");
  const checkboxes = document.querySelectorAll(
    '.checkbox-container input[type="checkbox"]',
  );

  if (allCheckbox) {
    allCheckbox.addEventListener("change", (e) => {
      checkboxes.forEach((checkbox) => {
        if (checkbox !== allCheckbox) {
          checkbox.checked = allCheckbox.checked;
        }
      });
    });
  }

  // 개별 체크박스 변경 시 전체 동의 체크박스 상태 업데이트
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

  // 체크박스 클릭 시 토글되지 않도록
  const checkboxWrappers = document.querySelectorAll(".checkbox-container");
  checkboxWrappers.forEach((container) => {
    container.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // 모든 토글 버튼에 이벤트 리스너 추가
  const toggleButtons = document.querySelectorAll(".collapse-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // 현재 collapse 요소 찾기
      const collapse = this.closest(".collapse");
      const content = collapse.querySelector(".collapse-content");

      // 클래스 토글만으로 처리
      this.classList.toggle("open");
      content.classList.toggle("open");

      // 로그 출력
      // console.log("Toggled:", content.classList.contains("open"));
    });
  });
});

// COMPONENT - BUTTON - 버튼 비활성화 (AP-01-01)
document.addEventListener("DOMContentLoaded", function () {
  // 버튼 찾기
  const nextButton = document.querySelector(".btn-primary");
  if (!nextButton) return;

  // 초기 버튼 상태 설정
  nextButton.disabled = true;

  // 필수 입력 요소들 찾기
  const requiredInputs = document.querySelectorAll("input[required]");

  // 모든 필수 입력 확인
  function checkAllRequired() {
    const allValid = Array.from(requiredInputs).every((input) => {
      if (input.type === "checkbox") {
        return input.checked;
      } else {
        return input.value.trim() !== "";
      }
    });

    // 버튼 상태 업데이트
    if (allValid) {
      nextButton.disabled = false;
      nextButton.classList.remove("btn-disabled");
    } else {
      nextButton.disabled = true;
      nextButton.classList.add("btn-disabled");
    }
  }

  // 모든 필수 입력 요소에 이벤트 리스너 추가
  requiredInputs.forEach((input) => {
    if (input.type === "checkbox") {
      input.addEventListener("change", checkAllRequired);
    } else {
      input.addEventListener("input", checkAllRequired);
    }
  });

  // 전체 동의 체크박스 처리
  const allCheckbox = document.getElementById("terms-all");
  if (allCheckbox) {
    allCheckbox.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(
        'input[type="checkbox"][required]',
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = allCheckbox.checked;
      });
      checkAllRequired();
    });
  }

  // 초기 상태 확인
  checkAllRequired();
});

// COMPONENT - STEPPER
document.addEventListener("DOMContentLoaded", function () {
  // 설정 옵션
  const config = {
    initialValue: 1,
    min: 1,
    max: 100,
    step: 1,
    label: "값",
  };

  // DOM 엘리먼트
  const decrementButton = document.getElementById("decrement-button");
  const incrementButton = document.getElementById("increment-button");
  const inputField = document.getElementById("stepper-input");
  const labelElement = document.getElementById("stepper-label");
  const stepperInputValues = document.querySelectorAll(".stepper-input-value");
  const stepperResult = document.querySelector(".stepper-result");

  // 초기값 설정
  inputField.value = config.initialValue;
  inputField.min = config.min;
  inputField.max = config.max;
  inputField.step = config.step;

  // 초기 UI 업데이트
  updateUI();

  // 버튼 상태 초기화
  updateButtonStates();

  // 이벤트 리스너
  decrementButton.addEventListener("click", decrement);
  incrementButton.addEventListener("click", increment);
  inputField.addEventListener("change", handleInputChange);
  inputField.addEventListener("keydown", handleKeyDown);

  function updateUI() {
    const currentValue = parseFloat(inputField.value);
    stepperInputValues.forEach((value) => {
      value.textContent = currentValue;
    });
    if (stepperResult) {
      stepperResult.textContent = (12000 * currentValue).toLocaleString(
        "ko-KR",
      );
    }
  }

  function increment() {
    const currentValue = parseFloat(inputField.value);
    const newValue = Math.min(currentValue + config.step, config.max);
    inputField.value = newValue;
    updateButtonStates();
    updateUI();
  }

  function decrement() {
    const currentValue = parseFloat(inputField.value);
    const newValue = Math.max(currentValue - config.step, config.min);
    inputField.value = newValue;
    updateButtonStates();
    updateUI();
  }

  function handleInputChange() {
    let value = parseFloat(inputField.value);

    // 빈 값 체크
    if (isNaN(value)) {
      value = config.min;
    }

    // 범위 제한
    value = Math.max(config.min, Math.min(value, config.max));

    // 입력 필드 업데이트
    inputField.value = value;

    // 버튼 상태 업데이트
    updateButtonStates();
    updateUI();
  }

  function handleKeyDown(event) {
    // 위쪽 화살표는 증가
    if (event.key === "ArrowUp") {
      event.preventDefault();
      increment();
    }
    // 아래쪽 화살표는 감소
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      decrement();
    }
  }

  function updateButtonStates() {
    const currentValue = parseFloat(inputField.value);
    decrementButton.disabled = currentValue <= config.min;
    incrementButton.disabled = currentValue >= config.max;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // This will open the modal as soon as the page loads
  document.getElementById("my_modal_3").showModal();
});

// COMPONENT - MODAL
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 모달 요소들
  const modals = document.querySelectorAll(".modal");

  // 모달 외부 클릭 시 닫기
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      const modalDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < modalDimensions.left ||
        e.clientX > modalDimensions.right ||
        e.clientY < modalDimensions.top ||
        e.clientY > modalDimensions.bottom
      ) {
        modal.close();
      }
    });
  });

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.hasAttribute("open")) {
          modal.close();
        }
      });
    }
  });

  // 숫자 입력 필드 설정
  const numberInputs = document.querySelectorAll(
    '.textfield-placeholder[type="number"]',
  );
  numberInputs.forEach((input) => {
    // 숫자만 입력 가능하도록 설정
    input.addEventListener("input[type=number]", (e) => {
      let value = e.target.value.replace(/[^0-9]/g, "");

      // 앞자리 0 제거
      value = value.replace(/^0+/, "");

      // 값이 비어있으면 0으로 설정
      if (value === "") {
        value = "0";
      }

      // 1,000,000 초과 방지
      if (parseInt(value) > 1000000) {
        value = "1000000";
      }

      // 천 단위 콤마 추가
      e.target.value = Number(value).toLocaleString("ko-KR");
    });

    // 포커스 시 콤마 제거
    input.addEventListener("focus", (e) => {
      e.target.value = e.target.value.replace(/,/g, "");
    });

    // 포커스 아웃 시 콤마 추가
    input.addEventListener("blur", (e) => {
      if (e.target.value) {
        e.target.value = Number(e.target.value).toLocaleString("ko-KR");
      }
    });
  });
});

// 포인트 계산 로직
document.addEventListener("DOMContentLoaded", function () {
  const avlPt = document.querySelector(".avl-pt");
  const usedPt = document.querySelector(".used-pt");
  const rmnPt = document.querySelector(".rmn-pt");

  if (avlPt && usedPt && rmnPt) {
    function calculateRemainingPoints() {
      const available = parseInt(avlPt.textContent.replace(/,/g, ""));
      const used = parseInt(usedPt.textContent.replace(/,/g, ""));
      const remaining = available - used;

      // 음수 값도 표현되도록 수정
      rmnPt.textContent = remaining.toLocaleString("ko-KR");
    }

    // 초기 계산
    calculateRemainingPoints();

    // 포인트 값이 변경될 때마다 재계산
    const observer = new MutationObserver(calculateRemainingPoints);
    observer.observe(avlPt, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    observer.observe(usedPt, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
});

// COMPONENT - SEARCH - 검색 (AP-03-01 파트너사 검색)
document.addEventListener("DOMContentLoaded", function () {
  const searchContainer = document.querySelector(".search-container");
  const searchInput = searchContainer.querySelector(".textfield-placeholder");
  const searchBtn = searchContainer.querySelector(".search-btn");
  const searchResults = searchContainer.querySelector(".search-results");
  const searchResultsList = searchContainer.querySelector(
    ".search-results-list",
  );
  const listprofileContainer = document.querySelector(".listprofile-container");

  // 검색 모달 생성
  const searchModal = document.createElement("dialog");
  searchModal.className = "modal";
  searchModal.innerHTML = `
    <div class="modal-box modal-box-m">
      <a href="#" class="modal-close btn btn-icon-m btn-ghost">
        <img src="/img/icon/x-mark-outline.svg" alt="close" />
      </a>
      <div class="modal-header">
        <span>파트너사 검색</span>
      </div>
      <div class="modal-body flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <div class="textfield flex flex-row">
            <input type="text" class="textfield-placeholder" placeholder="파트너사를 입력해주세요." />
            <a class="btn btn-primary btn-m search-btn">검색</a>
          </div>
        </div>
        <div class="search-modal-results">
          <ul class="search-results-list">
            <!-- 검색 결과가 여기에 동적으로 추가됩니다 -->
          </ul>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(searchModal);

  const modalInput = searchModal.querySelector(".textfield-placeholder");
  const modalCloseBtn = searchModal.querySelector(".modal-close");
  const modalResultsList = searchModal.querySelector(".search-results-list");
  const modalSearchBtn = searchModal.querySelector(".search-btn");

  // 임시 검색 데이터
  const partners = [
    { name: "의료기기 A사", email: "partnerA@example.com" },
    { name: "의료기기 B사", email: "partnerB@example.com" },
    { name: "의료기기 C사", email: "partnerC@example.com" },
    { name: "의료기기 D사", email: "partnerD@example.com" },
  ];

  // 검색 버튼 클릭 시 모달 열기
  searchBtn.addEventListener("click", () => {
    searchModal.showModal();
    modalInput.focus();
  });

  // 모달 닫기 버튼 클릭
  modalCloseBtn.addEventListener("click", () => {
    searchModal.close();
  });

  // 모달 외부 클릭 시 닫기
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.close();
    }
  });

  // 모달에서 검색어 입력 시
  modalInput.addEventListener("input", function (e) {
    // 실시간 검색 제거
  });

  // Enter 키 입력 시 검색 실행
  modalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const searchTerm = e.target.value.toLowerCase();
      updateModalSearchResults(searchTerm);
    }
  });

  // 검색 결과 업데이트 함수
  function updateModalSearchResults(searchTerm) {
    modalResultsList.innerHTML = "";

    if (searchTerm.length > 0) {
      const filteredPartners = partners.filter((partner) =>
        partner.name.toLowerCase().includes(searchTerm),
      );

      if (filteredPartners.length > 0) {
        filteredPartners.forEach((partner) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="partner-info">
              <span class="text-sm justify-normal">${partner.name}</span>
            </div>
            <button class="btn btn-neutral btn-soft btn-s choose-btn">선택</button>
          `;

          // 선택 버튼 클릭 이벤트
          const chooseBtn = li.querySelector(".choose-btn");
          chooseBtn.addEventListener("click", () => {
            // 검색 필드에 선택된 파트너사 표시
            searchInput.value = partner.name;
            // 삭제 버튼 추가
            const searchFieldContainer = searchInput.parentElement;
            const deleteBtn = document.createElement("a");
            deleteBtn.className =
              "btn btn-neutral btn-outline btn-m delete-btn";
            deleteBtn.textContent = "삭제";

            // 기존 버튼이 있다면 제거
            const existingBtn =
              searchFieldContainer.querySelector(".delete-btn");
            if (existingBtn) {
              existingBtn.remove();
            }

            searchFieldContainer.appendChild(deleteBtn);

            // 삭제 버튼 클릭 이벤트
            deleteBtn.addEventListener("click", (e) => {
              e.preventDefault();
              const modal = document.getElementById("modal-partner-del");
              if (modal) {
                modal.showModal();
              }
            });

            // 파트너사 삭제 모달의 삭제 버튼 클릭 이벤트
            const partnerDeleteBtn = document.querySelector(
              "#modal-partner-del .btn-container .btn-primary:last-child",
            );
            if (partnerDeleteBtn) {
              partnerDeleteBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const searchInput = document.querySelector(
                  ".search-container .textfield-placeholder",
                );
                const deleteBtn = document.querySelector(".delete-btn");
                if (searchInput) searchInput.value = "";
                if (deleteBtn) deleteBtn.remove();
                const modal = document.getElementById("modal-partner-del");
                if (modal) {
                  modal.close();
                }
              });
            }

            // 현재 열려있는 모달 닫기
            const openModal = document.querySelector("dialog[open]");
            if (openModal) {
              openModal.close();
            }
            modalInput.value = "";
          });

          modalResultsList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.className = "no-results";
        li.innerHTML =
          '<span class="foreground-gray-default text-sm">검색 결과가 없습니다.</span>';
        li.style.padding = "12px";
        li.style.textAlign = "center";
        modalResultsList.appendChild(li);
      }
    }
  }

  // 모달 닫기 시 초기화
  modalCloseBtn.addEventListener("click", () => {
    searchModal.close();
    modalInput.value = "";
  });

  // 모달 외부 클릭 시 초기화
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.close();
      modalInput.value = "";
    }
  });

  // 입력 필드 외부 클릭 시 결과 목록 닫기
  document.addEventListener("click", function (e) {
    if (!searchContainer.contains(e.target)) {
      searchResults.classList.remove("active");
    }
  });

  // 검색 버튼 클릭 시 검색 실행
  modalSearchBtn.addEventListener("click", () => {
    const searchTerm = modalInput.value.toLowerCase();
    updateModalSearchResults(searchTerm);
  });
});

// 링크 재발급 타이머 (AP-03-01 관리자 계정 등록)
function startLinkTimer(button) {
  // 부모 컨테이너 찾기
  const container = button.closest(".textfield").nextElementSibling;
  const timerElement = container.querySelector(".timer");
  const helpText = container.querySelector(".help-text");

  // 타이머가 이미 실행 중이면 새로 시작하지 않음
  if (timerElement.dataset.timer) {
    return;
  }

  // 도움말 텍스트 숨기고 타이머 보이기
  helpText.classList.remove("invisible");
  timerElement.classList.remove("invisible");

  let timeLeft = 30 * 60; // 30 minutes in seconds

  // 타이머 ID를 dataset에 저장
  timerElement.dataset.timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(parseInt(timerElement.dataset.timer));
      delete timerElement.dataset.timer;
      timerElement.classList.add("invisible");
      helpText.classList.add("invisible");
    }

    timeLeft--;
  }, 1000);
}

function showEmailHelpText(button) {
  // 기본 동작 방지
  event.preventDefault();

  const container = button.closest(".textfield").nextElementSibling;
  const helpText = container.querySelector(".email-help-text");

  // 도움말 텍스트 표시
  helpText.classList.remove("invisible");
}

// 파트너사 삭제 모달 이벤트 처리
document.addEventListener("DOMContentLoaded", function () {
  const partnerDeleteBtn = document.querySelector(
    "#modal-partner-del .btn-container .btn-primary:last-child",
  );
  if (partnerDeleteBtn) {
    partnerDeleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const searchInput = document.querySelector(
        ".search-container .textfield-placeholder",
      );
      const deleteBtn = document.querySelector(".delete-btn");
      if (searchInput) searchInput.value = "";
      if (deleteBtn) deleteBtn.remove();
      closeModal("modal-partner-del");
    });
  }
});

// 중간 관리자 삭제 버튼 이벤트 처리
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".profile-btn .btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const modal = document.getElementById("modal-admin-delete");
      if (modal) {
        modal.showModal();
      }
    });
  });

  // 관리자 삭제 모달의 삭제 버튼 클릭 이벤트
  const adminDeleteBtn = document.querySelector(
    "#modal-admin-delete .btn-container .btn-primary:last-child",
  );
  if (adminDeleteBtn) {
    adminDeleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const profileContainer = document.querySelector(
        ".listprofile-container .profile-container",
      );
      if (profileContainer) {
        profileContainer.remove();
      }
      const modal = document.getElementById("modal-admin-delete");
      if (modal) {
        modal.close();
      }
    });
  }
});
