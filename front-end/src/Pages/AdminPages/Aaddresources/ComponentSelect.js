import React from 'react'
import { MdOutlineFileUpload } from "react-icons/md";

function ComponentSelect() {
  return (
    <div>
          <h4 for="subject" style={{position:"relative", right:"80px"}}>Subject</h4>
          
              <select name="class" className="select" style={{padding:"5px 0px 5px 2px",fontSize:"15px",marginBottom:"20px"}}>
                 <option value="">subject</option>
                 <option value="Mathematics">Mathematics</option>
                 <option value="Science">Science</option>
                 <option value="Agriculture">Agriculture</option>
                 <option value="English Literature">English Literature</option>
                 <option value="English">English</option>
                 <option value="ICT">ICT</option>
                 <option value="Chemistry">Chemistry</option>
                 <option value="Combined Mathematics">Combined Mathematics</option>
                 <option value="Physics">Physics</option>
                 <option value="Biology">Biologye</option>
                 <option value="Business Studies">Business Studies</option>
                 <option value="Accounting">Accounting</option>
                 <option value="Economics">Economics</option>
                 <option value="Logic and Scientific Method">Logic and Scientific Method</option>
                 <option value="Political Science">Political Science</option>
                 <option value="Engineering Technology">Engineering Technology</option>
                 <option value="Bio Systems Technology">Bio Systems Technology</option>
                 <option value="Science for Technology">Science for Technology</option>
              </select>
            
            <h4 style={{position:"relative", right:"70px",marginTop:"20px"}}>Discription</h4>
            <textarea style={{width:"220px",height:"80px", marginBottom:"40px",padding:"4px 0px 0px 4px"}} placeholder='Enter some details ...'></textarea>


        
            <button
                      style={{
                        position: "relative",
                        left: "115px",
                        padding: "5px 10px",
                        backgroundColor: "#2387E8",
                        color: "white",
                        borderBlockColor: "#2387E8",
                        border: "none",
                        cursor: "pointer",
                        marginBottom: "20px",
                        bottom: "20px",
                      }}
                    >
                      ChooseFiles
                    </button>
                    <button
                      style={{
                        position: "relative",
                        top: "50px",
                        padding: "4px 40px 4px 40px",
                        fontSize: "25px",
                        right: "60px",
                        backgroundColor: "#001B79",
                        color: "white",
                        cursor: "pointer",
                        marginBottom:"20px"
                      }}
                    >
                      <MdOutlineFileUpload />
                    </button>
    </div>
  )
}

export default ComponentSelect
