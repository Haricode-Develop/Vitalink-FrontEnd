import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

export const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: calc(50% - 10px);  /* Mostramos de dos en dos */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const CardContent = styled.div`
  padding: 15px;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 10px 0;
`;

export const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

export const NumericIndicator = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
`;

export const TableHeader = styled.th`
  background: #f5f5f5;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const FilterButton = styled.button`
  position: fixed;
  top: 80px;
  right: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
`;

export const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;
