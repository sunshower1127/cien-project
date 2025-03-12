export const second = 1000;
export const minute = 60 * second;
export const hour = 60 * minute;

export const RetryRate = 30 * second;

// 각 컴포넌트별 업데이트 및 슬라이드 주기
// 이 방식이 별로라면 백엔드측에서 Server Sent Events를 구현하는게 좋음
export const airPollutionUpdateRate = 30 * minute;

export const cafeteriaMealUpdateHours = [9, 14, 19];
export const cafetriaMealSlideRate = 10 * second;

export const calendarUpdateRate = 10 * minute;

export const heroBannerUpdateRate = 30 * minute;
export const heroBannerConfigUpdateRate = 1 * minute;

export const noticeBoardUpdateRate = 30 * minute;

export const subwayArrivalUpdateRate = 5 * second;

export const peopleCountUpdateRate = 1 * minute;
