import React, {useState} from 'react'

const Table = ({items,heading}) => {
    
    const [selectedIndex,setSelectedIndex] = useState(-1);
    const handleClick = (index)=>{
        setSelectedIndex(index);
    };
    
    return (
        <>
            <h2 className='text-2xl font-bold text-red-500'>{heading}</h2>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>

                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => (
                                <tr key={item} className={`${index==selectedIndex ? "bg-gray-600" : "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" }`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={()=>handleClick(index)}>
                                        {item}
                                    </th>

                                </tr>
                            ))

                        }

                    </tbody>
                </table>
                <table>
                    <tr>
                        <th onClick={()=>handleClick(index)}>
                            New Table 
                        </th>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Table
