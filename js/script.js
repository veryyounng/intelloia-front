// 버튼 마우스 이벤트
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

// 전체 동의 체크박스 기능
document.addEventListener("DOMContentLoaded", function () {
  const allCheckbox = document.getElementById("terms-all");
  const checkboxes = document.querySelectorAll(
    '.checkbox-wrapper input[type="checkbox"]',
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
  const checkboxWrappers = document.querySelectorAll(".checkbox-wrapper");
  checkboxWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", (e) => {
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
      console.log("Toggled:", content.classList.contains("open"));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // 버튼 찾기
  const nextButton = document.querySelector(".btn-primary");
  if (!nextButton) return;

  // 초기 버튼 상태 설정
  nextButton.disabled = true;

  // 필수 입력 요소들 찾기
  const requiredInputs = document.querySelectorAll("input[required]");
  console.log("Required inputs found:", requiredInputs.length); // 디버깅용

  // 모든 필수 입력 확인
  function checkAllRequired() {
    const allValid = Array.from(requiredInputs).every((input) => {
      if (input.type === "checkbox") {
        return input.checked;
      } else {
        return input.value.trim() !== "";
      }
    });

    console.log("All valid:", allValid); // 디버깅용

    // 버튼 상태 업데이트
    if (allValid) {
      nextButton.disabled = false;
      nextButton.classList.remove("btn-disabled");
      console.log("Button enabled"); // 디버깅용
    } else {
      nextButton.disabled = true;
      nextButton.classList.add("btn-disabled");
      console.log("Button disabled"); // 디버깅용
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
