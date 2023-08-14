

function Die(props){
      const styles ={
        backgroundColor: props.isHeld ? "lightblue" : "white"
      }  
    return(
            <div className="die-face" 
            onClick={props.handleClick}
            style={styles}
            >
                <h2 className="number">{props.value}</h2>
            </div>
        )
}

export default Die