import { Project } from '../types/project';

export const projectsData: Record<string, Project> = {
  voyagex: {
    id: 'voyagex',
    title: 'Voyage X',
    date: '2024.08 ~ 2024.09',
    description: '미래 우주 여행에 대한 다양한 정보 및 여행 상품/굿즈 결제',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    image: '/images/VoyageX.png',
    details: {
      overview: 'VoyageX는 미래의 우주 여행을 위한 올인원 플랫폼입니다. 사용자들에게 우주 여행 정보를 제공하고, 관련 상품을 구매할 수 있게 해주는 서비스입니다.',
      features: [
        '우주 여행 상품 검색 및 예약',
        '실시간 우주 날씨 정보 제공',
        '우주 여행 관련 굿즈 쇼핑',
        '유저 커뮤니티'
      ],
      github: 'https://github.com/hwijinkim22/voyageX.git',
      demo: 'https://voyage-x.vercel.app'
    }
  }
};