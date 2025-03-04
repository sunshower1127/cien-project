export const seconds = 1000;
export const minutes = 60 * seconds;
export const hours = 60 * minutes;

// 각 컴포넌트별 업데이트 및 슬라이드 주기
// 이 방식이 별로라면 백엔드측에서 Server Sent Events를 구현하는게 좋음
export const airPollutionUpdateRate = 30 * minutes;

export const cafeteriaMealUpdateHours = [9, 14, 19];
export const cafetriaMealSlideRate = 10 * seconds;

export const calendarUpdateRate = 10 * minutes;

export const heroBannerUpdateRate = 30 * minutes;
export const heroBannerDefaultSlideRate = 10 * seconds;

export const noticeBoardUpdateRate = 30 * minutes;

export const subwayArrivalUpdateRate = 5 * seconds;

export const peopleCountUpdateRate = 1 * minutes;
