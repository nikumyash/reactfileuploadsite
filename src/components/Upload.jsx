import { useState } from "react"
import axios from 'axios'
export default function Upload(){
    const [percent,setPercent] = useState(0);
    const [file,setFile] = useState();
    const [speed,setSpeed] = useState(0);
    const [link,setLink] = useState(null);
    
    function handleFile(e){
        e.preventDefault()
        setFile(e.target.files[0]);
        

    }
    async function handleSubmit(){
        if(!file)return;    
        const formData = new FormData();
        formData.append('file',file);
        formData.append('fileName',file.name)
        formData.append('fileExt',file.type)
        await axios.post("http://127.0.0.1:3000/upload",formData,{
            'headers':{
                "Content-Type":"multipart/form-data",
            },  
            "onUploadProgress":(e)=>{
                const prog = (e.loaded/e.total)*100;
                setPercent(prog.toFixed(0));
                setSpeed(e.rate); 
            }
        }).then((data)=>{
            setLink(data.data.link);
        })
        
    }
    return (
        <div className="w-1/4 h-72 border-black border-dashed rounded-3xl border-2 flex flex-col justify-center items-center">
            <div className="rounded-3xl border-2 border-black w-10/12 h-8">
                <div className={`bg-blue-400 h-full rounded-3xl`} style={{width:`${percent}%`}}></div>
            </div>
            <div>Uploaded : {percent}</div>
            <div>Speed : {(speed/100000).toFixed(2)} Mbps</div>
            <div className="">
                <input type="file" onChange={handleFile}/>
                <button type="submit" className="" onClick={handleSubmit}>Upload</button>
            </div>
            <a href={link?link:""}>Link</a>
        </div>
    )
}