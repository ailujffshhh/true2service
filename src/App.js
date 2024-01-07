import './App.css';
import { useState, useEffect } from 'react';
import VerifyIcon from './arrow-right-circle-fill.svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Help from './question-square-fill.svg';

//https://api.isan.eu.org/nickname/ml?id=87685950&zone=3098 

const API_URL = 'https://api.isan.eu.org/nickname/ml?';
const App = () => {
    const [account, verifyAcc] = useState([]);
    const [smShow, setSmShow] = useState(false);
    const [searchX, setSearchX] = useState('');
    const [searchY, setSearchY] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRequestInvalid, setIsRequestInvalid] = useState(false);

    useEffect(() => {
        if (isRequestInvalid) {
          setSmShow(false); // Hide the modal if the request is invalid
        }
      }, [isRequestInvalid]);

    const searchProfile = async (id, server) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}&id=${id}&zone=${server}`);
    const data = await response.json();

    setResponseStatus(response.status);
    verifyAcc(data);
    setIsRequestInvalid(response.status === 400);
    setIsLoading(false);
    setSmShow(response.status !== 400);
    
}   

    //87685950
    //3098
    return (
        <>
        
        <div className = "container">
            <div className = "container1">
                <div className = "container2">
                    <div className='title'><h1>
                        Account Information
                    </h1>
                    <img className='Help'
                    src={Help}  
                                
                    />
                    
                    </div>
                </div>
                <div className = "acc">
                <div className="input-container">
                    <input className={`uid ${isRequestInvalid ? 'invalid' : 'valid'}`}
                    placeholder="UID"
                    value={searchX}
                    onChange={(e) => setSearchX(e.target.value)}
                    />
                    <input className={`sid ${isRequestInvalid ? 'invalid' : 'valid'}`}
                    placeholder="Server ID"
                    value={searchY}
                    onChange={(d) => setSearchY(d.target.value)}
                    />
                    <div className="button-container">
                    {isLoading ? (
                    <span className="spinner-border spinner-border-lg loading-spinner" role="status" aria-hidden="true"></span>
                    ) : (
                    <img
                  className="svg-img"
                  src={VerifyIcon}
                  alt="photo"
                  onClick={() => searchProfile(searchX, searchY)}
                />
              )}
                </div>
                </div>
                </div>
                </div>
      <Modal
        size="sm"
        show={smShow}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            SUCCESS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>UID: {account.id}</div>
            <div>SERVER ID: {account.zoneId}</div>
            <div>IGN: {account.name}</div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setSmShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                </div>
                    
       {/*<div className='payment'>
            <h2> {responseStatus === 400 ? "Invalid UID or Server ID":account.name} </h2>
                    </div>*/}
        </>
    );
}

export default App;