import './asset.css'

import DailyExpns from '../../components/personalFinance/dailyExpense/DailyExpns';
import React from "react";

export default function Asset() {
	
    return (
			<div className="assetContainer container">
			
				<div className="row dailyExpenseCard">
					<DailyExpns />
				</div>
			</div>
		);
}
