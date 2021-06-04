


import{GlobalMotionContext} from '../GlobalMotionMethds'
import{GlobalLooksContext} from '../GlobalLooksMethods'
import '../Balerina/Balerina.css'
import{SayComponent} from '../Look/Look';




export function BalerinaComponent(props) {

return(

     <div  className="balerina-text-container"
     style={{marginLeft:''+props.balerina1X+'%', marginTop:''+props.balerina1Y+'%',width:props.width,height:props.height,
     transform: "rotate("+props.balerinaRotation+"deg)", width:""+props.width+"px",height:""+props.height+"px"}}
   >

       {props.sayOrthinkFlag?
 <SayComponent text={props.sayBalerinaText} sayFlag={props.sayBalerinaFlag}
   style={{marginLeft:''+props.balerina1X+'%', marginTop:''+props.balerina1Y+'%',
   transform: "rotate("+props.balerinaRotation+"deg)"}}/>
   :<div/>

       }
   
   <img className="balerina-sprite-container" 
   style={{marginLeft:''+props.balerina1X+'%', marginTop:''+props.balerina1Y+'%',
    transform: "rotate("+props.balerinaRotation+"deg)",width:""+(props.width-50)+"px",height:""+(props.height-50)+"px"}}
   src={require('../sprites photos/balerina/'+props.ballerinaSrc).default} alt='"ballerina"' />

   
   </div>
)

}