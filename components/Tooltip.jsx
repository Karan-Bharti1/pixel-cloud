import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipPositionedExample({userInfo}) {
  return (
    <>
      {['bottom', ].map((placement) => (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`} >
              
             <img src={userInfo?.image} />
             <br/><br/>
             <p>{userInfo?.name}</p>
             <p>{userInfo?.email}</p>
             
            </Tooltip>
          }
        >

        <img src={userInfo?.image} className='img'/>
        </OverlayTrigger>
      ))}
    </>
  );
}

export default TooltipPositionedExample;