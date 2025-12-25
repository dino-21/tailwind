//어린이 반찬
// fetch는 비동기라 DOM이 완성된 뒤에 실행되므로 DOMContentLoaded가 필요 없음

//02_kidbanchan.json
const URL = "https://dino-21.github.io/zipbanchan/json/02_kidbanchan.json";

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    // 어린이 반찬 박스
    const box = document.querySelector(".kid-banchan");

    // 기존 카드 삭제 (선택)
    box.querySelectorAll("a").forEach((a) => a.remove());

    data.forEach((item) => {
      // <a>
      const a = document.createElement("a");
      a.href = "#";

      // 카드 박스
      const card = document.createElement("div");
      card.className = "product-card";

      // 이미지
      const img = document.createElement("img");
      img.src = item.main_img;
      img.alt = item.name;
      img.className = "card-img";

      // 제목
      const h4 = document.createElement("h4");
      h4.textContent = item.name;
      h4.className = "card-title";

      // 설명
      const p = document.createElement("p");
      p.textContent = item.description;
      p.className = "card-desc";

      // 가격
      const h5 = document.createElement("h5");
      h5.textContent = item.price + "원";
      h5.className = "card-price";

      // 조립
      card.append(img, h4, p, h5);
      a.appendChild(card);
      box.appendChild(a);
    });
  })
  .catch((err) => console.error("JSON 로딩 오류:", err));
