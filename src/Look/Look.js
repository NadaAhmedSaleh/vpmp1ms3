import '../Look/Look.css'
export function SayComponent(props) {
    var x = ""
    if(props.sayFlag ==false){
        x="think.png"
    }
    else{
        x="say.png"
    }
  return (
    
    
      <div className="say-block-container"> 
      <img className="say-photo-container" 
      src={require('../looksphotos/'+x).default} alt='sayy'/>
          <div className="say-text-container"
          >{props.text}</div>
     
    </div>
  )
 
}