import styled from 'styled-components';

import { device } from 'constants';

export const StatisticSection = styled.section`
  background-color: ${p => p.theme.secondaryBgColor};
  border-radius: 16px;
  padding: 28px 14px 135px;

  @media screen and (min-width: ${device.tablet}px) {
    padding: 132px 32px 224px 32px;
  }
  @media screen and (min-width: ${device.desktop}px) {
    padding: 134px 113px 136px;
  }
`;
export const WrapperPaginator = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: 40px;

  @media screen and (min-width: ${device.tablet}px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: baseline;

    padding-left: 32px;
    padding-right: 32px;
    margin-bottom: -2px;
  }
  @media screen and (min-width: ${device.desktop}px) {
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 0px;
  }
`;
