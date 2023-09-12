import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { FaLocationArrow, FaSearch } from "react-icons/fa";
import { GoX } from "react-icons/go";

let suggestRegionList = [
  { name: "서울 서대문구", tag: "자주 방문한" },
  { name: "서울 마포구", tag: "함께 추천하는" },
  { name: "서울 강남구", tag: "함께 추천하는" },
  { name: "가평군", tag: "함께 추천하는" },
  { name: "성남시", tag: "함께 추천하는" },
  { name: "인천 강화도", tag: "함께 추천하는" },
  { name: "대구 중구", tag: "함께 추천하는" },
  { name: "태안군", tag: "자주 검색한" },
  { name: "목포시", tag: "자주 검색한" },
  { name: "여수시", tag: "자주 검색한" },
];

let popularRegionList = [
  { name: "제주도", image: "" },
  { name: "경주시", image: "" },
  { name: "전주시", image: "" },
  { name: "서울 마포구", image: "" },
  { name: "서울 종로구", image: "" },
  { name: "부산 해운대구", image: "" },
  { name: "강릉시", image: "" },
  { name: "수원시", image: "" },
  { name: "순천시", image: "" },
  { name: "포항시", image: "" },
  { name: "거제시", image: "" },
  { name: "천안시", image: "" },
  { name: "청주시", image: "" },
  { name: "서울 강남구", image: "" },
  { name: "속초시", image: "" },
  { name: "여수시", image: "" },
  { name: "남양주시", image: "" },
  { name: "파주시", image: "" },
  { name: "성남시", image: "" },
  { name: "부산 수영구", image: "" },
  { name: "서울 광진구", image: "" },
  { name: "군산시", image: "" },
];

/* -------------------------------------------------------------------------- */

// 검색바
function SearchRegion() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-black px-4 py-2 focus:outline-none">
      <label htmlFor="searchRegion">
        <FaSearch />
      </label>
      <input
        type="search"
        id="searchRegion"
        placeholder="원하는 지역을 검색해 보세요"
        className="grow text-base focus:outline-none"
      />
      <GoX className="text-xl" />
    </div>
  );
}

function RegionSelectedList() {
  return (
    <div>
      <h3 className="text-lg font-bold">
        내 관심지역 <span className="text-primary">3</span>
      </h3>
      <div className="flex">
        <p className="grow text-sm font-medium text-gray-400">길게 눌러 순서를 변경할 수 있습니다.</p>
        <button type="button" className="text-sm font-semibold text-gray-700">
          전체 삭제
        </button>
      </div>

      {/* 선택할 때마다 추가되어야 함 */}
      <div className="flex items-center justify-between rounded-lg border border-primary px-4 py-2">
        <FaLocationArrow className="mr-2 inline-block text-primary" />
        <p className="grow text-base font-bold">강남역</p>
        <GoX className="text-xl" />
      </div>
    </div>
  );
}

function SuggestRegionList() {
  let [checkedList, setCheckedList] = useState([]);

  const handleCheckList = (e) => {
    // ! useRef 사용해보려 했으나 안됨... 마지막 요소가 선택됨
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    setCheckedList(
      !checkedList.find((i) => i === regionName)
        ? [...checkedList, regionName]
        : checkedList.filter((i) => i !== regionName)
    );
  };

  useEffect(() => {
    console.log(checkedList);
  });

  return (
    <div>
      <h3 className="font-bold">이런 지역 어때요?</h3>
      <p className="my-2 text-sm">
        <span className="font-bold">ㅇㅇ</span>님이 좋아하실 것 같아요
      </p>
      <ul className="grid grid-cols-2 gap-3">
        {suggestRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${!checkedList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100"}`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"suggest " + region.name} className="block p-4">
              <p className={`text-xs font-semibold text-gray-500`}>{region.tag}</p>
              <h4 className={`font-bold`}>{region.name}</h4>
              <span
                className={`absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${
                  !checkedList.includes(region.name) ? "bg-check" : "bg-checked"
                }`}
              ></span>
              <input type="checkbox" className="sr-only" id={"suggest " + region.name} onChange={handleCheckList} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PopularRegionList() {
  let [checkedList, setCheckedList] = useState([]);

  const handleCheckList = (e) => {
    // ! useRef 사용해보려 했으나 안됨... 마지막 요소가 선택됨
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    setCheckedList(
      !checkedList.find((i) => i === regionName)
        ? [...checkedList, regionName]
        : checkedList.filter((i) => i !== regionName)
    );
  };

  useEffect(() => {
    console.log(checkedList);
  });

  return (
    <div>
      <h3 className="font-bold">요즘 많이 찾아봐요</h3>
      <ul className="grid grid-cols-3 gap-3">
        {popularRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${!checkedList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100"}`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"popular " + region.name} className="block flex flex-col items-center p-4">
              {/* 사진 div */}
              <img src="" alt="" className="h-12 w-12" />
              <h4 className="mx-auto text-sm font-bold">{region.name}</h4>
              <span
                className={`absolute right-2 top-0 h-[18px] w-[18px] translate-y-1/2 ${
                  !checkedList.includes(region.name) ? "bg-check" : "bg-checked"
                }`}
              ></span>
              <input type="checkbox" className="sr-only" id={"popular " + region.name} onChange={handleCheckList} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Region() {
  return (
    <div className="max-w-3xl">
      <div className="sticky top-0 z-10 bg-white">
        {/* 창 닫기 */}
        <button type="button" className="float-right">
          <GoX className="text-3xl" />
        </button>
        {/* 제목 */}
        <h2 className="mb-3 text-2xl font-bold">관심지역을 설정해주세요!</h2>
        <SearchRegion />
        <div className="h-4 bg-gradient-to-b from-white to-transparent"></div>
      </div>
      <div className="flex flex-col gap-8">
        {/* 검색바 */}
        {/* 내 관심지역 */}
        <RegionSelectedList />
        {/* '이런 지역 어때요' 리스트 */}
        <SuggestRegionList />
        {/* '요즘 많이 찾아봐요' 리스트 */}
        <PopularRegionList />
      </div>
    </div>
  );
}

export default Region;
