import React, {useState} from 'react';
import CollabTab from '../AllTabs/CollabTab';
import PostsTab from '../AllTabs/PostsTab';

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("CollabTab");
    
    const handleCTab = () => {
        //Updates the state to collab history tab
        setActiveTab("CollabTab");
    }

    const handlePTab = () => {
        //Updates state to post history tab
        setActiveTab("PostsTab");
    }
    return (
        <div className="Tabs">
            {/* Tab nav */}
            <ul className='nav'>
                <li className={activeTab === "PostsTab" ? "active" : ""}
                    onClick= {handlePTab}
                > Posts </li>
                <li className={activeTab === "CollabTab" ? "active" : ""}
                    onClick = {handleCTab}
                > Collaborations</li>
                
            </ul>

            <div className='outlet'>

                {activeTab === "CollabTab" ? <CollabTab /> : <PostsTab />}
                
                
            </div>
        </div>
    );
};
export default Tabs;

