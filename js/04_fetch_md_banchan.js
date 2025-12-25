//MD 추천 + 탭
// 1 DOMContentLoaded 반드시 필요
document.addEventListener("DOMContentLoaded", () => {
  // ============================
  //   카드 하나 만드는 함수
  // ============================
  function createMdCard(item) {
    const a = document.createElement("a");
    a.href = "#";
    a.className = "no-underline";

    const card = document.createElement("div");
    card.className = "md-card";

    card.innerHTML = `
      <img src="${item.main_img}" alt="${item.name}" class="card-img">
      <h4 class="card-title">${item.name}</h4>
      <p class="card-desc">${item.description}</p>
      <h5 class="card-price">${item.price}원</h5>
    `;

    a.appendChild(card);
    return a;
  }

  // ============================
  //   선택된 카테고리 렌더링
  // ============================
  function renderCategory(data, category, section) {
    // 기존 카드 제거
    section
      .querySelectorAll(".md-card")
      .forEach((card) => card.parentElement.remove());

    // 새 카드 추가
    data
      .filter((item) => item.category === category)
      .forEach((item) => section.appendChild(createMdCard(item)));
  }

  // ============================
  //   탭 활성화 처리
  // ============================
  function setActive(liList, activeLi) {
    liList.forEach((li) => {
      // li 스타일
      li.classList.remove("tab-active");
      li.classList.add("tab-item");

      // a 스타일
      const link = li.querySelector("a");
      if (link) {
        link.classList.remove("tab-link-active");
        link.classList.add("tab-link");
      }
    });

    // 선택된 li
    activeLi.classList.remove("tab-item");
    activeLi.classList.add("tab-active");

    const activeLink = activeLi.querySelector("a");
    if (activeLink) {
      activeLink.classList.add("tab-link-active");
      activeLink.classList.remove("tab-link");
    }
  }

  // ============================
  //      JSON 로딩 + 이벤트
  // ============================
  fetch("https://dino-21.github.io/zipbanchan/json/04_mdbanchan.json")
    .then((res) => res.json())
    .then((data) => {
      const mdSection = document.querySelector(".md-banchan");
      const liList = mdSection.querySelectorAll(".tab-list li");

      const categories = [
        "bibim",
        "soup",
        "kid",
        "bokkeum",
        "muchim",
        "main",
        "jorim",
      ];

      // ★ 초기 화면: 첫 번째 탭 + 비빔밥
      setActive(liList, liList[0]);
      renderCategory(data, categories[0], mdSection);

      // 탭에 마우스 올렸을 때
      liList.forEach((li, index) => {
        li.addEventListener("mouseover", (e) => {
          e.preventDefault(); // a 이동 막기
          setActive(liList, li); // 탭 색 변경
          renderCategory(data, categories[index], mdSection); // 카드 교체
        });
      });
    })
    .catch((err) => console.error("MD 추천반찬 JSON 로딩 오류:", err));
});
