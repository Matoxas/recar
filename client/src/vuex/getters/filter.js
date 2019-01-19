

import functions from '../../utilities/functions';



    const itemsFilter = (state)=>{

        let filteredItems = state.items;
        const { filters } = state;

        filteredItems = functions.filterByPrice( filteredItems, filters.price);
        filteredItems = functions.filterByQuery( filteredItems, filters.query);
        filteredItems = functions.filterBySort( filteredItems, filters.sort);

        return filteredItems;
    }

export default itemsFilter;