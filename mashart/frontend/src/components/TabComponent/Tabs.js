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






// ---- OLD version, KEPT FOR REFERENCE ---
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import styled from "styled-components"
// import Tab from './Tab';



// class Tabs extends Component {
//   static propTypes = {
//     children: PropTypes.instanceOf(Array).isRequired,
//   }

//   constructor(props) {
//     super(props);

//     this.state = {
//       activeTab: this.props.children[0].props.label,
//     };
//   }

//   onClickTabItem = (tab) => {
//     this.setState({ activeTab: tab });
//   }


//   render() {
//     const {
//       onClickTabItem,
//       props: {
//         children,
//       },
//       state: {
//         activeTab,
//       }
//     } = this;

//     return (
//     <Container>
//       <div className="tabs">
//         <ol className="tab-list">
//           {children.map((child) => {
//             const { label } = child.props;

//             return (
//               <Tab
//                 activeTab={activeTab}
//                 key={label}
//                 label={label}
//                 onClick={onClickTabItem}
//               />
//             );
//           })}
//         </ol>
//         <div className="tab-content">
//           {children.map((child) => {
//             if (child.props.label !== activeTab) return undefined;
//             return child.props.children;
//           })}
//         </div>
//       </div>
//       </Container>
//     );
//   }
// }

// const Container = styled.div`
    

//       .tab-list {  
//         border-bottom: 1px solid #ccc;
//         padding-left: 0;
//         list-style: circle;
//       }
      
//       .tab-list-item {
//         display: inline;
//         margin-bottom: -1px;
//         padding: 0.5rem 0.75rem;
//       }
      
//       .tab-list-active {
//         display: inline-block;
//         font-weight: bold;
//         border: solid #ccc;
//         border-width: 1px 1px 0 1px;
//       }

//       .tab-content {
          
//       }
// `
