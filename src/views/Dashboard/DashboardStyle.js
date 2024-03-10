import styled from 'styled-components';
export const Sidebar = styled.div`
  width: 300px;
  height: 100%;
  background-color: #202424;
  color: var(--blanco);
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    width: 100%!important;
    height: 100%!important;
    max-height: 150vh!important;
    display: flex;
    align-items: center!important;
    justify-content: flex-start!important;
    transform: ${props => props.menuOpen ? 'translateX(0)' : 'translateX(-100%)'}!important;
    overflow-y: auto!important;
    flex-direction: column!important;
    transition: transform 0.3s ease-in-out!important;
    z-index: 1000!important;
    ${props => !props.menuOpen && `
      overflow-y: hidden;
      align-items: flex-start;
    `}
  }
`;


export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: var(--gris-oscuro);
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin: 20px auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    position: relative;
    margin-top: 20px;
    width: 80px;
    height: 80px;
    align-self: center;
  }
`;


export const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    position: relative;
    align-self: center;
    margin-top: 0;
  }
`;

export const Menu = styled.div`

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
  }

`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--blanco);
  cursor: pointer;
  padding: 15px 10px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-transform: ${props => (props.bold ? 'uppercase' : 'none')};
  background-color: ${props => (props.active ? 'var(--verde-medio)' : 'transparent')};
  border-top: 1px solid var(--gris-oscuro);
  transition: all 0.5s ease;
 
  &:hover, &:focus {
    background-color: ${props => (props.active ? 'var(--verde-medio)' : 'var(--verde-oscuro)')};
  }

  @media (max-width: 768px) {
    width: 100vw;
    border-top: 0px solid var(--gris-oscuro);
    border-bottom: 0px solid var(--gris-oscuro);

    box-sizing: border-box;
  }
`;

export const SubMenu = styled.div`
  overflow: hidden;
  max-height: ${props => (props.active ? '500px' : '0')};
  transition: max-height 0.5s ease;
  @media (max-width: 768px) {
    transform-origin: top;
    transform: scaleY(${props => (props.active ? '1' : '0')});
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
    display: block;
    height: auto;
    overflow: hidden;
    visibility: ${props => (props.active ? 'visible' : 'hidden')};

  }
`;

export const SubMenuItem = styled(MenuItem)`
  padding: 10px 15px;
  font-weight:600;
  text-transform: uppercase;
  border-top: none;
  background-color: transparent;
  border-top: 1px solid var(--gris-oscuro);

  border-bottom: 1px solid var(--gris-oscuro);

  @media (max-width: 768px) {
    padding: 15px 20px;
    border-top: 0px solid var(--gris-oscuro);

    margin: 5px 0;
  }
`;

export const ChevronIcon = styled.i`
  transform: ${props => (props.rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s ease;
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-grow: 1;
  padding: 20px;
  padding-left: ${props => props.isSidebarOpen ? '250px' : '0'};


  width: calc(100% - 250px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
    display: block;
    margin-top: 0;
  }
`;
export const Box = styled.div`
  background-color: var(--blanco);
  box-shadow: 0px 4px 6px var(--negro-rgba-01);
  margin: 10px;
  padding: 20px 20px 60px 20px;
  
  position: relative;
  min-height: 180px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0; 
    padding: 10px;
    min-height: auto; 
  }
`;

export const SidebarButton = styled.button`
  background: var(--rojo);
  border: none;
  color: var(--blanco);
  padding: 10px;
  position: fixed;
  top: 20px;
  left: ${props => props.open ? '250px' : '0'};
  transition: left 0.3s ease;
  z-index: 100;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 20px;
    left: 0;
    z-index: 1050;
    padding: 10px;

  }
`;
export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  left: 15%;
  position: relative;
  
  @media (max-width: 768px) {
    width: 90vw;
    left: 0%;

    height: auto;
  }
`;

export const ChartContainerTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 300px;
  position: relative;
`;

export const BoxTitle = styled.h3`
  text-align: center;
  margin: 10px 0;
`;
export const TableCell = styled.td`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8em;
  }
`;
export const BoxButton = styled.button`
  background-color: var(--celeste);
  color: var(--blanco);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
`;
export const TableContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  max-height: 300px;
  overflow: auto;
  position: relative;
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;



export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--gris);
  border-radius: 4px;
  margin-left: -10px;
`;
export const BoxTitleMobile = styled(BoxTitle)`
  
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 10px;
    border-bottom: 1px solid var(--gris);
    text-align: center;
  }

`;


export const Thead = styled.thead`
background:#0F0F0F!important;
color:#fff;
  td {
    background-color: var(--negro);
  }
`;