import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipPositionedExample() {
   const userInfo=JSON.parse(localStorage.getItem('user-info'))
console.log(userInfo)
    const getProxiedImageUrl = (originalUrl) => {
    if (!originalUrl) return null;

    return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}&w=200&h=200`;
  };

  const proxiedImageUrl = getProxiedImageUrl(userInfo?.image);
  return (
    <>
      {['bottom' ].map((placement) => (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`} >
              
             <img src={proxiedImageUrl}  alt={`${userInfo?.name}`}/>
             <br/><br/>
             <p>{userInfo?.name}</p>
             <p>{userInfo?.email}</p>
             
            </Tooltip>
          }
        >
         
<img
  src={proxiedImageUrl}
  alt="Profile"
  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
/>

        </OverlayTrigger>
      ))}
    </>
  );
}

export default TooltipPositionedExample;