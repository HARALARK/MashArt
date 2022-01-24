import React, {useState} from 'react';
import RecommendedTab from '../AllTabs/RecommendedTab';
import OngoingTab from '../AllTabs/OngoingTab';

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("RecommendedTab");
    
    const handleRTab = () => {
        //Updates the state to recommended tab
        setActiveTab("RecommendedTab");
    }

    const handleOTab = () => {
        //Updates state to ongoing tab
        setActiveTab("OngoingTab");
    }
    return (
        <div className="Tabs">
            {/* Tab nav */}
            <ul className='nav'>
                <li className={activeTab === "RecommendedTab" ? "active" : ""}
                    onClick = {handleRTab}
                > Recommended For You </li>
                <li className={activeTab === "OngoingTab" ? "active" : ""}
                    onClick= {handleOTab}
                > Ongoing Collaborations </li>
            </ul>

            <div className='outlet'>

                {activeTab === "RecommendedTab" ? <RecommendedTab /> : <OngoingTab />}
                
                
            </div>
        </div>
    );
};

export default Tabs;