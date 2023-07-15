import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Emoji from './Emoji';
import "./styles/emojis.css"

function Emojis() {
    const [emojiData, setEmojiData] = useState([])
    const [categories, setCategories] = useState<string[]>([])
    const [showFilterOptions , setShowFilterOptions] = useState<boolean>(false)
    const [filters , setFilters] = useState<string[]>([])
    const [filteredEmojis, setFilteredEmojis] = useState<any>([]) 

    const pageSize = 10
    const [pageIndex, setPageIndex] = useState(1);


    useEffect(() => {
        axios.get("https://emojihub.yurace.pro/api/all")
            .then(res => {
                setEmojiData(res.data) 
                setFilteredEmojis(res.data)               
                let set = new Set();
                res.data.forEach((emoji:any) => {
                    set.add(emoji.category)
                });
                let newCategories:any = []
                set.forEach((newCategory: any) => newCategories.push(newCategory))
                setCategories(newCategories);
                console.log(res.data[0])
            })
            .catch(console.error);
    }, [])


    const handleFilterClick = () => {
        setShowFilterOptions(e => !e)
    }

    const handleFilter = (category:string ) => {
        const index:number = filters.indexOf(category)

        index>-1 ? filters.splice(index, 1) : filters.push(category) 
        setFilters([...filters])
    }

    const filterEmojis = () => {
        const newFilteredEmojis = filters.length > 0 ? emojiData.filter((emoji : any) => filters.includes(emoji.category)) : emojiData
        setFilteredEmojis(newFilteredEmojis)
        setPageIndex(1)
        handleFilterClick()
    }

    return (
        <div style={{padding: "10px"}}>
            <div style={{marginBottom: "10px"}}>
                <div className='filter'>
                    <button onClick={handleFilterClick} className='filter-button' title='Filter by Category'>
                        <img width="30px" height="30px" src="https://img.icons8.com/?size=256&id=42462&format=png" />
                    </button>
                </div>
                {showFilterOptions && <div className='filter-options'>
                    {categories.map((category: any) => <div style={{border : "1px solid black", width: "400px"}}>
                        <div onClick={() => handleFilter(category)} >{category} {filters.includes(category) && <>&#10003;</>}</div> 
                    </div>)}
                    <div style={{ paddingBottom : "10px", width: "400px", border: "1px solid black"}}> 
                        <button style={{ width: "100px", height: "50px", borderRadius: "3px", fontSize: "20px", backgroundColor: "#ADD8E6"}} onClick={filterEmojis}> 
                        Filter </button> 
                    </div>
                </div>}
            </div>

            <div className='emojis-container'>
                {
                    filteredEmojis.slice(pageSize*(pageIndex-1), Math.min(filteredEmojis.length, pageIndex*pageSize) ).map( (emoji: any) => <>
                        <Emoji emoji= {emoji} />
                    </>)
                }
            </div>


            <div style={{display:"flex", alignItems:"flex-end", justifyContent:"end", paddingRight: "50px" }}>
                Showing {pageSize*(pageIndex-1)+1} to {Math.min(filteredEmojis.length, pageIndex*pageSize)} out of {filteredEmojis.length}  
                <button className='pagination-button' onClick={() => setPageIndex(e => e-1)}>Previous</button>
                <button className="pagination-button" onClick={() => setPageIndex(e => e+1)}>Next</button>
            </div>
        </div>
    );
}

export default Emojis;