import { Navbar } from "./Navbar";
import ErrorGif from "../assets/Error 404.gif";


export default function NotFound(){
    return(
        <>
        <div style={{textAlign:"center",
                    padding:"40px"}}>
                         <img 
                     src={ErrorGif}
                    alt="Page Not Found"
                    style={{ width: "300px", marginBottom: "20px" ,
                        imageRendering: "auto"}}
                />
                        <h1>404 - Page Not Found</h1>
                        <p style={{
                                fontSize: "18px",
                                color: "#555",
                                marginTop: "10px",
                                fontFamily: "Arial, sans-serif",
                                letterSpacing: "0.5px"
                                }}>
                                      The Page You Are looking for does not exist.
                        </p>
                    </div>
    
        </>
    );
}