import styled from 'styled-components';

export const NotificationWrapper = styled.div`
  position: fixed;
  top: 35px;
  right: 160px;
  z-index: 1000;
  @media (max-width: 768px) {
    top: 25px;
    right: 20px;
  }
`;

export const BellIcon = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
  svg {
    filter: drop-shadow(0px 7px 7px rgba(0, 0, 0, 0.2));
  }
`;

export const UnreadBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0px 6px;
  font-size: 0.8rem;
`;

export const NotificationMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
`;

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

export const NotificationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  height: 300px;
  max-height: 300px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

export const NoNotifications = styled.li`
  padding: 16px;
  text-align: center;
  color: #777;
`;

export const LoadMoreButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: underline;
  }
`;
