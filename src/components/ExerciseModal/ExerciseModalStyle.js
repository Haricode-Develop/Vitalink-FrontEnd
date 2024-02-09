export const modalStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80vw',
    height: '80vh',
    padding: '20px',
};
export const searchBarContainer = {
    display: 'flex',
    width: '100%',
};
export const leftSection = {
    flex: '0 0 60%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    marginRight: '20px',
};

export const rightSection = {
    flex: '0 0 40%',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    overflowY: 'auto',
    height: '100%',
    boxSizing: 'border-box',
};




export const searchBar = {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    width:'95%',
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid #ccc',
    marginBottom: '20px',
};



export const confirmButtonStyle = {
    padding: '10px 20px',
    margin: '20px auto',
    display: 'block',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.2s ease',
    ':hover': {
        backgroundColor: '#0056b3',
    },
};

export const videoListContainer = {
    border: '1px solid #ccc',
    padding: '15px',
    marginTop: '20px',
    maxHeight: '300px',
    overflowY: 'auto',
};
export const filterSection = {
    marginBottom: '20px',
};
export const videoItem = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
};

export const videoDetails = {
    marginLeft: '10px',
};

export const videoPreview = {
    width: '120px',
    height: '68px',
    backgroundColor: '#ddd',
};


export const confirmButtonContainerStyle = {
    position: 'absolute',
    left: '50%',
    bottom: '20px',
    transform: 'translateX(-50%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
};


export const filterButtonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '15px',
    color: '#007bff',
    fontSize: '16px',
    marginBottom: '10px',
};