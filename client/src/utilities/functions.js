const functions = {

    filterByQuery : (list, query) =>{

        return list.filter(item =>{
            return item.name.toLowerCase().includes(query.toLowerCase())
        })
    },
    filterByPrice : (list, price)=>{
        return list.filter(item =>{
            const number = Number(item.price);
            return (number >= price[0] && number <= price[1])
        })
    },
    filterBySort : (list, sort)=>{

        let sortedList = list;

        switch (sort){
            case 'pigiausi viršuje':
            sortedList = sortedList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
            case 'brangiausi viršuje':
            sortedList = sortedList.sort((a, b) => parseFloat(b.price) - (parseFloat(a.price)) );
            break;
            case 'naujausi viršuje':
            sortedList = sortedList.sort((a, b) => new Date(b.updatedAt) -  new Date(a.updatedAt));
            break
            case 'seniausi viršuje':
            sortedList = sortedList.sort((a, b) => new Date(a.updatedAt) -  new Date(b.updatedAt));
            break
         
        }

        return sortedList;
       
    }

}

export default functions;