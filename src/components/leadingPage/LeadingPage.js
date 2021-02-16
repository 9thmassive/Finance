import React from 'react';
import './LeadingPage.css';
import LeadingPageImages from './LeadingPageImages';
import LeadingPageNotes from './LeadingPageNotes';
import LeadingBtn from './LeadingBtn';

function LeadingPage(props) {
    
    return (
    <>    
        <div className="LeadingPage">         
            <div className="Container">
                 <LeadingPageNotes />
                 <LeadingBtn />   
            </div> 
                 <LeadingPageImages />               
        </div>    
    </>
    )
}

export default LeadingPage