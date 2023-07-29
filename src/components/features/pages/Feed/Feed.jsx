import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout"
import { FilterButtons } from "./FilterButtons/FilterButtons";

import styles from "./style.module.css";

export const Feed =()=>{
    return (
      <div>
        <DashboardLayout>
          <FilterButtons />
          <div className = {styles.cardContainer}>
            
          </div>
        </DashboardLayout>
      </div>
    );
}