import styled from 'styled-components';
export const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #202424;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    width: 100vw!important;
    height: 100vh!important;
    display: flex;
    align-items: center!important;
    justify-content: flex-start!important;
    transform: ${props => props.menuOpen ? 'translateX(0)' : 'translateX(-100vw)'}!important;
    overflow-y: auto!important;
    flex-direction: column!important;
    transition: transform 0.3s ease-in-out!important;
    z-index: 1000!important; // Asegúrate de que está por encima de otros elementos
    ${props => !props.menuOpen && `
      overflow-y: hidden;
      align-items: flex-start; // Si necesitas alinear los elementos al inicio
    `}
  }
`;


export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: grey;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin: 20px auto;
`;


export const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
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
  color: white;
  cursor: pointer;
  padding: 15px 10px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-transform: ${props => (props.bold ? 'uppercase' : 'none')};
  background-color: ${props => (props.active ? '#072B4A' : 'transparent')};
  border-top: 1px solid #6B6B6B;
  border-bottom: 1px solid #6B6B6B;
  transition: all 0.5s ease;
 
  &:hover, &:focus {
    background-color: ${props => (props.active ? '#1F88A2' : 'rgb(31, 136, 162)')};
  }

  @media (max-width: 768px) {
    width: 100vw;
    border-top: 0px solid #6B6B6B;
    border-bottom: 0px solid #6B6B6B;

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
  @media (max-width: 768px) {
    padding: 15px 20px;
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
  padding-left: ${props => props.isSidebarOpen ? '250px' : '0'}; // Ajusta esto según el ancho de tu sidebar


  width: calc(100% - 250px); // Resta el ancho del sidebar cuando está abierto

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
    display: block;
    margin-top: 0;
  }
`;
export const Box = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
  background: #FF5465; // Usa el color que prefieras
  border: none;
  color: white;
  padding: 10px;
  position: fixed; // Posición fija en la pantalla
  top: 20px;
  left: ${props => props.open ? '250px' : '0'}; // Posición basada en si el sidebar está abierto o no
  transition: left 0.3s ease;
  z-index: 100; // Asegúrate de que el botón esté por encima de otros elementos
  cursor: pointer;

  &:focus {
    outline: none; // Elimina el contorno al hacer clic
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 20px;
    left: 0;
    z-index: 1050; // Debe estar por encima del Sidebar/Navbar
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
  width: 100%; // Usa el 100% del ancho del contenedor padre
  max-width: 600px; // Establece un ancho máximo si es necesario
  height: 300px; // Altura automática para mantener la proporción
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
  background-color: #072B4A;
  color: white;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: -10px;
`;
export const BoxTitleMobile = styled(BoxTitle)`
  
  @media (max-width: 768px) {
    display: block; // Visible solo en móviles
    width: 100%;
    text-align: center;
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;