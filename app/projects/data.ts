import { Project } from "../types/project";

export const projectsData: Record<string, Project> = {
  voyagex: {
    id: "voyagex",
    title: "Voyage X",
    date: "2024.07 ~ 2024.08",
    description: "미래 우주 여행에 대한 다양한 정보 및 여행 상품/굿즈 결제",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind",
      "Next.js",
      "REACT QUERY",
      "ZUSTAND",
    ],
    image: "/images/VoyageX.png",
    details: {
      overview:
        "VoyageX는 미래의 우주 여행을 위한 올인원 플랫폼입니다. 사용자들에게 우주 여행 정보를 제공하고, 관련 상품을 구매할 수 있게 해주는 서비스입니다.",
      features: [
        "우주 여행 상품 검색 및 예약",
        "실시간 우주 날씨 정보 제공",
        "우주 여행 관련 굿즈 쇼핑",
        "유저 커뮤니티",
      ],
      github: "https://github.com/hwijinkim22/voyageX.git",
      demo: "https://voyage-x.vercel.app",
      screenshots: [
        {
          image: "/images/voyageX-main.png",
          title: "메인 화면",
          description: `사용자들이 처음 만나게 되는 메인 화면입니다.
            역동적이면서도 우주의 신비로운 분위기를 담아냈습니다.
            총 5개의 섹션으로 이루어져 있으며, 다음 섹션으로 넘어갈 시
            새로운 섹션이 기존의 섹션을 덮는 듯한 스크롤 애니메이션을 적용하였습니다.`,
        },
        {
          image: "/images/voyageX-2section.png",
          title: "행성 선택",
          description: `스크롤을 내릴 시 접할 수 있는 2번째 섹션입니다.
                        좌,우 화살표를 클릭 시 행성이 옆으로 넘어가는 애니메이션을 
                        적용시켰으며, 행성을 클릭 시 여행 상품 페이지로 넘어갑니다.`,
        },
        {
          image: "/images/voyageX-3section.png",
          title: "GOODS SHOP",
          description: `굿즈 아이템을 보여주는 3번째 섹션입니다.
                      상품을 클릭 시, 해당 상품의 상세페이지로 진입합니다.            
          `,
        },
        {
          image: "/images/voyageX-4section.png",
          title: "커뮤니티 게시글",
          description: `커뮤니티 글을 불러오는 4번째 섹션입니다.
                    좋아요 수가 많은 4개의 글을 불러오고, 클릭 시
                    해당 게시글로 이동하게 됩니다.
                   `,
        },
        {
          image: "/images/voyageX-5section.png",
          title: "뉴스",
          description: `뉴스를 불러오는 마지막 섹션입니다.    
                 `,
        },
      ],
    },
  },
};
