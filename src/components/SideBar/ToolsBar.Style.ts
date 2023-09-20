import styled from "styled-components";

export const Sidebar = styled.div`
  background-color: rgb(40, 44, 52);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-size: calc(10px + 2vmin);
  color: white;
  min-width: 200px;
  border-right: 4px solid goldenrod; // Add the golden border
`;

export const Description = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Node = styled.div`
  height: 30px !important;
  padding: 12px 20px !important;
  border: none !important;
  border-radius: 8px !important;
  margin-bottom: 15px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer !important;
  background: linear-gradient(135deg, rgb(245, 245, 245), rgb(240, 240, 240)) !important;
  width: 80% !important;
  color: rgb(51, 51, 51) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15) !important;
    transform: translateY(-2px) !important;
  }
`;
